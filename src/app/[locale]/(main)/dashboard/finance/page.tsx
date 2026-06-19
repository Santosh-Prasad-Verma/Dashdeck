import { format } from "date-fns";
import { Download, RotateCw, Settings2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { AccountsView } from "./_components/accounts-view";
import { BalanceDistributionCard } from "./_components/balance-distribution-card";
import { FinanceNotification } from "./_components/finance-notification";
import { IncomeBreakdown } from "./_components/income-breakdown";
import { IncomeExpenseComparison } from "./_components/income-expense-comparison";
import { OverviewKpis } from "./_components/overview-kpis";
import { QuickActions } from "./_components/quick-actions";
import { TransactionsOverviewCard } from "./_components/transactions-overview-card";
import { TransactionsView } from "./_components/transactions-view";
import { UpcomingTransactions } from "./_components/upcoming-transactions";
import { Wallet } from "./_components/wallet";

export default function Page() {
  const formattedDate = format(new Date(), "EEEE, do MMMM yyyy");

  return (
    <div className="flex flex-col gap-4">
      <div className="space-y-1">
        <h1 className="text-3xl tracking-tight">Personal Finances</h1>
        <p className="text-muted-foreground text-sm">{formattedDate}</p>
      </div>

      <Tabs defaultValue="30-days" className="flex flex-col gap-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <TabsList variant="line">
            <TabsTrigger value="30-days">Dashboard</TabsTrigger>
            <TabsTrigger value="12-months">Accounts</TabsTrigger>
            <TabsTrigger value="custom">Transactions</TabsTrigger>
          </TabsList>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
              <RotateCw className="size-4" />
              <span>Updated 5 min ago</span>
            </div>
            <Button size="sm" variant="outline">
              <Settings2 />
              Settings
            </Button>
            <Button size="sm" variant="outline">
              <Download data-icon="inline-start" />
              Export
            </Button>
          </div>
        </div>

        <TabsContent value="30-days" className="flex flex-col gap-4">
          <div className="grid grid-cols-1 gap-4 @5xl:grid-cols-12">
            <div className="@5xl:col-span-6 min-w-0">
              <OverviewKpis />
            </div>

            <div className="flex flex-col gap-4 @5xl:col-span-6 min-w-0">
              <IncomeBreakdown />
              <FinanceNotification />
            </div>

          </div>

          <div className="grid grid-cols-1 gap-4 @5xl:grid-cols-12">
            <div className="@5xl:col-span-8 min-w-0">
              <TransactionsOverviewCard />
            </div>
            <div className="@5xl:col-span-4 min-w-0">
              <BalanceDistributionCard />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <IncomeExpenseComparison />
          </div>

          <div className="grid grid-cols-1 gap-4 @5xl:grid-cols-12">
            <div className="@5xl:col-span-4 min-w-0">
              <Wallet />
            </div>
            <div className="@5xl:col-span-4 min-w-0">
              <UpcomingTransactions />
            </div>
            <div className="@5xl:col-span-4 min-w-0">
              <QuickActions />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="12-months">
          <AccountsView />
        </TabsContent>

        <TabsContent value="custom">
          <TransactionsView />
        </TabsContent>
      </Tabs>
    </div>
  );
}
