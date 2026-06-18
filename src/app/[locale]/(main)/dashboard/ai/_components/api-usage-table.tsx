"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
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
  { endpoint: "/chat/completions", requests: 8420, tokens: 4200000 },
  { endpoint: "/embeddings", requests: 12300, tokens: 2100000 },
  { endpoint: "/completions", requests: 3200, tokens: 1800000 },
  { endpoint: "/moderations", requests: 5600, tokens: 340000 },
  { endpoint: "/images", requests: 890, tokens: 0 },
];

const chartConfig = {
  requests: {
    label: "Requests",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function ApiUsageTable() {
  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle className="leading-none">API Endpoint Usage</CardTitle>
        <CardDescription>
          <span className="@[540px]/card:block hidden">Request volume by endpoint across all models</span>
          <span className="@[540px]/card:hidden">By endpoint</span>
        </CardDescription>
        <CardAction>
          <Select defaultValue="7days">
            <SelectTrigger size="sm" className="w-32">
              <SelectValue placeholder="Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Period</SelectLabel>
                <SelectItem value="7days">Last 7 days</SelectItem>
                <SelectItem value="30days">Last 30 days</SelectItem>
                <SelectItem value="90days">Last 90 days</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-64 w-full">
          <BarChart data={chartData} layout="vertical" margin={{ left: 20 }}>
            <CartesianGrid horizontal={false} strokeOpacity={0.5} />
            <YAxis dataKey="endpoint" type="category" tickLine={false} axisLine={false} tickMargin={8} width={140} />
            <XAxis type="number" tickLine={false} axisLine={false} tickMargin={8} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent className="w-40" />} />
            <Bar dataKey="requests" fill="var(--color-requests)" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
