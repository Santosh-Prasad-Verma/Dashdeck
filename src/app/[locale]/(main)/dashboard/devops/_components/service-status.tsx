import { AlertTriangle, CheckCircle, XCircle } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const services = [
  { name: "API Gateway", status: "healthy", latency: "45ms", requests: "12.4K/min", uptime: "99.99%" },
  { name: "Database", status: "healthy", latency: "12ms", requests: "8.2K/min", uptime: "99.95%" },
  { name: "Cache (Redis)", status: "healthy", latency: "2ms", requests: "24.1K/min", uptime: "99.99%" },
  { name: "Message Queue", status: "degraded", latency: "89ms", requests: "3.4K/min", uptime: "99.87%" },
  { name: "File Storage", status: "healthy", latency: "28ms", requests: "1.8K/min", uptime: "99.98%" },
  { name: "Auth Service", status: "healthy", latency: "34ms", requests: "5.6K/min", uptime: "99.96%" },
];

const alerts = [
  { id: 1, severity: "critical", message: "High CPU utilization on prod-02 (92%)", time: "5 min ago" },
  { id: 2, severity: "warning", message: "Memory usage approaching threshold (85%)", time: "15 min ago" },
  { id: 3, severity: "info", message: "Scheduled maintenance: July 5, 2-4 AM UTC", time: "1 hour ago" },
  { id: 4, severity: "warning", message: "SSL certificate expires in 10 days", time: "2 hours ago" },
];

function getStatusIcon(status: string) {
  switch (status) {
    case "healthy":
      return <CheckCircle className="size-4 text-emerald-500" />;
    case "degraded":
      return <AlertTriangle className="size-4 text-amber-500" />;
    case "down":
      return <XCircle className="size-4 text-red-500" />;
    default:
      return null;
  }
}

function getAlertColor(severity: string) {
  switch (severity) {
    case "critical":
      return "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20";
    case "warning":
      return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20";
    case "info":
      return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20";
    default:
      return "";
  }
}

export function ServiceStatus() {
  return (
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-12">
      <Card className="xl:col-span-7">
        <CardHeader>
          <CardTitle>Service Status</CardTitle>
          <CardDescription>Real-time health of all services</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            {services.map((svc) => (
              <div key={svc.name} className="flex items-center justify-between rounded-lg border p-3">
                <div className="flex items-center gap-3">
                  {getStatusIcon(svc.status)}
                  <div>
                    <div className="font-medium text-sm">{svc.name}</div>
                    <div className="text-muted-foreground text-xs">
                      {svc.latency} latency · {svc.uptime} uptime
                    </div>
                  </div>
                </div>
                <div className="text-muted-foreground text-sm">{svc.requests} req</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="xl:col-span-5">
        <CardHeader>
          <CardTitle>Active Alerts</CardTitle>
          <CardDescription>System alerts and warnings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            {alerts.map((alert) => (
              <div key={alert.id} className={`rounded-lg border p-3 ${getAlertColor(alert.severity)}`}>
                <div className="mb-1 flex items-center justify-between">
                  <span className="font-medium text-xs uppercase">{alert.severity}</span>
                  <span className="text-xs opacity-70">{alert.time}</span>
                </div>
                <p className="text-sm">{alert.message}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
