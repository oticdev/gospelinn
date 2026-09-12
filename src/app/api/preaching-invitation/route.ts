import { NextResponse } from "next/server";
import { guardPublicPost } from "@/lib/request-guards";

// Google Apps Script web apps can take 15-30 s on a cold start. Give the
// forward enough room, and tell Vercel the function may run that long.
export const maxDuration = 60;
const FORWARD_TIMEOUT_MS = 45_000;

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
const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

/**
 * Google Sheets parses a cell that starts with = + - @ (or a tab/CR) as a
 * formula, which turns "+234 …" phone numbers into #ERROR! and lets a
 * malicious "name" run a formula in the office's sheet. A leading apostrophe
 * forces text and is not displayed.
 */
function sheetSafe(value: string): string {
  return /^[=+\-@\t\r]/.test(value) ? `'${value}` : value;
}

/** Only accept flyer links that point at our own Cloudinary account. */
function isTrustedFlyerUrl(url: string): boolean {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  if (!cloudName) return false;
  try {
    const parsed = new URL(url);
    return (
      parsed.protocol === "https:" &&
      parsed.hostname === "res.cloudinary.com" &&
      parsed.pathname.startsWith(`/${cloudName}/`)
    );
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  const rejected = guardPublicPost(request, "preaching-invitation", { limit: 5, windowMs: 10 * 60 * 1000 });
  if (rejected) return rejected;

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
    return sheetSafe(trimmed.slice(0, FIELD_LIMITS[key] ?? 1000));
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

  if (eventDate && !ISO_DATE_PATTERN.test(eventDate)) {
    return NextResponse.json({ error: "Please provide a valid event date." }, { status: 400 });
  }
  if (flyerUrl && !isTrustedFlyerUrl(flyerUrl)) {
    return NextResponse.json({ error: "Flyer link is not valid." }, { status: 400 });
  }

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

  // NEXT_PUBLIC_ fallback kept for existing deployments; prefer the private name.
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
      signal: AbortSignal.timeout(FORWARD_TIMEOUT_MS),
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
