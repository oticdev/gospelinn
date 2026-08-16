"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Play, Mic, Video, Search, X, Clock, Loader2 } from "lucide-react";
import YouTubePlayer from "./YouTubePlayer";

interface YoutubeVideo {
  id: string;
  title: string;
  description: string;
  publishedAt: string;
  thumbnail: string;
  duration: string;
  viewCount: string;
}

function parseDuration(iso: string): string {
  const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return "";
  const hours = parseInt(match[1] || "0", 10);
  const minutes = parseInt(match[2] || "0", 10);
  const seconds = parseInt(match[3] || "0", 10);
  if (hours > 0) return `${hours}h ${minutes}m`;
  if (minutes > 0) return `${minutes}m ${seconds}s`;
  return `${seconds}s`;
}

function formatViews(count: string): string {
  const n = parseInt(count, 10);
  if (isNaN(n)) return "0 views";
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M views`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k views`;
  return `${n} views`;
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export default function SermonsHub() {
  const [videos, setVideos] = useState<YoutubeVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeMediaModal, setActiveMediaModal] = useState<YoutubeVideo | null>(null);

  useEffect(() => {
    fetch("/api/youtube?max=9")
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setVideos(data.videos || []);
        }
      })
      .catch(() => setError("Failed to load sermons"))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!activeMediaModal) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveMediaModal(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeMediaModal]);

  const filteredVideos = videos.filter((v) =>
    v.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="sermons" className="py-24 bg-slate-900 relative overflow-hidden">
      {/* Glows */}
      <div className="absolute top-0 right-10 w-96 h-96 bg-gim-oxblood/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-gim-skyblue-bright/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gim-oxblood/30 border border-gim-oxblood text-xs font-bold text-gim-skyblue-bright uppercase tracking-wider">
            <Mic className="w-3.5 h-3.5" />
            Word & Messages Archive
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Sermons & <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gim-skyblue-light to-gim-skyblue-bright">Media Hub</span>
          </h2>
          <p className="text-slate-300 text-base font-light">
            Listen, watch, and download life-transforming messages by Lead Pastor Ameh Amana.
          </p>
        </div>

        {/* Search Bar */}
        <div className="flex items-center justify-center mb-10 glass-panel p-4 rounded-2xl border border-white/10 max-w-xl mx-auto">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search sermons or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-gim-skyblue-bright"
            />
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Loader2 className="w-8 h-8 text-gim-skyblue-bright animate-spin" />
            <span className="text-sm text-slate-400">Loading latest sermons...</span>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-20 space-y-2">
            <p className="text-sm text-red-400 font-semibold">{error}</p>
            <p className="text-xs text-slate-500">Please check the YouTube API configuration.</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredVideos.length === 0 && (
          <div className="text-center py-20">
            <p className="text-sm text-slate-400">No sermons found{searchQuery ? ` matching "${searchQuery}"` : ""}.</p>
          </div>
        )}

        {/* Sermons Grid */}
        {!loading && !error && filteredVideos.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.map((video) => (
              <div
                key={video.id}
                className="group relative rounded-3xl overflow-hidden glass-panel border border-white/10 hover:border-gim-skyblue-bright/50 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Video Thumbnail */}
                <div className="relative h-48 w-full bg-gim-dark overflow-hidden">
                  <Image
                    src={video.thumbnail}
                    alt={video.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gim-dark via-transparent to-transparent"></div>
                  
                  <button
                    onClick={() => setActiveMediaModal(video)}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div className="w-14 h-14 rounded-full bg-gim-oxblood/90 border-2 border-gim-skyblue-bright flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 fill-white ml-1 text-white" />
                    </div>
                  </button>

                  {/* Duration Badge */}
                  {video.duration && (
                    <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md bg-black/70 text-[10px] font-bold text-white flex items-center gap-1">
                      <Clock className="w-3 h-3 text-gim-skyblue-bright" />
                      <span>{parseDuration(video.duration)}</span>
                    </div>
                  )}
                </div>

                {/* Video Info */}
                <div className="p-5 space-y-3 flex-1">
                  <div className="flex items-center gap-2 text-[11px] text-slate-400">
                    <span>Pastor Ameh Amana</span>
                    <span>•</span>
                    <span>{formatDate(video.publishedAt)}</span>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-gim-skyblue-bright transition-colors leading-snug line-clamp-2">
                    {video.title}
                  </h3>

                  <p className="text-xs text-slate-300 font-light line-clamp-2">
                    {video.description}
                  </p>
                </div>

                {/* Action Bar */}
                <div className="p-4 px-5 border-t border-white/10 bg-black/20 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">{formatViews(video.viewCount)}</span>

                  <button
                    onClick={() => setActiveMediaModal(video)}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gim-skyblue-bright"
                    title="Watch Video"
                  >
                    <Video className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

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
              <span className="text-xs font-bold text-gim-skyblue-bright uppercase">Sermon Message</span>
              <h3 className="text-xl font-bold text-white">{activeMediaModal.title}</h3>
              <p className="text-xs text-slate-400">
                Pastor Ameh Amana • {formatDate(activeMediaModal.publishedAt)}
              </p>
            </div>

            {/* YouTube Player */}
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black border border-white/10">
              <YouTubePlayer
                videoId={activeMediaModal.id}
                onStateChange={(state) => {
                  if (state === 0) setActiveMediaModal(null);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
