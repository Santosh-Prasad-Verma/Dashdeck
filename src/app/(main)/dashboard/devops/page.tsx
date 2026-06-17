import { DeploymentHistory } from "./_components/deployment-history";
import { ServerMetrics } from "./_components/server-metrics";
import { ServiceStatus } from "./_components/service-status";
import { LogViewer } from "./_components/log-viewer";
import { AlertTimeline } from "./_components/alert-timeline";
import { ResponseTimeDistribution } from "./_components/response-time-distribution";
import { CostBreakdown } from "./_components/cost-breakdown";

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
              <span className="font-mono text-xs font-medium">{server.label}</span>
              <div className={`size-2 rounded-full animate-pulse ${server.status === "up" ? "bg-emerald-500" : "bg-amber-500"}`} />
            </div>
            <div className="mt-3 space-y-2">
              <div>
                <div className="flex items-center justify-between text-muted-foreground text-xs">
                  <span>CPU</span>
                  <span className="font-mono">{server.cpu}%</span>
                </div>
                <div className="mt-1 h-1 rounded-full bg-muted">
                  <div
                    className={`h-1 rounded-full transition-all ${server.cpu > 70 ? "bg-red-500" : server.cpu > 50 ? "bg-amber-500" : "bg-emerald-500"}`}
                    style={{ width: `${server.cpu}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between text-muted-foreground text-xs">
                  <span>MEM</span>
                  <span className="font-mono">{server.mem}%</span>
                </div>
                <div className="mt-1 h-1 rounded-full bg-muted">
                  <div
                    className={`h-1 rounded-full transition-all ${server.mem > 80 ? "bg-red-500" : server.mem > 60 ? "bg-amber-500" : "bg-emerald-500"}`}
                    style={{ width: `${server.mem}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        <div className="xl:col-span-7">
          <ServerMetrics />
        </div>
        <div className="xl:col-span-5">
          <CostBreakdown />
        </div>
      </div>

      {/* Logs + Response Time */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        <div className="xl:col-span-7">
          <LogViewer />
        </div>
        <div className="xl:col-span-5 flex flex-col gap-6">
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
