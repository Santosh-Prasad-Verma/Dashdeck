"use client";

import { ArrowUpRight, Clock, Eye, MousePointerClick, Star, Timer } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const engagementData = [
  { date: "Jun 01", rate: 58.4 },
  { date: "Jun 02", rate: 60.1 },
  { date: "Jun 03", rate: 59.5 },
  { date: "Jun 04", rate: 61.2 },
  { date: "Jun 05", rate: 63.0 },
  { date: "Jun 06", rate: 62.4 },
  { date: "Jun 07", rate: 64.2 },
  { date: "Jun 08", rate: 65.5 },
  { date: "Jun 09", rate: 63.8 },
  { date: "Jun 10", rate: 64.9 },
  { date: "Jun 11", rate: 65.1 },
  { date: "Jun 12", rate: 66.8 },
  { date: "Jun 13", rate: 68.2 },
  { date: "Jun 14", rate: 67.5 },
  { date: "Jun 15", rate: 69.1 },
  { date: "Jun 16", rate: 70.5 },
];

const chartConfig = {
  rate: {
    label: "Engagement Rate",
    color: "var(--foreground)",
  },
} satisfies ChartConfig;

const topPages = [
  { path: "/dashboard/analytics", views: "12,450", duration: "3m 45s", rate: "72.4%" },
  { path: "/dashboard/finance", views: "9,820", duration: "4m 12s", rate: "68.9%" },
  { path: "/dashboard/healthcare", views: "8,140", duration: "2m 58s", rate: "54.1%" },
  { path: "/mail", views: "5,320", duration: "5m 20s", rate: "81.6%" },
  { path: "/chat", views: "4,190", duration: "6m 05s", rate: "85.2%" },
];

export function EngagementView() {
  return (
    <div className="relative w-full rounded-xl border border-border bg-background/50 overflow-hidden p-1">
      {/* Premium Frosted Glass Overlay */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-background/50 backdrop-blur-[3.5px] p-6 text-center">
        <div className="mx-auto max-w-sm rounded-xl border border-border bg-background/90 p-8 shadow-xl">
          <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-muted text-foreground border border-border mb-4">
            <Clock className="size-6 animate-pulse" />
          </div>
          <h3 className="font-semibold text-lg text-foreground tracking-tight">Engagement Analytics Coming Soon</h3>
          <p className="text-muted-foreground text-sm mt-2 mb-6 leading-normal">
            We are building advanced user engagement tracking, session analysis, and interactive heatmaps. Register to get notified when this releases.
          </p>
          <div className="flex flex-col gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-xs transition-colors placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring"
              disabled
            />
            <Button className="w-full bg-zinc-950 hover:bg-zinc-900 text-zinc-50 dark:bg-zinc-50 dark:hover:bg-zinc-200 dark:text-zinc-950 font-medium">
              Notify Me
            </Button>
          </div>
        </div>
      </div>

      {/* Blurred Mockup Dashboard Content */}
      <div className="flex flex-col gap-4 p-4 opacity-30 select-none pointer-events-none">
        {/* KPI Strip */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
              <MousePointerClick className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">70.5%</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                <span className="text-foreground flex items-center font-medium">
                  <ArrowUpRight className="size-3" /> +2.4%
                </span>
                <span>since last week</span>
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Avg. Session Duration</CardTitle>
              <Timer className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4m 32s</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                <span className="text-foreground flex items-center font-medium">
                  <ArrowUpRight className="size-3" /> +12s
                </span>
                <span>since last week</span>
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Bounce Rate</CardTitle>
              <Eye className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">38.4%</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                <span className="text-foreground flex items-center font-medium">
                  <ArrowUpRight className="size-3" /> -1.8%
                </span>
                <span>since last week</span>
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Pages per Session</CardTitle>
              <Star className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.2</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                <span className="text-foreground flex items-center font-medium">
                  <ArrowUpRight className="size-3" /> +0.3
                </span>
                <span>since last week</span>
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Chart + List Grid */}
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-12">
          {/* Main Area Chart (matches system status page style) */}
          <Card className="xl:col-span-7">
            <CardHeader>
              <CardTitle>Engagement History</CardTitle>
              <CardDescription>Daily engagement rate trend</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="aspect-auto h-[240px] w-full">
                <AreaChart data={engagementData} margin={{ left: 0, right: 0, top: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="fillEngagement" x1="0" y1="0" x2="0" y2="1">
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
                    domain={[50, 75]}
                    hide
                  />
                  <ChartTooltip
                    cursor={false}
                    content={
                      <ChartTooltipContent
                        hideIndicator
                        labelFormatter={(value) => `Date: ${value}`}
                        formatter={(value) => [`${value}%`, "Engagement"]}
                      />
                    }
                  />
                  <Area
                    dataKey="rate"
                    type="monotone"
                    fill="url(#fillEngagement)"
                    stroke="var(--foreground)"
                    strokeWidth={1.5}
                    dot={false}
                  />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Active Pages list */}
          <Card className="xl:col-span-5">
            <CardHeader>
              <CardTitle>Active Page Engagement</CardTitle>
              <CardDescription>Views and time spent by path</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                {topPages.map((page) => (
                  <div key={page.path} className="flex items-center justify-between border-b border-border/40 pb-3 last:border-0 last:pb-0">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-sm font-medium font-mono text-foreground truncate max-w-[180px] md:max-w-[240px]">
                        {page.path}
                      </span>
                      <span className="text-xs text-muted-foreground">{page.views} views</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold">{page.duration}</div>
                      <div className="text-xs text-muted-foreground">{page.rate} engagement</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
