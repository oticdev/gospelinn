import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en" className="h-full antialiased scroll-smooth">
      <body className="min-h-full flex flex-col bg-gim-dark text-slate-100">{children}</body>
    </html>
  );
}
