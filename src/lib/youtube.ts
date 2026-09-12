import "server-only";
import { MINISTRY_TZ } from "./schedule";

export interface SermonVideo {
  id: string;
  title: string;
  description: string;
  publishedAt: string;
  /** Pre-formatted "Mon YYYY" label, computed server-side to avoid hydration drift. */
  publishedLabel: string;
  thumbnail: string;
  /** ISO 8601 duration (e.g. PT1H2M3S), empty if unknown. */
  duration: string;
  viewCount: string;
}

// YouTube data is cached for 3 days; the page itself revalidates hourly so a
// failed fetch (quota, outage) is retried without waiting the full 3 days.
const REVALIDATE_SECONDS = 3 * 24 * 60 * 60;
const MAX_RESULTS = 9;

const dateLabel = new Intl.DateTimeFormat("en-US", {
  month: "short",
  year: "numeric",
  timeZone: MINISTRY_TZ,
});

async function youtubeGet<T>(path: string, params: Record<string, string>, apiKey: string): Promise<T | null> {
  const url = new URL(`https://www.googleapis.com/youtube/v3/${path}`);
  for (const [key, value] of Object.entries(params)) url.searchParams.set(key, value);
  url.searchParams.set("key", apiKey);

  const res = await fetch(url, { next: { revalidate: REVALIDATE_SECONDS } });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    console.error(`YouTube API ${path} failed: ${res.status} ${body.slice(0, 300)}`);
    return null;
  }
  return (await res.json()) as T;
}

interface ChannelsResponse {
  items?: { contentDetails: { relatedPlaylists: { uploads: string } } }[];
}
interface PlaylistItemsResponse {
  items?: {
    contentDetails: { videoId: string };
    snippet: {
      title: string;
      description: string;
      publishedAt: string;
      thumbnails: { high?: { url: string }; medium?: { url: string }; default?: { url: string } };
    };
  }[];
}
interface VideosResponse {
  items?: { id: string; contentDetails?: { duration: string }; statistics?: { viewCount: string } }[];
}

/** Latest uploads from the ministry channel. Returns [] on any failure so the page still renders. */
export async function getLatestSermons(): Promise<SermonVideo[]> {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const handle = process.env.YOUTUBE_CHANNEL_HANDLE;
  if (!apiKey || !handle) {
    console.error("YOUTUBE_API_KEY / YOUTUBE_CHANNEL_HANDLE not configured; sermons hidden.");
    return [];
  }

  try {
    const channel = await youtubeGet<ChannelsResponse>("channels", { part: "contentDetails", forHandle: handle }, apiKey);
    const uploadsPlaylistId = channel?.items?.[0]?.contentDetails.relatedPlaylists.uploads;
    if (!uploadsPlaylistId) return [];

    const playlist = await youtubeGet<PlaylistItemsResponse>(
      "playlistItems",
      { part: "snippet,contentDetails", playlistId: uploadsPlaylistId, maxResults: String(MAX_RESULTS) },
      apiKey
    );
    const items = playlist?.items ?? [];
    if (!items.length) return [];

    const details = await youtubeGet<VideosResponse>(
      "videos",
      { part: "contentDetails,statistics", id: items.map((i) => i.contentDetails.videoId).join(",") },
      apiKey
    );
    const detailsById = new Map((details?.items ?? []).map((v) => [v.id, v]));

    return items.map((item) => {
      const detail = detailsById.get(item.contentDetails.videoId);
      const thumbs = item.snippet.thumbnails;
      return {
        id: item.contentDetails.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        publishedAt: item.snippet.publishedAt,
        publishedLabel: dateLabel.format(new Date(item.snippet.publishedAt)),
        thumbnail: thumbs.high?.url || thumbs.medium?.url || thumbs.default?.url || "",
        duration: detail?.contentDetails?.duration ?? "",
        viewCount: detail?.statistics?.viewCount ?? "0",
      };
    });
  } catch (error) {
    console.error("Failed to load sermons from YouTube:", error);
    return [];
  }
}
