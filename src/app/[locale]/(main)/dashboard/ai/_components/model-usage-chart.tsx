"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

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
  { date: "Mon", claude: 4200, gpt4: 3800, gemini: 1200, llama: 800 },
  { date: "Tue", claude: 4800, gpt4: 4100, gemini: 1400, llama: 950 },
  { date: "Wed", claude: 5100, gpt4: 4500, gemini: 1600, llama: 1100 },
  { date: "Thu", claude: 4600, gpt4: 4200, gemini: 1300, llama: 900 },
  { date: "Fri", claude: 5400, gpt4: 4800, gemini: 1800, llama: 1200 },
  { date: "Sat", claude: 3200, gpt4: 2900, gemini: 900, llama: 600 },
  { date: "Sun", claude: 2800, gpt4: 2500, gemini: 800, llama: 500 },
  { date: "Mon", claude: 4500, gpt4: 4000, gemini: 1350, llama: 850 },
  { date: "Tue", claude: 5200, gpt4: 4600, gemini: 1550, llama: 1050 },
  { date: "Wed", claude: 5800, gpt4: 5100, gemini: 1800, llama: 1250 },
  { date: "Thu", claude: 5400, gpt4: 4800, gemini: 1650, llama: 1100 },
  { date: "Fri", claude: 6100, gpt4: 5400, gemini: 2000, llama: 1400 },
  { date: "Sat", claude: 3800, gpt4: 3200, gemini: 1100, llama: 750 },
  { date: "Sun", claude: 3200, gpt4: 2800, gemini: 950, llama: 650 },
];

const chartConfig = {
  claude: {
    label: "Claude 3.5",
    color: "var(--chart-1)",
  },
  gpt4: {
    label: "GPT-4o",
    color: "var(--chart-2)",
  },
  gemini: {
    label: "Gemini Pro",
    color: "var(--chart-3)",
  },
  llama: {
    label: "Llama 3.1",
    color: "var(--chart-4)",
  },
} satisfies ChartConfig;

export function ModelUsageChart() {
  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle className="leading-none">Model Usage</CardTitle>
        <CardDescription>
          <span className="@[540px]/card:block hidden">Token consumption by model over the last 2 weeks</span>
          <span className="@[540px]/card:hidden">Last 2 weeks</span>
        </CardDescription>
        <CardAction>
          <Select defaultValue="2weeks">
            <SelectTrigger size="sm" className="w-32">
              <SelectValue placeholder="Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Period</SelectLabel>
                <SelectItem value="7days">Last 7 days</SelectItem>
                <SelectItem value="2weeks">Last 2 weeks</SelectItem>
                <SelectItem value="30days">Last 30 days</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig} className="aspect-auto h-80 w-full">
          <AreaChart data={chartData} margin={{ top: 0 }}>
            <defs>
              <linearGradient id="fillClaude" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-claude)" stopOpacity={0.36} />
                <stop offset="95%" stopColor="var(--color-claude)" stopOpacity={0.04} />
              </linearGradient>
              <linearGradient id="fillGpt4" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-gpt4)" stopOpacity={0.36} />
                <stop offset="95%" stopColor="var(--color-gpt4)" stopOpacity={0.04} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeOpacity={0.5} />
            <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} minTickGap={48} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent className="w-50" indicator="line" />} />
            <ChartLegend verticalAlign="top" content={<ChartLegendContent className="mb-5 justify-end" />} />
            <Area
              dataKey="claude"
              type="natural"
              fill="url(#fillClaude)"
              stroke="var(--color-claude)"
              strokeWidth={1.25}
              dot={false}
              fillOpacity={1}
            />
            <Area
              dataKey="gpt4"
              type="natural"
              fill="url(#fillGpt4)"
              stroke="var(--color-gpt4)"
              strokeWidth={1.25}
              dot={false}
              fillOpacity={1}
            />
            <Area
              dataKey="gemini"
              type="natural"
              fill="transparent"
              stroke="var(--color-gemini)"
              strokeWidth={1.25}
              dot={false}
            />
            <Area
              dataKey="llama"
              type="natural"
              fill="transparent"
              stroke="var(--color-llama)"
              strokeWidth={1.25}
              dot={false}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
