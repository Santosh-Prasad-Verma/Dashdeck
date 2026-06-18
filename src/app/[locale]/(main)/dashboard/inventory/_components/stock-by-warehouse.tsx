"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

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
  { warehouse: "Warehouse A", inStock: 12400, reserved: 3200, incoming: 1800 },
  { warehouse: "Warehouse B", inStock: 8900, reserved: 2100, incoming: 2400 },
  { warehouse: "Warehouse C", inStock: 15200, reserved: 4500, incoming: 1200 },
  { warehouse: "Warehouse D", inStock: 6200, reserved: 1800, incoming: 900 },
  { warehouse: "Warehouse E", inStock: 9800, reserved: 2800, incoming: 1500 },
];

const chartConfig = {
  inStock: { label: "In Stock", color: "var(--chart-1)" },
  reserved: { label: "Reserved", color: "var(--chart-2)" },
  incoming: { label: "Incoming", color: "var(--chart-3)" },
} satisfies ChartConfig;

export function StockByWarehouse() {
  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Stock by Warehouse</CardTitle>
        <CardDescription>Inventory levels across all locations</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="aspect-auto h-72 w-full">
          <BarChart data={chartData} margin={{ top: 0 }}>
            <CartesianGrid vertical={false} strokeOpacity={0.5} />
            <XAxis dataKey="warehouse" tickLine={false} axisLine={false} tickMargin={8} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent className="w-40" />} />
            <ChartLegend verticalAlign="top" content={<ChartLegendContent className="mb-5 justify-end" />} />
            <Bar dataKey="inStock" fill="var(--color-inStock)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="reserved" fill="var(--color-reserved)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="incoming" fill="var(--color-incoming)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
