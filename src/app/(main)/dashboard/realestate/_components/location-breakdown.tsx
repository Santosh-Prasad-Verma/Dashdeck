"use client";

import { Cell, Pie, PieChart } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const chartData = [
  { city: "New York", properties: 82, fill: "var(--chart-1)" },
  { city: "Austin", properties: 64, fill: "var(--chart-2)" },
  { city: "Seattle", properties: 48, fill: "var(--chart-3)" },
  { city: "Chicago", properties: 52, fill: "var(--chart-4)" },
  { city: "Other Cities", properties: 96, fill: "var(--chart-5)" },
];

const chartConfig = {} satisfies ChartConfig;

export function LocationBreakdown() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Properties by City</CardTitle>
        <CardDescription>Geographic distribution</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-center gap-6">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square h-44 w-full max-w-[160px]">
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey="properties" nameKey="city" innerRadius={45} strokeWidth={2} stroke="hsl(var(--background))">
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
        <div className="flex flex-col gap-2">
          {chartData.map((item) => (
            <div key={item.city} className="flex items-center gap-2 text-sm">
              <div className="size-2.5 rounded-full" style={{ backgroundColor: item.fill }} />
              <span className="w-28">{item.city}</span>
              <span className="font-medium tabular-nums">{item.properties}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
