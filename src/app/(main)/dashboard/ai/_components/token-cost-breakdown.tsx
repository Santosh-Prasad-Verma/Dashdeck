"use client";

import { Cell, Pie, PieChart } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const chartData = [
  { model: "Claude 3.5", cost: 892, fill: "var(--chart-1)" },
  { model: "GPT-4o", cost: 756, fill: "var(--chart-2)" },
  { model: "Gemini Pro", cost: 423, fill: "var(--chart-3)" },
  { model: "Llama 3.1", cost: 187, fill: "var(--chart-4)" },
  { model: "Embeddings", cost: 83, fill: "var(--chart-5)" },
];

const chartConfig = {
  cost: {
    label: "Cost ($)",
  },
  "Claude 3.5": {
    label: "Claude 3.5",
    color: "var(--chart-1)",
  },
  "GPT-4o": {
    label: "GPT-4o",
    color: "var(--chart-2)",
  },
  "Gemini Pro": {
    label: "Gemini Pro",
    color: "var(--chart-3)",
  },
  "Llama 3.1": {
    label: "Llama 3.1",
    color: "var(--chart-4)",
  },
  Embeddings: {
    label: "Embeddings",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig;

const totalCost = chartData.reduce((acc, curr) => acc + curr.cost, 0);

export function TokenCostBreakdown() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Cost by Model</CardTitle>
        <CardDescription>API spending breakdown this month</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square h-48 w-full max-w-[200px]">
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="cost"
              nameKey="model"
              innerRadius={50}
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
            <div key={item.model} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <div
                  className="size-2.5 rounded-full"
                  style={{ backgroundColor: item.fill }}
                />
                <span>{item.model}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium tabular-nums">${item.cost}</span>
                <span className="text-muted-foreground">
                  {((item.cost / totalCost) * 100).toFixed(1)}%
                </span>
              </div>
            </div>
          ))}
          <div className="border-t pt-2">
            <div className="flex items-center justify-between text-sm font-medium">
              <span>Total</span>
              <span className="tabular-nums">${totalCost.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
