"use client";

import React from "react";
import Image from "next/image";
import { Quote, BookOpen, Sparkles, Heart, Award, CheckCircle2 } from "lucide-react";

export default function PastorSpotlight() {
  return (
    <section id="pastor" className="py-24 bg-[#0F172A] relative overflow-hidden">
      {/* Decorative Glows */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-[#7A0C1E]/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#38BDF8]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#7A0C1E]/30 border border-[#7A0C1E] text-xs font-bold text-[#38BDF8] uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Leadership & Vision
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Meet Lead Pastor <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#7DD3FC] to-[#38BDF8]">Ameh Amana</span>
          </h2>
          <p className="text-slate-300 text-base font-light">
            Servant leader, teacher of God&apos;s word, and visionary head of Gospel Inn Ministry.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Pastor Image Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Decorative Frame */}
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-[#7A0C1E] via-[#38BDF8] to-[#7A0C1E] opacity-40 blur-xl"></div>
              
              <div className="relative rounded-3xl overflow-hidden glass-panel border border-white/15 shadow-2xl">
                <div className="relative h-[480px] w-full">
                  <Image
                    src="/images/pastor.png"
                    alt="Lead Pastor Ameh Amana - Gospel Inn Ministry"
                    fill
                    className="object-cover object-top hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-transparent to-transparent"></div>

                  {/* Badge */}
                  <div className="absolute bottom-6 left-6 right-6 glass-panel-oxblood p-4 rounded-2xl border border-[#7A0C1E]">
                    <div className="text-sm font-bold text-white">Pastor Ameh Amana</div>
                    <div className="text-xs text-[#38BDF8] font-medium">Lead Pastor, Gospel Inn Ministry</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Pastoral Message & Pillars */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Quote Card */}
            <div className="glass-panel p-6 rounded-3xl border border-white/10 relative">
              <Quote className="w-10 h-10 text-[#7A0C1E] opacity-60 absolute top-4 right-4" />
              <p className="text-slate-200 italic text-base sm:text-lg font-light leading-relaxed relative z-10">
                &ldquo;At Gospel Inn Ministry, our mandate is clear: to prepare a people fervent in prayer, rooted in discipleship, empowered by truth, and expressing the beauty of Christ through every avenue of ministry.&rdquo;
              </p>
              <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                <span className="font-semibold text-white">— Pastor Ameh Amana</span>
                <span className="text-[#38BDF8]">Gospel Inn Ministry</span>
              </div>
            </div>

            {/* Pastoral Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-[#38BDF8]/40 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-[#7A0C1E]/40 border border-[#7A0C1E] flex items-center justify-center text-[#38BDF8] mb-3">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-white mb-1">Fervent Prayer & Word</h3>
                <p className="text-xs text-slate-300">
                  Weekly Prayer School and Encounter Services designed to deepen spiritual stamina and biblical grounding.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-[#38BDF8]/40 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-[#0EA5E9]/20 border border-[#0EA5E9]/40 flex items-center justify-center text-[#38BDF8] mb-3">
                  <Award className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-white mb-1">Discipleship & Leadership</h3>
                <p className="text-xs text-slate-300">
                  Building believers into mature leaders through Discipleship Classes and Strategic Leadership Conferences.
                </p>
              </div>
            </div>

            {/* Pastoral Welcome Letter */}
            <div className="space-y-3 text-sm text-slate-300 leading-relaxed font-light">
              <p>
                Whether you are joining us for our weekly <strong className="text-white">Prayer School on Mondays</strong>, seeking spiritual depth in our <strong className="text-white">Discipleship Class on Tuesdays</strong>, or worshiping with us during the <strong className="text-white">STRASODA Renewal Service on Sundays</strong>, there is a place reserved for you at the Inn.
              </p>
              <p>
                We invite you to experience the life-transforming power of Jesus Christ in our fellowship.
              </p>
            </div>

            {/* Action Bar */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#schedule"
                className="px-6 py-3 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-[#7A0C1E] to-[#9E1B32] border border-[#38BDF8]/30 shadow-lg hover:shadow-[#38BDF8]/20 transition-all"
              >
                View Full Weekly Schedule
              </a>
              <a
                href="#conferences"
                className="px-6 py-3 rounded-xl font-semibold text-xs text-slate-200 bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
              >
                Explore Conferences
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
