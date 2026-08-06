"use client";

import React, { useState } from "react";
import { Sparkles, Heart, Send, CheckCircle2, X, ShieldAlert, PhoneCall } from "lucide-react";

interface PrayerRequestProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PrayerRequest({ isOpen, onClose }: PrayerRequestProps) {
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in">
      <div className="relative w-full max-w-lg rounded-3xl glass-panel p-6 sm:p-8 border border-white/20 shadow-2xl space-y-5 text-left">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-full bg-white/5"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-10 space-y-3">
            <CheckCircle2 className="w-14 h-14 text-[#38BDF8] mx-auto animate-bounce" />
            <h3 className="text-2xl font-bold text-white">Prayer Request Received!</h3>
            <p className="text-xs text-slate-300 max-w-sm mx-auto">
              Our intercessory team and Pastor Ameh Amana are joining faith with you. God hears and answers prayer!
            </p>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#7A0C1E]/40 border border-[#7A0C1E] text-[11px] font-bold text-[#38BDF8]">
                <Sparkles className="w-3.5 h-3.5" />
                Confidential Intercession
              </div>
              <h3 className="text-2xl font-black text-white">Submit Prayer Request</h3>
              <p className="text-xs text-slate-300">
                Let us stand in agreement with you. &ldquo;For where two or three are gathered in my name, there am I in the midst of them.&rdquo;
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Your Full Name</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Sister Mercy David"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white text-sm focus:outline-none focus:border-[#38BDF8]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Phone Number</label>
                  <input
                    required
                    type="tel"
                    placeholder="+234..."
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white text-sm focus:outline-none focus:border-[#38BDF8]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Prayer Category</label>
                  <select className="w-full px-4 py-2.5 rounded-xl bg-[#0B1120] border border-white/15 text-white text-sm focus:outline-none focus:border-[#38BDF8]">
                    <option>Healing & Deliverance</option>
                    <option>Financial Breakthrough</option>
                    <option>Family & Marriage</option>
                    <option>Spiritual Growth</option>
                    <option>Fruit of the Womb</option>
                    <option>General Intercession</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Prayer Details</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Share your prayer point or testimony..."
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white text-sm focus:outline-none focus:border-[#38BDF8]"
                ></textarea>
              </div>

              <div className="flex items-center gap-2">
                <input type="checkbox" id="call-back" className="rounded accent-[#7A0C1E]" />
                <label htmlFor="call-back" className="text-xs text-slate-300 flex items-center gap-1.5 cursor-pointer">
                  <PhoneCall className="w-3.5 h-3.5 text-[#38BDF8]" />
                  Request pastoral counselling phone call
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#7A0C1E] to-[#9E1B32] border border-[#38BDF8]/40 shadow-lg hover:shadow-[#38BDF8]/20 transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Submit Prayer Request
              </button>
            </form>
          </>
        )}

      </div>
    </div>
  );
}
