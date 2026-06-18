import { AlertTriangle, ArrowDown, ArrowUp, Box, Package, Truck } from "lucide-react";

import { ABCAnalysis } from "./_components/abc-analysis";
import { CapacityGauge } from "./_components/capacity-gauge";
import { CategoryBreakdown } from "./_components/category-breakdown";
import { LowStockAlerts } from "./_components/low-stock-alerts";
import { ReorderTimeline } from "./_components/reorder-timeline";
import { StockByWarehouse } from "./_components/stock-by-warehouse";
import { SupplierPerformance } from "./_components/supplier-performance";

export default function Page() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-bold text-3xl tracking-tight">Inventory Management</h1>
        <p className="text-muted-foreground text-sm">Track stock levels, manage warehouses, and monitor suppliers.</p>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {[
          {
            icon: Package,
            label: "Total SKUs",
            value: "45,892",
            change: "+234",
            up: true,
            color: "text-blue-600 dark:text-blue-400",
            bg: "bg-blue-500/10",
          },
          {
            icon: AlertTriangle,
            label: "Low Stock",
            value: "142",
            change: "+12",
            up: true,
            color: "text-red-600 dark:text-red-400",
            bg: "bg-red-500/10",
          },
          {
            icon: Truck,
            label: "In Transit",
            value: "56",
            change: "-8",
            up: false,
            color: "text-amber-600 dark:text-amber-400",
            bg: "bg-amber-500/10",
          },
          {
            icon: Box,
            label: "Dead Stock",
            value: "$12.4K",
            change: "-$2.1K",
            up: false,
            color: "text-purple-600 dark:text-purple-400",
            bg: "bg-purple-500/10",
          },
        ].map((kpi) => (
          <div key={kpi.label} className="rounded-xl border bg-card p-5">
            <div className={`mb-3 flex size-10 items-center justify-center rounded-lg ${kpi.bg} ${kpi.color}`}>
              <kpi.icon className="size-5" />
            </div>
            <p className="text-muted-foreground text-sm">{kpi.label}</p>
            <div className="mt-1 flex items-center gap-2">
              <span className="font-bold text-3xl tabular-nums">{kpi.value}</span>
              <span className={`text-sm ${kpi.up ? "text-emerald-600" : "text-red-600"}`}>
                {kpi.up ? <ArrowUp className="inline size-3" /> : <ArrowDown className="inline size-3" />}
                {kpi.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Chart Row 1 */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        <div className="xl:col-span-8">
          <StockByWarehouse />
        </div>
        <div className="xl:col-span-4">
          <CategoryBreakdown />
        </div>
      </div>

      {/* Chart Row 2 */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        <div className="xl:col-span-8">
          <ABCAnalysis />
        </div>
        <div className="xl:col-span-4">
          <CapacityGauge />
        </div>
      </div>

      {/* Reorder + Supplier */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        <div className="xl:col-span-7">
          <ReorderTimeline />
        </div>
        <div className="xl:col-span-5">
          <SupplierPerformance />
        </div>
      </div>

      <LowStockAlerts />
    </div>
  );
}
