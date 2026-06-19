"use client";

import { useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "What is Dashdeck?",
    a: "Dashdeck is an open-source admin dashboard preset library featuring 15+ interactive dashboards like CRM, DevOps, Finance, Healthcare, and Academy. It acts as a reference architecture and a UI starter kit for building production-ready dashboards.",
  },
  {
    q: "Is Dashdeck free to use?",
    a: "Yes! Dashdeck is 100% free and open-source. There are no registration walls, payment setup, or premium subscriptions. You can access all templates instantly and adapt the code for your own projects.",
  },
  {
    q: "What is the tech stack used?",
    a: "Dashdeck is built using Next.js 16 (App Router), React 19, Tailwind CSS v4, shadcn/ui, Framer Motion for micro-interactions, Recharts for data visualization, and next-intl for localization support (English, Spanish, Hindi).",
  },
  {
    q: "How does the sidebar resizing layout work?",
    a: "Instead of relying on browser window-resize handlers (which cause layout jank when toggling the sidebar), Dashdeck establishes a CSS container query context (@container) on the main workspace. This allows child widgets to respond instantly to the workspace's exact width.",
  },
  {
    q: "Can I connect this to a database?",
    a: "Absolutely. While Dashdeck uses structured local mock data and client-side state management (via Zustand) to run out-of-the-box, the components are modular. You can easily plug in any backend API, PostgreSQL, or Supabase service.",
  },
  {
    q: "Are the presets ready for production?",
    a: "Yes. All presets are optimized for Next.js App Router, run with Turbopack, and are linted using Biome. The components conform to standard accessibility guidelines and follow modern utility styling conventions.",
  },
];

export function FaqSection() {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  const toggle = (index: number) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  return (
    <section className="mx-auto max-w-7xl px-6 py-24 md:py-32 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h2 className="font-bold text-3xl text-white md:text-4xl">Frequently asked questions</h2>
        <p className="mt-4 text-gray-500 text-lg">Everything you need to know about Dashdeck</p>
      </motion.div>

      <div className="mx-auto mt-16 max-w-2xl">
        {faqs.map((faq, i) => {
          const isOpen = openItems.has(i);
          return (
            <motion.div
              key={faq.q}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="border-white/[0.06] border-b"
            >
              <button
                onClick={() => toggle(i)}
                className="group flex w-full items-center justify-between py-5 text-left"
              >
                <span className="pr-4 font-medium text-base text-white transition-colors group-hover:text-gray-200">
                  {faq.q}
                </span>
                <ChevronDown
                  className={`size-4 flex-shrink-0 text-gray-500 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                />
              </button>
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="pt-1 pb-5 text-gray-400 text-sm leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
