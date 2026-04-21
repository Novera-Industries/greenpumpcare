#!/usr/bin/env python3
"""
HouseCall Pro → Quo (OpenPhone) Initial Customer Sync
======================================================
One-time sync that creates Quo contacts for all valid HCP customers.

Usage:
    python initial_sync.py              # Normal run
    python initial_sync.py --dry-run    # Preview without creating contacts
    python initial_sync.py --update     # Also update existing contacts that differ
"""

import argparse
import logging
import re
import sys
import time
from dataclasses import dataclass, field
from typing import Optional

import os
import requests

# ---------------------------------------------------------------------------
# Configuration (API keys must be set in environment — see .env.example)
# ---------------------------------------------------------------------------

HCP_API_KEY = os.environ.get("HCP_API_KEY")
if not HCP_API_KEY:
    raise RuntimeError("HCP_API_KEY environment variable is required")

QUO_API_KEY = os.environ.get("QUO_API_KEY")
if not QUO_API_KEY:
    raise RuntimeError("QUO_API_KEY environment variable is required")

QUO_PHONE_NUMBER_ID = "PNwnQiuNeP"

HCP_BASE_URL = "https://api.housecallpro.com"
QUO_BASE_URL = "https://api.openphone.com/v1"

HCP_PAGE_SIZE = 20          # customers per page from HCP
QUO_RATE_LIMIT_DELAY = 0.5  # seconds between Quo write calls
LOG_FILE = "initial_sync.log"


# ---------------------------------------------------------------------------
# Logging setup
# ---------------------------------------------------------------------------

def setup_logging() -> logging.Logger:
    logger = logging.getLogger("hcp_quo_sync")
    logger.setLevel(logging.DEBUG)

    fmt = logging.Formatter("%(asctime)s [%(levelname)s] %(message)s", "%Y-%m-%d %H:%M:%S")

    # Console handler — INFO and above
    ch = logging.StreamHandler(sys.stdout)
    ch.setLevel(logging.INFO)
    ch.setFormatter(fmt)
    logger.addHandler(ch)

    # File handler — DEBUG and above (full detail)
    fh = logging.FileHandler(LOG_FILE, encoding="utf-8")
    fh.setLevel(logging.DEBUG)
    fh.setFormatter(fmt)
    logger.addHandler(fh)

    return logger


log = setup_logging()


# ---------------------------------------------------------------------------
# Data classes
# ---------------------------------------------------------------------------

@dataclass
class HCPCustomer:
    id: str
    first_name: str
    last_name: str
    email: Optional[str]
    mobile_number: Optional[str]
    company: Optional[str]


@dataclass
class SyncStats:
    total_hcp: int = 0
    skipped_test: int = 0
    skipped_no_phone: int = 0
    already_exists: int = 0
    created: int = 0
    updated: int = 0
    failed: int = 0
    errors: list = field(default_factory=list)

    @property
    def skipped(self) -> int:
        return self.skipped_test + self.skipped_no_phone

    def summary(self) -> str:
        lines = [
            "=" * 55,
            "  SYNC SUMMARY",
            "=" * 55,
            f"  Total HCP customers fetched : {self.total_hcp}",
            f"  Skipped (test/junk)         : {self.skipped_test}",
            f"  Skipped (no phone)          : {self.skipped_no_phone}",
            f"  Already in Quo (duplicates) : {self.already_exists}",
            f"  Successfully created        : {self.created}",
            f"  Updated                     : {self.updated}",
            f"  Failed                      : {self.failed}",
            "=" * 55,
        ]
        if self.errors:
            lines.append("  ERRORS:")
            for err in self.errors:
                lines.append(f"    - {err}")
        return "\n".join(lines)


# ---------------------------------------------------------------------------
# Phone number helpers
# ---------------------------------------------------------------------------

def normalize_phone(raw: Optional[str]) -> Optional[str]:
    """
    Strip all non-digit characters and return the last 10 digits.
    Returns None if the result is not exactly 10 digits.

    Examples:
        "9025551234"       → "9025551234"
        "(902) 555-1234"   → "9025551234"
        "902-555-1234"     → "9025551234"
        "+19025551234"     → "9025551234"
        "19025551234"      → "9025551234"
    """
    if not raw:
        return None
    digits = re.sub(r"\D", "", raw)
    # Strip leading country code "1" if 11 digits
    if len(digits) == 11 and digits.startswith("1"):
        digits = digits[1:]
    if len(digits) != 10:
        return None
    return digits


def to_e164(ten_digit: str) -> str:
    """Convert a 10-digit number to E.164 format (+1XXXXXXXXXX)."""
    return f"+1{ten_digit}"


# ---------------------------------------------------------------------------
# HCP API
# ---------------------------------------------------------------------------

class HCPClient:
    def __init__(self, api_key: str):
        self.session = requests.Session()
        self.session.headers.update({
            "Authorization": f"Token {api_key}",
            "Content-Type": "application/json",
        })

    def fetch_all_customers(self) -> list[HCPCustomer]:
        """Paginate through all HCP customers and return a flat list."""
        customers: list[HCPCustomer] = []
        page = 1

        log.info("Fetching HCP customers...")
        while True:
            url = f"{HCP_BASE_URL}/customers"
            params = {"page": page, "page_size": HCP_PAGE_SIZE}
            try:
                resp = self.session.get(url, params=params, timeout=30)
                resp.raise_for_status()
            except requests.RequestException as exc:
                log.error(f"HCP fetch failed on page {page}: {exc}")
                raise

            data = resp.json()
            total_pages = data.get("total_pages", 1)
            page_customers = data.get("customers", [])

            log.debug(f"HCP page {page}/{total_pages}: {len(page_customers)} customers")

            for c in page_customers:
                customers.append(HCPCustomer(
                    id=c["id"],
                    first_name=c.get("first_name") or "",
                    last_name=c.get("last_name") or "",
                    email=c.get("email") or None,
                    mobile_number=c.get("mobile_number") or None,
                    company=c.get("company") or None,
                ))

            if page >= total_pages:
                break
            page += 1

        log.info(f"Fetched {len(customers)} total HCP customers across {page} pages.")
        return customers


# ---------------------------------------------------------------------------
# Quo (OpenPhone) API
# ---------------------------------------------------------------------------

class QuoClient:
    def __init__(self, api_key: str):
        self.session = requests.Session()
        self.session.headers.update({
            "Authorization": api_key,
            "Content-Type": "application/json",
        })

    def fetch_all_contacts(self) -> dict[str, dict]:
        """
        Fetch all existing Quo contacts.
        Returns a dict keyed by normalized 10-digit phone number.
        Each value is the full contact dict from the API.
        """
        contacts_by_phone: dict[str, dict] = {}
        page_token: Optional[str] = None
        total_fetched = 0

        log.info("Fetching existing Quo contacts...")
        while True:
            params: dict = {"maxResults": 50}  # API max is 50
            if page_token:
                params["pageToken"] = page_token

            try:
                resp = self.session.get(
                    f"{QUO_BASE_URL}/contacts",
                    params=params,
                    timeout=30,
                )
                resp.raise_for_status()
            except requests.RequestException as exc:
                log.error(f"Quo contacts fetch failed: {exc}")
                raise

            data = resp.json()
            contacts = data.get("data", [])

            for contact in contacts:
                df = contact.get("defaultFields", {})
                for pn in df.get("phoneNumbers", []):
                    normalized = normalize_phone(pn.get("value", ""))
                    if normalized:
                        contacts_by_phone[normalized] = contact

            total_fetched += len(contacts)
            page_token = data.get("nextPageToken")
            log.debug(f"Quo contacts batch: {len(contacts)} fetched, nextPageToken={page_token}")

            if not page_token:
                break

        log.info(f"Loaded {total_fetched} existing Quo contacts ({len(contacts_by_phone)} unique phone numbers).")
        return contacts_by_phone

    def create_contact(self, customer: HCPCustomer, phone_e164: str) -> dict:
        """Create a new Quo contact from an HCP customer."""
        payload: dict = {
            "defaultFields": {
                "firstName": customer.first_name,
                "lastName": customer.last_name,
                "phoneNumbers": [{"value": phone_e164, "name": "mobile"}],
            },
            "externalId": customer.id,
            "source": "housecall-pro",
        }

        if customer.email:
            payload["defaultFields"]["emails"] = [{"value": customer.email, "name": ""}]

        if customer.company:
            payload["defaultFields"]["company"] = customer.company

        resp = self.session.post(
            f"{QUO_BASE_URL}/contacts",
            json=payload,
            timeout=30,
        )
        resp.raise_for_status()
        return resp.json().get("data", {})

    def update_contact(self, contact_id: str, customer: HCPCustomer, phone_e164: str) -> dict:
        """Update an existing Quo contact with latest HCP data."""
        payload: dict = {
            "defaultFields": {
                "firstName": customer.first_name,
                "lastName": customer.last_name,
                "phoneNumbers": [{"value": phone_e164, "name": "mobile"}],
            },
            "externalId": customer.id,
            "source": "housecall-pro",
        }

        if customer.email:
            payload["defaultFields"]["emails"] = [{"value": customer.email, "name": ""}]

        if customer.company:
            payload["defaultFields"]["company"] = customer.company

        resp = self.session.patch(
            f"{QUO_BASE_URL}/contacts/{contact_id}",
            json=payload,
            timeout=30,
        )
        resp.raise_for_status()
        return resp.json().get("data", {})


# ---------------------------------------------------------------------------
# Filter logic
# ---------------------------------------------------------------------------

TEST_PREFIXES = ("API_TEST", "Test_")


def is_test_customer(customer: HCPCustomer) -> bool:
    """Return True if the customer looks like a test/junk record."""
    for prefix in TEST_PREFIXES:
        if customer.first_name.startswith(prefix):
            return True
    return False


# ---------------------------------------------------------------------------
# Core sync logic
# ---------------------------------------------------------------------------

def run_sync(dry_run: bool = False, update: bool = False) -> SyncStats:
    stats = SyncStats()

    hcp = HCPClient(HCP_API_KEY)
    quo = QuoClient(QUO_API_KEY)

    # 1. Fetch all HCP customers
    hcp_customers = hcp.fetch_all_customers()
    stats.total_hcp = len(hcp_customers)

    # 2. Fetch all existing Quo contacts (keyed by normalized phone)
    existing_contacts = quo.fetch_all_contacts()

    log.info(f"Starting sync: {stats.total_hcp} HCP customers, "
             f"{len(existing_contacts)} existing Quo phone numbers.")
    if dry_run:
        log.info("DRY RUN MODE — no contacts will be created or modified.")

    # 3. Process each customer
    for customer in hcp_customers:

        # --- Filter: test/junk ---
        if is_test_customer(customer):
            log.debug(f"SKIP (test) : {customer.id} — {customer.first_name} {customer.last_name}")
            stats.skipped_test += 1
            continue

        # --- Filter: no phone ---
        normalized = normalize_phone(customer.mobile_number)
        if not normalized:
            log.debug(f"SKIP (no phone) : {customer.id} — {customer.first_name} {customer.last_name} "
                      f"(raw: {customer.mobile_number!r})")
            stats.skipped_no_phone += 1
            continue

        phone_e164 = to_e164(normalized)
        display_name = f"{customer.first_name} {customer.last_name}".strip()

        # --- Check for duplicate ---
        existing = existing_contacts.get(normalized)

        if existing:
            existing_id = existing["id"]

            if update:
                # Update mode: push latest HCP data to Quo
                if dry_run:
                    log.info(f"[DRY-RUN] WOULD UPDATE : {display_name} ({phone_e164}) "
                             f"→ Quo ID {existing_id}")
                    stats.updated += 1
                else:
                    try:
                        quo.update_contact(existing_id, customer, phone_e164)
                        log.info(f"UPDATED : {display_name} ({phone_e164}) → Quo ID {existing_id}")
                        stats.updated += 1
                        time.sleep(QUO_RATE_LIMIT_DELAY)
                    except requests.RequestException as exc:
                        msg = f"UPDATE FAILED for {customer.id} ({display_name}): {exc}"
                        log.error(msg)
                        stats.failed += 1
                        stats.errors.append(msg)
            else:
                log.debug(f"SKIP (exists) : {display_name} ({phone_e164}) → Quo ID {existing_id}")
                stats.already_exists += 1

            continue

        # --- Create new contact ---
        if dry_run:
            log.info(f"[DRY-RUN] WOULD CREATE : {display_name} ({phone_e164}) "
                     f"[HCP: {customer.id}]")
            stats.created += 1
            continue

        try:
            new_contact = quo.create_contact(customer, phone_e164)
            new_id = new_contact.get("id", "unknown")
            log.info(f"CREATED : {display_name} ({phone_e164}) "
                     f"[HCP: {customer.id}] → Quo ID: {new_id}")
            stats.created += 1
        except requests.HTTPError as exc:
            status_code = exc.response.status_code if exc.response is not None else "?"
            body = ""
            if exc.response is not None:
                try:
                    body = exc.response.json()
                except Exception:
                    body = exc.response.text[:200]
            msg = (f"CREATE FAILED (HTTP {status_code}) for {customer.id} "
                   f"({display_name}): {body}")
            log.error(msg)
            stats.failed += 1
            stats.errors.append(msg)
        except requests.RequestException as exc:
            msg = f"CREATE FAILED (network) for {customer.id} ({display_name}): {exc}"
            log.error(msg)
            stats.failed += 1
            stats.errors.append(msg)

        # Rate-limit delay after every Quo write
        time.sleep(QUO_RATE_LIMIT_DELAY)

    return stats


# ---------------------------------------------------------------------------
# Entry point
# ---------------------------------------------------------------------------

def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="One-time sync of HouseCall Pro customers → Quo (OpenPhone) contacts."
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Show what would be created/updated without making any API writes.",
    )
    parser.add_argument(
        "--update",
        action="store_true",
        help="Also update existing Quo contacts with latest HCP data.",
    )
    return parser.parse_args()


def main() -> None:
    args = parse_args()

    log.info("=" * 55)
    log.info("  HouseCall Pro → Quo Initial Customer Sync")
    log.info("=" * 55)
    if args.dry_run:
        log.info("  Mode: DRY RUN (no writes)")
    elif args.update:
        log.info("  Mode: SYNC + UPDATE existing contacts")
    else:
        log.info("  Mode: SYNC (skip existing contacts)")
    log.info("=" * 55)

    try:
        stats = run_sync(dry_run=args.dry_run, update=args.update)
    except Exception as exc:
        log.critical(f"Sync aborted due to fatal error: {exc}", exc_info=True)
        sys.exit(1)

    summary = stats.summary()
    log.info("\n" + summary)


if __name__ == "__main__":
    main()
