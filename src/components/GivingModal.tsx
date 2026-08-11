"use client";

import React, { useState, useEffect } from "react";
import { Heart, Copy, Check, Landmark, X, ShieldCheck } from "lucide-react";

interface GivingModalProps {
  isOpen?: boolean;
  onClose: () => void;
}

const bankDetails = {
  bankName: "UBA",
  accountName: "Gospel Inn Ministry",
  accountNumber: "1020048579",
};

export default function GivingModal({ isOpen = true, onClose }: GivingModalProps) {
  const [copiedAcc, setCopiedAcc] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopyAccount = () => {
    navigator.clipboard.writeText(bankDetails.accountNumber);
    setCopiedAcc(true);
    setTimeout(() => setCopiedAcc(false), 2500);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Online Giving & Partnership"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg rounded-3xl glass-panel p-6 sm:p-8 border border-white/20 shadow-2xl space-y-6 text-left"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-full bg-white/5"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gim-oxblood/40 border border-gim-oxblood text-[11px] font-bold text-gim-skyblue-bright">
            <Heart className="w-3.5 h-3.5 fill-gim-skyblue-bright" />
            Online Giving & Partnership
          </div>
          <h3 className="text-2xl font-black text-white">Support Gospel Inn Ministry</h3>
          <p className="text-xs text-slate-300">
            Partner with us in advancing kingdom revival, church expansion, and outreach. Make a direct bank transfer to the account below.
          </p>
        </div>

        {/* Bank Transfer Details Box */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-gim-oxblood/40 to-gim-dark border border-gim-oxblood space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gim-skyblue-bright uppercase tracking-wider flex items-center gap-1.5">
              <Landmark className="w-4 h-4" />
              Bank Transfer Account
            </span>
            <span className="text-[10px] text-slate-400">Direct Transfer</span>
          </div>

          <div className="space-y-1 bg-black/40 p-3 rounded-xl border border-white/5">
            <div className="text-xs text-slate-400">Account Name: <strong className="text-white">{bankDetails.accountName}</strong></div>
            <div className="text-xs text-slate-400">Bank: <strong className="text-white">{bankDetails.bankName}</strong></div>
            <div className="flex items-center justify-between pt-1">
              <span className="text-base font-black text-gim-skyblue-bright tracking-wider">{bankDetails.accountNumber}</span>
              <button
                onClick={handleCopyAccount}
                className="flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                {copiedAcc ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-gim-skyblue-bright" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400">
          <ShieldCheck className="w-4 h-4 text-gim-skyblue-bright" />
          <span>Thank you for supporting Gospel Inn Ministry</span>
        </div>
      </div>
    </div>
  );
}
