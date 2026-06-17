"use client";

import { Cell, Pie, PieChart } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const chartData = [
  { plan: "Enterprise", customers: 340, mrr: 52000, fill: "var(--chart-1)" },
  { plan: "Pro", customers: 890, mrr: 44500, fill: "var(--chart-2)" },
  { plan: "Starter", customers: 1200, mrr: 24000, fill: "var(--chart-3)" },
  { plan: "Free", customers: 417, mrr: 8000, fill: "var(--chart-4)" },
];

const chartConfig = {} satisfies ChartConfig;

export function PlanBreakdown() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Plan Breakdown</CardTitle>
        <CardDescription>Customers and MRR by plan</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-center gap-6">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square h-44 w-full max-w-[160px]">
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey="mrr" nameKey="plan" innerRadius={45} strokeWidth={2} stroke="hsl(var(--background))">
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
        <div className="flex flex-col gap-2">
          {chartData.map((item) => (
            <div key={item.plan} className="flex items-center gap-2 text-sm">
              <div className="size-2.5 rounded-full" style={{ backgroundColor: item.fill }} />
              <span className="w-20">{item.plan}</span>
              <span className="font-medium tabular-nums">${item.mrr.toLocaleString()}</span>
              <span className="text-muted-foreground text-xs">({item.customers} users)</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
