"use client";

import { useMemo, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Bug, Check, Loader2, Mail, Rocket, Search, Sparkles, Zap } from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface ChangeItem {
  label: "feature" | "improvement" | "fix";
  text: string;
}

interface Release {
  version: string;
  date: string;
  type: "release" | "beta" | "alpha";
  icon: typeof Rocket | typeof Sparkles | typeof Zap;
  changes: ChangeItem[];
}

const releases: Release[] = [
  {
    version: "v1.0.0",
    date: "June 16, 2026",
    type: "release",
    icon: Rocket,
    changes: [
      {
        label: "feature",
        text: "Added 22 interactive dashboards including AI/LLM Analytics, DevOps Monitor, and Healthcare",
      },
      { label: "feature", text: "Theme system with 4 presets — Default, Tangerine, Brutalist, and Soft Pop" },
      { label: "feature", text: "Full client-side state management with Zustand — no backend required" },
      { label: "feature", text: "Keyboard shortcuts dialog (press ? to view)" },
      { label: "feature", text: "Notification bell with dropdown in header" },
      { label: "feature", text: "Calendar with event scheduling, color coding, and localStorage persistence" },
      { label: "improvement", text: "Redesigned landing page with hero section, features grid, and testimonials" },
      { label: "improvement", text: "Filled all 'Coming Soon' tabs across Finance, Analytics, and Roles" },
      { label: "improvement", text: "Email client now has 10 unique templated email messages" },
      { label: "improvement", text: "Invoice page with save-to-localStorage and PDF export" },
      { label: "improvement", text: "Breadcrumb navigation in dashboard header" },
    ],
  },
  {
    version: "v0.9.0",
    date: "May 28, 2026",
    type: "beta",
    icon: Sparkles,
    changes: [
      { label: "feature", text: "Added Kanban board with drag-and-drop task management" },
      { label: "feature", text: "Added Chat system with conversation management" },
      { label: "feature", text: "Added Settings page with Account, Appearance, Notifications, and Security tabs" },
      { label: "improvement", text: "Improved sidebar navigation with collapsible groups" },
      { label: "fix", text: "Fixed hydration issues in auth pages" },
    ],
  },
  {
    version: "v0.8.0",
    date: "April 12, 2026",
    type: "beta",
    icon: Zap,
    changes: [
      { label: "feature", text: "Added Real Estate and Social Media Analytics dashboards" },
      {
        label: "feature",
        text: "Interactive chart components with custom Recharts tooltips and theme-based area gradients",
      },
      { label: "improvement", text: "Optimized component load times and animation frame pacing" },
      { label: "fix", text: "Fixed grid alignment overlap on smaller tablet viewport sizes" },
    ],
  },
  {
    version: "v0.7.0",
    date: "March 18, 2026",
    type: "alpha",
    icon: Sparkles,
    changes: [
      { label: "feature", text: "Initial alpha build with fundamental table grids and layout framework" },
      { label: "feature", text: "Zustand state synchronization base modules" },
      { label: "fix", text: "Resolved dark mode toggling flicker on page initialization" },
    ],
  },
];

function getBadge(label: string) {
  switch (label) {
    case "feature":
      return (
        <Badge className="flex shrink-0 items-center gap-1 rounded-md border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 font-bold text-[9px] text-emerald-600 uppercase tracking-wider dark:text-emerald-400">
          <Sparkles className="size-2.5 shrink-0" />
          New
        </Badge>
      );
    case "improvement":
      return (
        <Badge className="flex shrink-0 items-center gap-1 rounded-md border border-blue-500/20 bg-blue-500/10 px-2 py-0.5 font-bold text-[9px] text-blue-600 uppercase tracking-wider dark:text-blue-400">
          <Zap className="size-2.5 shrink-0" />
          Improved
        </Badge>
      );
    case "fix":
      return (
        <Badge className="flex shrink-0 items-center gap-1 rounded-md border border-amber-500/20 bg-amber-500/10 px-2 py-0.5 font-bold text-[9px] text-amber-600 uppercase tracking-wider dark:text-amber-400">
          <Bug className="size-2.5 shrink-0" />
          Fixed
        </Badge>
      );
    default:
      return (
        <Badge
          variant="secondary"
          className="shrink-0 rounded-md px-2 py-0.5 font-bold text-[9px] uppercase tracking-wider"
        >
          {label}
        </Badge>
      );
  }
}

export default function Page() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<"all" | "feature" | "improvement" | "fix">("all");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    // Simple email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubscribed(true);
      toast.success("Successfully subscribed to Dashdeck changelog updates!");
      setEmail("");
    }, 1200);
  };

  // Filter changelog releases and changes
  const filteredReleases = useMemo(() => {
    return releases
      .map((release) => {
        const filteredChanges = release.changes.filter((change) => {
          const matchesFilter = activeFilter === "all" || change.label === activeFilter;
          const matchesSearch = change.text.toLowerCase().includes(searchQuery.toLowerCase());
          return matchesFilter && matchesSearch;
        });

        return {
          ...release,
          changes: filteredChanges,
        };
      })
      .filter((release) => release.changes.length > 0);
  }, [searchQuery, activeFilter]);

  // Highlighting matching search query
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
    <div className="flex max-w-4xl flex-col gap-8 pb-12">
      {/* Header */}
      <div>
        <h1 className="font-bold text-3xl tracking-tight">Changelog</h1>
        <p className="text-muted-foreground text-sm">Track updates, new features, and improvements.</p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div className="flex flex-wrap gap-1">
          {(["all", "feature", "improvement", "fix"] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={cn(
                "rounded-lg border px-3.5 py-1.5 font-semibold text-[10px] text-xs uppercase tracking-wider transition-all",
                activeFilter === filter
                  ? "border-primary bg-primary text-primary-foreground shadow-xs"
                  : "border-border/20 bg-muted/40 text-muted-foreground hover:bg-muted/70",
              )}
            >
              {filter === "all" ? "All Updates" : `${filter}s`}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-80">
          <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground/60" />
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search changes..."
            className="h-9 rounded-lg border border-border/50 bg-card/50 pr-4 pl-9 text-xs shadow-xs backdrop-blur-md transition-all placeholder:text-muted-foreground/60 focus-visible:border-primary/50 focus-visible:ring-primary/20 dark:bg-zinc-900/50"
          />
        </div>
      </div>

      {/* Timeline Wrapper */}
      <div className="relative space-y-12 pl-6 lg:pl-10">
        {/* Timeline vertical bar */}
        <div className="pointer-events-none absolute top-1 bottom-1 left-2 w-0.5 bg-gradient-to-b from-primary/50 via-zinc-200 to-zinc-200 lg:left-4 dark:via-zinc-800 dark:to-zinc-900" />

        <AnimatePresence mode="popLayout">
          {filteredReleases.map((release) => {
            const ReleaseIcon = release.icon;

            return (
              <motion.div
                key={release.version}
                layout
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="group relative"
              >
                {/* Timeline marker */}
                <div className="absolute top-1.5 -left-[30px] z-10 flex size-8 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-950 shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:border-primary/50 group-hover:text-primary lg:-left-[28px] dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50">
                  <ReleaseIcon className="size-3.5" />
                </div>

                {/* Release Header Details */}
                <div className="mb-3 flex flex-col justify-between gap-1.5 sm:flex-row sm:items-baseline">
                  <div className="flex items-center gap-2.5">
                    <span className="font-bold text-xl text-zinc-950 dark:text-zinc-50">{release.version}</span>
                    <Badge
                      variant="outline"
                      className={cn(
                        "rounded-md border-border/40 px-1.5 py-0.5 font-bold text-[9px] uppercase tracking-wider",
                        release.type === "release"
                          ? "border-indigo-500/20 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400"
                          : "bg-zinc-155 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400",
                      )}
                    >
                      {release.type}
                    </Badge>
                  </div>
                  <p className="font-semibold text-muted-foreground text-xs">{release.date}</p>
                </div>

                {/* Content Card */}
                <Card className="rounded-2xl border border-border/30 bg-card/60 shadow-xs backdrop-blur-md transition-all duration-300 group-hover:border-border/60 group-hover:shadow-md">
                  <CardContent className="p-5">
                    <div className="flex flex-col gap-4">
                      {release.changes.map((change, i) => (
                        <div key={i} className="flex items-start gap-3 text-sm leading-relaxed">
                          <div className="shrink-0 pt-0.5">{getBadge(change.label)}</div>
                          <span className="text-zinc-700 dark:text-zinc-300">
                            {highlightText(change.text, searchQuery)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {filteredReleases.length === 0 && (
          <div className="py-12 text-center text-muted-foreground text-sm">
            No updates found matching your search criteria. Try a different search query.
          </div>
        )}
      </div>

      {/* Subscribe to updates Card */}
      <Card className="relative mt-4 overflow-hidden rounded-2xl border border-primary/20 bg-primary/[0.02] p-6 shadow-xs sm:p-8 dark:bg-primary/[0.04]">
        <div className="pointer-events-none absolute -right-20 -bottom-20 h-60 w-60 rounded-full bg-primary/10 blur-[80px]" />
        <div className="relative z-10 flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div className="max-w-md space-y-1.5">
            <div className="flex items-center gap-2 text-primary">
              <Mail className="size-4.5" />
              <h3 className="font-bold text-sm uppercase tracking-wide">Product Updates</h3>
            </div>
            <h4 className="font-bold text-lg text-zinc-900 dark:text-zinc-50">Subscribe to our newsletter</h4>
            <p className="text-muted-foreground text-xs leading-relaxed">
              Get notified immediately whenever we release new templates, custom dashboards, theme presets, or code
              updates.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="flex w-full max-w-md items-center gap-2 md:w-auto">
            {isSubscribed ? (
              <Button
                type="button"
                disabled
                className="w-full gap-1.5 bg-emerald-600 font-semibold text-white sm:w-auto dark:bg-emerald-500"
              >
                <Check className="size-4" />
                Subscribed
              </Button>
            ) : (
              <div className="flex w-full flex-col gap-2 sm:flex-row">
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  disabled={isSubmitting}
                  className="h-10 min-w-[200px] rounded-lg border border-border/40 bg-card/60 px-3 text-xs backdrop-blur-md focus-visible:border-primary/50 focus-visible:ring-primary/20"
                />
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="shrink-0 gap-1.5 bg-primary font-semibold text-primary-foreground hover:bg-primary/90"
                >
                  {isSubmitting ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <>
                      Subscribe
                      <ArrowRight className="size-3.5" />
                    </>
                  )}
                </Button>
              </div>
            )}
          </form>
        </div>
      </Card>
    </div>
  );
}
