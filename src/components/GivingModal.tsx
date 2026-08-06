"use client";

import React, { useState } from "react";
import { Heart, Copy, Check, CreditCard, Landmark, Sparkles, X, ShieldCheck } from "lucide-react";
import confetti from "canvas-confetti";

interface GivingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GivingModal({ isOpen, onClose }: GivingModalProps) {
  const [selectedFund, setSelectedFund] = useState("Tithe & Offering");
  const [copiedAcc, setCopiedAcc] = useState(false);
  const [givenSuccess, setGivenSuccess] = useState(false);

  if (!isOpen) return null;

  const bankDetails = {
    bankName: "First Bank / Zenith Bank",
    accountName: "Gospel Inn Ministry",
    accountNumber: "1023948571",
  };

  const handleCopyAccount = () => {
    navigator.clipboard.writeText(bankDetails.accountNumber);
    setCopiedAcc(true);
    setTimeout(() => setCopiedAcc(false), 2500);
  };

  const handleGivingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });
    setGivenSuccess(true);
    setTimeout(() => {
      setGivenSuccess(false);
      onClose();
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in">
      <div className="relative w-full max-w-lg rounded-3xl glass-panel p-6 sm:p-8 border border-white/20 shadow-2xl space-y-6 text-left">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-full bg-white/5"
        >
          <X className="w-5 h-5" />
        </button>

        {givenSuccess ? (
          <div className="text-center py-10 space-y-3">
            <div className="w-16 h-16 rounded-full bg-[#7A0C1E]/50 border-2 border-[#38BDF8] flex items-center justify-center mx-auto text-[#38BDF8]">
              <Heart className="w-8 h-8 fill-[#38BDF8]" />
            </div>
            <h3 className="text-2xl font-bold text-white">May God Bless Your Giving!</h3>
            <p className="text-xs text-slate-300 max-w-sm mx-auto">
              &ldquo;Give, and it shall be given unto you; good measure, pressed down, and shaken together.&rdquo; — Luke 6:38
            </p>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#7A0C1E]/40 border border-[#7A0C1E] text-[11px] font-bold text-[#38BDF8]">
                <Heart className="w-3.5 h-3.5 fill-[#38BDF8]" />
                Online Giving & Partnership
              </div>
              <h3 className="text-2xl font-black text-white">Support Gospel Inn Ministry</h3>
              <p className="text-xs text-slate-300">
                Partner with us in advancing kingdom revival, church expansion, and outreach.
              </p>
            </div>

            {/* Fund Selection Tabs */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">Select Purpose / Seed</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  "Tithe & Offering",
                  "Building Fund",
                  "Vine Drama Seed",
                  "Conference Sponsor",
                  "Children Outreach",
                  "Pastor Seed",
                ].map((fund) => (
                  <button
                    key={fund}
                    type="button"
                    onClick={() => setSelectedFund(fund)}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all border ${
                      selectedFund === fund
                        ? "bg-[#7A0C1E] text-white border-[#38BDF8]/50 shadow-md"
                        : "bg-white/5 text-slate-300 border-white/10 hover:bg-white/10"
                    }`}
                  >
                    {fund}
                  </button>
                ))}
              </div>
            </div>

            {/* Bank Transfer Details Box */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-[#7A0C1E]/40 to-[#0B1120] border border-[#7A0C1E] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#38BDF8] uppercase tracking-wider flex items-center gap-1.5">
                  <Landmark className="w-4 h-4" />
                  Bank Transfer Account
                </span>
                <span className="text-[10px] text-slate-400">Direct Transfer</span>
              </div>

              <div className="space-y-1 bg-black/40 p-3 rounded-xl border border-white/5">
                <div className="text-xs text-slate-400">Account Name: <strong className="text-white">{bankDetails.accountName}</strong></div>
                <div className="text-xs text-slate-400">Bank: <strong className="text-white">{bankDetails.bankName}</strong></div>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-base font-black text-[#38BDF8] tracking-wider">{bankDetails.accountNumber}</span>
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
                        <Copy className="w-3.5 h-3.5 text-[#38BDF8]" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Online Payment Quick Form */}
            <form onSubmit={handleGivingSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Your Name (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Sis. Grace"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white text-sm focus:outline-none focus:border-[#38BDF8]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Amount (NGN ₦)</label>
                <input
                  required
                  type="number"
                  placeholder="Enter amount e.g. 5000"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white text-sm focus:outline-none focus:border-[#38BDF8]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#7A0C1E] to-[#9E1B32] border border-[#38BDF8]/40 shadow-lg hover:shadow-[#38BDF8]/20 transition-all flex items-center justify-center gap-2"
              >
                <CreditCard className="w-4 h-4" />
                I Have Sent My Seed / Tithe
              </button>
            </form>

            <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400">
              <ShieldCheck className="w-4 h-4 text-[#38BDF8]" />
              <span>Thank you for supporting Gospel Inn Ministry</span>
            </div>
          </>
        )}

      </div>
    </div>
  );
}
