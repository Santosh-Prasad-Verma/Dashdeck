import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const focusTimeData = [
  { day: "M", hours: 4.5, percentage: 75 },
  { day: "T", hours: 6.0, percentage: 100 },
  { day: "W", hours: 3.2, percentage: 53 },
  { day: "T", hours: 5.1, percentage: 85 },
  { day: "F", hours: 4.8, percentage: 80 },
  { day: "S", hours: 2.0, percentage: 33 },
  { day: "S", hours: 1.5, percentage: 25 },
];

export function WeeklySummaryCard() {
  return (
    <Card className="shadow-xs">
      <CardHeader>
        <CardTitle>This Week</CardTitle>
        <CardAction>
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            View all
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <p className="text-muted-foreground text-sm">You’re doing great. Keep the momentum going.</p>
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">4 of 6 goals completed</span>
            <span className="font-medium text-muted-foreground text-xs">66%</span>
          </div>
          <Progress value={66} className="h-2" />
        </div>

        <div className="mt-2 border-border/50 border-t pt-4">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex flex-col gap-0.5">
              <span className="font-medium text-muted-foreground text-xs">Daily Avg Focus</span>
              <span className="flex items-baseline gap-1.5 font-bold text-lg tracking-tight">
                3.9h
                <span className="flex items-center gap-0.5 font-medium text-emerald-500 text-xs">
                  <ArrowUpRight className="size-3" /> +12%
                </span>
              </span>
            </div>
            <span className="rounded-full bg-muted px-2 py-0.5 font-medium text-[10px] text-muted-foreground">
              Target: 4.5h
            </span>
          </div>

          <div className="flex h-20 items-end justify-between gap-2 px-1">
            {focusTimeData.map((item, index) => (
              <div key={index} className="group flex flex-1 cursor-pointer flex-col items-center gap-1.5">
                <div className="relative flex h-14 w-full items-end overflow-hidden rounded-sm bg-muted/30">
                  <div
                    className="w-full origin-bottom rounded-xs bg-primary/80 transition-all duration-500 ease-out group-hover:bg-primary"
                    style={{ height: `${item.percentage}%` }}
                  />
                  <div className="absolute inset-0 bg-foreground/5 opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
                <span className="font-medium text-[10px] text-muted-foreground transition-colors group-hover:text-foreground">
                  {item.day}
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
