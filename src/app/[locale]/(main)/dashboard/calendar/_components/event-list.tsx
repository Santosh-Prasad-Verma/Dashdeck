import { Clock, MapPin, Trash2, Users } from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { CalendarEvent } from "@/stores/calendar-store";
import { useCalendarStore } from "@/stores/calendar-store";

interface EventListProps {
  events: CalendarEvent[];
}

function getEventColor(color: CalendarEvent["color"]) {
  switch (color) {
    case "blue":
      return {
        bg: "bg-indigo-500/5 hover:bg-indigo-500/10",
        text: "text-indigo-400",
        border: "border-l-indigo-500 border-border/50",
      };
    case "green":
      return {
        bg: "bg-emerald-500/5 hover:bg-emerald-500/10",
        text: "text-emerald-400",
        border: "border-l-emerald-500 border-border/50",
      };
    case "purple":
      return {
        bg: "bg-violet-500/5 hover:bg-violet-500/10",
        text: "text-violet-400",
        border: "border-l-violet-500 border-border/50",
      };
    case "red":
      return {
        bg: "bg-rose-500/5 hover:bg-rose-500/10",
        text: "text-rose-400",
        border: "border-l-rose-500 border-border/50",
      };
    case "amber":
      return {
        bg: "bg-amber-500/5 hover:bg-amber-500/10",
        text: "text-amber-400",
        border: "border-l-amber-500 border-border/50",
      };
    default:
      return {
        bg: "bg-zinc-500/5 hover:bg-zinc-500/10",
        text: "text-zinc-400",
        border: "border-l-zinc-500 border-border/50",
      };
  }
}

function getTypeBadge(type: CalendarEvent["type"]) {
  switch (type) {
    case "meeting":
      return <Badge className="border border-foreground/20 bg-foreground/10 text-foreground">Meeting</Badge>;
    case "task":
      return (
        <Badge className="border border-muted-foreground/20 bg-muted-foreground/10 text-muted-foreground">Task</Badge>
      );
    case "reminder":
      return (
        <Badge className="border border-muted-foreground/10 bg-foreground/5 text-muted-foreground/80">Reminder</Badge>
      );
    default:
      return <Badge variant="secondary">Event</Badge>;
  }
}

export function EventList({ events }: EventListProps) {
  const deleteEvent = useCalendarStore((state) => state.deleteEvent);

  const handleDelete = (id: string, title: string) => {
    deleteEvent(id);
    toast.success(`Event "${title}" deleted`);
  };

  if (events.length === 0) {
    return (
      <div className="flex h-40 flex-col items-center justify-center gap-2 rounded-xl border border-dashed">
        <div className="flex size-12 items-center justify-center rounded-full bg-muted/50">
          <Clock className="size-6 text-muted-foreground" />
        </div>
        <p className="text-muted-foreground text-sm">No events for this day</p>
        <p className="text-muted-foreground text-xs">Click + to add an event</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {events.map((event) => {
        const colors = getEventColor(event.color);
        return (
          <div
            key={event.id}
            className={cn(
              "group relative flex items-start gap-3 rounded-lg border border-l-4 p-3 transition-all hover:shadow-sm",
              colors.bg,
              colors.border,
            )}
          >
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">{event.title}</span>
                  {getTypeBadge(event.type)}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-6 opacity-0 transition-opacity group-hover:opacity-100"
                  onClick={() => handleDelete(event.id, event.title)}
                >
                  <Trash2 className="size-3 text-destructive" />
                </Button>
              </div>
              {event.description && (
                <p className="mt-1 line-clamp-2 text-muted-foreground text-xs">{event.description}</p>
              )}
              <div className="mt-2 flex flex-wrap items-center gap-3 text-muted-foreground text-xs">
                <div className="flex items-center gap-1">
                  <Clock className="size-3" />
                  {event.time}
                </div>
                {event.location && (
                  <div className="flex items-center gap-1">
                    <MapPin className="size-3" />
                    {event.location}
                  </div>
                )}
                {event.attendees && event.attendees.length > 0 && (
                  <div className="flex items-center gap-1">
                    <Users className="size-3" />
                    {event.attendees.length} attendee{event.attendees.length > 1 ? "s" : ""}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
