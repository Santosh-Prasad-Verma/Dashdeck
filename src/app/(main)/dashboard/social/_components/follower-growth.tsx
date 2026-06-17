"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { type ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

const chartData = [
  { month: "Jan", instagram: 2400, twitter: 1200, linkedin: 800, tiktok: 3200 },
  { month: "Feb", instagram: 2200, twitter: 1400, linkedin: 900, tiktok: 3800 },
  { month: "Mar", instagram: 2800, twitter: 1100, linkedin: 1200, tiktok: 4200 },
  { month: "Apr", instagram: 3200, twitter: 1600, linkedin: 1500, tiktok: 4800 },
  { month: "May", instagram: 2900, twitter: 1800, linkedin: 1400, tiktok: 5200 },
  { month: "Jun", instagram: 3400, twitter: 2100, linkedin: 1700, tiktok: 5600 },
];

const chartConfig = {
  instagram: { label: "Instagram", color: "var(--chart-1)" },
  twitter: { label: "X/Twitter", color: "var(--chart-2)" },
  linkedin: { label: "LinkedIn", color: "var(--chart-3)" },
  tiktok: { label: "TikTok", color: "var(--chart-4)" },
} satisfies ChartConfig;

export function FollowerGrowth() {
  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Follower Growth</CardTitle>
        <CardDescription>Monthly follower growth by platform</CardDescription>
        <CardAction>
          <Select defaultValue="6months">
            <SelectTrigger size="sm" className="w-32">
              <SelectValue placeholder="Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Period</SelectLabel>
                <SelectItem value="6months">6 months</SelectItem>
                <SelectItem value="3months">3 months</SelectItem>
                <SelectItem value="1year">1 year</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="aspect-auto h-72 w-full">
          <AreaChart data={chartData} margin={{ top: 0 }}>
            <defs>
              <linearGradient id="fillInstagram" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-instagram)" stopOpacity={0.36} />
                <stop offset="95%" stopColor="var(--color-instagram)" stopOpacity={0.04} />
              </linearGradient>
              <linearGradient id="fillTiktok" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-tiktok)" stopOpacity={0.36} />
                <stop offset="95%" stopColor="var(--color-tiktok)" stopOpacity={0.04} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeOpacity={0.5} />
            <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent className="w-40" indicator="line" />} />
            <ChartLegend verticalAlign="top" content={<ChartLegendContent className="mb-5 justify-end" />} />
            <Area dataKey="tiktok" type="natural" fill="url(#fillTiktok)" stroke="var(--color-tiktok)" strokeWidth={1.25} dot={false} fillOpacity={1} />
            <Area dataKey="instagram" type="natural" fill="url(#fillInstagram)" stroke="var(--color-instagram)" strokeWidth={1.25} dot={false} fillOpacity={1} />
            <Area dataKey="twitter" type="natural" fill="transparent" stroke="var(--color-twitter)" strokeWidth={1.25} dot={false} />
            <Area dataKey="linkedin" type="natural" fill="transparent" stroke="var(--color-linkedin)" strokeWidth={1.25} dot={false} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
