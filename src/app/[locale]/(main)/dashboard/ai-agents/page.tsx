import { CheckCircle2, Cpu, Play, ShieldAlert } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { ActiveAgents } from "./_components/active-agents";
import { AgentMetrics } from "./_components/agent-metrics";
import { AgentTraces } from "./_components/agent-traces";

export default function Page() {
  return (
    <div className="flex flex-col gap-4">
      <div className="space-y-1">
        <h1 className="text-3xl tracking-tight">AI Agent Control Room</h1>
        <p className="text-muted-foreground text-sm">
          Orchestrate, trace, and monitor autonomous agent runs and tool executions in real-time.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs xl:grid-cols-4 dark:*:data-[slot=card]:bg-card">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>
              <div className="flex size-7 items-center justify-center rounded-lg border bg-muted text-muted-foreground">
                <Cpu className="size-4" />
              </div>
            </CardTitle>
            <CardDescription className="pt-2">Total Agent Runs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="font-semibold text-3xl tabular-nums leading-none tracking-tight">2,451</div>
            <p className="mt-2 text-muted-foreground text-xs">+14.2% from yesterday</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>
              <div className="flex size-7 items-center justify-center rounded-lg border bg-muted text-muted-foreground">
                <Play className="size-4" />
              </div>
            </CardTitle>
            <CardDescription className="pt-2">Active Threads</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="font-semibold text-3xl tabular-nums leading-none tracking-tight">12</div>
            <p className="mt-2 text-muted-foreground text-xs">Currently running in background</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>
              <div className="flex size-7 items-center justify-center rounded-lg border bg-muted text-muted-foreground">
                <CheckCircle2 className="size-4" />
              </div>
            </CardTitle>
            <CardDescription className="pt-2">Tool Success Rate</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="font-semibold text-3xl tabular-nums leading-none tracking-tight">99.1%</div>
            <p className="mt-2 text-muted-foreground text-xs">1,942 calls, 18 failures</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>
              <div className="flex size-7 items-center justify-center rounded-lg border bg-muted text-muted-foreground">
                <ShieldAlert className="size-4" />
              </div>
            </CardTitle>
            <CardDescription className="pt-2">Average Steps</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="font-semibold text-3xl tabular-nums leading-none tracking-tight">6.4</div>
            <p className="mt-2 text-muted-foreground text-xs">Steps per goal completion</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Simulation Section */}
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-12">
        <div className="xl:col-span-8">
          <AgentTraces />
        </div>
        <div className="xl:col-span-4">
          <ActiveAgents />
        </div>
      </div>

      {/* Performance Metrics */}
      <AgentMetrics />
    </div>
  );
}
