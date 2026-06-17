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
    <section className="max-w-7xl mx-auto px-6 lg:px-8 py-24 md:py-32">
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
          className="text-3xl md:text-4xl font-bold text-white"
        >
          Your digital life is <span className="text-gray-500">scattered</span>
        </motion.h2>
        <motion.p
          variants={fadeUp}
          transition={{ duration: 0.6 }}
          className="text-gray-500 text-lg max-w-2xl mx-auto mt-4"
        >
          Passwords in one app. Finances in another. Tasks somewhere else. Documents everywhere.
        </motion.p>

        {/* Scattered Cards */}
        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center gap-4 mt-12"
        >
          {scatteredItems.map((item) => (
            <div
              key={item.label}
              className="bg-white/[0.03] border border-white/[0.06] rounded-xl px-5 py-4 text-center"
              style={{ transform: `rotate(${item.rotate})` }}
            >
              <div className="text-2xl mb-1.5">{item.emoji}</div>
              <div className="text-gray-400 text-sm font-medium">{item.label}</div>
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
        className="flex justify-center my-16"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
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
          className="text-3xl md:text-4xl font-bold text-white"
        >
          Dashdeck brings everything <GradientText>together</GradientText>
        </motion.h2>
        <motion.p
          variants={fadeUp}
          transition={{ duration: 0.6 }}
          className="text-gray-500 text-lg max-w-2xl mx-auto mt-4"
        >
          One beautiful workspace for your entire digital life. Intelligent, secure, and always in sync.
        </motion.p>

        {/* Unified Card */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] as const }}
          className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-8 max-w-2xl mx-auto mt-12 shadow-lg shadow-[#8B5CF6]/[0.04]"
        >
          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            {scatteredItems.map((item) => (
              <div key={item.label} className="flex flex-col items-center gap-2">
                <div className="relative">
                  <div className="text-2xl">{item.emoji}</div>
                  <Check className="absolute -bottom-1 -right-1 size-3.5 text-[#8B5CF6] bg-[#050505] rounded-full p-0.5" />
                </div>
                <span className="text-gray-300 text-sm font-medium">{item.label}</span>
              </div>
            ))}
          </div>
          <div className="h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent my-6" />
          <p className="text-gray-500 text-sm">All unified in one intelligent workspace</p>
        </motion.div>
      </motion.div>
    </section>
  );
}
