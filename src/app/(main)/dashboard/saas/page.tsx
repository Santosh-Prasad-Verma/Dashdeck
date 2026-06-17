import { MRRTrend } from "./_components/mrr-trend";
import { PlanBreakdown } from "./_components/plan-breakdown";
import { KeyMetrics } from "./_components/key-metrics";
import { CohortTable } from "./_components/cohort-table";
import { RevenueWaterfall } from "./_components/revenue-waterfall";
import { HealthScore } from "./_components/health-score";
import { TrialFunnel } from "./_components/trial-funnel";
import { ArrowDown, ArrowUp, DollarSign, TrendingUp, Users } from "lucide-react";

export default function Page() {
  return (
    <div className="flex flex-col gap-6">
      {/* Big Number Hero */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 p-6 text-white">
          <div className="absolute top-0 right-0 h-32 w-32 bg-white/10 blur-[60px]" />
          <div className="relative">
            <p className="text-emerald-200 text-sm">Monthly Recurring Revenue</p>
            <p className="mt-2 text-5xl font-bold tracking-tight">$128.5K</p>
            <div className="mt-3 flex items-center gap-2">
              <div className="flex items-center gap-1 rounded-full bg-emerald-500/30 px-2.5 py-1 text-emerald-100 text-sm">
                <ArrowUp className="size-3" />12.4%
              </div>
              <span className="text-emerald-200 text-sm">vs last month</span>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 p-6 text-white">
          <div className="absolute bottom-0 right-0 h-32 w-32 bg-white/10 blur-[60px]" />
          <div className="relative">
            <p className="text-blue-200 text-sm">Annual Run Rate</p>
            <p className="mt-2 text-5xl font-bold tracking-tight">$1.54M</p>
            <div className="mt-3 flex items-center gap-2">
              <div className="flex items-center gap-1 rounded-full bg-blue-500/30 px-2.5 py-1 text-blue-100 text-sm">
                <ArrowUp className="size-3" />18.2%
              </div>
              <span className="text-blue-200 text-sm">YoY growth</span>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border bg-card p-6">
          <p className="text-muted-foreground text-sm">Quick Stats</p>
          <div className="mt-4 flex flex-col gap-4">
            {[
              { label: "Total Customers", value: "2,847", icon: Users, color: "text-blue-500" },
              { label: "Churn Rate", value: "2.4%", icon: ArrowDown, color: "text-emerald-500" },
              { label: "ARPU", value: "$45.10", icon: DollarSign, color: "text-purple-500" },
              { label: "LTV:CAC", value: "8.9x", icon: TrendingUp, color: "text-amber-500" },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <stat.icon className={`size-4 ${stat.color}`} />
                  <span className="text-muted-foreground text-sm">{stat.label}</span>
                </div>
                <span className="font-semibold tabular-nums">{stat.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        <div className="xl:col-span-7">
          <MRRTrend />
        </div>
        <div className="xl:col-span-5">
          <RevenueWaterfall />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        <div className="xl:col-span-7">
          <CohortTable />
        </div>
        <div className="xl:col-span-5">
          <PlanBreakdown />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        <div className="xl:col-span-7">
          <HealthScore />
        </div>
        <div className="xl:col-span-5">
          <TrialFunnel />
        </div>
      </div>

      <KeyMetrics />
    </div>
  );
}
