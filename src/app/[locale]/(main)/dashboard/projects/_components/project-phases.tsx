"use client";

import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { phase: "Planning", load: 60, status: 80 },
  { phase: "In Progress", load: 95, status: 70 },
  { phase: "Review", load: 40, status: 90 },
  { phase: "Completed", load: 20, status: 100 },
  { phase: "On Hold", load: 15, status: 30 },
];

const chartConfig = {
  load: {
    label: "Workload Capacity",
    color: "var(--chart-1)",
  },
  status: {
    label: "Phase Milestone Progress",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function ProjectPhases() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Sprint Phase Health</CardTitle>
        <CardDescription>Workload capacity versus milestone progress by phase</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col justify-between pb-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square h-64 w-full">
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={chartData}>
            <PolarGrid stroke="var(--border)" strokeWidth={1} strokeOpacity={0.5} />
            <PolarAngleAxis dataKey="phase" tick={{ fill: "var(--muted-foreground)", fontSize: 10, fontWeight: 500 }} />
            <PolarRadiusAxis
              angle={30}
              domain={[0, 100]}
              tick={{ fill: "var(--muted-foreground)", fontSize: 8 }}
              axisLine={false}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <ChartLegend verticalAlign="bottom" content={<ChartLegendContent className="mt-2 justify-center" />} />

            <Radar
              name="Workload Capacity"
              dataKey="load"
              stroke="var(--color-load)"
              fill="var(--color-load)"
              fillOpacity={0.25}
              strokeWidth={1.5}
            />
            <Radar
              name="Phase Milestone Progress"
              dataKey="status"
              stroke="var(--color-status)"
              fill="var(--color-status)"
              fillOpacity={0.25}
              strokeWidth={1.5}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
