"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";

const chartData = [
  { month: "Jan", commercial: 420, residential: 680, industrial: 190 },
  { month: "Feb", commercial: 440, residential: 710, industrial: 200 },
  { month: "Mar", commercial: 480, residential: 740, industrial: 210 },
  { month: "Apr", commercial: 520, residential: 780, industrial: 230 },
  { month: "May", commercial: 550, residential: 810, industrial: 240 },
  { month: "Jun", commercial: 590, residential: 850, industrial: 260 },
];

const chartConfig = {
  commercial: { label: "Commercial", color: "var(--chart-1)" },
  residential: { label: "Residential", color: "var(--chart-2)" },
  industrial: { label: "Industrial", color: "var(--chart-3)" },
} satisfies ChartConfig;

export function RevenueTrend() {
  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Revenue by Property Type</CardTitle>
        <CardDescription>Monthly revenue in thousands</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="aspect-auto h-80 w-full">
          <AreaChart data={chartData} margin={{ top: 0 }}>
            <defs>
              <linearGradient id="fillResidential" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-residential)" stopOpacity={0.36} />
                <stop offset="95%" stopColor="var(--color-residential)" stopOpacity={0.04} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeOpacity={0.5} />
            <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent className="w-40" indicator="line" />} />
            <ChartLegend verticalAlign="top" content={<ChartLegendContent className="mb-5 justify-end" />} />
            <Area dataKey="residential" type="natural" fill="url(#fillResidential)" stroke="var(--color-residential)" strokeWidth={1.25} dot={false} />
            <Area dataKey="commercial" type="natural" fill="transparent" stroke="var(--color-commercial)" strokeWidth={1.25} dot={false} />
            <Area dataKey="industrial" type="natural" fill="transparent" stroke="var(--color-industrial)" strokeWidth={1.25} dot={false} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
