"use client";

import { Cell, Pie, PieChart } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const chartData = [
  { source: "Instagram", value: 35, fill: "var(--chart-1)" },
  { source: "TikTok", value: 28, fill: "var(--chart-2)" },
  { source: "X/Twitter", value: 18, fill: "var(--chart-3)" },
  { source: "LinkedIn", value: 12, fill: "var(--chart-4)" },
  { source: "YouTube", value: 7, fill: "var(--chart-5)" },
];

const chartConfig = {
  value: { label: "Engagement %" },
} satisfies ChartConfig;

const total = chartData.reduce((acc, curr) => acc + curr.value, 0);

export function AudienceDemographics() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Audience Demographics</CardTitle>
        <CardDescription>Engagement by platform</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-center gap-8">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square h-48 w-full max-w-[180px]">
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey="value" nameKey="source" innerRadius={50} strokeWidth={2} stroke="hsl(var(--background))">
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
        <div className="flex flex-col gap-2">
          {chartData.map((item) => (
            <div key={item.source} className="flex items-center gap-2 text-sm">
              <div className="size-2.5 rounded-full" style={{ backgroundColor: item.fill }} />
              <span className="w-24">{item.source}</span>
              <span className="font-medium tabular-nums">{item.value}%</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
