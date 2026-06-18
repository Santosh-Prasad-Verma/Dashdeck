"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const chartData = [
  { time: "6 AM", engagement: 120, color: "var(--chart-1)" },
  { time: "8 AM", engagement: 280, color: "var(--chart-1)" },
  { time: "10 AM", engagement: 450, color: "var(--chart-2)" },
  { time: "12 PM", engagement: 680, color: "var(--chart-2)" },
  { time: "2 PM", engagement: 520, color: "var(--chart-2)" },
  { time: "4 PM", engagement: 720, color: "var(--chart-3)" },
  { time: "6 PM", engagement: 890, color: "var(--chart-3)" },
  { time: "8 PM", engagement: 760, color: "var(--chart-3)" },
  { time: "10 PM", engagement: 420, color: "var(--chart-1)" },
];

const chartConfig = {
  engagement: { label: "Engagement", color: "var(--chart-1)" },
} satisfies ChartConfig;

export function BestPostingTimes() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Best Posting Times</CardTitle>
        <CardDescription>Average engagement by hour of day</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-56 w-full">
          <BarChart data={chartData} margin={{ top: 0 }}>
            <CartesianGrid vertical={false} strokeOpacity={0.5} />
            <XAxis dataKey="time" tickLine={false} axisLine={false} tickMargin={8} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent className="w-36" />} />
            <Bar dataKey="engagement" fill="var(--chart-1)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartContainer>
        <div className="mt-2 flex items-center gap-4 text-muted-foreground text-xs">
          <span>🏆 Best: 6 PM (890 avg)</span>
          <span>🌙 Worst: 6 AM (120 avg)</span>
        </div>
      </CardContent>
    </Card>
  );
}
