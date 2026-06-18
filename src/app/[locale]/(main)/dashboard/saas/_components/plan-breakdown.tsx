"use client";

import { PolarAngleAxis, RadialBar, RadialBarChart } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { type ChartConfig, ChartContainer } from "@/components/ui/chart";

const chartData = [
  { plan: "Enterprise", customers: 340, mrr: 52000, fill: "var(--chart-1)" },
  { plan: "Pro", customers: 890, mrr: 44500, fill: "var(--chart-2)" },
  { plan: "Starter", customers: 1200, mrr: 24000, fill: "var(--chart-3)" },
  { plan: "Free", customers: 417, mrr: 8000, fill: "var(--chart-4)" },
];

const chartConfig = {} satisfies ChartConfig;

export function PlanBreakdown() {
  const totalMrr = chartData.reduce((acc, curr) => acc + curr.mrr, 0);
  const radialData = [
    {
      name: "Free",
      value: Math.round((chartData[3].mrr / totalMrr) * 100),
      fill: "var(--chart-4)",
    },
    {
      name: "Starter",
      value: Math.round((chartData[2].mrr / totalMrr) * 100),
      fill: "var(--chart-3)",
    },
    {
      name: "Pro",
      value: Math.round((chartData[1].mrr / totalMrr) * 100),
      fill: "var(--chart-2)",
    },
    {
      name: "Enterprise",
      value: Math.round((chartData[0].mrr / totalMrr) * 100),
      fill: "var(--chart-1)",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Plan Breakdown</CardTitle>
        <CardDescription>Customers and MRR by plan</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-center gap-6">
        <ChartContainer config={chartConfig} className="relative mx-auto aspect-square h-44 w-full max-w-[160px]">
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-bold text-xl tracking-tight">$128.5k</span>
            <span className="font-semibold text-[9px] text-muted-foreground uppercase">Total MRR</span>
          </div>
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="30%"
            outerRadius="100%"
            barSize={6}
            data={radialData}
            startAngle={90}
            endAngle={-270}
          >
            <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
            <RadialBar background={{ fill: "var(--muted)", opacity: 0.1 }} dataKey="value" cornerRadius={4} />
          </RadialBarChart>
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
