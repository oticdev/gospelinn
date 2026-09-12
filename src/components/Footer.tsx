import React from "react";
import Logo from "./Logo";
import SocialLinks from "./SocialLinks";
import { Mail, Phone, MapPin } from "lucide-react";
import { OFFICE_EMAIL, OFFICE_PHONE_DISPLAY, OFFICE_PHONE_TEL, SANCTUARY_MAPS_URL } from "@/lib/contact";

export default function Footer() {
  return (
    <footer id="contact" className="bg-gim-dark border-t border-white/10 pt-16 pb-12 relative overflow-hidden text-left">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gim-oxblood/15 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Column 1: Logo & About */}
          <div className="lg:col-span-4 space-y-4">
            <Logo size="md" />
            <p className="text-xs text-slate-300 font-light leading-relaxed">
              Gospel Inn Ministry is a sanctuary of prayer, discipleship, encounters, and kingdom transformation led by <strong className="text-white">Lead Pastor Ameh Amana</strong>.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <SocialLinks />
            </div>
          </div>

          {/* Column 2: Weekly Schedule Overview */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-gim-skyblue-bright">
              Services &amp; Classes
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
            </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-gim-skyblue-bright">
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
            <h4 className="text-sm font-bold uppercase tracking-wider text-gim-skyblue-bright">
              Sanctuary Contact
            </h4>
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-gim-oxblood shrink-0 mt-0.5" />
                <a
                  href={SANCTUARY_MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Gospel Inn Ministry, Main Sanctuary
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-gim-skyblue-bright shrink-0" />
                <a href={OFFICE_PHONE_TEL} className="hover:text-white transition-colors">{OFFICE_PHONE_DISPLAY}</a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-gim-skyblue-bright shrink-0" />
                <a href={`mailto:${OFFICE_EMAIL}`} className="hover:text-white transition-colors">{OFFICE_EMAIL}</a>
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
            <a href="#hero" className="text-gim-skyblue-bright hover:underline font-semibold">Back to Top ↑</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
