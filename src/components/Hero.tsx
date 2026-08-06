"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Play, Calendar, ShieldCheck, Flame, ChevronRight, Clock, MapPin, Users } from "lucide-react";

interface HeroProps {
  onOpenGiving: () => void;
  onOpenPrayer: () => void;
}

export default function Hero({ onOpenGiving, onOpenPrayer }: HeroProps) {
  // Live service countdown calculation
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 35, seconds: 20 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-[#0B1120]">
      {/* Dynamic Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#7A0C1E]/20 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-[#0EA5E9]/15 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute inset-0 bg-pattern-grid opacity-40 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Top Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
              <Flame className="w-4 h-4 text-[#38BDF8] animate-pulse" />
              <span className="text-xs font-semibold tracking-wider text-slate-200 uppercase">
                Gospel Inn Ministry • Lead Pastor Ameh Amana
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1]">
              A Sanctuary of <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#7DD3FC] to-[#38BDF8]">
                Prayer, Encounter
              </span>{" "}
              & Transformation
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-light leading-relaxed mx-auto lg:mx-0">
              Welcome to <span className="text-white font-semibold">Gospel Inn Ministry</span>. We are dedicated to raising disciples, building spiritual intimacy, and experiencing the raw presence of God through fervent prayer and biblical truth.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#schedule"
                className="px-7 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-[#7A0C1E] via-[#9E1B32] to-[#7A0C1E] border border-[#38BDF8]/40 shadow-xl shadow-[#7A0C1E]/40 hover:shadow-[#38BDF8]/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2 text-sm"
              >
                <Calendar className="w-4 h-4 text-[#38BDF8]" />
                Join Our Next Service
              </a>

              <a
                href="#sermons"
                className="px-6 py-3.5 rounded-xl font-semibold text-slate-200 hover:text-white bg-white/5 hover:bg-white/10 border border-white/15 hover:border-[#38BDF8]/50 backdrop-blur-md transition-all flex items-center gap-2 text-sm"
              >
                <Play className="w-4 h-4 text-[#38BDF8] fill-[#38BDF8]" />
                Watch Messages
              </a>
            </div>

            {/* Next Service Countdown Pill Card */}
            <div className="pt-4">
              <div className="glass-panel p-4 rounded-2xl border border-white/10 max-w-lg mx-auto lg:mx-0 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3 text-left">
                  <div className="p-2.5 rounded-xl bg-[#7A0C1E]/40 border border-[#7A0C1E] text-[#38BDF8]">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-medium">UPCOMING MEETING</div>
                    <div className="text-sm font-bold text-white">Encounter Service • Thursday 4:00 PM</div>
                  </div>
                </div>

                {/* Countdown display */}
                <div className="flex items-center gap-2 bg-black/40 px-3 py-1.5 rounded-xl border border-white/5 text-center">
                  <div>
                    <span className="text-sm font-bold text-[#38BDF8]">{String(timeLeft.hours).padStart(2, "0")}</span>
                    <span className="text-[10px] text-slate-400 block -mt-1">hrs</span>
                  </div>
                  <span className="text-slate-500 font-bold">:</span>
                  <div>
                    <span className="text-sm font-bold text-white">{String(timeLeft.minutes).padStart(2, "0")}</span>
                    <span className="text-[10px] text-slate-400 block -mt-1">min</span>
                  </div>
                  <span className="text-slate-500 font-bold">:</span>
                  <div>
                    <span className="text-sm font-bold text-[#38BDF8]">{String(timeLeft.seconds).padStart(2, "0")}</span>
                    <span className="text-[10px] text-slate-400 block -mt-1">sec</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-4 pt-4 max-w-lg mx-auto lg:mx-0 border-t border-white/10">
              <div>
                <div className="text-xl sm:text-2xl font-black text-white">5 Weekly</div>
                <div className="text-xs text-slate-400">Services & Classes</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-black text-[#38BDF8]">7 Annual</div>
                <div className="text-xs text-slate-400">Flagship Conferences</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-black text-white">1 Mission</div>
                <div className="text-xs text-slate-400">Kingdom Revival</div>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer decorative card frame */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#7A0C1E] via-[#38BDF8] to-[#7A0C1E] opacity-50 blur-lg"></div>

              <div className="relative rounded-3xl overflow-hidden glass-panel border border-white/15 shadow-2xl">
                <div className="relative h-[420px] w-full">
                  <Image
                    src="/images/worship.png"
                    alt="Gospel Inn Ministry Worship Service"
                    fill
                    priority
                    className="object-cover object-center transform hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-[#0B1120]/40 to-transparent"></div>

                  {/* Floating Overlay Badge 1 */}
                  <div className="absolute top-4 left-4 glass-panel-oxblood px-3 py-2 rounded-xl flex items-center gap-2 border border-[#7A0C1E]">
                    <ShieldCheck className="w-4 h-4 text-[#38BDF8]" />
                    <span className="text-xs font-semibold text-white">Pastor Ameh Amana</span>
                  </div>

                  {/* Floating Overlay Badge 2 */}
                  <div className="absolute bottom-6 left-6 right-6 glass-panel p-4 rounded-2xl border border-white/10 text-left">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-[#38BDF8] uppercase tracking-wider">
                        STRASODA Renewal & Vine Drama
                      </span>
                      <span className="text-[10px] text-slate-400">Sundays 4:00 PM</span>
                    </div>
                    <p className="text-xs text-slate-200 line-clamp-2">
                      Experience powerful theatrical drama presentations and deep prophetic renewal every Sunday afternoon.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
