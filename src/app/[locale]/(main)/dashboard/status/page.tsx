"use client";

import { useEffect, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  AlertTriangle,
  Check,
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
    <div className="flex flex-col gap-6 max-w-7xl pb-10">
      {/* Header with action controllers */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">System Status</h1>
          <p className="text-muted-foreground text-sm">Real-time health of all Dashdeck services.</p>
        </div>

        <div className="flex flex-wrap items-center gap-4 bg-card/40 border border-border/30 px-4 py-2.5 rounded-2xl backdrop-blur-md">
          {/* Outage simulator switch */}
          <div className="flex items-center space-x-2">
            <Switch id="outage-simulator" checked={simulateOutage} onCheckedChange={handleOutageToggle} />
            <Label
              htmlFor="outage-simulator"
              className="text-xs font-semibold text-zinc-650 dark:text-zinc-350 cursor-pointer flex items-center gap-1"
            >
              {simulateOutage && <Flame className="size-3.5 text-amber-500 animate-pulse" />}
              Outage Simulator
            </Label>
          </div>

          <div className="h-4 w-px bg-border/40" />

          {/* Diagnostics Button */}
          <Button
            onClick={handleRunDiagnostics}
            disabled={isChecking}
            size="sm"
            className="h-8 font-semibold text-xs gap-1.5"
          >
            <RefreshCw className={cn("size-3.5", isChecking && "animate-spin")} />
            {isChecking ? "Pinging..." : "Check Latency"}
          </Button>
        </div>
      </div>

      {/* Main Operational Banner */}
      <Card
        className={cn(
          "transition-all duration-500 shadow-xs rounded-2xl overflow-hidden relative border",
          simulateOutage
            ? "border-amber-500/30 bg-amber-500/5 dark:bg-amber-500/10"
            : "border-emerald-500/20 bg-emerald-500/5 dark:bg-emerald-500/10",
        )}
      >
        <div
          className={cn(
            "absolute -right-20 -bottom-20 w-60 h-60 blur-[80px] rounded-full pointer-events-none transition-all duration-500",
            simulateOutage ? "bg-amber-500/15" : "bg-emerald-500/15",
          )}
        />

        <CardContent className="flex items-center gap-4 p-5 z-10 relative">
          <div className="relative flex size-4.5 shrink-0 items-center justify-center">
            <span
              className={cn(
                "animate-ping absolute inline-flex h-3 w-3 rounded-full opacity-75",
                simulateOutage ? "bg-amber-500" : "bg-emerald-500",
              )}
            />
            <span
              className={cn(
                "relative inline-flex rounded-full h-3.5 w-3.5 border border-white/20",
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
                "text-xs font-medium mt-0.5 transition-colors duration-500",
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
            className="border-border/40 bg-card/65 backdrop-blur-md hover:bg-card hover:border-border/80 hover:shadow-md hover:shadow-black/5 dark:hover:shadow-black/20 hover:-translate-y-[1px] transition-all duration-300 rounded-2xl overflow-hidden"
          >
            <CardContent className="flex items-start gap-4 p-4">
              <div
                className={cn(
                  "flex size-11 items-center justify-center rounded-xl border shrink-0 transition-colors duration-300",
                  svc.status === "outage"
                    ? "bg-rose-500/10 border-rose-500/20 text-rose-500"
                    : svc.status === "degraded"
                      ? "bg-amber-500/10 border-amber-500/20 text-amber-500"
                      : "bg-zinc-100 dark:bg-zinc-800 text-zinc-650 dark:text-zinc-350 border-border/40",
                )}
              >
                <svc.icon className="size-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-semibold text-sm text-zinc-900 dark:text-zinc-50 truncate">{svc.name}</span>

                  {svc.status === "outage" ? (
                    <Badge
                      className="bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 font-bold text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-md gap-1 shrink-0"
                      variant="outline"
                    >
                      <span className="size-1 rounded-full bg-rose-500 animate-pulse" />
                      Outage
                    </Badge>
                  ) : svc.status === "degraded" ? (
                    <Badge
                      className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 font-bold text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-md gap-1 shrink-0"
                      variant="outline"
                    >
                      <span className="size-1 rounded-full bg-amber-500 animate-pulse" />
                      Degraded
                    </Badge>
                  ) : (
                    <Badge
                      className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-bold text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-md gap-1 shrink-0"
                      variant="outline"
                    >
                      <span className="size-1 rounded-full bg-emerald-500" />
                      Active
                    </Badge>
                  )}
                </div>
                <div className="mt-2 flex items-center justify-between text-muted-foreground text-xs font-semibold">
                  <div className="flex items-center gap-1">
                    <Activity className="size-3 text-muted-foreground/50" />
                    <span>{svc.uptime} uptime</span>
                  </div>
                  <span
                    className={cn(
                      "font-mono text-[10px] px-1.5 py-0.5 rounded-md border transition-all duration-300",
                      svc.status === "outage"
                        ? "bg-rose-500/5 text-rose-500 border-rose-500/15"
                        : svc.status === "degraded"
                          ? "bg-amber-500/5 text-amber-500 border-amber-500/15"
                          : "bg-muted/65 text-zinc-500 dark:text-zinc-400 border-border/20",
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
        <Card className="xl:col-span-7 border-border/40 bg-card/45 backdrop-blur-md rounded-2xl shadow-xs">
          <CardHeader className="border-b border-border/30 bg-muted/20 px-6 py-4">
            <CardTitle className="text-lg font-bold text-zinc-900 dark:text-zinc-50">90-Day Uptime</CardTitle>
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
                  className="text-[10px] font-medium"
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

        <Card className="xl:col-span-5 border-border/40 bg-card/45 backdrop-blur-md rounded-2xl shadow-xs">
          <CardHeader className="border-b border-border/30 bg-muted/20 px-6 py-4">
            <CardTitle className="text-lg font-bold text-zinc-900 dark:text-zinc-50">Recent Incidents</CardTitle>
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
                        : "border-border/30 bg-zinc-50/50 dark:bg-zinc-900/30 hover:border-border/60",
                    )}
                  >
                    {inc.status === "investigating" ? (
                      <AlertTriangle className="size-4 text-rose-500 mt-0.5 shrink-0 animate-pulse" />
                    ) : (
                      <CheckCircle className="size-4 text-emerald-500 mt-0.5 shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-150 truncate leading-snug">
                        {inc.title}
                      </p>
                      <div className="mt-1 flex items-center gap-2 text-muted-foreground text-xs font-semibold">
                        <span>{inc.date}</span>
                        <span>·</span>
                        <span
                          className={cn(
                            "font-mono text-[10px] px-1.5 py-0.5 rounded-md border",
                            inc.status === "investigating"
                              ? "bg-rose-500/10 text-rose-600 dark:text-rose-450 border-rose-500/20"
                              : "bg-muted/60 text-zinc-500 dark:text-zinc-400 border-border/20",
                          )}
                        >
                          {inc.duration}
                        </span>

                        {inc.status === "investigating" && (
                          <Badge className="bg-rose-500 text-white font-bold text-[8px] uppercase tracking-wider px-1 py-0 rounded-sm shrink-0">
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
