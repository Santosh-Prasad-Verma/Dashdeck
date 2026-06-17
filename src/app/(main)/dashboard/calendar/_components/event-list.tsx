import { Clock, MapPin, Users, Trash2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useCalendarStore } from "@/stores/calendar-store";

import type { CalendarEvent } from "@/stores/calendar-store";

interface EventListProps {
  events: CalendarEvent[];
}

function getEventColor(color: CalendarEvent["color"]) {
  switch (color) {
    case "blue":
      return {
        bg: "bg-blue-500/10",
        text: "text-blue-600 dark:text-blue-400",
        border: "border-l-blue-500",
      };
    case "green":
      return {
        bg: "bg-emerald-500/10",
        text: "text-emerald-600 dark:text-emerald-400",
        border: "border-l-emerald-500",
      };
    case "purple":
      return {
        bg: "bg-purple-500/10",
        text: "text-purple-600 dark:text-purple-400",
        border: "border-l-purple-500",
      };
    case "red":
      return {
        bg: "bg-red-500/10",
        text: "text-red-600 dark:text-red-400",
        border: "border-l-red-500",
      };
    case "amber":
      return {
        bg: "bg-amber-500/10",
        text: "text-amber-600 dark:text-amber-400",
        border: "border-l-amber-500",
      };
    default:
      return {
        bg: "bg-muted",
        text: "text-muted-foreground",
        border: "border-l-muted-foreground",
      };
  }
}

function getTypeBadge(type: CalendarEvent["type"]) {
  switch (type) {
    case "meeting":
      return <Badge className="bg-blue-500/10 text-blue-600 dark:text-blue-400 border-0">Meeting</Badge>;
    case "task":
      return <Badge className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border-0">Task</Badge>;
    case "reminder":
      return <Badge className="bg-purple-500/10 text-purple-600 dark:text-purple-400 border-0">Reminder</Badge>;
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
              colors.border,
            )}
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">{event.title}</span>
                  {getTypeBadge(event.type)}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-6 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => handleDelete(event.id, event.title)}
                >
                  <Trash2 className="size-3 text-destructive" />
                </Button>
              </div>
              {event.description && (
                <p className="mt-1 text-muted-foreground text-xs line-clamp-2">
                  {event.description}
                </p>
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
