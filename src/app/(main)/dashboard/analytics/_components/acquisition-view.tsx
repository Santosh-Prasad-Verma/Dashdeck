"use client";

import { Bar, BarChart, CartesianGrid, XAxis, Line, LineChart } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Badge } from "@/components/ui/badge";

const trafficSourceData = [
  { source: "Organic Search", users: 8400, conversions: 320, rate: 3.8 },
  { source: "Direct", users: 5200, conversions: 280, rate: 5.4 },
  { source: "Social Media", users: 3800, conversions: 120, rate: 3.2 },
  { source: "Email", users: 2400, conversions: 180, rate: 7.5 },
  { source: "Referral", users: 1800, conversions: 90, rate: 5.0 },
  { source: "Paid Search", users: 1200, conversions: 60, rate: 5.0 },
];

const campaignData = [
  { campaign: "Q1 Launch", visitors: 12400, leads: 890, conversion: 7.2 },
  { campaign: "Spring Sale", visitors: 8900, leads: 620, conversion: 7.0 },
  { campaign: "Blog Series", visitors: 6200, leads: 310, conversion: 5.0 },
  { campaign: "Webinar", visitors: 4800, leads: 480, conversion: 10.0 },
  { campaign: "Partner Collab", visitors: 3200, leads: 192, conversion: 6.0 },
];

const utmData = [
  { medium: "cpc", source: "google", sessions: 4200, bounceRate: 32 },
  { medium: "social", source: "twitter", sessions: 2800, bounceRate: 45 },
  { medium: "email", source: "newsletter", sessions: 1800, bounceRate: 22 },
  { medium: "referral", source: "partner", sessions: 1200, bounceRate: 28 },
  { medium: "organic", source: "bing", sessions: 900, bounceRate: 38 },
];

const chartConfig = {
  users: {
    label: "Users",
    color: "var(--chart-1)",
  },
  conversions: {
    label: "Conversions",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

const campaignConfig = {
  visitors: {
    label: "Visitors",
    color: "var(--chart-1)",
  },
  leads: {
    label: "Leads",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

export function AcquisitionView() {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Traffic Sources</CardTitle>
            <CardDescription>User acquisition by source</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-64 w-full">
              <BarChart data={trafficSourceData} margin={{ top: 0 }}>
                <CartesianGrid vertical={false} strokeOpacity={0.5} />
                <XAxis dataKey="source" tickLine={false} axisLine={false} tickMargin={8} />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent className="w-40" />}
                />
                <Bar dataKey="users" fill="var(--color-users)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Campaign Performance</CardTitle>
            <CardDescription>Visitors and leads by campaign</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={campaignConfig} className="h-64 w-full">
              <BarChart data={campaignData} margin={{ top: 0 }}>
                <CartesianGrid vertical={false} strokeOpacity={0.5} />
                <XAxis dataKey="campaign" tickLine={false} axisLine={false} tickMargin={8} />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent className="w-40" />}
                />
                <Bar dataKey="visitors" fill="var(--color-visitors)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="leads" fill="var(--color-leads)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>UTM Parameters</CardTitle>
          <CardDescription>Session and bounce rate by UTM source</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            {utmData.map((utm, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-muted/50"
              >
                <div className="flex items-center gap-4">
                  <div className="font-medium text-sm">{utm.source}</div>
                  <Badge variant="secondary" className="text-xs">{utm.medium}</Badge>
                </div>
                <div className="flex items-center gap-6 text-sm">
                  <div className="text-right">
                    <div className="font-medium tabular-nums">{utm.sessions.toLocaleString()}</div>
                    <div className="text-muted-foreground text-xs">sessions</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium tabular-nums">{utm.bounceRate}%</div>
                    <div className="text-muted-foreground text-xs">bounce rate</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
