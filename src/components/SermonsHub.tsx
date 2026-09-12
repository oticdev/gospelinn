"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Play, Mic, Video, Search, Clock } from "lucide-react";
import YouTubePlayer from "./YouTubePlayer";
import Modal from "./Modal";
import type { SermonVideo } from "@/lib/youtube";

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

interface SermonsHubProps {
  /** Latest uploads, fetched server-side in app/page.tsx. */
  videos: SermonVideo[];
}

export default function SermonsHub({ videos }: SermonsHubProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeMediaModal, setActiveMediaModal] = useState<SermonVideo | null>(null);

  const query = searchQuery.trim().toLowerCase();
  const filteredVideos = query
    ? videos.filter(
        (v) => v.title.toLowerCase().includes(query) || v.description.toLowerCase().includes(query)
      )
    : videos;

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
              type="search"
              aria-label="Search sermons"
              placeholder="Search sermons or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-gim-skyblue-bright"
            />
          </div>
        </div>

        {/* Empty State */}
        {filteredVideos.length === 0 && (
          <div className="text-center py-20 space-y-2">
            <p className="text-sm text-slate-400">
              {videos.length === 0
                ? "Sermons are temporarily unavailable. Watch the latest messages on our YouTube channel."
                : `No sermons found matching "${searchQuery}".`}
            </p>
            {videos.length === 0 && (
              <a
                href="https://www.youtube.com/@gospelinnministries"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold text-gim-skyblue-bright hover:underline"
              >
                <Play className="w-3.5 h-3.5" />
                Open YouTube channel
              </a>
            )}
          </div>
        )}

        {/* Sermons Grid */}
        {filteredVideos.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.map((video) => (
              <div
                key={video.id}
                className="group relative rounded-3xl overflow-hidden glass-panel border border-white/10 hover:border-gim-skyblue-bright/50 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Video Thumbnail */}
                <div className="relative h-48 w-full bg-gim-dark overflow-hidden">
                  {video.thumbnail && (
                    <Image
                      src={video.thumbnail}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-gim-dark via-transparent to-transparent"></div>
                  
                  <button
                    type="button"
                    onClick={() => setActiveMediaModal(video)}
                    aria-label={`Play: ${video.title}`}
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
                    <span aria-hidden="true">•</span>
                    <span>{video.publishedLabel}</span>
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
                    type="button"
                    onClick={() => setActiveMediaModal(video)}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gim-skyblue-bright"
                    title="Watch Video"
                    aria-label={`Watch: ${video.title}`}
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
        <Modal
          onClose={() => setActiveMediaModal(null)}
          labelledBy="sermon-player-title"
          className="max-w-3xl space-y-4"
        >
          <div className="space-y-1 text-left">
            <span className="text-xs font-bold text-gim-skyblue-bright uppercase">Sermon Message</span>
            <h3 id="sermon-player-title" className="text-xl font-bold text-white pr-10">{activeMediaModal.title}</h3>
            <p className="text-xs text-slate-400">
              Pastor Ameh Amana • {activeMediaModal.publishedLabel}
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
        </Modal>
      )}
    </section>
  );
}
