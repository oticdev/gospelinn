"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  ThumbsUp,
  Bird,
  Camera,
  CalendarCheck,
  User,
  Send,
  CheckCircle2,
} from "lucide-react";

const PREACHING_FORM_ENDPOINT =
  process.env.NEXT_PUBLIC_PREACHING_FORM_ENDPOINT ||
  "https://script.google.com/macros/s/AKfycbz6HNpdi7GuoUUdeGSHmJftKzshxqHbFveEf_hgBKOQ_vl_HBfYwvMJ8Yo6FGQneEPA/exec";

interface PastorConnectModalProps {
  isOpen?: boolean;
  onClose: () => void;
}

export default function PastorConnectModal({ isOpen = true, onClose }: PastorConnectModalProps) {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const data: Record<string, string> = {};
    formData.forEach((value, key) => {
      if (key !== "flyer") data[key] = String(value);
    });

    // Convert flyer to base64 if present
    const flyerFile = formData.get("flyer") as File | null;
    if (flyerFile && flyerFile.size > 0) {
      const reader = new FileReader();
      const flyerDataUrl = await new Promise<string>((resolve) => {
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(flyerFile);
      });
      data.flyerName = flyerFile.name;
      data.flyerType = flyerFile.type;
      data.flyerBase64 = flyerDataUrl;
    }

    setSubmitting(true);
    setSubmitError(false);
    if (PREACHING_FORM_ENDPOINT) {
      try {
        await fetch(PREACHING_FORM_ENDPOINT, {
          method: "POST",
          mode: "no-cors",
          redirect: "follow",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify({ ...data, submittedAt: new Date().toISOString() }),
        });
      } catch {
        setSubmitting(false);
        setSubmitError(true);
        return;
      }
    } else {
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
          `Message:`,
          data.message,
          ``,
          `Ministry Brief:`,
          data.ministryBrief || "—",
          ``,
          data.flyerName ? `Flyer attached: ${data.flyerName}` : "",
        ]
          .filter(Boolean)
          .join("\n")
      );
      window.location.href = `mailto:office@gospelinnministries.com?subject=${subject}&body=${body}`;
    }
    setSubmitting(false);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 4000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Connect & Invite the Pastor"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl rounded-3xl glass-panel p-6 sm:p-8 border border-white/20 shadow-2xl space-y-6 text-left max-h-[90vh] overflow-y-auto"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-full bg-white/5"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-10 space-y-3">
            <div className="w-16 h-16 rounded-full bg-gim-oxblood/50 border-2 border-gim-skyblue-bright flex items-center justify-center mx-auto text-gim-skyblue-bright">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white">Request Received!</h3>
            <p className="text-xs text-slate-300 max-w-sm mx-auto">
              Thank you for your invitation. Pastor Ameh Amana&apos;s office will contact you shortly.
            </p>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gim-oxblood/40 border border-gim-oxblood text-[11px] font-bold text-gim-skyblue-bright">
                <User className="w-3.5 h-3.5" />
                Pastor Ameh Amana
              </div>
              <h3 className="text-2xl font-black text-white">Connect &amp; Invite the Pastor</h3>
              <p className="text-xs text-slate-300">
                Follow Pastor Ameh Amana on social media or request him for a preaching engagement at your event.
              </p>
            </div>

            {/* Social Handles */}
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Social Media</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    required
                    name="name"
                    type="text"
                    placeholder="Full Name"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white text-sm focus:outline-none focus:border-gim-skyblue-bright"
                  />
                  <input
                    required
                    name="email"
                    type="email"
                    placeholder="Email Address"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white text-sm focus:outline-none focus:border-gim-skyblue-bright"
                  />
                  <input
                    name="phone"
                    type="tel"
                    placeholder="Phone (Optional)"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white text-sm focus:outline-none focus:border-gim-skyblue-bright"
                  />
                  <input
                    name="organization"
                    type="text"
                    placeholder="Church / Organization"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white text-sm focus:outline-none focus:border-gim-skyblue-bright"
                  />
                  <input
                    name="eventDate"
                    type="date"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white text-sm focus:outline-none focus:border-gim-skyblue-bright"
                  />
                  <input
                    name="location"
                    type="text"
                    placeholder="Event Location"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white text-sm focus:outline-none focus:border-gim-skyblue-bright"
                  />
                </div>
                <textarea
                  required
                  name="message"
                  placeholder="Tell us about your event..."
                  rows={3}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white text-sm focus:outline-none focus:border-gim-skyblue-bright resize-none"
                ></textarea>
                <textarea
                  name="ministryBrief"
                  placeholder="Write a short brief on your ministry..."
                  rows={3}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white text-sm focus:outline-none focus:border-gim-skyblue-bright resize-none"
                ></textarea>
                <div>
                  <label className="block text-[11px] text-slate-400 font-medium mb-1.5">Event Flyer (optional)</label>
                  <input
                    name="flyer"
                    type="file"
                    accept="image/*,.pdf"
                    className="w-full text-xs text-slate-400 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:text-white file:bg-gim-oxblood/60 hover:file:bg-gim-oxblood file:cursor-pointer"
                  />
                </div>
                {submitError && (
                  <p role="alert" className="text-xs text-red-400 font-semibold">
                    Sorry, your request could not be sent right now. Please try again, or email us directly at info@gospelinnministry.org.
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
      </div>
    </div>
  );
}
