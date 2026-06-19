import { ActionsManagerQueue } from "./_components/analytics-actions-manager-queue";
import { ActionsRiskLedger } from "./_components/analytics-actions-risk-ledger";
import { DriversCoverageTriage } from "./_components/analytics-drivers-coverage-triage";
import { DriversForecastTarget } from "./_components/analytics-drivers-forecast-target";
import { AnalyticsOverview } from "./_components/analytics-overview";

export default function Page() {
  return (
    <div className="@container/main flex flex-col gap-4 md:gap-6">
      <AnalyticsOverview />

      <div className="grid @5xl/main:grid-cols-3 grid-cols-1 items-stretch gap-4">
        <div className="@5xl/main:col-span-2 flex min-w-0 flex-col gap-4">
          <DriversForecastTarget />
          <DriversCoverageTriage />
        </div>
        <div className="min-w-0">
          <ActionsManagerQueue />
        </div>
      </div>

      <ActionsRiskLedger />
    </div>
  );
}
