"use client";

import { motion } from "framer-motion";
import { AnimatedCounter } from "./shared/animated-counter";

const stats = [
  { value: 50, suffix: "K+", label: "Active Users" },
  { value: 99.99, suffix: "%", label: "Uptime", decimals: 2 },
  { value: 10, suffix: "M+", label: "Transactions Managed" },
  { value: 150, suffix: "+", label: "Integrations" },
];

export function StatisticsSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      className="max-w-5xl mx-auto px-6 lg:px-8 py-24 md:py-32"
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-white">
              <AnimatedCounter
                value={stat.value}
                suffix=""
                decimals={stat.decimals || 0}
              />
              <span className="text-[#8B5CF6]">{stat.suffix}</span>
            </div>
            <p className="text-gray-500 text-sm mt-2">{stat.label}</p>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
