"use client";

import { useState, useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sparkles, Zap, Bug, Rocket, Search, Mail, Loader2, ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

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
      { label: "feature", text: "Added 22 interactive dashboards including AI/LLM Analytics, DevOps Monitor, and Healthcare" },
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
      { label: "feature", text: "Interactive chart components with custom Recharts tooltips and theme-based area gradients" },
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
        <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-bold text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-md flex items-center gap-1 shrink-0">
          <Sparkles className="size-2.5 shrink-0" />
          New
        </Badge>
      );
    case "improvement": 
      return (
        <Badge className="bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 font-bold text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-md flex items-center gap-1 shrink-0">
          <Zap className="size-2.5 shrink-0" />
          Improved
        </Badge>
      );
    case "fix": 
      return (
        <Badge className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 font-bold text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-md flex items-center gap-1 shrink-0">
          <Bug className="size-2.5 shrink-0" />
          Fixed
        </Badge>
      );
    default: 
      return <Badge variant="secondary" className="font-bold text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-md shrink-0">{label}</Badge>;
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
    return releases.map((release) => {
      const filteredChanges = release.changes.filter((change) => {
        const matchesFilter = activeFilter === "all" || change.label === activeFilter;
        const matchesSearch = change.text.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
      });

      return {
        ...release,
        changes: filteredChanges,
      };
    }).filter((release) => release.changes.length > 0);
  }, [searchQuery, activeFilter]);

  // Highlighting matching search query
  const highlightText = (text: string, query: string) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return (
      <span>
        {parts.map((part, i) => 
          part.toLowerCase() === query.toLowerCase() ? (
            <mark key={i} className="bg-primary/20 text-primary-foreground dark:bg-primary/30 rounded px-0.5 font-medium">
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </span>
    );
  };

  return (
    <div className="flex flex-col gap-8 pb-12 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Changelog</h1>
        <p className="text-muted-foreground text-sm">Track updates, new features, and improvements.</p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <div className="flex flex-wrap gap-1">
          {(["all", "feature", "improvement", "fix"] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={cn(
                "px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition-all uppercase tracking-wider text-[10px]",
                activeFilter === filter
                  ? "bg-primary border-primary text-primary-foreground shadow-xs"
                  : "bg-muted/40 hover:bg-muted/70 text-muted-foreground border-border/20"
              )}
            >
              {filter === "all" ? "All Updates" : filter + "s"}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground/60" />
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search changes..."
            className="h-9 pl-9 pr-4 text-xs rounded-lg border border-border/50 bg-card/50 shadow-xs focus-visible:ring-primary/20 focus-visible:border-primary/50 backdrop-blur-md transition-all placeholder:text-muted-foreground/60 dark:bg-zinc-900/50"
          />
        </div>
      </div>

      {/* Timeline Wrapper */}
      <div className="relative pl-6 lg:pl-10 space-y-12">
        {/* Timeline vertical bar */}
        <div className="absolute left-2 lg:left-4 top-1 bottom-1 w-0.5 bg-gradient-to-b from-primary/50 via-zinc-200 to-zinc-200 dark:via-zinc-800 dark:to-zinc-900 pointer-events-none" />

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
                className="relative group"
              >
                {/* Timeline marker */}
                <div className="absolute -left-[30px] lg:-left-[28px] top-1.5 flex size-8 items-center justify-center rounded-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-950 dark:text-zinc-50 shadow-sm transition-all group-hover:border-primary/50 group-hover:text-primary group-hover:scale-110 duration-300 z-10">
                  <ReleaseIcon className="size-3.5" />
                </div>

                {/* Release Header Details */}
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1.5 mb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="font-bold text-xl text-zinc-950 dark:text-zinc-50">{release.version}</span>
                    <Badge 
                      variant="outline" 
                      className={cn(
                        "font-bold text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded-md border-border/40",
                        release.type === "release" 
                          ? "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20" 
                          : "bg-zinc-155 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                      )}
                    >
                      {release.type}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground text-xs font-semibold">{release.date}</p>
                </div>

                {/* Content Card */}
                <Card className="border border-border/30 bg-card/60 backdrop-blur-md shadow-xs group-hover:shadow-md group-hover:border-border/60 transition-all duration-300 rounded-2xl">
                  <CardContent className="p-5">
                    <div className="flex flex-col gap-4">
                      {release.changes.map((change, i) => (
                        <div key={i} className="flex items-start gap-3 text-sm leading-relaxed">
                          <div className="pt-0.5 shrink-0">{getBadge(change.label)}</div>
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
      <Card className="relative overflow-hidden border border-primary/20 bg-primary/[0.02] dark:bg-primary/[0.04] p-6 sm:p-8 rounded-2xl shadow-xs mt-4">
        <div className="absolute -right-20 -bottom-20 w-60 h-60 bg-primary/10 blur-[80px] rounded-full pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-md">
            <div className="flex items-center gap-2 text-primary">
              <Mail className="size-4.5" />
              <h3 className="font-bold text-sm tracking-wide uppercase">Product Updates</h3>
            </div>
            <h4 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">Subscribe to our newsletter</h4>
            <p className="text-muted-foreground text-xs leading-relaxed">
              Get notified immediately whenever we release new templates, custom dashboards, theme presets, or code updates.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="flex w-full md:w-auto items-center gap-2 max-w-md">
            {isSubscribed ? (
              <Button type="button" disabled className="bg-emerald-600 text-white dark:bg-emerald-500 font-semibold gap-1.5 w-full sm:w-auto">
                <Check className="size-4" />
                Subscribed
              </Button>
            ) : (
              <div className="flex flex-col sm:flex-row gap-2 w-full">
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  disabled={isSubmitting}
                  className="h-10 text-xs px-3 rounded-lg border border-border/40 bg-card/60 backdrop-blur-md focus-visible:ring-primary/20 focus-visible:border-primary/50 min-w-[200px]"
                />
                <Button 
                  type="submit" 
                  disabled={isSubmitting} 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold gap-1.5 shrink-0"
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
