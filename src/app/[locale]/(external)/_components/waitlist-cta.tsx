"use client";

import { motion } from "framer-motion";

export function WaitlistCta() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7 }}
      className="mx-auto max-w-7xl px-6 py-24 md:py-32 lg:px-8"
    >
      <div className="relative overflow-hidden rounded-3xl border border-white/[0.04] bg-gradient-to-b from-[#8B5CF6]/[0.06] via-transparent to-transparent px-8 py-20 text-center">
        {/* Subtle glow */}
        <div className="absolute top-0 left-1/2 -z-10 h-[300px] w-[500px] -translate-x-1/2 rounded-full bg-[#8B5CF6]/[0.06] blur-[100px]" />

        <h2 className="font-bold text-3xl text-white md:text-5xl">Ready to take control?</h2>
        <p className="mx-auto mt-4 max-w-lg text-gray-400 text-lg">
          Join thousands on the waitlist for early access to Dashdeck.
        </p>

        <div className="mx-auto mt-10 flex max-w-md flex-col gap-3 sm:flex-row">
          <input
            type="email"
            placeholder="Enter your email"
            aria-label="Email address"
            className="flex-1 rounded-xl border border-white/[0.1] bg-white/[0.05] px-4 py-3 text-sm text-white placeholder-gray-500 transition-all focus:border-[#8B5CF6]/50 focus:outline-none focus:ring-1 focus:ring-[#8B5CF6]/30"
          />
          <button className="whitespace-nowrap rounded-xl bg-[#8B5CF6] px-6 py-3 font-semibold text-sm text-white transition-all duration-300 hover:bg-[#7C3AED] hover:shadow-[#8B5CF6]/25 hover:shadow-lg active:scale-[0.98]">
            Get Early Access
          </button>
        </div>

        <p className="mt-4 text-center text-gray-600 text-xs">🔒 No spam. Unsubscribe anytime.</p>
      </div>
    </motion.section>
  );
}
