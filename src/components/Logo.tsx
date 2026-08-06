"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Cross, Upload } from "lucide-react";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function Logo({ className = "", size = "md" }: LogoProps) {
  const [customLogo, setCustomLogo] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCustomLogo(url);
    }
  };

  const sizeClasses = {
    sm: "h-8 text-lg",
    md: "h-11 text-xl",
    lg: "h-16 text-3xl",
  };

  return (
    <div className={`flex items-center gap-3 group cursor-pointer ${className}`}>
      {customLogo ? (
        <div className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-[#38BDF8]">
          <Image src={customLogo} alt="Gospel Inn Ministry Logo" fill className="object-cover" />
        </div>
      ) : (
        <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-[#7A0C1E] to-[#4A0813] border border-[#38BDF8]/40 shadow-lg group-hover:scale-105 transition-transform duration-300">
          {/* Flame & Cross Icon */}
          <div className="absolute inset-0 bg-[#38BDF8]/10 rounded-xl blur-sm"></div>
          <Cross className="w-5 h-5 text-[#38BDF8] stroke-[2.5]" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#7A0C1E] rounded-full border border-white flex items-center justify-center">
            <span className="w-1.5 h-1.5 bg-[#38BDF8] rounded-full animate-ping"></span>
          </div>
        </div>
      )}

      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span className={`font-black tracking-wider uppercase font-serif text-white ${sizeClasses[size]}`}>
            GOSPEL INN
          </span>
          <span className="text-[#38BDF8] font-bold text-xs px-2 py-0.5 rounded-full bg-[#38BDF8]/10 border border-[#38BDF8]/30">
            MINISTRY
          </span>
        </div>
        <span className="text-[10px] text-slate-400 font-medium tracking-widest uppercase -mt-1">
          SANCTUARY OF GRACE & TRUTH
        </span>
      </div>

      {/* Hidden upload option for user PNG logo */}
      <label
        htmlFor="logo-upload"
        className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 text-xs text-slate-400 hover:text-[#38BDF8] cursor-pointer"
        title="Upload Custom PNG Logo"
      >
        <Upload className="w-3.5 h-3.5" />
        <input
          id="logo-upload"
          type="file"
          accept="image/png,image/jpeg"
          className="hidden"
          onChange={handleFileUpload}
        />
      </label>
    </div>
  );
}
