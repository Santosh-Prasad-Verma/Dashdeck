"use client";

import { Line, LineChart, CartesianGrid, XAxis } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown } from "lucide-react";

const conversionData = [
  { date: "Jan", signups: 1200, purchases: 320, revenue: 12800 },
  { date: "Feb", signups: 1400, purchases: 380, revenue: 15200 },
  { date: "Mar", signups: 1600, purchases: 420, revenue: 16800 },
  { date: "Apr", signups: 1800, purchases: 480, revenue: 19200 },
  { date: "May", signups: 2100, purchases: 560, revenue: 22400 },
  { date: "Jun", signups: 2400, purchases: 640, revenue: 25600 },
];

const funnelData = [
  { stage: "Visitors", count: 24000, percentage: 100 },
  { stage: "Signups", count: 4800, percentage: 20 },
  { stage: "Activated", count: 2400, percentage: 10 },
  { stage: "Subscribed", count: 960, percentage: 4 },
  { stage: "Paid", count: 480, percentage: 2 },
];

const goalData = [
  { goal: "Monthly Signups", target: 3000, current: 2400, status: "on-track" },
  { goal: "Conversion Rate", target: 5.0, current: 4.2, status: "behind" },
  { goal: "Revenue Target", target: 50000, current: 42000, status: "on-track" },
  { goal: "Retention Rate", target: 85, current: 82, status: "behind" },
  { goal: "NPS Score", target: 70, current: 72, status: "ahead" },
];

const chartConfig = {
  signups: {
    label: "Signups",
    color: "var(--chart-1)",
  },
  purchases: {
    label: "Purchases",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

function getStatusBadge(status: string) {
  switch (status) {
    case "ahead":
      return <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">Ahead</Badge>;
    case "on-track":
      return <Badge className="bg-blue-500/10 text-blue-600 dark:text-blue-400">On Track</Badge>;
    case "behind":
      return <Badge className="bg-amber-500/10 text-amber-600 dark:text-amber-400">Behind</Badge>;
    default:
      return <Badge variant="secondary">Unknown</Badge>;
  }
}

export function ConversionsView() {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Visitors</CardDescription>
            <CardTitle className="text-2xl tabular-nums">24,000</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-1 text-emerald-600 text-sm">
              <TrendingUp className="size-3" />
              +12.5%
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Conversion Rate</CardDescription>
            <CardTitle className="text-2xl tabular-nums">4.2%</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-1 text-emerald-600 text-sm">
              <TrendingUp className="size-3" />
              +0.8%
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Revenue</CardDescription>
            <CardTitle className="text-2xl tabular-nums">$42,000</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-1 text-emerald-600 text-sm">
              <TrendingUp className="size-3" />
              +18.2%
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Avg Order Value</CardDescription>
            <CardTitle className="text-2xl tabular-nums">$87.50</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-1 text-red-600 text-sm">
              <TrendingDown className="size-3" />
              -2.1%
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Conversion Trend</CardTitle>
            <CardDescription>Signups vs purchases over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-64 w-full">
              <LineChart data={conversionData} margin={{ top: 0 }}>
                <CartesianGrid vertical={false} strokeOpacity={0.5} />
                <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent className="w-36" />}
                />
                <Line
                  dataKey="signups"
                  type="natural"
                  stroke="var(--color-signups)"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  dataKey="purchases"
                  type="natural"
                  stroke="var(--color-purchases)"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Conversion Funnel</CardTitle>
            <CardDescription>User journey from visit to payment</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              {funnelData.map((stage, index) => (
                <div key={stage.stage} className="flex items-center gap-4">
                  <div className="w-24 text-sm text-muted-foreground">{stage.stage}</div>
                  <div className="flex-1">
                    <div className="h-8 rounded-lg bg-muted/50 overflow-hidden">
                      <div
                        className="h-full rounded-lg bg-primary transition-all"
                        style={{ width: `${stage.percentage}%` }}
                      />
                    </div>
                  </div>
                  <div className="w-20 text-right">
                    <div className="font-medium text-sm tabular-nums">{stage.count.toLocaleString()}</div>
                    <div className="text-muted-foreground text-xs">{stage.percentage}%</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Goal Progress</CardTitle>
          <CardDescription>Track your conversion goals</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-3">
            {goalData.map((goal) => (
              <div
                key={goal.goal}
                className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-muted/50"
              >
                <div className="flex items-center gap-4">
                  <div className="font-medium text-sm">{goal.goal}</div>
                  {getStatusBadge(goal.status)}
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="text-right">
                    <div className="font-medium tabular-nums">
                      {typeof goal.current === "number" && goal.current > 1000
                        ? goal.current.toLocaleString()
                        : goal.current}
                      {goal.goal.includes("Rate") || goal.goal.includes("Retention") ? "%" : goal.goal.includes("Revenue") ? "" : ""}
                    </div>
                    <div className="text-muted-foreground text-xs">current</div>
                  </div>
                  <div className="text-right text-muted-foreground">
                    <div className="tabular-nums">
                      {typeof goal.target === "number" && goal.target > 1000
                        ? goal.target.toLocaleString()
                        : goal.target}
                      {goal.goal.includes("Rate") || goal.goal.includes("Retention") ? "%" : goal.goal.includes("Revenue") ? "" : ""}
                    </div>
                    <div className="text-xs">target</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
