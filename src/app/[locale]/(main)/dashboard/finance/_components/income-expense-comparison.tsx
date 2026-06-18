"use client";

import { ArrowDownRight, ArrowUpRight, Wallet } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { month: "Jan", salary: 5000, freelance: 1200, rent: -2000, food: -600, bills: -400, leisure: -500 },
  { month: "Feb", salary: 5000, freelance: 1500, rent: -2000, food: -650, bills: -420, leisure: -600 },
  { month: "Mar", salary: 5000, freelance: 980, rent: -2000, food: -580, bills: -390, leisure: -450 },
  { month: "Apr", salary: 5500, freelance: 1100, rent: -2000, food: -700, bills: -450, leisure: -700 },
  { month: "May", salary: 5500, freelance: 1600, rent: -2000, food: -620, bills: -410, leisure: -550 },
  { month: "Jun", salary: 5500, freelance: 1400, rent: -2000, food: -680, bills: -430, leisure: -800 },
];

const chartConfig = {
  salary: { label: "Salary", color: "var(--chart-2)" },
  freelance: { label: "Freelance", color: "var(--chart-4)" },
  rent: { label: "Rent/Mortgage", color: "var(--chart-3)" },
  food: { label: "Food/Dining", color: "var(--chart-1)" },
  bills: { label: "Bills/Utilities", color: "var(--chart-5)" },
  leisure: { label: "Leisure/Shopping", color: "var(--chart-1)" }, // custom mapping or matching
} satisfies ChartConfig;

export function IncomeExpenseComparison() {
  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wallet className="size-5 text-[#8B5CF6]" />
          Income vs. Expenses
        </CardTitle>
        <CardDescription>Monthly incoming cash flows compared to stacked expenditures</CardDescription>
      </CardHeader>

      <CardContent>
        {/* Cash summary */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex items-center gap-3 p-3 rounded-xl border bg-muted/10">
            <div className="flex size-9 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500">
              <ArrowUpRight className="size-5" />
            </div>
            <div>
              <span className="text-[10px] text-muted-foreground block font-medium">Avg Income</span>
              <span className="text-lg font-bold tabular-nums">$6,796</span>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-xl border bg-muted/10">
            <div className="flex size-9 items-center justify-center rounded-lg bg-red-500/10 text-red-500">
              <ArrowDownRight className="size-5" />
            </div>
            <div>
              <span className="text-[10px] text-muted-foreground block font-medium">Avg Expense</span>
              <span className="text-lg font-bold tabular-nums">-$3,738</span>
            </div>
          </div>
        </div>

        <ChartContainer config={chartConfig} className="aspect-auto h-72 w-full">
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid vertical={false} strokeOpacity={0.5} />
            <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
            <YAxis tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(val) => `$${Math.abs(val)}`} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent className="w-48" indicator="dot" />} />
            <ChartLegend verticalAlign="top" content={<ChartLegendContent className="mb-5 justify-end" />} />

            {/* Income stacked bar */}
            <Bar
              dataKey="salary"
              name="Salary"
              stackId="income"
              fill="var(--color-salary)"
              radius={[0, 0, 0, 0]}
              maxBarSize={30}
            />
            <Bar
              dataKey="freelance"
              name="Freelance"
              stackId="income"
              fill="var(--color-freelance)"
              radius={[4, 4, 0, 0]}
              maxBarSize={30}
            />

            {/* Expenses stacked bar (plotted below 0 automatically because values are negative) */}
            <Bar
              dataKey="rent"
              name="Rent"
              stackId="expense"
              fill="var(--color-rent)"
              radius={[0, 0, 0, 0]}
              maxBarSize={30}
            />
            <Bar
              dataKey="food"
              name="Food"
              stackId="expense"
              fill="var(--color-food)"
              radius={[0, 0, 0, 0]}
              maxBarSize={30}
            />
            <Bar
              dataKey="bills"
              name="Bills"
              stackId="expense"
              fill="var(--color-bills)"
              radius={[0, 0, 0, 0]}
              maxBarSize={30}
            />
            <Bar
              dataKey="leisure"
              name="Leisure"
              stackId="expense"
              fill="hsl(var(--destructive))"
              radius={[0, 0, 4, 4]}
              maxBarSize={30}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
