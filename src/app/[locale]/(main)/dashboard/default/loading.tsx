import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col gap-4 md:gap-6">
      {/* Page header skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-8 w-56" />
        <Skeleton className="h-4 w-80" />
      </div>

      {/* Metric cards skeleton */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={`metric-${i}`} className="flex flex-col gap-3 rounded-xl border bg-card p-5">
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="size-8 rounded-lg" />
            </div>
            <Skeleton className="h-7 w-20" />
            <Skeleton className="h-3.5 w-32" />
          </div>
        ))}
      </div>

      {/* Charts skeleton */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-7">
        <div className="flex flex-col gap-3 rounded-xl border bg-card p-5 lg:col-span-4">
          <div className="flex items-center justify-between">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-8 w-28 rounded-md" />
          </div>
          <Skeleton className="h-[280px] w-full rounded-lg" />
        </div>
        <div className="flex flex-col gap-3 rounded-xl border bg-card p-5 lg:col-span-3">
          <Skeleton className="h-5 w-36" />
          <Skeleton className="h-[280px] w-full rounded-lg" />
        </div>
      </div>

      {/* Table skeleton */}
      <div className="flex flex-col gap-3 rounded-xl border bg-card p-5">
        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-8 w-36 rounded-md" />
        </div>
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={`row-${i}`} className="flex items-center gap-4">
              <Skeleton className="size-9 rounded-full" />
              <Skeleton className="h-4 flex-1" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-16" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
