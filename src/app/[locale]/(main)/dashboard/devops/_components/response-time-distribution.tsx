"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const chartData = [
  { range: "0-10ms", count: 3400, color: "var(--chart-1)" },
  { range: "10-25ms", count: 5200, color: "var(--chart-1)" },
  { range: "25-50ms", count: 2800, color: "var(--chart-2)" },
  { range: "50-100ms", count: 1200, color: "var(--chart-2)" },
  { range: "100-250ms", count: 450, color: "var(--chart-3)" },
  { range: "250-500ms", count: 120, color: "var(--chart-3)" },
  { range: "500+ms", count: 30, color: "var(--chart-4)" },
];

const chartConfig = {
  count: { label: "Requests", color: "var(--chart-1)" },
} satisfies ChartConfig;

export function ResponseTimeDistribution() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Response Time Distribution</CardTitle>
        <CardDescription>API response time histogram</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-48 w-full">
          <BarChart data={chartData} margin={{ top: 0 }}>
            <CartesianGrid vertical={false} strokeOpacity={0.5} />
            <XAxis dataKey="range" tickLine={false} axisLine={false} tickMargin={8} tick={{ fontSize: 11 }} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent className="w-36" />} />
            <Bar dataKey="count" fill="var(--chart-1)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartContainer>
        <div className="mt-2 flex items-center justify-between text-muted-foreground text-xs">
          <span>P50: 18ms</span>
          <span>P95: 120ms</span>
          <span>P99: 380ms</span>
        </div>
      </CardContent>
    </Card>
  );
}
