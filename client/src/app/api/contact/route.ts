import { NextResponse } from "next/server";

const HCP_BASE = "https://api.housecallpro.com";
const LEAD_SOURCE = "Lead Form";

interface ContactPayload {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

function splitName(full: string): { first: string; last: string } {
  const parts = full.trim().split(/\s+/);
  if (parts.length === 1) return { first: parts[0], last: "" };
  return { first: parts[0], last: parts.slice(1).join(" ") };
}

export async function POST(req: Request) {
  const apiKey = process.env.HCP_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Contact service is not configured." },
      { status: 500 }
    );
  }

  let body: ContactPayload;
  try {
    body = (await req.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const subject = body.subject?.trim() ?? "";
  const message = body.message?.trim() ?? "";

  if (!name) {
    return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 }
    );
  }
  if (!message) {
    return NextResponse.json(
      { error: "Please include a message." },
      { status: 400 }
    );
  }

  const { first, last } = splitName(name);
  const notesBody = subject
    ? `[Website contact form]\nSubject: ${subject}\n\n${message}`
    : `[Website contact form]\n\n${message}`;

  const customerPayload = {
    first_name: first,
    last_name: last || "(from website)",
    email,
    lead_source: LEAD_SOURCE,
    notes: notesBody,
  };

  const res = await fetch(`${HCP_BASE}/customers`, {
    method: "POST",
    headers: {
      Authorization: `Token ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(customerPayload),
  });

  if (!res.ok) {
    const errText = await res.text();
    console.error("HCP contact create failed", res.status, errText);
    return NextResponse.json(
      {
        error:
          "We couldn't send your message. Please try again or email us directly.",
      },
      { status: 502 }
    );
  }

  const data = await res.json();

  return NextResponse.json({
    success: true,
    customerId: data.id,
  });
}
