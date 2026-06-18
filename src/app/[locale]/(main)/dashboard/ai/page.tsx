import { AiKpiCards } from "./_components/ai-kpi-cards";
import { ApiUsageTable } from "./_components/api-usage-table";
import { ModelPerformance } from "./_components/model-performance";
import { ModelUsageChart } from "./_components/model-usage-chart";
import { RecentConversations } from "./_components/recent-conversations";
import { TokenCostBreakdown } from "./_components/token-cost-breakdown";

export default function Page() {
  return (
    <div className="flex flex-col gap-4">
      <div className="space-y-1">
        <h1 className="text-3xl tracking-tight">AI & LLM Analytics</h1>
        <p className="text-muted-foreground text-sm">
          Monitor model usage, token consumption, and API performance across your AI infrastructure.
        </p>
      </div>

      <AiKpiCards />

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-12">
        <div className="xl:col-span-8">
          <ModelUsageChart />
        </div>
        <div className="xl:col-span-4">
          <TokenCostBreakdown />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-12">
        <div className="xl:col-span-6">
          <ModelPerformance />
        </div>
        <div className="xl:col-span-6">
          <RecentConversations />
        </div>
      </div>

      <ApiUsageTable />
    </div>
  );
}
