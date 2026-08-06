"use client";

import React, { useState } from "react";
import { Calendar, Clock, MapPin, Bell, Sparkles, Flame, CheckCircle2, ChevronRight, Moon, Shield, Theater } from "lucide-react";

interface ServiceEvent {
  id: string;
  name: string;
  day: string;
  time: string;
  frequency: "Weekly" | "Monthly";
  category: "Prayer" | "Discipleship" | "Worship" | "Vigil" | "Drama";
  icon: any;
  description: string;
  badge?: string;
  color: "oxblood" | "skyblue";
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
      category: "Prayer",
      icon: Flame,
      description: "A consecrated atmosphere dedicated to intercession, spiritual warfare instruction, and building personal prayer endurance.",
      badge: "Spiritual Growth",
      color: "oxblood",
    },
    {
      id: "discipleship-class",
      name: "Discipleship Class",
      day: "Every Tuesday",
      time: "4:00 PM",
      frequency: "Weekly",
      category: "Discipleship",
      icon: Shield,
      description: "In-depth exposition of biblical doctrines, Christian character formation, and personal spiritual growth under pastoral guidance.",
      badge: "Foundational Doctrine",
      color: "skyblue",
    },
    {
      id: "encounter-service",
      name: "Encounter Service",
      day: "Every Thursday",
      time: "4:00 PM",
      frequency: "Weekly",
      category: "Worship",
      icon: Sparkles,
      description: "Mid-week divine visitation featuring explosive praise, prophetic ministry, healing, and word revelation.",
      badge: "Prophetic & Power",
      color: "oxblood",
    },
    {
      id: "night-of-encounter",
      name: "Night of Encounter (Monthly Vigil)",
      day: "3rd Friday of Every Month",
      time: "9:00 PM",
      frequency: "Monthly",
      category: "Vigil",
      icon: Moon,
      description: "All-night prayer vigil reserved for intense spiritual breakthroughs, deliverance, prophetic ministration, and divine encounters.",
      badge: "Monthly All-Night Vigil",
      color: "oxblood",
    },
    {
      id: "strasoda-renewal",
      name: "STRASODA Renewal Service & Vine Drama Ministry",
      day: "Every Sunday",
      time: "4:00 PM",
      frequency: "Weekly",
      category: "Drama",
      icon: Theater,
      description: "Atmospheric Sunday gathering combining powerful Word ministration, renewal worship, and dramatic gospel plays by Vine Drama Ministry.",
      badge: "Sunday Flagship Service",
      color: "skyblue",
    },
  ];

  const handleReminder = (serviceName: string) => {
    setReminderSaved(serviceName);
    setTimeout(() => setReminderSaved(null), 3500);
  };

  const filteredServices = services.filter((s) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Weekly") return s.frequency === "Weekly";
    if (activeFilter === "Monthly") return s.frequency === "Monthly";
    if (activeFilter === "Drama & Renewal") return s.category === "Drama";
    return true;
  });

  return (
    <section id="schedule" className="py-24 bg-[#0B1120] relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#7A0C1E]/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#0EA5E9]/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute inset-0 bg-pattern-grid opacity-30 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#7A0C1E]/30 border border-[#7A0C1E] text-xs font-bold text-[#38BDF8] uppercase tracking-wider">
            <Calendar className="w-3.5 h-3.5" />
            Weekly & Monthly Gatherings
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Schedule of <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#7DD3FC] to-[#38BDF8]">Services & Classes</span>
          </h2>
          <p className="text-slate-300 text-base font-light">
            Join Gospel Inn Ministry for fellowship, prayer, discipleship, and encounters.
          </p>
        </div>

        {/* Reminder Feedback Banner */}
        {reminderSaved && (
          <div className="max-w-md mx-auto mb-8 p-3 rounded-xl bg-[#0EA5E9]/20 border border-[#38BDF8] text-center text-xs font-semibold text-white flex items-center justify-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-[#38BDF8]" />
            Reminder set for {reminderSaved}! Calendar alert added.
          </div>
        )}

        {/* Filter Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {["All", "Weekly", "Monthly", "Drama & Renewal"].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeFilter === filter
                  ? "bg-gradient-to-r from-[#7A0C1E] to-[#9E1B32] text-white border border-[#38BDF8]/40 shadow-lg shadow-[#7A0C1E]/30"
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
                className="group relative rounded-3xl overflow-hidden glass-panel border border-white/10 hover:border-[#38BDF8]/50 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
              >
                {/* Top Accent Line */}
                <div
                  className={`h-1.5 w-full ${
                    isOxblood ? "bg-gradient-to-r from-[#7A0C1E] to-[#9E1B32]" : "bg-gradient-to-r from-[#0EA5E9] to-[#38BDF8]"
                  }`}
                ></div>

                <div className="p-6 space-y-4">
                  {/* Badge & Icon */}
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full border ${
                        isOxblood
                          ? "bg-[#7A0C1E]/30 text-[#38BDF8] border-[#7A0C1E]"
                          : "bg-[#0EA5E9]/20 text-[#7DD3FC] border-[#0EA5E9]/40"
                      }`}
                    >
                      {service.badge}
                    </span>
                    <div className="p-2.5 rounded-2xl bg-white/5 border border-white/10 text-[#38BDF8] group-hover:scale-110 transition-transform">
                      <IconComp className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Service Title */}
                  <h3 className="text-xl font-bold text-white group-hover:text-[#38BDF8] transition-colors leading-snug">
                    {service.name}
                  </h3>

                  {/* Day & Time Card */}
                  <div className="p-3 rounded-2xl bg-black/40 border border-white/5 space-y-1.5">
                    <div className="flex items-center gap-2 text-xs font-semibold text-white">
                      <Calendar className="w-3.5 h-3.5 text-[#38BDF8]" />
                      <span>{service.day}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-[#38BDF8] font-bold">
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
                    <MapPin className="w-3.5 h-3.5 text-[#7A0C1E]" />
                    <span>Main Sanctuary</span>
                  </div>

                  <button
                    onClick={() => handleReminder(service.name)}
                    className="flex items-center gap-1.5 text-xs font-bold text-slate-200 hover:text-[#38BDF8] transition-colors"
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
            href="#contact"
            className="px-6 py-3 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-[#7A0C1E] to-[#9E1B32] border border-[#38BDF8]/30 shadow-md shrink-0"
          >
            Plan Your Visit
          </a>
        </div>

      </div>
    </section>
  );
}
