import { Bot, Coins, MessageSquare, Zap } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function AiKpiCards() {
  return (
    <div className="grid grid-cols-1 gap-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs xl:grid-cols-4 dark:*:data-[slot=card]:bg-card">
      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex size-7 items-center justify-center rounded-lg border bg-muted text-muted-foreground">
              <MessageSquare className="size-4" />
            </div>
          </CardTitle>
          <CardDescription>Total Conversations</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-1">
          <div className="flex flex-wrap items-center gap-2">
            <div className="font-medium text-3xl tabular-nums leading-none tracking-tight">12,847</div>
            <Badge>
              <Zap className="size-3" />
              +23.1%
            </Badge>
          </div>
          <p className="text-muted-foreground text-sm">Across all models this month</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex size-7 items-center justify-center rounded-lg border bg-muted text-muted-foreground">
              <Coins className="size-4" />
            </div>
          </CardTitle>
          <CardDescription>Token Usage</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-1">
          <div className="flex flex-wrap items-center gap-2">
            <div className="font-medium text-3xl tabular-nums leading-none tracking-tight">8.4M</div>
            <Badge variant="destructive">
              <Zap className="size-3" />
              +12.5%
            </Badge>
          </div>
          <p className="text-muted-foreground text-sm">Input + output tokens combined</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex size-7 items-center justify-center rounded-lg border bg-muted text-muted-foreground">
              <Bot className="size-4" />
            </div>
          </CardTitle>
          <CardDescription>API Cost</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-1">
          <div className="flex flex-wrap items-center gap-2">
            <div className="font-medium text-3xl tabular-nums leading-none tracking-tight">$2,341</div>
            <Badge variant="destructive">
              <Zap className="size-3" />
              +8.2%
            </Badge>
          </div>
          <p className="text-muted-foreground text-sm">Total spend across all providers</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex size-7 items-center justify-center rounded-lg border bg-muted text-muted-foreground">
              <Zap className="size-4" />
            </div>
          </CardTitle>
          <CardDescription>Avg Response Time</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-1">
          <div className="flex flex-wrap items-center gap-2">
            <div className="font-medium text-3xl tabular-nums leading-none tracking-tight">1.2s</div>
            <Badge>
              <Zap className="size-3" />
              -15.3%
            </Badge>
          </div>
          <p className="text-muted-foreground text-sm">Improved from last week</p>
        </CardContent>
      </Card>
    </div>
  );
}
