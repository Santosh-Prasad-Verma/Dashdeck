"use client";

import { ArrowUpRight, PackageCheck, PackageX, TriangleAlert } from "lucide-react";
import { PolarAngleAxis, RadialBar, RadialBarChart } from "recharts";

import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { type ChartConfig, ChartContainer } from "@/components/ui/chart";
import { Separator } from "@/components/ui/separator";

const chartData = [{ month: "current", "in-stock": 760, "low-stock": 320, "out-of-stock": 160 }];
const totalUnits = chartData[0]["in-stock"] + chartData[0]["low-stock"] + chartData[0]["out-of-stock"];
const availablePercent = Math.round((chartData[0]["in-stock"] / totalUnits) * 100);
const lowStockPercent = Math.round((chartData[0]["low-stock"] / totalUnits) * 100);
const outPercent = Math.round((chartData[0]["out-of-stock"] / totalUnits) * 100);

const radialData = [
  {
    name: "Out of Stock",
    value: outPercent,
    fill: "var(--chart-1)",
  },
  {
    name: "Low Stock",
    value: lowStockPercent,
    fill: "var(--chart-2)",
  },
  {
    name: "In Stock",
    value: availablePercent,
    fill: "var(--chart-3)",
  },
];

const inventorySummary = [
  {
    icon: PackageCheck,
    label: "In stock",
    value: chartData[0]["in-stock"],
  },
  {
    icon: TriangleAlert,
    label: "Low stock",
    value: chartData[0]["low-stock"],
  },
  {
    icon: PackageX,
    label: "Out",
    value: chartData[0]["out-of-stock"],
  },
] as const;

const chartConfig = {
  "in-stock": {
    label: "In stock",
    color: "var(--chart-3)",
  },
  "low-stock": {
    label: "Low stock",
    color: "var(--chart-2)",
  },
  "out-of-stock": {
    label: "Out of stock",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function Inventory() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="font-normal text-muted-foreground text-sm">Inventory</CardTitle>
        <CardDescription className="text-foreground text-xl tabular-nums leading-none tracking-tight">
          {availablePercent}% available
        </CardDescription>
        <CardAction>
          <ArrowUpRight className="size-4" />
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <ChartContainer config={chartConfig} className="mx-auto h-40 w-full relative">
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold tracking-tight tabular-nums">{availablePercent}%</span>
            <span className="text-[10px] text-muted-foreground uppercase font-semibold tracking-wider mt-0.5">
              Available
            </span>
          </div>
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="35%"
            outerRadius="100%"
            barSize={8}
            data={radialData}
            startAngle={90}
            endAngle={-270}
          >
            <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
            <RadialBar background={{ fill: "var(--muted)", opacity: 0.1 }} dataKey="value" cornerRadius={6} />
          </RadialBarChart>
        </ChartContainer>

        <Separator />

        <div className="grid grid-cols-3 divide-x">
          {inventorySummary.map((item, _index) => (
            <div key={item.label} className="flex flex-col items-center gap-3 text-center">
              <div className="grid size-9 place-items-center rounded-full bg-muted">
                <item.icon className="size-4 text-muted-foreground" />
              </div>
              <div>
                <div className="text-muted-foreground text-xs leading-none">{item.label}</div>
                <div className="font-medium text-sm tabular-nums">{item.value.toLocaleString()}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
