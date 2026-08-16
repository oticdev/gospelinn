import { NextResponse } from "next/server";

const API_KEY = process.env.YOUTUBE_API_KEY;
const CHANNEL_HANDLE = process.env.YOUTUBE_CHANNEL_HANDLE;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const maxResults = searchParams.get("max") || "9";

  if (!API_KEY || !CHANNEL_HANDLE) {
    return NextResponse.json(
      { error: "YouTube API key or channel handle not configured" },
      { status: 500 }
    );
  }

  try {
    // Step 1: Get the uploads playlist ID from the channel handle
    const channelRes = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&forHandle=${CHANNEL_HANDLE}&key=${API_KEY}`
    );
    const channelData = await channelRes.json();

    if (!channelData.items?.length) {
      return NextResponse.json({ error: "Channel not found" }, { status: 404 });
    }

    const uploadsPlaylistId =
      channelData.items[0].contentDetails.relatedPlaylists.uploads;

    // Step 2: Fetch latest videos from the uploads playlist
    const playlistRes = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&playlistId=${uploadsPlaylistId}&maxResults=${maxResults}&key=${API_KEY}`
    );
    const playlistData = await playlistRes.json();

    if (!playlistData.items?.length) {
      return NextResponse.json({ videos: [] });
    }

    // Step 3: Get video details (duration, view count)
    const videoIds = playlistData.items
      .map((item: { contentDetails: { videoId: string } }) => item.contentDetails.videoId)
      .join(",");

    const detailsRes = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=contentDetails,statistics&id=${videoIds}&key=${API_KEY}`
    );
    const detailsData = await detailsRes.json();

    interface VideoDetail {
      id: string;
      contentDetails: { duration: string };
      statistics: { viewCount: string };
    }
    const detailsMap = new Map<string, VideoDetail>(
      (detailsData.items as VideoDetail[] | undefined)?.map((v) => [v.id, v]) || []
    );

    // Step 4: Combine and return
    const videos = playlistData.items.map(
      (item: {
        contentDetails: { videoId: string };
        snippet: {
          title: string;
          description: string;
          publishedAt: string;
          thumbnails: { high?: { url: string }; medium?: { url: string }; default?: { url: string } };
        };
      }) => {
        const details = detailsMap.get(item.contentDetails.videoId);
        return {
          id: item.contentDetails.videoId,
          title: item.snippet.title,
          description: item.snippet.description,
          publishedAt: item.snippet.publishedAt,
          thumbnail:
            item.snippet.thumbnails.high?.url ||
            item.snippet.thumbnails.medium?.url ||
            item.snippet.thumbnails.default?.url ||
            "",
          duration: details?.contentDetails?.duration || "",
          viewCount: details?.statistics?.viewCount || "0",
        };
      }
    );

    return NextResponse.json({ videos });
  } catch (error) {
    console.error("YouTube API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch videos" },
      { status: 500 }
    );
  }
}
