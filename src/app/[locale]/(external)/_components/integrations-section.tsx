"use client";

import { motion } from "framer-motion";

const row1 = ["Google", "Notion", "Slack", "GitHub", "Stripe", "Discord", "Dropbox", "Figma"];
const row2 = ["Linear", "Vercel", "Raycast", "Supabase", "Prisma", "Tailwind", "VS Code", "Docker"];

function MarqueeRow({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div
      className="flex gap-4 group"
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
          className="bg-white/[0.03] border border-white/[0.06] rounded-xl px-6 py-3 text-gray-400 text-sm font-medium whitespace-nowrap hover:text-white hover:border-white/[0.12] transition-colors duration-300 cursor-default"
        >
          {item}
        </div>
      ))}
    </div>
  );
}

export function IntegrationsSection() {
  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-8 py-24 md:py-32 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white">Works with your favorite tools</h2>
        <p className="text-gray-500 text-lg mt-4">Connect Dashdeck with the tools you already use</p>
      </motion.div>

      <div className="flex flex-col gap-4 overflow-hidden relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />

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
