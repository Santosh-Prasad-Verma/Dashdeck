"use client";

import { motion } from "framer-motion";
import { GradientText } from "./shared/gradient-text";

const audiences = [
  { emoji: "🎓", title: "Students", description: "Organize coursework and finances" },
  { emoji: "💻", title: "Freelancers", description: "Track invoices and projects" },
  { emoji: "👨‍💻", title: "Developers", description: "Monitor APIs and deployments" },
  { emoji: "🎨", title: "Creators", description: "Manage content and revenue" },
  { emoji: "💼", title: "Professionals", description: "Streamline your workflow" },
];

const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.21, 0.47, 0.32, 0.98] as const },
  }),
};

export function BuiltForSection() {
  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-8 py-24 md:py-32">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-bold text-white text-center"
      >
        Built for people who <GradientText>build</GradientText>
      </motion.h2>

      <div className="flex gap-4 mt-16 overflow-x-auto pb-4 md:grid md:grid-cols-5 md:overflow-visible scrollbar-hide">
        {audiences.map((a, i) => (
          <motion.div
            key={a.title}
            custom={i}
            variants={cardVariant}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 text-center min-w-[180px] flex-shrink-0 group hover:bg-white/[0.04] hover:border-[#8B5CF6]/20 transition-all duration-300"
          >
            <div className="text-3xl mb-4">{a.emoji}</div>
            <h3 className="text-white font-medium text-sm">{a.title}</h3>
            <p className="text-gray-500 text-xs mt-2">{a.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
