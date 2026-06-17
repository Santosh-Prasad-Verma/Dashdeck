"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

const chartData = [
  { time: "00:00", cpu: 35, memory: 45, disk: 62 },
  { time: "02:00", cpu: 28, memory: 42, disk: 62 },
  { time: "04:00", cpu: 22, memory: 40, disk: 61 },
  { time: "06:00", cpu: 38, memory: 46, disk: 63 },
  { time: "08:00", cpu: 55, memory: 58, disk: 64 },
  { time: "10:00", cpu: 72, memory: 68, disk: 65 },
  { time: "12:00", cpu: 68, memory: 65, disk: 66 },
  { time: "14:00", cpu: 78, memory: 72, disk: 67 },
  { time: "16:00", cpu: 65, memory: 68, disk: 68 },
  { time: "18:00", cpu: 52, memory: 58, disk: 68 },
  { time: "20:00", cpu: 45, memory: 52, disk: 67 },
  { time: "22:00", cpu: 40, memory: 48, disk: 66 },
];

const chartConfig = {
  cpu: { label: "CPU", color: "var(--chart-1)" },
  memory: { label: "Memory", color: "var(--chart-2)" },
  disk: { label: "Disk", color: "var(--chart-3)" },
} satisfies ChartConfig;

export function ServerMetrics() {
  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Server Metrics</CardTitle>
        <CardDescription>Resource utilization over time</CardDescription>
        <CardAction>
          <Select defaultValue="24h">
            <SelectTrigger size="sm" className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Period</SelectLabel>
                <SelectItem value="1h">Last hour</SelectItem>
                <SelectItem value="24h">Last 24h</SelectItem>
                <SelectItem value="7d">Last 7 days</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="aspect-auto h-72 w-full">
          <AreaChart data={chartData} margin={{ top: 0 }}>
            <defs>
              <linearGradient id="fillCpu" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-cpu)" stopOpacity={0.36} />
                <stop offset="95%" stopColor="var(--color-cpu)" stopOpacity={0.04} />
              </linearGradient>
              <linearGradient id="fillMemory" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-memory)" stopOpacity={0.36} />
                <stop offset="95%" stopColor="var(--color-memory)" stopOpacity={0.04} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeOpacity={0.5} />
            <XAxis dataKey="time" tickLine={false} axisLine={false} tickMargin={8} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent className="w-40" indicator="line" />} />
            <ChartLegend verticalAlign="top" content={<ChartLegendContent className="mb-5 justify-end" />} />
            <Area dataKey="cpu" type="natural" fill="url(#fillCpu)" stroke="var(--color-cpu)" strokeWidth={1.25} dot={false} />
            <Area dataKey="memory" type="natural" fill="url(#fillMemory)" stroke="var(--color-memory)" strokeWidth={1.25} dot={false} />
            <Area dataKey="disk" type="natural" fill="transparent" stroke="var(--color-disk)" strokeWidth={1.25} dot={false} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
