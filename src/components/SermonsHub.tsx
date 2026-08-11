"use client";

import React, { useState, useEffect } from "react";
import { Play, Mic, Video, Download, Search, X, Clock, User } from "lucide-react";

interface Sermon {
  id: string;
  title: string;
  speaker: string;
  category: "Prayer" | "Discipleship" | "Prophetic" | "Leadership" | "Worship";
  date: string;
  duration: string;
  videoUrl: string;
  audioUrl?: string;
  description: string;
  views: string;
}

export default function SermonsHub() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeMediaModal, setActiveMediaModal] = useState<Sermon | null>(null);

  useEffect(() => {
    if (!activeMediaModal) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveMediaModal(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeMediaModal]);

  const sermons: Sermon[] = [
    {
      id: "sermon-1",
      title: "Atmosphere of Fervent Prayer: Prevailing in the Secret Place",
      speaker: "Pastor Ameh Amana",
      category: "Prayer",
      date: "August 2026",
      duration: "1h 15m",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      description: "An explosive message delivered during Prayer School exploring how believers can build unshakeable prayer altars and stay burning.",
      views: "2.4k views",
    },
    {
      id: "sermon-2",
      title: "The Pillars of Kingdom Discipleship & Character",
      speaker: "Pastor Ameh Amana",
      category: "Discipleship",
      date: "July 2026",
      duration: "58m",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      description: "Exposition from Tuesday Discipleship Class on cultivating spiritual endurance, integrity, and alignment with Christ's mind.",
      views: "1.8k views",
    },
    {
      id: "sermon-3",
      title: "Night of Encounter: Breaking Territorial Yokes",
      speaker: "Pastor Ameh Amana",
      category: "Prophetic",
      date: "July 2026",
      duration: "2h 10m",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      description: "Key message from the Monthly Night of Encounter Vigil, unlocking prophetic unction and breaking ancestral bonds.",
      views: "3.9k views",
    },
    {
      id: "sermon-4",
      title: "Strategic Kingdom Leadership for Modern Times",
      speaker: "Pastor Ameh Amana",
      category: "Leadership",
      date: "June 2026",
      duration: "1h 30m",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      description: "Keynote lecture from the Strategic Leadership Conference equipping ministers for visionary governance and impact.",
      views: "3.1k views",
    },
    {
      id: "sermon-5",
      title: "STRASODA Renewal: Worship as a Weapon of Victory",
      speaker: "Pastor Ameh Amana",
      category: "Worship",
      date: "June 2026",
      duration: "1h 05m",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      description: "Inspiring sermon on Sunday STRASODA Renewal revealing how authentic worship activates angelic ministry.",
      views: "2.7k views",
    },
  ];

  const filteredSermons = sermons.filter((s) => {
    const matchesCategory = activeCategory === "All" || s.category === activeCategory;
    const matchesSearch = s.title.toLowerCase().includes(searchQuery.toLowerCase()) || s.speaker.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="sermons" className="py-24 bg-[#0F172A] relative overflow-hidden">
      {/* Glows */}
      <div className="absolute top-0 right-10 w-96 h-96 bg-[#6E0A1A]/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#38BDF8]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#6E0A1A]/30 border border-[#6E0A1A] text-xs font-bold text-[#38BDF8] uppercase tracking-wider">
            <Mic className="w-3.5 h-3.5" />
            Word & Messages Archive
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Sermons & <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#7DD3FC] to-[#38BDF8]">Media Hub</span>
          </h2>
          <p className="text-slate-300 text-base font-light">
            Listen, watch, and download life-transforming messages by Lead Pastor Ameh Amana.
          </p>
        </div>

        {/* Search & Category Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 glass-panel p-4 rounded-2xl border border-white/10">
          
          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search sermons or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-[#38BDF8]"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {["All", "Prayer", "Discipleship", "Prophetic", "Leadership", "Worship"].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeCategory === cat
                    ? "bg-[#6E0A1A] text-white border border-[#38BDF8]/40"
                    : "bg-white/5 text-slate-300 hover:text-white hover:bg-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

        </div>

        {/* Sermons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSermons.map((sermon) => (
            <div
              key={sermon.id}
              className="group relative rounded-3xl overflow-hidden glass-panel border border-white/10 hover:border-[#38BDF8]/50 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Media Thumbnail Placeholder */}
              <div className="relative h-48 w-full bg-gradient-to-br from-[#6E0A1A]/60 to-[#0B1120] flex items-center justify-center p-6 text-center">
                <div className="absolute inset-0 bg-pattern-grid opacity-30"></div>
                
                <button
                  onClick={() => setActiveMediaModal(sermon)}
                  className="w-14 h-14 rounded-full bg-[#6E0A1A] border-2 border-[#38BDF8] flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform relative z-10"
                >
                  <Play className="w-6 h-6 fill-white ml-1 text-white" />
                </button>

                {/* Duration Badge */}
                <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md bg-black/70 text-[10px] font-bold text-white flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#38BDF8]" />
                  <span>{sermon.duration}</span>
                </div>

                {/* Category Pill */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#6E0A1A]/80 text-[10px] font-bold text-[#38BDF8] border border-[#6E0A1A]">
                  {sermon.category}
                </div>
              </div>

              {/* Sermon Information */}
              <div className="p-5 space-y-3">
                <div className="flex items-center gap-2 text-[11px] text-slate-400">
                  <User className="w-3.5 h-3.5 text-[#38BDF8]" />
                  <span>{sermon.speaker}</span>
                  <span>•</span>
                  <span>{sermon.date}</span>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-[#38BDF8] transition-colors leading-snug line-clamp-2">
                  {sermon.title}
                </h3>

                <p className="text-xs text-slate-300 font-light line-clamp-2">
                  {sermon.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="p-4 px-5 border-t border-white/10 bg-black/20 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">{sermon.views}</span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveMediaModal(sermon)}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-[#38BDF8]"
                    title="Watch Sermon Video"
                  >
                    <Video className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => alert(`Downloading MP3 audio for: ${sermon.title}`)}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white"
                    title="Download Audio MP3"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Video Player Modal */}
      {activeMediaModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-in fade-in"
          onClick={() => setActiveMediaModal(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`${activeMediaModal.title} — Video Player`}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl rounded-3xl glass-panel p-6 border border-white/20 shadow-2xl space-y-4"
          >
            <button
              onClick={() => setActiveMediaModal(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1 text-left">
              <span className="text-xs font-bold text-[#38BDF8] uppercase">{activeMediaModal.category} Message</span>
              <h3 className="text-xl font-bold text-white">{activeMediaModal.title}</h3>
              <p className="text-xs text-slate-400">Speaker: {activeMediaModal.speaker} • {activeMediaModal.date}</p>
            </div>

            {/* Video Player Frame */}
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black border border-white/10">
              <iframe
                src={activeMediaModal.videoUrl}
                title={activeMediaModal.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
