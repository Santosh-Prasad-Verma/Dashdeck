import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const models = [
  {
    name: "Claude 3.5 Sonnet",
    provider: "Anthropic",
    accuracy: 94.2,
    avgLatency: "1.1s",
    costPer1k: "$0.003",
    status: "healthy",
  },
  {
    name: "GPT-4o",
    provider: "OpenAI",
    accuracy: 92.8,
    avgLatency: "1.4s",
    costPer1k: "$0.005",
    status: "healthy",
  },
  {
    name: "Gemini 1.5 Pro",
    provider: "Google",
    accuracy: 91.5,
    avgLatency: "0.9s",
    costPer1k: "$0.002",
    status: "healthy",
  },
  {
    name: "Llama 3.1 70B",
    provider: "Self-hosted",
    accuracy: 88.3,
    avgLatency: "2.1s",
    costPer1k: "$0.001",
    status: "degraded",
  },
  {
    name: "Claude 3.5 Haiku",
    provider: "Anthropic",
    accuracy: 89.7,
    avgLatency: "0.4s",
    costPer1k: "$0.001",
    status: "healthy",
  },
];

function getStatusColor(status: string) {
  switch (status) {
    case "healthy":
      return "bg-emerald-500";
    case "degraded":
      return "bg-amber-500";
    case "down":
      return "bg-red-500";
    default:
      return "bg-muted-foreground";
  }
}

export function ModelPerformance() {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>Model Performance</CardTitle>
        <CardDescription>Accuracy and latency metrics by model</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="flex flex-col gap-4">
          {models.map((model) => (
            <div key={model.name} className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`size-2 rounded-full ${getStatusColor(model.status)}`} />
                  <div>
                    <div className="font-medium text-sm">{model.name}</div>
                    <div className="text-muted-foreground text-xs">{model.provider}</div>
                  </div>
                </div>
                <div className="text-right text-sm">
                  <div className="font-medium tabular-nums">{model.accuracy}%</div>
                  <div className="text-muted-foreground text-xs">{model.avgLatency} avg</div>
                </div>
              </div>
              <Progress value={model.accuracy} className="h-1.5" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
