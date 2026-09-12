"use client";

import React, { useEffect, useRef, useState } from "react";
import { Calendar, Clock, MapPin, Bell, Sparkles, Flame, CheckCircle2, Moon, Shield, type LucideIcon } from "lucide-react";
import { SERVICES, type ServiceSchedule } from "@/lib/schedule";
import { buildServiceIcs } from "@/lib/ics";
import { SANCTUARY_MAPS_URL } from "@/lib/contact";

const SERVICE_ICONS: Record<string, LucideIcon> = {
  "prayer-school": Flame,
  "discipleship-class": Shield,
  "encounter-service": Sparkles,
  "night-of-encounter": Moon,
};

const FILTERS = ["All", "Weekly", "Monthly"] as const;
type Filter = (typeof FILTERS)[number];

export default function WeeklySchedule() {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");
  const [reminderSaved, setReminderSaved] = useState<string | null>(null);
  const bannerTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (bannerTimer.current) clearTimeout(bannerTimer.current);
    };
  }, []);

  const handleReminder = (service: ServiceSchedule) => {
    const ics = buildServiceIcs(service);
    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${service.id}.ics`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    // Safari can drop the download if the URL is revoked synchronously.
    setTimeout(() => URL.revokeObjectURL(url), 10_000);

    setReminderSaved(service.name);
    if (bannerTimer.current) clearTimeout(bannerTimer.current);
    bannerTimer.current = setTimeout(() => setReminderSaved(null), 3500);
  };

  const filteredServices = SERVICES.filter(
    (s) => activeFilter === "All" || s.frequency === activeFilter
  );

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
            Join Gospel Inn Ministry for fellowship, prayer, discipleship, and encounters. All times are West Africa Time (WAT).
          </p>
        </div>

        {/* Reminder Feedback Banner */}
        <div role="status" aria-live="polite">
          {reminderSaved && (
            <div className="max-w-md mx-auto mb-8 p-3 rounded-xl bg-gim-skyblue/20 border border-gim-skyblue-bright text-center text-xs font-semibold text-white flex items-center justify-center gap-2 animate-fade-in">
              <CheckCircle2 className="w-4 h-4 text-gim-skyblue-bright" />
              Calendar file downloaded for {reminderSaved}! Import it into Google, Apple, or Outlook Calendar.
            </div>
          )}
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              aria-pressed={activeFilter === filter}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeFilter === filter
                  ? "bg-gradient-to-r from-gim-oxblood to-gim-oxblood-hover text-white border border-gim-skyblue-bright/40 shadow-lg shadow-gim-oxblood/30"
                  : "bg-white/5 text-slate-300 hover:text-white border border-white/10 hover:bg-white/10"
              }`}
            >
              {filter === "All" ? "All" : `${filter} Services`}
            </button>
          ))}
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => {
            const IconComp = SERVICE_ICONS[service.id] ?? Calendar;
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
                    type="button"
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
            href={SANCTUARY_MAPS_URL}
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
