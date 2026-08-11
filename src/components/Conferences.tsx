"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, Users, Award, Shield, Music, Flame, HeartHandshake, ChevronRight, X, Phone, type LucideIcon } from "lucide-react";

interface Conference {
  id: string;
  title: string;
  acronym?: string;
  tagline: string;
  demographic: string;
  description: string;
  icon: LucideIcon;
  color: "oxblood" | "skyblue" | "gold";
  season: string;
}

export default function Conferences() {
  const [selectedConference, setSelectedConference] = useState<Conference | null>(null);

  const conferences: Conference[] = [
    {
      id: "strategic-leadership",
      title: "Strategic Leadership Conference",
      acronym: "SLC",
      tagline: "Equipping Kingdom Leaders for Global Impact",
      demographic: "Pastors, Church Workers, Executives & Leaders",
      description: "An intensive annual gathering for church leaders, ministry heads, and executives. Focused on strategic vision, administrative excellence, spiritual authority, and effective kingdom leadership.",
      icon: Shield,
      color: "oxblood",
      season: "Annual Leadership Gathering",
    },
    {
      id: "strasoda-gathering",
      title: "STRASODA Gathering",
      acronym: "STRASODA",
      tagline: "Strategic Sound, Drama, and Anointing Convention",
      demographic: "All Believers, Creative Artists, Drama Ministers",
      description: "The flagship convention combining strategic spiritual warfare, anointed music, theatrical drama, and prophetic word release for territorial impact.",
      icon: Sparkles,
      color: "skyblue",
      season: "Flagship Annual Convention",
    },
    {
      id: "alabaster-women",
      title: "Alabaster Women & Single Ladies’ Convention",
      acronym: "ALABASTER",
      tagline: "Unbroken Worship, Virtuous Living, & Sisterhood",
      demographic: "Women, Single Ladies & Mothers",
      description: "A consecrated gathering designed to empower women to pour out their alabaster box of worship, heal emotional wounds, build godly families, and fulfill destiny.",
      icon: HeartHandshake,
      color: "oxblood",
      season: "Women's Annual Convention",
    },
    {
      id: "melec",
      title: "MELEC – Men Like Eagles Conference",
      acronym: "MELEC",
      tagline: "Soaring in Spiritual Strength, Integrity, & Purpose",
      demographic: "Men, Fathers & Young Men",
      description: "Empowering men to rise above societal challenges, step into spiritual priesthood in their homes, build wealth with integrity, and mount up with wings as eagles.",
      icon: Award,
      color: "skyblue",
      season: "Men's Summit",
    },
    {
      id: "feliso",
      title: "FELISO – Festival of Living Songs",
      acronym: "FELISO",
      tagline: "A Symphony of Heavenly Praise & Prophetic Worship",
      demographic: "Music Ministers, Worshipers & Public",
      description: "An extraordinary musical worship festival featuring high praise, prophetic chants, choral majesty, and deep spiritual melodies that usher in the raw presence of God.",
      icon: Music,
      color: "gold",
      season: "Annual Worship Festival",
    },
    {
      id: "ppc",
      title: "PPC – Prayer and Prophetic Conference",
      acronym: "PPC",
      tagline: "Unlocking Divine Oracles & Territorial Deliverance",
      demographic: "Prayer Warriors, Intercessors & All Seekers",
      description: "A high-potency prayer conference focused on breaking ancestral yokes, receiving clear prophetic direction, and activating spiritual gifts.",
      icon: Flame,
      color: "oxblood",
      season: "Prophetic Prayer Summit",
    },
    {
      id: "children-on-fire",
      title: "Children on Fire Outreach",
      acronym: "COFO",
      tagline: "Igniting the Next Generation for Jesus Christ",
      demographic: "Children, Pre-teens & Youth Volunteers",
      description: "A dynamic children's revival outreach packed with biblical teaching, creative drama, worship, memory verse challenges, and holy spirit empowerment for young ones.",
      icon: Users,
      color: "skyblue",
      season: "Kids & Youth Revival",
    },
  ];

  useEffect(() => {
    if (!selectedConference) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedConference(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedConference]);

  return (
    <section id="conferences" className="py-24 bg-slate-900 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-gim-oxblood/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gim-skyblue-bright/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gim-oxblood/30 border border-gim-oxblood text-xs font-bold text-gim-skyblue-bright uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Kingdom Impact Conventions
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Flagship <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gim-skyblue-light to-gim-skyblue-bright">Conferences & Outreaches</span>
          </h2>
          <p className="text-slate-300 text-base font-light">
            Empowering every demographic—Leaders, Men, Women, Youth, and Children—under God&apos;s holy altar.
          </p>
        </div>

        {/* Conferences Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {conferences.map((conf) => {
            const IconComponent = conf.icon;

            return (
              <div
                key={conf.id}
                className="group relative rounded-3xl p-6 glass-panel border border-white/10 hover:border-gim-skyblue-bright/50 transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between"
              >
                {/* Top Badge & Icon */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-gim-oxblood/40 text-gim-skyblue-bright border border-gim-oxblood">
                      {conf.season}
                    </span>
                    <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-gim-skyblue-bright group-hover:scale-110 transition-transform">
                      <IconComponent className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Title & Acronym */}
                  <div>
                    <h3 className="text-xl font-extrabold text-white group-hover:text-gim-skyblue-bright transition-colors leading-snug">
                      {conf.title}
                    </h3>
                    <p className="text-xs font-semibold text-gim-skyblue-bright mt-1">
                      {conf.tagline}
                    </p>
                  </div>

                  {/* Target Audience */}
                  <div className="flex items-center gap-2 text-xs text-slate-400 font-medium pt-1">
                    <Users className="w-3.5 h-3.5 text-gim-oxblood" />
                    <span>{conf.demographic}</span>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-300 font-light leading-relaxed">
                    {conf.description}
                  </p>
                </div>

                {/* Bottom Action Button */}
                <div className="pt-6 mt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs text-slate-400">Gospel Inn Ministry</span>
                  <button
                    onClick={() => setSelectedConference(conf)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-gim-oxblood to-gim-oxblood-hover hover:from-gim-oxblood-hover hover:to-gim-oxblood border border-gim-skyblue-bright/30 flex items-center gap-1 transition-all"
                  >
                    <span>Register / Info</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Conference Info Modal */}
      {selectedConference && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in"
          onClick={() => setSelectedConference(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`${selectedConference.title} — Information`}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg rounded-3xl glass-panel p-6 sm:p-8 border border-white/20 shadow-2xl space-y-5 text-left"
          >
            <button
              onClick={() => setSelectedConference(null)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-full bg-white/5"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gim-oxblood/40 border border-gim-oxblood text-[11px] font-bold text-gim-skyblue-bright uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                {selectedConference.season}
              </span>
              <h3 className="text-2xl font-black text-white">{selectedConference.title}</h3>
              <p className="text-xs font-semibold text-gim-skyblue-bright">{selectedConference.tagline}</p>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-300 font-medium pt-1">
              <Users className="w-3.5 h-3.5 text-gim-oxblood" />
              <span>{selectedConference.demographic}</span>
            </div>

            <p className="text-xs text-slate-300 font-light leading-relaxed">
              {selectedConference.description}
            </p>

            <div className="p-4 rounded-2xl bg-gradient-to-br from-gim-oxblood/40 to-gim-dark border border-gim-oxblood space-y-2">
              <div className="text-xs font-bold text-gim-skyblue-bright uppercase tracking-wider">
                Registration &amp; Details
              </div>
              <p className="text-xs text-slate-300 font-light">
                To register or find out more about this gathering, call or WhatsApp the ministry office.
              </p>
              <a
                href="tel:09127462401"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-gim-oxblood to-gim-oxblood-hover border border-gim-skyblue-bright/30 transition-all hover:shadow-gim-skyblue-bright/20"
              >
                <Phone className="w-3.5 h-3.5 text-gim-skyblue-bright" />
                0912 746 2401
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
