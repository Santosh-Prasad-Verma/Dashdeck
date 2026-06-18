"use client";

import { Bar, BarChart, CartesianGrid, Cell, XAxis } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const chartData = [
  { name: "Starting MRR", value: 118000, fill: "var(--chart-1)" },
  { name: "New Business", value: 19200, fill: "var(--chart-1)" },
  { name: "Expansion", value: 8500, fill: "var(--chart-1)" },
  { name: "Contraction", value: -3200, fill: "var(--chart-3)" },
  { name: "Churn", value: -3900, fill: "var(--chart-3)" },
  { name: "Ending MRR", value: 128500, fill: "var(--chart-2)" },
];

const chartConfig = {
  value: { label: "MRR", color: "var(--chart-1)" },
} satisfies ChartConfig;

export function RevenueWaterfall() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue Waterfall</CardTitle>
        <CardDescription>MRR movement breakdown this month</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-56 w-full">
          <BarChart data={chartData} margin={{ top: 0 }}>
            <CartesianGrid vertical={false} strokeOpacity={0.5} />
            <XAxis dataKey="name" tickLine={false} axisLine={false} tickMargin={8} tick={{ fontSize: 10 }} />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  className="w-36"
                  formatter={(v) => `$${typeof v === "number" ? v.toLocaleString() : v}`}
                />
              }
            />
            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={index} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
