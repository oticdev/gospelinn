"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, Users, Award, Shield, Music, Flame, HeartHandshake, ChevronRight, X, CheckCircle2, type LucideIcon } from "lucide-react";

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
  const [registerSuccess, setRegisterSuccess] = useState(false);

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

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterSuccess(true);
    setTimeout(() => {
      setRegisterSuccess(false);
      setSelectedConference(null);
    }, 2500);
  };

  useEffect(() => {
    if (!selectedConference) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedConference(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedConference]);

  return (
    <section id="conferences" className="py-24 bg-[#0F172A] relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-[#6E0A1A]/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#38BDF8]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#6E0A1A]/30 border border-[#6E0A1A] text-xs font-bold text-[#38BDF8] uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Kingdom Impact Conventions
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Flagship <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#7DD3FC] to-[#38BDF8]">Conferences & Outreaches</span>
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
                className="group relative rounded-3xl p-6 glass-panel border border-white/10 hover:border-[#38BDF8]/50 transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between"
              >
                {/* Top Badge & Icon */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-[#6E0A1A]/40 text-[#38BDF8] border border-[#6E0A1A]">
                      {conf.season}
                    </span>
                    <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-[#38BDF8] group-hover:scale-110 transition-transform">
                      <IconComponent className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Title & Acronym */}
                  <div>
                    <h3 className="text-xl font-extrabold text-white group-hover:text-[#38BDF8] transition-colors leading-snug">
                      {conf.title}
                    </h3>
                    <p className="text-xs font-semibold text-[#38BDF8] mt-1">
                      {conf.tagline}
                    </p>
                  </div>

                  {/* Target Audience */}
                  <div className="flex items-center gap-2 text-xs text-slate-400 font-medium pt-1">
                    <Users className="w-3.5 h-3.5 text-[#6E0A1A]" />
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
                    className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#6E0A1A] to-[#9E1B32] hover:from-[#9E1B32] hover:to-[#6E0A1A] border border-[#38BDF8]/30 flex items-center gap-1 transition-all"
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

      {/* Conference Registration Modal */}
      {selectedConference && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in"
          onClick={() => setSelectedConference(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`${selectedConference.title} Registration`}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg rounded-3xl glass-panel p-6 sm:p-8 border border-white/20 shadow-2xl space-y-5"
          >
            <button
              onClick={() => setSelectedConference(null)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-full bg-white/5"
            >
              <X className="w-5 h-5" />
            </button>

            {registerSuccess ? (
              <div className="text-center py-8 space-y-3">
                <CheckCircle2 className="w-14 h-14 text-[#38BDF8] mx-auto animate-bounce" />
                <h3 className="text-2xl font-bold text-white">Registration Submitted!</h3>
                <p className="text-xs text-slate-300">
                  Thank you for registering for <strong className="text-white">{selectedConference.title}</strong>. Our event team will send schedule details to your email.
                </p>
              </div>
            ) : (
              <>
                <div className="space-y-1 text-left">
                  <span className="text-xs font-bold text-[#38BDF8] uppercase">
                    Gospel Inn Ministry Event Registration
                  </span>
                  <h3 className="text-2xl font-black text-white">{selectedConference.title}</h3>
                  <p className="text-xs text-slate-300">{selectedConference.tagline}</p>
                </div>

                <form onSubmit={handleRegister} className="space-y-4 text-left">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Bro. Emmanuel Oko"
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white text-sm focus:outline-none focus:border-[#38BDF8]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Phone Number</label>
                      <input
                        required
                        type="tel"
                        placeholder="+234..."
                        className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white text-sm focus:outline-none focus:border-[#38BDF8]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
                      <input
                        required
                        type="email"
                        placeholder="you@example.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white text-sm focus:outline-none focus:border-[#38BDF8]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Attending As</label>
                    <select className="w-full px-4 py-2.5 rounded-xl bg-[#0B1120] border border-white/15 text-white text-sm focus:outline-none focus:border-[#38BDF8]">
                      <option>First-time Delegate</option>
                      <option>GIM Church Member</option>
                      <option>Visiting Pastor / Minister</option>
                      <option>Online Participant</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#6E0A1A] to-[#9E1B32] border border-[#38BDF8]/40 shadow-lg hover:shadow-[#38BDF8]/20 transition-all mt-2"
                  >
                    Confirm Registration
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
