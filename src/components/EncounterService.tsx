"use client";

import React from "react";
import Image from "next/image";
import { Sparkles, Flame, Music, Calendar } from "lucide-react";

export default function EncounterService() {
  return (
    <section id="encounter" className="py-24 bg-[#0B1120] relative overflow-hidden">
      {/* Glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#6E0A1A]/25 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#0EA5E9]/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Information & Features */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#6E0A1A]/30 border border-[#6E0A1A] text-xs font-bold text-[#38BDF8] uppercase tracking-wider">
              <Calendar className="w-3.5 h-3.5" />
              Every Thursday @ 4:00 PM
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              The Flagship <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#7DD3FC] to-[#38BDF8]">
                Thursday Encounter Service
              </span>
            </h2>

            <p className="text-slate-300 text-base font-light leading-relaxed">
              Experience explosive praise, prophetic ministry, healing, and word revelation at our main weekly service dedicated to divine visitation and life transformation.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-[#38BDF8]/40 transition-colors">
                <div className="p-3 rounded-xl bg-[#6E0A1A]/40 border border-[#6E0A1A] text-[#38BDF8] shrink-0">
                  <Flame className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white mb-0.5">Explosive Praise & Worship</h3>
                  <p className="text-xs text-slate-300 font-light">
                    Atmospheric worship ushering the raw presence of God through fervent praise, celebration, and deep adoration.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-[#38BDF8]/40 transition-colors">
                <div className="p-3 rounded-xl bg-[#0EA5E9]/20 border border-[#0EA5E9]/40 text-[#38BDF8] shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white mb-0.5">Prophetic Ministry & Healing</h3>
                  <p className="text-xs text-slate-300 font-light">
                    Divine visitation featuring prophetic ministration, healing, and revelatory word that renews the spirit.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 pt-4">
              <a
                href="#schedule"
                className="px-6 py-3 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-[#6E0A1A] to-[#9E1B32] border border-[#38BDF8]/30 shadow-lg hover:shadow-[#38BDF8]/20 transition-all flex items-center gap-2"
              >
                <Music className="w-4 h-4 text-[#38BDF8]" />
                Join Next Thursday Encounter Service
              </a>
            </div>

          </div>

          {/* Right Column: Visual Worship Image */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-[#6E0A1A] via-[#38BDF8] to-[#6E0A1A] opacity-40 blur-xl"></div>
              
              <div className="relative rounded-3xl overflow-hidden glass-panel border border-white/15 shadow-2xl">
                <div className="relative h-[420px] w-full">
                  <Image
                    src="/images/worship.png"
                    alt="Thursday Encounter Service Worship"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-transparent to-transparent"></div>

                  <div className="absolute bottom-6 left-6 right-6 glass-panel-oxblood p-4 rounded-2xl border border-[#6E0A1A] flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-[#38BDF8] uppercase tracking-wider">Encounter Service</div>
                      <div className="text-sm font-bold text-white">Thursday Flagship Service</div>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-[#38BDF8]/20 border border-[#38BDF8] text-[10px] text-white font-bold">
                      4:00 PM
                    </span>
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
