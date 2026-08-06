"use client";

import React, { useState } from "react";
import Logo from "./Logo";
import { Mail, Phone, MapPin, Send, Heart, Sparkles, MessageCircle, CheckCircle2, Globe, Video, Share2 } from "lucide-react";

export default function Footer() {
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <footer id="contact" className="bg-[#0B1120] border-t border-white/10 pt-16 pb-12 relative overflow-hidden text-left">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#7A0C1E]/15 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Section: Newsletter Card */}
        <div className="glass-panel-oxblood p-8 rounded-3xl border border-[#7A0C1E] mb-16 max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-xl font-bold text-white flex items-center gap-2 justify-center md:justify-start">
              <Sparkles className="w-5 h-5 text-[#38BDF8]" />
              Subscribe to GIM Daily Devotional & Updates
            </h3>
            <p className="text-xs text-slate-300 font-light">
              Receive weekly sermon notes, prayer points, and event announcements directly in your inbox.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="flex items-center gap-2 w-full md:w-auto">
            {subscribed ? (
              <div className="px-4 py-2.5 rounded-xl bg-[#0EA5E9]/20 border border-[#38BDF8] text-xs text-white font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#38BDF8]" /> Subscribed Successfully!
              </div>
            ) : (
              <>
                <input
                  required
                  type="email"
                  placeholder="Enter email address..."
                  className="px-4 py-2.5 rounded-xl bg-black/50 border border-white/20 text-white text-xs focus:outline-none focus:border-[#38BDF8] w-full md:w-64"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-[#7A0C1E] to-[#9E1B32] border border-[#38BDF8]/30 shadow-md shrink-0 flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  Join
                </button>
              </>
            )}
          </form>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Column 1: Logo & About */}
          <div className="lg:col-span-4 space-y-4">
            <Logo size="md" />
            <p className="text-xs text-slate-300 font-light leading-relaxed">
              Gospel Inn Ministry is a sanctuary of prayer, discipleship, encounters, and kingdom transformation led by <strong className="text-white">Lead Pastor Ameh Amana</strong>.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <a href="#" className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-[#38BDF8] hover:border-[#38BDF8]/40 transition-colors" title="YouTube Live">
                <Video className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-[#38BDF8] hover:border-[#38BDF8]/40 transition-colors" title="WhatsApp Channel">
                <MessageCircle className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-[#38BDF8] hover:border-[#38BDF8]/40 transition-colors" title="Global Outreach">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-[#38BDF8] hover:border-[#38BDF8]/40 transition-colors" title="Share Ministry">
                <Share2 className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Weekly Schedule Overview */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider text-[#38BDF8]">
              Weekly Services
            </h4>
            <ul className="space-y-2 text-xs text-slate-300 font-light">
              <li className="flex justify-between py-1 border-b border-white/5">
                <span>Prayer School</span>
                <span className="font-semibold text-white">Mon 4:00 PM</span>
              </li>
              <li className="flex justify-between py-1 border-b border-white/5">
                <span>Discipleship Class</span>
                <span className="font-semibold text-white">Tue 4:00 PM</span>
              </li>
              <li className="flex justify-between py-1 border-b border-white/5">
                <span>Encounter Service</span>
                <span className="font-semibold text-white">Thu 4:00 PM</span>
              </li>
              <li className="flex justify-between py-1 border-b border-white/5">
                <span>Night of Encounter Vigil</span>
                <span className="font-semibold text-white">3rd Fri 9:00 PM</span>
              </li>
              <li className="flex justify-between py-1 border-b border-white/5">
                <span>STRASODA & Vine Drama</span>
                <span className="font-semibold text-[#38BDF8]">Sun 4:00 PM</span>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider text-[#38BDF8]">
              Conferences
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li><a href="#conferences" className="hover:text-white transition-colors">Strategic Leadership</a></li>
              <li><a href="#conferences" className="hover:text-white transition-colors">STRASODA Gathering</a></li>
              <li><a href="#conferences" className="hover:text-white transition-colors">Alabaster Women</a></li>
              <li><a href="#conferences" className="hover:text-white transition-colors">MELEC Men&apos;s Summit</a></li>
              <li><a href="#conferences" className="hover:text-white transition-colors">FELISO Worship Fest</a></li>
              <li><a href="#conferences" className="hover:text-white transition-colors">PPC Prayer Conference</a></li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider text-[#38BDF8]">
              Sanctuary Contact
            </h4>
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#7A0C1E] shrink-0 mt-0.5" />
                <span>Gospel Inn Ministry Cathedral, Main Sanctuary</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#38BDF8] shrink-0" />
                <span>+234 800 GOSPEL INN</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#38BDF8] shrink-0" />
                <span>info@gospelinnministry.org</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Rights */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <div>
            © {new Date().getFullYear()} Gospel Inn Ministry. Lead Pastor Ameh Amana. All Rights Reserved.
          </div>
          <div className="flex items-center space-x-6">
            <a href="#" className="hover:text-slate-300">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300">Terms of Service</a>
            <a href="#hero" className="text-[#38BDF8] hover:underline font-semibold">Back to Top ↑</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
