"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  ThumbsUp,
  Bird,
  Camera,
  CalendarCheck,
  User,
  Send,
  CheckCircle2,
  MessageCircle,
} from "lucide-react";
import Modal from "./Modal";
import { OFFICE_EMAIL, OFFICE_WHATSAPP } from "@/lib/contact";
import { todayInMinistryTz } from "@/lib/schedule";

// Keep in sync with the Cloudinary plan limit; the file is uploaded straight
// from the browser to Cloudinary, so Vercel's request-body cap does not apply.
const MAX_FILE_SIZE = 5 * 1024 * 1024;

const GENERIC_ERROR = `Sorry, your request could not be sent right now. Please try again, or email us directly at ${OFFICE_EMAIL}.`;

const socialLinks = [
  {
    label: "Facebook",
    handle: "Amehamanaofficial1",
    href: "https://www.facebook.com/Amehamanaofficial1",
    icon: ThumbsUp,
  },
  {
    label: "X (Twitter)",
    handle: "@AmehAmana",
    href: "https://x.com/AmehAmana",
    icon: Bird,
  },
  {
    label: "Instagram",
    handle: "amehamanaofficial1",
    href: "https://www.instagram.com/amehamanaofficial1/",
    icon: Camera,
  },
  {
    label: "TikTok",
    handle: "@amehamana_official",
    href: "https://www.tiktok.com/@amehamana_official",
    icon: ({ className }: { className?: string }) => (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1 0-5.78 2.92 2.92 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 3 15.57 6.33 6.33 0 0 0 9.37 22a6.33 6.33 0 0 0 6.38-6.22V9.4a8.16 8.16 0 0 0 4.84 1.58V7.53a4.85 4.85 0 0 1-1-.84z" />
      </svg>
    ),
  },
];

const isPdf = (file: File) =>
  file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
const isImage = (file: File) => file.type.startsWith("image/");

interface UploadSignature {
  cloudName: string;
  apiKey: string;
  resourceType: "image" | "raw";
  params: Record<string, string>;
  signature: string;
}

/** Upload the flyer browser → Cloudinary using a server-issued signature. Returns the https URL. */
async function uploadFlyer(file: File): Promise<string> {
  const signRes = await fetch("/api/upload/sign", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ kind: isPdf(file) ? "pdf" : "image" }),
  });
  if (!signRes.ok) throw new Error(`Upload signature request failed (${signRes.status})`);
  const { cloudName, apiKey, resourceType, params, signature }: UploadSignature = await signRes.json();

  const formData = new FormData();
  formData.append("file", file);
  formData.append("api_key", apiKey);
  formData.append("signature", signature);
  for (const [key, value] of Object.entries(params)) formData.append(key, value);

  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`, {
    method: "POST",
    body: formData,
  });
  const result = await res.json().catch(() => null);
  if (!res.ok || !result?.secure_url) {
    throw new Error(result?.error?.message || `Cloudinary upload failed (${res.status})`);
  }
  return result.secure_url as string;
}

interface PastorConnectModalProps {
  onClose: () => void;
}

export default function PastorConnectModal({ onClose }: PastorConnectModalProps) {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [usedEmailFallback, setUsedEmailFallback] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [flyerWarning, setFlyerWarning] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const autoCloseRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (autoCloseRef.current) clearTimeout(autoCloseRef.current);
    };
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (!file) {
      setSelectedFile(null);
      return;
    }
    if (!isImage(file) && !isPdf(file)) {
      setSubmitError("Flyer must be an image or PDF file.");
      setSelectedFile(null);
      e.target.value = "";
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setSubmitError("Flyer file size exceeds 5MB limit. Please attach a smaller image or PDF.");
      setSelectedFile(null);
      e.target.value = "";
      return;
    }
    setSubmitError(null);
    setSelectedFile(file);
  };

  const clearSelectedFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const buildMailto = (data: Record<string, string>, flyerLink?: string) => {
    const subject = encodeURIComponent(`Preaching Engagement Invitation — ${data.name}`);
    const body = encodeURIComponent(
      [
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        `Phone: ${data.phone || "—"}`,
        `Church / Organization: ${data.organization || "—"}`,
        `Event Date: ${data.eventDate || "—"}`,
        `Location: ${data.location || "—"}`,
        ``,
        `About Event:`,
        data.aboutEvent || "—",
        ``,
        `About Ministry:`,
        data.aboutMinistry || "—",
        ...(flyerLink ? [``, `Flyer: ${flyerLink}`] : []),
      ].join("\n")
    );
    window.location.href = `mailto:${OFFICE_EMAIL}?subject=${subject}&body=${body}`;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);
    setFlyerWarning(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const data: Record<string, string> = {};
    formData.forEach((value, key) => {
      if (typeof value === "string") data[key] = value.trim();
    });

    let flyerUrl: string | undefined;
    let flyerName: string | undefined;
    if (selectedFile) {
      try {
        flyerUrl = await uploadFlyer(selectedFile);
        flyerName = selectedFile.name;
      } catch (err) {
        console.error("Flyer upload failed:", err);
        setFlyerWarning("Flyer could not be uploaded — your request will be submitted without it.");
        clearSelectedFile();
      }
    }

    const payload: Record<string, string> = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      organization: data.organization,
      eventDate: data.eventDate,
      location: data.location,
      aboutEvent: data.aboutEvent,
      aboutMinistry: data.aboutMinistry,
      website: data.website,
    };
    if (flyerUrl) {
      payload.flyerUrl = flyerUrl;
      payload.flyerName = flyerName ?? "";
    }

    // Only a network failure (fetch rejects) or an unconfigured endpoint (501)
    // falls back to the visitor's email client; every other error is shown.
    let res: Response | null = null;
    try {
      res = await fetch("/api/preaching-invitation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch (err) {
      console.error("Preaching invitation request failed:", err);
    }

    let usedFallback = false;
    if (!res || res.status === 501) {
      buildMailto(data, flyerUrl);
      usedFallback = true;
    } else if (!res.ok) {
      const result = await res.json().catch(() => null);
      setSubmitError(result?.error || GENERIC_ERROR);
      setSubmitting(false);
      return;
    }

    setUsedEmailFallback(usedFallback);
    setSubmitting(false);
    setSubmitted(true);
    autoCloseRef.current = setTimeout(() => {
      onClose();
    }, 12000);
  };

  return (
    <Modal
      onClose={onClose}
      labelledBy="pastor-connect-title"
      className="max-w-2xl space-y-6 max-h-[90vh] overflow-y-auto"
    >
      {submitted ? (
        <div className="text-center py-10 space-y-3">
          <div className="w-16 h-16 rounded-full bg-gim-oxblood/50 border-2 border-gim-skyblue-bright flex items-center justify-center mx-auto text-gim-skyblue-bright">
            {usedEmailFallback ? <Send className="w-8 h-8" /> : <CheckCircle2 className="w-8 h-8" />}
          </div>
          <h3 id="pastor-connect-title" className="text-2xl font-bold text-white">
            {usedEmailFallback ? "Almost Done!" : "Request Received!"}
          </h3>
          <p className="text-xs text-slate-300 max-w-sm mx-auto">
            {usedEmailFallback
              ? "Your email app has opened with a pre-filled request — please press send to complete your invitation."
              : "Thank you for your invitation. Pastor Ameh Amana's office will contact you shortly."}
          </p>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Haven&apos;t heard back on time? You can message the Gospel Inn office directly on WhatsApp.
          </p>
          <a
            href={OFFICE_WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/15 hover:border-emerald-400/60 hover:bg-emerald-950/30 text-xs font-bold text-white transition-all"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            Message the Office on WhatsApp
          </a>
          {flyerWarning && (
            <p role="status" className="text-xs text-amber-400 max-w-sm mx-auto">
              Note: {flyerWarning}
            </p>
          )}
        </div>
      ) : (
        <>
          {/* Header */}
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gim-oxblood/40 border border-gim-oxblood text-[11px] font-bold text-gim-skyblue-bright">
              <User className="w-3.5 h-3.5" />
              Pastor Ameh Amana
            </div>
            <h3 id="pastor-connect-title" className="text-2xl font-black text-white">
              Connect &amp; Invite the Pastor
            </h3>
            <p className="text-xs text-slate-300">
              Follow Pastor Ameh Amana on social media or request him for a preaching engagement at your event.
            </p>
          </div>

          {/* Social Handles */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Social Media</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
              {socialLinks.map((s) => {
                const IconComp = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/10 hover:border-gim-skyblue-bright/50 hover:bg-white/10 transition-all"
                  >
                    <div className="p-2.5 rounded-xl bg-gim-oxblood/40 border border-gim-oxblood text-gim-skyblue-bright shrink-0">
                      <IconComp className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-white">{s.label}</div>
                      <div className="text-[10px] text-slate-400 truncate">{s.handle}</div>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Preaching Engagement Form */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-gim-oxblood/40 to-gim-dark border border-gim-oxblood">
            <h4 className="text-sm font-bold text-white flex items-center gap-2 mb-1">
              <CalendarCheck className="w-4 h-4 text-gim-skyblue-bright" />
              Preaching Engagement Request
            </h4>
            <p className="text-[11px] text-slate-300 mb-4">
              Invite Pastor Ameh Amana to minister at your church, conference, or event.
            </p>
            <form onSubmit={handleSubmit} className="space-y-3">
              {/* Honeypot — hidden from real users, checked server-side. */}
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="hidden"
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="name-input" className="block text-[11px] text-slate-300 font-medium mb-1">
                    Full Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    required
                    id="name-input"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="e.g. Pastor John Doe"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white text-sm focus:outline-none focus:border-gim-skyblue-bright"
                  />
                </div>
                <div>
                  <label htmlFor="email-input" className="block text-[11px] text-slate-300 font-medium mb-1">
                    Email Address <span className="text-red-400">*</span>
                  </label>
                  <input
                    required
                    id="email-input"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="e.g. john@example.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white text-sm focus:outline-none focus:border-gim-skyblue-bright"
                  />
                </div>
                <div>
                  <label htmlFor="phone-input" className="block text-[11px] text-slate-300 font-medium mb-1">
                    Phone (Optional)
                  </label>
                  <input
                    id="phone-input"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="+234 ..."
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white text-sm focus:outline-none focus:border-gim-skyblue-bright"
                  />
                </div>
                <div>
                  <label htmlFor="org-input" className="block text-[11px] text-slate-300 font-medium mb-1">
                    Church / Organization
                  </label>
                  <input
                    id="org-input"
                    name="organization"
                    type="text"
                    autoComplete="organization"
                    placeholder="Church or Organization Name"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white text-sm focus:outline-none focus:border-gim-skyblue-bright"
                  />
                </div>
                <div>
                  <label htmlFor="date-input" className="block text-[11px] text-slate-300 font-medium mb-1">
                    Proposed Event Date
                  </label>
                  <input
                    id="date-input"
                    name="eventDate"
                    type="date"
                    min={todayInMinistryTz()}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white text-sm focus:outline-none focus:border-gim-skyblue-bright"
                  />
                </div>
                <div>
                  <label htmlFor="location-input" className="block text-[11px] text-slate-300 font-medium mb-1">
                    Event Location / City
                  </label>
                  <input
                    id="location-input"
                    name="location"
                    type="text"
                    placeholder="City, State / Country"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white text-sm focus:outline-none focus:border-gim-skyblue-bright"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="about-event-input" className="block text-[11px] text-slate-300 font-medium mb-1">
                  About the Event <span className="text-red-400">*</span>
                </label>
                <textarea
                  required
                  id="about-event-input"
                  name="aboutEvent"
                  placeholder="Tell us about your event (theme, expected audience, format, schedule)..."
                  rows={3}
                  maxLength={5000}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white text-sm focus:outline-none focus:border-gim-skyblue-bright resize-none"
                ></textarea>
              </div>

              <div>
                <label htmlFor="about-ministry-input" className="block text-[11px] text-slate-300 font-medium mb-1">
                  About Your Ministry / Organization (Optional)
                </label>
                <textarea
                  id="about-ministry-input"
                  name="aboutMinistry"
                  placeholder="Write a short background on your ministry or organization..."
                  rows={3}
                  maxLength={5000}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white text-sm focus:outline-none focus:border-gim-skyblue-bright resize-none"
                ></textarea>
              </div>

              <div>
                <label htmlFor="flyer-input" className="block text-[11px] text-slate-300 font-medium mb-1">
                  Event Flyer (Optional, max 5MB)
                </label>
                <input
                  ref={fileInputRef}
                  id="flyer-input"
                  name="flyer"
                  type="file"
                  accept="image/*,.pdf,application/pdf"
                  onChange={handleFileChange}
                  className="w-full text-xs text-slate-400 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:text-white file:bg-gim-oxblood/60 hover:file:bg-gim-oxblood file:cursor-pointer"
                />
                {selectedFile && (
                  <div className="mt-1.5 flex items-center justify-between text-xs text-gim-skyblue-bright bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
                    <span className="truncate">Selected: {selectedFile.name} ({(selectedFile.size / 1024).toFixed(0)} KB)</span>
                    <button
                      type="button"
                      onClick={clearSelectedFile}
                      className="text-slate-400 hover:text-white ml-2 text-xs font-semibold"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>

              {(submitError || flyerWarning) && (
                <p
                  role="alert"
                  className={`text-xs font-semibold p-2.5 rounded-xl border ${
                    submitError
                      ? "text-red-400 bg-red-950/40 border-red-800/40"
                      : "text-amber-400 bg-amber-950/30 border-amber-800/40"
                  }`}
                >
                  {submitError || flyerWarning}
                </p>
              )}
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-gim-oxblood to-gim-oxblood-hover border border-gim-skyblue-bright/40 shadow-lg hover:shadow-gim-skyblue-bright/20 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
              >
                <Send className="w-4 h-4" />
                {submitting ? "Submitting..." : "Submit Invitation Request"}
              </button>
            </form>
          </div>
        </>
      )}
    </Modal>
  );
}
