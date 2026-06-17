"use client";

import { useState } from "react";

import { format } from "date-fns";
import { Plus, Calendar, Clock, MapPin, Tag, Palette } from "lucide-react";
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
import { useCalendarStore } from "@/stores/calendar-store";

const eventTypes = [
  { value: "meeting", label: "Meeting", icon: "👥" },
  { value: "task", label: "Task", icon: "✅" },
  { value: "reminder", label: "Reminder", icon: "⏰" },
] as const;

const eventColors = [
  { value: "blue", label: "Blue", color: "bg-indigo-500 border border-indigo-400" },
  { value: "green", label: "Green", color: "bg-emerald-500 border border-emerald-400" },
  { value: "purple", label: "Purple", color: "bg-violet-500 border border-violet-400" },
  { value: "red", label: "Red", color: "bg-rose-500 border border-rose-400" },
  { value: "amber", label: "Amber", color: "bg-amber-500 border border-amber-400" },
] as const;

export function AddEventDialog() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [time, setTime] = useState("09:00");
  const [type, setType] = useState<"meeting" | "task" | "reminder">("meeting");
  const [color, setColor] = useState<"blue" | "green" | "purple" | "red" | "amber">("blue");
  const [location, setLocation] = useState("");
  const addEvent = useCalendarStore((state) => state.addEvent);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    addEvent({
      id: `event-${Date.now()}`,
      title,
      description,
      date,
      time,
      type,
      color,
      location,
      attendees: [],
    });

    toast.success(`Event "${title}" created`);
    setOpen(false);
    setTitle("");
    setDescription("");
    setDate(format(new Date(), "yyyy-MM-dd"));
    setTime("09:00");
    setType("meeting");
    setColor("blue");
    setLocation("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="size-4" />
          New Event
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader className="space-y-3">
            <DialogTitle className="text-xl">Create New Event</DialogTitle>
            <DialogDescription>
              Add a new event to your calendar.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-5 py-6">
            <div className="grid gap-2">
              <Label htmlFor="title" className="text-sm font-medium">Event Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="What's the event about?"
                className="h-10"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description" className="text-sm font-medium">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add some details..."
                className="h-20 resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="date" className="flex items-center gap-1.5 text-sm font-medium">
                  <Calendar className="size-3.5" />
                  Date
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="h-10"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="time" className="flex items-center gap-1.5 text-sm font-medium">
                  <Clock className="size-3.5" />
                  Time
                </Label>
                <Input
                  id="time"
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="h-10"
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="location" className="flex items-center gap-1.5 text-sm font-medium">
                <MapPin className="size-3.5" />
                Location
              </Label>
              <Input
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Meeting room or link"
                className="h-10"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label className="flex items-center gap-1.5 text-sm font-medium">
                  <Tag className="size-3.5" />
                  Type
                </Label>
                <Select value={type} onValueChange={(v) => setType(v as typeof type)}>
                  <SelectTrigger className="h-10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {eventTypes.map((t) => (
                        <SelectItem key={t.value} value={t.value}>
                          <span className="flex items-center gap-2">
                            <span>{t.icon}</span>
                            {t.label}
                          </span>
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label className="flex items-center gap-1.5 text-sm font-medium">
                  <Palette className="size-3.5" />
                  Color
                </Label>
                <div className="flex items-center gap-2">
                  {eventColors.map((c) => (
                    <button
                      key={c.value}
                      type="button"
                      onClick={() => setColor(c.value)}
                      className={`size-8 rounded-full ${c.color} transition-transform hover:scale-110 ${
                        color === c.value ? "ring-2 ring-offset-2 ring-primary" : ""
                      }`}
                      title={c.label}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={!title} className="gap-2">
              <Plus className="size-4" />
              Create Event
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
