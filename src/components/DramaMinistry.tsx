"use client";

import React from "react";
import Image from "next/image";
import { Theater, Sparkles, Film, Music, Shield, Play } from "lucide-react";

export default function DramaMinistry() {
  return (
    <section id="drama" className="py-24 bg-[#0B1120] relative overflow-hidden">
      {/* Glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#7A0C1E]/25 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#0EA5E9]/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Information & Features */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#7A0C1E]/30 border border-[#7A0C1E] text-xs font-bold text-[#38BDF8] uppercase tracking-wider">
              <Theater className="w-3.5 h-3.5" />
              Every Sunday @ 4:00 PM
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              STRASODA Renewal & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#7DD3FC] to-[#38BDF8]">
                Vine Drama Ministry
              </span>
            </h2>

            <p className="text-slate-300 text-base font-light leading-relaxed">
              Experience the gospel brought alive through anointed stage plays, theatrical storytelling, intense worship, and prophetic spiritual renewal every Sunday afternoon.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-[#38BDF8]/40 transition-colors">
                <div className="p-3 rounded-xl bg-[#7A0C1E]/40 border border-[#7A0C1E] text-[#38BDF8] shrink-0">
                  <Film className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white mb-0.5">Prophetic Drama & Stage Presentations</h3>
                  <p className="text-xs text-slate-300 font-light">
                    Compelling gospel dramas produced by Vine Drama Ministry designed to convict, heal, and transform lives.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-[#38BDF8]/40 transition-colors">
                <div className="p-3 rounded-xl bg-[#0EA5E9]/20 border border-[#0EA5E9]/40 text-[#38BDF8] shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white mb-0.5">STRASODA Spiritual Renewal</h3>
                  <p className="text-xs text-slate-300 font-light">
                    Weekly renewal service refreshing believers after the week through deep worship, intercession, and divine word.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 pt-4">
              <a
                href="#schedule"
                className="px-6 py-3 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-[#7A0C1E] to-[#9E1B32] border border-[#38BDF8]/30 shadow-lg hover:shadow-[#38BDF8]/20 transition-all flex items-center gap-2"
              >
                <Theater className="w-4 h-4 text-[#38BDF8]" />
                Join Next Sunday Drama Service
              </a>
            </div>

          </div>

          {/* Right Column: Visual Stage Image */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-[#7A0C1E] via-[#38BDF8] to-[#7A0C1E] opacity-40 blur-xl"></div>
              
              <div className="relative rounded-3xl overflow-hidden glass-panel border border-white/15 shadow-2xl">
                <div className="relative h-[420px] w-full">
                  <Image
                    src="/images/drama.png"
                    alt="Vine Drama Ministry Gospel Performance"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-transparent to-transparent"></div>

                  <div className="absolute bottom-6 left-6 right-6 glass-panel-oxblood p-4 rounded-2xl border border-[#7A0C1E] flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-[#38BDF8] uppercase tracking-wider">Vine Drama Ministry</div>
                      <div className="text-sm font-bold text-white">Sunday Live Stage Presentation</div>
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
