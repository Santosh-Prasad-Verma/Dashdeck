"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const WEEKS = 26;

const generateHeatmap = () => {
  const data: number[][] = [];
  for (let w = 0; w < WEEKS; w++) {
    const week: number[] = [];
    for (let d = 0; d < 7; d++) {
      week.push(Math.floor(Math.random() * 100));
    }
    data.push(week);
  }
  return data;
};

const heatmap = generateHeatmap();

function getHeatColor(value: number) {
  if (value === 0) return "bg-muted/50";
  if (value < 20) return "bg-emerald-100 dark:bg-emerald-950";
  if (value < 40) return "bg-emerald-300 dark:bg-emerald-800";
  if (value < 60) return "bg-emerald-500 dark:bg-emerald-600";
  return "bg-emerald-700 dark:bg-emerald-400";
}

export function PostingHeatmap() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Posting Activity</CardTitle>
          <CardDescription>Engagement heatmap — last 6 months</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-start gap-1">
          <div className="flex flex-col gap-[2px] pr-2">
            {DAYS.map((day) => (
              <span key={day} className="pt-0.5 text-[10px] text-muted-foreground leading-tight">
                {day}
              </span>
            ))}
          </div>
          <div className="flex-1 overflow-hidden">
            <div className="flex gap-[2px]">
              {heatmap.map((week, wi) => (
                <div key={wi} className="flex flex-col gap-[2px]">
                  {week.map((value, di) => (
                    <div
                      key={`${wi}-${di}`}
                      className={cn("size-[11px] rounded-[2px]", getHeatColor(value))}
                      title={`${value} engagements`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-end gap-2 text-[10px] text-muted-foreground">
          <span>Less</span>
          {[0, 20, 40, 60, 80].map((v) => (
            <div key={v} className={cn("size-[11px] rounded-[2px]", getHeatColor(v))} />
          ))}
          <span>More</span>
        </div>
      </CardContent>
    </Card>
  );
}
