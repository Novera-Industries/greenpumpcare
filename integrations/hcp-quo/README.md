# GreenPump Care -- HCP ↔ Quo Integration

## What This Does

A webhook-based integration server that syncs HouseCall Pro MAX and Quo Business in real time. When events happen in either system, the server automatically takes action in the other.

---

## What Was Completed

### Initial Sync (Done)
- **252 HCP customers** imported into Quo as contacts
- Each contact is linked via `externalId` (HCP customer ID) for future sync
- Test/junk records and customers without phone numbers were filtered out
- Quo now shows caller names when any existing HCP customer calls

### Integration Server (Built -- Ready to Deploy)
**15 automated workflows** across both platforms:

#### HCP → Quo (12 automations)
| HCP Event | What Happens |
|-----------|-------------|
| Customer created | New Quo contact created with name, phone, email |
| Customer updated | Matching Quo contact updated |
| Job scheduled | SMS: appointment confirmation with date/time |
| Job on my way | SMS: tech name + "on the way" notification |
| Job completed | SMS: review request with Google review link |
| Job completed (+2hrs) | SMS: Care Plan upsell ($19.99/mo) |
| Estimate sent | SMS: "estimate in your email" nudge |
| Estimate approved | SMS: "approval received, scheduling soon" |
| Estimate declined | SMS: "let's discuss options" follow-up |
| Invoice sent | SMS: invoice number + payment reminder |
| Payment succeeded | SMS: thank you confirmation |
| Payment failed | Internal log alert (NO text to customer) |

#### Quo → HCP (3 automations)
| Quo Event | What Happens |
|-----------|-------------|
| Incoming call (unknown caller) | New HCP Lead created (source: "Phone Call") |
| Call summary completed | AI summary added as note on HCP job/customer |
| Text received (unknown sender) | New HCP Lead created (source: "Text Message") |

---

## Files

```
hcp_quo_integration/
├── server.py          # Flask webhook server (1,260 lines)
├── config.py          # All configuration and SMS templates
├── initial_sync.py    # One-time HCP → Quo customer import
├── requirements.txt   # Python dependencies
└── README.md          # This file
```

---

## Deployment -- What You Need

The server needs to be hosted at a **public HTTPS URL** so both HCP and Quo can send webhook events to it. Options:

### Option A: Railway.app (Recommended -- Simplest)
1. Create account at railway.app
2. Connect your GitHub (or upload the files directly)
3. Railway auto-detects Python/Flask and deploys
4. You get a public URL like `https://greenpump-integration.up.railway.app`
5. Cost: ~$5/month (Hobby plan)

### Option B: Render.com
1. Create account at render.com
2. Create a new "Web Service"
3. Upload files or connect GitHub repo
4. Set start command: `gunicorn server:app --bind 0.0.0.0:$PORT`
5. Cost: Free tier available (spins down after inactivity, 15s cold start)

### Option C: DigitalOcean App Platform
1. Upload to GitHub, connect to DO App Platform
2. Cost: ~$5/month

### Environment Variables to Set (on any host)
```
HCP_API_KEY=<set from HouseCall Pro MAX account>
QUO_API_KEY=<set from Quo/OpenPhone API settings>
HCP_WEBHOOK_SECRET=<from HCP webhook settings after setup>
MONGO_URI=<MongoDB connection string — required>
MONGO_DB_NAME=hcp_quo          # optional, default "hcp_quo"
FLASK_PORT=5000
```

### MongoDB Setup (Atlas — free tier)
1. Create an account at **mongodb.com/cloud/atlas** and build a new
   cluster (M0 shared tier = $0/mo, 512 MB).
2. Database Access → add a user (strong password).
3. Network Access → allow your host's outbound IPs, or `0.0.0.0/0` for
   quick start (tighten later).
4. Connect → "Drivers" → copy the `mongodb+srv://` connection string,
   replace `<username>` / `<password>`, and paste into `MONGO_URI`.

The server creates collections + indexes on first run:
- `dedup` — webhook dedup with a TTL index (auto-expiry)
- `scheduled_sms` — delayed SMS queue, processed by a background worker
- `events` — audit log of every webhook received (source + type + payload)

---

## After Deploying -- Webhook Registration

Once your server has a public URL (e.g., `https://your-server.com`), register webhooks:

### 1. HCP Webhooks (in HouseCall Pro)
Go to: **App Store → Webhooks → Add Webhook URL**
- URL: `https://your-server.com/webhooks/hcp`
- Enable ALL events:
  - customer.created, customer.updated, customer.deleted
  - job.scheduled, job.on_my_way, job.completed, job.created, job.started, job.canceled, job.paid
  - estimate.sent, estimate.created, estimate.completed, estimate.option.approval_status_changed
  - invoice.sent, invoice.paid, invoice.created, invoice.payment.succeeded, invoice.payment.failed
  - lead.created, lead.updated, lead.converted
- Copy the **signing secret** HCP gives you → set as `HCP_WEBHOOK_SECRET` env var

### 2. Quo Webhooks (via API)
Run these curl commands (replace YOUR_SERVER_URL):

```bash
# Webhook for call events
curl -X POST 'https://api.openphone.com/v1/webhooks/calls' \
  -H "Authorization: $QUO_API_KEY" \
  -H 'Content-Type: application/json' \
  -d '{
    "url": "https://YOUR_SERVER_URL/webhooks/quo",
    "events": ["call.completed"],
    "label": "HCP Integration - Calls"
  }'

# Webhook for call summaries
curl -X POST 'https://api.openphone.com/v1/webhooks/call-summaries' \
  -H "Authorization: $QUO_API_KEY" \
  -H 'Content-Type: application/json' \
  -d '{
    "url": "https://YOUR_SERVER_URL/webhooks/quo",
    "events": ["call.summary.completed"],
    "label": "HCP Integration - Call Summaries"
  }'

# Webhook for incoming messages
curl -X POST 'https://api.openphone.com/v1/webhooks/messages' \
  -H "Authorization: $QUO_API_KEY" \
  -H 'Content-Type: application/json' \
  -d '{
    "url": "https://YOUR_SERVER_URL/webhooks/quo",
    "events": ["message.received"],
    "label": "HCP Integration - Messages"
  }'
```

---

## SMS Costs

- All automated SMS sent via Quo API: **$0.01 per message segment**
- Standard SMS (160 chars) = 1 segment, most of our templates are 1-2 segments
- Estimated monthly cost for ~300 automated texts: **$3-6/month**
- Compare to HCP Campaigns add-on: $49/month for 1,000 SMS

---

## Customizing SMS Templates

All message templates are in `config.py` under `SMS_TEMPLATES`. Edit the text, save, and restart the server. Available variables per template:

| Template | Variables |
|----------|-----------|
| job_scheduled | first_name, business_name, scheduled_start, business_phone |
| job_on_my_way | first_name, business_name, tech_first_name |
| job_completed_review | first_name, business_name, review_url |
| job_completed_upsell | first_name, business_name, business_phone |
| estimate_sent | first_name, business_name, business_phone |
| estimate_approved | first_name, business_name |
| estimate_declined | first_name, business_phone |
| invoice_sent | first_name, business_name, invoice_number, business_phone |
| invoice_payment_succeeded | first_name, business_phone |

---

## Before You Go Live Checklist

- [ ] Deploy server to a hosting platform (Railway, Render, etc.)
- [ ] Set environment variables (API keys, webhook secret)
- [ ] Register HCP webhook URL in HouseCall Pro App Store
- [ ] Register Quo webhooks via the curl commands above
- [ ] Update `GOOGLE_REVIEW_URL` in config.py with your actual GBP review link
  - Get it from: GBP Dashboard → Home → "Ask for reviews" → Copy link
- [ ] Test with a real job cycle (create customer → schedule → complete → verify SMS)
- [ ] Verify Quo SMS messaging credits are loaded (Settings → Billing → Prepaid Credits)
  - Load $10-20 to start (~1,000-2,000 messages)

---

## Safeguards Built In

- **Persistent 5-minute dedup** (MongoDB TTL index): same event won't trigger duplicate SMS, survives restarts
- **Persistent delayed-SMS queue**: the 2-hour Care Plan upsell is stored in MongoDB and processed by a background worker — no SMS is lost if the server restarts
- **Full webhook audit log** (`events` collection): every inbound webhook payload is stored for debugging / replay
- **Thread-safe**: Concurrent webhooks handled safely
- **Graceful errors**: Returns 200 to prevent webhook retry storms
- **No customer texts on payment failure**: Only internal logging
- **HMAC signature verification**: For HCP webhook authenticity
- **Phone normalization**: Handles all Canadian/US number formats
- **Atlantic Time conversion**: All customer-facing times in AT

---

## Re-running Initial Sync

If you add many customers directly in HCP and want to bulk-sync them to Quo:
```bash
# Preview what would be created (no changes)
python3 initial_sync.py --dry-run

# Run the actual sync
python3 initial_sync.py

# Update existing contacts with latest HCP data
python3 initial_sync.py --update
```
The script is idempotent -- safe to run multiple times. It skips duplicates.
