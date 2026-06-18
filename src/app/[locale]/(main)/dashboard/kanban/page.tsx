"use client";

import { useKanbanStore } from "@/stores/kanban-store";

import { AddTaskDialog } from "./_components/add-task-dialog";
import { Kanban } from "./_components/kanban";

export default function Page() {
  const board = useKanbanStore((state) => state.board);
  return (
    <div data-content-padding="false">
      <div className="absolute top-3 right-4 z-10 lg:right-6">
        <AddTaskDialog />
      </div>
      <Kanban initialBoard={board} />
    </div>
  );
}
