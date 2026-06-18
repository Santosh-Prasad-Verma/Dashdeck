"use client";

import { motion } from "framer-motion";
import { ArrowDown, Check } from "lucide-react";

import { GradientText } from "./shared/gradient-text";

const scatteredItems = [
  { emoji: "🔑", label: "Passwords", rotate: "-3deg" },
  { emoji: "💳", label: "Cards", rotate: "2deg" },
  { emoji: "🎫", label: "Tickets", rotate: "-2deg" },
  { emoji: "📄", label: "Documents", rotate: "3deg" },
  { emoji: "📊", label: "Subscriptions", rotate: "-1deg" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

export function ProblemSolution() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 md:py-32 lg:px-8">
      {/* Problem */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ staggerChildren: 0.08 }}
        className="text-center"
      >
        <motion.h2
          variants={fadeUp}
          transition={{ duration: 0.6 }}
          className="font-bold text-3xl text-white md:text-4xl"
        >
          Your digital life is <span className="text-gray-500">scattered</span>
        </motion.h2>
        <motion.p
          variants={fadeUp}
          transition={{ duration: 0.6 }}
          className="mx-auto mt-4 max-w-2xl text-gray-500 text-lg"
        >
          Passwords in one app. Finances in another. Tasks somewhere else. Documents everywhere.
        </motion.p>

        {/* Scattered Cards */}
        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.6 }}
          className="mt-12 flex flex-wrap justify-center gap-4"
        >
          {scatteredItems.map((item) => (
            <div
              key={item.label}
              className="rounded-xl border border-white/[0.06] bg-white/[0.03] px-5 py-4 text-center"
              style={{ transform: `rotate(${item.rotate})` }}
            >
              <div className="mb-1.5 text-2xl">{item.emoji}</div>
              <div className="font-medium text-gray-400 text-sm">{item.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Transition Arrow */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="my-16 flex justify-center"
      >
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
          <ArrowDown className="size-6 text-gray-600" />
        </motion.div>
      </motion.div>

      {/* Solution */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ staggerChildren: 0.08 }}
        className="text-center"
      >
        <motion.h2
          variants={fadeUp}
          transition={{ duration: 0.6 }}
          className="font-bold text-3xl text-white md:text-4xl"
        >
          Dashdeck brings everything <GradientText>together</GradientText>
        </motion.h2>
        <motion.p
          variants={fadeUp}
          transition={{ duration: 0.6 }}
          className="mx-auto mt-4 max-w-2xl text-gray-500 text-lg"
        >
          One beautiful workspace for your entire digital life. Intelligent, secure, and always in sync.
        </motion.p>

        {/* Unified Card */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] as const }}
          className="mx-auto mt-12 max-w-2xl rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 shadow-[#8B5CF6]/[0.04] shadow-lg"
        >
          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            {scatteredItems.map((item) => (
              <div key={item.label} className="flex flex-col items-center gap-2">
                <div className="relative">
                  <div className="text-2xl">{item.emoji}</div>
                  <Check className="absolute -right-1 -bottom-1 size-3.5 rounded-full bg-[#050505] p-0.5 text-[#8B5CF6]" />
                </div>
                <span className="font-medium text-gray-300 text-sm">{item.label}</span>
              </div>
            ))}
          </div>
          <div className="my-6 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
          <p className="text-gray-500 text-sm">All unified in one intelligent workspace</p>
        </motion.div>
      </motion.div>
    </section>
  );
}
