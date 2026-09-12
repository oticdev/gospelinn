"use client";

import React, { useEffect, useRef } from "react";
import { X } from "lucide-react";

interface ModalProps {
  onClose: () => void;
  /** Accessible name when there is no visible heading to reference. */
  label?: string;
  /** id of the visible heading element that names the dialog. */
  labelledBy?: string;
  /** Extra classes for the panel (e.g. max-w-2xl, max-h-[90vh] overflow-y-auto). */
  className?: string;
  children: React.ReactNode;
}

/**
 * Shared modal built on the native <dialog> element. `showModal()` renders in
 * the browser's top layer (above any z-index / stacking context, including
 * the fixed navbar), makes the rest of the page inert, traps focus and closes
 * on Escape. We add body scroll locking, backdrop-click to close and focus
 * restoration.
 */
export default function Modal({ onClose, label, labelledBy, className = "", children }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    // Native close (Escape) → let the owner unmount us.
    const handleNativeClose = () => onCloseRef.current();
    dialog.addEventListener("close", handleNativeClose);
    if (!dialog.open) dialog.showModal();

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      dialog.removeEventListener("close", handleNativeClose);
      if (dialog.open) dialog.close();
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus?.();
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      aria-label={label}
      aria-labelledby={labelledBy}
      // Clicks on the dialog element itself (not the panel) are backdrop clicks.
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 m-0 h-full w-full max-h-none max-w-none border-0 bg-black/80 p-4 text-slate-100 backdrop-blur-xl open:flex items-center justify-center animate-fade-in"
    >
      <div
        className={`relative w-full rounded-3xl glass-panel border border-white/20 p-6 shadow-2xl text-left outline-none sm:p-8 ${className}`}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-5 right-5 rounded-full bg-white/5 p-2 text-slate-400 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>
        {children}
      </div>
    </dialog>
  );
}
