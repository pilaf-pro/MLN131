"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { FallingLeaves } from "@/components/falling-leaves";
import TeachingsSection from "@/components/teachings-section";

export default function TeachingsPage() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <FallingLeaves />
      <Header />
      <main>
        <TeachingsSection />
      </main>
      {/* <Footer /> */}
    </div>
  );
}
