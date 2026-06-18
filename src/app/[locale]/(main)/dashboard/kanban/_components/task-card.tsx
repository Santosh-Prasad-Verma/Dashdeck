"use client";

import { isPast, isToday } from "date-fns";
import {
  AlertCircle,
  ArrowUpRight,
  BadgeCheck,
  CalendarDays,
  FileText,
  Flame,
  type LucideIcon,
  MessageSquare,
  Minus,
  Paperclip,
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { cn, getInitials } from "@/lib/utils";

import { tagTones } from "./data";
import type { ColumnId, Task, TaskInsightLabel, TaskPriority } from "./types";

const taskInsightIcons: Record<TaskInsightLabel, LucideIcon> = {
  Attachments: Paperclip,
  Comments: MessageSquare,
  Documents: FileText,
};

const priorityBadgeConfig: Record<
  TaskPriority,
  { icon: LucideIcon; variant: "destructive" | "secondary"; className: string }
> = {
  High: {
    icon: Flame,
    variant: "destructive",
    className: "border-transparent",
  },
  Low: {
    icon: Minus,
    variant: "secondary",
    className: "bg-slate-500/10 text-slate-700 dark:bg-slate-500/15 dark:text-slate-300",
  },
  Medium: {
    icon: ArrowUpRight,
    variant: "secondary",
    className: "bg-amber-500/10 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
  },
};

const isOverdue = (dateString: string) => {
  try {
    const d = new Date(`${dateString}, 2026`);
    return isPast(d) && !isToday(d);
  } catch (_e) {
    return false;
  }
};

export function TaskCard({
  task,
  columnId,
  isOverlay = false,
}: {
  task: Task;
  columnId?: ColumnId;
  isOverlay?: boolean;
}) {
  const isDone = columnId === "shipped";
  const showBuildingDetails = columnId === "building" && typeof task.progress === "number";
  const owner = task.owner;
  const PriorityIcon = priorityBadgeConfig[task.priority].icon;
  const overdue = !isDone && isOverdue(task.dueDate);

  return (
    <article
      className={cn(
        "flex cursor-grab flex-col gap-3 rounded-xl border border-border/50 bg-card/75 p-4 text-card-foreground shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-[2px] hover:border-border/90 hover:shadow-black/5 hover:shadow-md active:cursor-grabbing dark:bg-zinc-900/60 dark:hover:shadow-black/25",
        isOverlay && "w-68 rotate-1 shadow-lg",
      )}
    >
      <div className="min-w-0 space-y-1.5">
        <div className="flex items-center justify-between gap-3">
          <h3 className="min-w-0 truncate font-semibold text-sm leading-none tracking-tight">{task.title}</h3>
          <Badge
            variant={priorityBadgeConfig[task.priority].variant}
            className={cn(
              "shrink-0 rounded-md border-transparent px-2 py-0.5 font-semibold text-[10px] uppercase tracking-wider",
              priorityBadgeConfig[task.priority].className,
            )}
          >
            <PriorityIcon data-icon="inline-start" />
            {task.priority}
          </Badge>
        </div>
        <p className="line-clamp-2 text-muted-foreground text-xs leading-relaxed">{task.description}</p>
      </div>

      {!showBuildingDetails ? (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Avatar className={cn("size-5 after:rounded-sm", owner.tone)}>
              <AvatarFallback className="rounded-sm text-[10px]">{getInitials(owner.name)}</AvatarFallback>
            </Avatar>

            <span className="font-medium text-muted-foreground text-xs">{owner.name}</span>
          </div>

          <div
            className={cn(
              "flex min-w-0 items-center gap-1.5 rounded-md border px-2 py-0.5 font-medium text-xs transition-colors",
              overdue
                ? "border-rose-500/20 bg-rose-500/10 text-rose-600 dark:text-rose-400"
                : "border-border/30 bg-muted/40 text-muted-foreground",
            )}
          >
            {overdue ? <AlertCircle className="size-3 text-rose-500" /> : <CalendarDays className="size-3" />}
            <span className="truncate font-semibold text-[10px] tracking-tight">{task.dueDate}</span>
          </div>
        </div>
      ) : null}

      {showBuildingDetails ? (
        <div className="flex flex-col gap-3">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-muted-foreground text-xs">
              <span className="leading-none">Progress</span>
              <span className="tabular-nums leading-none">{task.progress}%</span>
            </div>
            <Progress value={task.progress} />
          </div>
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between gap-3">
              <span className="font-medium text-muted-foreground text-sm">Owner</span>
              <div className="flex items-center gap-1.5">
                <span className="truncate text-muted-foreground text-sm">{owner.name}</span>
                <Avatar className={cn("size-5 after:rounded-sm", owner.tone)}>
                  <AvatarFallback className="rounded-sm text-[10px]">{getInitials(owner.name)}</AvatarFallback>
                </Avatar>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3">
              <span className="font-medium text-muted-foreground text-sm">Due date</span>
              <span
                className={cn(
                  "flex items-center gap-1.5 rounded-md border px-2 py-0.5 font-medium text-xs transition-colors",
                  overdue
                    ? "border-rose-500/20 bg-rose-500/10 text-rose-600 dark:text-rose-400"
                    : "border-border/30 bg-muted/40 text-muted-foreground",
                )}
              >
                {overdue && <AlertCircle className="size-3 text-rose-500" />}
                <span className="truncate font-semibold text-[10px] tracking-tight">{task.dueDate}</span>
                {!overdue && <CalendarDays className="size-3" />}
              </span>
            </div>

            <div className="flex items-center justify-between gap-3">
              <span className="font-medium text-muted-foreground text-sm">Team</span>
              <Badge
                variant="secondary"
                className={cn("rounded-md border-transparent px-2 font-medium", tagTones[task.team])}
              >
                {task.team}
              </Badge>
            </div>
          </div>
        </div>
      ) : null}

      <Separator />

      <div>
        {isDone ? (
          <div className="flex items-center gap-1 font-medium text-green-700 text-sm dark:text-green-600">
            <BadgeCheck className="size-4" />
            Done
          </div>
        ) : null}

        {!isDone ? (
          <div className="flex items-center gap-3 text-muted-foreground text-sm">
            {task.insights.map((insight) => {
              const Icon = taskInsightIcons[insight.label];

              return (
                <span key={insight.label} className="flex items-center gap-1.5 text-sm">
                  <Icon className="size-3.5" />
                  {insight.count}
                </span>
              );
            })}
          </div>
        ) : null}
      </div>
    </article>
  );
}
