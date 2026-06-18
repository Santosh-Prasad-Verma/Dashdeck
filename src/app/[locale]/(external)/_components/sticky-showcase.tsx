"use client";

import { useEffect, useRef, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { Check, Shield, Sparkles } from "lucide-react";

const features = [
  {
    label: "FINANCES",
    labelColor: "#8B5CF6",
    title: "Track every dollar",
    description:
      "Monitor expenses, manage subscriptions, and get AI-powered financial insights. See your complete financial picture in one view.",
    bullets: ["Expense categorization", "Subscription tracking", "Budget forecasting"],
  },
  {
    label: "PRODUCTIVITY",
    labelColor: "#6366F1",
    title: "Stay on top of everything",
    description:
      "Kanban boards, smart reminders, and AI-prioritized task lists. Never let anything slip through the cracks.",
    bullets: ["Kanban & list views", "Smart prioritization", "Calendar integration"],
  },
  {
    label: "SECURITY",
    labelColor: "#06B6D4",
    title: "Your data, encrypted",
    description:
      "Zero-knowledge encryption, biometric auth, and secure document storage. We can't read your data — and neither can anyone else.",
    bullets: ["Zero-knowledge architecture", "Biometric unlock", "Encrypted file storage"],
  },
];

function FinanceCard() {
  return (
    <div className="bg-[#0A0A1A]/80 border border-white/[0.06] rounded-2xl p-6 backdrop-blur-sm">
      <span className="text-sm font-medium text-gray-300">Monthly Overview</span>
      <div className="flex items-end gap-3 mt-4">
        <span className="text-3xl font-bold text-white">$8,420</span>
        <span className="text-xs font-medium text-emerald-400 mb-1">+12.5%</span>
      </div>
      <div className="flex items-end gap-2 mt-6 h-20">
        {[45, 62, 38, 75, 55, 80].map((h, i) => (
          <div key={i} className="flex-1 flex flex-col justify-end">
            <div
              className="w-full rounded-t-md bg-gradient-to-t from-[#8B5CF6] to-[#8B5CF6]/60"
              style={{ height: `${h}%` }}
            />
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-4 text-xs text-gray-500">
        <span>Subscriptions: $342/mo</span>
        <span>Savings: $2,100</span>
      </div>
    </div>
  );
}

function TasksCard() {
  const tasks = [
    { text: "Review Q4 budget report", done: true },
    { text: "Update API documentation", done: true },
    { text: "Design system audit", done: false },
    { text: "Deploy staging release", done: false },
  ];
  return (
    <div className="bg-[#0A0A1A]/80 border border-white/[0.06] rounded-2xl p-6 backdrop-blur-sm">
      <span className="text-sm font-medium text-gray-300">This Week</span>
      <div className="mt-4 flex flex-col gap-3">
        {tasks.map((t) => (
          <div key={t.text} className="flex items-center gap-3 text-sm">
            <div
              className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 ${t.done ? "bg-[#6366F1] border-[#6366F1]" : "border-white/20"}`}
            >
              {t.done && <Check className="size-2.5 text-white" />}
            </div>
            <span className={t.done ? "text-gray-500 line-through" : "text-gray-300"}>{t.text}</span>
          </div>
        ))}
      </div>
      <div className="mt-5 flex items-center gap-3">
        <svg viewBox="0 0 36 36" className="size-10">
          <path
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="3"
          />
          <path
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="#6366F1"
            strokeWidth="3"
            strokeDasharray="68, 100"
            strokeLinecap="round"
          />
        </svg>
        <div>
          <span className="text-white text-sm font-medium">68%</span>
          <span className="text-gray-500 text-xs block">12 tasks completed</span>
        </div>
      </div>
    </div>
  );
}

function SecurityCard() {
  return (
    <div className="bg-[#0A0A1A]/80 border border-white/[0.06] rounded-2xl p-6 backdrop-blur-sm">
      <span className="text-sm font-medium text-gray-300">Vault Status</span>
      <div className="flex items-center gap-3 mt-4">
        <div className="w-10 h-10 rounded-xl bg-[#06B6D4]/10 flex items-center justify-center">
          <Shield className="size-5 text-[#06B6D4]" />
        </div>
        <span className="text-xs font-medium text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-full">
          Protected
        </span>
      </div>
      <div className="mt-5 flex flex-col gap-3">
        {["24 passwords stored", "6 secure documents", "2FA enabled on 8 accounts"].map((item) => (
          <div key={item} className="flex items-center gap-2.5 text-sm text-gray-400">
            <div className="w-1.5 h-1.5 rounded-full bg-[#06B6D4] flex-shrink-0" />
            {item}
          </div>
        ))}
      </div>
      <div className="mt-5 pt-4 border-t border-white/[0.04] flex items-center gap-1.5">
        <Sparkles className="size-3 text-gray-600" />
        <span className="text-xs text-gray-600">Last audit: 2 hours ago</span>
      </div>
    </div>
  );
}

const cards = [FinanceCard, TasksCard, SecurityCard];

export function StickyShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    featureRefs.current.forEach((ref, idx) => {
      if (!ref) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveIndex(idx);
        },
        { threshold: 0.5, rootMargin: "-20% 0px -20% 0px" },
      );
      observer.observe(ref);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const ActiveCard = cards[activeIndex];

  return (
    <section ref={sectionRef} className="max-w-7xl mx-auto px-6 lg:px-8 py-24 md:py-32">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-bold text-white text-center mb-20"
      >
        See it in action
      </motion.h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Left — Feature Descriptions */}
        <div className="flex flex-col">
          {features.map((feature, idx) => (
            <div
              key={feature.title}
              ref={(el) => {
                featureRefs.current[idx] = el;
              }}
              className="min-h-[50vh] flex flex-col justify-center py-8"
            >
              <span
                className="text-xs font-semibold tracking-widest uppercase"
                style={{ color: activeIndex === idx ? feature.labelColor : "rgba(255,255,255,0.2)" }}
              >
                {feature.label}
              </span>
              <h3
                className={`text-2xl font-bold mt-2 transition-colors duration-500 ${activeIndex === idx ? "text-white" : "text-gray-700"}`}
              >
                {feature.title}
              </h3>
              <p
                className={`mt-4 leading-relaxed transition-colors duration-500 ${activeIndex === idx ? "text-gray-400" : "text-gray-700"}`}
              >
                {feature.description}
              </p>
              <div className="mt-5 flex flex-col gap-2.5">
                {feature.bullets.map((bullet) => (
                  <div
                    key={bullet}
                    className={`flex items-center gap-2.5 text-sm transition-colors duration-500 ${activeIndex === idx ? "text-gray-400" : "text-gray-700"}`}
                  >
                    <Check
                      className="size-4 flex-shrink-0"
                      style={{ color: activeIndex === idx ? feature.labelColor : "rgba(255,255,255,0.15)" }}
                    />
                    {bullet}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Right — Sticky Dashboard */}
        <div className="hidden lg:block">
          <div className="sticky top-32">
            {/* Glow */}
            <div className="absolute bg-[#8B5CF6]/[0.05] w-[400px] h-[400px] rounded-full blur-[100px] -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
              >
                <ActiveCard />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
