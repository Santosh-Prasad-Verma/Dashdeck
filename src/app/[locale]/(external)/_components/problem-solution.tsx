import { motion } from "framer-motion";
import { ArrowDown, BarChart3, Check, Languages, LayoutGrid, PanelLeft, Zap } from "lucide-react";

import { GradientText } from "./shared/gradient-text";

const scatteredItems = [
  { icon: BarChart3, label: "Chart Layouts", rotate: "-3deg", color: "#10B981" },
  { icon: PanelLeft, label: "Sidebar Toggles", rotate: "2deg", color: "#3B82F6" },
  { icon: LayoutGrid, label: "Responsive Grids", rotate: "-2deg", color: "#8B5CF6" },
  { icon: Languages, label: "Translations", rotate: "3deg", color: "#EC4899" },
  { icon: Zap, label: "Zustand State", rotate: "-1deg", color: "#d4fc34" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

export function ProblemSolution() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 py-24 md:py-32 lg:px-8">
      {/* Floating abstract visual asset - Inverted Pyramid Stack */}
      {/* biome-ignore lint/performance/noImgElement: static local 3D assets */}
      <motion.img
        src="/illusion-abstract-inverted-pyramid-structure-with-stacked-gradient-segments.svg"
        alt="Stacked Inverted Pyramid"
        className="pointer-events-none absolute top-[10%] right-[-120px] hidden size-52 select-none opacity-40 xl:block"
        animate={{ y: [0, -15, 0], rotate: [0, 8, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Problem */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ staggerChildren: 0.08 }}
        className="text-center"
      >
        <motion.h2
          variants={fadeUp}
          transition={{ duration: 0.6 }}
          className="font-bold text-3xl text-white tracking-tight md:text-5xl"
        >
          Dashboard development is <span className="text-gray-500">time-consuming</span>
        </motion.h2>
        <motion.p
          variants={fadeUp}
          transition={{ duration: 0.6 }}
          className="mx-auto mt-4 max-w-2xl text-gray-400 text-lg"
        >
          Designing custom charts in one project. Styling grids in another. Fixing responsive bugs everywhere.
        </motion.p>

        {/* Scattered Cards */}
        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.6 }}
          className="mt-12 flex flex-wrap justify-center gap-4"
        >
          {scatteredItems.map((item) => (
            <div
              key={item.label}
              className="flex flex-col items-center gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.02] px-6 py-5 text-center backdrop-blur-md transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.04]"
              style={{ transform: `rotate(${item.rotate})` }}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/[0.04] bg-white/[0.02]">
                <item.icon className="size-5" style={{ color: item.color }} />
              </div>
              <div className="font-semibold text-gray-300 text-sm tracking-wide">{item.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Transition Arrow */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="my-16 flex justify-center"
      >
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
          <ArrowDown className="size-6 text-[#10B981]/60" />
        </motion.div>
      </motion.div>

      {/* Solution */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ staggerChildren: 0.08 }}
        className="text-center"
      >
        <motion.h2
          variants={fadeUp}
          transition={{ duration: 0.6 }}
          className="font-bold text-3xl text-white tracking-tight md:text-5xl"
        >
          Dashdeck brings everything <GradientText>together</GradientText>
        </motion.h2>
        <motion.p
          variants={fadeUp}
          transition={{ duration: 0.6 }}
          className="mx-auto mt-4 max-w-2xl text-gray-400 text-lg"
        >
          A comprehensive preset library. Copy pixel-perfect, fully responsive React & Next.js dashboard templates
          instantly.
        </motion.p>

        {/* Unified Card */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] as const }}
          className="mx-auto mt-12 max-w-3xl rounded-3xl border border-white/[0.08] bg-[#0A0A0A]/40 p-10 shadow-2xl shadow-emerald-500/[0.01] backdrop-blur-md"
        >
          <div className="flex flex-wrap justify-center gap-6 md:gap-10">
            {scatteredItems.map((item) => (
              <div key={item.label} className="flex flex-col items-center gap-3">
                <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-white/[0.06] bg-white/[0.03] shadow-inner">
                  <item.icon className="size-6" style={{ color: item.color }} />
                  <Check className="absolute -right-1 -bottom-1 size-4 rounded-full border border-[#10B981]/30 bg-black p-0.5 text-emerald-400 shadow-sm" />
                </div>
                <span className="font-semibold text-gray-300 text-xs tracking-wider">{item.label}</span>
              </div>
            ))}
          </div>
          <div className="my-8 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
          <p className="font-mono text-gray-500 text-xs uppercase tracking-widest">
            All unified in one developer-first preset library
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
