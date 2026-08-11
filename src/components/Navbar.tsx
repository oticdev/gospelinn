"use client";

import React, { useState, useEffect } from "react";
import Logo from "./Logo";
import { Menu, X, Heart } from "lucide-react";

interface NavbarProps {
  onOpenGiving: () => void;
}

export default function Navbar({ onOpenGiving }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#hero" },
    { name: "Pastor Ameh Amana", href: "#pastor" },
    { name: "Weekly Meetings", href: "#schedule" },
    { name: "Conferences", href: "#conferences" },
    { name: "Encounter Service", href: "#encounter" },
    { name: "Sermons & Media", href: "#sermons" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-gim-dark/90 backdrop-blur-xl border-b border-white/10 shadow-2xl py-3"
          : "bg-gradient-to-b from-gim-dark/90 to-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero">
          <Logo size="md" />
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-7">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-slate-300 hover:text-gim-skyblue-bright transition-colors relative py-1 group"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-gim-oxblood to-gim-skyblue-bright group-hover:w-full transition-all duration-300"></span>
            </a>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center space-x-3">
          {/* Give Button */}
          <button
            onClick={onOpenGiving}
            className="px-4 py-2 text-xs font-bold text-white rounded-lg bg-gradient-to-r from-gim-oxblood to-gim-oxblood-hover hover:from-gim-oxblood-hover hover:to-gim-oxblood border border-gim-skyblue-bright/30 shadow-lg shadow-gim-oxblood/30 hover:shadow-gim-skyblue-bright/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-1.5"
          >
            <Heart className="w-3.5 h-3.5 fill-white/20 text-white" />
            Give / Tithe
          </button>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-slate-300 hover:text-white rounded-lg hover:bg-white/10"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-gim-dark/95 backdrop-blur-2xl border-b border-white/10 px-4 pt-4 pb-6 space-y-3 animate-in fade-in slide-in-from-top-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-slate-200 hover:text-gim-skyblue-bright hover:bg-white/5 rounded-lg"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-4 border-t border-white/10 flex flex-col space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenGiving();
              }}
              className="w-full py-2.5 text-center text-sm font-bold text-white bg-gradient-to-r from-gim-oxblood to-gim-oxblood-hover rounded-lg shadow-md"
            >
              Give Online / Tithes
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
