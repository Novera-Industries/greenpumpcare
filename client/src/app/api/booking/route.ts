import { NextResponse } from "next/server";

const HCP_BASE = "https://api.housecallpro.com";
const LEAD_SOURCE = "Lead Form";

const QUO_BASE = "https://api.openphone.com/v1";
// Quo phone-number ID to send from. Not a secret (just an identifier);
// mirrors integrations/hcp-quo/config.py so both systems send from the same line.
const QUO_PHONE_NUMBER_ID = "PNwnQiuNeP";

// SMS sent to the customer immediately after a successful booking request.
// Edit this template to change what people receive.
function bookingSmsBody(firstName: string): string {
  return (
    `Hi ${firstName}, thank you for booking with GreenPump Care. ` +
    `We've received your request, and a member of our team will be in ` +
    `touch shortly to process and schedule your appointment. ` +
    `If you have any questions in the meantime, please call us at (782) 830-5900.`
  );
}

function toE164(phoneDigits: string): string | null {
  if (phoneDigits.length === 10) return `+1${phoneDigits}`;
  if (phoneDigits.length === 11 && phoneDigits.startsWith("1")) return `+${phoneDigits}`;
  return null;
}

async function syncBookingToQuo(params: {
  customerId: string;
  firstName: string;
  lastName: string;
  phoneE164: string;
}): Promise<void> {
  const apiKey = process.env.QUO_API_KEY;
  if (!apiKey) {
    console.warn("QUO_API_KEY not set — skipping Quo contact + SMS sync");
    return;
  }
  const headers = {
    Authorization: apiKey,
    "Content-Type": "application/json",
  };

  try {
    const contactRes = await fetch(`${QUO_BASE}/contacts`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        defaultFields: {
          firstName: params.firstName,
          lastName: params.lastName,
          phoneNumbers: [{ name: "mobile", value: params.phoneE164 }],
        },
        externalId: params.customerId,
        source: "housecallpro",
      }),
    });
    if (!contactRes.ok) {
      const text = await contactRes.text();
      console.error("Quo contact create failed", contactRes.status, text);
    }
  } catch (err) {
    console.error("Quo contact create threw", err);
  }

  try {
    const msgRes = await fetch(`${QUO_BASE}/messages`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        from: QUO_PHONE_NUMBER_ID,
        to: [params.phoneE164],
        content: bookingSmsBody(params.firstName),
      }),
    });
    if (!msgRes.ok) {
      const text = await msgRes.text();
      console.error("Quo SMS send failed", msgRes.status, text);
    }
  } catch (err) {
    console.error("Quo SMS send threw", err);
  }
}

interface ServicePayload {
  name: string;
  description: string;
  priceCents: number;
  quantity: number;
}

interface BookingPayload {
  firstName: string;
  lastName: string;
  phone: string;
  street: string;
  unit?: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  services: ServicePayload[];
  notes?: string;
}

const REQUIRED_FIELDS: (keyof BookingPayload)[] = [
  "firstName",
  "lastName",
  "phone",
  "street",
  "city",
  "state",
  "zip",
  "country",
];

export async function POST(req: Request) {
  const apiKey = process.env.HCP_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Booking service is not configured." },
      { status: 500 }
    );
  }

  let body: BookingPayload;
  try {
    body = (await req.json()) as BookingPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  for (const field of REQUIRED_FIELDS) {
    const value = body[field];
    if (typeof value !== "string" || !value.trim()) {
      return NextResponse.json(
        { error: `Missing or invalid field: ${field}` },
        { status: 400 }
      );
    }
  }
  if (!Array.isArray(body.services) || body.services.length === 0) {
    return NextResponse.json({ error: "Please select at least one service." }, { status: 400 });
  }
  for (const svc of body.services) {
    if (
      !svc ||
      typeof svc.name !== "string" ||
      typeof svc.priceCents !== "number" ||
      typeof svc.quantity !== "number"
    ) {
      return NextResponse.json({ error: "Invalid service selection." }, { status: 400 });
    }
  }

  const phoneDigits = body.phone.replace(/\D/g, "");
  if (phoneDigits.length < 10) {
    return NextResponse.json({ error: "Please provide a valid phone number." }, { status: 400 });
  }

  const customerPayload = {
    first_name: body.firstName.trim(),
    last_name: body.lastName.trim(),
    mobile_number: phoneDigits,
    lead_source: LEAD_SOURCE,
    notes: body.notes?.trim() || null,
    addresses: [
      {
        type: "service",
        street: body.street.trim(),
        street_line_2: body.unit?.trim() || null,
        city: body.city.trim(),
        state: body.state.trim(),
        zip: body.zip.trim(),
        country: body.country.trim(),
      },
    ],
  };

  const customerRes = await fetch(`${HCP_BASE}/customers`, {
    method: "POST",
    headers: {
      Authorization: `Token ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(customerPayload),
  });

  if (!customerRes.ok) {
    const errText = await customerRes.text();
    console.error("HCP customer create failed", customerRes.status, errText);
    return NextResponse.json(
      { error: "Unable to create booking. Please try again or call us." },
      { status: 502 }
    );
  }

  const customer = await customerRes.json();
  const addressId = customer.addresses?.[0]?.id;

  if (!customer.id || !addressId) {
    console.error("HCP customer response missing id/address", customer);
    return NextResponse.json(
      { error: "Unable to create booking. Please try again or call us." },
      { status: 502 }
    );
  }

  const jobDescription = body.notes?.trim()
    ? `Website booking request. Notes: ${body.notes.trim()}`
    : "Website booking request.";

  const jobPayload = {
    customer_id: customer.id,
    address_id: addressId,
    line_items: body.services.map((svc) => ({
      name: svc.name,
      description: svc.description,
      unit_price: svc.priceCents,
      quantity: svc.quantity,
      kind: "labor",
    })),
    work_status: "unscheduled",
    description: jobDescription,
  };

  const jobRes = await fetch(`${HCP_BASE}/jobs`, {
    method: "POST",
    headers: {
      Authorization: `Token ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jobPayload),
  });

  if (!jobRes.ok) {
    const errText = await jobRes.text();
    console.error("HCP job create failed", jobRes.status, errText);
    return NextResponse.json(
      {
        error:
          "Your info was saved, but we couldn't finalize the booking. We'll follow up shortly.",
        customerId: customer.id,
      },
      { status: 502 }
    );
  }

  const job = await jobRes.json();

  const phoneE164 = toE164(phoneDigits);
  if (phoneE164) {
    await syncBookingToQuo({
      customerId: customer.id,
      firstName: body.firstName.trim(),
      lastName: body.lastName.trim(),
      phoneE164,
    });
  }

  return NextResponse.json({
    success: true,
    customerId: customer.id,
    jobId: job.id,
    invoiceNumber: job.invoice_number,
  });
}
