"use client";

import { Bar, BarChart, CartesianGrid, XAxis, PolarAngleAxis, RadialBar, RadialBarChart } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const demographicData = [
  { age: "18-24", users: 4200, percentage: 18 },
  { age: "25-34", users: 8900, percentage: 38 },
  { age: "35-44", users: 6200, percentage: 26 },
  { age: "45-54", users: 2800, percentage: 12 },
  { age: "55+", users: 1500, percentage: 6 },
];

const deviceData = [
  { device: "Desktop", users: 14200, fill: "var(--chart-1)" },
  { device: "Mobile", users: 8400, fill: "var(--chart-2)" },
  { device: "Tablet", users: 1800, fill: "var(--chart-3)" },
];

const locationData = [
  { country: "United States", users: 8200, flag: "us" },
  { country: "United Kingdom", users: 3400, flag: "gb" },
  { country: "Germany", users: 2800, flag: "de" },
  { country: "France", users: 2100, flag: "fr" },
  { country: "Canada", users: 1800, flag: "ca" },
  { country: "Australia", users: 1500, flag: "au" },
  { country: "India", users: 1200, flag: "in" },
  { country: "Japan", users: 900, flag: "jp" },
];

const chartConfig = {
  users: {
    label: "Users",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

const deviceConfig = {
  users: {
    label: "Users",
  },
} satisfies ChartConfig;

export function AudienceView() {
  const totalUsers = demographicData.reduce((acc, curr) => acc + curr.users, 0);
  const totalDeviceUsers = deviceData.reduce((acc, curr) => acc + curr.users, 0);
  const deviceRadialData = [
    {
      name: "Tablet",
      value: Math.round((deviceData[2].users / totalDeviceUsers) * 100),
      fill: "var(--chart-3)",
    },
    {
      name: "Mobile",
      value: Math.round((deviceData[1].users / totalDeviceUsers) * 100),
      fill: "var(--chart-2)",
    },
    {
      name: "Desktop",
      value: Math.round((deviceData[0].users / totalDeviceUsers) * 100),
      fill: "var(--chart-1)",
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Age Demographics</CardTitle>
            <CardDescription>User distribution by age group</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-64 w-full">
              <BarChart data={demographicData} margin={{ top: 0 }}>
                <CartesianGrid vertical={false} strokeOpacity={0.5} />
                <XAxis dataKey="age" tickLine={false} axisLine={false} tickMargin={8} />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent className="w-36" />}
                />
                <Bar dataKey="users" fill="var(--color-users)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Device Breakdown</CardTitle>
            <CardDescription>Users by device type</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center gap-8">
            <ChartContainer config={deviceConfig} className="mx-auto aspect-square h-48 w-full max-w-[180px] relative">
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-2xl font-bold tracking-tight">24.4k</span>
                <span className="text-[10px] text-muted-foreground uppercase font-semibold">Total</span>
              </div>
              <RadialBarChart
                cx="50%"
                cy="50%"
                innerRadius="35%"
                outerRadius="100%"
                barSize={6}
                data={deviceRadialData}
                startAngle={90}
                endAngle={-270}
              >
                <PolarAngleAxis
                  type="number"
                  domain={[0, 100]}
                  angleAxisId={0}
                  tick={false}
                />
                <RadialBar
                  background={{ fill: "var(--muted)", opacity: 0.1 }}
                  dataKey="value"
                  cornerRadius={4}
                />
              </RadialBarChart>
            </ChartContainer>
            <div className="flex flex-col gap-3">
              {deviceData.map((device) => (
                <div key={device.device} className="flex items-center gap-2 text-sm">
                  <div className="size-2.5 rounded-full" style={{ backgroundColor: device.fill }} />
                  <span className="w-16">{device.device}</span>
                  <span className="font-medium tabular-nums">{device.users.toLocaleString()}</span>
                  <span className="text-muted-foreground">
                    ({((device.users / totalDeviceUsers) * 100).toFixed(0)}%)
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Top Locations</CardTitle>
          <CardDescription>Users by country</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {locationData.map((location) => (
              <div key={location.country} className="flex items-center gap-3 rounded-lg border p-3">
                <Avatar className="size-8">
                  <AvatarFallback className="text-xs">
                    {location.flag.toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{location.country}</div>
                  <div className="text-muted-foreground text-xs">{location.users.toLocaleString()} users</div>
                </div>
                <div className="text-muted-foreground text-xs tabular-nums">
                  {((location.users / totalUsers) * 100).toFixed(1)}%
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
