"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Lock,
  Zap,
  CreditCard,
  ChevronDown,
  Globe,
  Menu,
  X,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Segment type for Donut Chart
interface DonutSegment {
  name: string;
  value: number;
  color: string;
  dotColor: string;
}

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // --- Donut Chart State & Data ---
  const donutSegments: DonutSegment[] = [
    { name: "Shopping", value: 2420, color: "#818cf8", dotColor: "bg-[#818cf8]" }, // Indigo
    { name: "Transport", value: 1630, color: "#3b82f6", dotColor: "bg-[#3b82f6]" }, // Blue
    { name: "Dining", value: 1080, color: "#06b6d4", dotColor: "bg-[#06b6d4]" }, // Cyan
    { name: "Other", value: 1300, color: "#c084fc", dotColor: "bg-[#c084fc]" }, // Purple
  ];

  const totalSpend = donutSegments.reduce((sum, seg) => sum + seg.value, 0);
  const [hoveredDonutIdx, setHoveredDonutIdx] = useState<number | null>(null);

  // SVG calculations for Donut
  const donutRadius = 43;
  const donutCircumference = 2 * Math.PI * donutRadius; // ~270.18

  let accumulatedPercent = 0;
  const computedDonutSegments = donutSegments.map((seg) => {
    const percent = seg.value / totalSpend;
    const strokeDasharray = `${percent * donutCircumference} ${donutCircumference}`;
    const strokeDashoffset = -accumulatedPercent * donutCircumference;
    accumulatedPercent += percent;
    return {
      ...seg,
      strokeDasharray,
      strokeDashoffset,
      percent,
    };
  });

  // --- Spending Activity (Line Chart) State & Data ---
  const [activeActivityIdx, setActiveActivityIdx] = useState<number>(3); // Default to THU (index 3)
  const activityData = [
    { label: "MON", value: 48, y: 75, x: 25 },
    { label: "TUE", value: 68, y: 55, x: 70 },
    { label: "WED", value: 58, y: 65, x: 115 },
    { label: "THU", value: 88, y: 32, x: 160 },
    { label: "FRI", value: 42, y: 80, x: 205 },
    { label: "SAT", value: 65, y: 58, x: 250 },
    { label: "SUN", value: 52, y: 70, x: 295 },
  ];

  // Curve path calculation for Spending Activity line
  const activityPath = `M 25,75 C 47.5,60 47.5,55 70,55 C 92.5,55 92.5,65 115,65 C 137.5,65 137.5,32 160,32 C 182.5,32 182.5,80 205,80 C 227.5,80 227.5,58 250,58 C 272.5,58 272.5,70 295,70`;
  const activityAreaPath = `${activityPath} L 295,110 L 25,110 Z`;

  // --- Weekly Overview (Area Chart) State & Data ---
  const [activeOverviewIdx, setActiveOverviewIdx] = useState<number>(4); // Default to AUG 24 (index 4)
  const overviewData = [
    { date: "AUG 20", label: "Aug 20, 2024", value: 1520, y: 150, x: 40 },
    { date: "AUG 21", label: "Aug 21, 2024", value: 2210, y: 138, x: 106 },
    { date: "AUG 22", label: "Aug 22, 2024", value: 4840, y: 92, x: 173 },
    { date: "AUG 23", label: "Aug 23, 2024", value: 4120, y: 104, x: 240 },
    { date: "AUG 24", label: "Aug 24, 2024", value: 5420, y: 76, x: 306 },
    { date: "AUG 25", label: "Aug 25, 2024", value: 3200, y: 120, x: 373 },
    { date: "AUG 26", label: "Aug 26, 2024", value: 4650, y: 95, x: 440 },
  ];

  // Curve path calculation for Weekly Overview
  const overviewPath = `M 40,150 C 73,145 73,138 106,138 C 139,138 140,92 173,92 C 206,92 207,104 240,104 C 273,104 273,76 306,76 C 339,76 340,120 373,120 C 406,120 407,95 440,95`;
  const overviewAreaPath = `${overviewPath} L 440,190 L 40,190 Z`;

  // Selected points coordinates to perform smooth transitions on active dot
  const currentActivityPt = activityData[activeActivityIdx];
  const currentOverviewPt = overviewData[activeOverviewIdx];

  return (
    <div className="relative min-h-screen lg:h-screen lg:overflow-hidden bg-[#030308] text-gray-100 selection:bg-violet-500/30 font-sans flex flex-col justify-between">
      {/* Background Radial Glows */}
      <div className="pointer-events-none absolute top-[-10%] left-[-10%] h-[600px] w-[600px] rounded-full bg-indigo-500/10 blur-[140px] md:bg-indigo-500/15" />
      <div className="pointer-events-none absolute top-[20%] right-[-10%] h-[700px] w-[700px] rounded-full bg-violet-600/10 blur-[160px] md:bg-violet-600/12" />
      <div className="pointer-events-none absolute bottom-[-10%] left-[20%] h-[600px] w-[600px] rounded-full bg-blue-600/5 blur-[130px]" />

      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-white/[0.05] bg-[#030308]/75 backdrop-blur-xl transition-all duration-300 flex-shrink-0">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 sm:px-8 lg:px-12">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 transition-opacity hover:opacity-90">
            <div className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg bg-white/5 border border-white/10 p-1 shadow-lg">
              <img
                src="/Dashdeck-logo.png"
                alt="Dashdeck Logo"
                className="h-full w-full object-contain scale-110"
              />
            </div>
            <span className="font-semibold text-lg tracking-tight text-white">Dashdeck</span>
          </Link>

          {/* Nav Links - Desktop */}
          <div className="hidden items-center gap-8 md:flex">
            <Link
              href="#features"
              className="text-xs font-medium text-gray-400 hover:text-white transition-colors duration-200"
            >
              Features
            </Link>
            <Link
              href="#dashboard-preview"
              className="text-xs font-medium text-gray-400 hover:text-white transition-colors duration-200"
            >
              Dashboard Preview
            </Link>
            <a
              href="https://github.com/Santosh-Prasad-Verma/Dashdeck"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-xs font-medium text-gray-400 hover:text-white transition-colors duration-200"
            >
              <Globe className="h-3.5 w-3.5" />
              GitHub
            </a>
            <a
              href="https://x.com/TarunVerma_121"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-xs font-medium text-gray-400 hover:text-white transition-colors duration-200"
            >
              <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              X (Twitter)
            </a>
          </div>

          {/* Actions - Desktop */}
          <div className="hidden items-center gap-4 md:flex">
            <Button
              asChild
              variant="ghost"
              className="text-xs font-medium text-gray-300 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10 px-3.5 h-9"
            >
              <Link href="/dashboard/default">Sign In</Link>
            </Button>
            <Button
              asChild
              className="relative overflow-hidden rounded-lg bg-gradient-to-r from-violet-500 to-indigo-500 hover:from-violet-600 hover:to-indigo-600 px-4 h-9 text-xs font-medium text-white shadow-[0_0_15px_rgba(139,92,246,0.25)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              <Link href="/dashboard/default">
                Get Started
                <ArrowRight className="ml-1.2 h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:text-white md:hidden"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="h-4.5 w-4.5" /> : <Menu className="h-4.5 w-4.5" />}
          </button>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="border-b border-white/[0.05] bg-[#030308]/95 px-6 py-6 backdrop-blur-xl md:hidden transition-all duration-300 animate-in fade-in slide-in-from-top-5">
            <div className="flex flex-col gap-5">
              <Link
                href="#features"
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-gray-300 hover:text-white"
              >
                Features
              </Link>
              <Link
                href="#dashboard-preview"
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-gray-300 hover:text-white"
              >
                Dashboard Preview
              </Link>
              <a
                href="https://github.com/Santosh-Prasad-Verma/Dashdeck"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-base font-medium text-gray-300 hover:text-white"
              >
                <Globe className="h-5 w-5" />
                GitHub
              </a>
              <a
                href="https://x.com/TarunVerma_121"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-base font-medium text-gray-300 hover:text-white"
              >
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                X (Twitter)
              </a>
              <div className="h-px bg-white/10 my-1" />
              <div className="flex flex-col gap-3">
                <Button
                  asChild
                  variant="outline"
                  className="w-full justify-center rounded-xl border-white/10 bg-white/5 text-gray-200 hover:bg-white/10 hover:text-white"
                >
                  <Link href="/dashboard/default">Sign In</Link>
                </Button>
                <Button
                  asChild
                  className="w-full justify-center rounded-xl bg-gradient-to-r from-violet-500 to-indigo-500 py-3 text-white"
                >
                  <Link href="/dashboard/default">
                    Get Started
                    <ArrowRight className="ml-1.5 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12 flex-grow flex items-center py-4 lg:py-0">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-8 w-full">
          
          {/* Hero Left Content */}
          <div className="flex flex-col items-start lg:col-span-5 z-10">
            {/* Soft Sparkle Tag */}
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-3.5 py-1 text-[11px] font-semibold text-violet-300 backdrop-blur-md">
              <Sparkles className="h-3 w-3" />
              <span>Version 2.0 Now Live</span>
            </div>

            {/* Typography Header */}
            <h1 className="mb-4 text-left font-bold tracking-tight text-white text-4xl sm:text-5xl lg:text-[54px] leading-[1.1]">
              Smart dashboard <br />
              <span className="bg-gradient-to-r from-violet-400 via-indigo-300 to-blue-400 bg-clip-text font-extrabold text-transparent">
                for modern life
              </span>
            </h1>

            {/* Paragraph Description */}
            <p className="mb-6 text-left text-gray-400 text-sm sm:text-base leading-relaxed max-w-md">
              Dashdeck is where you keep your credit, debit, and transit cards, boarding passes, tickets, and more — all in one place.
            </p>

            {/* CTA Button */}
            <Button
              asChild
              className="mb-8 h-12 rounded-xl bg-violet-400 px-6 text-sm font-semibold text-black hover:bg-violet-300 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] hover:shadow-[0_0_20px_rgba(167,139,250,0.3)]"
            >
              <Link href="/dashboard/default" className="flex items-center gap-2">
                Get started
                <ArrowRight className="h-4.5 w-4.5 stroke-[2.5]" />
              </Link>
            </Button>

            {/* Features Rows */}
            <div id="features" className="grid grid-cols-3 gap-4 w-full max-w-md">
              
              {/* Feature 1 */}
              <div className="flex flex-col items-start">
                <div className="mb-2.5 flex h-10 w-10 items-center justify-center rounded-lg bg-[#0f0e1c] border border-white/[0.08] text-violet-400 shadow-md">
                  <Lock className="h-4 w-4 stroke-[2]" />
                </div>
                <h3 className="font-semibold text-white text-[12px] leading-tight">Secure & Private</h3>
                <p className="mt-1 text-left text-[10px] leading-relaxed text-gray-400">
                  Your data is encrypted and always protected.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="flex flex-col items-start">
                <div className="mb-2.5 flex h-10 w-10 items-center justify-center rounded-lg bg-[#0f0e1c] border border-white/[0.08] text-violet-400 shadow-md">
                  <Zap className="h-4 w-4 stroke-[2]" />
                </div>
                <h3 className="font-semibold text-white text-[12px] leading-tight">Fast & Simple</h3>
                <p className="mt-1 text-left text-[10px] leading-relaxed text-gray-400">
                  Access everything instantly, anywhere.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="flex flex-col items-start">
                <div className="mb-2.5 flex h-10 w-10 items-center justify-center rounded-lg bg-[#0f0e1c] border border-white/[0.08] text-violet-400 shadow-md">
                  <CreditCard className="h-4 w-4 stroke-[2]" />
                </div>
                <h3 className="font-semibold text-white text-[12px] leading-tight">All in One Place</h3>
                <p className="mt-1 text-left text-[10px] leading-relaxed text-gray-400">
                  Cards, tickets, passes and more, organized.
                </p>
              </div>

            </div>

          </div>

          {/* Hero Right Dashboard Mockup Column */}
          <div id="dashboard-preview" className="relative lg:col-span-7 flex justify-center lg:justify-end">
            
            {/* Underlay glow behind the dashboard frame */}
            <div className="absolute inset-0 -m-6 rounded-[40px] bg-gradient-to-tr from-indigo-500/10 via-purple-500/5 to-transparent blur-2xl" />

            {/* Dashboard Frame Container */}
            <div className="relative w-full max-w-[570px] rounded-3xl border border-white/[0.06] bg-[#0c0c16]/80 p-5 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.7)]">
              
              <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
                
                {/* 1. Monthly Spend Card (cols: 3) */}
                <div className="rounded-xl border border-white/[0.05] bg-[#06060c] p-4 md:col-span-3 transition-all duration-300 hover:border-white/[0.1]">
                  <h4 className="mb-3 text-[10px] font-semibold tracking-wider text-gray-400 uppercase">Monthly spend</h4>
                  
                  <div className="flex items-center justify-between gap-2">
                    {/* SVG Donut Chart */}
                    <div className="relative h-24 w-24 flex-shrink-0">
                      <svg className="h-full w-full -rotate-90" viewBox="0 0 120 120">
                        {/* Background segment circle */}
                        <circle
                          cx="60"
                          cy="60"
                          r={donutRadius}
                          fill="transparent"
                          stroke="rgba(255,255,255,0.03)"
                          strokeWidth="11"
                        />

                        {/* Stacking actual segments */}
                        {computedDonutSegments.map((seg, idx) => {
                          const isHovered = hoveredDonutIdx === idx;
                          return (
                            <circle
                              key={seg.name}
                              cx="60"
                              cy="60"
                              r={donutRadius}
                              fill="transparent"
                              stroke={seg.color}
                              strokeWidth={isHovered ? 13 : 9}
                              strokeDasharray={seg.strokeDasharray}
                              strokeDashoffset={seg.strokeDashoffset}
                              strokeLinecap="round"
                              style={{ transition: "stroke-width 200ms ease-out" }}
                              className="cursor-pointer"
                              onMouseEnter={() => setHoveredDonutIdx(idx)}
                              onMouseLeave={() => setHoveredDonutIdx(null)}
                            />
                          );
                        })}
                      </svg>

                      {/* Donut Center Display */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <span className="text-sm font-bold text-white transition-all duration-200">
                          {hoveredDonutIdx !== null
                            ? `$${donutSegments[hoveredDonutIdx].value.toLocaleString()}`
                            : `$${totalSpend.toLocaleString()}`}
                        </span>
                        <span className="text-[8px] font-medium tracking-wide uppercase text-gray-500 mt-0.5">
                          {hoveredDonutIdx !== null ? donutSegments[hoveredDonutIdx].name : "Total"}
                        </span>
                      </div>
                    </div>

                    {/* Donut Legend */}
                    <div className="flex flex-col gap-1.5 flex-grow pl-1">
                      {donutSegments.map((seg, idx) => {
                        const isHovered = hoveredDonutIdx === idx;
                        return (
                          <div
                            key={seg.name}
                            className={`flex items-center justify-between text-[10px] rounded-md p-0.5 transition-all duration-150 cursor-pointer ${
                              isHovered ? "bg-white/[0.04] translate-x-0.5" : "hover:bg-white/[0.02]"
                            }`}
                            onMouseEnter={() => setHoveredDonutIdx(idx)}
                            onMouseLeave={() => setHoveredDonutIdx(null)}
                          >
                            <div className="flex items-center gap-1.5">
                              <span className={`h-1.5 w-1.5 rounded-full ${seg.dotColor}`} />
                              <span className="text-gray-400 font-medium">{seg.name}</span>
                            </div>
                            <span className="font-semibold text-white">${seg.value.toLocaleString()}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* 2. Spending Activity Card (cols: 2) */}
                <div className="rounded-xl border border-white/[0.05] bg-[#06060c] p-4 md:col-span-2 transition-all duration-300 hover:border-white/[0.1]">
                  <div className="mb-3 flex items-center justify-between">
                    <h4 className="text-[10px] font-semibold tracking-wider text-gray-400 uppercase">Spending activity</h4>
                    
                    {/* Timeframe selector dropdown mockup */}
                    <div className="flex items-center gap-1 rounded border border-white/[0.08] bg-white/[0.03] px-1.5 py-0.5 text-[8px] text-gray-400 cursor-pointer hover:bg-white/10 hover:text-white transition-colors duration-200">
                      <span>This week</span>
                      <ChevronDown className="h-2.5 w-2.5 opacity-60" />
                    </div>
                  </div>

                  {/* Activity Curved Line Chart */}
                  <div className="relative h-[72px] w-full mt-1">
                    <svg className="h-full w-full overflow-visible" viewBox="0 0 320 110" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="spending-line-gradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#a855f7" stopOpacity="0.2" />
                          <stop offset="100%" stopColor="#a855f7" stopOpacity="0.0" />
                        </linearGradient>
                        <linearGradient id="spending-stroke-gradient" x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0%" stopColor="#c084fc" />
                          <stop offset="50%" stopColor="#a855f7" />
                          <stop offset="100%" stopColor="#818cf8" />
                        </linearGradient>
                      </defs>

                      {/* Area Fill */}
                      <path d={activityAreaPath} fill="url(#spending-line-gradient)" />

                      {/* Stroke Line */}
                      <path
                        d={activityPath}
                        fill="none"
                        stroke="url(#spending-stroke-gradient)"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />

                      {/* Smooth Active Indicator Dot */}
                      <circle
                        cx={currentActivityPt.x}
                        cy={currentActivityPt.y}
                        r="5"
                        fill="#c084fc"
                        opacity="0.35"
                        style={{ transition: "cx 250ms ease-out, cy 250ms ease-out" }}
                      />
                      <circle
                        cx={currentActivityPt.x}
                        cy={currentActivityPt.y}
                        r="3.5"
                        fill="white"
                        stroke="#a855f7"
                        strokeWidth="2"
                        style={{ transition: "cx 250ms ease-out, cy 250ms ease-out" }}
                      />

                      {/* Interactive Hover Columns */}
                      {activityData.map((pt, idx) => {
                        return (
                          <rect
                            key={pt.label}
                            x={pt.x - 20}
                            y="0"
                            width="40"
                            height="110"
                            fill="transparent"
                            className="cursor-pointer"
                            onMouseEnter={() => setActiveActivityIdx(idx)}
                          />
                        );
                      })}
                    </svg>
                  </div>

                  {/* Day Labels */}
                  <div className="mt-2 flex justify-between px-1 text-[8px] font-bold tracking-wider text-gray-500">
                    {activityData.map((d, idx) => {
                      const isActive = activeActivityIdx === idx;
                      return (
                        <span
                          key={d.label}
                          onMouseEnter={() => setActiveActivityIdx(idx)}
                          className={`cursor-pointer transition-colors duration-150 ${
                            isActive ? "text-white scale-105 font-black" : "hover:text-gray-300"
                          }`}
                        >
                          {d.label}
                        </span>
                      );
                    })}
                  </div>
                </div>

                {/* 3. Weekly Overview Card (cols: 5) */}
                <div className="rounded-xl border border-white/[0.05] bg-[#06060c] p-4 md:col-span-5 transition-all duration-300 hover:border-white/[0.1]">
                  <div className="mb-4 flex items-center justify-between">
                    <h4 className="text-[10px] font-semibold tracking-wider text-gray-400 uppercase">Weekly overview</h4>
                    
                    {/* Timeframe selector dropdown mockup */}
                    <div className="flex items-center gap-1 rounded border border-white/[0.08] bg-white/[0.03] px-2 py-0.5 text-[8px] text-gray-400 cursor-pointer hover:bg-white/10 hover:text-white transition-colors duration-200">
                      <span>Aug 20 - Aug 26</span>
                      <ChevronDown className="h-2.5 w-2.5 opacity-60" />
                    </div>
                  </div>

                  {/* Overview Area Chart */}
                  <div className="relative h-[120px] w-full">
                    {/* SVG backplane */}
                    <svg className="h-full w-full overflow-visible" viewBox="0 0 480 160" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="overview-area-gradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#a855f7" stopOpacity="0.2" />
                          <stop offset="100%" stopColor="#a855f7" stopOpacity="0.0" />
                        </linearGradient>
                        <linearGradient id="overview-stroke-gradient" x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0%" stopColor="#818cf8" />
                          <stop offset="40%" stopColor="#c084fc" />
                          <stop offset="80%" stopColor="#e879f9" />
                          <stop offset="100%" stopColor="#60a5fa" />
                        </linearGradient>
                      </defs>

                      {/* Gridlines */}
                      {[20, 52.5, 85, 117.5, 150].map((yVal, i) => (
                        <line
                          key={i}
                          x1="35"
                          y1={yVal}
                          x2="450"
                          y2={yVal}
                          stroke="rgba(255, 255, 255, 0.03)"
                          strokeWidth="1"
                          strokeDasharray="2 2"
                        />
                      ))}

                      {/* Y-Axis Labels */}
                      <g className="text-[8px] font-bold fill-gray-600 font-sans" textAnchor="end">
                        <text x="25" y="23">8K</text>
                        <text x="25" y="55.5">6K</text>
                        <text x="25" y="88">4K</text>
                        <text x="25" y="120.5">2K</text>
                        <text x="25" y="153">0</text>
                      </g>

                      {/* Area Fill */}
                      <path d={overviewAreaPath} fill="url(#overview-area-gradient)" />

                      {/* Stroke Line */}
                      <path
                        d={overviewPath}
                        fill="none"
                        stroke="url(#overview-stroke-gradient)"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />

                      {/* Active vertical dotted line (smooth transition) */}
                      <line
                        x1={currentOverviewPt.x}
                        y1="150"
                        x2={currentOverviewPt.x}
                        y2={currentOverviewPt.y}
                        stroke="rgba(167, 139, 250, 0.45)"
                        strokeWidth="1"
                        strokeDasharray="3 3"
                        style={{ transition: "x1 250ms ease-out, x2 250ms ease-out, y2 250ms ease-out" }}
                      />

                      {/* Active glowing dot (smooth transition) */}
                      <circle
                        cx={currentOverviewPt.x}
                        cy={currentOverviewPt.y}
                        r="6"
                        fill="#a78bfa"
                        opacity="0.3"
                        style={{ transition: "cx 250ms ease-out, cy 250ms ease-out" }}
                      />
                      <circle
                        cx={currentOverviewPt.x}
                        cy={currentOverviewPt.y}
                        r="3.5"
                        fill="white"
                        stroke="#a78bfa"
                        strokeWidth="2"
                        style={{ transition: "cx 250ms ease-out, cy 250ms ease-out" }}
                      />

                      {/* Interactive Columns */}
                      {overviewData.map((pt, idx) => {
                        return (
                          <rect
                            key={pt.date}
                            x={pt.x - 25}
                            y="10"
                            width="50"
                            height="145"
                            fill="transparent"
                            className="cursor-pointer"
                            onMouseEnter={() => setActiveOverviewIdx(idx)}
                          />
                        );
                      })}
                    </svg>

                    {/* Active Tooltip Bubble (glides smoothly via absolute coordinates) */}
                    {activeOverviewIdx !== null && (
                      <div
                        className="absolute z-10 flex flex-col items-center bg-[#07070d] border border-white/10 rounded-lg px-2.5 py-1 shadow-[0_8px_20px_rgba(0,0,0,0.5)]"
                        style={{
                          left: `${(currentOverviewPt.x / 480) * 100}%`,
                          top: `${(currentOverviewPt.y / 160) * 100 - 36}%`,
                          transform: "translate(-50%, -50%)",
                          transition: "left 250ms cubic-bezier(0.2, 0.8, 0.2, 1), top 250ms cubic-bezier(0.2, 0.8, 0.2, 1)",
                        }}
                      >
                        <span className="text-[10px] font-bold text-white leading-tight">
                          ${currentOverviewPt.value.toLocaleString()}
                        </span>
                        <span className="text-[7.5px] font-medium text-gray-500 leading-none mt-0.5">
                          {currentOverviewPt.label}
                        </span>

                        {/* Tooltip caret */}
                        <div className="absolute bottom-[-3px] left-1/2 h-1.5 w-1.5 -translate-x-1/2 rotate-45 border-r border-b border-white/10 bg-[#07070d]" />
                      </div>
                    )}
                  </div>

                  {/* X-Axis Labels */}
                  <div className="mt-2.5 flex justify-between pl-[35px] pr-2.5 text-[8px] font-bold tracking-wider text-gray-500">
                    {overviewData.map((d, idx) => {
                      const isActive = activeOverviewIdx === idx;
                      return (
                        <span
                          key={d.date}
                          onMouseEnter={() => setActiveOverviewIdx(idx)}
                          className={`cursor-pointer transition-colors duration-150 ${
                            isActive ? "text-white scale-105 font-black" : "hover:text-gray-300"
                          }`}
                        >
                          {d.date}
                        </span>
                      );
                    })}
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.05] bg-[#020205] py-3 text-center text-xs text-gray-500 flex-shrink-0">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 sm:flex-row sm:px-8 lg:px-12">
          <div className="flex items-center gap-2">
            <div className="relative flex h-5 w-5 items-center justify-center overflow-hidden rounded bg-white/5 border border-white/10 p-0.5 shadow">
              <img
                src="/Dashdeck-logo.png"
                alt="Dashdeck Logo"
                className="h-full w-full object-contain"
              />
            </div>
            <span className="font-semibold text-white tracking-wide text-xs">Dashdeck</span>
          </div>

          <div className="flex gap-6 text-[11px] text-gray-400">
            <Link href="#features" className="hover:text-white transition-colors duration-200">
              Features
            </Link>
            <Link href="#dashboard-preview" className="hover:text-white transition-colors duration-200">
              Preview
            </Link>
            <a
              href="https://github.com/Santosh-Prasad-Verma/Dashdeck"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors duration-200"
            >
              GitHub
            </a>
            <a
              href="https://x.com/TarunVerma_121"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors duration-200"
            >
              X (Twitter)
            </a>
          </div>

          <div className="text-[10px] text-gray-600">
            &copy; {new Date().getFullYear()} Dashdeck. MIT License.
          </div>
        </div>
      </footer>
    </div>
  );
}

