import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const people = ["Sarah", "Mike", "Alex", "Emma", "John", "Nora"];
const projectLabels = ["Pulse v2", "API Gateway", "Mobile App", "Analytics", "Design System"];

const generate = () => {
  const data: number[][] = [];
  for (let p = 0; p < people.length; p++) {
    data.push(projectLabels.map(() => Math.floor(Math.random() * 60 + 20)));
  }
  return data;
};

const workload = generate();

function getColor(value: number) {
  if (value > 80) return "bg-red-500";
  if (value > 60) return "bg-amber-500";
  if (value > 40) return "bg-blue-500";
  return "bg-emerald-500";
}

export function WorkloadHeatmap() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Team Workload</CardTitle>
        <CardDescription>Weekly allocation across projects (%)</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="py-2 pr-4 text-left font-medium text-muted-foreground">Team</th>
                {projectLabels.map((p) => (
                  <th key={p} className="px-2 py-2 text-center font-medium text-muted-foreground text-xs">{p}</th>
                ))}
                <th className="pl-4 text-center font-medium text-muted-foreground text-xs">Total</th>
              </tr>
            </thead>
            <tbody>
              {people.map((person, pi) => {
                const total = workload[pi].reduce((a, b) => a + b, 0);
                return (
                  <tr key={person} className="border-t">
                    <td className="py-2 pr-4 font-medium">{person}</td>
                    {workload[pi].map((v, i) => (
                      <td key={i} className="px-1 py-2">
                        <div className={`mx-auto h-6 w-12 rounded flex items-center justify-center text-xs font-medium ${getColor(v)} text-white`}>
                          {v}%
                        </div>
                      </td>
                    ))}
                    <td className="py-2 pl-4 text-center font-medium tabular-nums">{total}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
