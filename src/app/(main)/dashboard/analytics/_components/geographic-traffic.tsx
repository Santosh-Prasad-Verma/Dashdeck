"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, TrendingUp, ArrowUpRight } from "lucide-react";

const countryData = [
  { country: "United States", code: "US", users: 14200, percentage: 45.2, trend: "+12.4%" },
  { country: "United Kingdom", code: "GB", users: 5120, percentage: 16.3, trend: "+8.7%" },
  { country: "Germany", code: "DE", users: 3840, percentage: 12.2, trend: "+14.1%" },
  { country: "India", code: "IN", users: 2900, percentage: 9.2, trend: "+22.5%" },
  { country: "Canada", code: "CA", users: 2150, percentage: 6.8, trend: "+4.3%" },
  { country: "Australia", code: "AU", users: 1600, percentage: 5.1, trend: "+10.2%" },
];

export function GeographicTraffic() {
  return (
    <Card className="@container/card h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="size-5 text-[#8B5CF6]" />
          Geographic Traffic
        </CardTitle>
        <CardDescription>Audience distribution by top active locations</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 pt-0">
        {/* World Map Layout (SVG Grid representation of active nodes) */}
        <div className="relative h-48 rounded-xl border bg-muted/10 overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:radial-gradient(ellipse_at_center,white,transparent_75%)]" />
          
          {/* Custom SVG World Map Outline / Scatter Points */}
          <svg className="w-full h-full text-muted-foreground/15" viewBox="0 0 400 200" fill="currentColor">
            {/* North America */}
            <circle cx="80" cy="60" r="15" opacity="0.4" />
            <circle cx="95" cy="75" r="10" opacity="0.4" />
            {/* South America */}
            <circle cx="120" cy="130" r="12" opacity="0.3" />
            {/* Europe */}
            <circle cx="200" cy="55" r="14" opacity="0.4" />
            {/* Asia */}
            <circle cx="280" cy="65" r="22" opacity="0.4" />
            <circle cx="310" cy="90" r="16" opacity="0.4" />
            {/* Africa */}
            <circle cx="210" cy="115" r="15" opacity="0.3" />
            {/* Australia */}
            <circle cx="340" cy="150" r="10" opacity="0.3" />

            {/* Glowing Active Pins */}
            <g className="animate-pulse">
              {/* US East */}
              <circle cx="95" cy="65" r="5" fill="#8B5CF6" />
              <circle cx="95" cy="65" r="9" stroke="#8B5CF6" strokeWidth="1" fill="none" opacity="0.6" />
              
              {/* UK */}
              <circle cx="195" cy="50" r="4.5" fill="#06B6D4" />
              <circle cx="195" cy="50" r="8.5" stroke="#06B6D4" strokeWidth="1" fill="none" opacity="0.6" />
              
              {/* India */}
              <circle cx="285" cy="85" r="5" fill="#8B5CF6" />
              <circle cx="285" cy="85" r="9" stroke="#8B5CF6" strokeWidth="1" fill="none" opacity="0.6" />
              
              {/* Germany */}
              <circle cx="210" cy="58" r="4" fill="#06B6D4" />
              <circle cx="210" cy="58" r="8" stroke="#06B6D4" strokeWidth="1" fill="none" opacity="0.6" />
            </g>
          </svg>

          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-black/60 border border-white/10 px-2 py-0.5 text-[9px] text-gray-400 backdrop-blur-sm">
            <span className="size-1.5 rounded-full bg-emerald-500 animate-ping" />
            <span>4 active traffic centers</span>
          </div>
        </div>

        {/* Country Breakdown Stats */}
        <div className="space-y-4">
          {countryData.map((country) => (
            <div key={country.code} className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span aria-hidden="true" className={`flag:${country.code} shrink-0 rounded-xs ring-1 ring-foreground/10 text-sm`} />
                  <span className="font-semibold text-gray-300">{country.country}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-semibold text-gray-200">{country.users.toLocaleString()}</span>
                  <span className="text-[10px] text-emerald-400 font-medium flex items-center gap-0.5">
                    <ArrowUpRight className="size-3" />
                    {country.trend}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-1.5 flex-1 bg-muted/40 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-[#8B5CF6] to-[#06B6D4] rounded-full"
                    style={{ width: `${country.percentage}%` }}
                  />
                </div>
                <span className="text-[10px] text-muted-foreground w-8 text-right font-medium">{country.percentage}%</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
