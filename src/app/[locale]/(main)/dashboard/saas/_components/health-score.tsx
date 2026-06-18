import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const accounts = [
  { name: "Acme Corp", mrr: 4200, health: 92, status: "Healthy", contact: "Sarah Chen", lastLogin: "2 hours ago" },
  { name: "Globex Inc", mrr: 3800, health: 78, status: "At Risk", contact: "Mike Ross", lastLogin: "5 days ago" },
  { name: "Initech", mrr: 5600, health: 95, status: "Healthy", contact: "Peter Gibbons", lastLogin: "1 hour ago" },
  { name: "Umbrella Co", mrr: 2100, health: 45, status: "Critical", contact: "Alice Wong", lastLogin: "30 days ago" },
  {
    name: "Stark Industries",
    mrr: 8900,
    health: 88,
    status: "Healthy",
    contact: "Tony Stark",
    lastLogin: "30 min ago",
  },
  {
    name: "Wayne Enterprises",
    mrr: 6400,
    health: 82,
    status: "Healthy",
    contact: "Bruce Wayne",
    lastLogin: "1 day ago",
  },
];

function getHealthColor(health: number) {
  if (health >= 80) return "bg-emerald-500";
  if (health >= 60) return "bg-amber-500";
  return "bg-red-500";
}

export function HealthScore() {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>Customer Health Score</CardTitle>
        <CardDescription>Account health by usage, billing, and support</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          {accounts.map((account) => (
            <div key={account.name} className="rounded-lg border p-3">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="font-medium text-sm">{account.name}</span>
                  <span className="ml-2 text-muted-foreground text-xs">${account.mrr}/mo</span>
                </div>
                <Badge
                  className={
                    account.status === "Healthy"
                      ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-0"
                      : account.status === "At Risk"
                        ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-0"
                        : "bg-red-500/10 text-red-600 dark:text-red-400 border-0"
                  }
                >
                  {account.status}
                </Badge>
              </div>
              <div className="flex items-center gap-3">
                <Progress value={account.health} className={`flex-1 h-1.5 [&>div]:${getHealthColor(account.health)}`} />
                <span className="text-sm font-medium tabular-nums w-10 text-right">{account.health}</span>
              </div>
              <div className="mt-2 flex items-center justify-between text-muted-foreground text-xs">
                <span>{account.contact}</span>
                <span>Last login: {account.lastLogin}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
