"use client";

import { Cell, Pie, PieChart } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const chartData = [
  { department: "Cardiology", patients: 1240, fill: "hsl(var(--foreground))" },
  { department: "Neurology", patients: 980, fill: "hsl(var(--muted-foreground))" },
  { department: "Orthopedics", patients: 850, fill: "hsl(var(--muted-foreground) / 0.7)" },
  { department: "Pediatrics", patients: 720, fill: "hsl(var(--muted-foreground) / 0.4)" },
  { department: "Oncology", patients: 580, fill: "hsl(var(--muted-foreground) / 0.2)" },
];

const chartConfig = {} satisfies ChartConfig;
const total = chartData.reduce((acc, curr) => acc + curr.patients, 0);

export function DepartmentBreakdown() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Department Breakdown</CardTitle>
        <CardDescription>Patient distribution by department</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-center gap-6">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square h-44 w-full max-w-[160px]">
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey="patients" nameKey="department" innerRadius={45} strokeWidth={2} stroke="hsl(var(--background))">
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
        <div className="flex flex-col gap-2">
          {chartData.map((item) => (
            <div key={item.department} className="flex items-center gap-2 text-sm">
              <div className="size-2.5 rounded-full" style={{ backgroundColor: item.fill }} />
              <span className="w-24">{item.department}</span>
              <span className="font-medium tabular-nums">{item.patients.toLocaleString()}</span>
            </div>
          ))}
          <div className="border-t pt-1 mt-1">
            <div className="flex items-center gap-2 text-sm font-medium">
              <span className="w-28">Total</span>
              <span className="tabular-nums">{total.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
