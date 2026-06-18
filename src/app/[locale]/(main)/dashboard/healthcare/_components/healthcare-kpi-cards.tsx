import { Bed, Calendar, Clock, Stethoscope, TrendingUp, Users } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function HealthcareKpiCards() {
  return (
    <div className="grid grid-cols-1 gap-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs sm:grid-cols-2 xl:grid-cols-4 dark:*:data-[slot=card]:bg-card">
      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex size-7 items-center justify-center rounded-lg border bg-muted text-muted-foreground">
              <Users className="size-4" />
            </div>
          </CardTitle>
          <CardDescription>Total Patients</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-1">
          <div className="flex flex-wrap items-center gap-2">
            <div className="font-medium text-3xl tabular-nums leading-none tracking-tight">8,492</div>
            <Badge>
              <TrendingUp className="size-3" />
              +12.4%
            </Badge>
          </div>
          <p className="text-muted-foreground text-sm">Registered this year</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex size-7 items-center justify-center rounded-lg border bg-muted text-muted-foreground">
              <Bed className="size-4" />
            </div>
          </CardTitle>
          <CardDescription>Bed Occupancy</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-1">
          <div className="flex flex-wrap items-center gap-2">
            <div className="font-medium text-3xl tabular-nums leading-none tracking-tight">76%</div>
            <Badge variant="destructive">+5%</Badge>
          </div>
          <p className="text-muted-foreground text-sm">182 of 240 beds occupied</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex size-7 items-center justify-center rounded-lg border bg-muted text-muted-foreground">
              <Stethoscope className="size-4" />
            </div>
          </CardTitle>
          <CardDescription>Appointments Today</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-1">
          <div className="flex flex-wrap items-center gap-2">
            <div className="font-medium text-3xl tabular-nums leading-none tracking-tight">142</div>
            <Badge>
              <TrendingUp className="size-3" />
              +8%
            </Badge>
          </div>
          <p className="text-muted-foreground text-sm">32 remaining</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex size-7 items-center justify-center rounded-lg border bg-muted text-muted-foreground">
              <Clock className="size-4" />
            </div>
          </CardTitle>
          <CardDescription>Avg Wait Time</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-1">
          <div className="flex flex-wrap items-center gap-2">
            <div className="font-medium text-3xl tabular-nums leading-none tracking-tight">14 min</div>
            <Badge variant="outline" className="border-emerald-500/20 bg-emerald-500/10 text-emerald-600">
              -3 min
            </Badge>
          </div>
          <p className="text-muted-foreground text-sm">Down from 17 min last month</p>
        </CardContent>
      </Card>
    </div>
  );
}
