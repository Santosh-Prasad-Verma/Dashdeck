"use client";

import { useState } from "react";

import { Download, Filter, Share2 } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function SalesFilters() {
  const t = useTranslations("Dashboards.sales");
  const [timePreset, setTimePreset] = useState("weekly");

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-muted/40 border-b pb-4">
      {/* Time Presets */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex rounded-lg border border-muted/60 bg-muted/40 p-0.5 font-mono font-semibold text-muted-foreground text-xs">
          <button
            type="button"
            onClick={() => setTimePreset("daily")}
            className={`rounded-md px-3 py-1.5 transition-all ${
              timePreset === "daily" ? "bg-orange-500 font-bold text-white" : "hover:text-foreground"
            }`}
          >
            {t("daily")}
          </button>
          <button
            type="button"
            onClick={() => setTimePreset("weekly")}
            className={`rounded-md px-3 py-1.5 transition-all ${
              timePreset === "weekly" ? "bg-orange-500 font-bold text-white" : "hover:text-foreground"
            }`}
          >
            {t("weekly")}
          </button>
          <button
            type="button"
            onClick={() => setTimePreset("monthly")}
            className={`rounded-md px-3 py-1.5 transition-all ${
              timePreset === "monthly" ? "bg-orange-500 font-bold text-white" : "hover:text-foreground"
            }`}
          >
            {t("monthly")}
          </button>
          <button
            type="button"
            onClick={() => setTimePreset("quarterly")}
            className={`rounded-md px-3 py-1.5 transition-all ${
              timePreset === "quarterly" ? "bg-orange-500 font-bold text-white" : "hover:text-foreground"
            }`}
          >
            {t("quarterly")}
          </button>
        </div>

        {/* Dropdowns */}
        <Select defaultValue="90">
          <SelectTrigger className="h-9 w-[130px] font-semibold text-xs">
            <SelectValue placeholder="Date range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="90">{t("last90days")}</SelectItem>
            <SelectItem value="30">Last 30 days</SelectItem>
            <SelectItem value="180">Last 180 days</SelectItem>
          </SelectContent>
        </Select>

        <Select defaultValue="all">
          <SelectTrigger className="h-9 w-[120px] font-semibold text-xs">
            <SelectValue placeholder="Channel" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("allChannels")}</SelectItem>
            <SelectItem value="direct">Direct</SelectItem>
            <SelectItem value="social">Social</SelectItem>
            <SelectItem value="email">Email</SelectItem>
          </SelectContent>
        </Select>

        <Select defaultValue="all">
          <SelectTrigger className="h-9 w-[130px] font-semibold text-xs">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("allCategories")}</SelectItem>
            <SelectItem value="apparel">Apparel</SelectItem>
            <SelectItem value="home">Home & Living</SelectItem>
            <SelectItem value="footwear">Footwear</SelectItem>
          </SelectContent>
        </Select>

        <Select defaultValue="compare">
          <SelectTrigger className="h-9 w-[180px] font-semibold text-xs">
            <SelectValue placeholder="Comparison" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="compare">{t("compare")}</SelectItem>
            <SelectItem value="none">No comparison</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" className="flex h-9 items-center gap-1.5 font-semibold text-xs">
          <Filter className="size-3.5" />
          {t("filters")}
          <span className="rounded border border-orange-500/20 bg-orange-500/10 px-1 py-0.2 font-bold text-[9px] text-orange-500">
            2
          </span>
        </Button>
        <Button variant="outline" size="sm" className="flex h-9 items-center gap-1.5 font-semibold text-xs">
          <Download className="size-3.5" />
          {t("export")}
        </Button>
        <Button variant="outline" size="sm" className="flex h-9 items-center gap-1.5 font-semibold text-xs">
          <Share2 className="size-3.5" />
          {t("share")}
        </Button>
      </div>
    </div>
  );
}
