"use client";

import { Cell, Pie, PieChart } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const chartData = [
  { category: "Electronics", items: 14200, fill: "var(--chart-1)" },
  { category: "Accessories", items: 9800, fill: "var(--chart-2)" },
  { category: "Office", items: 6400, fill: "var(--chart-3)" },
  { category: "Furniture", items: 3200, fill: "var(--chart-4)" },
  { category: "Other", items: 12292, fill: "var(--chart-5)" },
];

const chartConfig = {} satisfies ChartConfig;

export function CategoryBreakdown() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Category Breakdown</CardTitle>
        <CardDescription>Inventory by category</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-center gap-6">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square h-44 w-full max-w-[160px]">
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey="items" nameKey="category" innerRadius={45} strokeWidth={2} stroke="hsl(var(--background))">
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
        <div className="flex flex-col gap-2">
          {chartData.map((item) => (
            <div key={item.category} className="flex items-center gap-2 text-sm">
              <div className="size-2.5 rounded-full" style={{ backgroundColor: item.fill }} />
              <span className="w-24">{item.category}</span>
              <span className="font-medium tabular-nums">{item.items.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
