"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";

const chartData = [
  { month: "Jan", inpatients: 320, outpatients: 850, emergency: 180 },
  { month: "Feb", inpatients: 280, outpatients: 920, emergency: 165 },
  { month: "Mar", inpatients: 350, outpatients: 880, emergency: 210 },
  { month: "Apr", inpatients: 390, outpatients: 940, emergency: 195 },
  { month: "May", inpatients: 340, outpatients: 1010, emergency: 230 },
  { month: "Jun", inpatients: 410, outpatients: 1050, emergency: 250 },
];

const chartConfig = {
  inpatients: { label: "Inpatients", color: "var(--chart-1)" },
  outpatients: { label: "Outpatients", color: "var(--chart-2)" },
  emergency: { label: "Emergency", color: "var(--chart-3)" },
} satisfies ChartConfig;

export function PatientVolume() {
  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Patient Volume</CardTitle>
        <CardDescription>Monthly patient visits by category</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="aspect-auto h-72 w-full">
          <AreaChart data={chartData} margin={{ top: 0 }}>
            <defs>
              <linearGradient id="fillInpatients" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-inpatients)" stopOpacity={0.36} />
                <stop offset="95%" stopColor="var(--color-inpatients)" stopOpacity={0.04} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeOpacity={0.5} />
            <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent className="w-40" indicator="line" />} />
            <ChartLegend verticalAlign="top" content={<ChartLegendContent className="mb-5 justify-end" />} />
            <Area dataKey="outpatients" type="natural" fill="transparent" stroke="var(--color-outpatients)" strokeWidth={1.25} dot={false} />
            <Area dataKey="inpatients" type="natural" fill="url(#fillInpatients)" stroke="var(--color-inpatients)" strokeWidth={1.25} dot={false} />
            <Area dataKey="emergency" type="natural" fill="transparent" stroke="var(--color-emergency)" strokeWidth={1.25} dot={false} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
