import { NextResponse } from "next/server";
import crypto from "crypto";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_MIME_PREFIXES = ["image/"];
const ALLOWED_MIME_TYPES = ["application/pdf"];

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "File size exceeds the 5MB limit." },
        { status: 413 }
      );
    }

    const isAllowedType =
      ALLOWED_MIME_TYPES.includes(file.type) ||
      ALLOWED_MIME_PREFIXES.some((prefix) => file.type.startsWith(prefix));
    if (!isAllowedType) {
      return NextResponse.json(
        { error: "Only image files and PDFs are allowed." },
        { status: 415 }
      );
    }

    const cloudName =
      process.env.CLOUDINARY_CLOUD_NAME ||
      process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    if (!cloudName) {
      console.error("Cloudinary cloud name is not configured");
      return NextResponse.json(
        { error: "File upload is not configured." },
        { status: 500 }
      );
    }
    const apiKey =
      process.env.CLOUDINARY_API_KEY ||
      process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;
    const uploadPreset =
      process.env.CLOUDINARY_UPLOAD_PRESET ||
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    const cloudinaryFormData = new FormData();
    cloudinaryFormData.append("file", file);

    if (apiKey && apiSecret) {
      const timestamp = Math.floor(Date.now() / 1000).toString();
      const paramsToSign = `timestamp=${timestamp}${apiSecret}`;
      const signature = crypto
        .createHash("sha1")
        .update(paramsToSign)
        .digest("hex");

      cloudinaryFormData.append("api_key", apiKey);
      cloudinaryFormData.append("timestamp", timestamp);
      cloudinaryFormData.append("signature", signature);
    } else if (uploadPreset) {
      cloudinaryFormData.append("upload_preset", uploadPreset);
    } else {
      // Fallback unsigned preset attempt
      cloudinaryFormData.append("upload_preset", "ml_default");
    }

    // PDFs must go to the raw endpoint: the auto endpoint converts them to
    // images, which exceeds the processing capacity of the Free plan (429).
    const resourceType = file.type === "application/pdf" ? "raw" : "auto";

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`,
      {
        method: "POST",
        body: cloudinaryFormData,
      }
    );

    const result = await res.json();

    if (!res.ok) {
      console.error("Cloudinary upload failed:", result);
      return NextResponse.json(
        { error: result.error?.message || "Failed to upload file to Cloudinary" },
        { status: res.status }
      );
    }

    return NextResponse.json({ url: result.secure_url || result.url });
  } catch (error) {
    console.error("Cloudinary upload route error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
