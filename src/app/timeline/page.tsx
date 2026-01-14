"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { FallingLeaves } from "@/components/falling-leaves";
import TimelineSection from "@/components/timeline-section";

export default function TimelinePage() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <FallingLeaves />
      <Header />
      <main>
        <TimelineSection />
      </main>
      {/* <Footer /> */}
    </div>
  );
}
