"use client";

import { motion } from "framer-motion";
import { Brain, Shield, Wallet } from "lucide-react";

const features = [
  {
    icon: Brain,
    color: "#8B5CF6",
    title: "AI Workspace",
    description: "Smart suggestions, automated workflows, and AI-powered insights that learn from your habits.",
    items: ["Intelligent task prioritization", "Auto-categorize expenses", "Smart document search"],
  },
  {
    icon: Wallet,
    color: "#6366F1",
    title: "Smart Wallet",
    description: "Track expenses, manage subscriptions, monitor investments, and never miss a payment.",
    items: ["Real-time balance tracking", "Subscription management", "Investment portfolio overview"],
  },
  {
    icon: Shield,
    color: "#06B6D4",
    title: "Secure Vault",
    description: "Military-grade encryption for passwords, documents, and sensitive data. Zero-knowledge architecture.",
    items: ["End-to-end encryption", "Biometric authentication", "Secure document storage"],
  },
];

const cardVariant = {
  hidden: { opacity: 0, y: 30 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: [0.21, 0.47, 0.32, 0.98] as const },
  }),
};

export function FeaturesSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 md:py-32 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h2 className="font-bold text-3xl text-white md:text-4xl">Everything you need</h2>
        <p className="mx-auto mt-4 max-w-xl text-gray-500 text-lg">
          Powerful features to manage your entire digital life
        </p>
      </motion.div>

      <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
        {features.map((feature, i) => (
          <motion.div
            key={feature.title}
            custom={i}
            variants={cardVariant}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="group cursor-default rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 transition-all duration-500 hover:border-[#8B5CF6]/20 hover:bg-white/[0.04] hover:shadow-[#8B5CF6]/[0.04] hover:shadow-xl"
          >
            <div
              className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
              style={{ backgroundColor: `${feature.color}15` }}
            >
              <feature.icon className="size-5" style={{ color: feature.color }} />
            </div>

            <h3 className="mb-3 font-semibold text-white text-xl">{feature.title}</h3>
            <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>

            <div className="mt-5 flex flex-col gap-3">
              {feature.items.map((item) => (
                <div key={item} className="flex items-center gap-2.5 text-gray-400 text-sm">
                  <div className="h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ backgroundColor: feature.color }} />
                  {item}
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
