import { NextResponse } from "next/server";
import { checkRateLimit, clientIp, type RateLimitOptions } from "./rate-limit";

/**
 * Reject cross-site POSTs. Browsers always send `Origin` on POST, so a
 * mismatch means another site is driving the request. Requests with neither
 * `Origin` nor `Sec-Fetch-Site` (old browsers, curl) are allowed through and
 * left to the rate limiter.
 */
export function isSameOrigin(request: Request): boolean {
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  const origin = request.headers.get("origin");
  if (origin) {
    try {
      return new URL(origin).host === host;
    } catch {
      return false;
    }
  }
  const site = request.headers.get("sec-fetch-site");
  return site === null || site === "same-origin" || site === "none";
}

/**
 * Shared pre-flight for the public form endpoints: same-origin check plus a
 * per-IP rate limit. Returns a response to send when the request is rejected.
 */
export function guardPublicPost(request: Request, scope: string, options: RateLimitOptions): NextResponse | null {
  if (!isSameOrigin(request)) {
    return NextResponse.json({ error: "Cross-site requests are not allowed." }, { status: 403 });
  }
  const result = checkRateLimit(`${scope}:${clientIp(request)}`, options);
  if (!result.ok) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a few minutes and try again." },
      { status: 429, headers: { "Retry-After": String(result.retryAfterSeconds) } }
    );
  }
  return null;
}
