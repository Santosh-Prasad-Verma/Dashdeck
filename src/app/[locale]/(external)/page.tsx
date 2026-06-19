import { FaqSection } from "./_components/faq-section";
import { FeaturesSection } from "./_components/features-section";
import { HeroSection } from "./_components/hero-section";
import { IntegrationsSection } from "./_components/integrations-section";
import { LandingFooter } from "./_components/landing-footer";
import { LandingNavbar } from "./_components/landing-navbar";
import { ProblemSolution } from "./_components/problem-solution";
import { MouseSpotlight } from "./_components/shared/mouse-spotlight";
import { SienaParallax } from "./_components/siena-parallax";
import { StatisticsSection } from "./_components/statistics-section";

export default function Page() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#050505] text-white">
      {/* Mouse Spotlight Effect */}
      <MouseSpotlight />

      {/* Background Effects */}
      <div className="pointer-events-none fixed inset-0 z-0">
        {/* Aurora Gradient */}
        <div className="absolute top-0 left-[-100px] h-[700px] w-[900px] rounded-full bg-[#10b981]/[0.08] blur-[160px]" />
        <div className="absolute top-[10%] right-[-100px] h-[700px] w-[900px] rounded-full bg-[#22c55e]/[0.08] blur-[160px]" />
        <div className="absolute bottom-1/4 left-1/3 h-[400px] w-[600px] rounded-full bg-[#06b6d4]/[0.03] blur-[120px]" />

        {/* Grid Pattern at 0.02 opacity */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`,
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <LandingNavbar />
        <main className="flex-1">
          <HeroSection />

          {/* Siena Parallax cinematic scrolling section */}
          <SienaParallax />

          <FeaturesSection />
          <ProblemSolution />
          <StatisticsSection />
          <IntegrationsSection />
          <FaqSection />
        </main>
        <LandingFooter />
      </div>
    </div>
  );
}
