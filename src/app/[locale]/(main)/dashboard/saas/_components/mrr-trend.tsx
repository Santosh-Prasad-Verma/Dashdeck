"use client";

import { Bar, BarChart, CartesianGrid, ComposedChart, Line, ReferenceLine, XAxis, YAxis } from "recharts";

import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const chartData = [
  { month: "Jan", new: 8400, expansion: 4000, churn: -3200, net: 9200 },
  { month: "Feb", new: 9800, expansion: 5400, churn: -3800, net: 11400 },
  { month: "Mar", new: 10200, expansion: 4600, churn: -3500, net: 11300 },
  { month: "Apr", new: 11500, expansion: 5000, churn: -4100, net: 12400 },
  { month: "May", new: 13200, expansion: 6000, churn: -3900, net: 15300 },
  { month: "Jun", new: 12500, expansion: 5700, churn: -3700, net: 14500 },
];

const chartConfig = {
  new: { label: "New MRR", color: "var(--chart-2)" },
  expansion: { label: "Expansion MRR", color: "var(--chart-1)" },
  churn: { label: "Churned MRR", color: "var(--chart-3)" },
  net: { label: "Net Growth", color: "var(--chart-4)" },
} satisfies ChartConfig;

export function MRRTrend() {
  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>MRR Movements</CardTitle>
        <CardDescription>Stacked breakdown of monthly recurring revenue changes</CardDescription>
        <CardAction>
          <Select defaultValue="6months">
            <SelectTrigger size="sm" className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Period</SelectLabel>
                <SelectItem value="6months">6 months</SelectItem>
                <SelectItem value="1year">1 year</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="aspect-auto h-72 w-full">
          <ComposedChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid vertical={false} strokeOpacity={0.5} />
            <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(val) => `${val > 0 ? "+" : ""}$${val}`}
            />
            <ReferenceLine y={0} stroke="var(--border)" strokeWidth={1} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent className="w-44" indicator="dot" />} />
            <ChartLegend verticalAlign="top" content={<ChartLegendContent className="mb-5 justify-end" />} />

            {/* Stacked MRR bars */}
            <Bar dataKey="new" stackId="mrr" fill="var(--color-new)" radius={[4, 4, 0, 0]} maxBarSize={40} />
            <Bar
              dataKey="expansion"
              stackId="mrr"
              fill="var(--color-expansion)"
              radius={[0, 0, 0, 0]}
              maxBarSize={40}
            />
            <Bar dataKey="churn" stackId="mrr" fill="var(--color-churn)" radius={[0, 0, 4, 4]} maxBarSize={40} />

            {/* Net growth path line */}
            <Line
              type="monotone"
              dataKey="net"
              stroke="var(--color-net)"
              strokeWidth={2}
              dot={{ r: 4, strokeWidth: 1, fill: "var(--background)" }}
              activeDot={{ r: 6 }}
            />
          </ComposedChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
