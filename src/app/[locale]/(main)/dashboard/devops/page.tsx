import { AlertTimeline } from "./_components/alert-timeline";
import { CostBreakdown } from "./_components/cost-breakdown";
import { DeploymentHistory } from "./_components/deployment-history";
import { LogViewer } from "./_components/log-viewer";
import { NetworkBandwidth } from "./_components/network-bandwidth";
import { ResponseTimeDistribution } from "./_components/response-time-distribution";
import { ServerMetrics } from "./_components/server-metrics";
import { ServiceStatus } from "./_components/service-status";

export default function Page() {
  return (
    <div className="flex flex-col gap-6">
      {/* Status Bar */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-8">
        {[
          { label: "PROD-US-EAST", status: "up", cpu: 42, mem: 58 },
          { label: "PROD-US-WEST", status: "up", cpu: 38, mem: 52 },
          { label: "PROD-EU-CENTRAL", status: "up", cpu: 45, mem: 61 },
          { label: "STAGING", status: "up", cpu: 22, mem: 34 },
          { label: "DEV-01", status: "degraded", cpu: 78, mem: 85 },
          { label: "DB-PRIMARY", status: "up", cpu: 31, mem: 72 },
          { label: "DB-REPLICA", status: "up", cpu: 28, mem: 68 },
          { label: "CACHE-CLUSTER", status: "up", cpu: 15, mem: 44 },
        ].map((server) => (
          <div
            key={server.label}
            className={`relative overflow-hidden rounded-xl border p-4 transition-all hover:shadow-md ${
              server.status === "degraded" ? "border-amber-500/30 bg-amber-500/5" : "bg-card"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-mono font-semibold text-xs">{server.label}</span>
              <div
                className={`size-2 animate-pulse rounded-full ${server.status === "up" ? "bg-emerald-500" : "bg-amber-500"}`}
              />
            </div>

            <div className="mt-3 flex items-center justify-between gap-1">
              {/* CPU Gauge */}
              <div className="flex flex-1 flex-col items-center gap-1.5">
                <span className="font-medium text-[10px] text-muted-foreground">CPU</span>
                <div className="relative flex size-11 items-center justify-center">
                  <svg className="absolute inset-0 size-full -rotate-90" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="16" fill="none" stroke="var(--border)" strokeWidth="3" />
                    <circle
                      cx="18"
                      cy="18"
                      r="16"
                      fill="none"
                      stroke={
                        server.cpu > 70 ? "var(--chart-3)" : server.cpu > 50 ? "var(--chart-1)" : "var(--chart-2)"
                      }
                      strokeWidth="3"
                      strokeDasharray="100.5"
                      strokeDashoffset={100.5 - (100.5 * server.cpu) / 100}
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="font-mono font-semibold text-[9px] tabular-nums">{server.cpu}%</span>
                </div>
              </div>

              {/* Memory Gauge */}
              <div className="flex flex-1 flex-col items-center gap-1.5">
                <span className="font-medium text-[10px] text-muted-foreground">MEM</span>
                <div className="relative flex size-11 items-center justify-center">
                  <svg className="absolute inset-0 size-full -rotate-90" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="16" fill="none" stroke="var(--border)" strokeWidth="3" />
                    <circle
                      cx="18"
                      cy="18"
                      r="16"
                      fill="none"
                      stroke={
                        server.mem > 80 ? "var(--chart-3)" : server.mem > 60 ? "var(--chart-1)" : "var(--chart-2)"
                      }
                      strokeWidth="3"
                      strokeDasharray="100.5"
                      strokeDashoffset={100.5 - (100.5 * server.mem) / 100}
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="font-mono font-semibold text-[9px] tabular-nums">{server.mem}%</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        <div className="xl:col-span-8">
          <ServerMetrics />
        </div>
        <div className="xl:col-span-4">
          <CostBreakdown />
        </div>
      </div>

      {/* Network Bandwidth */}
      <div className="grid grid-cols-1 gap-6">
        <NetworkBandwidth />
      </div>

      {/* Logs + Response Time */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        <div className="xl:col-span-7">
          <LogViewer />
        </div>
        <div className="flex flex-col gap-6 xl:col-span-5">
          <ResponseTimeDistribution />
          <DeploymentHistory />
        </div>
      </div>

      {/* Timeline + Services */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        <div className="xl:col-span-7">
          <AlertTimeline />
        </div>
        <div className="xl:col-span-5">
          <ServiceStatus />
        </div>
      </div>
    </div>
  );
}
