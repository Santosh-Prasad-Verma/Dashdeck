"use client";

import { Area, AreaChart, Bar, BarChart, CartesianGrid, ComposedChart, Line, XAxis } from "recharts";

import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

const chartData = [
  { month: "Jan", mrr: 85000, arr: 1020000, new: 12400, churn: 4200 },
  { month: "Feb", mrr: 92000, arr: 1104000, new: 15200, churn: 3800 },
  { month: "Mar", mrr: 98000, arr: 1176000, new: 14800, churn: 3500 },
  { month: "Apr", mrr: 105000, arr: 1260000, new: 16500, churn: 4100 },
  { month: "May", mrr: 118000, arr: 1416000, new: 19200, churn: 3900 },
  { month: "Jun", mrr: 128500, arr: 1542000, new: 14200, churn: 3700 },
];

const chartConfig = {
  mrr: { label: "MRR", color: "var(--chart-1)" },
  new: { label: "New Revenue", color: "var(--chart-2)" },
  churn: { label: "Churned", color: "var(--chart-3)" },
} satisfies ChartConfig;

export function MRRTrend() {
  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>MRR Growth</CardTitle>
        <CardDescription>Monthly recurring revenue trends</CardDescription>
        <CardAction>
          <Select defaultValue="6months">
            <SelectTrigger size="sm" className="w-32"><SelectValue /></SelectTrigger>
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
          <ComposedChart data={chartData} margin={{ top: 0 }}>
            <defs>
              <linearGradient id="fillMrr" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-mrr)" stopOpacity={0.36} />
                <stop offset="95%" stopColor="var(--color-mrr)" stopOpacity={0.04} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeOpacity={0.5} />
            <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent className="w-40" indicator="line" />} />
            <ChartLegend verticalAlign="top" content={<ChartLegendContent className="mb-5 justify-end" />} />
            <Area dataKey="mrr" type="natural" fill="url(#fillMrr)" stroke="var(--color-mrr)" strokeWidth={1.25} dot={false} />
            <Bar dataKey="new" fill="var(--color-new)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="churn" fill="var(--color-churn)" radius={[4, 4, 0, 0]} />
          </ComposedChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
