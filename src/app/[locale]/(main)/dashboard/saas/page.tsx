import { ArrowUp } from "lucide-react";

import { CohortTable } from "./_components/cohort-table";
import { HealthScore } from "./_components/health-score";
import { KeyMetrics } from "./_components/key-metrics";
import { MRRTrend } from "./_components/mrr-trend";
import { PlanBreakdown } from "./_components/plan-breakdown";
import { RevenueWaterfall } from "./_components/revenue-waterfall";
import { TrialFunnel } from "./_components/trial-funnel";
import { UnitEconomics } from "./_components/unit-economics";

export default function Page() {
  return (
    <div className="flex flex-col gap-6">
      {/* Big Number Hero */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 p-6 text-white">
          <div className="absolute top-0 right-0 h-32 w-32 bg-white/10 blur-[60px]" />
          <div className="relative">
            <p className="text-emerald-200 text-sm">Monthly Recurring Revenue</p>
            <p className="mt-2 font-bold text-5xl tracking-tight">$128.5K</p>
            <div className="mt-3 flex items-center gap-2">
              <div className="flex items-center gap-1 rounded-full bg-emerald-500/30 px-2.5 py-1 text-emerald-100 text-sm">
                <ArrowUp className="size-3" />
                12.4%
              </div>
              <span className="text-emerald-200 text-sm">vs last month</span>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 p-6 text-white">
          <div className="absolute right-0 bottom-0 h-32 w-32 bg-white/10 blur-[60px]" />
          <div className="relative">
            <p className="text-blue-200 text-sm">Annual Run Rate</p>
            <p className="mt-2 font-bold text-5xl tracking-tight">$1.54M</p>
            <div className="mt-3 flex items-center gap-2">
              <div className="flex items-center gap-1 rounded-full bg-blue-500/30 px-2.5 py-1 text-blue-100 text-sm">
                <ArrowUp className="size-3" />
                18.2%
              </div>
              <span className="text-blue-200 text-sm">YoY growth</span>
            </div>
          </div>
        </div>

        <UnitEconomics />
      </div>

      <div className="grid @5xl:grid-cols-12 grid-cols-1 gap-6">
        <div className="@5xl:col-span-7 min-w-0">
          <MRRTrend />
        </div>
        <div className="@5xl:col-span-5 min-w-0">
          <RevenueWaterfall />
        </div>
      </div>

      <div className="grid @5xl:grid-cols-12 grid-cols-1 gap-6">
        <div className="@5xl:col-span-7 min-w-0">
          <CohortTable />
        </div>
        <div className="@5xl:col-span-5 min-w-0">
          <PlanBreakdown />
        </div>
      </div>

      <div className="grid @5xl:grid-cols-12 grid-cols-1 gap-6">
        <div className="@5xl:col-span-7 min-w-0">
          <HealthScore />
        </div>
        <div className="@5xl:col-span-5 min-w-0">
          <TrialFunnel />
        </div>
      </div>

      <KeyMetrics />
    </div>
  );
}
