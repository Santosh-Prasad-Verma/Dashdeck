"use client";

import { Bar, BarChart, CartesianGrid, XAxis, Cell } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const chartData = [
  { sku: "SKU-3847", value: 42500, fill: "var(--chart-1)" },
  { sku: "SKU-2194", value: 38500, fill: "var(--chart-1)" },
  { sku: "SKU-5612", value: 32000, fill: "var(--chart-1)" },
  { sku: "SKU-7834", value: 18000, fill: "var(--chart-2)" },
  { sku: "SKU-9023", value: 15000, fill: "var(--chart-2)" },
  { sku: "SKU-1456", value: 12000, fill: "var(--chart-2)" },
  { sku: "SKU-6789", value: 8500, fill: "var(--chart-3)" },
  { sku: "SKU-2341", value: 6200, fill: "var(--chart-3)" },
  { sku: "SKU-8956", value: 4200, fill: "var(--chart-4)" },
  { sku: "SKU-3412", value: 2800, fill: "var(--chart-4)" },
];

const chartConfig = {
  value: { label: "Annual Value", color: "var(--chart-1)" },
} satisfies ChartConfig;

const totalValue = chartData.reduce((acc, curr) => acc + curr.value, 0);

export function ABCAnalysis() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>ABC Analysis</CardTitle>
        <CardDescription>Top items by annual consumption value (Pareto)</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-56 w-full">
          <BarChart data={chartData} margin={{ top: 0 }}>
            <CartesianGrid vertical={false} strokeOpacity={0.5} />
            <XAxis dataKey="sku" tickLine={false} axisLine={false} tickMargin={8} tick={{ fontSize: 10 }} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent className="w-36" formatter={(v) => `$${typeof v === 'number' ? v.toLocaleString() : v}`} />} />
            <Bar dataKey="value" fill="var(--chart-1)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartContainer>
        <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
          <div className="rounded-lg bg-chart-1/10 p-2">
            <div className="font-bold">A Items</div>
            <div className="text-muted-foreground">80% of value</div>
            <div className="font-medium">${(totalValue * 0.8).toLocaleString()}</div>
          </div>
          <div className="rounded-lg bg-chart-2/10 p-2">
            <div className="font-bold">B Items</div>
            <div className="text-muted-foreground">15% of value</div>
            <div className="font-medium">${(totalValue * 0.15).toLocaleString()}</div>
          </div>
          <div className="rounded-lg bg-chart-3/10 p-2">
            <div className="font-bold">C Items</div>
            <div className="text-muted-foreground">5% of value</div>
            <div className="font-medium">${(totalValue * 0.05).toLocaleString()}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
