"use client";

import { Cell, Pie, PieChart } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const chartData = [
  { service: "Compute (EC2)", cost: 8420, fill: "var(--chart-1)" },
  { service: "Database (RDS)", cost: 3200, fill: "var(--chart-2)" },
  { service: "Storage (S3)", cost: 1800, fill: "var(--chart-3)" },
  { service: "Networking", cost: 950, fill: "var(--chart-4)" },
  { service: "Cache (Redis)", cost: 630, fill: "var(--chart-5)" },
];

const chartConfig = {} satisfies ChartConfig;
const total = chartData.reduce((acc, curr) => acc + curr.cost, 0);

export function CostBreakdown() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Cloud Cost Breakdown</CardTitle>
        <CardDescription>Monthly spend by service ($15,000/month)</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-center gap-6">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square h-44 w-full max-w-[160px]">
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={chartData}
              dataKey="cost"
              nameKey="service"
              innerRadius={45}
              strokeWidth={2}
              stroke="hsl(var(--background))"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
        <div className="flex flex-col gap-2">
          {chartData.map((item) => (
            <div key={item.service} className="flex items-center gap-2 text-sm">
              <div className="size-2.5 rounded-full" style={{ backgroundColor: item.fill }} />
              <span className="w-28">{item.service.split(" ")[0]}</span>
              <span className="font-medium tabular-nums">${item.cost.toLocaleString()}</span>
            </div>
          ))}
          <div className="border-t pt-1">
            <div className="flex items-center gap-2 text-sm font-medium">
              <span className="w-28">Total</span>
              <span>${total.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
