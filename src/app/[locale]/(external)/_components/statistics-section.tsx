"use client";

import { motion } from "framer-motion";

import { AnimatedCounter } from "./shared/animated-counter";

interface StatItem {
  value: number;
  suffix: string;
  label: string;
  decimals?: number;
}

const stats: StatItem[] = [
  { value: 15, suffix: "+", label: "Dashboard Presets" },
  { value: 100, suffix: "%", label: "Responsive Container Grids" },
  { value: 3, suffix: "", label: "Built-in Languages" },
  { value: 0, suffix: "", label: "Server Setup Required" },
];

export function StatisticsSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      className="mx-auto max-w-5xl px-6 py-24 md:py-32 lg:px-8"
    >
      <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="font-bold text-4xl text-white md:text-5xl">
              <AnimatedCounter value={stat.value} suffix="" decimals={stat.decimals || 0} />
              <span className="text-[#8B5CF6]">{stat.suffix}</span>
            </div>
            <p className="mt-2 text-gray-500 text-sm">{stat.label}</p>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
