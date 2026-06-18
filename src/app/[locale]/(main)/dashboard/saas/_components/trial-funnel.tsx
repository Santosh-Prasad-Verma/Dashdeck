"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { ChartConfig } from "@/components/ui/chart";

const chartData = [
  { stage: "Visit Site", users: 12400, fill: "var(--chart-1)" },
  { stage: "Start Trial", users: 6200, fill: "var(--chart-2)" },
  { stage: "Feature Used", users: 3400, fill: "var(--chart-3)" },
  { stage: "Team Added", users: 1800, fill: "var(--chart-4)" },
  { stage: "Payment", users: 840, fill: "var(--chart-5)" },
];

const _chartConfig = {} satisfies ChartConfig;

const colors = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];

export function TrialFunnel() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Trial Conversion Funnel</CardTitle>
        <CardDescription>User journey from signup to paid</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          {chartData.map((stage, i) => (
            <div key={stage.stage} className="flex items-center gap-3">
              <div className="w-32 text-muted-foreground text-xs">{stage.stage}</div>
              <div className="flex-1">
                <div className="h-8 overflow-hidden rounded-lg bg-muted/50">
                  <div
                    className="flex h-full items-center rounded-lg pl-3 font-medium text-white text-xs transition-all"
                    style={{
                      width: `${(stage.users / chartData[0].users) * 100}%`,
                      backgroundColor: colors[i],
                    }}
                  >
                    {stage.users.toLocaleString()}
                  </div>
                </div>
              </div>
              <div className="w-20 text-right">
                <span className="font-medium text-sm tabular-nums">
                  {((stage.users / chartData[0].users) * 100).toFixed(1)}%
                </span>
                {i > 0 && (
                  <span className="ml-1 text-muted-foreground text-xs">
                    {((stage.users / chartData[i - 1].users) * 100).toFixed(0)}%
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-lg bg-muted/30 p-3 text-center text-muted-foreground text-sm">
          Overall conversion: <span className="font-medium text-foreground">6.8%</span> (840 paying from 12,400 trials)
        </div>
      </CardContent>
    </Card>
  );
}
