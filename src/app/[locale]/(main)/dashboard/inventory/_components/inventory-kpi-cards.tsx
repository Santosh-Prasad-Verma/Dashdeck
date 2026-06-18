import { AlertTriangle, Package, TrendingDown, TrendingUp, Truck } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function InventoryKpiCards() {
  return (
    <div className="grid grid-cols-1 gap-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs sm:grid-cols-2 xl:grid-cols-4 dark:*:data-[slot=card]:bg-card">
      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex size-7 items-center justify-center rounded-lg border bg-muted text-muted-foreground">
              <Package className="size-4" />
            </div>
          </CardTitle>
          <CardDescription>Total Items</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-1">
          <div className="flex flex-wrap items-center gap-2">
            <div className="font-medium text-3xl tabular-nums leading-none tracking-tight">45,892</div>
            <Badge>
              <TrendingUp className="size-3" />
              +234
            </Badge>
          </div>
          <p className="text-muted-foreground text-sm">Across 5 warehouses</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex size-7 items-center justify-center rounded-lg border bg-muted text-muted-foreground">
              <AlertTriangle className="size-4" />
            </div>
          </CardTitle>
          <CardDescription>Low Stock</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-1">
          <div className="flex flex-wrap items-center gap-2">
            <div className="font-medium text-3xl tabular-nums leading-none tracking-tight">142</div>
            <Badge variant="destructive">
              <TrendingUp className="size-3" />
              +12
            </Badge>
          </div>
          <p className="text-muted-foreground text-sm">Items below reorder point</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex size-7 items-center justify-center rounded-lg border bg-muted text-muted-foreground">
              <Truck className="size-4" />
            </div>
          </CardTitle>
          <CardDescription>Pending Orders</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-1">
          <div className="flex flex-wrap items-center gap-2">
            <div className="font-medium text-3xl tabular-nums leading-none tracking-tight">56</div>
            <Badge>+8</Badge>
          </div>
          <p className="text-muted-foreground text-sm">Expected delivery this week</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex size-7 items-center justify-center rounded-lg border bg-muted text-muted-foreground">
              <TrendingDown className="size-4" />
            </div>
          </CardTitle>
          <CardDescription>Dead Stock</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-1">
          <div className="flex flex-wrap items-center gap-2">
            <div className="font-medium text-3xl tabular-nums leading-none tracking-tight">$12,450</div>
            <Badge variant="outline" className="border-emerald-500/20 bg-emerald-500/10 text-emerald-600">
              <TrendingDown className="size-3" />
              -$2,100
            </Badge>
          </div>
          <p className="text-muted-foreground text-sm">Value of unsold stock</p>
        </CardContent>
      </Card>
    </div>
  );
}
