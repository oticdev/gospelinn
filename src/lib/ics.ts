/**
 * Minimal RFC 5545 (iCalendar) writer for recurring service reminders.
 * Handles TEXT escaping, 75-octet line folding and an explicit VTIMEZONE so
 * the event lands at the right hour in every calendar client.
 */
import { MINISTRY_TZ, getZonedParts, type ServiceSchedule, nextOccurrence } from "./schedule";

const DAY_ABBR = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];
const pad = (n: number) => String(n).padStart(2, "0");

// Africa/Lagos is UTC+1 year-round (no DST), so a single STANDARD block suffices.
const LAGOS_VTIMEZONE = [
  "BEGIN:VTIMEZONE",
  `TZID:${MINISTRY_TZ}`,
  "BEGIN:STANDARD",
  "DTSTART:19700101T000000",
  "TZOFFSETFROM:+0100",
  "TZOFFSETTO:+0100",
  "TZNAME:WAT",
  "END:STANDARD",
  "END:VTIMEZONE",
];

/** Escape a TEXT value per RFC 5545 §3.3.11. */
export function escapeIcsText(value: string): string {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\r?\n/g, "\\n");
}

/** Fold a content line so no physical line exceeds 75 octets (RFC 5545 §3.1). */
export function foldIcsLine(line: string): string {
  const encoder = new TextEncoder();
  const out: string[] = [];
  let current = "";
  let bytes = 0;
  let limit = 75;
  for (const ch of line) {
    const size = encoder.encode(ch).length;
    if (bytes + size > limit) {
      out.push(current);
      current = " " + ch;
      bytes = 1 + size;
      limit = 75;
    } else {
      current += ch;
      bytes += size;
    }
  }
  out.push(current);
  return out.join("\r\n");
}

function toIcsLocal(d: Date): string {
  const p = getZonedParts(d);
  return `${p.year}${pad(p.month)}${pad(p.day)}T${pad(p.hour)}${pad(p.minute)}${pad(p.second)}`;
}

function toIcsUtc(d: Date): string {
  return `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}${pad(d.getUTCSeconds())}Z`;
}

export function buildServiceIcs(service: ServiceSchedule, now = new Date()): string {
  const start = nextOccurrence(service, now);
  const end = new Date(start.getTime() + service.durationMinutes * 60_000);
  const rrule = service.weekOfMonth
    ? `FREQ=MONTHLY;BYDAY=${service.weekOfMonth}${DAY_ABBR[service.weekday]}`
    : `FREQ=WEEKLY;BYDAY=${DAY_ABBR[service.weekday]}`;

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Gospel Inn Ministry//GIM Calendar Reminder//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    ...LAGOS_VTIMEZONE,
    "BEGIN:VEVENT",
    // Stable UID so re-importing updates the event instead of duplicating it.
    `UID:gim-${service.id}@gospelinnministries.com`,
    `DTSTAMP:${toIcsUtc(now)}`,
    `DTSTART;TZID=${MINISTRY_TZ}:${toIcsLocal(start)}`,
    `DTEND;TZID=${MINISTRY_TZ}:${toIcsLocal(end)}`,
    `RRULE:${rrule}`,
    `SUMMARY:${escapeIcsText(`Gospel Inn Ministry — ${service.name}`)}`,
    `DESCRIPTION:${escapeIcsText(service.description)}`,
    `LOCATION:${escapeIcsText("Gospel Inn Ministry, Main Sanctuary")}`,
    "BEGIN:VALARM",
    "ACTION:DISPLAY",
    "TRIGGER:-PT30M",
    `DESCRIPTION:${escapeIcsText(`Reminder for ${service.name}`)}`,
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ];

  return lines.map(foldIcsLine).join("\r\n") + "\r\n";
}
