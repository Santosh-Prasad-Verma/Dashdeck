import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

const logs = [
  {
    timestamp: "14:32:10",
    level: "INFO",
    service: "api-gateway",
    message: "Request processed successfully: GET /api/users 200 45ms",
  },
  {
    timestamp: "14:32:08",
    level: "ERROR",
    service: "auth-service",
    message: "Token validation failed for user session abc123: expired",
  },
  {
    timestamp: "14:32:05",
    level: "WARN",
    service: "cache-cluster",
    message: "Memory usage at 82%, approaching threshold",
  },
  {
    timestamp: "14:32:02",
    level: "INFO",
    service: "db-primary",
    message: "Query executed: SELECT * FROM orders WHERE status='pending' (12ms)",
  },
  {
    timestamp: "14:31:58",
    level: "INFO",
    service: "api-gateway",
    message: "Health check passed: all endpoints responding",
  },
  {
    timestamp: "14:31:55",
    level: "ERROR",
    service: "file-storage",
    message: "Upload failed: quota exceeded for bucket prod-assets",
  },
  {
    timestamp: "14:31:50",
    level: "WARN",
    service: "message-queue",
    message: "Consumer lag detected: 1,200 messages behind",
  },
  {
    timestamp: "14:31:47",
    level: "INFO",
    service: "db-replica",
    message: "Replication lag: 0.3ms (below 1ms threshold)",
  },
  {
    timestamp: "14:31:44",
    level: "INFO",
    service: "api-gateway",
    message: "Rate limit applied for IP 192.168.1.45: 100 req/min reached",
  },
  {
    timestamp: "14:31:40",
    level: "ERROR",
    service: "auth-service",
    message: "LDAP connection timeout after 30s to ldap.company.com",
  },
  {
    timestamp: "14:31:37",
    level: "INFO",
    service: "cache-cluster",
    message: "Cache invalidation complete: user sessions flushed",
  },
  {
    timestamp: "14:31:35",
    level: "WARN",
    service: "db-primary",
    message: "Slow query detected: 2.3s for aggregator JOIN",
  },
  {
    timestamp: "14:31:30",
    level: "INFO",
    service: "file-storage",
    message: "Backup completed: prod-assets (45GB) to glacier",
  },
  { timestamp: "14:31:27", level: "INFO", service: "message-queue", message: "Batch processed: 500 messages in 1.2s" },
  {
    timestamp: "14:31:22",
    level: "ERROR",
    service: "api-gateway",
    message: "502 Bad Gateway from upstream service payment-processor",
  },
];

function getLogColor(level: string) {
  switch (level) {
    case "ERROR":
      return "text-red-500";
    case "WARN":
      return "text-amber-500";
    case "INFO":
      return "text-blue-400";
    default:
      return "text-muted-foreground";
  }
}

export function LogViewer() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="border-b bg-muted/30">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="font-mono text-sm">Live Log Viewer</CardTitle>
            <CardDescription>Real-time system logs</CardDescription>
          </div>
          <div className="flex items-center gap-3 text-muted-foreground text-xs">
            <span className="flex items-center gap-1">
              <span className="size-1.5 rounded-full bg-red-500" /> 4 ERR
            </span>
            <span className="flex items-center gap-1">
              <span className="size-1.5 rounded-full bg-amber-500" /> 3 WARN
            </span>
            <span className="flex items-center gap-1">
              <span className="size-1.5 rounded-full bg-blue-500" /> 8 INFO
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[400px] bg-black dark:bg-zinc-950">
          <div className="font-mono text-[13px]">
            {logs.map((log, i) => (
              <div
                key={i}
                className={cn(
                  "flex items-start gap-2 border-zinc-800 border-b px-4 py-2 hover:bg-zinc-900",
                  i === 0 && "bg-red-500/10 dark:bg-red-950/50",
                )}
              >
                <span className="shrink-0 text-zinc-500">{log.timestamp}</span>
                <span className={cn("w-12 shrink-0 font-medium", getLogColor(log.level))}>{log.level}</span>
                <span className="shrink-0 text-cyan-400">{log.service}</span>
                <span className="text-zinc-300">{log.message}</span>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
