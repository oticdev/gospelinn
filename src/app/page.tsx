"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PastorSpotlight from "@/components/PastorSpotlight";
import WeeklySchedule from "@/components/WeeklySchedule";
import Conferences from "@/components/Conferences";
import EncounterService from "@/components/EncounterService";
import SermonsHub from "@/components/SermonsHub";
import GivingModal from "@/components/GivingModal";
import Footer from "@/components/Footer";

export default function Home() {
  const [givingModalOpen, setGivingModalOpen] = useState(false);

  return (
    <main className="min-h-screen bg-gim-dark text-slate-100 selection:bg-gim-oxblood selection:text-white relative">
      {/* Navigation Header */}
      <Navbar onOpenGiving={() => setGivingModalOpen(true)} />

      {/* Hero Section */}
      <Hero />

      {/* Lead Pastor Spotlight Section */}
      <PastorSpotlight />

      {/* Weekly & Monthly Schedule Section */}
      <WeeklySchedule />

      {/* Conferences Section */}
      <Conferences />

      {/* Thursday Encounter Service Feature */}
      <EncounterService />

      {/* Sermons & Media Archive */}
      <SermonsHub />

      {/* Interactive Modals */}
      {givingModalOpen && <GivingModal onClose={() => setGivingModalOpen(false)} />}

      {/* Footer */}
      <Footer />
    </main>
  );
}
