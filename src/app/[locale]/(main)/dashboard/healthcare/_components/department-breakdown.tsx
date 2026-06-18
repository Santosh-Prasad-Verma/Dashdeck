"use client";

import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart } from "recharts";

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
  { department: "Cardiology", patients: 92, staff: 70 },
  { department: "Neurology", patients: 78, staff: 85 },
  { department: "Orthopedics", patients: 85, staff: 60 },
  { department: "Pediatrics", patients: 68, staff: 75 },
  { department: "Oncology", patients: 52, staff: 48 },
  { department: "Emergency", patients: 95, staff: 90 },
];

const chartConfig = {
  patients: { label: "Patient Load", color: "var(--chart-1)" },
  staff: { label: "Staff Allocation", color: "var(--chart-2)" },
} satisfies ChartConfig;

export function DepartmentBreakdown() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Resource Allocation</CardTitle>
        <CardDescription>Department workload compared to staffed capacity</CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square h-72 w-full">
          <RadarChart cx="50%" cy="50%" outerRadius="75%" data={chartData}>
            <PolarGrid stroke="var(--border)" strokeWidth={1} strokeOpacity={0.5} />
            <PolarAngleAxis
              dataKey="department"
              tick={{ fill: "var(--muted-foreground)", fontSize: 10, fontWeight: 500 }}
            />
            <PolarRadiusAxis
              angle={30}
              domain={[0, 100]}
              tick={{ fill: "var(--muted-foreground)", fontSize: 8 }}
              tickFormatter={(val) => `${val}%`}
              axisLine={false}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <ChartLegend verticalAlign="bottom" content={<ChartLegendContent className="mt-3 justify-center" />} />

            <Radar
              name="Patient Load"
              dataKey="patients"
              stroke="var(--color-patients)"
              fill="var(--color-patients)"
              fillOpacity={0.25}
              strokeWidth={1.5}
            />
            <Radar
              name="Staff Allocation"
              dataKey="staff"
              stroke="var(--color-staff)"
              fill="var(--color-staff)"
              fillOpacity={0.25}
              strokeWidth={1.5}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
