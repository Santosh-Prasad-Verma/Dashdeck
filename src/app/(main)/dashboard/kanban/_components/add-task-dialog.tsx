"use client";

import { useState } from "react";

import { Plus } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useKanbanStore } from "@/stores/kanban-store";
import type { ColumnId, Task, TaskPriority, TaskTeam } from "./types";
import { taskOwners } from "./data";

const priorities: TaskPriority[] = ["High", "Medium", "Low"];
const teams: TaskTeam[] = ["Backend", "Data", "Design", "Docs", "Finance Ops", "Platform", "Product", "QA", "Security"];
const columnOptions: { value: ColumnId; label: string }[] = [
  { value: "ideas", label: "Ideas" },
  { value: "planned", label: "Planned" },
  { value: "building", label: "Building" },
  { value: "qa", label: "QA" },
  { value: "shipped", label: "Shipped" },
];

export function AddTaskDialog() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<TaskPriority>("Medium");
  const [team, setTeam] = useState<TaskTeam>("Product");
  const [columnId, setColumnId] = useState<ColumnId>("ideas");
  const addTask = useKanbanStore((state) => state.addTask);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    const newTask: Task = {
      id: `task-${Date.now()}`,
      title,
      description,
      priority,
      dueDate: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      progress: 0,
      owner: taskOwners.arham,
      team,
      insights: [],
    };

    addTask(columnId, newTask);
    toast.success(`Task "${title}" created`);
    setOpen(false);
    setTitle("");
    setDescription("");
    setPriority("Medium");
    setTeam("Product");
    setColumnId("ideas");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <Plus className="size-4" />
          Add Task
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create New Task</DialogTitle>
            <DialogDescription>
              Add a new task to your Kanban board.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Task title"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Task description"
              />
            </div>
            <div className="grid gap-2">
              <Label>Column</Label>
              <Select value={columnId} onValueChange={(v) => setColumnId(v as ColumnId)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {columnOptions.map((col) => (
                      <SelectItem key={col.value} value={col.value}>
                        {col.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Priority</Label>
              <Select value={priority} onValueChange={(v) => setPriority(v as TaskPriority)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {priorities.map((p) => (
                      <SelectItem key={p} value={p}>
                        {p}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Team</Label>
              <Select value={team} onValueChange={(v) => setTeam(v as TaskTeam)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {teams.map((t) => (
                      <SelectItem key={t} value={t}>
                        {t}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={!title}>
              Create Task
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
