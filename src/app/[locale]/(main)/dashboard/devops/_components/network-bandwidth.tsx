"use client";

import { useState } from "react";

import { Activity, ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { time: "10:00", ingress: 142, egress: 98 },
  { time: "11:00", ingress: 168, egress: 112 },
  { time: "12:00", ingress: 245, egress: 154 },
  { time: "13:00", ingress: 290, egress: 180 },
  { time: "14:00", ingress: 185, egress: 132 },
  { time: "15:00", ingress: 210, egress: 145 },
  { time: "16:00", ingress: 310, egress: 210 },
  { time: "17:00", ingress: 345, egress: 260 },
  { time: "18:00", ingress: 280, egress: 198 },
  { time: "19:00", ingress: 220, egress: 162 },
  { time: "20:00", ingress: 195, egress: 140 },
  { time: "21:00", ingress: 160, egress: 105 },
];

const chartConfig = {
  ingress: { label: "Ingress", color: "var(--chart-4)" },
  egress: { label: "Egress", color: "var(--chart-1)" },
} satisfies ChartConfig;

export function NetworkBandwidth() {
  const [filter, setFilter] = useState<"all" | "ingress" | "egress">("all");

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="size-5 text-[#06B6D4]" />
          Network Bandwidth
        </CardTitle>
        <CardDescription>Real-time ingress and egress throughput</CardDescription>
        <CardAction>
          <div className="flex rounded-lg border bg-muted/30 p-0.5 text-xs">
            <button
              onClick={() => setFilter("all")}
              className={`rounded-md px-2.5 py-1 transition-colors ${filter === "all" ? "bg-card font-medium text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("ingress")}
              className={`rounded-md px-2.5 py-1 transition-colors ${filter === "ingress" ? "bg-card font-medium text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
            >
              Ingress
            </button>
            <button
              onClick={() => setFilter("egress")}
              className={`rounded-md px-2.5 py-1 transition-colors ${filter === "egress" ? "bg-card font-medium text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
            >
              Egress
            </button>
          </div>
        </CardAction>
      </CardHeader>

      <CardContent>
        {/* Top summary row */}
        <div className="mb-6 grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3 rounded-xl border bg-muted/10 p-3">
            <div className="flex size-9 items-center justify-center rounded-lg bg-[#06B6D4]/10 text-[#06B6D4]">
              <ArrowDownLeft className="size-5" />
            </div>
            <div>
              <span className="block font-medium text-[10px] text-muted-foreground">Avg Ingress</span>
              <span className="font-bold text-lg tabular-nums">229.6 Mb/s</span>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-xl border bg-muted/10 p-3">
            <div className="flex size-9 items-center justify-center rounded-lg bg-[#8B5CF6]/10 text-[#8B5CF6]">
              <ArrowUpRight className="size-5" />
            </div>
            <div>
              <span className="block font-medium text-[10px] text-muted-foreground">Avg Egress</span>
              <span className="font-bold text-lg tabular-nums:">155.5 Mb/s</span>
            </div>
          </div>
        </div>

        <ChartContainer config={chartConfig} className="aspect-auto h-72 w-full">
          <AreaChart data={chartData} margin={{ top: 0, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="fillIngress" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-ingress)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="var(--color-ingress)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="fillEgress" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-egress)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="var(--color-egress)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeOpacity={0.5} />
            <XAxis dataKey="time" tickLine={false} axisLine={false} tickMargin={8} />
            <YAxis tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(val) => `${val} Mb/s`} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent className="w-40" indicator="dot" />} />
            <ChartLegend verticalAlign="top" content={<ChartLegendContent className="mb-5 justify-end" />} />

            {(filter === "all" || filter === "ingress") && (
              <Area
                dataKey="ingress"
                type="monotone"
                fill="url(#fillIngress)"
                stroke="var(--color-ingress)"
                strokeWidth={1.5}
                dot={false}
              />
            )}
            {(filter === "all" || filter === "egress") && (
              <Area
                dataKey="egress"
                type="monotone"
                fill="url(#fillEgress)"
                stroke="var(--color-egress)"
                strokeWidth={1.5}
                dot={false}
              />
            )}
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
