"use client";

import { useEffect, useRef, useState } from "react";

import { Pause, Play, Terminal, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TraceLine {
  id: string;
  timestamp: string;
  level: "info" | "thought" | "tool" | "success" | "error";
  message: string;
}

const traceSimulations: Omit<TraceLine, "id" | "timestamp">[] = [
  { level: "info", message: "Initialising Outreach Campaign Agent..." },
  { level: "info", message: "Configuring LLM context parameters. Model: Claude 3.5 Sonnet." },
  { level: "thought", message: "Goal: Find prospective leads for Enterprise SaaS product and compose custom emails." },
  { level: "thought", message: "Step 1: Query local contacts list for leads in 'FinTech' sector." },
  { level: "tool", message: "Invoking Database Search Tool: Query = { sector: 'FinTech', size: '100-500' }" },
  { level: "info", message: "Database returned 3 prospect records: Tarun (Dashdeck), John (Stripe), Alice (Plaid)." },
  { level: "thought", message: "Step 2: Inspect LinkedIn public profile metrics for Tarun (Dashdeck)." },
  { level: "tool", message: "Invoking Web Scraper Tool: URL = 'https://linkedin.com/in/tarun-verma-dashdeck'" },
  {
    level: "info",
    message: "Scraped summary: 'Lead Dev of Dashdeck. Currently migrating to Tailwind v4 and React 19.'",
  },
  {
    level: "thought",
    message: "Step 3: Personalize pitch template based on Tailwind v4 and React 19 migration context.",
  },
  {
    level: "thought",
    message:
      "Drafting email copy: 'Hi Tarun, congrats on the Tailwind v4 migration at Dashdeck! Saw you are using React 19...'",
  },
  { level: "tool", message: "Invoking Mail Client Tool: Action = DraftEmail, Recipient = 'tarun@dashdeck.com'" },
  { level: "success", message: "Draft saved successfully. Draft ID: drf_9273a812." },
  { level: "thought", message: "Next Lead: John (Stripe). Retrieve latest public tweets." },
  { level: "tool", message: "Invoking X (Twitter) API: Query = 'from:john stripe devops'" },
  { level: "error", message: "Rate limit hit for X API (Code: 429). Backing off for 1.5s." },
  { level: "info", message: "Retrying Twitter query..." },
  { level: "info", message: "Scraped summary: 'Interested in Docker optimizations and container security.'" },
  { level: "thought", message: "Drafting pitch regarding DevOps optimizations for John." },
  { level: "tool", message: "Invoking Mail Client Tool: Action = DraftEmail, Recipient = 'john@stripe.com'" },
  { level: "success", message: "Draft saved successfully. Draft ID: drf_1182bc83." },
  { level: "info", message: "All targets processed. Compiling run statistics..." },
  { level: "success", message: "Agent run completed successfully. 2/2 targets drafted." },
];

export function AgentTraces() {
  const [logs, setLogs] = useState<TraceLine[]>([]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentIdx, setCurrentIdx] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (logs.length === 0) {
      const initialLogs = traceSimulations.slice(0, 4).map((sim, idx) => ({
        id: `init-${idx}`,
        timestamp: new Date(Date.now() - (4 - idx) * 1000).toLocaleTimeString(),
        ...sim,
      }));
      setLogs(initialLogs);
      setCurrentIdx(4);
    }
  }, [logs.length]);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      if (currentIdx >= traceSimulations.length) {
        // Reset simulation after finishing
        setLogs([]);
        setCurrentIdx(0);
        return;
      }

      const nextLog = traceSimulations[currentIdx];
      const newTrace: TraceLine = {
        id: Math.random().toString(),
        timestamp: new Date().toLocaleTimeString(),
        ...nextLog,
      };

      setLogs((prev) => [...prev, newTrace]);
      setCurrentIdx((prev) => prev + 1);
    }, 2500);

    return () => clearInterval(interval);
  }, [isPlaying, currentIdx]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const clearLogs = () => {
    setLogs([]);
    setCurrentIdx(0);
  };

  const getLevelStyle = (level: TraceLine["level"]) => {
    switch (level) {
      case "thought":
        return "text-[#8B5CF6] font-medium";
      case "tool":
        return "text-cyan-400";
      case "success":
        return "text-emerald-400 font-semibold";
      case "error":
        return "text-rose-400 font-semibold";
      default:
        return "text-gray-400";
    }
  };

  return (
    <Card className="flex h-full flex-col border-border/40">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <div className="space-y-1">
          <CardTitle className="flex items-center gap-2 text-xl">
            <Terminal className="size-5 text-[#8B5CF6]" />
            Agent Trace Console
          </CardTitle>
          <CardDescription>Live execution logs and internal reasoning loops</CardDescription>
        </div>
        <CardAction className="flex gap-2">
          <Button size="sm" variant="outline" onClick={() => setIsPlaying(!isPlaying)} className="h-8 gap-1.5 text-xs">
            {isPlaying ? (
              <>
                <Pause className="size-3" />
                Pause
              </>
            ) : (
              <>
                <Play className="size-3" />
                Resume
              </>
            )}
          </Button>
          <Button size="icon" variant="outline" onClick={clearLogs} className="size-8" title="Clear logs">
            <Trash2 className="size-4" />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="flex min-h-[400px] flex-1 flex-col justify-end overflow-hidden rounded-xl border bg-black p-4 font-mono text-xs leading-relaxed dark:bg-[#04040A]">
        <ScrollArea className="flex-1 pr-2">
          <div className="flex flex-col gap-2.5">
            {logs.map((log) => (
              <div key={log.id} className="flex items-start gap-2.5">
                <span className="shrink-0 select-none text-gray-600">{log.timestamp}</span>
                <span className={`shrink-0 select-none font-semibold uppercase ${getLevelStyle(log.level)}`}>
                  [{log.level}]
                </span>
                <span className={log.level === "thought" ? "text-gray-300 italic" : "text-gray-200"}>
                  {log.message}
                </span>
              </div>
            ))}
            <div ref={scrollRef} />
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
