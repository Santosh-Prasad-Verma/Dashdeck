"use client";

import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import {
  Calendar,
  CheckCircle2,
  ClipboardCheck,
  GripVertical,
  Hammer,
  Lightbulb,
  MoreVertical,
  Plus,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { SortableTaskCard } from "./sortable-task-card";
import type { Column, Task } from "./types";

interface KanbanColumnProps {
  column: Column;
  tasks: Task[];
}

const columnIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  ideas: Lightbulb,
  planned: Calendar,
  building: Hammer,
  qa: ClipboardCheck,
  shipped: CheckCircle2,
};

export function KanbanColumn({ column, tasks }: KanbanColumnProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging, isOver } = useSortable({
    id: column.id,
    data: { type: "column", columnId: column.id },
  });

  const ColumnIcon = columnIcons[column.id] || Lightbulb;

  return (
    <section
      ref={setNodeRef}
      style={{
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
        transition,
      }}
      className={cn(
        "flex min-h-0 flex-col rounded-2xl border border-border/30 bg-zinc-50/40 dark:bg-zinc-900/30 transition-all duration-200",
        isOver && "bg-zinc-100/60 dark:bg-zinc-800/30 border-border/50",
        isDragging && "opacity-60 shadow-lg scale-[0.99]",
      )}
    >
      <div className="flex items-center justify-between gap-3 px-4 pt-4 pb-3">
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <Button
              variant="ghost"
              size="icon-xs"
              className="-ml-2 cursor-grab text-foreground/70 active:cursor-grabbing hover:bg-transparent"
              aria-label={`Drag ${column.title} column`}
              {...attributes}
              {...listeners}
            >
              <GripVertical className="size-3.5 opacity-50" />
            </Button>
            <ColumnIcon className="size-4 text-muted-foreground/80 shrink-0" />
            <h2 className="truncate font-semibold text-sm leading-none text-zinc-800 dark:text-zinc-100">
              {column.title}
            </h2>
            <span className="ml-1.5 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-zinc-200/60 dark:bg-zinc-800/60 px-1 text-[10px] font-bold text-zinc-600 dark:text-zinc-400 tabular-nums">
              {tasks.length}
            </span>
          </div>
        </div>
        <div className="-mr-2 flex items-center gap-0.5 text-muted-foreground">
          <Button variant="ghost" size="icon-sm" aria-label={`Add task to ${column.title}`}>
            <Plus />
          </Button>
          <Button variant="ghost" size="icon-sm" aria-label={`${column.title} column actions`}>
            <MoreVertical />
          </Button>
        </div>
      </div>

      <SortableContext items={tasks.map((task) => task.id)} strategy={verticalListSortingStrategy}>
        <div className="scrollbar-thin flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-3 pb-3 [scrollbar-color:var(--border)_transparent] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-border [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar]:w-1">
          {tasks.map((task) => (
            <SortableTaskCard key={task.id} task={task} columnId={column.id} />
          ))}
        </div>
      </SortableContext>
    </section>
  );
}
