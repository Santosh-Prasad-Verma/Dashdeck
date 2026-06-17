"use client";

import { Line, LineChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const chartData = [
  { day: "Day 1", ideal: 140, actual: 140 },
  { day: "Day 2", ideal: 133, actual: 135 },
  { day: "Day 3", ideal: 126, actual: 128 },
  { day: "Day 4", ideal: 119, actual: 122 },
  { day: "Day 5", ideal: 112, actual: 118 },
  { day: "Day 6", ideal: 105, actual: 110 },
  { day: "Day 7", ideal: 98, actual: 103 },
  { day: "Day 8", ideal: 91, actual: 94 },
  { day: "Day 9", ideal: 84, actual: 88 },
  { day: "Day 10", ideal: 77, actual: 72 },
  { day: "Day 11", ideal: 70, actual: null },
  { day: "Day 12", ideal: 63, actual: null },
  { day: "Day 13", ideal: 56, actual: null },
  { day: "Day 14", ideal: 49, actual: null },
  { day: "Day 15", ideal: 42, actual: null },
];

const chartConfig = {
  ideal: { label: "Ideal Burn", color: "var(--muted-foreground)" },
  actual: { label: "Actual Burn", color: "var(--chart-1)" },
} satisfies ChartConfig;

export function BurndownChart() {
  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Sprint Burndown</CardTitle>
        <CardDescription>Story points remaining — Sprint 12 (2 weeks)</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="aspect-auto h-64 w-full">
          <LineChart data={chartData} margin={{ top: 0 }}>
            <CartesianGrid vertical={false} strokeOpacity={0.5} />
            <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} tick={{ fontSize: 11 }} />
            <YAxis tickLine={false} axisLine={false} tickMargin={8} tick={{ fontSize: 11 }} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent className="w-36" />} />
            <Line dataKey="ideal" type="monotone" stroke="var(--muted-foreground)" strokeWidth={1} dot={false} strokeDasharray="5 5" />
            <Line dataKey="actual" type="monotone" stroke="var(--chart-1)" strokeWidth={2} dot={{ r: 4 }} />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
