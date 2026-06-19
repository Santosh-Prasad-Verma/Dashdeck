"use client";

import { motion } from "framer-motion";

const row1 = [
  "Next.js 16",
  "React 19",
  "Tailwind CSS v4",
  "shadcn/ui",
  "Lucide React",
  "Framer Motion",
  "TypeScript",
  "Biome",
];
const row2 = ["Recharts", "Next-Intl", "Radix UI", "Zustand", "Clerk Auth", "Vercel", "PNPM", "ESLint"];

function MarqueeRow({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div
      className="group flex gap-4"
      style={{
        width: "max-content",
        animation: `marquee ${reverse ? "35s" : "30s"} linear infinite ${reverse ? "reverse" : "normal"}`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.animationPlayState = "paused";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.animationPlayState = "running";
      }}
    >
      {doubled.map((item, i) => (
        <div
          key={`${item}-${i}`}
          className="cursor-default whitespace-nowrap rounded-xl border border-white/[0.06] bg-white/[0.03] px-6 py-3 font-medium text-gray-400 text-sm transition-colors duration-300 hover:border-white/[0.12] hover:text-white"
        >
          {item}
        </div>
      ))}
    </div>
  );
}

export function IntegrationsSection() {
  return (
    <section className="mx-auto max-w-7xl overflow-hidden px-6 py-24 md:py-32 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-12 text-center"
      >
        <h2 className="font-bold text-3xl text-white md:text-4xl">Built with modern developer stacks</h2>
        <p className="mt-4 text-gray-500 text-lg">
          Dashdeck leverages industry-standard tools and libraries for maximum speed and simplicity
        </p>
      </motion.div>

      <div className="relative flex flex-col gap-4 overflow-hidden">
        {/* Fade edges */}
        <div className="pointer-events-none absolute top-0 bottom-0 left-0 z-10 w-20 bg-gradient-to-r from-[#050505] to-transparent" />
        <div className="pointer-events-none absolute top-0 right-0 bottom-0 z-10 w-20 bg-gradient-to-l from-[#050505] to-transparent" />

        <MarqueeRow items={row1} />
        <MarqueeRow items={row2} reverse />
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
