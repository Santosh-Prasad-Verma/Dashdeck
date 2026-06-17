import { DollarSign, TrendingDown, TrendingUp, UserMinus, UserPlus, Users } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function SaasKpiCards() {
  return (
    <div className="grid grid-cols-1 gap-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs sm:grid-cols-2 xl:grid-cols-4 dark:*:data-[slot=card]:bg-card">
      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex size-7 items-center justify-center rounded-lg border bg-muted text-muted-foreground"><DollarSign className="size-4" /></div>
          </CardTitle>
          <CardDescription>MRR</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-1">
          <div className="flex flex-wrap items-center gap-2">
            <div className="font-medium text-3xl tabular-nums leading-none tracking-tight">$128,500</div>
            <Badge><TrendingUp className="size-3" />+12.4%</Badge>
          </div>
          <p className="text-muted-foreground text-sm">+$14,200 this month</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex size-7 items-center justify-center rounded-lg border bg-muted text-muted-foreground"><Users className="size-4" /></div>
          </CardTitle>
          <CardDescription>Total Customers</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-1">
          <div className="flex flex-wrap items-center gap-2">
            <div className="font-medium text-3xl tabular-nums leading-none tracking-tight">2,847</div>
            <Badge><UserPlus className="size-3" />+128</Badge>
          </div>
          <p className="text-muted-foreground text-sm">New this month</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex size-7 items-center justify-center rounded-lg border bg-muted text-muted-foreground"><UserMinus className="size-4" /></div>
          </CardTitle>
          <CardDescription>Churn Rate</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-1">
          <div className="flex flex-wrap items-center gap-2">
            <div className="font-medium text-3xl tabular-nums leading-none tracking-tight">2.4%</div>
            <Badge variant="outline" className="border-emerald-500/20 bg-emerald-500/10 text-emerald-600"><TrendingDown className="size-3" />-0.3%</Badge>
          </div>
          <p className="text-muted-foreground text-sm">Below 2.5% target</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex size-7 items-center justify-center rounded-lg border bg-muted text-muted-foreground"><DollarSign className="size-4" /></div>
          </CardTitle>
          <CardDescription>ARPU</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-1">
          <div className="flex flex-wrap items-center gap-2">
            <div className="font-medium text-3xl tabular-nums leading-none tracking-tight">$45.10</div>
            <Badge><TrendingUp className="size-3" />+$3.20</Badge>
          </div>
          <p className="text-muted-foreground text-sm">Average revenue per user</p>
        </CardContent>
      </Card>
    </div>
  );
}
