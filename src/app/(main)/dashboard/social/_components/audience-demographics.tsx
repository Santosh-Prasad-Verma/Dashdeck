"use client";

import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";

const chartData = [
  { platform: "Instagram", reach: 85, engagement: 60 },
  { platform: "TikTok", reach: 90, engagement: 78 },
  { platform: "X/Twitter", reach: 65, engagement: 45 },
  { platform: "LinkedIn", reach: 50, engagement: 82 },
  { platform: "YouTube", reach: 75, engagement: 55 },
];

const chartConfig = {
  reach: {
    label: "Follower Reach",
    color: "var(--chart-1)",
  },
  engagement: {
    label: "Engagement Rate",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function AudienceDemographics() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Platform Metrics</CardTitle>
        <CardDescription>Follower reach vs interactive engagement index</CardDescription>
      </CardHeader>
      <CardContent className="pb-0 flex flex-col justify-between">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square h-64 w-full">
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={chartData}>
            <PolarGrid stroke="var(--border)" strokeWidth={1} strokeOpacity={0.5} />
            <PolarAngleAxis 
              dataKey="platform" 
              tick={{ fill: "var(--muted-foreground)", fontSize: 10, fontWeight: 500 }} 
            />
            <PolarRadiusAxis 
              angle={30} 
              domain={[0, 100]} 
              tick={{ fill: "var(--muted-foreground)", fontSize: 8 }} 
              axisLine={false}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <ChartLegend verticalAlign="bottom" content={<ChartLegendContent className="mt-2 justify-center" />} />
            
            <Radar 
              name="Follower Reach" 
              dataKey="reach" 
              stroke="var(--color-reach)" 
              fill="var(--color-reach)" 
              fillOpacity={0.25} 
              strokeWidth={1.5}
            />
            <Radar 
              name="Engagement Rate" 
              dataKey="engagement" 
              stroke="var(--color-engagement)" 
              fill="var(--color-engagement)" 
              fillOpacity={0.25} 
              strokeWidth={1.5}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
