"""
config.py — GreenPump Care · HCP ↔ Quo Integration Configuration
All credentials are driven by environment variables. See .env.example.
"""

import os

# ---------------------------------------------------------------------------
# API credentials (required — set as environment variables)
# ---------------------------------------------------------------------------

HCP_API_KEY = os.environ.get("HCP_API_KEY")
if not HCP_API_KEY:
    raise RuntimeError("HCP_API_KEY environment variable is required")

QUO_API_KEY = os.environ.get("QUO_API_KEY")
if not QUO_API_KEY:
    raise RuntimeError("QUO_API_KEY environment variable is required")

# HMAC signing secret sent by HCP with each webhook request.
# Set in production via environment variable; leave blank to skip verification
# during local development (a warning is logged when unset).
HCP_WEBHOOK_SECRET = os.environ.get("HCP_WEBHOOK_SECRET", "")

# ---------------------------------------------------------------------------
# API base URLs
# ---------------------------------------------------------------------------

HCP_BASE_URL = os.environ.get("HCP_BASE_URL", "https://api.housecallpro.com")
QUO_BASE_URL = os.environ.get("QUO_BASE_URL", "https://api.openphone.com/v1")

# ---------------------------------------------------------------------------
# HCP company / account identifiers
# ---------------------------------------------------------------------------

HCP_COMPANY_ID = "68da54a6-10d0-473f-b040-00c32a597360"

# ---------------------------------------------------------------------------
# Quo phone number identifiers
# ---------------------------------------------------------------------------

QUO_PHONE_NUMBER_ID = "PNwnQiuNeP"         # internal ID used by the Quo API
QUO_PHONE_NUMBER    = "+17828305900"        # E.164 — used as the SMS "from" address

# Quo user IDs (for reference / future use)
QUO_USER_OWNER  = "USAG5avyKQ"   # Admin GPC, owner
QUO_USER_ADMIN  = "USMaNAhwT3"   # Chris Wood, admin

# ---------------------------------------------------------------------------
# Business / brand constants
# ---------------------------------------------------------------------------

BUSINESS_NAME  = "GreenPump Care"
BUSINESS_PHONE = "(782) 830-5900"
# TODO: Replace with your actual Google review short link from GBP dashboard
# (GBP → Home → "Share review form" → copy link)
GOOGLE_REVIEW_URL = "https://search.google.com/local/writereview?placeid=ChIJTODO_REPLACE_WITH_ACTUAL_PLACE_ID"

# Atlantic Time zone (UTC-3, no DST adjustment — adjust to
# "America/Halifax" if you want automatic DST handling)
TIMEZONE = "America/Halifax"

# ---------------------------------------------------------------------------
# Deduplication cache
# Maximum age (seconds) before a cached event key expires and the same
# event is allowed to fire again.
# ---------------------------------------------------------------------------

DEDUP_WINDOW_SECONDS = 300   # 5 minutes

# ---------------------------------------------------------------------------
# SMS message templates
# All templates accept Python .format(**kwargs) substitution.
# ---------------------------------------------------------------------------

SMS_TEMPLATES = {
    # job.scheduled
    "job_scheduled": (
        "Hi {first_name}, your {business_name} appointment has been confirmed"
        " for {scheduled_start}. If you need to reschedule, call us at"
        " {business_phone}. We look forward to seeing you!"
    ),

    # job.on_my_way
    "job_on_my_way": (
        "Hi {first_name}, your {business_name} technician {tech_first_name} is"
        " on the way! Estimated arrival based on your scheduled window."
        " See you soon!"
    ),

    # job.completed — thank-you + review request
    "job_completed_review": (
        "Hi {first_name}, thank you for choosing {business_name}! We'd love to"
        " hear about your experience. Would you mind leaving us a quick review?"
        " {review_url} It means the world to our small team!"
    ),

    # job.completed — care plan upsell (sent 2 hours after completion)
    "job_completed_upsell": (
        "Hi {first_name}, did you know {business_name} offers maintenance Care"
        " Plans starting at $19.99/month? Regular maintenance keeps your system"
        " running efficiently and can extend its lifespan. Call us at"
        " {business_phone} to learn more!"
    ),

    # estimate.sent
    "estimate_sent": (
        "Hi {first_name}, your {business_name} estimate has been sent to your"
        " email. Take a look when you get a chance, and feel free to call us at"
        " {business_phone} with any questions!"
    ),

    # estimate.option.approval_status_changed — approved
    "estimate_approved": (
        "Hi {first_name}, great news -- we've received your estimate approval!"
        " Our team will be in touch shortly to schedule your service. Thank you"
        " for choosing {business_name}!"
    ),

    # estimate.option.approval_status_changed — declined
    "estimate_declined": (
        "Hi {first_name}, we noticed you had some concerns about your estimate."
        " We'd love to discuss options that work for your budget. Give us a call"
        " at {business_phone} -- we're here to help!"
    ),

    # invoice.sent
    "invoice_sent": (
        "Hi {first_name}, your {business_name} invoice #{invoice_number} has"
        " been sent to your email. You can view and pay it online at your"
        " convenience. Questions? Call {business_phone}."
    ),

    # invoice.payment.succeeded
    "invoice_payment_succeeded": (
        "Hi {first_name}, we've received your payment -- thank you! If you have"
        " any questions about your service, don't hesitate to reach out at"
        " {business_phone}."
    ),
}

# ---------------------------------------------------------------------------
# Flask server settings
# ---------------------------------------------------------------------------

FLASK_HOST  = os.environ.get("FLASK_HOST", "0.0.0.0")
FLASK_PORT  = int(os.environ.get("FLASK_PORT", "5000"))
FLASK_DEBUG = os.environ.get("FLASK_DEBUG", "false").lower() == "true"
