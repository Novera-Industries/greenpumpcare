"""
db.py — MongoDB-backed persistence for the HCP ↔ Quo integration.

Replaces the in-memory dedup cache and the threading.Timer-based delayed
SMS queue so state survives restarts and can be shared across workers.

Collections
-----------
dedup          { _id: key, expires_at: datetime(UTC) }   TTL on expires_at
scheduled_sms  { _id, to_number, message, send_at, status,
                 attempts, created_at, last_error }
events         { _id, source, event_type, received_at, payload, meta }

All timestamps are timezone-aware UTC.
"""

from __future__ import annotations

import logging
import os
import threading
from datetime import datetime, timedelta, timezone
from typing import Any, Iterable

from pymongo import ASCENDING, MongoClient, ReturnDocument
from pymongo.collection import Collection
from pymongo.errors import PyMongoError

log = logging.getLogger("hcp_quo.db")

_MONGO_URI = os.environ.get("MONGO_URI")
_MONGO_DB_NAME = os.environ.get("MONGO_DB_NAME", "hcp_quo")

_client: MongoClient | None = None
_db_lock = threading.Lock()


# ---------------------------------------------------------------------------
# Connection + index bootstrap
# ---------------------------------------------------------------------------

def _connect() -> MongoClient:
    """Lazily create a MongoClient. Raises if MONGO_URI is unset."""
    global _client
    if _client is not None:
        return _client
    with _db_lock:
        if _client is not None:
            return _client
        if not _MONGO_URI:
            raise RuntimeError(
                "MONGO_URI is not set — cannot connect to MongoDB. "
                "See .env.example."
            )
        _client = MongoClient(
            _MONGO_URI,
            appname="hcp-quo-integration",
            serverSelectionTimeoutMS=8_000,
        )
        _ensure_indexes(_client[_MONGO_DB_NAME])
        log.info("Mongo connected: db=%s", _MONGO_DB_NAME)
        return _client


def get_db():
    """Return the configured database handle."""
    return _connect()[_MONGO_DB_NAME]


def _ensure_indexes(db) -> None:
    # TTL index on dedup.expires_at — Mongo auto-deletes expired docs
    # within ~60s of the expiry time.
    db.dedup.create_index(
        [("expires_at", ASCENDING)], expireAfterSeconds=0, name="ttl_expires_at"
    )
    # Scheduler needs fast lookup of pending jobs whose send_at has passed.
    db.scheduled_sms.create_index(
        [("status", ASCENDING), ("send_at", ASCENDING)],
        name="status_send_at",
    )
    # Event log index for recent queries / debugging.
    db.events.create_index(
        [("received_at", ASCENDING)], name="received_at"
    )


# ---------------------------------------------------------------------------
# Dedup
# ---------------------------------------------------------------------------

def is_duplicate(key: str, window_seconds: int) -> bool:
    """
    Atomic "have we seen this key in the last `window_seconds`?"

    Uses upsert semantics: if the key exists and isn't expired, return True.
    Otherwise insert it with expires_at = now + window.
    """
    try:
        col: Collection = get_db().dedup
        now = datetime.now(timezone.utc)
        expires_at = now + timedelta(seconds=window_seconds)
        # Try insert. If a non-expired doc already exists, insert fails.
        existing = col.find_one({"_id": key})
        if existing and existing.get("expires_at") and existing["expires_at"] > now:
            return True
        col.replace_one(
            {"_id": key},
            {"_id": key, "expires_at": expires_at},
            upsert=True,
        )
        return False
    except PyMongoError as exc:
        # Fail open — don't let a Mongo outage block webhooks entirely.
        log.error("dedup check failed (fail-open): %s", exc)
        return False


# ---------------------------------------------------------------------------
# Scheduled SMS
# ---------------------------------------------------------------------------

def schedule_sms(to_number: str, message: str, delay_seconds: int) -> str | None:
    """Insert a pending SMS to be sent after `delay_seconds`."""
    try:
        col: Collection = get_db().scheduled_sms
        now = datetime.now(timezone.utc)
        doc = {
            "to_number": to_number,
            "message": message,
            "send_at": now + timedelta(seconds=delay_seconds),
            "status": "pending",
            "attempts": 0,
            "created_at": now,
        }
        result = col.insert_one(doc)
        return str(result.inserted_id)
    except PyMongoError as exc:
        log.error("schedule_sms failed: %s", exc)
        return None


def claim_due_sms(limit: int = 25) -> Iterable[dict]:
    """
    Atomically claim up to `limit` SMS whose send_at has passed. Each
    returned doc has been moved to status='sending' so other workers
    won't pick it up.
    """
    col: Collection = get_db().scheduled_sms
    now = datetime.now(timezone.utc)
    claimed = []
    for _ in range(limit):
        doc = col.find_one_and_update(
            {"status": "pending", "send_at": {"$lte": now}},
            {"$set": {"status": "sending", "claimed_at": now},
             "$inc": {"attempts": 1}},
            sort=[("send_at", ASCENDING)],
            return_document=ReturnDocument.AFTER,
        )
        if not doc:
            break
        claimed.append(doc)
    return claimed


def mark_sms_sent(doc_id: Any) -> None:
    try:
        get_db().scheduled_sms.update_one(
            {"_id": doc_id},
            {"$set": {"status": "sent",
                      "sent_at": datetime.now(timezone.utc)}},
        )
    except PyMongoError as exc:
        log.error("mark_sms_sent failed: %s", exc)


def mark_sms_failed(doc_id: Any, error: str) -> None:
    try:
        get_db().scheduled_sms.update_one(
            {"_id": doc_id},
            {"$set": {"status": "failed",
                      "failed_at": datetime.now(timezone.utc),
                      "last_error": error[:500]}},
        )
    except PyMongoError as exc:
        log.error("mark_sms_failed failed: %s", exc)


# ---------------------------------------------------------------------------
# Event audit log
# ---------------------------------------------------------------------------

def log_event(
    source: str,
    event_type: str,
    payload: dict,
    meta: dict | None = None,
) -> None:
    """Append a webhook event to the audit log. Non-fatal on error."""
    try:
        get_db().events.insert_one({
            "source": source,
            "event_type": event_type,
            "received_at": datetime.now(timezone.utc),
            "payload": payload,
            "meta": meta or {},
        })
    except PyMongoError as exc:
        log.error("log_event failed (non-fatal): %s", exc)


# ---------------------------------------------------------------------------
# Healthcheck helper
# ---------------------------------------------------------------------------

def ping() -> bool:
    """Return True if MongoDB is reachable."""
    try:
        _connect().admin.command("ping")
        return True
    except Exception as exc:
        log.error("mongo ping failed: %s", exc)
        return False
