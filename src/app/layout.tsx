import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gospel Inn Ministry | Lead Pastor Ameh Amana",
  description: "A sanctuary of Prayer, Discipleship, Encounter, and Spiritual Transformation. Led by Lead Pastor Ameh Amana.",
  keywords: [
    "Gospel Inn Ministry",
    "Pastor Ameh Amana",
    "Prayer School",
    "Discipleship Class",
    "Encounter Service",
    "Night of Encounter",
    "STRASODA",
    "MELEC",
    "FELISO",
    "Alabaster Women Convention",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-gim-dark text-slate-100">{children}</body>
    </html>
  );
}
