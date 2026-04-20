import { NextResponse } from "next/server";

const HCP_BASE = "https://api.housecallpro.com";
const LEAD_SOURCE = "Lead Form";

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

  return NextResponse.json({
    success: true,
    customerId: customer.id,
    jobId: job.id,
    invoiceNumber: job.invoice_number,
  });
}
