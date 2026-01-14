"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { FallingLeaves } from "@/components/falling-leaves";
import BiographySection from "@/components/biography-section";

export default function BiographyPage() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <FallingLeaves />
      <Header />
      <main>
        <BiographySection />
      </main>
      {/* <Footer /> */}
    </div>
  );
}
