"use client";

import { LandingNavbar } from "./_components/landing-navbar";
import { HeroSection } from "./_components/hero-section";
import { ProblemSolution } from "./_components/problem-solution";
import { FeaturesSection } from "./_components/features-section";
import { StickyShowcase } from "./_components/sticky-showcase";
import { StatisticsSection } from "./_components/statistics-section";
import { BuiltForSection } from "./_components/built-for-section";
import { IntegrationsSection } from "./_components/integrations-section";
import { FaqSection } from "./_components/faq-section";
import { WaitlistCta } from "./_components/waitlist-cta";
import { LandingFooter } from "./_components/landing-footer";
import { MouseSpotlight } from "./_components/shared/mouse-spotlight";

export default function Page() {
  return (
    <div className="relative min-h-screen bg-[#050505] text-white overflow-x-hidden">
      {/* Mouse Spotlight Effect */}
      <MouseSpotlight />

      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Aurora Gradient */}
        <div className="absolute top-0 left-1/4 w-[800px] h-[600px] bg-[#8B5CF6]/[0.04] rounded-full blur-[150px]" />
        <div className="absolute top-1/3 right-1/4 w-[600px] h-[400px] bg-[#6366F1]/[0.03] rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 left-1/3 w-[500px] h-[300px] bg-[#06B6D4]/[0.02] rounded-full blur-[100px]" />

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
          <ProblemSolution />
          <FeaturesSection />
          <StickyShowcase />
          <StatisticsSection />
          <BuiltForSection />
          <IntegrationsSection />
          <FaqSection />
          <WaitlistCta />
        </main>
        <LandingFooter />
      </div>
    </div>
  );
}
