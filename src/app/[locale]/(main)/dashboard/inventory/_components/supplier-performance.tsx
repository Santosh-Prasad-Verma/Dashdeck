import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const suppliers = [
  { name: "TechSupply Co", onTime: 98, quality: 96, response: 94, status: "Excellent" },
  { name: "CablePro Ltd", onTime: 92, quality: 88, response: 90, status: "Good" },
  { name: "KeyTech Inc", onTime: 85, quality: 92, response: 82, status: "Good" },
  { name: "ErgoWorks", onTime: 72, quality: 85, response: 78, status: "Warning" },
  { name: "BagMasters", onTime: 95, quality: 90, response: 96, status: "Excellent" },
  { name: "CamWorld", onTime: 68, quality: 78, response: 65, status: "Poor" },
];

function getScoreColor(score: number) {
  if (score >= 90) return "bg-emerald-500";
  if (score >= 75) return "bg-amber-500";
  return "bg-red-500";
}

function getStatusBg(status: string) {
  switch (status) {
    case "Excellent":
      return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400";
    case "Good":
      return "bg-blue-500/10 text-blue-600 dark:text-blue-400";
    case "Warning":
      return "bg-amber-500/10 text-amber-600 dark:text-amber-400";
    case "Poor":
      return "bg-red-500/10 text-red-600 dark:text-red-400";
    default:
      return "bg-muted text-muted-foreground";
  }
}

export function SupplierPerformance() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Supplier Performance</CardTitle>
        <CardDescription>On-time delivery and quality ratings</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          {suppliers.map((supplier) => (
            <div key={supplier.name} className="rounded-lg border p-3">
              <div className="mb-3 flex items-center justify-between">
                <span className="font-medium text-sm">{supplier.name}</span>
                <span className={cn("rounded-full px-2 py-0.5 font-medium text-[10px]", getStatusBg(supplier.status))}>
                  {supplier.status}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-xs">
                  <span className="w-16 text-muted-foreground">On-time</span>
                  <Progress
                    value={supplier.onTime}
                    className={cn("h-1.5 flex-1", `[&>div]:${getScoreColor(supplier.onTime)}`)}
                  />
                  <span className="w-8 text-right font-medium tabular-nums">{supplier.onTime}%</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="w-16 text-muted-foreground">Quality</span>
                  <Progress
                    value={supplier.quality}
                    className={cn("h-1.5 flex-1", `[&>div]:${getScoreColor(supplier.quality)}`)}
                  />
                  <span className="w-8 text-right font-medium tabular-nums">{supplier.quality}%</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="w-16 text-muted-foreground">Response</span>
                  <Progress
                    value={supplier.response}
                    className={cn("h-1.5 flex-1", `[&>div]:${getScoreColor(supplier.response)}`)}
                  />
                  <span className="w-8 text-right font-medium tabular-nums">{supplier.response}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
