import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

const deployments = [
  {
    id: "dep-842",
    version: "v2.4.1",
    branch: "main",
    status: "success",
    duration: "2m 34s",
    author: "Sarah Chen",
    timestamp: "10 min ago",
  },
  {
    id: "dep-841",
    version: "v2.4.0",
    branch: "main",
    status: "success",
    duration: "3m 12s",
    author: "Mike Lee",
    timestamp: "2 hours ago",
  },
  {
    id: "dep-840",
    version: "v2.3.2",
    branch: "hotfix/auth",
    status: "success",
    duration: "1m 48s",
    author: "Alex Kim",
    timestamp: "5 hours ago",
  },
  {
    id: "dep-839",
    version: "v2.3.1",
    branch: "main",
    status: "failed",
    duration: "8m 22s",
    author: "Sarah Chen",
    timestamp: "8 hours ago",
  },
  {
    id: "dep-838",
    version: "v2.3.0",
    branch: "main",
    status: "success",
    duration: "4m 05s",
    author: "Mike Lee",
    timestamp: "1 day ago",
  },
  {
    id: "dep-837",
    version: "v2.2.1",
    branch: "fix/rate-limit",
    status: "success",
    duration: "2m 11s",
    author: "John Doe",
    timestamp: "1 day ago",
  },
  {
    id: "dep-836",
    version: "v2.2.0",
    branch: "main",
    status: "success",
    duration: "3m 45s",
    author: "Sarah Chen",
    timestamp: "1 day ago",
  },
];

export function DeploymentHistory() {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Deployment History</CardTitle>
            <CardDescription>Recent deployments and their status</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="border-emerald-500/20 bg-emerald-500/10 text-emerald-600">
              6/7 Success
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[340px]">
          <div className="flex flex-col gap-2 px-4 pb-4">
            {deployments.map((dep) => (
              <div
                key={dep.id}
                className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-muted/50"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`size-2.5 rounded-full ${dep.status === "success" ? "bg-emerald-500" : "bg-red-500"}`}
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{dep.id}</span>
                      <span className="text-muted-foreground text-xs">{dep.version}</span>
                    </div>
                    <div className="mt-0.5 text-muted-foreground text-xs">
                      {dep.branch} · {dep.author}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div
                      className={`font-medium text-xs ${dep.status === "success" ? "text-emerald-600" : "text-red-600"}`}
                    >
                      {dep.status === "success" ? "✓" : "✗"} {dep.status}
                    </div>
                    <div className="text-muted-foreground text-xs">{dep.duration}</div>
                  </div>
                  <span className="text-muted-foreground text-xs">{dep.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
