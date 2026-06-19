"use client";

import { motion } from "framer-motion";
import { Code2, Columns3, LayoutDashboard } from "lucide-react";

const features = [
  {
    icon: LayoutDashboard,
    color: "#10B981",
    title: "15+ Interactive Dashboards",
    description:
      "Explore pixel-perfect dashboard layouts built for CRM, DevOps, Sales, FinOps, Healthcare, SaaS, E-commerce, and more.",
    items: ["High-fidelity charting UI", "Zustand-powered state flow", "Pre-built tables and metrics"],
    image: "/3d-playful-data-metrics-screen-visualization-dashboard-financial-analytics-display.png",
  },
  {
    icon: Columns3,
    color: "#3B82F6",
    title: "Responsive Container Grids",
    description:
      "Every widget adapts instantly to sidebar toggle state changes using modern CSS container queries instead of window-resize lag.",
    items: ["Fluid column wrapping", "Chart width recalculation", "Jank-free transition animations"],
    image: "/smart-vr-headset-and-group-of-browser-windows.png",
  },
  {
    icon: Code2,
    color: "#8B5CF6",
    title: "Developer First Stack",
    description:
      "Pure React and Next.js 16 components styled with Tailwind CSS v4 and shadcn/ui. Copy, paste, and start building immediately.",
    items: ["Clean codebase organization", "Fully type-safe props", "Next-Intl translation system"],
    image: "/smart-smart-speaker-as-a-voice-assistant.png",
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
        <h2 className="font-extrabold text-3xl text-white tracking-tight md:text-5xl">Production-Ready Starter Kit</h2>
        <p className="mx-auto mt-4 max-w-xl text-gray-400 text-lg">
          High-performance admin presets built with modern web technologies
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
            className="group cursor-default rounded-3xl border border-white/[0.06] bg-white/[0.02] p-8 backdrop-blur-md transition-all duration-500 hover:bg-white/[0.04] hover:shadow-2xl"
            style={
              {
                // Custom inline hover border and shadow using custom properties would be neat,
                // but we can just use class names or simple style bindings for dynamic colors.
              }
            }
            whileHover={{
              borderColor: `${feature.color}40`,
              boxShadow: `0 20px 40px -15px ${feature.color}15`,
              y: -4,
            }}
          >
            <div
              className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-white/[0.08] transition-transform duration-300 group-hover:scale-110"
              style={{
                backgroundColor: `${feature.color}15`,
                borderColor: `${feature.color}25`,
              }}
            >
              <feature.icon className="size-5 animate-pulse-subtle" style={{ color: feature.color }} />
            </div>

            <h3 className="mb-3 font-semibold text-white text-xl">{feature.title}</h3>
            <p className="min-h-[72px] text-gray-400 text-sm leading-relaxed">{feature.description}</p>

            <div className="my-5 h-px bg-white/[0.04]" />

            <div className="flex flex-col gap-3">
              {feature.items.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2.5 font-mono text-gray-400 text-xs uppercase tracking-wider"
                >
                  <div className="h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ backgroundColor: feature.color }} />
                  {item}
                </div>
              ))}
            </div>

            {/* 3D Illustration Graphic Illustration */}
            <div className="relative mt-8 flex h-48 w-full items-center justify-center overflow-hidden rounded-2xl border border-white/[0.06] bg-black/20">
              {/* biome-ignore lint/performance/noImgElement: custom local 3D rendering images */}
              <img
                src={feature.image}
                alt={feature.title}
                className="h-full w-full select-none object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
