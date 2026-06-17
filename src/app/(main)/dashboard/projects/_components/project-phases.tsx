"use client";

import { Cell, Pie, PieChart } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const chartData = [
  { phase: "Planning", projects: 8, fill: "var(--chart-1)" },
  { phase: "In Progress", projects: 10, fill: "var(--chart-2)" },
  { phase: "Review", projects: 4, fill: "var(--chart-3)" },
  { phase: "Completed", projects: 2, fill: "var(--chart-4)" },
];

const chartConfig = {} satisfies ChartConfig;

export function ProjectPhases() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Phases</CardTitle>
        <CardDescription>Distribution by current phase</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-center gap-6">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square h-44 w-full max-w-[160px]">
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey="projects" nameKey="phase" innerRadius={45} strokeWidth={2} stroke="hsl(var(--background))">
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
        <div className="flex flex-col gap-2">
          {chartData.map((item) => (
            <div key={item.phase} className="flex items-center gap-2 text-sm">
              <div className="size-2.5 rounded-full" style={{ backgroundColor: item.fill }} />
              <span className="w-24">{item.phase}</span>
              <span className="font-medium tabular-nums">{item.projects} projects</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
