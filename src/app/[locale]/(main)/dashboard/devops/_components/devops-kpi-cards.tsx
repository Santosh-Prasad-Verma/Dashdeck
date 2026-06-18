import { Cloud, Cpu, HardDrive, Server, TrendingUp, Wifi } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function DevOpsKpiCards() {
  return (
    <div className="grid grid-cols-1 gap-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs sm:grid-cols-2 xl:grid-cols-4 dark:*:data-[slot=card]:bg-card">
      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex size-7 items-center justify-center rounded-lg border bg-muted text-muted-foreground">
              <Server className="size-4" />
            </div>
          </CardTitle>
          <CardDescription>Server Uptime</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-1">
          <div className="flex flex-wrap items-center gap-2">
            <div className="font-medium text-3xl tabular-nums leading-none tracking-tight">99.99%</div>
            <Badge variant="outline" className="border-emerald-500/20 bg-emerald-500/10 text-emerald-600">
              30 days
            </Badge>
          </div>
          <p className="text-muted-foreground text-sm">Last incident: 15 days ago</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex size-7 items-center justify-center rounded-lg border bg-muted text-muted-foreground">
              <Cpu className="size-4" />
            </div>
          </CardTitle>
          <CardDescription>CPU Usage</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-1">
          <div className="flex flex-wrap items-center gap-2">
            <div className="font-medium text-3xl tabular-nums leading-none tracking-tight">42%</div>
            <Badge>
              <TrendingUp className="size-3" />
              +5%
            </Badge>
          </div>
          <p className="text-muted-foreground text-sm">4.2 GHz · 16 cores</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex size-7 items-center justify-center rounded-lg border bg-muted text-muted-foreground">
              <HardDrive className="size-4" />
            </div>
          </CardTitle>
          <CardDescription>Memory Usage</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-1">
          <div className="flex flex-wrap items-center gap-2">
            <div className="font-medium text-3xl tabular-nums leading-none tracking-tight">28.4 GB</div>
            <Badge variant="destructive">+12%</Badge>
          </div>
          <p className="text-muted-foreground text-sm">of 64 GB total</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex size-7 items-center justify-center rounded-lg border bg-muted text-muted-foreground">
              <Wifi className="size-4" />
            </div>
          </CardTitle>
          <CardDescription>Network Traffic</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-1">
          <div className="flex flex-wrap items-center gap-2">
            <div className="font-medium text-3xl tabular-nums leading-none tracking-tight">1.2 TB</div>
            <Badge>
              <TrendingUp className="size-3" />
              +18%
            </Badge>
          </div>
          <p className="text-muted-foreground text-sm">Bandwidth used today</p>
        </CardContent>
      </Card>
    </div>
  );
}
