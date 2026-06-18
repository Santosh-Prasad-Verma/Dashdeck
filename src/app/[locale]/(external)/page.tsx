"use client";

import { HeroSection } from "./_components/hero-section";
import { LandingNavbar } from "./_components/landing-navbar";
import { MouseSpotlight } from "./_components/shared/mouse-spotlight";

export default function Page() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#050505] text-white">
      {/* Mouse Spotlight Effect */}
      <MouseSpotlight />

      {/* Background Effects */}
      <div className="pointer-events-none fixed inset-0 z-0">
        {/* Aurora Gradient */}
        <div className="absolute top-0 left-1/4 h-[600px] w-[800px] rounded-full bg-[#8B5CF6]/[0.04] blur-[150px]" />
        <div className="absolute top-1/3 right-1/4 h-[400px] w-[600px] rounded-full bg-[#6366F1]/[0.03] blur-[120px]" />
        <div className="absolute bottom-1/4 left-1/3 h-[300px] w-[500px] rounded-full bg-[#06B6D4]/[0.02] blur-[100px]" />

        {/* Grid Pattern at 0.03 opacity */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <LandingNavbar />
        <main>
          <HeroSection />
        </main>
      </div>
    </div>
  );
}
