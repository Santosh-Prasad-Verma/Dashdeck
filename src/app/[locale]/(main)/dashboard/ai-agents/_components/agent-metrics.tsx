"use client";

import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const toolUsageData = [
  { name: "WebSearch", count: 840, color: "var(--chart-1)" },
  { name: "Scraper", count: 620, color: "var(--chart-2)" },
  { name: "DbWrite", count: 480, color: "var(--chart-3)" },
  { name: "MailSender", count: 310, color: "var(--chart-4)" },
  { name: "CodeExec", count: 180, color: "var(--chart-5)" },
];

const costData = [
  { day: "Mon", cost: 12.4, tokens: 1.2 },
  { day: "Tue", cost: 14.8, tokens: 1.5 },
  { day: "Wed", cost: 18.2, tokens: 1.9 },
  { day: "Thu", cost: 15.1, tokens: 1.6 },
  { day: "Fri", cost: 22.4, tokens: 2.3 },
  { day: "Sat", cost: 9.8, tokens: 1.0 },
  { day: "Sun", cost: 8.5, tokens: 0.9 },
];

const toolConfig = {
  count: {
    label: "Invocations",
    color: "var(--chart-1)",
  },
};

const costConfig = {
  cost: {
    label: "Daily Spend ($)",
    color: "var(--chart-2)",
  },
};

export function AgentMetrics() {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Tool Invocation Frequency</CardTitle>
          <CardDescription>Most frequently triggered tools by active agents this week</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={toolConfig} className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={toolUsageData} layout="vertical" margin={{ left: 16 }}>
                <CartesianGrid horizontal={false} strokeOpacity={0.2} />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" tickLine={false} axisLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="count" fill="var(--color-count)" radius={6} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Spend & Token Volume</CardTitle>
          <CardDescription>Daily agent tokens and LLM API cost trends</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={costConfig} className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={costData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.2} />
                <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} />
                <YAxis tickLine={false} axisLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="cost"
                  stroke="var(--color-cost)"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
