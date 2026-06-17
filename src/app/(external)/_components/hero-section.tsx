"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, BarChart2, Activity, HardDrive } from "lucide-react";
import { GradientText } from "./shared/gradient-text";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] as const } },
};

export function HeroSection() {
  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-8 min-h-[calc(100vh-4rem)] pt-28 pb-16 flex items-center">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
        {/* Left Column */}
        <motion.div variants={stagger} initial="hidden" animate="show" className="flex flex-col">
          {/* Badge */}
          <motion.div variants={fadeUp}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium bg-[#8B5CF6]/10 text-[#8B5CF6] border border-[#8B5CF6]/20">
              <Sparkles className="size-3.5 animate-pulse" />
              Premium Next.js Dashboard Presets
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.08] text-white mt-8"
          >
            High-fidelity dashboard
            <br />
            presets for <GradientText>React & Next.js</GradientText>
          </motion.h1>

          {/* Subheadline */}
          <motion.p variants={fadeUp} className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-lg mt-6">
            A professionally designed collection of 15+ interactive dashboards including CRM, DevOps, Finance, Healthcare, Analytics, and Academy. Use them as reference architectures, copy layout presets, or jumpstart your next admin panel.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-4 mt-10">
            <Link
              href="/dashboard/default"
              className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-semibold px-8 py-3.5 rounded-xl text-base transition-all duration-300 hover:shadow-xl hover:shadow-[#8B5CF6]/25 hover:scale-[1.02] active:scale-[0.98]"
            >
              Explore Dashboard Presets
            </Link>
          </motion.div>
        </motion.div>

        {/* Right Column — Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.21, 0.47, 0.32, 0.98] as const }}
          className="relative hidden lg:block"
        >
          {/* Glow */}
          <div className="absolute bg-[#8B5CF6]/[0.08] w-[500px] h-[500px] rounded-full blur-[120px] -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

          {/* Dashboard Container */}
          <motion.div
            className="relative"
            style={{ transform: "perspective(1200px) rotateY(-6deg) rotateX(3deg)" }}
          >
            <div className="flex flex-col gap-4">
              
              {/* Upgraded Card 1: Traffic Spikes (Area/Line Chart) */}
              <div className="bg-[#0A0A1A]/80 border border-white/[0.06] rounded-2xl p-5 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Activity className="size-4 text-[#8B5CF6]" />
                    <span className="text-sm font-medium text-gray-300">Live Traffic (Ingress vs. Egress)</span>
                  </div>
                  <span className="text-[10px] font-medium text-[#8B5CF6] bg-[#8B5CF6]/10 px-2 py-0.5 rounded-full">Live</span>
                </div>
                
                <svg viewBox="0 0 280 80" className="w-full h-20">
                  <defs>
                    <linearGradient id="waveFill1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="waveFill2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.1" />
                      <stop offset="100%" stopColor="#06B6D4" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  
                  {/* Ingress Wave Fill */}
                  <path d="M0,60 Q35,45 70,55 T140,40 T210,50 T280,35 V80 H0 Z" fill="url(#waveFill2)" />
                  <polyline points="0,60 35,51 70,55 105,48 140,40 175,44 210,50 245,41 280,35" fill="none" stroke="#06B6D4" strokeWidth="1.5" strokeDasharray="3 3" />
                  
                  {/* Egress Wave Fill */}
                  <path d="M0,50 Q35,30 70,40 T140,20 T210,35 T280,15 V80 H0 Z" fill="url(#waveFill1)" />
                  <polyline points="0,50 35,38 70,40 105,28 140,20 175,25 210,35 245,18 280,15" fill="none" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" />
                </svg>

                <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
                  <span>Avg: 229.6 Mb/s</span>
                  <span className="text-[#8B5CF6] font-medium">+14.2%</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                
                {/* Upgraded Card 2: Region Load (Donut Ring Chart) */}
                <div className="bg-[#0A0A1A]/80 border border-white/[0.06] rounded-2xl p-5 backdrop-blur-sm">
                  <div className="flex items-center gap-1.5 mb-2">
                    <HardDrive className="size-4 text-[#06B6D4]" />
                    <span className="text-sm font-medium text-gray-300">Region Load</span>
                  </div>
                  
                  <div className="flex items-center gap-4 mt-3">
                    <div className="relative size-14 flex items-center justify-center shrink-0">
                      <svg className="absolute inset-0 size-full -rotate-90" viewBox="0 0 36 36">
                        <circle cx="18" cy="18" r="16" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="3.5" />
                        <circle cx="18" cy="18" r="16" fill="none" stroke="#8B5CF6" strokeWidth="3.5" strokeDasharray="60 100" strokeLinecap="round" />
                        <circle cx="18" cy="18" r="16" fill="none" stroke="#06B6D4" strokeWidth="3.5" strokeDasharray="25 100" strokeDashoffset="-62" strokeLinecap="round" />
                      </svg>
                      <span className="text-[10px] font-bold text-white">85%</span>
                    </div>
                    
                    <div className="flex flex-col gap-1 text-[9px] text-gray-400">
                      <div className="flex items-center gap-1">
                        <span className="size-1.5 rounded-full bg-[#8B5CF6]" />
                        <span>US-EAST (60%)</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="size-1.5 rounded-full bg-[#06B6D4]" />
                        <span>EU-CENT (25%)</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Upgraded Card 3: Real-Time Performance Bars (Histogram) */}
                <div className="bg-[#0A0A1A]/80 border border-white/[0.06] rounded-2xl p-5 backdrop-blur-sm">
                  <div className="flex items-center gap-1.5 mb-2">
                    <BarChart2 className="size-4 text-[#8B5CF6]" />
                    <span className="text-sm font-medium text-gray-300">Throughput</span>
                  </div>
                  
                  <div className="flex items-end justify-between h-14 mt-4 gap-1">
                    {[30, 45, 25, 60, 75, 40, 50, 85, 65, 45, 30, 55, 70].map((height, i) => (
                      <div 
                        key={i} 
                        className="w-full rounded-t-xs transition-all duration-300"
                        style={{ 
                          height: `${height}%`,
                          background: i === 7 
                            ? 'linear-gradient(to top, rgba(6,182,212,0.2), #06B6D4)' 
                            : 'linear-gradient(to top, rgba(139,92,246,0.1), #8B5CF6)',
                          opacity: i === 7 ? 1 : 0.6
                        }}
                      />
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
