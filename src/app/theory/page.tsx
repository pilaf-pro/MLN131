"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { FallingLeaves } from "@/components/falling-leaves";
import PhilosophySection from "@/components/philosophy-section";

export default function PhilosophyPage() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <FallingLeaves />
      <Header />
      <main>
        <PhilosophySection />
      </main>
      {/* <Footer /> */}
    </div>
  );
}
