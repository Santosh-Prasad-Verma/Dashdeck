"use client";

import { ArrowDown, DollarSign, Users } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function UnitEconomics() {
  const ltvCac = 8.9;
  const targetLtvCac = 3.0;
  // Calculate percentage for circular gauge (maxed at 10x for display)
  const ltvCacPercent = Math.min((ltvCac / 10) * 100, 100);

  const currentMrr = 128500;
  const targetMrr = 150000;
  const mrrPercent = (currentMrr / targetMrr) * 100;

  return (
    <Card className="flex h-full flex-col justify-between">
      <CardHeader>
        <CardTitle>Unit Economics & Targets</CardTitle>
        <CardDescription>Performance tracking and growth efficiency</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6 pt-0">
        {/* Dials Row */}
        <div className="grid grid-cols-2 gap-4">
          {/* LTV:CAC Gauge */}
          <div className="flex flex-col items-center justify-center rounded-xl border bg-muted/20 p-3">
            <span className="mb-2 font-medium text-muted-foreground text-xs">LTV : CAC Ratio</span>
            <div className="relative flex size-24 items-center justify-center">
              {/* Background Circle */}
              <svg className="absolute inset-0 size-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="none" stroke="var(--border)" strokeWidth="8" />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="var(--chart-1)"
                  strokeWidth="8"
                  strokeDasharray="251.2"
                  strokeDashoffset={251.2 - (251.2 * ltvCacPercent) / 100}
                  strokeLinecap="round"
                />
              </svg>
              <div className="text-center">
                <span className="font-bold text-xl tracking-tight">{ltvCac}x</span>
                <span className="mt-0.5 block font-medium text-[9px] text-emerald-400">Optimal</span>
              </div>
            </div>
            <span className="mt-3 text-[10px] text-muted-foreground">Target: &gt;{targetLtvCac}.0x</span>
          </div>

          {/* MRR Progress Gauge */}
          <div className="flex flex-col items-center justify-center rounded-xl border bg-muted/20 p-3">
            <span className="mb-2 font-medium text-muted-foreground text-xs">MRR Goal Progress</span>
            <div className="relative flex size-24 items-center justify-center">
              <svg className="absolute inset-0 size-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="none" stroke="var(--border)" strokeWidth="8" />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="var(--chart-2)"
                  strokeWidth="8"
                  strokeDasharray="251.2"
                  strokeDashoffset={251.2 - (251.2 * mrrPercent) / 100}
                  strokeLinecap="round"
                />
              </svg>
              <div className="text-center">
                <span className="font-bold text-xl tracking-tight">{mrrPercent.toFixed(1)}%</span>
                <span className="mt-0.5 block text-[9px] text-muted-foreground">of $150K</span>
              </div>
            </div>
            <span className="mt-3 text-[10px] text-muted-foreground">$128.5K / $150K</span>
          </div>
        </div>

        {/* Stats List */}
        <div className="flex flex-col gap-3.5 border-t pt-4">
          {[
            { label: "Total Customers", value: "2,847", icon: Users, color: "text-[#8B5CF6]" },
            { label: "Churn Rate", value: "2.4%", icon: ArrowDown, color: "text-[#EF4444]" },
            { label: "ARPU", value: "$45.10", icon: DollarSign, color: "text-[#06B6D4]" },
          ].map((stat) => (
            <div key={stat.label} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <stat.icon className={`size-4 ${stat.color}`} />
                <span className="text-muted-foreground text-sm">{stat.label}</span>
              </div>
              <span className="font-semibold text-sm tabular-nums">{stat.value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
