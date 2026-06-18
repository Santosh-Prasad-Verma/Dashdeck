"use client";

import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

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
  { month: "Jan", you: 2400, competitorA: 1800, competitorB: 3200 },
  { month: "Feb", you: 2800, competitorA: 1900, competitorB: 3100 },
  { month: "Mar", you: 3200, competitorA: 2100, competitorB: 3400 },
  { month: "Apr", you: 3800, competitorA: 2200, competitorB: 3500 },
  { month: "May", you: 4200, competitorA: 2400, competitorB: 3600 },
  { month: "Jun", you: 5200, competitorA: 2500, competitorB: 3700 },
];

const chartConfig = {
  you: { label: "Your Brand", color: "var(--chart-1)" },
  competitorA: { label: "Competitor A", color: "var(--chart-2)" },
  competitorB: { label: "Competitor B", color: "var(--chart-3)" },
} satisfies ChartConfig;

export function CompetitorComparison() {
  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Competitor Comparison</CardTitle>
        <CardDescription>Monthly follower growth vs competitors</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="aspect-auto h-64 w-full">
          <LineChart data={chartData} margin={{ top: 0 }}>
            <CartesianGrid vertical={false} strokeOpacity={0.5} />
            <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent className="w-40" indicator="line" />} />
            <ChartLegend verticalAlign="top" content={<ChartLegendContent className="mb-5 justify-end" />} />
            <Line dataKey="you" type="monotone" stroke="var(--color-you)" strokeWidth={2.5} dot={{ r: 4 }} />
            <Line
              dataKey="competitorA"
              type="monotone"
              stroke="var(--color-competitorA)"
              strokeWidth={1.5}
              dot={false}
              strokeDasharray="5 5"
            />
            <Line
              dataKey="competitorB"
              type="monotone"
              stroke="var(--color-competitorB)"
              strokeWidth={1.5}
              dot={false}
              strokeDasharray="5 5"
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
