import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { CardOverview } from "./_components/card-overview";
import { CashFlowOverview } from "./_components/cash-flow-overview";
import { IncomeReliability } from "./_components/income-reliability";
import { MonthlyCashFlow } from "./_components/kpis/monthly-cash-flow";
import { NetWorth } from "./_components/kpis/net-worth";
import { PrimaryAccount } from "./_components/kpis/primary-account";
import { SavingsRate } from "./_components/kpis/savings-rate";
import { SpendingBreakdown } from "./_components/spending-breakdown";

export default function Page() {
  return (
    <div className="@container/main">
      <Tabs className="gap-4" defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger disabled value="activity">
            Activity
          </TabsTrigger>
          <TabsTrigger disabled value="insights">
            Insights
          </TabsTrigger>
          <TabsTrigger disabled value="utilities">
            Utilities
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="flex flex-col gap-4 **:data-[slot=card]:shadow-xs">
            <div className="grid @5xl/main:grid-cols-4 grid-cols-1 gap-4 *:data-[slot=card]:gap-2 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card sm:grid-cols-2">
              <PrimaryAccount />
              <NetWorth />
              <MonthlyCashFlow />
              <SavingsRate />
            </div>

            <div className="grid @5xl/main:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)] grid-cols-1 gap-4">
              <div className="flex min-w-0 flex-col gap-4">
                <CashFlowOverview />

                <div className="grid @3xl/main:grid-cols-2 grid-cols-1 gap-4">
                  <SpendingBreakdown />
                  <IncomeReliability />
                </div>
              </div>

              <div className="min-w-0">
                <CardOverview />
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
