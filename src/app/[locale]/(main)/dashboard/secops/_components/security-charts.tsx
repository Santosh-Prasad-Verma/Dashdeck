"use client";

import { useTranslations } from "next-intl";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const threatData = [
  { day: "Mon", blocked: 120, failures: 45 },
  { day: "Tue", blocked: 240, failures: 55 },
  { day: "Wed", blocked: 180, failures: 40 },
  { day: "Thu", blocked: 320, failures: 95 },
  { day: "Fri", blocked: 290, failures: 65 },
  { day: "Sat", blocked: 150, failures: 30 },
  { day: "Sun", blocked: 170, failures: 35 },
];

const complianceStandards = [
  { name: "SOC2 Type II", status: "Compliant", score: "100%", date: "2026-06-01", type: "success" },
  { name: "ISO 27001", status: "Compliant", score: "100%", date: "2026-05-15", type: "success" },
  { name: "GDPR", status: "Compliant", score: "95%", date: "2026-05-10", type: "success" },
  { name: "HIPAA", status: "Needs Review", score: "88%", date: "2026-06-18", type: "warning" },
];

export function SecurityCharts() {
  const t = useTranslations("Dashboards.secops");

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
      {/* Threat Events Chart */}
      <Card className="lg:col-span-8">
        <CardHeader>
          <CardTitle className="font-semibold text-lg">{t("threatTimeline")}</CardTitle>
          <CardDescription>{t("threatTimelineDesc")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={threatData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorBlocked" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-emerald-500, #10b981)" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="var(--color-emerald-500, #10b981)" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="colorFailures" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-amber-500, #f59e0b)" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="var(--color-amber-500, #f59e0b)" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted/30" />
                <XAxis dataKey="day" className="fill-muted-foreground text-xs" tickLine={false} />
                <YAxis className="fill-muted-foreground text-xs" tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--background))",
                    borderColor: "hsl(var(--border))",
                    color: "hsl(var(--foreground))",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="blocked"
                  stroke="var(--color-emerald-500, #10b981)"
                  fillOpacity={1}
                  fill="url(#colorBlocked)"
                  name="Blocked Attacks"
                />
                <Area
                  type="monotone"
                  dataKey="failures"
                  stroke="var(--color-amber-500, #f59e0b)"
                  fillOpacity={1}
                  fill="url(#colorFailures)"
                  name="Auth Failures"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Compliance Standards Grid */}
      <Card className="lg:col-span-4">
        <CardHeader>
          <CardTitle className="font-semibold text-lg">{t("complianceStatus")}</CardTitle>
          <CardDescription>Status of certified security compliance benchmarks.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {complianceStandards.map((std) => (
            <div key={std.name} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
              <div className="space-y-0.5">
                <span className="font-medium text-sm">{std.name}</span>
                <p className="text-muted-foreground text-xs">Last Audited: {std.date}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm">{std.score}</span>
                <Badge variant={std.type === "success" ? "default" : "secondary"}>{std.status}</Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
