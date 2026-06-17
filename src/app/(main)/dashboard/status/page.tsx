"use client";

import { CheckCircle, AlertTriangle, XCircle, Clock, Server, Database, Globe, Cloud } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const services = [
  { name: "Web Dashboard", uptime: "99.99%", status: "operational", latency: "45ms", icon: Globe },
  { name: "API Gateway", uptime: "99.95%", status: "operational", latency: "32ms", icon: Server },
  { name: "Database Cluster", uptime: "99.97%", status: "operational", latency: "8ms", icon: Database },
  { name: "File Storage", uptime: "99.98%", status: "operational", latency: "28ms", icon: Cloud },
  { name: "Authentication", uptime: "100%", status: "operational", latency: "15ms", icon: CheckCircle },
];

const uptimeData = [
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

const chartConfig = {
  uptime: {
    label: "Uptime",
    color: "var(--foreground)",
  },
} satisfies ChartConfig;

const incidents = [
  { date: "Jun 11", title: "Minor API latency spike", status: "resolved", duration: "12 min" },
  { date: "May 28", title: "Scheduled database maintenance", status: "completed", duration: "45 min" },
  { date: "May 15", title: "CDN cache propagation delay", status: "resolved", duration: "8 min" },
];

export default function Page() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">System Status</h1>
        <p className="text-muted-foreground text-sm">Real-time health of all Dashdeck services.</p>
      </div>

      <Card className="border-border bg-muted/40">
        <CardContent className="flex items-center gap-4 p-5">
          <div className="flex size-4 rounded-full bg-foreground border border-foreground/30 animate-pulse" />
          <div>
            <p className="font-semibold text-foreground">All Systems Operational</p>
            <p className="text-muted-foreground text-sm">No incidents reported. Last updated: Just now</p>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {services.map((svc) => (
          <Card key={svc.name}>
            <CardContent className="flex items-start gap-3 p-4">
              <div className="flex size-10 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                <svc.icon className="size-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm">{svc.name}</span>
                  <div className="size-1.5 rounded-full bg-foreground" />
                </div>
                <div className="mt-1 text-muted-foreground text-xs">
                  <span>{svc.uptime} uptime</span>
                  <span className="mx-1">·</span>
                  <span>{svc.latency}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        <Card className="xl:col-span-7">
          <CardHeader>
            <CardTitle>90-Day Uptime</CardTitle>
            <CardDescription>Daily uptime percentage history</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="aspect-auto h-32 w-full">
              <AreaChart data={uptimeData} margin={{ left: 0, right: 0, top: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="fillUptime" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--foreground)" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="var(--foreground)" stopOpacity={0.01} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} strokeOpacity={0.1} />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  minTickGap={24}
                />
                <YAxis
                  domain={[99.5, 100.01]}
                  hide
                />
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
                  stroke="var(--foreground)"
                  strokeWidth={1.5}
                  dot={false}
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="xl:col-span-5">
          <CardHeader>
            <CardTitle>Recent Incidents</CardTitle>
            <CardDescription>Resolved issues</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              {incidents.map((inc) => (
                <div key={inc.title} className="flex items-start gap-3 rounded-lg border p-3">
                  <CheckCircle className="size-4 text-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">{inc.title}</p>
                    <p className="text-muted-foreground text-xs">{inc.date} · {inc.duration}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
