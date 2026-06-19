"use client";

import { useRef } from "react";

import { motion, useScroll, useTransform } from "framer-motion";

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

interface ParallaxSectionProps {
  children: React.ReactNode;
  offset?: number;
}

function ParallaxSection({ children, offset = 50 }: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);

  return (
    <motion.div ref={ref} style={{ y }} className="w-full">
      {children}
    </motion.div>
  );
}

export default function Page() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  // Background parallax translations
  const yAurora1 = useTransform(scrollY, [0, 3000], ["0px", "300px"]);
  const yAurora2 = useTransform(scrollY, [0, 3000], ["0px", "-200px"]);
  const yAurora3 = useTransform(scrollY, [0, 3000], ["0px", "-100px"]);
  const yGrid = useTransform(scrollY, [0, 3000], ["0px", "150px"]);

  return (
    <div ref={containerRef} className="relative min-h-screen overflow-x-hidden bg-[#050505] text-white">
      {/* Mouse Spotlight Effect */}
      <MouseSpotlight />

      {/* Background Effects with Parallax */}
      <div className="pointer-events-none fixed inset-0 z-0">
        {/* Aurora Gradient */}
        <motion.div
          style={{ y: yAurora1 }}
          className="absolute top-0 left-[-100px] h-[700px] w-[900px] rounded-full bg-[#10b981]/[0.08] blur-[160px]"
        />
        <motion.div
          style={{ y: yAurora2 }}
          className="absolute top-[10%] right-[-100px] h-[700px] w-[900px] rounded-full bg-[#22c55e]/[0.08] blur-[160px]"
        />
        <motion.div
          style={{ y: yAurora3 }}
          className="absolute bottom-1/4 left-1/3 h-[400px] w-[600px] rounded-full bg-[#06b6d4]/[0.03] blur-[120px]"
        />

        {/* Grid Pattern at 0.02 opacity */}
        <motion.div
          style={{
            y: yGrid,
            backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`,
            backgroundSize: "64px 64px",
          }}
          className="absolute inset-0"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col">
        <LandingNavbar />
        <main className="flex-1">
          <HeroSection />

          {/* Siena Parallax cinematic scrolling section - has its own internal offset calculations */}
          <SienaParallax />

          <ParallaxSection offset={60}>
            <FeaturesSection />
          </ParallaxSection>

          <ParallaxSection offset={40}>
            <ProblemSolution />
          </ParallaxSection>

          <ParallaxSection offset={20}>
            <StatisticsSection />
          </ParallaxSection>

          <ParallaxSection offset={50}>
            <IntegrationsSection />
          </ParallaxSection>

          <ParallaxSection offset={30}>
            <FaqSection />
          </ParallaxSection>
        </main>
        <LandingFooter />
      </div>
    </div>
  );
}
