import { beforeEach, describe, expect, it } from "vitest";

import type { Task } from "@/app/[locale]/(main)/dashboard/kanban/_components/types";
import { useKanbanStore } from "@/stores/kanban-store";

const store = useKanbanStore;

const makeMockTask = (overrides: Partial<Task> = {}): Task => ({
  id: `test-task-${Date.now()}`,
  title: "Test Task",
  description: "A task created for testing purposes",
  priority: "Medium",
  dueDate: "Jul 10",
  progress: 0,
  owner: { name: "Test User", tone: "bg-gray-100 text-gray-700" },
  team: "Backend",
  insights: [{ label: "Comments", count: 1 }],
  ...overrides,
});

describe("Kanban Store", () => {
  beforeEach(() => {
    store.getState().resetBoard();
  });

  describe("initial state", () => {
    it("has all five columns defined", () => {
      const { board } = store.getState();
      expect(board).toHaveProperty("ideas");
      expect(board).toHaveProperty("planned");
      expect(board).toHaveProperty("building");
      expect(board).toHaveProperty("qa");
      expect(board).toHaveProperty("shipped");
    });

    it("each column contains an array of tasks", () => {
      const { board } = store.getState();
      for (const columnId of ["ideas", "planned", "building", "qa", "shipped"] as const) {
        expect(Array.isArray(board[columnId])).toBe(true);
        expect(board[columnId].length).toBeGreaterThan(0);
      }
    });

    it("every task has required fields", () => {
      const { board } = store.getState();
      for (const columnId of ["ideas", "planned", "building", "qa", "shipped"] as const) {
        for (const task of board[columnId]) {
          expect(task).toHaveProperty("id");
          expect(task).toHaveProperty("title");
          expect(task).toHaveProperty("description");
          expect(task).toHaveProperty("priority");
          expect(task).toHaveProperty("dueDate");
          expect(task).toHaveProperty("progress");
          expect(task).toHaveProperty("owner");
          expect(task).toHaveProperty("team");
          expect(task).toHaveProperty("insights");
        }
      }
    });
  });

  describe("addTask", () => {
    it("appends a task to the specified column", () => {
      const task = makeMockTask({ id: "new-task-1" });
      const ideasBefore = store.getState().board.ideas.length;

      store.getState().addTask("ideas", task);

      const ideasAfter = store.getState().board.ideas;
      expect(ideasAfter.length).toBe(ideasBefore + 1);
      expect(ideasAfter[ideasAfter.length - 1]).toEqual(task);
    });

    it("does not affect other columns", () => {
      const task = makeMockTask({ id: "isolated-task" });
      const plannedBefore = store.getState().board.planned.length;

      store.getState().addTask("ideas", task);

      expect(store.getState().board.planned.length).toBe(plannedBefore);
    });

    it("can add multiple tasks to the same column", () => {
      const task1 = makeMockTask({ id: "multi-1" });
      const task2 = makeMockTask({ id: "multi-2" });
      const buildingBefore = store.getState().board.building.length;

      store.getState().addTask("building", task1);
      store.getState().addTask("building", task2);

      expect(store.getState().board.building.length).toBe(buildingBefore + 2);
    });
  });

  describe("updateTask", () => {
    it("updates the title of an existing task", () => {
      const firstTask = store.getState().board.ideas[0];
      store.getState().updateTask("ideas", firstTask.id, { title: "Updated Title" });

      const updated = store.getState().board.ideas.find((t) => t.id === firstTask.id);
      expect(updated?.title).toBe("Updated Title");
    });

    it("preserves other fields when updating", () => {
      const firstTask = store.getState().board.ideas[0];
      const originalDescription = firstTask.description;

      store.getState().updateTask("ideas", firstTask.id, { title: "Changed" });

      const updated = store.getState().board.ideas.find((t) => t.id === firstTask.id);
      expect(updated?.description).toBe(originalDescription);
    });

    it("can update priority and progress simultaneously", () => {
      const firstTask = store.getState().board.building[0];

      store.getState().updateTask("building", firstTask.id, {
        priority: "Low",
        progress: 90,
      });

      const updated = store.getState().board.building.find((t) => t.id === firstTask.id);
      expect(updated?.priority).toBe("Low");
      expect(updated?.progress).toBe(90);
    });

    it("does not modify other tasks in the same column", () => {
      const [first, second] = store.getState().board.ideas;

      store.getState().updateTask("ideas", first.id, { title: "Only first changed" });

      const secondAfter = store.getState().board.ideas.find((t) => t.id === second.id);
      expect(secondAfter?.title).toBe(second.title);
    });
  });

  describe("deleteTask", () => {
    it("removes the specified task from a column", () => {
      const firstTask = store.getState().board.ideas[0];
      const ideasBefore = store.getState().board.ideas.length;

      store.getState().deleteTask("ideas", firstTask.id);

      const ideasAfter = store.getState().board.ideas;
      expect(ideasAfter.length).toBe(ideasBefore - 1);
      expect(ideasAfter.find((t) => t.id === firstTask.id)).toBeUndefined();
    });

    it("does not remove tasks from other columns", () => {
      const firstIdea = store.getState().board.ideas[0];
      const plannedBefore = store.getState().board.planned.length;

      store.getState().deleteTask("ideas", firstIdea.id);

      expect(store.getState().board.planned.length).toBe(plannedBefore);
    });
  });

  describe("moveTask", () => {
    it("moves a task from one column to another", () => {
      const task = store.getState().board.ideas[0];
      const ideasBefore = store.getState().board.ideas.length;
      const plannedBefore = store.getState().board.planned.length;

      store.getState().moveTask("ideas", "planned", task.id);

      expect(store.getState().board.ideas.length).toBe(ideasBefore - 1);
      expect(store.getState().board.planned.length).toBe(plannedBefore + 1);
      expect(store.getState().board.planned.find((t) => t.id === task.id)).toBeDefined();
      expect(store.getState().board.ideas.find((t) => t.id === task.id)).toBeUndefined();
    });

    it("preserves all task data during move", () => {
      const originalTask = { ...store.getState().board.ideas[0] };

      store.getState().moveTask("ideas", "shipped", originalTask.id);

      const movedTask = store.getState().board.shipped.find((t) => t.id === originalTask.id);
      expect(movedTask).toEqual(originalTask);
    });

    it("does nothing when moving a non-existent task", () => {
      const boardBefore = JSON.stringify(store.getState().board);

      store.getState().moveTask("ideas", "planned", "non-existent-id");

      expect(JSON.stringify(store.getState().board)).toBe(boardBefore);
    });

    it("appends the moved task to the end of the target column", () => {
      const task = store.getState().board.ideas[0];

      store.getState().moveTask("ideas", "qa", task.id);

      const qaColumn = store.getState().board.qa;
      expect(qaColumn[qaColumn.length - 1].id).toBe(task.id);
    });
  });

  describe("resetBoard", () => {
    it("restores the board to initial state after modifications", () => {
      const initialBoardSnapshot = JSON.stringify(store.getState().board);

      // Make several modifications
      store.getState().addTask("ideas", makeMockTask({ id: "temp-task" }));
      store.getState().deleteTask("shipped", store.getState().board.shipped[0].id);
      store.getState().moveTask("building", "qa", store.getState().board.building[0].id);

      // Board should be different now
      expect(JSON.stringify(store.getState().board)).not.toBe(initialBoardSnapshot);

      store.getState().resetBoard();

      expect(JSON.stringify(store.getState().board)).toBe(initialBoardSnapshot);
    });
  });
});
