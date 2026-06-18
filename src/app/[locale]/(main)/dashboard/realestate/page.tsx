import { Building2, DollarSign, Home, Percent } from "lucide-react";

import { LocationBreakdown } from "./_components/location-breakdown";
import { MaintenanceTracker } from "./_components/maintenance-tracker";
import { PropertyList } from "./_components/property-list";
import { PropertyMap } from "./_components/property-map";
import { RentRoll } from "./_components/rent-roll";
import { RevenueTrend } from "./_components/revenue-trend";
import { ValuationTrend } from "./_components/valuation-trend";

export default function Page() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Real Estate</h1>
        <p className="text-muted-foreground text-sm">
          Manage properties, track occupancy, and monitor portfolio performance.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {[
          {
            icon: Building2,
            label: "Total Properties",
            value: "342",
            color: "text-blue-600 dark:text-blue-400",
            bg: "bg-blue-500/10",
          },
          {
            icon: Home,
            label: "Occupancy Rate",
            value: "94.2%",
            color: "text-emerald-600 dark:text-emerald-400",
            bg: "bg-emerald-500/10",
          },
          {
            icon: DollarSign,
            label: "Monthly Revenue",
            value: "$892K",
            color: "text-purple-600 dark:text-purple-400",
            bg: "bg-purple-500/10",
          },
          {
            icon: Percent,
            label: "Avg ROI",
            value: "8.7%",
            color: "text-amber-600 dark:text-amber-400",
            bg: "bg-amber-500/10",
          },
        ].map((stat) => (
          <div key={stat.label} className="rounded-xl border bg-card p-5">
            <div className={`mb-3 flex size-10 items-center justify-center rounded-lg ${stat.bg} ${stat.color}`}>
              <stat.icon className="size-5" />
            </div>
            <p className="text-muted-foreground text-sm">{stat.label}</p>
            <p className="mt-1 text-3xl font-bold tabular-nums">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Chart Row 1 */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        <div className="xl:col-span-8">
          <RevenueTrend />
        </div>
        <div className="xl:col-span-4">
          <LocationBreakdown />
        </div>
      </div>

      {/* Chart Row 2 */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        <div className="xl:col-span-8">
          <ValuationTrend />
        </div>
        <div className="xl:col-span-4">
          <MaintenanceTracker />
        </div>
      </div>

      {/* Map + Rent Roll */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        <div className="xl:col-span-7">
          <PropertyMap />
        </div>
        <div className="xl:col-span-5">
          <RentRoll />
        </div>
      </div>

      <PropertyList />
    </div>
  );
}
