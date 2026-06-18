"use client";

import type { ReactNode } from "react";

import { motion } from "framer-motion";

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  id?: string;
}

export function SectionWrapper({ children, className = "", delay = 0, id }: SectionWrapperProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay, ease: [0.21, 0.47, 0.32, 0.98] as const }}
      className={`max-w-7xl mx-auto px-6 lg:px-8 py-24 md:py-32 ${className}`}
    >
      {children}
    </motion.section>
  );
}
