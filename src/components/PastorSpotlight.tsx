"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Quote, BookOpen, Sparkles, Award, UserPlus } from "lucide-react";
import PastorConnectModal from "./PastorConnectModal";

export default function PastorSpotlight() {
  const [connectOpen, setConnectOpen] = useState(false);
  return (
    <section id="pastor" className="py-24 bg-slate-900 relative overflow-hidden">
      {/* Decorative Glows */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-gim-oxblood/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-gim-skyblue-bright/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gim-oxblood/30 border border-gim-oxblood text-xs font-bold text-gim-skyblue-bright uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Leadership & Vision
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Meet Lead Pastor <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gim-skyblue-light to-gim-skyblue-bright">Ameh Amana</span>
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
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-gim-oxblood via-gim-skyblue-bright to-gim-oxblood opacity-40 blur-xl"></div>
              
              <div
                role="button"
                tabIndex={0}
                aria-label="Connect with Pastor Ameh Amana"
                onClick={() => setConnectOpen(true)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setConnectOpen(true);
                  }
                }}
                className="relative rounded-3xl overflow-hidden glass-panel border border-white/15 shadow-2xl cursor-pointer group/connect hover:border-gim-skyblue-bright/50 transition-colors"
              >
                <div className="relative h-[480px] w-full">
                  <Image
                    src="/images/daddyAmeh.jpeg"
                    alt="Lead Pastor Ameh Amana - Gospel Inn Ministry"
                    fill
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover object-top group-hover/connect:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gim-dark via-transparent to-transparent"></div>

                  {/* Connect Hint */}
                  <div className="absolute top-4 right-4 glass-panel px-3 py-1.5 rounded-full text-[10px] font-bold text-gim-skyblue-bright uppercase tracking-wider flex items-center gap-1.5">
                    <UserPlus className="w-3.5 h-3.5" />
                    Connect &amp; Invite
                  </div>

                  {/* Badge */}
                  <div className="absolute bottom-6 left-6 right-6 glass-panel-oxblood p-4 rounded-2xl border border-gim-oxblood">
                    <div className="text-sm font-bold text-white">Pastor Ameh Amana</div>
                    <div className="text-xs text-gim-skyblue-bright font-medium">Lead Pastor, Gospel Inn Ministry</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Pastoral Message & Pillars */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Quote Card */}
            <div className="glass-panel p-6 rounded-3xl border border-white/10 relative">
              <Quote className="w-10 h-10 text-gim-oxblood opacity-60 absolute top-4 right-4" />
              <p className="text-slate-200 italic text-base sm:text-lg font-light leading-relaxed relative z-10">
                &ldquo;At Gospel Inn Ministry, our mandate is clear: to prepare a people fervent in prayer, rooted in discipleship, empowered by truth, and expressing the beauty of Christ through every avenue of ministry.&rdquo;
              </p>
              <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                <span className="font-semibold text-white">— Pastor Ameh Amana</span>
                <span className="text-gim-skyblue-bright">Gospel Inn Ministry</span>
              </div>
            </div>

            {/* Pastoral Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-gim-skyblue-bright/40 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-gim-oxblood/40 border border-gim-oxblood flex items-center justify-center text-gim-skyblue-bright mb-3">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-white mb-1">Fervent Prayer & Word</h3>
                <p className="text-xs text-slate-300">
                  Weekly Prayer School and Encounter Services designed to deepen spiritual stamina and biblical grounding.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-gim-skyblue-bright/40 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-gim-skyblue/20 border border-gim-skyblue/40 flex items-center justify-center text-gim-skyblue-bright mb-3">
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
                Whether you are joining us for our weekly <strong className="text-white">Prayer School on Mondays</strong>, seeking spiritual depth in our <strong className="text-white">Discipleship Class on Tuesdays</strong>, or worshiping with us during the <strong className="text-white">Thursday Encounter Service</strong>, there is a place reserved for you at the Inn.
              </p>
              <p>
                We invite you to experience the life-transforming power of Jesus Christ in our fellowship.
              </p>
            </div>

            {/* Action Bar */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#schedule"
                className="px-6 py-3 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-gim-oxblood to-gim-oxblood-hover border border-gim-skyblue-bright/30 shadow-lg hover:shadow-gim-skyblue-bright/20 transition-all"
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

        {connectOpen && <PastorConnectModal onClose={() => setConnectOpen(false)} />}
      </div>
    </section>
  );
}
