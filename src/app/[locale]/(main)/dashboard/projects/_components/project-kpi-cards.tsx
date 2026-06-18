import { AlertTriangle, CheckCircle, Clock, TrendingUp, Users } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function ProjectKpiCards() {
  return (
    <div className="grid grid-cols-1 gap-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs sm:grid-cols-2 xl:grid-cols-4 dark:*:data-[slot=card]:bg-card">
      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex size-7 items-center justify-center rounded-lg border bg-muted text-muted-foreground">
              <TrendingUp className="size-4" />
            </div>
          </CardTitle>
          <CardDescription>Active Projects</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-1">
          <div className="flex flex-wrap items-center gap-2">
            <div className="font-medium text-3xl tabular-nums leading-none tracking-tight">24</div>
            <Badge variant="outline" className="border-emerald-500/20 bg-emerald-500/10 text-emerald-600">
              18 on track
            </Badge>
          </div>
          <p className="text-muted-foreground text-sm">6 need attention</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex size-7 items-center justify-center rounded-lg border bg-muted text-muted-foreground">
              <CheckCircle className="size-4" />
            </div>
          </CardTitle>
          <CardDescription>Completed</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-1">
          <div className="flex flex-wrap items-center gap-2">
            <div className="font-medium text-3xl tabular-nums leading-none tracking-tight">38</div>
            <Badge>
              <TrendingUp className="size-3" />
              +5
            </Badge>
          </div>
          <p className="text-muted-foreground text-sm">Projects this quarter</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex size-7 items-center justify-center rounded-lg border bg-muted text-muted-foreground">
              <Users className="size-4" />
            </div>
          </CardTitle>
          <CardDescription>Team Members</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-1">
          <div className="flex flex-wrap items-center gap-2">
            <div className="font-medium text-3xl tabular-nums leading-none tracking-tight">42</div>
            <Badge>+3</Badge>
          </div>
          <p className="text-muted-foreground text-sm">Across all projects</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex size-7 items-center justify-center rounded-lg border bg-muted text-muted-foreground">
              <AlertTriangle className="size-4" />
            </div>
          </CardTitle>
          <CardDescription>At Risk</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-1">
          <div className="flex flex-wrap items-center gap-2">
            <div className="font-medium text-3xl tabular-nums leading-none tracking-tight">4</div>
            <Badge variant="destructive">+1</Badge>
          </div>
          <p className="text-muted-foreground text-sm">Behind schedule</p>
        </CardContent>
      </Card>
    </div>
  );
}
