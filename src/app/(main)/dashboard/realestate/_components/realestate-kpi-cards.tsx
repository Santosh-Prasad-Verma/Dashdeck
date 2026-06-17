import { Building2, DollarSign, Percent, TrendingUp, Home } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function RealEstateKpiCards() {
  return (
    <div className="grid grid-cols-1 gap-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs sm:grid-cols-2 xl:grid-cols-4 dark:*:data-[slot=card]:bg-card">
      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex size-7 items-center justify-center rounded-lg border bg-muted text-muted-foreground"><Building2 className="size-4" /></div>
          </CardTitle>
          <CardDescription>Total Properties</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-1">
          <div className="flex flex-wrap items-center gap-2">
            <div className="font-medium text-3xl tabular-nums leading-none tracking-tight">342</div>
            <Badge><TrendingUp className="size-3" />+12</Badge>
          </div>
          <p className="text-muted-foreground text-sm">12 added this month</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex size-7 items-center justify-center rounded-lg border bg-muted text-muted-foreground"><Home className="size-4" /></div>
          </CardTitle>
          <CardDescription>Occupancy Rate</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-1">
          <div className="flex flex-wrap items-center gap-2">
            <div className="font-medium text-3xl tabular-nums leading-none tracking-tight">94.2%</div>
            <Badge><TrendingUp className="size-3" />+2.1%</Badge>
          </div>
          <p className="text-muted-foreground text-sm">322 occupied out of 342</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex size-7 items-center justify-center rounded-lg border bg-muted text-muted-foreground"><DollarSign className="size-4" /></div>
          </CardTitle>
          <CardDescription>Monthly Revenue</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-1">
          <div className="flex flex-wrap items-center gap-2">
            <div className="font-medium text-3xl tabular-nums leading-none tracking-tight">$892K</div>
            <Badge><TrendingUp className="size-3" />+8.4%</Badge>
          </div>
          <p className="text-muted-foreground text-sm">Avg rent: $2,770</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex size-7 items-center justify-center rounded-lg border bg-muted text-muted-foreground"><Percent className="size-4" /></div>
          </CardTitle>
          <CardDescription>Avg ROI</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-1">
          <div className="flex flex-wrap items-center gap-2">
            <div className="font-medium text-3xl tabular-nums leading-none tracking-tight">8.7%</div>
            <Badge><TrendingUp className="size-3" />+0.5%</Badge>
          </div>
          <p className="text-muted-foreground text-sm">Portfolio return</p>
        </CardContent>
      </Card>
    </div>
  );
}
