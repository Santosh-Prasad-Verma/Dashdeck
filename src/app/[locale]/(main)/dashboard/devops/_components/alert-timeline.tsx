import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const timeline = [
  {
    time: "10:45 AM",
    event: "High CPU Alert",
    service: "prod-02",
    severity: "critical",
    status: "resolved",
    resolvedAt: "10:52 AM",
  },
  {
    time: "09:30 AM",
    event: "Memory Spike",
    service: "prod-us-east",
    severity: "warning",
    status: "resolved",
    resolvedAt: "09:38 AM",
  },
  { time: "08:15 AM", event: "Deploy v2.4.1", service: "all", severity: "info", status: "completed" },
  {
    time: "Yesterday",
    event: "SSL Certificate Expiry",
    service: "api-gateway",
    severity: "warning",
    status: "resolved",
    resolvedAt: "11:20 PM",
  },
  {
    time: "Yesterday",
    event: "DB Connection Pool Full",
    service: "db-primary",
    severity: "critical",
    status: "resolved",
    resolvedAt: "06:15 PM",
  },
  {
    time: "2 days ago",
    event: "Rate Limit Triggered",
    service: "api-gateway",
    severity: "warning",
    status: "auto-resolved",
  },
  { time: "2 days ago", event: "Scheduled Maintenance", service: "all", severity: "info", status: "completed" },
  {
    time: "3 days ago",
    event: "Disk Space Low",
    service: "file-storage",
    severity: "critical",
    status: "resolved",
    resolvedAt: "02:30 PM",
  },
];

function getSeverityDot(severity: string) {
  switch (severity) {
    case "critical":
      return "bg-red-500 ring-red-500/20";
    case "warning":
      return "bg-amber-500 ring-amber-500/20";
    case "info":
      return "bg-blue-500 ring-blue-500/20";
    default:
      return "bg-muted-foreground";
  }
}

export function AlertTimeline() {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>Alert Timeline</CardTitle>
        <CardDescription>Recent incidents and their resolution status</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <div className="absolute top-0 bottom-0 left-[11px] w-0.5 bg-muted" />
          <div className="flex flex-col gap-6">
            {timeline.map((item, i) => (
              <div key={i} className="relative flex gap-4">
                <div
                  className={`relative z-10 mt-1 size-3 rounded-full ring-4 ring-background ${getSeverityDot(item.severity)}`}
                />
                <div className="flex-1 min-w-0 rounded-lg border p-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">{item.event}</span>
                        <span className="text-muted-foreground text-xs">{item.service}</span>
                      </div>
                      <p className="mt-1 text-muted-foreground text-xs">{item.time}</p>
                    </div>
                    <div
                      className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium ${
                        item.status === "resolved" || item.status === "auto-resolved" || item.status === "completed"
                          ? "bg-emerald-500/10 text-emerald-600"
                          : "bg-amber-500/10 text-amber-600"
                      }`}
                    >
                      {item.status === "auto-resolved" ? "Auto" : item.status}
                    </div>
                  </div>
                  {item.resolvedAt && <p className="mt-1 text-emerald-600 text-xs">✓ Resolved at {item.resolvedAt}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
