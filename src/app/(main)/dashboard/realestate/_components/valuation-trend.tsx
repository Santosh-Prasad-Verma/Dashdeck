"use client";

import { Line, LineChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";

const chartData = [
  { month: "Jul", commercial: 980, residential: 420, industrial: 620 },
  { month: "Aug", commercial: 1020, residential: 430, industrial: 635 },
  { month: "Sep", commercial: 1050, residential: 445, industrial: 640 },
  { month: "Oct", commercial: 1080, residential: 450, industrial: 650 },
  { month: "Nov", commercial: 1100, residential: 460, industrial: 660 },
  { month: "Dec", commercial: 1120, residential: 470, industrial: 670 },
];

const chartConfig = {
  commercial: { label: "Commercial", color: "var(--chart-1)" },
  residential: { label: "Residential", color: "var(--chart-2)" },
  industrial: { label: "Industrial", color: "var(--chart-3)" },
} satisfies ChartConfig;

export function ValuationTrend() {
  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Property Valuation Trend</CardTitle>
        <CardDescription>Estimated value per sq.ft (6-month forecast)</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="aspect-auto h-80 w-full">
          <LineChart data={chartData} margin={{ top: 0 }}>
            <CartesianGrid vertical={false} strokeOpacity={0.5} />
            <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
            <YAxis tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(v) => `$${v}`} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent className="w-40" indicator="line" />} />
            <ChartLegend verticalAlign="top" content={<ChartLegendContent className="mb-5 justify-end" />} />
            <Line dataKey="commercial" type="monotone" stroke="var(--color-commercial)" strokeWidth={2} dot={false} />
            <Line dataKey="residential" type="monotone" stroke="var(--color-residential)" strokeWidth={2} dot={false} />
            <Line dataKey="industrial" type="monotone" stroke="var(--color-industrial)" strokeWidth={2} dot={false} />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
