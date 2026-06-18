"use client";

import { Bar, BarChart } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { type ChartConfig, ChartContainer } from "@/components/ui/chart";

const chartData = [
  { platform: "Instagram", followers: 84500, engagement: 5.2, color: "var(--chart-1)" },
  { platform: "TikTok", followers: 92000, engagement: 6.8, color: "var(--chart-2)" },
  { platform: "X/Twitter", followers: 38400, engagement: 3.1, color: "var(--chart-3)" },
  { platform: "LinkedIn", followers: 22100, engagement: 4.5, color: "var(--chart-4)" },
  { platform: "YouTube", followers: 11500, engagement: 3.8, color: "var(--chart-5)" },
];

const chartConfig = {
  followers: { label: "Followers", color: "var(--chart-1)" },
} satisfies ChartConfig;

export function PlatformBreakdown() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Platform Breakdown</CardTitle>
        <CardDescription>Follower distribution by platform</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-64 w-full">
          <BarChart data={chartData} layout="vertical" margin={{ left: 20 }}>
            <Bar dataKey="followers" fill="var(--color-followers)" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ChartContainer>
        <div className="mt-4 flex flex-col gap-2">
          {chartData.map((item) => (
            <div key={item.platform} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <div className="size-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                <span>{item.platform}</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <span className="font-medium text-foreground tabular-nums">{item.followers.toLocaleString()}</span>
                <span>{item.engagement}% engagement</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
