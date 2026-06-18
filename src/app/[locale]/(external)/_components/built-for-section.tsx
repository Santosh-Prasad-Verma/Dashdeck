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
    <section className="mx-auto max-w-7xl px-6 py-24 md:py-32 lg:px-8">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center font-bold text-3xl text-white md:text-4xl"
      >
        Built for people who <GradientText>build</GradientText>
      </motion.h2>

      <div className="scrollbar-hide mt-16 flex gap-4 overflow-x-auto pb-4 md:grid md:grid-cols-5 md:overflow-visible">
        {audiences.map((a, i) => (
          <motion.div
            key={a.title}
            custom={i}
            variants={cardVariant}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="group min-w-[180px] flex-shrink-0 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 text-center transition-all duration-300 hover:border-[#8B5CF6]/20 hover:bg-white/[0.04]"
          >
            <div className="mb-4 text-3xl">{a.emoji}</div>
            <h3 className="font-medium text-sm text-white">{a.title}</h3>
            <p className="mt-2 text-gray-500 text-xs">{a.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
