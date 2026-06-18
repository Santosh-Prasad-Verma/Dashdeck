import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const risks = [
  { risk: "API Dependencies", impact: 5, probability: 4, project: "API Gateway", status: "Mitigating" },
  { risk: "Design Changes", impact: 3, probability: 5, project: "Mobile App", status: "Active" },
  { risk: "Team Availability", impact: 4, probability: 3, project: "Pulse v2", status: "Monitoring" },
  { risk: "Performance Issues", impact: 4, probability: 2, project: "Analytics", status: "Monitoring" },
  { risk: "Scope Creep", impact: 3, probability: 3, project: "Design System", status: "Accepted" },
];

function getRiskColor(impact: number, probability: number) {
  const score = impact * probability;
  if (score > 15) return "bg-red-500";
  if (score > 8) return "bg-amber-500";
  return "bg-emerald-500";
}

export function RiskMatrix() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Risk Matrix</CardTitle>
        <CardDescription>Impact vs probability assessment</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Grid */}
        <div className="mb-6 grid grid-cols-5 gap-px rounded-lg border bg-border">
          {[5, 4, 3, 2, 1].map((impact) => (
            <div key={impact} className="flex flex-col">
              {[1, 2, 3, 4, 5].map((probability) => {
                const matchingRisk = risks.find((r) => r.impact === impact && r.probability === probability);
                return (
                  <div
                    key={`${impact}-${probability}`}
                    className={`flex h-10 items-center justify-center font-medium text-[10px] transition-colors ${
                      impact * probability > 15
                        ? "bg-red-500/20 text-red-600 dark:text-red-400"
                        : impact * probability > 8
                          ? "bg-amber-500/20 text-amber-600 dark:text-amber-400"
                          : "bg-emerald-500/10 text-muted-foreground"
                    } ${matchingRisk ? "ring-2 ring-primary ring-inset" : ""}`}
                    title={matchingRisk ? `${matchingRisk.risk} (${matchingRisk.project})` : ""}
                  >
                    {matchingRisk ? "⚠" : ""}
                  </div>
                );
              })}
            </div>
          ))}

          {/* Y and X-axis labels */}
          <div className="col-span-5 flex justify-between border-t px-1 py-1 text-[10px] text-muted-foreground">
            <span>Low Probability</span>
            <span>High Probability →</span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          {risks.map((risk) => (
            <div key={risk.risk} className="flex items-center justify-between rounded-lg border p-3">
              <div className="flex items-center gap-3">
                <div className={`size-2.5 rounded-full ${getRiskColor(risk.impact, risk.probability)}`} />
                <div>
                  <span className="font-medium text-sm">{risk.risk}</span>
                  <span className="ml-2 text-muted-foreground text-xs">{risk.project}</span>
                </div>
              </div>
              <Badge variant="secondary" className="text-[10px]">
                {risk.status}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
