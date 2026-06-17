"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const chartData = [
  { project: "Pulse v2", planned: 120, actual: 110, total: 200 },
  { project: "API Gateway", planned: 80, actual: 75, total: 150 },
  { project: "Mobile App", planned: 160, actual: 145, total: 250 },
  { project: "Analytics", planned: 90, actual: 85, total: 180 },
  { project: "Design System", planned: 60, actual: 60, total: 100 },
];

const chartConfig = {
  planned: { label: "Planned", color: "var(--chart-1)" },
  actual: { label: "Actual", color: "var(--chart-2)" },
  total: { label: "Total", color: "var(--chart-3)" },
} satisfies ChartConfig;

export function ProjectProgress() {
  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Project Progress</CardTitle>
        <CardDescription>Planned vs actual story points completed</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="aspect-auto h-72 w-full">
          <BarChart data={chartData} margin={{ top: 0 }}>
            <CartesianGrid vertical={false} strokeOpacity={0.5} />
            <XAxis dataKey="project" tickLine={false} axisLine={false} tickMargin={8} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent className="w-40" />} />
            <Bar dataKey="planned" fill="var(--color-planned)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="actual" fill="var(--color-actual)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
