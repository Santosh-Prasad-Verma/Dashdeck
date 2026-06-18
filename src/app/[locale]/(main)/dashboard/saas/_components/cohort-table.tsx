import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const periods = ["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8"];
const cohorts = [
  { name: "Jan 2026", users: 340, retention: [100, 82, 71, 65, 58, 52, 48, 44] },
  { name: "Feb 2026", users: 420, retention: [100, 84, 73, 67, 61, 55, 50] },
  { name: "Mar 2026", users: 380, retention: [100, 85, 75, 68, 62, 56] },
  { name: "Apr 2026", users: 450, retention: [100, 86, 77, 70, 64] },
  { name: "May 2026", users: 480, retention: [100, 87, 79, 72] },
  { name: "Jun 2026", users: 510, retention: [100, 88, 80] },
];

function getRetentionColor(value: number) {
  if (value >= 80) return "bg-emerald-500";
  if (value >= 60) return "bg-blue-500";
  if (value >= 40) return "bg-amber-500";
  return "bg-red-500";
}

export function CohortTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Cohort Retention</CardTitle>
        <CardDescription>Weekly retention by signup month (%)</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="py-2 pr-4 text-left font-medium text-muted-foreground">Cohort</th>
                <th className="px-2 py-2 text-right font-medium text-muted-foreground">Users</th>
                {periods.map((p) => (
                  <th key={p} className="px-2 py-2 text-center font-medium text-muted-foreground">
                    {p}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {cohorts.map((cohort) => (
                <tr key={cohort.name} className="border-t">
                  <td className="py-2 pr-4 font-medium">{cohort.name}</td>
                  <td className="px-2 py-2 text-right tabular-nums">{cohort.users}</td>
                  {periods.map((_, i) => (
                    <td key={i} className="px-1 py-2 text-center">
                      {cohort.retention[i] !== undefined ? (
                        <span
                          className={cn(
                            "inline-flex size-8 items-center justify-center rounded text-white text-xs font-medium",
                            getRetentionColor(cohort.retention[i]),
                          )}
                        >
                          {cohort.retention[i]}
                        </span>
                      ) : (
                        <span className="text-muted-foreground/30">—</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
