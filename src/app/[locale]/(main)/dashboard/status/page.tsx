"use client";

import { useEffect, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  AlertTriangle,
  CheckCircle,
  Cloud,
  Cpu,
  Database,
  Flame,
  Globe,
  RefreshCw,
  Server,
  ShieldCheck,
} from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

const defaultServices = [
  {
    id: "web",
    name: "Web Dashboard",
    uptime: "99.99%",
    status: "operational",
    latency: "45ms",
    baseLatency: 45,
    icon: Globe,
  },
  {
    id: "api",
    name: "API Gateway",
    uptime: "99.95%",
    status: "operational",
    latency: "32ms",
    baseLatency: 32,
    icon: Server,
  },
  {
    id: "db",
    name: "Database Cluster",
    uptime: "99.97%",
    status: "operational",
    latency: "8ms",
    baseLatency: 8,
    icon: Database,
  },
  {
    id: "storage",
    name: "File Storage",
    uptime: "99.98%",
    status: "operational",
    latency: "28ms",
    baseLatency: 28,
    icon: Cloud,
  },
  {
    id: "auth",
    name: "Authentication API",
    uptime: "100.00%",
    status: "operational",
    latency: "15ms",
    baseLatency: 15,
    icon: ShieldCheck,
  },
  {
    id: "workers",
    name: "Background Workers",
    uptime: "99.90%",
    status: "operational",
    latency: "120ms",
    baseLatency: 120,
    icon: Cpu,
  },
];

const defaultUptimeData = [
  { date: "Jun 01", uptime: 100 },
  { date: "Jun 02", uptime: 99.98 },
  { date: "Jun 03", uptime: 99.99 },
  { date: "Jun 04", uptime: 100 },
  { date: "Jun 05", uptime: 100 },
  { date: "Jun 06", uptime: 99.97 },
  { date: "Jun 07", uptime: 99.99 },
  { date: "Jun 08", uptime: 100 },
  { date: "Jun 09", uptime: 100 },
  { date: "Jun 10", uptime: 99.99 },
  { date: "Jun 11", uptime: 99.95 },
  { date: "Jun 12", uptime: 99.98 },
  { date: "Jun 13", uptime: 100 },
  { date: "Jun 14", uptime: 100 },
  { date: "Jun 15", uptime: 99.99 },
  { date: "Jun 16", uptime: 100 },
];

const defaultIncidents = [
  { id: "inc-1", date: "Jun 11", title: "Minor API latency spike", status: "resolved", duration: "12 min" },
  { id: "inc-2", date: "May 28", title: "Scheduled database maintenance", status: "completed", duration: "45 min" },
  { id: "inc-3", date: "May 15", title: "CDN cache propagation delay", status: "resolved", duration: "8 min" },
];

const chartConfig = {
  uptime: {
    label: "Uptime",
    color: "var(--primary)",
  },
} satisfies ChartConfig;

export default function Page() {
  const [simulateOutage, setSimulateOutage] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [lastChecked, setLastChecked] = useState("Just now");
  const [pings, setPings] = useState<Record<string, number>>({});

  // Initialize and randomize pings on diagnostic checks
  useEffect(() => {
    const initialPings: Record<string, number> = {};
    for (const s of defaultServices) {
      initialPings[s.id] = s.baseLatency;
    }
    setPings(initialPings);
  }, []);

  const handleRunDiagnostics = () => {
    setIsChecking(true);
    toast.loading("Initiating core systems check...", { id: "diag-check" });

    // Simulate real-time pings during checking
    const pingInterval = setInterval(() => {
      setPings((prev) => {
        const next = { ...prev };
        for (const key of Object.keys(next)) {
          const base = defaultServices.find((s) => s.id === key)?.baseLatency || 30;
          next[key] = Math.round(base + (Math.random() * 10 - 5));
        }
        return next;
      });
    }, 150);

    setTimeout(() => {
      clearInterval(pingInterval);
      setIsChecking(false);

      const now = new Date();
      setLastChecked(now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }));

      if (simulateOutage) {
        toast.error("Diagnostics finished. Warnings identified.", { id: "diag-check" });
      } else {
        toast.success("All checks completed. Systems operating normally.", { id: "diag-check" });
      }
    }, 1500);
  };

  // Switch handler for outage simulator
  const handleOutageToggle = (checked: boolean) => {
    setSimulateOutage(checked);
    if (checked) {
      toast.warning("Simulated outage mode enabled.");
    } else {
      toast.success("All systems restored to optimal parameters.");
    }
  };

  // Derive services state
  const services = defaultServices.map((svc) => {
    let latency = pings[svc.id] ? `${pings[svc.id]}ms` : svc.latency;
    let status = svc.status;
    let uptime = svc.uptime;

    if (simulateOutage) {
      if (svc.id === "workers") {
        status = "outage";
        uptime = "93.44%";
        latency = "1150ms";
      } else if (svc.id === "api") {
        status = "degraded";
        uptime = "97.10%";
        latency = "480ms";
      }
    }

    return { ...svc, status, uptime, latency };
  });

  // Derive incidents list
  const incidents = simulateOutage
    ? [
        {
          id: "sim-1",
          date: "Today, Just now",
          title: "Background Workers major outage & API Gateway latency spike",
          status: "investigating",
          duration: "Active",
        },
        ...defaultIncidents,
      ]
    : defaultIncidents;

  // Derive chart data (uptime dips slightly in outage mode)
  const uptimeData = simulateOutage
    ? defaultUptimeData.map((d, i) => (i === defaultUptimeData.length - 1 ? { ...d, uptime: 98.42 } : d))
    : defaultUptimeData;

  return (
    <div className="flex max-w-7xl flex-col gap-6 pb-10">
      {/* Header with action controllers */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-bold text-3xl tracking-tight">System Status</h1>
          <p className="text-muted-foreground text-sm">Real-time health of all Dashdeck services.</p>
        </div>

        <div className="flex flex-wrap items-center gap-4 rounded-2xl border border-border/30 bg-card/40 px-4 py-2.5 backdrop-blur-md">
          {/* Outage simulator switch */}
          <div className="flex items-center space-x-2">
            <Switch id="outage-simulator" checked={simulateOutage} onCheckedChange={handleOutageToggle} />
            <Label
              htmlFor="outage-simulator"
              className="flex cursor-pointer items-center gap-1 font-semibold text-xs text-zinc-650 dark:text-zinc-350"
            >
              {simulateOutage && <Flame className="size-3.5 animate-pulse text-amber-500" />}
              Outage Simulator
            </Label>
          </div>

          <div className="h-4 w-px bg-border/40" />

          {/* Diagnostics Button */}
          <Button
            onClick={handleRunDiagnostics}
            disabled={isChecking}
            size="sm"
            className="h-8 gap-1.5 font-semibold text-xs"
          >
            <RefreshCw className={cn("size-3.5", isChecking && "animate-spin")} />
            {isChecking ? "Pinging..." : "Check Latency"}
          </Button>
        </div>
      </div>

      {/* Main Operational Banner */}
      <Card
        className={cn(
          "relative overflow-hidden rounded-2xl border shadow-xs transition-all duration-500",
          simulateOutage
            ? "border-amber-500/30 bg-amber-500/5 dark:bg-amber-500/10"
            : "border-emerald-500/20 bg-emerald-500/5 dark:bg-emerald-500/10",
        )}
      >
        <div
          className={cn(
            "pointer-events-none absolute -right-20 -bottom-20 h-60 w-60 rounded-full blur-[80px] transition-all duration-500",
            simulateOutage ? "bg-amber-500/15" : "bg-emerald-500/15",
          )}
        />

        <CardContent className="relative z-10 flex items-center gap-4 p-5">
          <div className="relative flex size-4.5 shrink-0 items-center justify-center">
            <span
              className={cn(
                "absolute inline-flex h-3 w-3 animate-ping rounded-full opacity-75",
                simulateOutage ? "bg-amber-500" : "bg-emerald-500",
              )}
            />
            <span
              className={cn(
                "relative inline-flex h-3.5 w-3.5 rounded-full border border-white/20",
                simulateOutage ? "bg-amber-500" : "bg-emerald-500",
              )}
            />
          </div>

          <div>
            <h3
              className={cn(
                "font-bold text-sm tracking-wide transition-colors duration-500",
                simulateOutage ? "text-amber-800 dark:text-amber-400" : "text-emerald-800 dark:text-emerald-400",
              )}
            >
              {simulateOutage ? "Partial System Disruption" : "All Systems Operational"}
            </h3>
            <p
              className={cn(
                "mt-0.5 font-medium text-xs transition-colors duration-500",
                simulateOutage
                  ? "text-amber-700/70 dark:text-amber-400/60"
                  : "text-emerald-700/70 dark:text-emerald-400/60",
              )}
            >
              {simulateOutage
                ? "Warning: Degradations detected in Background Workers and API Gateway. Engineers are checking."
                : `No active disruptions reported. Last checked: ${lastChecked}`}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Services Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((svc) => (
          <Card
            key={svc.name}
            className="overflow-hidden rounded-2xl border-border/40 bg-card/65 backdrop-blur-md transition-all duration-300 hover:-translate-y-[1px] hover:border-border/80 hover:bg-card hover:shadow-black/5 hover:shadow-md dark:hover:shadow-black/20"
          >
            <CardContent className="flex items-start gap-4 p-4">
              <div
                className={cn(
                  "flex size-11 shrink-0 items-center justify-center rounded-xl border transition-colors duration-300",
                  svc.status === "outage"
                    ? "border-rose-500/20 bg-rose-500/10 text-rose-500"
                    : svc.status === "degraded"
                      ? "border-amber-500/20 bg-amber-500/10 text-amber-500"
                      : "border-border/40 bg-zinc-100 text-zinc-650 dark:bg-zinc-800 dark:text-zinc-350",
                )}
              >
                <svc.icon className="size-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-3">
                  <span className="truncate font-semibold text-sm text-zinc-900 dark:text-zinc-50">{svc.name}</span>

                  {svc.status === "outage" ? (
                    <Badge
                      className="shrink-0 gap-1 rounded-md border border-rose-500/20 bg-rose-500/10 px-2 py-0.5 font-bold text-[9px] text-rose-600 uppercase tracking-wider dark:text-rose-400"
                      variant="outline"
                    >
                      <span className="size-1 animate-pulse rounded-full bg-rose-500" />
                      Outage
                    </Badge>
                  ) : svc.status === "degraded" ? (
                    <Badge
                      className="shrink-0 gap-1 rounded-md border border-amber-500/20 bg-amber-500/10 px-2 py-0.5 font-bold text-[9px] text-amber-600 uppercase tracking-wider dark:text-amber-400"
                      variant="outline"
                    >
                      <span className="size-1 animate-pulse rounded-full bg-amber-500" />
                      Degraded
                    </Badge>
                  ) : (
                    <Badge
                      className="shrink-0 gap-1 rounded-md border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 font-bold text-[9px] text-emerald-600 uppercase tracking-wider dark:text-emerald-400"
                      variant="outline"
                    >
                      <span className="size-1 rounded-full bg-emerald-500" />
                      Active
                    </Badge>
                  )}
                </div>
                <div className="mt-2 flex items-center justify-between font-semibold text-muted-foreground text-xs">
                  <div className="flex items-center gap-1">
                    <Activity className="size-3 text-muted-foreground/50" />
                    <span>{svc.uptime} uptime</span>
                  </div>
                  <span
                    className={cn(
                      "rounded-md border px-1.5 py-0.5 font-mono text-[10px] transition-all duration-300",
                      svc.status === "outage"
                        ? "border-rose-500/15 bg-rose-500/5 text-rose-500"
                        : svc.status === "degraded"
                          ? "border-amber-500/15 bg-amber-500/5 text-amber-500"
                          : "border-border/20 bg-muted/65 text-zinc-500 dark:text-zinc-400",
                    )}
                  >
                    {svc.latency}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Grid: 90-Day Uptime & Recent Incidents */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        <Card className="rounded-2xl border-border/40 bg-card/45 shadow-xs backdrop-blur-md xl:col-span-7">
          <CardHeader className="border-border/30 border-b bg-muted/20 px-6 py-4">
            <CardTitle className="font-bold text-lg text-zinc-900 dark:text-zinc-50">90-Day Uptime</CardTitle>
            <CardDescription>Daily uptime percentage history</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <ChartContainer config={chartConfig} className="aspect-auto h-36 w-full">
              <AreaChart data={uptimeData} margin={{ left: 0, right: 0, top: 4, bottom: 0 }}>
                <defs>
                  <linearGradient id="fillUptime" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor={simulateOutage ? "var(--warning, #eab308)" : "var(--primary)"}
                      stopOpacity={0.15}
                    />
                    <stop
                      offset="95%"
                      stopColor={simulateOutage ? "var(--warning, #eab308)" : "var(--primary)"}
                      stopOpacity={0.01}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} strokeOpacity={0.1} />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  minTickGap={24}
                  className="font-medium text-[10px]"
                />
                <YAxis domain={[98.0, 100.05]} hide />
                <ChartTooltip
                  cursor={false}
                  content={
                    <ChartTooltipContent
                      hideIndicator
                      labelFormatter={(value) => `Date: ${value}`}
                      formatter={(value) => [`${value}%`, "Uptime"]}
                    />
                  }
                />
                <Area
                  dataKey="uptime"
                  type="monotone"
                  fill="url(#fillUptime)"
                  stroke={simulateOutage ? "#eab308" : "var(--primary)"}
                  strokeWidth={2}
                  dot={false}
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-border/40 bg-card/45 shadow-xs backdrop-blur-md xl:col-span-5">
          <CardHeader className="border-border/30 border-b bg-muted/20 px-6 py-4">
            <CardTitle className="font-bold text-lg text-zinc-900 dark:text-zinc-50">Recent Incidents</CardTitle>
            <CardDescription>System incidents over the last 30 days</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex flex-col gap-3">
              <AnimatePresence mode="popLayout">
                {incidents.map((inc) => (
                  <motion.div
                    key={inc.id}
                    layout
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className={cn(
                      "flex items-start gap-3 rounded-xl border p-3 transition-colors duration-300",
                      inc.status === "investigating"
                        ? "border-rose-500/20 bg-rose-500/5 hover:border-rose-500/40"
                        : "border-border/30 bg-zinc-50/50 hover:border-border/60 dark:bg-zinc-900/30",
                    )}
                  >
                    {inc.status === "investigating" ? (
                      <AlertTriangle className="mt-0.5 size-4 shrink-0 animate-pulse text-rose-500" />
                    ) : (
                      <CheckCircle className="mt-0.5 size-4 shrink-0 text-emerald-500" />
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-semibold text-sm text-zinc-900 leading-snug dark:text-zinc-150">
                        {inc.title}
                      </p>
                      <div className="mt-1 flex items-center gap-2 font-semibold text-muted-foreground text-xs">
                        <span>{inc.date}</span>
                        <span>·</span>
                        <span
                          className={cn(
                            "rounded-md border px-1.5 py-0.5 font-mono text-[10px]",
                            inc.status === "investigating"
                              ? "border-rose-500/20 bg-rose-500/10 text-rose-600 dark:text-rose-450"
                              : "border-border/20 bg-muted/60 text-zinc-500 dark:text-zinc-400",
                          )}
                        >
                          {inc.duration}
                        </span>

                        {inc.status === "investigating" && (
                          <Badge className="shrink-0 rounded-sm bg-rose-500 px-1 py-0 font-bold text-[8px] text-white uppercase tracking-wider">
                            Investigating
                          </Badge>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
