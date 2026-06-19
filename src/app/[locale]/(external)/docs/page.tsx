"use client";

import { motion } from "framer-motion";
import {
  BookOpen,
  Code2,
  Database,
  ExternalLink,
  GitBranch,
  Globe,
  Layers,
  Palette,
  Rocket,
  Shield,
} from "lucide-react";

import { Link } from "@/i18n/navigation";

const sections = [
  {
    icon: Rocket,
    title: "Getting Started",
    description: "Get Dashdeck up and running in minutes with our quick start guide.",
    items: [
      "Clone the repository from GitHub",
      "Install dependencies with npm install",
      "Run the development server with npm run dev",
      "Open http://localhost:3000 in your browser",
    ],
  },
  {
    icon: Layers,
    title: "Dashboard Presets",
    description: "37+ pre-built dashboard templates for various use cases.",
    items: [
      "CRM - Customer relationship management",
      "DevOps - Infrastructure monitoring",
      "Finance - Banking and investment tracking",
      "AI - Machine learning model analytics",
      "E-Commerce - Order and inventory management",
      "Healthcare - Patient management system",
    ],
  },
  {
    icon: Palette,
    title: "Theme System",
    description: "Customizable theme presets with light and dark mode support.",
    items: [
      "Default - Clean and professional",
      "Tangerine - Warm orange accents",
      "Brutalist - Raw and minimal design",
      "Soft Pop - Colorful and playful",
    ],
  },
  {
    icon: Code2,
    title: "Tech Stack",
    description: "Built with modern technologies for optimal performance.",
    items: [
      "Next.js 16 with Turbopack for fast builds",
      "React 19 with Server Components",
      "Tailwind CSS v4 for styling",
      "Zustand for state management",
      "TypeScript for type safety",
    ],
  },
  {
    icon: Globe,
    title: "Internationalization",
    description: "Full i18n support with multiple language options.",
    items: ["English (default)", "Spanish (Español)", "Hindi (हिन्दी)", "Easy to add new languages"],
  },
  {
    icon: Shield,
    title: "Features",
    description: "Comprehensive set of dashboard components and tools.",
    items: [
      "Interactive SVG charts with animations",
      "Drag-and-drop Kanban board",
      "Email and chat clients",
      "User and role management",
      "Invoice creator with PDF export",
      "Global keyboard shortcuts",
    ],
  },
];

const quickLinks = [
  { label: "GitHub Repository", href: "https://github.com/Santosh-Prasad-Verma/Dashdeck", icon: GitBranch },
  { label: "View Source Code", href: "https://github.com/Santosh-Prasad-Verma/Dashdeck/tree/main/src", icon: Code2 },
  {
    label: "Contributing Guide",
    href: "https://github.com/Santosh-Prasad-Verma/Dashdeck/blob/main/CONTRIBUTING.md",
    icon: BookOpen,
  },
  { label: "Report Issues", href: "https://github.com/Santosh-Prasad-Verma/Dashdeck/issues", icon: ExternalLink },
];

const commands = [
  { command: "git clone https://github.com/Santosh-Prasad-Verma/Dashdeck.git", description: "Clone the repository" },
  { command: "cd Dashdeck", description: "Navigate to project directory" },
  { command: "npm install", description: "Install dependencies" },
  { command: "npm run dev", description: "Start development server" },
  { command: "npm test", description: "Run all tests" },
  { command: "npm run test:watch", description: "Run tests in watch mode" },
];

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 py-20 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-b from-[#10b981]/[0.05] to-transparent" />
        <div className="relative mx-auto max-w-4xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#10b981]/30 bg-[#10b981]/10 px-4 py-1.5 text-[#10b981] text-xs">
              <BookOpen className="size-3.5" />
              Documentation
            </div>
            <h1 className="mb-4 font-extrabold text-4xl text-white tracking-tight sm:text-5xl lg:text-6xl">
              Dashdeck <span className="text-[#10b981]">Documentation</span>
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-gray-400 text-lg">
              Everything you need to know about setting up, customizing, and deploying your Dashdeck admin dashboard.
            </p>
          </motion.div>

          {/* Quick Start Code Block */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto max-w-xl overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0A0A0A]"
          >
            <div className="flex items-center gap-1.5 border-white/[0.04] border-b px-4 py-2">
              <span className="size-2.5 rounded-full bg-red-500/80" />
              <span className="size-2.5 rounded-full bg-yellow-500/80" />
              <span className="size-2.5 rounded-full bg-green-500/80" />
              <span className="ml-2 font-mono text-[10px] text-muted-foreground">Terminal</span>
            </div>
            <div className="p-4 text-left font-mono text-[11px]">
              {commands.slice(0, 4).map((cmd) => (
                <div key={cmd.command} className="mb-1">
                  <span className="text-[#10b981]">$ </span>
                  <span className="text-white">{cmd.command}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Documentation Sections */}
      <section className="px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sections.map((section, idx) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="rounded-2xl border border-white/[0.06] bg-[#0A0A0A] p-6 transition-all duration-300 hover:border-white/[0.12]"
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-xl border border-[#10b981]/20 bg-[#10b981]/10">
                    <section.icon className="size-5 text-[#10b981]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-white">{section.title}</h3>
                  </div>
                </div>
                <p className="mb-4 text-gray-400 text-sm">{section.description}</p>
                <ul className="space-y-2">
                  {section.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-gray-400 text-sm">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[#10b981]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="border-white/[0.06] border-t px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-center font-bold text-2xl text-white">Quick Links</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {quickLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-xl border border-white/[0.06] bg-[#0A0A0A] p-4 transition-all duration-300 hover:border-[#10b981]/30 hover:bg-[#0E0E0E]"
              >
                <div className="flex size-10 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.03]">
                  <link.icon className="size-5 text-[#10b981]" />
                </div>
                <div>
                  <div className="font-semibold text-sm text-white">{link.label}</div>
                  <div className="text-[11px] text-muted-foreground">Open in new tab</div>
                </div>
                <ExternalLink className="ml-auto size-4 text-gray-500" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="border-white/[0.06] border-t px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-center font-bold text-2xl text-white">Technology Stack</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {[
              { name: "Next.js", version: "^16.2.9", color: "#ffffff" },
              { name: "React", version: "^19.2.7", color: "#61dafb" },
              { name: "TypeScript", version: "^5.9.3", color: "#3178c6" },
              { name: "Tailwind CSS", version: "^4.1.5", color: "#06b6d4" },
              { name: "Zustand", version: "^5.0.14", color: "#d4fc34" },
              { name: "Recharts", version: "^3.8.0", color: "#10b981" },
              { name: "Biome", version: "^2.5.0", color: "#60a5fa" },
              { name: "Vitest", version: "^3.x", color: "#f59e0b" },
            ].map((tech) => (
              <div
                key={tech.name}
                className="flex flex-col items-center rounded-xl border border-white/[0.06] bg-[#0A0A0A] p-4 transition-all duration-300 hover:border-white/[0.12]"
              >
                <Database className="mb-2 size-6" style={{ color: tech.color }} />
                <span className="font-semibold text-sm text-white">{tech.name}</span>
                <span className="font-mono text-[10px] text-muted-foreground">{tech.version}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="border-white/[0.06] border-t px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 font-bold text-2xl text-white">Ready to get started?</h2>
          <p className="mb-8 text-gray-400">Clone the repository and start building your admin dashboard today.</p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/dashboard/default"
              className="rounded-full bg-[#10b981] px-6 py-3 font-bold text-sm text-white transition-all hover:bg-[#059669]"
            >
              View Live Demo
            </Link>
            <a
              href="https://github.com/Santosh-Prasad-Verma/Dashdeck"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.03] px-6 py-3 font-medium text-sm text-white transition-all hover:bg-white/[0.06]"
            >
              <GitBranch className="size-4" />
              View on GitHub
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
