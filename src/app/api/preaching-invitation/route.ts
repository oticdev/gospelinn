import { NextResponse } from "next/server";

const FIELD_LIMITS: Record<string, number> = {
  name: 200,
  email: 320,
  phone: 40,
  organization: 200,
  eventDate: 32,
  location: 200,
  aboutEvent: 5000,
  aboutMinistry: 5000,
  flyerUrl: 2048,
  flyerName: 255,
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  // Honeypot: real users never see or fill this field. Discard silently.
  const honeypot = typeof body.website === "string" ? body.website.trim() : "";
  if (honeypot) {
    return NextResponse.json({ ok: true });
  }

  const str = (key: string) => {
    const value = body[key];
    if (typeof value !== "string") return "";
    const trimmed = value.trim();
    return trimmed.slice(0, FIELD_LIMITS[key] ?? 1000);
  };

  const name = str("name");
  const email = str("email");
  const aboutEvent = str("aboutEvent");

  if (!name || !email || !aboutEvent) {
    return NextResponse.json(
      { error: "Name, email and event description are required." },
      { status: 400 }
    );
  }
  if (!EMAIL_PATTERN.test(email)) {
    return NextResponse.json(
      { error: "Please provide a valid email address." },
      { status: 400 }
    );
  }

  const phone = str("phone");
  const organization = str("organization");
  const eventDate = str("eventDate");
  const location = str("location");
  const aboutMinistry = str("aboutMinistry");
  const flyerUrl = str("flyerUrl");
  const flyerName = str("flyerName");

  // Duplicate keys kept for Google Apps Script / Sheet header compatibility
  const payload: Record<string, string> = {
    name,
    email,
    phone,
    organization,
    eventDate,
    location,
    aboutEvent,
    message: aboutEvent,
    eventDetails: aboutEvent,
    aboutMinistry,
    ministryBrief: aboutMinistry,
    submittedAt: new Date().toISOString(),
  };
  if (flyerUrl) {
    payload.flyer = flyerUrl;
    payload.flyerUrl = flyerUrl;
    payload.flyerLink = flyerUrl;
    payload.flyerName = flyerName;
  }

  const endpoint =
    process.env.PREACHING_FORM_ENDPOINT ||
    process.env.NEXT_PUBLIC_PREACHING_FORM_ENDPOINT;
  if (!endpoint) {
    return NextResponse.json(
      { error: "Submission endpoint not configured." },
      { status: 501 }
    );
  }

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload),
      redirect: "follow",
      signal: AbortSignal.timeout(15000),
    });

    if (!res.ok) {
      console.error("Preaching form endpoint error:", res.status);
      return NextResponse.json(
        { error: "The receiving endpoint rejected the submission." },
        { status: 502 }
      );
    }
  } catch (error) {
    if (error instanceof Error && error.name === "TimeoutError") {
      return NextResponse.json({ error: "Submission timed out." }, { status: 504 });
    }
    console.error("Preaching form submission error:", error);
    return NextResponse.json(
      { error: "Could not reach the submission endpoint." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
