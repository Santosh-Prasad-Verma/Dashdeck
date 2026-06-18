"use client";

import { motion } from "framer-motion";

export function WaitlistCta() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7 }}
      className="max-w-7xl mx-auto px-6 lg:px-8 py-24 md:py-32"
    >
      <div className="relative rounded-3xl bg-gradient-to-b from-[#8B5CF6]/[0.06] via-transparent to-transparent border border-white/[0.04] px-8 py-20 text-center overflow-hidden">
        {/* Subtle glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-[#8B5CF6]/[0.06] rounded-full blur-[100px] -z-10" />

        <h2 className="text-3xl md:text-5xl font-bold text-white">Ready to take control?</h2>
        <p className="text-gray-400 text-lg mt-4 max-w-lg mx-auto">
          Join thousands on the waitlist for early access to Dashdeck.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mt-10">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[#8B5CF6]/50 focus:ring-1 focus:ring-[#8B5CF6]/30 transition-all"
          />
          <button className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-semibold px-6 py-3 rounded-xl text-sm transition-all duration-300 hover:shadow-lg hover:shadow-[#8B5CF6]/25 whitespace-nowrap active:scale-[0.98]">
            Get Early Access
          </button>
        </div>

        <p className="text-gray-600 text-xs text-center mt-4">🔒 No spam. Unsubscribe anytime.</p>
      </div>
    </motion.section>
  );
}
