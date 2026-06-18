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
            <span className="text-muted-foreground font-medium text-xs">66%</span>
          </div>
          <Progress value={66} className="h-2" />
        </div>

        <div className="mt-2 pt-4 border-t border-border/50">
          <div className="flex items-center justify-between mb-4">
            <div className="flex flex-col gap-0.5">
              <span className="text-xs text-muted-foreground font-medium">Daily Avg Focus</span>
              <span className="text-lg font-bold tracking-tight flex items-baseline gap-1.5">
                3.9h
                <span className="text-xs text-emerald-500 font-medium flex items-center gap-0.5">
                  <ArrowUpRight className="size-3" /> +12%
                </span>
              </span>
            </div>
            <span className="text-[10px] text-muted-foreground bg-muted px-2 py-0.5 rounded-full font-medium">
              Target: 4.5h
            </span>
          </div>

          <div className="flex justify-between items-end h-20 px-1 gap-2">
            {focusTimeData.map((item, index) => (
              <div key={index} className="flex flex-col items-center gap-1.5 flex-1 group cursor-pointer">
                <div className="relative w-full h-14 bg-muted/30 rounded-sm overflow-hidden flex items-end">
                  <div
                    className="w-full bg-primary/80 group-hover:bg-primary rounded-xs transition-all duration-500 ease-out origin-bottom"
                    style={{ height: `${item.percentage}%` }}
                  />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-foreground/5 transition-opacity" />
                </div>
                <span className="text-[10px] text-muted-foreground font-medium group-hover:text-foreground transition-colors">
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
