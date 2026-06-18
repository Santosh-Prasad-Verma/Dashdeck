"use client";

import { useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "What is Dashdeck?",
    a: "Dashdeck is an all-in-one personal dashboard that helps you manage finances, passwords, documents, tasks, and subscriptions from a single intelligent workspace.",
  },
  {
    q: "Is my data secure?",
    a: "Absolutely. We use end-to-end encryption with a zero-knowledge architecture. Your data is encrypted before it leaves your device, and we never have access to your decryption keys.",
  },
  {
    q: "Is Dashdeck free to use?",
    a: "Dashdeck offers a generous free tier with core features. Premium plans with advanced AI features, unlimited storage, and priority support are coming soon.",
  },
  {
    q: "What platforms does Dashdeck support?",
    a: "Dashdeck works as a web application accessible from any modern browser. Native iOS and Android apps are on our roadmap for 2025.",
  },
  {
    q: "Can I import data from other apps?",
    a: "Yes! Dashdeck supports importing from popular tools like Notion, Google Sheets, 1Password, and many more. Our integration library is constantly growing.",
  },
  {
    q: "How is this different from Notion or Linear?",
    a: "While Notion focuses on documents and Linear on project management, Dashdeck is specifically designed as a personal command center — combining finances, security, productivity, and AI insights in one unified experience.",
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
    <section className="max-w-7xl mx-auto px-6 lg:px-8 py-24 md:py-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white">Frequently asked questions</h2>
        <p className="text-gray-500 text-lg mt-4">Everything you need to know about Dashdeck</p>
      </motion.div>

      <div className="max-w-2xl mx-auto mt-16">
        {faqs.map((faq, i) => {
          const isOpen = openItems.has(i);
          return (
            <motion.div
              key={faq.q}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="border-b border-white/[0.06]"
            >
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between py-5 text-left group"
              >
                <span className="text-white font-medium text-base group-hover:text-gray-200 transition-colors pr-4">
                  {faq.q}
                </span>
                <ChevronDown
                  className={`size-4 text-gray-500 flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
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
                    <p className="text-gray-400 text-sm leading-relaxed pb-5 pt-1">{faq.a}</p>
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
