"use client";

import React, { useEffect, useRef } from "react";

/* eslint-disable @typescript-eslint/no-explicit-any */

interface YouTubePlayerProps {
  videoId: string;
  onReady?: () => void;
  onStateChange?: (state: number) => void;
  onError?: (error: number) => void;
}

const YOUTUBE_API_URL = "https://www.youtube.com/iframe_api";

function loadYouTubeAPI(): Promise<void> {
  return new Promise((resolve) => {
    if (typeof window !== "undefined" && (window as any).YT && (window as any).YT.Player) {
      resolve();
      return;
    }

    const existingScript = document.querySelector(`script[src="${YOUTUBE_API_URL}"]`);
    if (existingScript) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = YOUTUBE_API_URL;
    script.async = true;
    document.head.appendChild(script);

    resolve();
  });
}

export default function YouTubePlayer({ videoId, onReady, onStateChange, onError }: YouTubePlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);
  const callbacksRef = useRef({ onReady, onStateChange, onError });

  useEffect(() => {
    callbacksRef.current = { onReady, onStateChange, onError };
  }, [onReady, onStateChange, onError]);

  useEffect(() => {
    let destroyed = false;

    async function init() {
      await loadYouTubeAPI();

      if (destroyed || !containerRef.current) return;

      if (playerRef.current) {
        try {
          playerRef.current.destroy();
        } catch {
          // ignore
        }
        playerRef.current = null;
      }

      const YT = (window as any).YT;

      playerRef.current = new YT.Player(containerRef.current, {
        videoId,
        width: "100%",
        height: "100%",
        playerVars: {
          autoplay: 1,
          modestbranding: 1,
          rel: 0,
          playsinline: 1,
        },
        events: {
          onReady: () => callbacksRef.current.onReady?.(),
          onStateChange: (e: { data: number }) => callbacksRef.current.onStateChange?.(e.data),
          onError: (e: { data: number }) => callbacksRef.current.onError?.(e.data),
        },
      });
    }

    init();

    return () => {
      destroyed = true;
      if (playerRef.current) {
        try {
          playerRef.current.destroy();
        } catch {
          // ignore
        }
        playerRef.current = null;
      }
    };
  }, [videoId]);

  return <div ref={containerRef} className="w-full h-full" />;
}
