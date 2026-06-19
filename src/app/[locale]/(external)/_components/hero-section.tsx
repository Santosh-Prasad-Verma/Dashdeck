"use client";

import { useRef } from "react";

import { motion, useScroll, useTransform } from "framer-motion";
import { Activity, ArrowUpRight, CheckCircle2, Compass, FileSignature, Globe, Layers, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";

export function HeroSection() {
  const t = useTranslations("Landing.hero");
  const sectionRef = useRef<HTMLDivElement>(null);

  // Track scroll progress of Hero section relative to viewport
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Parallax transform calculations
  const yText = useTransform(scrollYProgress, [0, 1], ["0px", "140px"]);
  const yPreview = useTransform(scrollYProgress, [0, 1], ["0px", "-40px"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative mx-auto flex max-w-7xl flex-col items-center px-6 pt-32 pb-24 text-center lg:px-8"
    >
      {/* Glow Center Background behind header */}
      <div className="absolute top-[10%] left-1/2 -z-10 h-[300px] w-[500px] -translate-x-1/2 rounded-full bg-[#10b981]/[0.05] blur-[120px]" />

      <motion.div
        style={{ y: yText, opacity: opacityText }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex max-w-4xl flex-col items-center"
      >
        {/* Badge */}
        <span className="inline-flex items-center gap-2 rounded-full border border-[#10b981]/30 bg-[#10b981]/10 px-4 py-1.5 font-medium text-[#10b981] text-xs uppercase tracking-wider shadow-[#10b981]/10 shadow-sm">
          <Sparkles className="size-3.5" />
          {t("badge")}
        </span>

        {/* Headline */}
        <h1 className="mt-8 font-extrabold font-sans text-5xl text-white leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
          {t("headlineLine1")}
          <br />
          <span className="text-gray-500">{t("headlineLine2Prefix")}</span>
          <span className="bg-gradient-to-r from-emerald-400 via-green-500 to-[#d4fc34] bg-clip-text text-transparent">
            {t("headlineLine2Highlight")}
          </span>
        </h1>

        {/* Description */}
        <p className="mx-auto mt-6 max-w-2xl text-gray-400 text-lg leading-relaxed">{t("description")}</p>

        {/* CTA Button */}
        <div className="mt-10">
          <Link
            href="/dashboard/default"
            className="rounded-full bg-white px-8 py-3.5 font-bold text-black text-sm shadow-lg shadow-white/10 transition-all hover:scale-[1.03] hover:bg-neutral-100"
          >
            {t("cta")}
          </Link>
        </div>
      </motion.div>

      {/* Dashboard Preview Container */}
      <motion.div
        style={{ y: yPreview }}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mt-16 w-full max-w-6xl rounded-2xl border border-white/[0.08] bg-[#0A0A0A]/90 p-1.5 shadow-2xl shadow-black/80 backdrop-blur-md"
      >
        {/* Browser Header Bar */}
        <div className="flex items-center justify-between border-white/[0.04] border-b px-4 py-2 font-mono text-[10px] text-muted-foreground">
          <div className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-red-500/80" />
            <span className="size-2.5 rounded-full bg-yellow-500/80" />
            <span className="size-2.5 rounded-full bg-green-500/80" />
          </div>
          <div>console.dashdeck.io</div>
          <div className="w-10" />
        </div>

        {/* Main Inner Dashboard Layout */}
        <div className="grid min-h-[500px] grid-cols-1 md:grid-cols-12">
          {/* 1. Sidebar */}
          <div className="flex flex-col gap-5 border-white/[0.04] border-r bg-[#080808]/90 p-3 text-left md:col-span-2">
            {/* Project Header */}
            <div className="flex items-center gap-2">
              <div className="flex size-6 items-center justify-center rounded border border-[#10b981]/30 bg-[#10b981]/20">
                <Layers className="size-3.5 text-[#10b981]" />
              </div>
              <span className="font-semibold text-white text-xs tracking-wide">Dashdeck</span>
            </div>

            {/* Nav Categories */}
            <div className="space-y-4">
              <div>
                <span className="font-bold text-[9px] text-muted-foreground uppercase tracking-wider">Operations</span>
                <div className="mt-1.5 flex flex-col gap-1 text-[11px]">
                  <div className="flex items-center gap-2 rounded-md border border-[#10b981]/20 bg-[#10b981]/10 px-2.5 py-1.5 font-medium text-[#10b981]">
                    <Compass className="size-3.5" />
                    Analytics
                  </div>
                  <div className="flex items-center gap-2 px-2.5 py-1.5 text-muted-foreground transition-colors hover:text-white">
                    <Activity className="size-3.5" />
                    AI Agent Runs
                  </div>
                  <div className="flex items-center gap-2 px-2.5 py-1.5 text-muted-foreground transition-colors hover:text-white">
                    <Globe className="size-3.5" />
                    Sales Analytics
                  </div>
                  <div className="flex items-center gap-2 px-2.5 py-1.5 text-muted-foreground transition-colors hover:text-white">
                    <FileSignature className="size-3.5" />
                    FinOps Spend
                  </div>
                </div>
              </div>

              <div>
                <span className="font-bold text-[9px] text-muted-foreground uppercase tracking-wider">Management</span>
                <div className="mt-1.5 flex flex-col gap-1 text-[11px] text-muted-foreground">
                  <div className="flex items-center gap-2 px-2.5 py-1.5 transition-colors hover:text-white">
                    <CheckCircle2 className="size-3.5" />
                    Report Builder
                  </div>
                  <div className="flex items-center gap-2 px-2.5 py-1.5 transition-colors hover:text-white">
                    <Sparkles className="size-3.5" />
                    App Settings
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Central Content Dashboard Area */}
          <div className="flex flex-col gap-5 bg-black/40 p-4 text-left md:col-span-7 md:p-6">
            {/* Header info */}
            <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="font-semibold text-base text-white">Dashdeck Console</h3>
                <span className="text-[11px] text-muted-foreground">
                  Active Presets · 15+ interactive dashboards · Real-time data
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="flex items-center gap-1 rounded-md border border-white/[0.08] bg-white/[0.04] px-3 py-1.5 font-medium text-[11px] text-white transition-colors hover:bg-white/[0.08]"
                >
                  Export
                  <ArrowUpRight className="size-3" />
                </button>
                <button
                  type="button"
                  className="rounded-md bg-[#d4fc34] px-3 py-1.5 font-bold text-[11px] text-black transition-colors hover:bg-[#c2e92b]"
                >
                  + New Report
                </button>
              </div>
            </div>

            {/* KPI metrics Grid */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="flex flex-col gap-1 rounded-xl border border-white/[0.04] bg-[#0E0E0E] p-3">
                <span className="text-[10px] text-muted-foreground">System Uptime</span>
                <div className="font-semibold text-lg text-white">99.9%</div>
                <span className="font-medium text-[9px] text-emerald-500">↗ 0.02% vs last week</span>
              </div>
              <div className="flex flex-col gap-1 rounded-xl border border-white/[0.04] bg-[#0E0E0E] p-3">
                <span className="text-[10px] text-muted-foreground">Total Presets</span>
                <div className="font-semibold text-lg text-white">15+</div>
                <span className="font-medium text-[9px] text-emerald-500">↗ 2 added this month</span>
              </div>
              <div className="flex flex-col gap-1 rounded-xl border border-white/[0.04] bg-[#0E0E0E] p-3">
                <span className="text-[10px] text-muted-foreground">Weekly Downloads</span>
                <div className="font-semibold text-lg text-white">4,820</div>
                <span className="font-medium text-[9px] text-emerald-500">↗ 320 this week</span>
              </div>
              <div className="flex flex-col gap-1 rounded-xl border border-white/[0.04] bg-[#0E0E0E] p-3">
                <span className="text-[10px] text-muted-foreground">Page Speed Score</span>
                <div className="font-semibold text-lg text-white">98/100</div>
                <span className="font-medium text-[9px] text-emerald-500">LCP 0.8s - Core Web Vitals</span>
              </div>
            </div>

            {/* Emission Rate Line Chart Box */}
            <div className="flex flex-col gap-4 rounded-xl border border-white/[0.04] bg-[#0E0E0E] p-4">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-white text-xs">
                  Request Throughput ·{" "}
                  <span className="font-normal text-[11px] text-muted-foreground">Live requests/min</span>
                </span>
                <div className="flex items-center gap-1 rounded border border-white/[0.05] bg-white/[0.03] p-0.5 font-mono font-semibold text-[9px] text-muted-foreground">
                  <span className="px-1.5 py-0.5">1W</span>
                  <span className="rounded bg-[#10b981]/20 px-1.5 py-0.5 text-[#10b981]">1M</span>
                  <span className="px-1.5 py-0.5">2M</span>
                  <span className="px-1.5 py-0.5">3M</span>
                  <span className="px-1.5 py-0.5">6M</span>
                  <span className="px-1.5 py-0.5">1Y</span>
                </div>
              </div>

              {/* SVG Double line chart */}
              <div className="relative mt-2 h-40 w-full">
                <svg viewBox="0 0 500 150" className="h-full w-full" preserveAspectRatio="none">
                  {/* Faded background grids */}
                  <line x1="0" y1="30" x2="500" y2="30" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                  <line x1="0" y1="70" x2="500" y2="70" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                  <line x1="0" y1="110" x2="500" y2="110" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />

                  {/* Leaked rate (faded gray/white line) */}
                  <path
                    d="M 0,110 Q 50,120 100,100 T 200,90 T 300,115 T 400,95 T 500,110"
                    fill="none"
                    stroke="rgba(255,255,255,0.3)"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                  />

                  {/* Detected rate (emerald line) */}
                  <path
                    d="M 0,85 Q 50,75 100,85 T 200,45 T 300,55 T 400,75 T 500,60"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />

                  {/* Highlight Node */}
                  <circle cx="250" cy="50" r="4" fill="#10b981" />
                </svg>

                {/* Tooltip Overlay */}
                <div className="absolute top-[10%] left-[45%] flex flex-col gap-0.5 rounded-lg border border-white/[0.08] bg-black/95 p-2 font-mono text-[10px] shadow-xl">
                  <span className="font-semibold text-muted-foreground">Live Traffic</span>
                  <div className="flex items-center gap-1">
                    <span className="size-1.5 rounded-full bg-[#10b981]" />
                    <span className="font-medium text-white">
                      Ingress: <span className="font-bold">412 Mb/s</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="size-1.5 rounded-full bg-white/40" />
                    <span className="text-muted-foreground">
                      Egress: <span>204 Mb/s</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Alerts Sidebar */}
          <div className="flex flex-col gap-4 bg-[#080808]/90 p-4 md:col-span-3">
            <div className="flex items-center justify-between border-white/[0.04] border-b pb-2">
              <span className="font-semibold text-white text-xs">Active Logs</span>
              <div className="flex items-center gap-1 text-muted-foreground">
                <span className="font-medium text-[10px]">Filter</span>
              </div>
            </div>

            <div className="flex flex-col gap-2.5 text-left">
              {/* Alert 1 */}
              <div className="flex flex-col gap-1.5 rounded-lg border border-white/[0.04] bg-[#0E0E0E] p-2.5">
                <div className="flex items-center justify-between gap-2">
                  <span
                    className="max-w-[130px] truncate font-semibold text-white text-xs"
                    title="Database replication success"
                  >
                    Db replication ok
                  </span>
                  <span className="rounded border border-emerald-500/20 bg-emerald-500/10 px-1.5 py-0.5 font-bold text-[9px] text-emerald-500 uppercase">
                    Success
                  </span>
                </div>
                <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                  <span>US-East-1 Node</span>
                  <span>4 min ago</span>
                </div>
              </div>

              {/* Alert 2 */}
              <div className="flex flex-col gap-1.5 rounded-lg border border-white/[0.04] bg-[#0E0E0E] p-2.5">
                <div className="flex items-center justify-between gap-2">
                  <span
                    className="max-w-[130px] truncate font-semibold text-white text-xs"
                    title="Zustand store hydrated"
                  >
                    Zustand hydrated
                  </span>
                  <span className="rounded border border-sky-500/20 bg-sky-500/10 px-1.5 py-0.5 font-bold text-[9px] text-sky-500 uppercase">
                    Active
                  </span>
                </div>
                <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                  <span>Local Storage</span>
                  <span>1 hour ago</span>
                </div>
              </div>

              {/* Alert 3 */}
              <div className="flex flex-col gap-1.5 rounded-lg border border-white/[0.04] bg-[#0E0E0E] p-2.5">
                <div className="flex items-center justify-between gap-2">
                  <span
                    className="max-w-[130px] truncate font-semibold text-white text-xs"
                    title="CDN edge cache cleared"
                  >
                    CDN cache clear
                  </span>
                  <span className="rounded border border-emerald-500/20 bg-emerald-500/10 px-1.5 py-0.5 font-bold text-[9px] text-emerald-500 uppercase">
                    Success
                  </span>
                </div>
                <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                  <span>18 Edge regions</span>
                  <span>2 hours ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
