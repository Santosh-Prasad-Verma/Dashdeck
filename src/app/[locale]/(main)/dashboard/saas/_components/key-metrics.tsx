import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const metrics = [
  { name: "Net Revenue Retention", value: 118, target: 110, status: "excellent" },
  { name: "Customer LTV", value: 2840, target: 2500, status: "good" },
  { name: "CAC", value: 320, target: 350, status: "good" },
  { name: "LTV:CAC Ratio", value: 8.9, target: 3, status: "excellent" },
  { name: "Activation Rate", value: 72, target: 70, status: "good" },
  { name: "Expansion MRR", value: 8500, target: 10000, status: "warning" },
];

function getMetricColor(status: string) {
  switch (status) {
    case "excellent":
      return "text-emerald-600";
    case "good":
      return "text-blue-600";
    case "warning":
      return "text-amber-600";
    default:
      return "text-muted-foreground";
  }
}

export function KeyMetrics() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Key SaaS Metrics</CardTitle>
        <CardDescription>Health indicators across your business</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {metrics.map((metric) => (
            <div key={metric.name} className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">{metric.name}</span>
                  <Badge
                    className={cn(
                      "border-0 text-xs",
                      metric.status === "excellent" && "bg-emerald-500/10 text-emerald-600",
                      metric.status === "good" && "bg-blue-500/10 text-blue-600",
                      metric.status === "warning" && "bg-amber-500/10 text-amber-600",
                    )}
                  >
                    {metric.status}
                  </Badge>
                </div>
                <span className={cn("font-medium text-sm tabular-nums", getMetricColor(metric.status))}>
                  {typeof metric.value === "number" && metric.value > 100
                    ? `$${metric.value.toLocaleString()}`
                    : metric.name.includes("Ratio")
                      ? `${metric.value}x`
                      : `${metric.value}%`}
                </span>
              </div>
              <Progress value={Math.min((metric.value / metric.target) * 100, 100)} className="h-1.5" />
              <div className="flex items-center justify-between text-muted-foreground text-xs">
                <span>
                  Target:{" "}
                  {typeof metric.target === "number" && metric.target > 100
                    ? `$${metric.target.toLocaleString()}`
                    : metric.name.includes("Ratio")
                      ? `${metric.target}x`
                      : `${metric.target}%`}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
