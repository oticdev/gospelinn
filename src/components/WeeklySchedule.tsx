"use client";

import React, { useState } from "react";
import { Calendar, Clock, MapPin, Bell, Sparkles, Flame, CheckCircle2, Moon, Shield, type LucideIcon } from "lucide-react";

interface ServiceEvent {
  id: string;
  name: string;
  day: string;
  time: string;
  frequency: "Weekly" | "Monthly";
  icon: LucideIcon;
  description: string;
  badge?: string;
  color: "oxblood" | "skyblue";
  weekday: number;
  weekOfMonth?: number;
  hour: number;
  minute: number;
  durationMinutes?: number;
}

const DAY_ABBR = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];
const pad = (n: number) => String(n).padStart(2, "0");

function nextWeekday(weekday: number, hour: number, minute: number): Date {
  const now = new Date();
  const diff = (weekday - now.getDay() + 7) % 7;
  const target = new Date(now);
  target.setDate(now.getDate() + diff);
  target.setHours(hour, minute, 0, 0);
  if (target <= now) target.setDate(target.getDate() + 7);
  return target;
}

function nextNthWeekday(weekday: number, nth: number, hour: number, minute: number): Date {
  const now = new Date();
  for (let i = 0; i < 6; i++) {
    const first = new Date(now.getFullYear(), now.getMonth() + i, 1);
    const offset = (weekday - first.getDay() + 7) % 7;
    const candidate = new Date(
      now.getFullYear(),
      now.getMonth() + i,
      1 + offset + (nth - 1) * 7,
      hour,
      minute,
      0,
      0
    );
    if (candidate > now) return candidate;
  }
  return now;
}

function toIcsDate(d: Date): string {
  return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}`;
}

function toIcsStamp(d: Date): string {
  return `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}${pad(d.getUTCSeconds())}Z`;
}

export default function WeeklySchedule() {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [reminderSaved, setReminderSaved] = useState<string | null>(null);

  const services: ServiceEvent[] = [
    {
      id: "prayer-school",
      name: "Prayer School",
      day: "Every Monday",
      time: "4:00 PM",
      frequency: "Weekly",
      icon: Flame,
      description: "A consecrated atmosphere dedicated to intercession, spiritual warfare instruction, and building personal prayer endurance.",
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
      icon: Shield,
      description: "In-depth exposition of biblical doctrines, Christian character formation, and personal spiritual growth under pastoral guidance.",
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
      icon: Sparkles,
      description: "Mid-week divine visitation featuring explosive praise, prophetic ministry, healing, and word revelation.",
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
      icon: Moon,
      description: "All-night prayer vigil reserved for intense spiritual breakthroughs, deliverance, prophetic ministration, and divine encounters.",
      badge: "Monthly All-Night Vigil",
      color: "oxblood",
      weekday: 5,
      weekOfMonth: 3,
      hour: 21,
      minute: 0,
      durationMinutes: 180,
    },
  ];

  const handleReminder = (service: ServiceEvent) => {
    const start = service.weekOfMonth
      ? nextNthWeekday(service.weekday, service.weekOfMonth, service.hour, service.minute)
      : nextWeekday(service.weekday, service.hour, service.minute);
    const end = new Date(start.getTime() + (service.durationMinutes ?? 120) * 60000);
    const rrule = service.weekOfMonth
      ? `FREQ=MONTHLY;BYDAY=${service.weekOfMonth}${DAY_ABBR[service.weekday]}`
      : `FREQ=WEEKLY;BYDAY=${DAY_ABBR[service.weekday]}`;

    const ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Gospel Inn Ministry//GIM Calendar Reminder//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      `UID:gim-${service.id}-${start.getTime()}@gospelinnministry.org`,
      `DTSTAMP:${toIcsStamp(new Date())}`,
      `DTSTART:${toIcsDate(start)}`,
      `DTEND:${toIcsDate(end)}`,
      `RRULE:${rrule}`,
      `SUMMARY:Gospel Inn Ministry — ${service.name}`,
      `DESCRIPTION:${service.description}`,
      "LOCATION:Gospel Inn Ministry, Main Sanctuary",
      "BEGIN:VALARM",
      "ACTION:DISPLAY",
      "TRIGGER:-PT30M",
      `DESCRIPTION:Reminder for ${service.name}`,
      "END:VALARM",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${service.id}.ics`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);

    setReminderSaved(service.name);
    setTimeout(() => setReminderSaved(null), 3500);
  };

  const filteredServices = services.filter((s) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Weekly") return s.frequency === "Weekly";
    if (activeFilter === "Monthly") return s.frequency === "Monthly";
    return true;
  });

  return (
    <section id="schedule" className="py-24 bg-gim-dark relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-gim-oxblood/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-gim-skyblue/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute inset-0 bg-pattern-grid opacity-30 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gim-oxblood/30 border border-gim-oxblood text-xs font-bold text-gim-skyblue-bright uppercase tracking-wider">
            <Calendar className="w-3.5 h-3.5" />
            Weekly & Monthly Gatherings
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Schedule of <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gim-skyblue-light to-gim-skyblue-bright">Services & Classes</span>
          </h2>
          <p className="text-slate-300 text-base font-light">
            Join Gospel Inn Ministry for fellowship, prayer, discipleship, and encounters.
          </p>
        </div>

        {/* Reminder Feedback Banner */}
        {reminderSaved && (
          <div className="max-w-md mx-auto mb-8 p-3 rounded-xl bg-gim-skyblue/20 border border-gim-skyblue-bright text-center text-xs font-semibold text-white flex items-center justify-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-gim-skyblue-bright" />
            Calendar file downloaded for {reminderSaved}! Import it into Google, Apple, or Outlook Calendar.
          </div>
        )}

        {/* Filter Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {["All", "Weekly", "Monthly"].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeFilter === filter
                  ? "bg-gradient-to-r from-gim-oxblood to-gim-oxblood-hover text-white border border-gim-skyblue-bright/40 shadow-lg shadow-gim-oxblood/30"
                  : "bg-white/5 text-slate-300 hover:text-white border border-white/10 hover:bg-white/10"
              }`}
            >
              {filter} {filter !== "All" && "Services"}
            </button>
          ))}
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => {
            const IconComp = service.icon;
            const isOxblood = service.color === "oxblood";

            return (
              <div
                key={service.id}
                className="group relative rounded-3xl overflow-hidden glass-panel border border-white/10 hover:border-gim-skyblue-bright/50 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
              >
                {/* Top Accent Line */}
                <div
                  className={`h-1.5 w-full ${
                    isOxblood ? "bg-gradient-to-r from-gim-oxblood to-gim-oxblood-hover" : "bg-gradient-to-r from-gim-skyblue to-gim-skyblue-bright"
                  }`}
                ></div>

                <div className="p-6 space-y-4">
                  {/* Badge & Icon */}
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full border ${
                        isOxblood
                          ? "bg-gim-oxblood/30 text-gim-skyblue-bright border-gim-oxblood"
                          : "bg-gim-skyblue/20 text-gim-skyblue-light border-gim-skyblue/40"
                      }`}
                    >
                      {service.badge}
                    </span>
                    <div className="p-2.5 rounded-2xl bg-white/5 border border-white/10 text-gim-skyblue-bright group-hover:scale-110 transition-transform">
                      <IconComp className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Service Title */}
                  <h3 className="text-xl font-bold text-white group-hover:text-gim-skyblue-bright transition-colors leading-snug">
                    {service.name}
                  </h3>

                  {/* Day & Time Card */}
                  <div className="p-3 rounded-2xl bg-black/40 border border-white/5 space-y-1.5">
                    <div className="flex items-center gap-2 text-xs font-semibold text-white">
                      <Calendar className="w-3.5 h-3.5 text-gim-skyblue-bright" />
                      <span>{service.day}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gim-skyblue-bright font-bold">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{service.time} Prompt</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-300 font-light leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Footer Action */}
                <div className="p-4 px-6 border-t border-white/10 bg-black/20 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                    <MapPin className="w-3.5 h-3.5 text-gim-oxblood" />
                    <span>Main Sanctuary</span>
                  </div>

                  <button
                    onClick={() => handleReminder(service)}
                    className="flex items-center gap-1.5 text-xs font-bold text-slate-200 hover:text-gim-skyblue-bright transition-colors"
                  >
                    <Bell className="w-3.5 h-3.5" />
                    Set Reminder
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-14 glass-panel p-6 rounded-3xl border border-white/10 text-center max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left space-y-1">
            <h4 className="text-base font-bold text-white">First Time Visiting Gospel Inn Ministry?</h4>
            <p className="text-xs text-slate-300">
              We have dedicated guest welcoming hosts, comfortable seating, and children ministry coverage for all services.
            </p>
          </div>
          <a
            href="https://maps.app.goo.gl/vLX8Gg7AwmP1Gpsj9?g_st=aw"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-gim-oxblood to-gim-oxblood-hover border border-gim-skyblue-bright/30 shadow-md shrink-0"
          >
            Plan Your Visit
          </a>
        </div>

      </div>
    </section>
  );
}
