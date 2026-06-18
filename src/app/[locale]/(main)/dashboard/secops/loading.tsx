import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col gap-4 md:gap-6">
      {/* Header */}
      <div className="space-y-2">
        <Skeleton className="h-8 w-52" />
        <Skeleton className="h-4 w-80" />
      </div>

      {/* Security score + metrics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={`sec-${i}`} className="flex flex-col gap-3 rounded-xl border bg-card p-5">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-2 w-full rounded-full" />
          </div>
        ))}
      </div>

      {/* Threat chart + compliance */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="flex flex-col gap-3 rounded-xl border bg-card p-5">
          <Skeleton className="h-5 w-48" />
          <Skeleton className="h-[260px] w-full rounded-lg" />
        </div>
        <div className="flex flex-col gap-3 rounded-xl border bg-card p-5">
          <Skeleton className="h-5 w-40" />
          <div className="grid grid-cols-2 gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={`comp-${i}`} className="flex flex-col gap-2 rounded-lg border p-3">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-2 w-full rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
