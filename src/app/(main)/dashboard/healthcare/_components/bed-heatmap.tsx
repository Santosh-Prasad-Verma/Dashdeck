"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function BedHeatmap() {
  const wings = [
    { name: "ICU", total: 12, occupied: 10, critical: 3 },
    { name: "Surgery", total: 24, occupied: 18, critical: 0 },
    { name: "Cardiology", total: 20, occupied: 14, critical: 2 },
    { name: "Neurology", total: 16, occupied: 12, critical: 1 },
    { name: "Pediatrics", total: 18, occupied: 8, critical: 0 },
    { name: "Oncology", total: 14, occupied: 11, critical: 1 },
    { name: "General", total: 30, occupied: 22, critical: 0 },
    { name: "Emergency", total: 20, occupied: 16, critical: 4 },
  ];

  function getBedColor(total: number, occupied: number) {
    const ratio = occupied / total;
    if (ratio > 0.85) return "bg-foreground";
    if (ratio > 0.7) return "bg-muted-foreground/80";
    if (ratio > 0.5) return "bg-muted-foreground/50";
    return "bg-muted-foreground/30";
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bed Occupancy Heatmap</CardTitle>
        <CardDescription>Real-time bed availability by wing</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {wings.map((wing) => (
            <div key={wing.name} className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{wing.name}</span>
                  {wing.critical > 0 && (
                    <span className="rounded-full bg-foreground/10 px-2 py-0.5 text-foreground border border-foreground/20 text-[10px] font-medium">
                      {wing.critical} critical
                    </span>
                  )}
                </div>
                <span className="text-sm tabular-nums">{wing.occupied}/{wing.total}</span>
              </div>
              <div className="flex gap-1">
                {Array.from({ length: wing.total }).map((_, i) => (
                  <div
                    key={i}
                    className={cn(
                      "h-5 flex-1 rounded-sm transition-colors",
                      i < wing.occupied ? getBedColor(wing.total, wing.occupied) : "bg-muted"
                    )}
                    title={i < wing.occupied ? "Occupied" : "Available"}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
