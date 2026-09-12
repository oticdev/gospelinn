import { NextResponse } from "next/server";
import crypto from "crypto";
import { guardPublicPost } from "@/lib/request-guards";

/**
 * Issues a short-lived Cloudinary upload signature so the browser can upload
 * the event flyer directly to Cloudinary. The file never passes through this
 * function (so Vercel's 4.5 MB body limit does not apply) and the signed
 * `allowed_formats` / `folder` parameters are enforced by Cloudinary itself —
 * the client cannot change them without invalidating the signature.
 */

const FLYER_FOLDER = "preaching-invitations";
const IMAGE_FORMATS = "jpg,jpeg,png,gif,webp,heic,heif,avif";
const PDF_FORMATS = "pdf";

export async function POST(request: Request) {
  const rejected = guardPublicPost(request, "upload-sign", { limit: 10, windowMs: 10 * 60 * 1000 });
  if (rejected) return rejected;

  let kind: "image" | "pdf" = "image";
  try {
    const body = await request.json();
    if (body?.kind === "pdf") kind = "pdf";
  } catch {
    // No/invalid body → default to image.
  }

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY || process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  if (!cloudName || !apiKey || !apiSecret) {
    console.error("Cloudinary is not fully configured (cloud name, API key and API secret are required).");
    return NextResponse.json({ error: "File upload is not configured." }, { status: 503 });
  }

  // Every parameter here is part of the signature; Cloudinary rejects the
  // upload if the client sends different values.
  const params: Record<string, string> = {
    allowed_formats: kind === "pdf" ? PDF_FORMATS : IMAGE_FORMATS,
    folder: FLYER_FOLDER,
    timestamp: String(Math.floor(Date.now() / 1000)),
  };
  const toSign = Object.keys(params)
    .sort()
    .map((key) => `${key}=${params[key]}`)
    .join("&");
  const signature = crypto.createHash("sha1").update(`${toSign}${apiSecret}`).digest("hex");

  return NextResponse.json(
    {
      cloudName,
      apiKey,
      // PDFs go to the raw endpoint: the image endpoint would rasterise them,
      // which exceeds the Free plan's processing limits.
      resourceType: kind === "pdf" ? "raw" : "image",
      params,
      signature,
    },
    { headers: { "Cache-Control": "no-store" } }
  );
}
