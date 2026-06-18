import { create } from "zustand";
import { persist } from "zustand/middleware";

import { initialBoard } from "@/app/[locale]/(main)/dashboard/kanban/_components/data";
import type { BoardState, ColumnId, Task } from "@/app/[locale]/(main)/dashboard/kanban/_components/types";

interface KanbanState {
  board: BoardState;
  addTask: (columnId: ColumnId, task: Task) => void;
  updateTask: (columnId: ColumnId, taskId: string, updates: Partial<Task>) => void;
  deleteTask: (columnId: ColumnId, taskId: string) => void;
  moveTask: (fromColumnId: ColumnId, toColumnId: ColumnId, taskId: string) => void;
  resetBoard: () => void;
}

export const useKanbanStore = create<KanbanState>()(
  persist(
    (set) => ({
      board: initialBoard,
      addTask: (columnId, task) =>
        set((state) => ({
          board: {
            ...state.board,
            [columnId]: [...state.board[columnId], task],
          },
        })),
      updateTask: (columnId, taskId, updates) =>
        set((state) => ({
          board: {
            ...state.board,
            [columnId]: state.board[columnId].map((task) => (task.id === taskId ? { ...task, ...updates } : task)),
          },
        })),
      deleteTask: (columnId, taskId) =>
        set((state) => ({
          board: {
            ...state.board,
            [columnId]: state.board[columnId].filter((task) => task.id !== taskId),
          },
        })),
      moveTask: (fromColumnId, toColumnId, taskId) =>
        set((state) => {
          const task = state.board[fromColumnId].find((t) => t.id === taskId);
          if (!task) return state;

          return {
            board: {
              ...state.board,
              [fromColumnId]: state.board[fromColumnId].filter((t) => t.id !== taskId),
              [toColumnId]: [...state.board[toColumnId], task],
            },
          };
        }),
      resetBoard: () => set({ board: initialBoard }),
    }),
    {
      name: "dashdeck-kanban-storage",
    },
  ),
);
