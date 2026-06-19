import { Skeleton } from "@/components/ui/skeleton";

export function DashboardSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="space-y-2">
        <Skeleton className="h-8 w-48 bg-white/[0.06]" />
        <Skeleton className="h-4 w-64 bg-white/[0.04]" />
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={`kpi-${i}`} className="h-28 rounded-xl bg-white/[0.06]" />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Skeleton className="h-80 rounded-xl bg-white/[0.06] lg:col-span-2" />
        <Skeleton className="h-80 rounded-xl bg-white/[0.06]" />
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Skeleton className="h-64 rounded-xl bg-white/[0.06]" />
        <Skeleton className="h-64 rounded-xl bg-white/[0.06]" />
      </div>
    </div>
  );
}
