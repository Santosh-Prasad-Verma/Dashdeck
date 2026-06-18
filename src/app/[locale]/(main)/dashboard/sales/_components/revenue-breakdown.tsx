"use client";

import { useTranslations } from "next-intl";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const monthlyData = [
  { name: "Jan", Income: 85000, Refunds: 5000 },
  { name: "Feb", Income: 92000, Refunds: 6200 },
  { name: "Mar", Income: 110000, Refunds: 8000 },
  { name: "Apr", Income: 98000, Refunds: 4500 },
  { name: "May", Income: 115000, Refunds: 7200 },
  { name: "Jun", Income: 128000, Refunds: 9100 },
  { name: "Jul", Income: 105000, Refunds: 5200 },
  { name: "Aug", Income: 122000, Refunds: 11000 },
  { name: "Sep", Income: 135000, Refunds: 8200 },
  { name: "Oct", Income: 118000, Refunds: 6500 },
  { name: "Nov", Income: 125000, Refunds: 7000 },
  { name: "Dec", Income: 142000, Refunds: 12000 },
];

export function RevenueBreakdown() {
  const t = useTranslations("Dashboards.sales");

  return (
    <Card className="border-white/[0.04] bg-[#0E0E0E]">
      <CardHeader className="flex flex-col gap-2 pb-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-0.5">
          <CardTitle className="font-semibold text-sm text-white">{t("revenueBreakdown")}</CardTitle>
          <CardDescription className="text-muted-foreground text-xs">{t("revenueBreakdownDesc")}</CardDescription>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="font-bold text-white text-xl">$1,284,584</span>
          <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-1.5 py-0.5 font-bold text-[10px] text-emerald-500">
            +12.5%
          </span>
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-white/[0.04]" vertical={false} />
              <XAxis dataKey="name" className="fill-muted-foreground text-[10px]" tickLine={false} />
              <YAxis
                className="fill-muted-foreground text-[10px]"
                tickLine={false}
                tickFormatter={(value) => `$${value / 1000}k`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--background))",
                  borderColor: "hsl(var(--border))",
                  color: "white",
                  fontSize: "11px",
                  fontFamily: "monospace",
                }}
                formatter={(value) => `$${Number(value).toLocaleString()}`}
              />
              {/* Stacked/Double Bar layout in warm orange/amber palettes */}
              <Bar dataKey="Income" fill="#ea580c" radius={[3, 3, 0, 0]} name="Income" />
              <Bar dataKey="Refunds" fill="#fcd34d" radius={[3, 3, 0, 0]} name="Refunds" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
