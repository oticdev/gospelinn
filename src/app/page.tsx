import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PastorSpotlight from "@/components/PastorSpotlight";
import WeeklySchedule from "@/components/WeeklySchedule";
import Conferences from "@/components/Conferences";
import EncounterService from "@/components/EncounterService";
import SermonsHub from "@/components/SermonsHub";
import Footer from "@/components/Footer";
import { getLatestSermons } from "@/lib/youtube";

// Regenerate hourly; the YouTube fetch itself is cached for 3 days (see lib/youtube.ts).
export const revalidate = 3600;

export default async function Home() {
  const sermons = await getLatestSermons();

  return (
    <main className="min-h-screen bg-gim-dark text-slate-100 selection:bg-gim-oxblood selection:text-white relative">
      {/* Navigation Header (owns the Giving modal) */}
      <Navbar />

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

      {/* Sermons & Media Archive (fetched server-side) */}
      <SermonsHub videos={sermons} />

      {/* Footer */}
      <Footer />
    </main>
  );
}
