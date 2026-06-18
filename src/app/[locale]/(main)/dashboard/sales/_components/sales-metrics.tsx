"use client";

import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function SalesMetrics() {
  const t = useTranslations("Dashboards.sales");

  return (
    <div className="grid grid-cols-1 gap-4 *:data-[slot=card]:border-white/[0.04] *:data-[slot=card]:bg-[#0E0E0E] sm:grid-cols-2 lg:grid-cols-4">
      {/* Revenue Card */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardDescription className="font-medium text-muted-foreground text-xs">{t("revenue")}</CardDescription>
            <span className="inline-flex items-center gap-0.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 font-bold text-[10px] text-emerald-500">
              <ArrowUpRight className="size-3" />
              +12.5%
            </span>
          </div>
        </CardHeader>
        <CardContent className="space-y-1">
          <CardTitle className="font-semibold text-3xl text-white tracking-tight">$1,284K</CardTitle>
          <p className="text-[10px] text-muted-foreground">{t("prev")} $1,142K</p>
        </CardContent>
      </Card>

      {/* Customers Card */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardDescription className="font-medium text-muted-foreground text-xs">{t("customers")}</CardDescription>
            <span className="inline-flex items-center gap-0.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 font-bold text-[10px] text-emerald-500">
              <ArrowUpRight className="size-3" />
              +11.1%
            </span>
          </div>
        </CardHeader>
        <CardContent className="space-y-1">
          <CardTitle className="font-semibold text-3xl text-white tracking-tight">24,891</CardTitle>
          <p className="text-[10px] text-muted-foreground">{t("prev")} 22,408</p>
        </CardContent>
      </Card>

      {/* Repeat Rate Card */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardDescription className="font-medium text-muted-foreground text-xs">{t("repeatRate")}</CardDescription>
            <span className="inline-flex items-center gap-0.5 rounded-full border border-rose-500/20 bg-rose-500/10 px-2 py-0.5 font-bold text-[10px] text-rose-500">
              <ArrowDownRight className="size-3" />
              -2.6pp
            </span>
          </div>
        </CardHeader>
        <CardContent className="space-y-1">
          <CardTitle className="font-semibold text-3xl text-white tracking-tight">38.4%</CardTitle>
          <p className="text-[10px] text-muted-foreground">{t("prev")} 41.0%</p>
        </CardContent>
      </Card>

      {/* Refund Rate Card */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardDescription className="font-medium text-muted-foreground text-xs">{t("refundRate")}</CardDescription>
            <span className="inline-flex items-center gap-0.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 font-bold text-[10px] text-emerald-500">
              <ArrowDownRight className="size-3" />
              -0.6pp
            </span>
          </div>
        </CardHeader>
        <CardContent className="space-y-1">
          <CardTitle className="font-semibold text-3xl text-white tracking-tight">1.8%</CardTitle>
          <p className="text-[10px] text-muted-foreground">{t("prev")} 2.4%</p>
        </CardContent>
      </Card>
    </div>
  );
}
