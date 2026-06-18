"use client";

import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { city: "New York", listed: 82, inquiries: 95 },
  { city: "Austin", listed: 64, inquiries: 72 },
  { city: "Seattle", listed: 48, inquiries: 50 },
  { city: "Chicago", listed: 52, inquiries: 58 },
  { city: "Miami", listed: 40, inquiries: 62 },
  { city: "Boston", listed: 36, inquiries: 45 },
];

const chartConfig = {
  listed: {
    label: "Active Listings",
    color: "var(--chart-1)",
  },
  inquiries: {
    label: "Tenant Inquiries",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function LocationBreakdown() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Market Activity</CardTitle>
        <CardDescription>Listed property density vs tenant demand by city</CardDescription>
      </CardHeader>
      <CardContent className="pb-0 flex flex-col justify-between">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square h-64 w-full">
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={chartData}>
            <PolarGrid stroke="var(--border)" strokeWidth={1} strokeOpacity={0.5} />
            <PolarAngleAxis dataKey="city" tick={{ fill: "var(--muted-foreground)", fontSize: 10, fontWeight: 500 }} />
            <PolarRadiusAxis
              angle={30}
              domain={[0, 100]}
              tick={{ fill: "var(--muted-foreground)", fontSize: 8 }}
              axisLine={false}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <ChartLegend verticalAlign="bottom" content={<ChartLegendContent className="mt-2 justify-center" />} />

            <Radar
              name="Active Listings"
              dataKey="listed"
              stroke="var(--color-listed)"
              fill="var(--color-listed)"
              fillOpacity={0.25}
              strokeWidth={1.5}
            />
            <Radar
              name="Tenant Inquiries"
              dataKey="inquiries"
              stroke="var(--color-inquiries)"
              fill="var(--color-inquiries)"
              fillOpacity={0.25}
              strokeWidth={1.5}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
