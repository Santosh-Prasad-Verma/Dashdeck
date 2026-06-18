import { DollarSign, TrendingDown, TrendingUp, UserMinus, Users } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

function Sparkline({ data, positive }: { data: number[]; positive: boolean }) {
  const width = 60;
  const height = 24;
  const padding = 2;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min === 0 ? 1 : max - min;
  const points = data
    .map(
      (val, index) =>
        `${(index * (width - padding * 2)) / (data.length - 1) + padding},${
          height - ((val - min) * (height - padding * 2)) / range - padding
        }`,
    )
    .join(" ");

  return (
    <svg width={width} height={height} className="overflow-visible">
      <polyline
        fill="none"
        stroke={positive ? "hsl(var(--chart-2))" : "var(--destructive)"}
        strokeWidth={1.5}
        points={points}
      />
    </svg>
  );
}

export function SaasKpiCards() {
  return (
    <div className="grid grid-cols-1 gap-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs sm:grid-cols-2 xl:grid-cols-4 dark:*:data-[slot=card]:bg-card">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>
            <div className="flex size-7 items-center justify-center rounded-lg border bg-muted text-muted-foreground">
              <DollarSign className="size-4" />
            </div>
          </CardTitle>
          <CardDescription className="mt-1.5">MRR</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between gap-2">
            <div className="font-medium text-3xl tabular-nums leading-none tracking-tight">$128,500</div>
            <div className="flex h-6 items-center">
              <Sparkline data={[112, 115, 114, 118, 122, 125, 128.5]} positive={true} />
            </div>
          </div>
          <div className="mt-1 flex items-center gap-1.5">
            <Badge className="flex h-5 items-center gap-0.5 border-none bg-emerald-500/10 px-1.5 py-0 font-medium text-emerald-500 text-xs hover:bg-emerald-500/10">
              <TrendingUp className="size-3" />
              +12.4%
            </Badge>
            <span className="font-medium text-[10px] text-muted-foreground">+$14,200 this month</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>
            <div className="flex size-7 items-center justify-center rounded-lg border bg-muted text-muted-foreground">
              <Users className="size-4" />
            </div>
          </CardTitle>
          <CardDescription className="mt-1.5">Total Customers</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between gap-2">
            <div className="font-medium text-3xl tabular-nums leading-none tracking-tight">2,847</div>
            <div className="flex h-6 items-center">
              <Sparkline data={[2540, 2580, 2620, 2690, 2730, 2800, 2847]} positive={true} />
            </div>
          </div>
          <div className="mt-1 flex items-center gap-1.5">
            <Badge className="flex h-5 items-center gap-0.5 border-none bg-emerald-500/10 px-1.5 py-0 font-medium text-emerald-500 text-xs hover:bg-emerald-500/10">
              <TrendingUp className="size-3" />
              +4.7%
            </Badge>
            <span className="font-medium text-[10px] text-muted-foreground">+128 new customers</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>
            <div className="flex size-7 items-center justify-center rounded-lg border bg-muted text-muted-foreground">
              <UserMinus className="size-4" />
            </div>
          </CardTitle>
          <CardDescription className="mt-1.5">Churn Rate</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between gap-2">
            <div className="font-medium text-3xl tabular-nums leading-none tracking-tight">2.4%</div>
            <div className="flex h-6 items-center">
              <Sparkline data={[2.8, 2.7, 2.9, 2.6, 2.5, 2.45, 2.4]} positive={true} />
            </div>
          </div>
          <div className="mt-1 flex items-center gap-1.5">
            <Badge className="flex h-5 items-center gap-0.5 border-none bg-emerald-500/10 px-1.5 py-0 font-medium text-emerald-500 text-xs hover:bg-emerald-500/10">
              <TrendingDown className="size-3" />
              -0.3%
            </Badge>
            <span className="font-medium text-[10px] text-muted-foreground">Below 2.5% target</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>
            <div className="flex size-7 items-center justify-center rounded-lg border bg-muted text-muted-foreground">
              <DollarSign className="size-4" />
            </div>
          </CardTitle>
          <CardDescription className="mt-1.5">ARPU</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between gap-2">
            <div className="font-medium text-3xl tabular-nums leading-none tracking-tight">$45.10</div>
            <div className="flex h-6 items-center">
              <Sparkline data={[41.5, 42.1, 42.8, 43.5, 44.0, 44.6, 45.1]} positive={true} />
            </div>
          </div>
          <div className="mt-1 flex items-center gap-1.5">
            <Badge className="flex h-5 items-center gap-0.5 border-none bg-emerald-500/10 px-1.5 py-0 font-medium text-emerald-500 text-xs hover:bg-emerald-500/10">
              <TrendingUp className="size-3" />
              +7.6%
            </Badge>
            <span className="font-medium text-[10px] text-muted-foreground">+$3.20 this quarter</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
