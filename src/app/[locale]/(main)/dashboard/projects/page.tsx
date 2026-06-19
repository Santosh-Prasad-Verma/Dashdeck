import { Calendar, Target } from "lucide-react";

import { BurndownChart } from "./_components/burndown-chart";
import { ProjectList } from "./_components/project-list";
import { RiskMatrix } from "./_components/risk-matrix";
import { VelocityTrend } from "./_components/velocity-trend";
import { WorkloadHeatmap } from "./_components/workload-heatmap";

export default function Page() {
  const milestones = [
    { title: "Sprint 12 Complete", date: "Yesterday", status: "done", project: "Pulse v2" },
    { title: "API v2 Deployment", date: "Today", status: "in-progress", project: "API Gateway" },
    { title: "Design Review", date: "Tomorrow", status: "upcoming", project: "Mobile App" },
    { title: "Q3 Planning", date: "Jul 5", status: "upcoming", project: "All Projects" },
    { title: "Security Audit", date: "Jul 8", status: "upcoming", project: "Security" },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Timeline Header */}
      <div className="rounded-2xl border bg-card p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-muted-foreground text-sm">Q2 2026 Sprint Cycle</p>
            <h1 className="font-bold text-3xl tracking-tight">Project Management</h1>
          </div>
          <div className="flex items-center gap-3">
            <Target className="size-5 text-muted-foreground" />
            <span className="text-muted-foreground text-sm">84% sprint completion</span>
          </div>
        </div>
        <div className="mt-6 flex items-center gap-2">
          {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"].map((month, i) => (
            <div key={month} className="flex flex-1 items-center gap-2">
              <div className="flex flex-1 flex-col gap-1">
                <div
                  className={`h-2 rounded-full ${i < 6 ? "bg-emerald-500" : i === 6 ? "bg-amber-500" : "bg-muted"}`}
                />
                <span className="text-[10px] text-muted-foreground">{month}</span>
              </div>
              {i < 7 && <div className={`h-0.5 w-6 ${i < 6 ? "bg-emerald-300" : "bg-muted"}`} />}
            </div>
          ))}
        </div>
      </div>

      {/* Milestones */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 @3xl:grid-cols-5">
        {milestones.map((m, i) => (
          <div key={i} className="flex items-start gap-3 rounded-xl border bg-card p-4">
            <div
              className={`mt-0.5 size-2 shrink-0 rounded-full ${
                m.status === "done"
                  ? "bg-emerald-500"
                  : m.status === "in-progress"
                    ? "animate-pulse bg-blue-500"
                    : "bg-muted-foreground/30"
              }`}
            />
            <div>
              <p className="font-medium text-sm">{m.title}</p>
              <p className="text-muted-foreground text-xs">{m.project}</p>
              <div className="mt-1 flex items-center gap-1 text-muted-foreground text-xs">
                <Calendar className="size-3" />
                {m.date}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Burndown + Velocity */}
      <div className="grid grid-cols-1 gap-6 @5xl:grid-cols-12">
        <div className="@5xl:col-span-7 min-w-0">
          <BurndownChart />
        </div>
        <div className="@5xl:col-span-5 min-w-0">
          <VelocityTrend />
        </div>
      </div>

      {/* Workload + Risk Matrix */}
      <div className="grid grid-cols-1 gap-6 @5xl:grid-cols-12">
        <div className="@5xl:col-span-7 min-w-0">
          <WorkloadHeatmap />
        </div>
        <div className="@5xl:col-span-5 min-w-0">
          <RiskMatrix />
        </div>
      </div>

      <ProjectList />
    </div>
  );
}
