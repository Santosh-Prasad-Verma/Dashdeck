import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col gap-4 md:gap-6">
      {/* Header + Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-9 w-24 rounded-md" />
          <Skeleton className="h-9 w-24 rounded-md" />
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={`kpi-${i}`} className="flex flex-col gap-3 rounded-xl border bg-card p-5">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-8 w-28" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-16 rounded-full" />
              <Skeleton className="h-3.5 w-24" />
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="flex flex-col gap-3 rounded-xl border bg-card p-5 lg:col-span-2">
          <Skeleton className="h-5 w-44" />
          <Skeleton className="h-[300px] w-full rounded-lg" />
        </div>
        <div className="flex flex-col gap-3 rounded-xl border bg-card p-5">
          <Skeleton className="h-5 w-36" />
          <Skeleton className="mx-auto size-48 rounded-full" />
          <div className="space-y-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={`legend-${i}`} className="flex items-center gap-2">
                <Skeleton className="size-3 rounded-full" />
                <Skeleton className="h-3.5 flex-1" />
                <Skeleton className="h-3.5 w-12" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
