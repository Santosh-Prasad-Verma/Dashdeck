"use client";

import { motion } from "framer-motion";
import { Brain, Wallet, Shield } from "lucide-react";

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
    <section className="max-w-7xl mx-auto px-6 lg:px-8 py-24 md:py-32">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white">Everything you need</h2>
        <p className="text-gray-500 text-lg mt-4 max-w-xl mx-auto">
          Powerful features to manage your entire digital life
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
        {features.map((feature, i) => (
          <motion.div
            key={feature.title}
            custom={i}
            variants={cardVariant}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="group bg-white/[0.02] border border-white/[0.06] rounded-2xl p-8 hover:bg-white/[0.04] hover:border-[#8B5CF6]/20 transition-all duration-500 cursor-default hover:shadow-xl hover:shadow-[#8B5CF6]/[0.04]"
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
              style={{ backgroundColor: `${feature.color}15` }}
            >
              <feature.icon className="size-5" style={{ color: feature.color }} />
            </div>

            <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
            <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>

            <div className="mt-5 flex flex-col gap-3">
              {feature.items.map((item) => (
                <div key={item} className="flex items-center gap-2.5 text-sm text-gray-400">
                  <div
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: feature.color }}
                  />
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
