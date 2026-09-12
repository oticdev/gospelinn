"use client";

import React, { useEffect, useRef, useState } from "react";
import { Heart, Copy, Check, Landmark, ShieldCheck } from "lucide-react";
import Modal from "./Modal";

interface GivingModalProps {
  onClose: () => void;
}

const bankDetails = {
  bankName: "UBA",
  accountName: "Gospel Inn Ministry",
  accountNumber: "1020048579",
};

export default function GivingModal({ onClose }: GivingModalProps) {
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">("idle");
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimer.current) clearTimeout(resetTimer.current);
    };
  }, []);

  const handleCopyAccount = async () => {
    try {
      await navigator.clipboard.writeText(bankDetails.accountNumber);
      setCopyState("copied");
    } catch {
      // Insecure context or permission denied — the number is still visible to copy by hand.
      setCopyState("failed");
    }
    if (resetTimer.current) clearTimeout(resetTimer.current);
    resetTimer.current = setTimeout(() => setCopyState("idle"), 2500);
  };

  return (
    <Modal onClose={onClose} labelledBy="giving-title" className="max-w-lg space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gim-oxblood/40 border border-gim-oxblood text-[11px] font-bold text-gim-skyblue-bright">
          <Heart className="w-3.5 h-3.5 fill-gim-skyblue-bright" />
          Online Giving & Partnership
        </div>
        <h3 id="giving-title" className="text-2xl font-black text-white">Support Gospel Inn Ministry</h3>
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
            <span className="text-base font-black text-gim-skyblue-bright tracking-wider select-all">{bankDetails.accountNumber}</span>
            <button
              type="button"
              onClick={handleCopyAccount}
              className="flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              {copyState === "copied" ? (
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
          <p role="status" aria-live="polite" className="text-[11px] text-amber-400 min-h-[1em]">
            {copyState === "failed" ? "Couldn't copy automatically — please select and copy the number." : ""}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400">
        <ShieldCheck className="w-4 h-4 text-gim-skyblue-bright" />
        <span>Thank you for supporting Gospel Inn Ministry</span>
      </div>
    </Modal>
  );
}
