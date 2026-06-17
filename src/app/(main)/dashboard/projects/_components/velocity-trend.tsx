"use client";

import { Bar, BarChart, CartesianGrid, XAxis, Line, ComposedChart } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const chartData = [
  { sprint: "Sprint 8", points: 85, velocity: 85, trend: 82 },
  { sprint: "Sprint 9", points: 92, velocity: 92, trend: 85 },
  { sprint: "Sprint 10", points: 78, velocity: 78, trend: 88 },
  { sprint: "Sprint 11", points: 95, velocity: 95, trend: 91 },
  { sprint: "Sprint 12", points: 88, velocity: 88, trend: 93 },
];

const chartConfig = {
  points: { label: "Points Completed", color: "var(--chart-1)" },
  trend: { label: "Velocity Trend", color: "var(--chart-2)" },
} satisfies ChartConfig;

export function VelocityTrend() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sprint Velocity</CardTitle>
        <CardDescription>Story points completed per sprint</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="aspect-auto h-56 w-full">
          <ComposedChart data={chartData} margin={{ top: 0 }}>
            <CartesianGrid vertical={false} strokeOpacity={0.5} />
            <XAxis dataKey="sprint" tickLine={false} axisLine={false} tickMargin={8} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent className="w-36" />} />
            <Bar dataKey="points" fill="var(--chart-1)" radius={[4, 4, 0, 0]} />
            <Line dataKey="trend" type="monotone" stroke="hsl(var(--chart-2))" strokeWidth={2} dot={false} />
          </ComposedChart>
        </ChartContainer>
        <div className="mt-2 flex items-center gap-4 text-muted-foreground text-xs">
          <span>Avg Velocity: 87.6 pts/sprint</span>
          <span>Trend: ↑ Increasing</span>
        </div>
      </CardContent>
    </Card>
  );
}
