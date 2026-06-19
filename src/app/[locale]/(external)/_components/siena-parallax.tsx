"use client";

import { motion } from "framer-motion";
import { BarChart3, Cpu, Layout, Server, ShoppingCart, Users, Wallet, Zap } from "lucide-react";

interface DashboardPreset {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  color: string;
  metrics: { label: string; value: string; trend?: string }[];
  chartType: "line" | "bar" | "area";
}

const presets: DashboardPreset[] = [
  {
    id: "crm",
    name: "CRM Dashboard",
    description: "Customer relationship analytics and sales pipeline tracking",
    icon: Users,
    color: "#10b981",
    metrics: [
      { label: "Active Deals", value: "142", trend: "+12%" },
      { label: "Pipeline Value", value: "$2.4M", trend: "+8%" },
      { label: "Win Rate", value: "34%", trend: "+2.1%" },
    ],
    chartType: "area",
  },
  {
    id: "devops",
    name: "DevOps Telemetry",
    description: "Infrastructure monitoring and deployment metrics",
    icon: Server,
    color: "#d4fc34",
    metrics: [
      { label: "Deploy Frequency", value: "24/day", trend: "+15%" },
      { label: "Error Rate", value: "0.02%", trend: "-0.01%" },
      { label: "Avg Latency", value: "12ms", trend: "-3ms" },
    ],
    chartType: "line",
  },
  {
    id: "saas",
    name: "SaaS Analytics",
    description: "Subscription metrics and user engagement tracking",
    icon: BarChart3,
    color: "#8b5cf6",
    metrics: [
      { label: "MRR", value: "$184K", trend: "+12%" },
      { label: "Churn Rate", value: "2.1%", trend: "-0.3%" },
      { label: "DAU/MAU", value: "42%", trend: "+5%" },
    ],
    chartType: "area",
  },
  {
    id: "ai",
    name: "AI Agent Hub",
    description: "Model performance and agent orchestration metrics",
    icon: Cpu,
    color: "#06b6d4",
    metrics: [
      { label: "Tokens/sec", value: "12.4K", trend: "+22%" },
      { label: "Accuracy", value: "98.7%", trend: "+0.2%" },
      { label: "Active Models", value: "8", trend: "+2" },
    ],
    chartType: "line",
  },
  {
    id: "ecommerce",
    name: "E-Commerce",
    description: "Order tracking and inventory management dashboard",
    icon: ShoppingCart,
    color: "#f59e0b",
    metrics: [
      { label: "Orders Today", value: "1,842", trend: "+18%" },
      { label: "Revenue", value: "$67K", trend: "+24%" },
      { label: "Cart Abandon", value: "28%", trend: "-4%" },
    ],
    chartType: "bar",
  },
  {
    id: "finops",
    name: "FinOps Spend",
    description: "Cloud cost optimization and budget tracking",
    icon: Wallet,
    color: "#ec4899",
    metrics: [
      { label: "Monthly Spend", value: "$42K", trend: "-8%" },
      { label: "Savings", value: "$12K", trend: "+15%" },
      { label: "Efficiency", value: "94%", trend: "+3%" },
    ],
    chartType: "area",
  },
];

function MiniChart({ type, color }: { type: "line" | "bar" | "area"; color: string }) {
  if (type === "bar") {
    return (
      <svg className="h-12 w-full" viewBox="0 0 200 40">
        {[40, 65, 45, 80, 55, 70, 90, 60, 75, 85, 50, 70].map((height, i) => (
          <rect
            key={`bar-${height}-${i}`}
            x={i * 17}
            y={40 - height * 0.4}
            width={12}
            height={height * 0.4}
            fill={color}
            opacity={0.6 + (i % 3) * 0.1}
            rx={2}
          />
        ))}
      </svg>
    );
  }

  if (type === "line") {
    return (
      <svg className="h-12 w-full" viewBox="0 0 200 40">
        <path
          d="M 0,30 Q 20,25 40,28 T 80,20 T 120,25 T 160,15 T 200,18"
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="120" cy="25" r="3" fill={color} />
      </svg>
    );
  }

  return (
    <svg className="h-12 w-full" viewBox="0 0 200 40">
      <defs>
        <linearGradient id={`grad-${color.replace("#", "")}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M 0,35 Q 30,20 60,25 T 120,15 T 180,20 L 200,18 L 200,40 L 0,40 Z"
        fill={`url(#grad-${color.replace("#", "")})`}
      />
      <path
        d="M 0,35 Q 30,20 60,25 T 120,15 T 180,20 L 200,18"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="120" cy="15" r="3" fill={color} />
    </svg>
  );
}

export function SienaParallax() {
  return (
    <div className="relative flex w-full flex-col items-center bg-[#050505] px-4 py-20 text-white lg:px-8">
      {/* Header Title Section */}
      <div className="mb-12 flex w-full max-w-7xl flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#10b981]/30 bg-[#10b981]/10 px-3.5 py-1 text-[#10b981] text-xs">
          <Layout className="size-3.5" />
          Ready-to-Use Templates
        </div>
        <h2 className="mt-4 max-w-4xl font-extrabold text-4xl text-white uppercase tracking-tight sm:text-5xl lg:text-7xl">
          Dashboard Presets
        </h2>
        <p className="mt-4 max-w-2xl text-neutral-400 text-sm sm:text-base">
          Copy pixel-perfect, fully responsive dashboard templates for any use case. From CRM to DevOps, SaaS to AI —
          start building in seconds.
        </p>
      </div>

      {/* Dashboard Presets Grid */}
      <div className="grid w-full max-w-7xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {presets.map((preset, idx) => (
          <motion.div
            key={preset.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="group relative overflow-hidden rounded-2xl border border-zinc-800/80 bg-[#0B0B0C] p-5 transition-all duration-300 hover:border-zinc-700 hover:bg-[#0E0E10]"
          >
            {/* Header */}
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="flex size-9 items-center justify-center rounded-lg"
                  style={{ backgroundColor: `${preset.color}15`, border: `1px solid ${preset.color}30` }}
                >
                  <preset.icon className="size-4.5" style={{ color: preset.color }} />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white">{preset.name}</h3>
                  <p className="text-[10px] text-neutral-500">{preset.description}</p>
                </div>
              </div>
            </div>

            {/* Mini Chart */}
            <div className="mb-4 rounded-lg border border-white/[0.03] bg-white/[0.01] p-3">
              <MiniChart type={preset.chartType} color={preset.color} />
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-2">
              {preset.metrics.map((metric) => (
                <div key={metric.label} className="text-center">
                  <span className="block font-mono text-[8px] text-neutral-500 uppercase">{metric.label}</span>
                  <span className="font-bold text-sm text-white">{metric.value}</span>
                  {metric.trend && (
                    <span
                      className="block font-mono text-[9px]"
                      style={{ color: metric.trend.startsWith("+") ? preset.color : "#ef4444" }}
                    >
                      {metric.trend}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Hover indicator */}
            <div
              className="absolute inset-x-0 bottom-0 h-0.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{ backgroundColor: preset.color }}
            />
          </motion.div>
        ))}
      </div>

      {/* View All Link */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-10"
      >
        <a
          href="/dashboard/default"
          className="inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.03] px-6 py-2.5 font-medium text-sm text-white transition-all hover:border-white/[0.15] hover:bg-white/[0.06]"
        >
          View All Presets
          <Zap className="size-4 text-[#d4fc34]" />
        </a>
      </motion.div>
    </div>
  );
}
