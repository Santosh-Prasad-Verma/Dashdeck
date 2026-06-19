import { useTranslations } from "next-intl";

import { RevenueBreakdown } from "./_components/revenue-breakdown";
import { RevenueGeography } from "./_components/revenue-geography";
import { SalesByCategory } from "./_components/sales-by-category";
import { SalesFilters } from "./_components/sales-filters";
import { SalesMetrics } from "./_components/sales-metrics";

export default function Page() {
  const t = useTranslations("Dashboards.sales");

  return (
    <div className="flex flex-col gap-4">
      <div className="space-y-1">
        <h1 className="text-3xl tracking-tight">{t("title")}</h1>
        <p className="text-muted-foreground text-sm">{t("description")}</p>
      </div>

      {/* Filter toolbar preset */}
      <SalesFilters />

      {/* Metrics Cards */}
      <SalesMetrics />

      {/* Main Breakdown Section */}
      <div className="grid @5xl:grid-cols-12 grid-cols-1 gap-4">
        <div className="@5xl:col-span-8 min-w-0">
          <RevenueBreakdown />
        </div>
        <div className="@5xl:col-span-4 min-w-0">
          <SalesByCategory />
        </div>
      </div>

      {/* Geography Section */}
      <RevenueGeography />
    </div>
  );
}
