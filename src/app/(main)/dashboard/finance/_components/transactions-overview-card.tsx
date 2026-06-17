"use client";

import { Area, AreaChart, CartesianGrid, Line, XAxis, YAxis } from "recharts";

import { Card, CardAction, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formatCurrency } from "@/lib/utils";

const DAY_MS = 24 * 60 * 60 * 1000;
const weekStart = Date.UTC(2026, 0, 5);

const chartData = [
  { date: "2026-01-05T02:00:00Z", actual: 45200, target: 45000 },
  { date: "2026-01-06T02:00:00Z", actual: 45450, target: 45300 },
  { date: "2026-01-07T02:00:00Z", actual: 45300, target: 45600 },
  { date: "2026-01-08T02:00:00Z", actual: 46100, target: 45900 },
  { date: "2026-01-09T02:00:00Z", actual: 46400, target: 46200 },
  { date: "2026-01-10T02:00:00Z", actual: 47200, target: 46500 },
  { date: "2026-01-11T02:00:00Z", actual: 47900, target: 46800 },
].map((item) => ({
  date: item.date,
  actual: item.actual,
  target: item.target,
  timestamp: Date.parse(item.date),
}));

const weekdayTicks = Array.from({ length: 7 }, (_, index) => weekStart + (index + 0.5) * DAY_MS);

const weekdayFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: "UTC",
  weekday: "long",
});

const formatWeekday = (value: number) => weekdayFormatter.format(new Date(value));

const chartDomain = [weekStart, weekStart + 7 * DAY_MS];
const formatTooltipCurrency = (value: number | string) => formatCurrency(Number(value), { noDecimals: true });

const chartConfig = {
  actual: {
    color: "var(--chart-1)",
    label: "Net Worth",
  },
  target: {
    color: "var(--chart-4)",
    label: "Target Projected",
  },
} satisfies ChartConfig;

export function TransactionsOverviewCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-normal">Net Worth Growth</CardTitle>
        <CardDescription>Current actual net worth vs. projected goal</CardDescription>
        <CardAction>
          <Select defaultValue="weekly">
            <SelectTrigger className="w-28" size="sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig} className="h-60 w-full">
          <AreaChart data={chartData} margin={{ bottom: 0, left: -20, right: 10, top: 10 }}>
            <defs>
              <linearGradient id="fillActual" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-actual)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="var(--color-actual)" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeOpacity={0.5} />
            <XAxis
              axisLine={false}
              dataKey="timestamp"
              domain={chartDomain}
              scale="time"
              tickFormatter={formatWeekday}
              tickLine={false}
              tickMargin={10}
              ticks={weekdayTicks}
              tick={{ fontSize: 12 }}
              type="number"
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tickMargin={10} 
              tickFormatter={(val) => `$${val / 1000}k`}
              tick={{ fontSize: 12 }} 
            />
            <ChartTooltip
              cursor={false}
              content={({ active, payload, label }) => (
                <ChartTooltipContent
                  active={active}
                  hideLabel
                  label={label}
                  payload={payload?.map((item) => ({
                    ...item,
                    value: typeof item.value === "number" ? formatTooltipCurrency(item.value) : item.value,
                  }))}
                />
              )}
            />
            {/* Actual Net Worth Area */}
            <Area
              dataKey="actual"
              type="monotone"
              fill="url(#fillActual)"
              stroke="var(--color-actual)"
              strokeWidth={2}
              dot={{ r: 3, strokeWidth: 1, fill: "var(--background)" }}
              activeDot={{ r: 5 }}
            />
            {/* Projected Target Line */}
            <Line
              dataKey="target"
              type="monotone"
              stroke="var(--color-target)"
              strokeWidth={1.5}
              strokeDasharray="5 5"
              dot={false}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
