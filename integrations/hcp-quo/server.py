"""
server.py — GreenPump Care · HCP ↔ Quo Integration Server
Flask webhook receiver that syncs HouseCall Pro MAX with Quo (formerly OpenPhone).

Endpoints
---------
GET  /health           — liveness probe
POST /webhooks/hcp     — receives HCP webhook events
POST /webhooks/quo     — receives Quo webhook events
"""

import hashlib
import hmac
import logging
import threading
import time
from datetime import datetime, timezone
from functools import wraps

import pytz
import requests
from dateutil import parser as dateutil_parser
from flask import Flask, jsonify, request

import config
import db

# ---------------------------------------------------------------------------
# Logging
# ---------------------------------------------------------------------------

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
    datefmt="%Y-%m-%dT%H:%M:%S",
)
log = logging.getLogger("hcp_quo")

# ---------------------------------------------------------------------------
# Flask app
# ---------------------------------------------------------------------------

app = Flask(__name__)

# ---------------------------------------------------------------------------
# Deduplication — backed by MongoDB TTL collection (see db.py)
# ---------------------------------------------------------------------------


def _is_duplicate(key: str) -> bool:
    """Return True if *key* was seen within DEDUP_WINDOW_SECONDS."""
    return db.is_duplicate(key, config.DEDUP_WINDOW_SECONDS)


def _purge_dedup_cache() -> None:
    """Kept as a no-op for compatibility — TTL index prunes automatically."""
    return None

# ---------------------------------------------------------------------------
# HTTP helper — shared session with auth headers
# ---------------------------------------------------------------------------

_hcp_session = requests.Session()
_hcp_session.headers.update({
    "Authorization": f"Token {config.HCP_API_KEY}",
    "Accept": "application/json",
    "Content-Type": "application/json",
})

_quo_session = requests.Session()
_quo_session.headers.update({
    "Authorization": config.QUO_API_KEY,
    "Accept": "application/json",
    "Content-Type": "application/json",
})


def _hcp_get(path: str, params: dict | None = None) -> dict | None:
    url = f"{config.HCP_BASE_URL}{path}"
    try:
        resp = _hcp_session.get(url, params=params, timeout=10)
        resp.raise_for_status()
        return resp.json()
    except Exception as exc:
        log.error("HCP GET %s failed: %s", path, exc)
        return None


def _hcp_post(path: str, payload: dict) -> dict | None:
    url = f"{config.HCP_BASE_URL}{path}"
    try:
        resp = _hcp_session.post(url, json=payload, timeout=10)
        resp.raise_for_status()
        return resp.json()
    except Exception as exc:
        log.error("HCP POST %s failed: %s", path, exc)
        return None


def _hcp_put(path: str, payload: dict) -> dict | None:
    url = f"{config.HCP_BASE_URL}{path}"
    try:
        resp = _hcp_session.put(url, json=payload, timeout=10)
        resp.raise_for_status()
        return resp.json()
    except Exception as exc:
        log.error("HCP PUT %s failed: %s", path, exc)
        return None


def _quo_get(path: str, params: dict | None = None) -> dict | None:
    url = f"{config.QUO_BASE_URL}{path}"
    try:
        resp = _quo_session.get(url, params=params, timeout=10)
        resp.raise_for_status()
        return resp.json()
    except Exception as exc:
        log.error("Quo GET %s failed: %s", path, exc)
        return None


def _quo_post(path: str, payload: dict) -> dict | None:
    url = f"{config.QUO_BASE_URL}{path}"
    try:
        resp = _quo_session.post(url, json=payload, timeout=10)
        resp.raise_for_status()
        return resp.json()
    except Exception as exc:
        log.error("Quo POST %s failed: %s", path, exc)
        return None


def _quo_patch(path: str, payload: dict) -> dict | None:
    url = f"{config.QUO_BASE_URL}{path}"
    try:
        resp = _quo_session.patch(url, json=payload, timeout=10)
        resp.raise_for_status()
        return resp.json()
    except Exception as exc:
        log.error("Quo PATCH %s failed: %s", path, exc)
        return None

# ---------------------------------------------------------------------------
# Phone number normalisation
# ---------------------------------------------------------------------------

def normalize_phone(phone: str | None) -> str | None:
    """
    Normalize a phone number to E.164 (+1XXXXXXXXXX for NA numbers).

    Handles:
    - "+17828305900"  → "+17828305900"   (already E.164)
    - "7828305900"    → "+17828305900"   (10-digit NA without country code)
    - "17828305900"   → "+17828305900"   (11-digit with leading 1)
    - "(782) 830-5900"→ "+17828305900"   (formatted)

    Returns None when the input is falsy or cannot be normalised.
    """
    if not phone:
        return None
    # Strip all non-digit characters
    digits = "".join(c for c in phone if c.isdigit())
    if not digits:
        return None
    if digits.startswith("1") and len(digits) == 11:
        return f"+{digits}"
    if len(digits) == 10:
        return f"+1{digits}"
    if len(digits) > 11:
        # Assume already has country code embedded — prefix with +
        return f"+{digits}"
    return None


def strip_country_code(e164: str | None) -> str | None:
    """
    Convert E.164 "+1XXXXXXXXXX" to bare 10-digit string used by HCP.
    Returns None if conversion is not possible.
    """
    if not e164:
        return None
    digits = "".join(c for c in e164 if c.isdigit())
    if digits.startswith("1") and len(digits) == 11:
        return digits[1:]
    if len(digits) == 10:
        return digits
    return None

# ---------------------------------------------------------------------------
# Date / time helpers
# ---------------------------------------------------------------------------

ATLANTIC = pytz.timezone(config.TIMEZONE)


def _utc_to_atlantic(iso_str: str | None) -> datetime | None:
    """Parse an ISO-8601 UTC string and convert to Atlantic Time."""
    if not iso_str:
        return None
    try:
        dt = dateutil_parser.parse(iso_str)
        if dt.tzinfo is None:
            dt = dt.replace(tzinfo=timezone.utc)
        return dt.astimezone(ATLANTIC)
    except Exception as exc:
        log.warning("Could not parse datetime %r: %s", iso_str, exc)
        return None


def format_datetime_for_sms(iso_str: str | None) -> str:
    """
    Return a human-friendly date/time string in Atlantic Time, e.g.
    "Tuesday, April 21 at 2:00 PM".
    Falls back to the raw string if parsing fails.
    """
    dt = _utc_to_atlantic(iso_str)
    if dt is None:
        return iso_str or "your scheduled time"
    return dt.strftime("%A, %B %-d at %-I:%M %p")

# ---------------------------------------------------------------------------
# Helper: extract first name from a full name string
# ---------------------------------------------------------------------------

def _first_name(full_name: str | None, fallback: str = "there") -> str:
    if not full_name:
        return fallback
    return full_name.strip().split()[0]

# ---------------------------------------------------------------------------
# ── QUO HELPER FUNCTIONS ────────────────────────────────────────────────────
# ---------------------------------------------------------------------------

def send_quo_sms(to_number: str, message: str) -> bool:
    """
    Send an SMS from the GreenPump Care number via the Quo API.

    Parameters
    ----------
    to_number : E.164 phone number of recipient (e.g. "+17828305900")
    message   : Text body (max 1 600 characters)

    Returns True on success, False on failure.
    """
    to_e164 = normalize_phone(to_number)
    if not to_e164:
        log.error("send_quo_sms: invalid recipient number %r", to_number)
        return False

    payload = {
        "from": config.QUO_PHONE_NUMBER_ID,
        "to": [to_e164],
        "content": message,
    }
    result = _quo_post("/messages", payload)
    if result:
        log.info("SMS sent to %s | preview: %.60s…", to_e164, message)
        return True
    log.error("SMS to %s FAILED", to_e164)
    return False


def delayed_sms(delay_seconds: int, to_number: str, message: str) -> None:
    """
    Persist an SMS to the MongoDB scheduled_sms collection. A background
    worker (see _scheduled_sms_worker) polls and sends when due. Survives
    restarts; safe across multiple gunicorn workers (atomic claim).
    """
    doc_id = db.schedule_sms(to_number, message, delay_seconds)
    log.info(
        "Delayed SMS queued (id=%s, %ds delay) → %s | preview: %.60s…",
        doc_id, delay_seconds, to_number, message,
    )


# ---------------------------------------------------------------------------
# Background worker — processes due scheduled SMS
# ---------------------------------------------------------------------------

_SCHEDULER_POLL_SECONDS = 15
_scheduler_started = False
_scheduler_lock = threading.Lock()


def _scheduled_sms_worker() -> None:
    log.info("scheduled_sms worker started (poll=%ds)", _SCHEDULER_POLL_SECONDS)
    while True:
        try:
            for job in db.claim_due_sms(limit=25):
                to = job.get("to_number")
                msg = job.get("message")
                try:
                    ok = send_quo_sms(to, msg)
                    if ok:
                        db.mark_sms_sent(job["_id"])
                    else:
                        db.mark_sms_failed(job["_id"], "send_quo_sms returned False")
                except Exception as exc:
                    log.exception("scheduled SMS send error")
                    db.mark_sms_failed(job["_id"], str(exc))
        except Exception:
            log.exception("scheduled_sms worker tick failed")
        time.sleep(_SCHEDULER_POLL_SECONDS)


def _start_scheduler_once() -> None:
    global _scheduler_started
    with _scheduler_lock:
        if _scheduler_started:
            return
        t = threading.Thread(target=_scheduled_sms_worker, daemon=True,
                             name="scheduled_sms_worker")
        t.start()
        _scheduler_started = True


def find_quo_contact_by_phone(phone: str) -> dict | None:
    """
    Search all Quo contacts and return the first one whose phone numbers
    include *phone* (compared after normalisation).

    Note: The Quo API does not expose a phone-number filter, so we page
    through all contacts and match locally.
    """
    target = normalize_phone(phone)
    if not target:
        return None

    page_token = None
    while True:
        params: dict = {"maxResults": 50}
        if page_token:
            params["pageToken"] = page_token
        data = _quo_get("/contacts", params=params)
        if not data:
            break
        for contact in data.get("data", []):
            phone_numbers = (
                contact.get("defaultFields", {}).get("phoneNumbers") or []
            )
            for pn in phone_numbers:
                if normalize_phone(pn.get("value")) == target:
                    return contact
        page_token = data.get("nextPageToken")
        if not page_token:
            break
    return None


def find_quo_contact_by_external_id(hcp_customer_id: str) -> dict | None:
    """
    Return the Quo contact whose externalId matches *hcp_customer_id*.
    Uses the Quo List Contacts endpoint with the externalIds filter.
    """
    if not hcp_customer_id:
        return None
    # The Quo API accepts externalIds as a query parameter (comma-separated
    # or repeated — we send it as a single value).
    data = _quo_get("/contacts", params={"externalIds": hcp_customer_id})
    if data:
        contacts = data.get("data", [])
        if contacts:
            return contacts[0]
    return None


def create_quo_contact(
    first_name: str,
    last_name: str,
    phone: str | None,
    email: str | None,
    company: str | None,
    external_id: str | None,
) -> dict | None:
    """Create a new contact in Quo and return the API response."""
    default_fields: dict = {}
    if first_name:
        default_fields["firstName"] = first_name
    if last_name:
        default_fields["lastName"] = last_name
    if company:
        default_fields["company"] = company

    e164 = normalize_phone(phone)
    if e164:
        default_fields["phoneNumbers"] = [{"name": "mobile", "value": e164}]

    if email:
        default_fields["emails"] = [{"name": "email", "value": email}]

    payload: dict = {"defaultFields": default_fields}
    if external_id:
        payload["externalId"] = str(external_id)
        payload["source"] = "housecallpro"

    result = _quo_post("/contacts", payload)
    if result:
        contact_id = result.get("data", {}).get("id") or result.get("id")
        log.info(
            "Quo contact created: %s %s (id=%s, externalId=%s)",
            first_name, last_name, contact_id, external_id,
        )
    return result


def update_quo_contact(contact_id: str, fields: dict) -> dict | None:
    """
    Update an existing Quo contact.
    *fields* should be a dict of top-level Quo contact fields
    (e.g. {"defaultFields": {"firstName": "Jane"}}).
    """
    result = _quo_patch(f"/contacts/{contact_id}", fields)
    if result:
        log.info("Quo contact %s updated", contact_id)
    return result

# ---------------------------------------------------------------------------
# ── HCP HELPER FUNCTIONS ─────────────────────────────────────────────────────
# ---------------------------------------------------------------------------

def find_hcp_customer_by_phone(phone: str) -> dict | None:
    """
    Search HCP customers by mobile_number.
    HCP stores numbers as 10-digit strings (no country code).
    """
    bare = strip_country_code(normalize_phone(phone))
    if not bare:
        return None
    data = _hcp_get("/customers", params={"mobile_number": bare, "page_size": 1})
    if data:
        customers = data.get("customers") or data.get("results") or []
        if customers:
            return customers[0]
    return None


def create_hcp_lead(
    first_name: str,
    last_name: str,
    phone: str | None,
    email: str | None,
    source: str = "Phone Call",
) -> dict | None:
    """Create a new lead record in HCP."""
    payload: dict = {
        "lead_source": source,
    }
    if first_name or last_name:
        payload["name"] = f"{first_name} {last_name}".strip()
    bare = strip_country_code(normalize_phone(phone))
    if bare:
        payload["mobile_number"] = bare
    if email:
        payload["email"] = email

    result = _hcp_post("/leads", payload)
    if result:
        log.info(
            "HCP lead created: %s %s | source=%s",
            first_name, last_name, source,
        )
    return result


def create_hcp_customer(
    first_name: str,
    last_name: str,
    phone: str | None,
    email: str | None,
) -> dict | None:
    """Create a new customer record in HCP."""
    payload: dict = {
        "first_name": first_name,
        "last_name": last_name,
    }
    bare = strip_country_code(normalize_phone(phone))
    if bare:
        payload["mobile_number"] = bare
    if email:
        payload["email"] = email

    result = _hcp_post("/customers", payload)
    if result:
        log.info("HCP customer created: %s %s", first_name, last_name)
    return result


def _get_hcp_customer(customer_id: str) -> dict | None:
    """Fetch a single HCP customer by ID."""
    return _hcp_get(f"/customers/{customer_id}")


def _get_hcp_customer_jobs(customer_id: str) -> list:
    """Return a list of jobs for *customer_id*, newest first."""
    data = _hcp_get("/jobs", params={"customer_id": customer_id, "page_size": 5})
    if data:
        return data.get("jobs") or data.get("results") or []
    return []


def _add_note_to_hcp_job(job_id: str, note: str) -> dict | None:
    """Append a text note to an HCP job."""
    payload = {"note": note}
    result = _hcp_post(f"/jobs/{job_id}/notes", payload)
    if result:
        log.info("Note added to HCP job %s", job_id)
    return result


def _add_note_to_hcp_customer(customer_id: str, note: str) -> dict | None:
    """Append a text note to an HCP customer record."""
    payload = {"note": note}
    result = _hcp_post(f"/customers/{customer_id}/notes", payload)
    if result:
        log.info("Note added to HCP customer %s", customer_id)
    return result

# ---------------------------------------------------------------------------
# ── HCP WEBHOOK SIGNATURE VERIFICATION ───────────────────────────────────────
# ---------------------------------------------------------------------------

def _verify_hcp_signature(request_) -> bool:
    """
    Verify the HMAC-SHA256 signature sent by HCP.
    HCP sends:
      - Api-Timestamp: seconds since epoch
      - Api-Signature: HMAC-SHA256 of "{timestamp}.{json_payload}" using signing secret

    Returns True when:
    - No signing secret is configured (dev mode — logs a warning).
    - The signature matches the computed digest.

    Returns False when the secret is set but the signature is missing
    or does not match.
    """
    secret = config.HCP_WEBHOOK_SECRET
    if not secret:
        log.warning(
            "HCP_WEBHOOK_SECRET is not set — skipping signature verification"
        )
        return True

    timestamp = request_.headers.get("Api-Timestamp", "")
    provided_sig = request_.headers.get("Api-Signature", "")

    if not timestamp or not provided_sig:
        log.warning("HCP webhook missing Api-Timestamp or Api-Signature header")
        return False

    body = request_.get_data(as_text=True)
    signature_body = f"{timestamp}.{body}"
    expected_sig = hmac.new(
        secret.encode("utf-8"), signature_body.encode("utf-8"), hashlib.sha256
    ).hexdigest()

    if not hmac.compare_digest(provided_sig, expected_sig):
        log.error("HCP webhook signature mismatch — request rejected")
        return False
    return True

# ---------------------------------------------------------------------------
# ── HCP EVENT HANDLERS ────────────────────────────────────────────────────────
# ---------------------------------------------------------------------------

def _handle_customer_created(data: dict) -> None:
    """HCP customer.created → create matching Quo contact."""
    customer = data.get("customer") or data
    cid   = customer.get("id") or customer.get("customer_id")
    fname = customer.get("first_name", "")
    lname = customer.get("last_name", "")
    email = customer.get("email")
    phone = customer.get("mobile_number") or customer.get("phone")
    company = customer.get("company") or customer.get("company_name")

    log.info("HCP customer.created: %s %s (id=%s)", fname, lname, cid)

    # Avoid duplicate Quo contacts when re-processing old webhooks
    if cid and find_quo_contact_by_external_id(cid):
        log.info("Quo contact for HCP customer %s already exists — skipping", cid)
        return

    create_quo_contact(
        first_name=fname,
        last_name=lname,
        phone=phone,
        email=email,
        company=company,
        external_id=cid,
    )


def _handle_customer_updated(data: dict) -> None:
    """HCP customer.updated → update matching Quo contact."""
    customer = data.get("customer") or data
    cid   = customer.get("id") or customer.get("customer_id")
    fname = customer.get("first_name", "")
    lname = customer.get("last_name", "")
    email = customer.get("email")
    phone = customer.get("mobile_number") or customer.get("phone")
    company = customer.get("company") or customer.get("company_name")

    log.info("HCP customer.updated: %s %s (id=%s)", fname, lname, cid)

    contact = find_quo_contact_by_external_id(cid) if cid else None
    if not contact:
        # No existing Quo contact — create one
        create_quo_contact(
            first_name=fname,
            last_name=lname,
            phone=phone,
            email=email,
            company=company,
            external_id=cid,
        )
        return

    default_fields: dict = {}
    if fname:
        default_fields["firstName"] = fname
    if lname:
        default_fields["lastName"] = lname
    if company:
        default_fields["company"] = company

    e164 = normalize_phone(phone)
    if e164:
        default_fields["phoneNumbers"] = [{"name": "mobile", "value": e164}]
    if email:
        default_fields["emails"] = [{"name": "email", "value": email}]

    update_quo_contact(contact["id"], {"defaultFields": default_fields})


def _get_customer_phone_from_job(job: dict) -> str | None:
    """Extract the customer phone from a job payload (several possible paths)."""
    # Direct phone fields sometimes embedded in the job
    phone = (
        job.get("customer", {}).get("mobile_number")
        or job.get("customer", {}).get("phone")
        or job.get("mobile_number")
    )
    # If we only have a customer_id we'll fetch separately
    return phone


def _resolve_customer_for_job(job: dict) -> dict | None:
    """
    Return a customer dict from a job payload.
    Tries the embedded 'customer' sub-object first, then falls back to
    fetching by customer_id.
    """
    customer = job.get("customer")
    if customer and (customer.get("first_name") or customer.get("mobile_number")):
        return customer

    customer_id = job.get("customer_id") or (customer or {}).get("id")
    if customer_id:
        fetched = _get_hcp_customer(customer_id)
        if fetched:
            return fetched.get("customer") or fetched

    return customer  # may be minimal


def _handle_job_scheduled(data: dict) -> None:
    """HCP job.scheduled → send appointment confirmation SMS."""
    job = data.get("job") or data
    job_id = job.get("id") or job.get("job_id")

    customer = _resolve_customer_for_job(job)
    if not customer:
        log.warning("job.scheduled: no customer data for job %s", job_id)
        return

    phone = customer.get("mobile_number") or customer.get("phone")
    if not phone:
        log.warning("job.scheduled: customer has no phone (job=%s)", job_id)
        return

    dedup_key = f"job_scheduled:{job_id}"
    if _is_duplicate(dedup_key):
        log.info("job.scheduled dedup hit — skipping SMS for job %s", job_id)
        return

    first_name = customer.get("first_name") or _first_name(customer.get("name"))
    # HCP schedule data may be nested under "schedule" or at top level
    schedule = job.get("schedule") or {}
    raw_start = (
        schedule.get("scheduled_start")
        or job.get("scheduled_start")
        or job.get("start_time")
    )
    # Also check appointments array
    if not raw_start:
        appointments = schedule.get("appointments") or job.get("appointments") or []
        if appointments:
            raw_start = appointments[0].get("start_time")
    scheduled_start = format_datetime_for_sms(raw_start)

    msg = config.SMS_TEMPLATES["job_scheduled"].format(
        first_name=first_name,
        business_name=config.BUSINESS_NAME,
        scheduled_start=scheduled_start,
        business_phone=config.BUSINESS_PHONE,
    )
    send_quo_sms(phone, msg)


def _handle_job_on_my_way(data: dict) -> None:
    """HCP job.on_my_way → send on-the-way notification SMS."""
    job = data.get("job") or data
    job_id = job.get("id") or job.get("job_id")

    customer = _resolve_customer_for_job(job)
    if not customer:
        log.warning("job.on_my_way: no customer data for job %s", job_id)
        return

    phone = customer.get("mobile_number") or customer.get("phone")
    if not phone:
        log.warning("job.on_my_way: customer has no phone (job=%s)", job_id)
        return

    dedup_key = f"job_on_my_way:{job_id}"
    if _is_duplicate(dedup_key):
        log.info("job.on_my_way dedup hit — skipping SMS for job %s", job_id)
        return

    first_name = customer.get("first_name") or _first_name(customer.get("name"))

    # Technician name — try assigned_employees array first (HCP standard), then fallbacks
    assigned = job.get("assigned_employees") or []
    if assigned:
        tech_first = assigned[0].get("first_name") or "your technician"
    else:
        pro = (
            job.get("pro")
            or job.get("assigned_pro")
            or job.get("technician")
            or {}
        )
        tech_first = (
            pro.get("first_name")
            or _first_name(pro.get("name"), fallback="your technician")
        )

    msg = config.SMS_TEMPLATES["job_on_my_way"].format(
        first_name=first_name,
        business_name=config.BUSINESS_NAME,
        tech_first_name=tech_first,
    )
    send_quo_sms(phone, msg)


def _handle_job_completed(data: dict) -> None:
    """
    HCP job.completed →
    1. Immediate review-request SMS.
    2. Care-plan upsell SMS after a 2-hour delay.
    """
    job = data.get("job") or data
    job_id = job.get("id") or job.get("job_id")

    customer = _resolve_customer_for_job(job)
    if not customer:
        log.warning("job.completed: no customer data for job %s", job_id)
        return

    phone = customer.get("mobile_number") or customer.get("phone")
    if not phone:
        log.warning("job.completed: customer has no phone (job=%s)", job_id)
        return

    first_name = customer.get("first_name") or _first_name(customer.get("name"))

    # ── Review SMS ──────────────────────────────────────────────────────────
    dedup_review = f"job_completed_review:{job_id}"
    if not _is_duplicate(dedup_review):
        msg_review = config.SMS_TEMPLATES["job_completed_review"].format(
            first_name=first_name,
            business_name=config.BUSINESS_NAME,
            review_url=config.GOOGLE_REVIEW_URL,
        )
        send_quo_sms(phone, msg_review)
    else:
        log.info("job.completed review dedup hit — skipping for job %s", job_id)

    # ── Upsell SMS (2 hours later) ───────────────────────────────────────────
    dedup_upsell = f"job_completed_upsell:{job_id}"
    if not _is_duplicate(dedup_upsell):
        msg_upsell = config.SMS_TEMPLATES["job_completed_upsell"].format(
            first_name=first_name,
            business_name=config.BUSINESS_NAME,
            business_phone=config.BUSINESS_PHONE,
        )
        delayed_sms(7200, phone, msg_upsell)  # 2 hours = 7200 seconds
    else:
        log.info("job.completed upsell dedup hit — skipping for job %s", job_id)


def _handle_estimate_sent(data: dict) -> None:
    """HCP estimate.sent → notify customer by SMS."""
    estimate = data.get("estimate") or data
    estimate_id = estimate.get("id") or estimate.get("estimate_id")

    customer = estimate.get("customer") or {}
    customer_id = customer.get("id") or estimate.get("customer_id")
    if not customer.get("first_name") and customer_id:
        fetched = _get_hcp_customer(customer_id)
        if fetched:
            customer = fetched.get("customer") or fetched

    phone = customer.get("mobile_number") or customer.get("phone")
    if not phone:
        log.warning("estimate.sent: no phone for estimate %s", estimate_id)
        return

    dedup_key = f"estimate_sent:{estimate_id}"
    if _is_duplicate(dedup_key):
        log.info("estimate.sent dedup hit — skipping for estimate %s", estimate_id)
        return

    first_name = customer.get("first_name") or _first_name(customer.get("name"))

    msg = config.SMS_TEMPLATES["estimate_sent"].format(
        first_name=first_name,
        business_name=config.BUSINESS_NAME,
        business_phone=config.BUSINESS_PHONE,
    )
    send_quo_sms(phone, msg)


def _handle_estimate_approval_changed(data: dict) -> None:
    """HCP estimate.option.approval_status_changed → approved / declined SMS."""
    option = data.get("estimate_option") or data.get("option") or data
    option_id = option.get("id") or option.get("option_id") or "unknown"
    status = (
        option.get("approval_status")
        or option.get("status")
        or ""
    ).lower()

    estimate = data.get("estimate") or option.get("estimate") or {}
    customer = estimate.get("customer") or data.get("customer") or {}
    customer_id = customer.get("id") or estimate.get("customer_id") or data.get("customer_id")
    if not customer.get("first_name") and customer_id:
        fetched = _get_hcp_customer(customer_id)
        if fetched:
            customer = fetched.get("customer") or fetched

    phone = customer.get("mobile_number") or customer.get("phone")
    if not phone:
        log.warning(
            "estimate.option.approval_status_changed: no phone (option=%s, status=%s)",
            option_id, status,
        )
        return

    dedup_key = f"estimate_approval:{option_id}:{status}"
    if _is_duplicate(dedup_key):
        log.info("estimate approval dedup hit — skipping (option=%s)", option_id)
        return

    first_name = customer.get("first_name") or _first_name(customer.get("name"))

    if status in ("approved", "accepted"):
        msg = config.SMS_TEMPLATES["estimate_approved"].format(
            first_name=first_name,
            business_name=config.BUSINESS_NAME,
        )
    elif status in ("declined", "rejected", "denied"):
        msg = config.SMS_TEMPLATES["estimate_declined"].format(
            first_name=first_name,
            business_phone=config.BUSINESS_PHONE,
        )
    else:
        log.info(
            "estimate.option.approval_status_changed: unhandled status %r (option=%s)",
            status, option_id,
        )
        return

    send_quo_sms(phone, msg)


def _handle_invoice_sent(data: dict) -> None:
    """HCP invoice.sent → notify customer by SMS."""
    invoice = data.get("invoice") or data
    invoice_id = invoice.get("id") or invoice.get("invoice_id") or "unknown"
    invoice_number = invoice.get("invoice_number") or invoice.get("number") or invoice_id

    customer = invoice.get("customer") or {}
    customer_id = customer.get("id") or invoice.get("customer_id")
    if not customer.get("first_name") and customer_id:
        fetched = _get_hcp_customer(customer_id)
        if fetched:
            customer = fetched.get("customer") or fetched

    phone = customer.get("mobile_number") or customer.get("phone")
    if not phone:
        log.warning("invoice.sent: no phone for invoice %s", invoice_id)
        return

    dedup_key = f"invoice_sent:{invoice_id}"
    if _is_duplicate(dedup_key):
        log.info("invoice.sent dedup hit — skipping for invoice %s", invoice_id)
        return

    first_name = customer.get("first_name") or _first_name(customer.get("name"))

    msg = config.SMS_TEMPLATES["invoice_sent"].format(
        first_name=first_name,
        business_name=config.BUSINESS_NAME,
        invoice_number=invoice_number,
        business_phone=config.BUSINESS_PHONE,
    )
    send_quo_sms(phone, msg)


def _handle_invoice_payment_succeeded(data: dict) -> None:
    """HCP invoice.payment.succeeded → thank-you SMS."""
    payment = data.get("payment") or data
    payment_id = payment.get("id") or payment.get("payment_id") or "unknown"
    invoice = data.get("invoice") or payment.get("invoice") or {}

    customer = invoice.get("customer") or data.get("customer") or {}
    customer_id = customer.get("id") or invoice.get("customer_id") or data.get("customer_id")
    if not customer.get("first_name") and customer_id:
        fetched = _get_hcp_customer(customer_id)
        if fetched:
            customer = fetched.get("customer") or fetched

    phone = customer.get("mobile_number") or customer.get("phone")
    if not phone:
        log.warning("invoice.payment.succeeded: no phone (payment=%s)", payment_id)
        return

    dedup_key = f"invoice_payment_succeeded:{payment_id}"
    if _is_duplicate(dedup_key):
        log.info("payment.succeeded dedup hit — skipping (payment=%s)", payment_id)
        return

    first_name = customer.get("first_name") or _first_name(customer.get("name"))

    msg = config.SMS_TEMPLATES["invoice_payment_succeeded"].format(
        first_name=first_name,
        business_phone=config.BUSINESS_PHONE,
    )
    send_quo_sms(phone, msg)


def _handle_invoice_payment_failed(data: dict) -> None:
    """HCP invoice.payment.failed → log warning only (do NOT text customer)."""
    payment = data.get("payment") or data
    invoice = data.get("invoice") or payment.get("invoice") or {}
    customer = invoice.get("customer") or data.get("customer") or {}
    customer_id = customer.get("id") or invoice.get("customer_id") or data.get("customer_id")
    invoice_id = invoice.get("id") or invoice.get("invoice_id") or "unknown"

    log.warning(
        "⚠️  PAYMENT FAILED — invoice=%s | customer_id=%s | "
        "ACTION REQUIRED: follow up with customer",
        invoice_id, customer_id,
    )


def _handle_lead_created(data: dict) -> None:
    """HCP lead.created → create Quo contact from lead data."""
    lead = data.get("lead") or data
    lead_id = lead.get("id") or lead.get("lead_id")
    fname = lead.get("first_name") or _first_name(lead.get("name"), fallback="")
    lname = lead.get("last_name") or ""
    if not fname and lead.get("name"):
        parts = lead["name"].strip().split(None, 1)
        fname = parts[0]
        lname = parts[1] if len(parts) > 1 else ""

    phone = lead.get("mobile_number") or lead.get("phone")
    email = lead.get("email")

    log.info("HCP lead.created: %s %s (id=%s)", fname, lname, lead_id)

    # Avoid duplicate Quo contacts
    if lead_id and find_quo_contact_by_external_id(f"lead:{lead_id}"):
        log.info("Quo contact for HCP lead %s already exists — skipping", lead_id)
        return

    create_quo_contact(
        first_name=fname,
        last_name=lname,
        phone=phone,
        email=email,
        company=None,
        external_id=f"lead:{lead_id}" if lead_id else None,
    )

# ---------------------------------------------------------------------------
# ── QUO EVENT HANDLERS ────────────────────────────────────────────────────────
# ---------------------------------------------------------------------------

def _handle_quo_call_completed(data: dict) -> None:
    """
    Quo call.completed →
    If the caller is an inbound caller whose number is not in HCP, create an HCP Lead.
    """
    call = data.get("object") or data
    direction = call.get("direction", "")
    caller_phone = call.get("from") if direction == "incoming" else call.get("to")

    # For group calls "to" may be a list
    if isinstance(caller_phone, list):
        caller_phone = caller_phone[0] if caller_phone else None

    if not caller_phone:
        log.warning("call.completed: could not determine caller phone")
        return

    # Only process incoming calls where we don't know the customer
    if direction != "incoming":
        log.info("call.completed: outgoing call to %s — no lead action needed", caller_phone)
        return

    dedup_key = f"quo_call_completed:{caller_phone}"
    if _is_duplicate(dedup_key):
        log.info("call.completed dedup hit — skipping lead check for %s", caller_phone)
        return

    existing_customer = find_hcp_customer_by_phone(caller_phone)
    if existing_customer:
        log.info(
            "call.completed: caller %s is existing HCP customer — no lead needed",
            caller_phone,
        )
        return

    # Check Quo contacts for a name
    quo_contact = find_quo_contact_by_phone(caller_phone)
    fname, lname = "", ""
    if quo_contact:
        fields = quo_contact.get("defaultFields", {})
        fname = fields.get("firstName", "")
        lname = fields.get("lastName", "")

    log.info("call.completed: unknown caller %s → creating HCP lead", caller_phone)
    create_hcp_lead(
        first_name=fname,
        last_name=lname,
        phone=caller_phone,
        email=None,
        source="Phone Call",
    )


def _handle_quo_call_summary_completed(data: dict) -> None:
    """
    Quo call.summary.completed →
    Find the matching HCP customer and add the AI-generated summary as a job note.
    """
    summary_obj = data.get("object") or data
    call_id = summary_obj.get("callId") or summary_obj.get("call_id") or "unknown"
    summary_lines = summary_obj.get("summary") or []
    next_steps = summary_obj.get("nextSteps") or []

    # Build the note text
    summary_text = " ".join(summary_lines) if isinstance(summary_lines, list) else str(summary_lines)
    next_steps_text = " ".join(next_steps) if isinstance(next_steps, list) else str(next_steps)

    note_body_parts = []
    if summary_text:
        note_body_parts.append(f"Call Summary: {summary_text}")
    if next_steps_text:
        note_body_parts.append(f"Next Steps: {next_steps_text}")
    note_body = "\n".join(note_body_parts)

    if not note_body.strip():
        log.info("call.summary.completed: empty summary for call %s — skipping", call_id)
        return

    log.info("call.summary.completed: call=%s | summary=%.80s…", call_id, note_body)

    # We need to find the matching HCP customer.
    # The call object contains contactIds (Quo contact IDs) and/or phone numbers.
    # Strategy: look up the Quo contact → get phone → find HCP customer.
    contact_ids = (data.get("object") or {}).get("contactIds") or []
    caller_phone = None

    # Try to get phone from contactIds first
    for cid in contact_ids:
        qc = _quo_get(f"/contacts/{cid}")
        if qc:
            contact_data = qc.get("data") or qc
            phone_numbers = contact_data.get("defaultFields", {}).get("phoneNumbers") or []
            if phone_numbers:
                caller_phone = phone_numbers[0].get("value")
                if caller_phone:
                    break

    # Fall back to the 'from' field (for incoming calls) or 'to' (for outgoing)
    if not caller_phone:
        raw_call = data.get("object") or data
        direction = raw_call.get("direction", "incoming")
        caller_phone = raw_call.get("from") if direction == "incoming" else raw_call.get("to")
        if isinstance(caller_phone, list):
            caller_phone = caller_phone[0] if caller_phone else None

    if not caller_phone:
        log.warning("call.summary.completed: cannot determine caller phone (call=%s)", call_id)
        return

    customer = find_hcp_customer_by_phone(caller_phone)
    if not customer:
        log.info(
            "call.summary.completed: no HCP customer found for %s — skipping note",
            caller_phone,
        )
        return

    customer_id = customer.get("id") or customer.get("customer_id")
    # Try most recent job first
    jobs = _get_hcp_customer_jobs(customer_id)
    if jobs:
        most_recent_job = jobs[0]
        job_id = most_recent_job.get("id") or most_recent_job.get("job_id")
        _add_note_to_hcp_job(job_id, note_body)
    else:
        # No jobs — add note to customer record
        _add_note_to_hcp_customer(customer_id, note_body)


def _handle_quo_message_received(data: dict) -> None:
    """
    Quo message.received →
    If the sender is not an existing HCP customer, create an HCP Lead.
    """
    msg = data.get("object") or data
    sender_phone = msg.get("from")
    if not sender_phone:
        log.warning("message.received: no 'from' field in payload")
        return

    dedup_key = f"quo_message_received:{sender_phone}"
    if _is_duplicate(dedup_key):
        log.info("message.received dedup hit — skipping lead check for %s", sender_phone)
        return

    existing_customer = find_hcp_customer_by_phone(sender_phone)
    if existing_customer:
        log.info(
            "message.received: sender %s is existing HCP customer — no lead needed",
            sender_phone,
        )
        return

    # Try to get a name from Quo contacts
    quo_contact = find_quo_contact_by_phone(sender_phone)
    fname, lname = "", ""
    if quo_contact:
        fields = quo_contact.get("defaultFields", {})
        fname = fields.get("firstName", "")
        lname = fields.get("lastName", "")

    log.info("message.received: unknown sender %s → creating HCP lead", sender_phone)
    create_hcp_lead(
        first_name=fname,
        last_name=lname,
        phone=sender_phone,
        email=None,
        source="Text Message",
    )

# ---------------------------------------------------------------------------
# ── FLASK ROUTES ─────────────────────────────────────────────────────────────
# ---------------------------------------------------------------------------

@app.route("/health", methods=["GET"])
def health():
    """Liveness probe — also reports MongoDB connectivity."""
    mongo_ok = db.ping()
    status_code = 200 if mongo_ok else 503
    return jsonify({
        "status": "ok" if mongo_ok else "degraded",
        "service": "hcp-quo-integration",
        "mongo": mongo_ok,
        "scheduler": _scheduler_started,
    }), status_code


@app.route("/webhooks/hcp", methods=["POST"])
def webhook_hcp():
    """
    Receives HCP webhook events.
    HCP sends a JSON body with at minimum:
      {
        "event_type": "customer.created",   # or eventType
        ...event-specific fields...
      }
    """
    # ── Signature verification ───────────────────────────────────────────────
    if not _verify_hcp_signature(request):
        return jsonify({"error": "Unauthorized"}), 401

    payload = request.get_json(force=True, silent=True) or {}
    # HCP uses "event" per their webhook docs, but check alternatives too
    event_type = (
        payload.get("event")
        or payload.get("event_type")
        or payload.get("eventType")
        or payload.get("type")
        or ""
    )
    data = payload.get("data") or payload

    log.info("HCP webhook received: event_type=%s", event_type)
    db.log_event("hcp", event_type, payload)
    _start_scheduler_once()

    handler_map = {
        "customer.created":                      _handle_customer_created,
        "customer.updated":                      _handle_customer_updated,
        "job.scheduled":                         _handle_job_scheduled,
        "job.on_my_way":                         _handle_job_on_my_way,
        "job.completed":                         _handle_job_completed,
        "estimate.sent":                         _handle_estimate_sent,
        "estimate.option.approval_status_changed": _handle_estimate_approval_changed,
        "invoice.sent":                          _handle_invoice_sent,
        "invoice.payment.succeeded":             _handle_invoice_payment_succeeded,
        "invoice.payment.failed":                _handle_invoice_payment_failed,
        "lead.created":                          _handle_lead_created,
    }

    handler = handler_map.get(event_type)
    if handler:
        try:
            handler(data)
        except Exception as exc:
            log.exception("Error handling HCP event %s: %s", event_type, exc)
            # Return 200 anyway so HCP doesn't keep retrying on application errors
    else:
        log.debug("HCP event %r has no registered handler — ignoring", event_type)

    return jsonify({"received": True, "event_type": event_type}), 200


@app.route("/webhooks/quo", methods=["POST"])
def webhook_quo():
    """
    Receives Quo (OpenPhone) webhook events.
    Quo sends a JSON body with structure:
      {
        "type": "call.completed",   # or message.received, etc.
        "data": { "object": { ... } }
      }
    """
    payload = request.get_json(force=True, silent=True) or {}
    event_type = payload.get("type") or payload.get("event_type") or ""
    data = payload.get("data") or payload

    log.info("Quo webhook received: type=%s", event_type)
    db.log_event("quo", event_type, payload)
    _start_scheduler_once()

    handler_map = {
        "call.completed":          _handle_quo_call_completed,
        "call.summary.completed":  _handle_quo_call_summary_completed,
        "message.received":        _handle_quo_message_received,
    }

    handler = handler_map.get(event_type)
    if handler:
        try:
            handler(data)
        except Exception as exc:
            log.exception("Error handling Quo event %s: %s", event_type, exc)
    else:
        log.debug("Quo event %r has no registered handler — ignoring", event_type)

    return jsonify({"received": True, "type": event_type}), 200

# ---------------------------------------------------------------------------
# Entry point
# ---------------------------------------------------------------------------

if __name__ == "__main__":
    log.info(
        "Starting HCP ↔ Quo Integration Server on %s:%s (debug=%s)",
        config.FLASK_HOST, config.FLASK_PORT, config.FLASK_DEBUG,
    )
    _start_scheduler_once()
    app.run(
        host=config.FLASK_HOST,
        port=config.FLASK_PORT,
        debug=config.FLASK_DEBUG,
    )
else:
    # Running under gunicorn — kick the background worker on import so
    # queued SMS continue to send between restarts.
    try:
        _start_scheduler_once()
    except Exception:
        log.exception("scheduler autostart failed — will retry on first webhook")
