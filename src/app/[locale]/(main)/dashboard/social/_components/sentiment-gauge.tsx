import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function SentimentGauge() {
  const data = [
    { label: "Positive", value: 62, color: "bg-emerald-500" },
    { label: "Neutral", value: 24, color: "bg-amber-400" },
    { label: "Negative", value: 14, color: "bg-red-500" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sentiment Analysis</CardTitle>
        <CardDescription>Overall sentiment across all platforms</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex h-3 overflow-hidden rounded-full bg-muted">
          {data.map((item) => (
            <div
              key={item.label}
              className={`h-full transition-all ${item.color}`}
              style={{ width: `${item.value}%` }}
            />
          ))}
        </div>
        <div className="flex flex-col gap-3">
          {data.map((item) => (
            <div key={item.label} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`size-3 rounded-full ${item.color}`} />
                <span className="text-sm">{item.label}</span>
              </div>
              <span className="font-bold text-lg tabular-nums">{item.value}%</span>
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-lg bg-muted/30 p-3 text-center text-muted-foreground text-xs">
          Overall sentiment is <span className="font-medium text-emerald-600">positive</span> — up 3.2% from last month
        </div>
      </CardContent>
    </Card>
  );
}
