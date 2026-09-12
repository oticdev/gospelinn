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

// Shared across all player instances so the script is only injected once and
// every caller waits for the same ready signal.
let apiReadyPromise: Promise<void> | null = null;

function loadYouTubeAPI(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  const win = window as any;
  if (win.YT?.Player) return Promise.resolve();
  if (apiReadyPromise) return apiReadyPromise;

  apiReadyPromise = new Promise<void>((resolve, reject) => {
    // The iframe API calls this global once YT.Player is usable. Chain any
    // handler another script may have registered.
    const previous = win.onYouTubeIframeAPIReady;
    win.onYouTubeIframeAPIReady = () => {
      previous?.();
      resolve();
    };

    if (!document.querySelector(`script[src="${YOUTUBE_API_URL}"]`)) {
      const script = document.createElement("script");
      script.src = YOUTUBE_API_URL;
      script.async = true;
      script.onerror = () => {
        apiReadyPromise = null;
        reject(new Error("Failed to load the YouTube player."));
      };
      document.head.appendChild(script);
    }
  });
  return apiReadyPromise;
}

export default function YouTubePlayer({ videoId, onReady, onStateChange, onError }: YouTubePlayerProps) {
  // YT.Player replaces its target element with an iframe, so give it a child
  // node that React does not manage rather than the node React renders.
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);
  const callbacksRef = useRef({ onReady, onStateChange, onError });

  useEffect(() => {
    callbacksRef.current = { onReady, onStateChange, onError };
  }, [onReady, onStateChange, onError]);

  useEffect(() => {
    const container = containerRef.current;
    let destroyed = false;

    async function init() {
      try {
        await loadYouTubeAPI();
      } catch (error) {
        console.error(error);
        callbacksRef.current.onError?.(-1);
        return;
      }
      if (destroyed || !container) return;

      const target = document.createElement("div");
      container.replaceChildren(target);

      playerRef.current = new (window as any).YT.Player(target, {
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
      container?.replaceChildren();
    };
  }, [videoId]);

  return <div ref={containerRef} className="w-full h-full [&>iframe]:h-full [&>iframe]:w-full" />;
}
