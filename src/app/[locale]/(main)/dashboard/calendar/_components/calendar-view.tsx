"use client";

import { useMemo, useState } from "react";

import {
  addDays,
  addMonths,
  endOfMonth,
  endOfWeek,
  format,
  isFuture,
  isPast,
  isSameDay,
  isSameMonth,
  isToday,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock, MapPin, Users, Zap } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useCalendarStore } from "@/stores/calendar-store";

import { AddEventDialog } from "./add-event-dialog";
import { EventList } from "./event-list";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function getEventPillColor(color: "blue" | "green" | "purple" | "red" | "amber") {
  switch (color) {
    case "blue":
      return "bg-indigo-500/5 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-l-2 border-indigo-500 border-t-0 border-r-0 border-b-0 rounded-l-none";
    case "green":
      return "bg-emerald-500/5 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-l-2 border-emerald-500 border-t-0 border-r-0 border-b-0 rounded-l-none";
    case "purple":
      return "bg-violet-500/5 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400 border-l-2 border-violet-500 border-t-0 border-r-0 border-b-0 rounded-l-none";
    case "red":
      return "bg-rose-500/5 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 border-l-2 border-rose-500 border-t-0 border-r-0 border-b-0 rounded-l-none";
    case "amber":
      return "bg-amber-500/5 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border-l-2 border-amber-500 border-t-0 border-r-0 border-b-0 rounded-l-none";
    default:
      return "bg-zinc-500/5 dark:bg-zinc-500/10 text-zinc-600 dark:text-zinc-400 border-l-2 border-zinc-500 border-t-0 border-r-0 border-b-0 rounded-l-none";
  }
}

export function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const events = useCalendarStore((state) => state.events);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);

  const calendarDays = useMemo(() => {
    const days: Date[] = [];
    let day = calendarStart;
    while (day <= calendarEnd) {
      days.push(day);
      day = addDays(day, 1);
    }
    return days;
  }, [calendarStart, calendarEnd]);

  const getEventsForDate = (date: Date) => {
    return events.filter((event) => isSameDay(new Date(event.date), date));
  };

  const selectedDayEvents = selectedDate ? getEventsForDate(selectedDate) : [];

  const todayEvents = getEventsForDate(new Date());
  const upcomingEvents = events
    .filter((event) => isFuture(new Date(event.date)) && !isToday(new Date(event.date)))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5);
  const pastEvents = events.filter((event) => isPast(new Date(event.date)) && !isToday(new Date(event.date)));

  const totalEventsThisMonth = events.filter((event) => isSameMonth(new Date(event.date), currentDate)).length;

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-1">
          <h1 className="font-bold text-3xl tracking-tight">Calendar</h1>
          <p className="text-muted-foreground text-sm">Manage your schedule, meetings, and events.</p>
        </div>
        <AddEventDialog />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {[
          { label: "Today", value: todayEvents.length, icon: CalendarIcon },
          { label: "This Month", value: totalEventsThisMonth, icon: Zap },
          { label: "Upcoming", value: upcomingEvents.length, icon: Users },
          { label: "Completed", value: pastEvents.length, icon: Clock },
        ].map((stat) => (
          <Card
            key={stat.label}
            className="relative overflow-hidden border-border/40 transition-shadow hover:shadow-md"
          >
            <div className="absolute top-0 right-0 h-16 w-16 bg-gradient-to-bl from-foreground/5 to-transparent" />
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl border border-border/40 bg-muted/60 text-foreground">
                  <stat.icon className="size-5" />
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">{stat.label}</p>
                  <p className="font-bold text-2xl">{stat.value}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        {/* Calendar Grid */}
        <div className="xl:col-span-8">
          <Card className="overflow-hidden border-border/40 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 border-border/40 border-b bg-muted/30 px-6 py-4">
              <div className="flex items-center gap-4">
                <CardTitle className="font-semibold text-xl">{format(currentDate, "MMMM yyyy")}</CardTitle>
                <Badge variant="secondary" className="border border-border/40 bg-muted text-xs">
                  {totalEventsThisMonth} events
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setCurrentDate(new Date())}
                  className="border border-border/40 text-xs hover:bg-muted"
                >
                  Today
                </Button>
                <div className="flex items-center gap-1 rounded-lg border border-border/40 bg-background p-0.5">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-7 hover:bg-muted"
                    onClick={() => setCurrentDate(addMonths(currentDate, -1))}
                  >
                    <ChevronLeft className="size-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-7 hover:bg-muted"
                    onClick={() => setCurrentDate(addMonths(currentDate, 1))}
                  >
                    <ChevronRight className="size-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="grid grid-cols-7">
                {WEEKDAYS.map((day, i) => (
                  <div
                    key={day}
                    className={cn(
                      "border-border/40 border-b py-3 text-center font-semibold text-xs uppercase tracking-wider",
                      i === 0 || i === 6 ? "text-muted-foreground" : "text-foreground",
                    )}
                  >
                    {day}
                  </div>
                ))}
                {calendarDays.map((day, index) => {
                  const dayEvents = getEventsForDate(day);
                  const isSelected = selectedDate && isSameDay(day, selectedDate);
                  const isCurrentMonth = isSameMonth(day, currentDate);
                  const today = isToday(day);
                  const hasEvents = dayEvents.length > 0;

                  return (
                    <button
                      key={day.toISOString()}
                      onClick={() => setSelectedDate(day)}
                      className={cn(
                        "relative flex min-h-[105px] flex-col border-border/30 border-r border-b p-2 text-left transition-all hover:bg-muted/40",
                        !isCurrentMonth && "bg-muted/5 opacity-30",
                        isSelected && "bg-primary/5 ring-1 ring-primary/30 ring-inset",
                        index % 7 === 6 && "border-r-0",
                      )}
                    >
                      <div className="flex items-start justify-between">
                        <span
                          className={cn(
                            "flex size-7 items-center justify-center rounded-full text-sm transition-all",
                            today && "bg-primary font-bold text-primary-foreground shadow-primary/30 shadow-sm",
                            isSelected && !today && "border border-primary/20 bg-primary/10 font-semibold text-primary",
                            !today && !isSelected && "font-medium text-zinc-700 dark:text-zinc-300",
                          )}
                        >
                          {format(day, "d")}
                        </span>
                        {hasEvents && !today && (
                          <div className="flex gap-0.5">
                            {dayEvents.slice(0, 3).map((event) => (
                              <div key={event.id} className="size-1.5 rounded-full bg-zinc-400 dark:bg-zinc-600" />
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="mt-1.5 flex w-full flex-col gap-1">
                        {dayEvents.slice(0, 2).map((event) => (
                          <div
                            key={event.id}
                            className={cn(
                              "flex items-center gap-1 truncate rounded-r-md rounded-l-sm border-border/10 border-y border-r py-0.5 pr-2 pl-1.5 font-medium text-[10px] shadow-2xs transition-colors",
                              getEventPillColor(event.color),
                            )}
                          >
                            <span className="truncate">{event.title}</span>
                          </div>
                        ))}
                        {dayEvents.length > 2 && (
                          <span className="px-1 font-semibold text-[9px] text-muted-foreground">
                            +{dayEvents.length - 2} more
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-6 xl:col-span-4">
          {/* Selected Day Events */}
          <Card className="flex flex-col">
            <CardHeader className="border-b bg-muted/30">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="font-semibold text-lg">
                    {selectedDate ? format(selectedDate, "EEEE") : "Select a date"}
                  </CardTitle>
                  <CardDescription>
                    {selectedDate ? format(selectedDate, "MMMM d, yyyy") : "Click a date to view events"}
                  </CardDescription>
                </div>
                {selectedDate && isToday(selectedDate) && (
                  <Badge className="bg-primary text-primary-foreground">Today</Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="flex-1 p-4">
              <EventList events={selectedDayEvents} />
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card>
            <CardHeader className="border-b bg-muted/30">
              <div className="flex items-center justify-between">
                <CardTitle className="font-semibold text-lg">Upcoming</CardTitle>
                <Badge variant="outline" className="text-xs">
                  {upcomingEvents.length} events
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              {upcomingEvents.length === 0 ? (
                <div className="flex h-24 items-center justify-center rounded-lg border border-dashed text-muted-foreground text-sm">
                  No upcoming events
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  {upcomingEvents.map((event) => (
                    <div
                      key={event.id}
                      className="flex items-start gap-3 rounded-lg border p-3 transition-colors hover:bg-muted/50"
                    >
                      <div className="mt-0.5 size-2 shrink-0 rounded-full bg-foreground/60" />
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-medium text-sm">{event.title}</p>
                        <div className="mt-1 flex items-center gap-2 text-muted-foreground text-xs">
                          <Clock className="size-3" />
                          {event.time}
                          <span>·</span>
                          {format(new Date(event.date), "MMM d")}
                        </div>
                        {event.location && (
                          <div className="mt-1 flex items-center gap-1 text-muted-foreground text-xs">
                            <MapPin className="size-3" />
                            {event.location}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
