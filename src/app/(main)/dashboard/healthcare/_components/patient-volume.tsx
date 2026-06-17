"use client";

import { Area, CartesianGrid, XAxis, YAxis, Line, ComposedChart } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";

const chartData = [
  { month: "Jan", inpatients: 320, outpatients: 850, emergency: 180, staffRatio: 4.2 },
  { month: "Feb", inpatients: 280, outpatients: 920, emergency: 165, staffRatio: 4.5 },
  { month: "Mar", inpatients: 350, outpatients: 880, emergency: 210, staffRatio: 3.8 },
  { month: "Apr", inpatients: 390, outpatients: 940, emergency: 195, staffRatio: 4.0 },
  { month: "May", inpatients: 340, outpatients: 1010, emergency: 230, staffRatio: 3.7 },
  { month: "Jun", inpatients: 410, outpatients: 1050, emergency: 250, staffRatio: 4.4 },
];

const chartConfig = {
  inpatients: { label: "Inpatients", color: "var(--chart-1)" },
  outpatients: { label: "Outpatients", color: "var(--chart-2)" },
  emergency: { label: "Emergency", color: "var(--chart-3)" },
  staffRatio: { label: "Staff Ratio (per 10 pts)", color: "var(--chart-4)" },
} satisfies ChartConfig;

export function PatientVolume() {
  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Patient Volume & Staff Ratio</CardTitle>
        <CardDescription>Monthly patient visits mapped with staff load ratio</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="aspect-auto h-72 w-full">
          <ComposedChart data={chartData} margin={{ top: 10, right: -10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="fillInpatients" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-inpatients)" stopOpacity={0.25} />
                <stop offset="95%" stopColor="var(--color-inpatients)" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeOpacity={0.5} />
            <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
            <YAxis 
              yAxisId="left"
              tickLine={false} 
              axisLine={false} 
              tickMargin={8} 
              tickFormatter={(val) => `${val}`}
            />
            <YAxis 
              yAxisId="right"
              orientation="right"
              domain={[0, 6]}
              tickLine={false} 
              axisLine={false} 
              tickMargin={8} 
              tickFormatter={(val) => `${val}:10`}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent className="w-48" indicator="dot" />} />
            <ChartLegend verticalAlign="top" content={<ChartLegendContent className="mb-5 justify-end" />} />
            
            {/* Outpatients Area */}
            <Area 
              yAxisId="left"
              dataKey="outpatients" 
              type="monotone" 
              fill="transparent" 
              stroke="var(--color-outpatients)" 
              strokeWidth={1.5} 
              dot={false} 
            />
            {/* Inpatients Area */}
            <Area 
              yAxisId="left"
              dataKey="inpatients" 
              type="monotone" 
              fill="url(#fillInpatients)" 
              stroke="var(--color-inpatients)" 
              strokeWidth={1.5} 
              dot={false} 
            />
            {/* Emergency Area */}
            <Area 
              yAxisId="left"
              dataKey="emergency" 
              type="monotone" 
              fill="transparent" 
              stroke="var(--color-emergency)" 
              strokeWidth={1.5} 
              dot={false} 
            />
            
            {/* Staff-to-Patient Ratio Line (plotted on right YAxis) */}
            <Line 
              yAxisId="right"
              dataKey="staffRatio" 
              type="monotone" 
              stroke="var(--color-staffRatio)" 
              strokeWidth={2} 
              dot={{ r: 3, strokeWidth: 1, fill: "var(--background)" }} 
              activeDot={{ r: 5 }}
            />
          </ComposedChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
