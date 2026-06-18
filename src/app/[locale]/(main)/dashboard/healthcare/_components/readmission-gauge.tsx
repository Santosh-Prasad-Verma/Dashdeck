import { ArrowDown } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function ReadmissionGauge() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Readmission Rate</CardTitle>
        <CardDescription>30-day readmission tracking</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        <div className="relative flex size-44 items-center justify-center">
          <svg className="size-full -rotate-90" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle cx="50" cy="50" r="38" fill="none" stroke="var(--muted)" strokeWidth="10" />
            {/* Red zone (bad) -> now styled in very light monochrome */}
            <circle
              cx="50"
              cy="50"
              r="38"
              fill="none"
              stroke="var(--muted-foreground)"
              strokeOpacity={0.15}
              strokeWidth="10"
              strokeDasharray="60 179"
              strokeDashoffset="0"
            />
            {/* Value arc -> now styled in foreground */}
            <circle
              cx="50"
              cy="50"
              r="38"
              fill="none"
              stroke="var(--foreground)"
              strokeWidth="10"
              strokeDasharray={`${(3.2 / 15) * 239} 239`}
              strokeDashoffset="0"
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className="font-bold text-4xl text-foreground">3.2%</span>
            <span className="text-muted-foreground text-xs">Readmission</span>
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1 text-foreground">
            <ArrowDown className="size-3" />
            0.8%
            <span className="text-muted-foreground text-xs">vs target</span>
          </div>
          <span className="text-muted-foreground">|</span>
          <span className="text-muted-foreground text-xs">Target: 4.0%</span>
        </div>
      </CardContent>
    </Card>
  );
}
