"use client";

import { Globe } from "lucide-react";
import { useTranslations } from "next-intl";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface CountryRecord {
  name: string;
  revenue: string;
  orders: string;
  share: number;
  flag: string;
}

const countriesData: CountryRecord[] = [
  { name: "United States", revenue: "$482K", orders: "7,842", share: 37.5, flag: "🇺🇸" },
  { name: "United Kingdom", revenue: "$184K", orders: "2,980", share: 14.3, flag: "🇬🇧" },
  { name: "Germany", revenue: "$142K", orders: "2,415", share: 11.0, flag: "🇩🇪" },
  { name: "Canada", revenue: "$118K", orders: "1,989", share: 9.2, flag: "🇨🇦" },
];

export function RevenueGeography() {
  const t = useTranslations("Dashboards.sales");

  // Mock coordinates for a beautiful dot-grid world map representation
  const mapDots = [
    // North America (US/Canada)
    { x: 50, y: 40, highlight: true },
    { x: 70, y: 50, highlight: true },
    { x: 90, y: 60, highlight: true },
    { x: 80, y: 45, highlight: true },
    { x: 60, y: 55, highlight: true },
    { x: 100, y: 50, highlight: true },

    // South America
    { x: 120, y: 110, highlight: false },
    { x: 130, y: 130, highlight: false },
    { x: 140, y: 120, highlight: false },

    // Europe
    { x: 220, y: 40, highlight: true },
    { x: 230, y: 50, highlight: true },
    { x: 240, y: 45, highlight: true },
    { x: 250, y: 55, highlight: false },

    // Africa
    { x: 230, y: 90, highlight: false },
    { x: 240, y: 110, highlight: false },
    { x: 260, y: 120, highlight: false },

    // Asia
    { x: 320, y: 45, highlight: false },
    { x: 340, y: 60, highlight: false },
    { x: 360, y: 50, highlight: false },
    { x: 380, y: 55, highlight: false },
    { x: 350, y: 70, highlight: false },
    { x: 330, y: 80, highlight: false },

    // Australia
    { x: 410, y: 120, highlight: false },
    { x: 420, y: 130, highlight: false },
  ];

  return (
    <Card className="border-white/[0.04] bg-[#0E0E0E]">
      <CardHeader>
        <CardTitle className="font-semibold text-sm text-white">{t("revenueByGeography")}</CardTitle>
        <CardDescription className="text-muted-foreground text-xs">
          42 countries · concentration top-5: 78%
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-6 pt-2 lg:grid-cols-12">
        {/* SVG Dot Map */}
        <div className="relative flex min-h-[260px] flex-col justify-between overflow-hidden rounded-xl border border-white/[0.03] bg-black/40 p-4 lg:col-span-8">
          <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
            <Globe className="size-3.5" />
            <span>Sales Density Mapping</span>
          </div>

          <div className="relative mt-4 h-40 w-full">
            <svg viewBox="0 0 500 160" className="h-full w-full opacity-85">
              {mapDots.map((dot, index) => (
                <circle
                  key={index}
                  cx={dot.x}
                  cy={dot.y}
                  r="3.5"
                  fill={dot.highlight ? "#8B5CF6" : "#2d2d2d"}
                  className="transition-all duration-300"
                />
              ))}
            </svg>

            {/* Map Tooltip on USA */}
            <div className="absolute top-[40%] left-[8%] flex flex-col gap-0.5 rounded-lg border border-white/[0.08] bg-black/95 p-2 font-mono text-[10px] shadow-xl">
              <span className="font-bold text-white">🇺🇸 United States</span>
              <span className="font-semibold text-violet-500">$482,109</span>
              <span className="text-[9px] text-muted-foreground">7,842 orders (37.5% share)</span>
            </div>
          </div>
        </div>

        {/* Top Countries rank list */}
        <div className="flex flex-col justify-center gap-4 lg:col-span-4">
          <div className="flex items-center justify-between border-white/[0.04] border-b pb-2 font-semibold text-white text-xs">
            <span>{t("topCountries")}</span>
            <span className="text-muted-foreground">by revenue</span>
          </div>

          <div className="space-y-3.5">
            {countriesData.map((country) => (
              <div key={country.name} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-sm leading-none">{country.flag}</span>
                    <span className="font-medium text-muted-foreground">{country.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-white">{country.revenue}</span>
                    <span className="font-mono text-[10px] text-muted-foreground">{country.orders}</span>
                  </div>
                </div>
                <Progress value={country.share} className="h-1 bg-white/[0.04] *:bg-violet-500" />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
