/**
 * Ministry service schedule and timezone-aware occurrence helpers.
 *
 * All services happen at the sanctuary in Nigeria, so "Thursday 4:00 PM"
 * always means 4 PM in Africa/Lagos — never the visitor's local time.
 */

export const MINISTRY_TZ = "Africa/Lagos";

export interface ServiceSchedule {
  id: string;
  name: string;
  day: string;
  time: string;
  frequency: "Weekly" | "Monthly";
  description: string;
  badge: string;
  color: "oxblood" | "skyblue";
  /** 0 = Sunday … 6 = Saturday */
  weekday: number;
  /** For monthly services: which occurrence of `weekday` in the month (1-based). */
  weekOfMonth?: number;
  hour: number;
  minute: number;
  durationMinutes: number;
}

export const SERVICES: ServiceSchedule[] = [
  {
    id: "prayer-school",
    name: "Prayer School",
    day: "Every Monday",
    time: "4:00 PM",
    frequency: "Weekly",
    description:
      "A consecrated atmosphere dedicated to intercession, spiritual warfare instruction, and building personal prayer endurance.",
    badge: "Spiritual Growth",
    color: "oxblood",
    weekday: 1,
    hour: 16,
    minute: 0,
    durationMinutes: 120,
  },
  {
    id: "discipleship-class",
    name: "Discipleship Class",
    day: "Every Tuesday",
    time: "4:00 PM",
    frequency: "Weekly",
    description:
      "In-depth exposition of biblical doctrines, Christian character formation, and personal spiritual growth under pastoral guidance.",
    badge: "Foundational Doctrine",
    color: "skyblue",
    weekday: 2,
    hour: 16,
    minute: 0,
    durationMinutes: 120,
  },
  {
    id: "encounter-service",
    name: "Encounter Service",
    day: "Every Thursday",
    time: "4:00 PM",
    frequency: "Weekly",
    description:
      "Mid-week divine visitation featuring explosive praise, prophetic ministry, healing, and word revelation.",
    badge: "Prophetic & Power",
    color: "oxblood",
    weekday: 4,
    hour: 16,
    minute: 0,
    durationMinutes: 120,
  },
  {
    id: "night-of-encounter",
    name: "Night of Encounter (Monthly Vigil)",
    day: "3rd Friday of Every Month",
    time: "9:00 PM",
    frequency: "Monthly",
    description:
      "All-night prayer vigil reserved for intense spiritual breakthroughs, deliverance, prophetic ministration, and divine encounters.",
    badge: "Monthly All-Night Vigil",
    color: "oxblood",
    weekday: 5,
    weekOfMonth: 3,
    hour: 21,
    minute: 0,
    durationMinutes: 180,
  },
];

export const ENCOUNTER_SERVICE = SERVICES.find((s) => s.id === "encounter-service")!;

export interface ZonedParts {
  year: number;
  /** 1-12 */
  month: number;
  day: number;
  /** 0 = Sunday … 6 = Saturday */
  weekday: number;
  hour: number;
  minute: number;
  second: number;
}

const WEEKDAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const partsFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: MINISTRY_TZ,
  hourCycle: "h23",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  weekday: "short",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
});

/** Wall-clock components of `date` as seen in the ministry timezone. */
export function getZonedParts(date: Date): ZonedParts {
  const map: Record<string, string> = {};
  for (const part of partsFormatter.formatToParts(date)) map[part.type] = part.value;
  return {
    year: Number(map.year),
    month: Number(map.month),
    day: Number(map.day),
    weekday: WEEKDAY_NAMES.indexOf(map.weekday),
    hour: Number(map.hour),
    minute: Number(map.minute),
    second: Number(map.second),
  };
}

/**
 * Convert a wall-clock time in the ministry timezone to a UTC instant.
 * `day` may overflow the month (Date.UTC normalises it).
 */
export function zonedToUtc(year: number, month: number, day: number, hour: number, minute: number): Date {
  const naive = Date.UTC(year, month - 1, day, hour, minute, 0, 0);
  const p = getZonedParts(new Date(naive));
  const asUtc = Date.UTC(p.year, p.month - 1, p.day, p.hour, p.minute, p.second);
  const offset = asUtc - naive;
  return new Date(naive - offset);
}

/** Next occurrence of a weekly service, strictly after `now`. */
export function nextWeeklyOccurrence(weekday: number, hour: number, minute: number, now = new Date()): Date {
  const p = getZonedParts(now);
  const diff = (weekday - p.weekday + 7) % 7;
  const candidate = zonedToUtc(p.year, p.month, p.day + diff, hour, minute);
  if (candidate.getTime() > now.getTime()) return candidate;
  return zonedToUtc(p.year, p.month, p.day + diff + 7, hour, minute);
}

/** Next occurrence of "the Nth <weekday> of the month", strictly after `now`. */
export function nextMonthlyOccurrence(
  weekday: number,
  nth: number,
  hour: number,
  minute: number,
  now = new Date()
): Date {
  const p = getZonedParts(now);
  for (let i = 0; i < 6; i++) {
    const first = new Date(Date.UTC(p.year, p.month - 1 + i, 1));
    const offset = (weekday - first.getUTCDay() + 7) % 7;
    const dayOfMonth = 1 + offset + (nth - 1) * 7;
    const candidate = zonedToUtc(first.getUTCFullYear(), first.getUTCMonth() + 1, dayOfMonth, hour, minute);
    if (candidate.getTime() > now.getTime()) return candidate;
  }
  return now;
}

export function nextOccurrence(service: ServiceSchedule, now = new Date()): Date {
  return service.weekOfMonth
    ? nextMonthlyOccurrence(service.weekday, service.weekOfMonth, service.hour, service.minute, now)
    : nextWeeklyOccurrence(service.weekday, service.hour, service.minute, now);
}

/** Today's date in the ministry timezone as YYYY-MM-DD (for `<input type="date" min>`). */
export function todayInMinistryTz(now = new Date()): string {
  const p = getZonedParts(now);
  return `${p.year}-${String(p.month).padStart(2, "0")}-${String(p.day).padStart(2, "0")}`;
}
