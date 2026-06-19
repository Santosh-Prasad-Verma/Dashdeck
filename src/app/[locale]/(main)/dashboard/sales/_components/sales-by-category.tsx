"use client";

import { useTranslations } from "next-intl";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const categoryData = [
  { name: "Apparel", value: 38.4, amount: "$493K", fill: "#8B5CF6" },
  { name: "Home & Living", value: 24.1, amount: "$309K", fill: "#A78BFA" },
  { name: "Footwear", value: 17.6, amount: "$226K", fill: "#C4B5FD" },
  { name: "Accessories", value: 12.8, amount: "$164K", fill: "#DDD6FE" },
  { name: "Other", value: 7.1, amount: "$91K", fill: "#EDE9FE" },
];

export function SalesByCategory() {
  const t = useTranslations("Dashboards.sales");

  return (
    <Card className="border-white/[0.04] bg-[#0E0E0E]">
      <CardHeader className="pb-2">
        <CardTitle className="font-semibold text-sm text-white">{t("salesByCategory")}</CardTitle>
        <CardDescription className="text-muted-foreground text-xs">$1.28M total sales volume</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-between gap-6 pt-4 sm:flex-row">
        {/* Donut Chart */}
        <div className="relative size-[160px] shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={75}
                paddingAngle={4}
                dataKey="value"
              >
                {categoryData.map((entry) => (
                  <Cell key={entry.name} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => `${value}%`}
                contentStyle={{ backgroundColor: "hsl(var(--background))", borderColor: "hsl(var(--border))" }}
              />
            </PieChart>
          </ResponsiveContainer>
          {/* Centered Total Ring Text */}
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Apparel</span>
            <span className="font-bold text-base text-white leading-none">38.4%</span>
            <span className="mt-0.5 text-[9px] text-muted-foreground">$493K</span>
          </div>
        </div>

        {/* Legend List */}
        <div className="w-full flex-1 space-y-2.5">
          {categoryData.map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between border-white/[0.02] border-b pb-1.5 text-xs last:border-0 last:pb-0"
            >
              <div className="flex items-center gap-2">
                <span className="size-2 shrink-0 rounded-full" style={{ backgroundColor: item.fill }} />
                <span className="font-medium text-muted-foreground">{item.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-semibold text-white">{item.value}%</span>
                <span className="font-mono text-[10px] text-muted-foreground">{item.amount}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
