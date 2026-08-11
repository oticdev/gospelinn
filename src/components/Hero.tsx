"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Play, Calendar, ShieldCheck, Flame, Clock } from "lucide-react";

export default function Hero() {
  const getNextEncounter = () => {
    const now = new Date();
    const target = new Date(now);
    const diff = (4 - now.getDay() + 7) % 7;
    target.setDate(now.getDate() + diff);
    target.setHours(16, 0, 0, 0);
    return target.getTime() <= now.getTime()
      ? target.getTime() + 7 * 86400000
      : target.getTime();
  };

  const [target, setTarget] = useState(getNextEncounter);
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const tick = () => {
      const remaining = Math.max(0, target - Date.now());
      if (remaining === 0) {
        setTarget(getNextEncounter());
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTimeLeft({
        hours: Math.floor(remaining / 3.6e6),
        minutes: Math.floor((remaining % 3.6e6) / 6e4),
        seconds: Math.floor((remaining % 6e4) / 1e3),
      });
    };
    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, [target]);

  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gim-dark">
      {/* Dynamic Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gim-oxblood/20 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-gim-skyblue/15 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute inset-0 bg-pattern-grid opacity-40 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Top Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
              <Flame className="w-4 h-4 text-gim-skyblue-bright animate-pulse" />
              <span className="text-xs font-semibold tracking-wider text-slate-200 uppercase">
                Gospel Inn Ministry • Lead Pastor Ameh Amana
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1]">
              A Sanctuary of <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gim-skyblue-light to-gim-skyblue-bright">
                Prayer, Encounter
              </span>{" "}
              & Transformation
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-light leading-relaxed mx-auto lg:mx-0">
              Welcome to <span className="text-white font-semibold">Gospel Inn Ministry</span>. We are dedicated to raising disciples, building spiritual intimacy, and experiencing the deep realities of the presence of God through fervent prayer and biblical truth.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#schedule"
                className="px-7 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-gim-oxblood via-gim-oxblood-hover to-gim-oxblood border border-gim-skyblue-bright/40 shadow-xl shadow-gim-oxblood/40 hover:shadow-gim-skyblue-bright/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2 text-sm"
              >
                <Calendar className="w-4 h-4 text-gim-skyblue-bright" />
                Join Our Next Service
              </a>

              <a
                href="#sermons"
                className="px-6 py-3.5 rounded-xl font-semibold text-slate-200 hover:text-white bg-white/5 hover:bg-white/10 border border-white/15 hover:border-gim-skyblue-bright/50 backdrop-blur-md transition-all flex items-center gap-2 text-sm"
              >
                <Play className="w-4 h-4 text-gim-skyblue-bright fill-gim-skyblue-bright" />
                Watch Messages
              </a>
            </div>

            {/* Next Service Countdown Pill Card */}
            <div className="pt-4">
              <div className="glass-panel p-4 rounded-2xl border border-white/10 max-w-lg mx-auto lg:mx-0 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3 text-left">
                  <div className="p-2.5 rounded-xl bg-gim-oxblood/40 border border-gim-oxblood text-gim-skyblue-bright">
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
                    <span className="text-sm font-bold text-gim-skyblue-bright">{String(timeLeft.hours).padStart(2, "0")}</span>
                    <span className="text-[10px] text-slate-400 block -mt-1">hrs</span>
                  </div>
                  <span className="text-slate-500 font-bold">:</span>
                  <div>
                    <span className="text-sm font-bold text-white">{String(timeLeft.minutes).padStart(2, "0")}</span>
                    <span className="text-[10px] text-slate-400 block -mt-1">min</span>
                  </div>
                  <span className="text-slate-500 font-bold">:</span>
                  <div>
                    <span className="text-sm font-bold text-gim-skyblue-bright">{String(timeLeft.seconds).padStart(2, "0")}</span>
                    <span className="text-[10px] text-slate-400 block -mt-1">sec</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-4 pt-4 max-w-lg mx-auto lg:mx-0 border-t border-white/10">
              <div>
                <div className="text-xl sm:text-2xl font-black text-white">4 Weekly</div>
                <div className="text-xs text-slate-400">Services & Classes</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-black text-gim-skyblue-bright">7 Annual</div>
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
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-gim-oxblood via-gim-skyblue-bright to-gim-oxblood opacity-50 blur-lg"></div>

              <div className="relative rounded-3xl overflow-hidden glass-panel border border-white/15 shadow-2xl">
                <div className="relative h-[420px] w-full">
                  <Image
                    src="/images/hero-worship.png"
                    alt="Gospel Inn Ministry Worship Service"
                    fill
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    priority
                    className="object-cover object-center transform hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gim-dark via-gim-dark/40 to-transparent"></div>

                  {/* Floating Overlay Badge 1 */}
                  <div className="absolute top-4 left-4 glass-panel-oxblood px-3 py-2 rounded-xl flex items-center gap-2 border border-gim-oxblood">
                    <ShieldCheck className="w-4 h-4 text-gim-skyblue-bright" />
                    <span className="text-xs font-semibold text-white">Pastor Ameh Amana</span>
                  </div>

                  {/* Floating Overlay Badge 2 */}
                  <div className="absolute bottom-6 left-6 right-6 glass-panel p-4 rounded-2xl border border-white/10 text-left">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-gim-skyblue-bright uppercase tracking-wider">
                        Encounter Service
                      </span>
                      <span className="text-[10px] text-slate-400">Thursdays 4:00 PM</span>
                    </div>
                    <p className="text-xs text-slate-200 line-clamp-2">
                      Experience explosive praise, prophetic ministry, healing, and word revelation every Thursday afternoon.
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
