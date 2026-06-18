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
  { model: "Claude 3.5", cost: 89, tokens: 95 },
  { model: "GPT-4o", cost: 75, tokens: 80 },
  { model: "Gemini Pro", cost: 42, tokens: 85 },
  { model: "Llama 3.1", cost: 18, tokens: 60 },
  { model: "Embeddings", cost: 8, tokens: 75 },
];

const chartConfig = {
  cost: {
    label: "Relative Cost ($)",
    color: "var(--chart-1)",
  },
  tokens: {
    label: "Token Volume (M)",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function TokenCostBreakdown() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Token Economy</CardTitle>
        <CardDescription>Model API cost efficiency vs relative token volume</CardDescription>
      </CardHeader>
      <CardContent className="pb-0 flex flex-col justify-between">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square h-64 w-full">
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={chartData}>
            <PolarGrid stroke="var(--border)" strokeWidth={1} strokeOpacity={0.5} />
            <PolarAngleAxis dataKey="model" tick={{ fill: "var(--muted-foreground)", fontSize: 10, fontWeight: 500 }} />
            <PolarRadiusAxis
              angle={30}
              domain={[0, 100]}
              tick={{ fill: "var(--muted-foreground)", fontSize: 8 }}
              axisLine={false}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <ChartLegend verticalAlign="bottom" content={<ChartLegendContent className="mt-2 justify-center" />} />

            <Radar
              name="Relative Cost ($)"
              dataKey="cost"
              stroke="var(--color-cost)"
              fill="var(--color-cost)"
              fillOpacity={0.25}
              strokeWidth={1.5}
            />
            <Radar
              name="Token Volume (M)"
              dataKey="tokens"
              stroke="var(--color-tokens)"
              fill="var(--color-tokens)"
              fillOpacity={0.25}
              strokeWidth={1.5}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
