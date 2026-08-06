"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PastorSpotlight from "@/components/PastorSpotlight";
import WeeklySchedule from "@/components/WeeklySchedule";
import Conferences from "@/components/Conferences";
import DramaMinistry from "@/components/DramaMinistry";
import SermonsHub from "@/components/SermonsHub";
import GivingModal from "@/components/GivingModal";
import PrayerRequest from "@/components/PrayerRequest";
import Footer from "@/components/Footer";

export default function Home() {
  const [givingModalOpen, setGivingModalOpen] = useState(false);
  const [prayerModalOpen, setPrayerModalOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#0B1120] text-slate-100 selection:bg-[#7A0C1E] selection:text-white relative">
      {/* Navigation Header */}
      <Navbar
        onOpenGiving={() => setGivingModalOpen(true)}
        onOpenPrayer={() => setPrayerModalOpen(true)}
      />

      {/* Hero Section */}
      <Hero
        onOpenGiving={() => setGivingModalOpen(true)}
        onOpenPrayer={() => setPrayerModalOpen(true)}
      />

      {/* Lead Pastor Spotlight Section */}
      <PastorSpotlight />

      {/* Weekly & Monthly Schedule Section */}
      <WeeklySchedule />

      {/* Conferences Section */}
      <Conferences />

      {/* Vine Drama Ministry Feature */}
      <DramaMinistry />

      {/* Sermons & Media Archive */}
      <SermonsHub />

      {/* Interactive Modals */}
      <GivingModal
        isOpen={givingModalOpen}
        onClose={() => setGivingModalOpen(false)}
      />

      <PrayerRequest
        isOpen={prayerModalOpen}
        onClose={() => setPrayerModalOpen(false)}
      />

      {/* Footer */}
      <Footer />
    </main>
  );
}
