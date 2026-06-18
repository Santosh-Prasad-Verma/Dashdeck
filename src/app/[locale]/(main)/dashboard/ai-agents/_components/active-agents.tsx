"use client";

import { useState } from "react";

import { type Bot, Code, Cpu, Globe, Mail, Pause, Play, RefreshCw } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface Agent {
  id: string;
  name: string;
  type: string;
  description: string;
  status: "idle" | "running" | "paused";
  lastRun: string;
  icon: typeof Bot;
}

const initialAgents: Agent[] = [
  {
    id: "outreach",
    name: "Sales Outreach Agent",
    type: "Marketing / Sales",
    description: "Personalizes outreach emails using LinkedIn profiles and sends drafts via Mail client.",
    status: "running",
    lastRun: "10 seconds ago",
    icon: Mail,
  },
  {
    id: "coder",
    name: "Code Review Assistant",
    type: "Development",
    description: "Monitors GitHub pushes, runs biome linter checks, and submits automated refactor suggestions.",
    status: "idle",
    lastRun: "2 minutes ago",
    icon: Code,
  },
  {
    id: "analyst",
    name: "Web Research Agent",
    type: "Analytics",
    description: "Performs market intelligence web scraping and synthesizes daily competitor alerts.",
    status: "paused",
    lastRun: "3 hours ago",
    icon: Globe,
  },
  {
    id: "db-sync",
    name: "Data Syncer Bot",
    type: "Data Management",
    description: "Cleanses, formats, and syncs transaction logs between PostgreSQL and analytics warehouse.",
    status: "idle",
    lastRun: "1 hour ago",
    icon: Cpu,
  },
];

export function ActiveAgents() {
  const [agents, setAgents] = useState<Agent[]>(initialAgents);

  const toggleStatus = (id: string, currentStatus: "idle" | "running" | "paused") => {
    setAgents((prev) =>
      prev.map((agent) => {
        if (agent.id !== id) return agent;
        const newStatus = currentStatus === "running" ? "paused" : "running";
        return { ...agent, status: newStatus };
      }),
    );
  };

  const getStatusBadge = (status: "idle" | "running" | "paused") => {
    switch (status) {
      case "running":
        return (
          <Badge className="border-emerald-500/30 bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/20">
            <span className="mr-1 h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            Running
          </Badge>
        );
      case "paused":
        return (
          <Badge className="border-amber-500/30 bg-amber-500/15 text-amber-400 hover:bg-amber-500/20">
            <span className="mr-1 h-1.5 w-1.5 rounded-full bg-amber-400" />
            Paused
          </Badge>
        );
      default:
        return (
          <Badge className="border-gray-500/30 bg-gray-500/15 text-gray-400 hover:bg-gray-500/20">
            <span className="mr-1 h-1.5 w-1.5 rounded-full bg-gray-400" />
            Idle
          </Badge>
        );
    }
  };

  return (
    <Card className="flex h-full flex-col bg-linear-to-t from-primary/5 to-card dark:bg-card">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <div className="space-y-1">
          <CardTitle className="text-xl">Active Agents</CardTitle>
          <CardDescription>Monitor and control active autonomous agent instances</CardDescription>
        </div>
        <Button size="icon" variant="ghost" className="size-8">
          <RefreshCw className="size-4" />
        </Button>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto">
        <div className="flex flex-col gap-4">
          {agents.map((agent) => {
            const Icon = agent.icon;
            return (
              <div
                key={agent.id}
                className="flex flex-col gap-3 rounded-xl border border-white/[0.04] bg-white/[0.01] p-4 transition-all hover:bg-white/[0.02]"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border bg-muted text-muted-foreground">
                      <Icon className="size-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-white">{agent.name}</h4>
                      <span className="text-gray-500 text-xs">{agent.type}</span>
                    </div>
                  </div>
                  {getStatusBadge(agent.status)}
                </div>

                <p className="text-gray-400 text-xs leading-relaxed">{agent.description}</p>

                <div className="flex items-center justify-between border-white/[0.04] border-t pt-3 text-gray-500 text-xs">
                  <span>Last Run: {agent.lastRun}</span>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => toggleStatus(agent.id, agent.status)}
                      className={`h-7 px-2.5 ${
                        agent.status === "running"
                          ? "text-amber-400 hover:bg-amber-400/10 hover:text-amber-300"
                          : "text-emerald-400 hover:bg-emerald-400/10 hover:text-emerald-300"
                      }`}
                    >
                      {agent.status === "running" ? (
                        <>
                          <Pause className="mr-1.5 size-3" />
                          Pause
                        </>
                      ) : (
                        <>
                          <Play className="mr-1.5 size-3" />
                          Run
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
