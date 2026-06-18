"use client";

import { useMemo, useState } from "react";

import Link from "next/link";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Book,
  ExternalLink,
  FileText,
  HelpCircle,
  Layout,
  LifeBuoy,
  Palette,
  Search,
  Terminal,
  X,
  Zap,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface FAQ {
  q: string;
  a: string;
  category: "general" | "billing" | "account" | "customization";
}

const faqs: FAQ[] = [
  {
    q: "How do I change the theme?",
    a: "Click the theme switcher icon in the header, or go to Settings > Appearance to choose from 4 presets (Default, Tangerine, Brutalist, and Soft Pop) and toggle light/dark modes.",
    category: "customization",
  },
  {
    q: "Can I export dashboard data?",
    a: "Yes. Most dashboards and tables have an Export button. Invoices support full PDF export via the print preview dialog.",
    category: "billing",
  },
  {
    q: "How do I use keyboard shortcuts?",
    a: "Press ? anywhere on the dashboard to open the shortcuts cheat sheet. It displays hotkeys for navigation, theme toggles, and searching.",
    category: "general",
  },
  {
    q: "Where are my saved items stored?",
    a: "All data persists directly in your browser's localStorage. There is no active database backend requirement for the default client-side dashboard.",
    category: "general",
  },
  {
    q: "How do I add a new user?",
    a: "Go to the Users page, click the 'Add User' button, fill out the form, and the user profile will be saved locally to the directory state.",
    category: "account",
  },
  {
    q: "Is there a dark mode?",
    a: "Yes. Toggle dark mode via the sun/moon icon in the header, the Settings > Appearance tab, or press ⌘+Shift+D.",
    category: "customization",
  },
  {
    q: "How can I regenerate API credentials?",
    a: "Go to the Settings page, navigate to the Security tab, and click the Regenerate button next to the active API key card.",
    category: "account",
  },
  {
    q: "Can I modify the charts to use different libraries?",
    a: "Dashdeck uses Recharts under the hood for responsive data visualizations. You can swap them with other charting frameworks if needed.",
    category: "customization",
  },
];

const guides = [
  {
    id: "getting-started",
    title: "Getting Started Guide",
    desc: "Learn the basics of Dashdeck setup and workspace features",
    icon: Book,
    content: {
      intro:
        "Dashdeck is a high-performance admin dashboard built with Next.js 15, Tailwind CSS v4, and Zustand. Follow these steps to configure your environment:",
      steps: [
        {
          title: "Install dependencies",
          desc: "Run `npm install` in the workspace directory to install all package packages.",
        },
        {
          title: "Run locally",
          desc: "Start the local development server with `npm run dev`. Access the application at http://localhost:3000.",
        },
        {
          title: "Configuration",
          desc: "Environment variables can be configured by copying `.env.example` into a new `.env` file.",
        },
        {
          title: "Verify compilation",
          desc: "Run `npm run build` to verify production builds and lint constraints via Biome lint.",
        },
      ],
    },
  },
  {
    id: "dashboard-reference",
    title: "Dashboard Reference",
    desc: "Explore all 15+ interactive charts and dashboards",
    icon: FileText,
    content: {
      intro:
        "Dashdeck comes preloaded with numerous production-grade tracking screens. Here is a breakdown of the primary layouts:",
      details: [
        {
          name: "AI & LLM Analytics",
          desc: "Monitor token consumptions, agent performance metrics, model output accuracies, and cost breakdowns in real-time.",
        },
        {
          name: "DevOps Monitor",
          desc: "Keep track of active server nodes, API Gateway requests/sec, database cluster health indicators, and latency graphs.",
        },
        {
          name: "Healthcare Center",
          desc: "Analyze patient admission ratios, bed occupancy stats, clinical schedules, and patient satisfaction ratings.",
        },
        {
          name: "SaaS Metrics",
          desc: "Visual MRR growth rates, churn analysis, average revenue per user (ARPU), and active trial conversion charts.",
        },
      ],
    },
  },
  {
    id: "theme-customization",
    title: "Theme Customization",
    desc: "How to edit, create custom themes, and adjust typography",
    icon: Zap,
    content: {
      intro:
        "Dashdeck utilizes a fully dynamic custom design system. You can switch presets or customize colors at the code level:",
      presets: [
        { name: "Default Theme", desc: "A sleek, clean indigo-colored interface with obsidian dark mode overrides." },
        {
          name: "Tangerine Theme",
          desc: "A warm, high-contrast amber/orange visual style perfect for operations dashboards.",
        },
        { name: "Brutalist Theme", desc: "Flat shadows, thick dark borders, and clean monospace typography elements." },
        {
          name: "Soft Pop Theme",
          desc: "A playful violet-tinted color scheme with rounded corners and high accessibility contrast.",
        },
      ],
      custom:
        "To inject custom color codes, navigate to `src/app/globals.css` and modify the HSL values under the respective theme classes.",
    },
  },
  {
    id: "api-documentation",
    title: "API Documentation",
    desc: "Learn about client-side state models and developer APIs",
    icon: ExternalLink,
    content: {
      intro:
        "Dashdeck is driven by Zustand store states that run completely on the client side. This allows high-speed state persistence without database overhead:",
      apis: [
        { store: "users-store.ts", desc: "Handles the directory of mock team members, roles, statuses, and updates." },
        {
          store: "kanban-store.ts",
          desc: "Orchestrates columns, drag-and-drop state modifiers, task priorities, and task assignments.",
        },
        {
          store: "calendar-store.ts",
          desc: "Manages event creation, calendar grid state, filters, and color selections.",
        },
        {
          store: "chat-store.ts",
          desc: "Maintains active threads, contacts lists, messaging logs, and status updates.",
        },
      ],
    },
  },
];

const categories = [
  { id: "all", name: "All FAQs" },
  { id: "general", name: "General" },
  { id: "customization", name: "Customization" },
  { id: "billing", name: "Billing & Data" },
  { id: "account", name: "Account" },
];

export default function Page() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [_selectedGuide, setSelectedGuide] = useState<(typeof guides)[number] | null>(null);

  // Filter FAQs based on search and category tabs
  const filteredFaqs = useMemo(() => {
    return faqs.filter((faq) => {
      const matchesSearch =
        faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.a.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = activeCategory === "all" || faq.category === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  // Filter Guides based on search
  const filteredGuides = useMemo(() => {
    return guides.filter(
      (guide) =>
        guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        guide.desc.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery]);

  // Text highlighting utility
  const highlightText = (text: string, query: string) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return (
      <span>
        {parts.map((part, i) =>
          part.toLowerCase() === query.toLowerCase() ? (
            <mark
              key={i}
              className="rounded bg-primary/20 px-0.5 font-medium text-primary-foreground dark:bg-primary/30"
            >
              {part}
            </mark>
          ) : (
            part
          ),
        )}
      </span>
    );
  };

  return (
    <div className="flex max-w-7xl flex-col gap-6">
      {/* Header */}
      <div>
        <h1 className="font-bold text-3xl tracking-tight">Help Center</h1>
        <p className="text-muted-foreground text-sm">Find answers, guides, and support resources.</p>
      </div>

      {/* Large Glowing Search Bar */}
      <div className="relative max-w-2xl">
        <Search className="absolute top-1/2 left-4 size-5 -translate-y-1/2 text-muted-foreground/70" />
        <Input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search help articles, guides, and FAQs..."
          className="h-12 rounded-xl border border-border/50 bg-card/50 pr-10 pl-12 text-sm shadow-sm backdrop-blur-md transition-all placeholder:text-muted-foreground/60 focus-visible:border-primary/50 focus-visible:ring-primary/20 dark:bg-zinc-900/50"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute top-1/2 right-4 -translate-y-1/2 text-muted-foreground/75 hover:text-foreground"
          >
            <X className="size-4" />
          </button>
        )}
      </div>

      {/* Grid of Guide Cards */}
      <div className="space-y-3">
        <h2 className="flex items-center gap-2 font-bold text-lg text-zinc-900 dark:text-zinc-50">
          <Book className="size-4.5 text-primary" />
          Documentation Guides
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {filteredGuides.map((guide) => (
              <motion.div
                key={guide.title}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <Dialog>
                  <DialogTrigger asChild>
                    <Card
                      onClick={() => setSelectedGuide(guide)}
                      className="group flex h-full cursor-pointer flex-col justify-between overflow-hidden rounded-2xl border border-border/40 bg-card/65 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-border/80 hover:bg-card hover:shadow-black/5 hover:shadow-md dark:hover:shadow-black/20"
                    >
                      <CardContent className="flex flex-1 flex-col items-start gap-4 p-5">
                        <div className="flex size-11 items-center justify-center rounded-xl border border-primary/10 bg-primary/5 text-primary transition-transform duration-300 group-hover:scale-110 dark:bg-primary/10">
                          <guide.icon className="size-5" />
                        </div>
                        <div className="flex-1 space-y-1.5">
                          <h3 className="font-semibold text-sm text-zinc-950 transition-colors group-hover:text-primary dark:text-zinc-50">
                            {highlightText(guide.title, searchQuery)}
                          </h3>
                          <p className="text-muted-foreground text-xs leading-relaxed">
                            {highlightText(guide.desc, searchQuery)}
                          </p>
                        </div>
                      </CardContent>
                      <div className="flex items-center gap-1 px-5 pt-0 pb-4 font-semibold text-primary text-xs transition-all group-hover:gap-2">
                        <span>Read guide</span>
                        <ArrowRight className="size-3" />
                      </div>
                    </Card>
                  </DialogTrigger>

                  {/* Interactive guide modal */}
                  <DialogContent className="max-w-xl rounded-2xl border border-border/50 bg-card p-6 backdrop-blur-lg">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2 font-bold text-xl text-zinc-900 dark:text-zinc-50">
                        <guide.icon className="size-5.5 text-primary" />
                        {guide.title}
                      </DialogTitle>
                      <DialogDescription className="text-muted-foreground text-xs">{guide.desc}</DialogDescription>
                    </DialogHeader>

                    <div className="my-2 max-h-[60vh] space-y-4 overflow-y-auto pr-2 text-sm">
                      {guide.id === "getting-started" && guide.content.steps && (
                        <div className="space-y-3">
                          <p className="text-xs text-zinc-650 leading-relaxed dark:text-zinc-350">
                            {guide.content.intro}
                          </p>
                          <div className="space-y-3">
                            {guide.content.steps.map((step, idx) => (
                              <div
                                key={idx}
                                className="flex items-start gap-3 rounded-xl border border-border/20 bg-muted/20 p-3"
                              >
                                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 font-bold text-primary text-xs">
                                  {idx + 1}
                                </span>
                                <div>
                                  <h4 className="font-semibold text-xs text-zinc-900 dark:text-zinc-100">
                                    {step.title}
                                  </h4>
                                  <p className="mt-0.5 text-[11px] text-muted-foreground">{step.desc}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {guide.id === "dashboard-reference" && guide.content.details && (
                        <div className="space-y-3">
                          <p className="text-xs text-zinc-650 leading-relaxed dark:text-zinc-350">
                            {guide.content.intro}
                          </p>
                          <div className="space-y-2.5">
                            {guide.content.details.map((detail, idx) => (
                              <div key={idx} className="rounded-xl border border-border/20 bg-muted/25 p-3">
                                <h4 className="flex items-center gap-1.5 font-semibold text-primary text-xs">
                                  <Layout className="size-3.5" />
                                  {detail.name}
                                </h4>
                                <p className="mt-1 text-[11px] text-muted-foreground leading-relaxed">{detail.desc}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {guide.id === "theme-customization" && guide.content.presets && (
                        <div className="space-y-3">
                          <p className="text-xs text-zinc-650 leading-relaxed dark:text-zinc-350">
                            {guide.content.intro}
                          </p>
                          <div className="grid grid-cols-2 gap-2">
                            {guide.content.presets.map((preset, idx) => (
                              <div
                                key={idx}
                                className="flex flex-col gap-1 rounded-xl border border-border/20 bg-muted/20 p-2.5"
                              >
                                <h4 className="flex items-center gap-1 font-bold text-[11px] text-zinc-900 dark:text-zinc-100">
                                  <Palette className="size-3 text-primary" />
                                  {preset.name}
                                </h4>
                                <p className="text-[10px] text-muted-foreground leading-relaxed">{preset.desc}</p>
                              </div>
                            ))}
                          </div>
                          <p className="rounded-lg border border-primary/10 bg-primary/5 p-2 text-[11px] text-muted-foreground italic">
                            {guide.content.custom}
                          </p>
                        </div>
                      )}

                      {guide.id === "api-documentation" && guide.content.apis && (
                        <div className="space-y-3">
                          <p className="text-xs text-zinc-650 leading-relaxed dark:text-zinc-350">
                            {guide.content.intro}
                          </p>
                          <div className="space-y-2">
                            {guide.content.apis.map((api, idx) => (
                              <div
                                key={idx}
                                className="flex flex-col gap-1 rounded-xl border border-border/20 bg-muted/25 p-2.5 font-mono"
                              >
                                <div className="flex items-center gap-1.5 font-semibold text-indigo-500 text-xs">
                                  <Terminal className="size-3.5" />
                                  <span>{api.store}</span>
                                </div>
                                <p className="font-sans text-[10px] text-muted-foreground leading-normal">{api.desc}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <DialogFooter className="border-border/20 border-t pt-4">
                      <DialogTrigger asChild>
                        <Button variant="outline" className="h-9 text-xs">
                          Close Guide
                        </Button>
                      </DialogTrigger>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </motion.div>
            ))}
          </AnimatePresence>
          {filteredGuides.length === 0 && (
            <div className="col-span-full py-8 text-center text-muted-foreground text-xs">
              No matching guides found for "{searchQuery}".
            </div>
          )}
        </div>
      </div>

      {/* FAQ Accordion Grid */}
      <Card className="rounded-2xl border-border/40 bg-card/45 shadow-xs backdrop-blur-md">
        <CardHeader className="flex flex-col justify-between gap-4 border-border/30 border-b bg-muted/20 px-6 py-4 md:flex-row md:items-center">
          <div>
            <CardTitle className="flex items-center gap-2 font-bold text-lg text-zinc-900 dark:text-zinc-50">
              <HelpCircle className="size-5 text-primary" />
              Frequently Asked Questions
            </CardTitle>
            <CardDescription className="text-xs">Quick answers to common questions about Dashdeck</CardDescription>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`rounded-lg border px-3 py-1 font-semibold text-xs transition-all ${
                  activeCategory === cat.id
                    ? "border-primary bg-primary text-primary-foreground shadow-xs"
                    : "border-border/20 bg-muted/40 text-muted-foreground hover:bg-muted/70"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <AnimatePresence mode="popLayout">
              {filteredFaqs.map((faq, _i) => (
                <motion.div
                  key={faq.q}
                  layout
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="flex flex-col justify-between space-y-2 rounded-xl border border-border/30 bg-zinc-50/50 p-4 transition-all hover:border-border/60 hover:shadow-xs dark:bg-zinc-900/30"
                >
                  <div className="space-y-1.5">
                    <h4 className="flex items-start gap-2 font-semibold text-xs text-zinc-900 dark:text-zinc-100">
                      <span className="font-bold text-primary">Q:</span>
                      <span>{highlightText(faq.q, searchQuery)}</span>
                    </h4>
                    <p className="pl-4.5 text-[11px] text-muted-foreground leading-relaxed">
                      {highlightText(faq.a, searchQuery)}
                    </p>
                  </div>
                  <div className="flex justify-end pt-2">
                    <Badge
                      variant="outline"
                      className="border-border/20 bg-muted/40 px-1.5 py-0 font-bold font-sans text-[9px] text-muted-foreground uppercase tracking-wider"
                    >
                      {faq.category}
                    </Badge>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {filteredFaqs.length === 0 && (
              <div className="col-span-full py-12 text-center text-muted-foreground text-xs">
                No FAQs found matching your criteria. Try adjusting the search query or category filters.
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Support Banner */}
      <div className="relative flex flex-col items-center justify-between gap-4 overflow-hidden rounded-2xl border border-indigo-500/20 bg-indigo-500/5 p-6 shadow-sm sm:flex-row dark:bg-indigo-500/10">
        <div className="pointer-events-none absolute -right-20 -bottom-20 h-60 w-60 rounded-full bg-indigo-500/10 blur-[80px]" />
        <div className="z-10 flex items-center gap-4 text-center sm:text-left">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-indigo-500/20 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
            <LifeBuoy className="size-5" />
          </div>
          <div>
            <h4 className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">Still need help?</h4>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              If you can't find what you're looking for, feel free to open a ticket or search issues.
            </p>
          </div>
        </div>
        <Button
          className="z-10 shrink-0 bg-indigo-600 font-medium text-white hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-400"
          asChild
        >
          <Link
            href="https://github.com/Santosh-Prasad-Verma/Dashdeck/issues"
            target="_blank"
            className="inline-flex items-center gap-1.5"
          >
            Open GitHub Issue
            <ExternalLink className="size-3.5" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
