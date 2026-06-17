"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { PlayCircle, Star, Sparkles } from "lucide-react";
import { GradientText } from "./shared/gradient-text";

const notifications = [
  { text: "✓ Subscription renewed", delay: 1000 },
  { text: "✓ AI insight generated", delay: 4000 },
  { text: "✓ Password secured", delay: 7000 },
];

function FloatingNotifications() {
  const [visible, setVisible] = useState<number | null>(null);

  useEffect(() => {
    let cycle = 0;
    const show = () => {
      const idx = cycle % notifications.length;
      setVisible(idx);
      setTimeout(() => setVisible(null), 2500);
      cycle++;
    };
    const timer = setInterval(show, 3500);
    const initial = setTimeout(show, 2000);
    return () => {
      clearInterval(timer);
      clearTimeout(initial);
    };
  }, []);

  const positions = [
    "top-4 -right-4",
    "top-1/3 -left-6",
    "bottom-8 -right-2",
  ];

  return (
    <AnimatePresence>
      {visible !== null && (
        <motion.div
          key={visible}
          initial={{ opacity: 0, x: 20, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 20, scale: 0.9 }}
          transition={{ duration: 0.4 }}
          className={`absolute ${positions[visible]} z-20 bg-[#0A0A1A]/90 border border-white/[0.08] rounded-full px-4 py-2 text-xs text-gray-300 whitespace-nowrap shadow-lg shadow-black/20`}
        >
          {notifications[visible].text}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

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
              <Sparkles className="size-3.5" />
              New AI Dashboard Experience
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.08] text-white mt-8"
          >
            Build your digital life
            <br />
            from one <GradientText>beautiful dashboard</GradientText>
          </motion.h1>

          {/* Subheadline */}
          <motion.p variants={fadeUp} className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-lg mt-6">
            Manage finances, subscriptions, passwords, documents, tickets, tasks, and analytics — from a single intelligent workspace.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-4 mt-10">
            <Link
              href="/dashboard/default"
              className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-semibold px-8 py-3.5 rounded-xl text-base transition-all duration-300 hover:shadow-xl hover:shadow-[#8B5CF6]/25 hover:scale-[1.02] active:scale-[0.98]"
            >
              Get Started Free
            </Link>
            <button className="flex items-center gap-2 border border-white/10 text-gray-300 hover:text-white hover:border-white/20 font-medium px-8 py-3.5 rounded-xl text-base transition-all duration-300 hover:bg-white/[0.03]">
              <PlayCircle className="size-5" />
              Watch Demo
            </button>
          </motion.div>

          {/* Trust */}
          <motion.div variants={fadeUp} className="flex items-center gap-4 mt-10">
            <div className="flex -space-x-2.5">
              {["#8B5CF6", "#6366F1", "#06B6D4", "#8B5CF6", "#6366F1"].map((color, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-[#050505] flex items-center justify-center text-[10px] font-semibold text-white"
                  style={{ background: `linear-gradient(135deg, ${color}, ${color}dd)` }}
                >
                  {["T", "A", "S", "R", "M"][i]}
                </div>
              ))}
            </div>
            <div className="text-sm text-gray-500">
              Used by <span className="text-gray-300 font-medium">25,000+</span> professionals
            </div>
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="size-3.5 fill-[#8B5CF6] text-[#8B5CF6]" />
              ))}
            </div>
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
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
            style={{ transform: "perspective(1200px) rotateY(-6deg) rotateX(3deg)" }}
          >
            <FloatingNotifications />

            <div className="flex flex-col gap-4">
              {/* Analytics Card */}
              <div className="bg-[#0A0A1A]/80 border border-white/[0.06] rounded-2xl p-5 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-gray-300">Weekly Overview</span>
                  <span className="text-[10px] font-medium text-[#8B5CF6] bg-[#8B5CF6]/10 px-2 py-0.5 rounded-full">Live</span>
                </div>
                <svg viewBox="0 0 280 60" className="w-full h-16">
                  <defs>
                    <linearGradient id="heroChartFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d="M0,45 Q35,40 70,30 T140,35 T210,18 T280,22 V60 H0 Z" fill="url(#heroChartFill)" />
                  <polyline
                    points="0,45 35,38 70,30 105,35 140,28 175,20 210,18 245,24 280,22"
                    fill="none"
                    stroke="#8B5CF6"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-xl font-bold text-white">$12,450</span>
                  <span className="text-xs font-medium text-emerald-400">+12.5%</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Tasks Card */}
                <div className="bg-[#0A0A1A]/80 border border-white/[0.06] rounded-2xl p-5 backdrop-blur-sm">
                  <span className="text-sm font-medium text-gray-300">Active Tasks</span>
                  <div className="mt-3 flex flex-col gap-2">
                    {["Design review", "API integration", "Bug fixes"].map((task, i) => (
                      <div key={task} className="flex items-center gap-2 text-xs">
                        <div className={`w-3 h-3 rounded border ${i === 0 ? "bg-[#8B5CF6] border-[#8B5CF6]" : "border-white/20"} flex items-center justify-center`}>
                          {i === 0 && <span className="text-white text-[8px]">✓</span>}
                        </div>
                        <span className={i === 0 ? "text-gray-500 line-through" : "text-gray-300"}>{task}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3">
                    <div className="w-full h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                      <div className="w-[68%] h-full bg-gradient-to-r from-[#8B5CF6] to-[#6366F1] rounded-full" />
                    </div>
                    <span className="text-[10px] text-gray-500 mt-1 block">68% completed</span>
                  </div>
                </div>

                {/* AI Insights Card */}
                <div className="bg-[#0A0A1A]/80 border border-white/[0.06] rounded-2xl p-5 backdrop-blur-sm">
                  <div className="flex items-center gap-1.5 mb-3">
                    <Sparkles className="size-3.5 text-[#06B6D4]" />
                    <span className="text-sm font-medium text-gray-300">AI Insights</span>
                  </div>
                  <div className="flex flex-col gap-2.5">
                    <p className="text-[11px] text-gray-400 leading-relaxed">Revenue trending 12% above forecast</p>
                    <p className="text-[11px] text-gray-400 leading-relaxed">3 subscriptions expiring this week</p>
                  </div>
                  <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-white/[0.04]">
                    <div className="w-4 h-4 rounded-full bg-gradient-to-br from-[#06B6D4] to-[#6366F1]" />
                    <span className="text-[10px] text-gray-500">Generated 2m ago</span>
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
