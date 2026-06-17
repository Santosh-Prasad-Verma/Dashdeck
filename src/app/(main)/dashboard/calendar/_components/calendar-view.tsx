"use client";

import { useState, useMemo } from "react";

import {
  addDays,
  addMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  isSameDay,
  isSameMonth,
  format,
  isToday,
  isFuture,
  isPast,
  differenceInDays,
} from "date-fns";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock, MapPin, Users, Zap } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import { AddEventDialog } from "./add-event-dialog";
import { EventList } from "./event-list";
import { useCalendarStore } from "@/stores/calendar-store";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

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
  }, [currentDate]);

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

  const totalEventsThisMonth = events.filter((event) =>
    isSameMonth(new Date(event.date), currentDate)
  ).length;

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Calendar</h1>
          <p className="text-muted-foreground text-sm">
            Manage your schedule, meetings, and events.
          </p>
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
        ].map((stat, i) => (
          <Card key={i} className="relative overflow-hidden">
            <div className="absolute top-0 right-0 h-16 w-16 bg-gradient-to-bl from-foreground/5 to-transparent" />
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-muted text-foreground border border-border">
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
          <Card className="overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between border-b bg-muted/30 space-y-0 px-6 py-4">
              <div className="flex items-center gap-4">
                <CardTitle className="text-xl font-semibold">
                  {format(currentDate, "MMMM yyyy")}
                </CardTitle>
                <Badge variant="secondary" className="text-xs">
                  {totalEventsThisMonth} events
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setCurrentDate(new Date())}
                  className="text-xs"
                >
                  Today
                </Button>
                <div className="flex items-center gap-1 rounded-lg border bg-background p-0.5">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-7"
                    onClick={() => setCurrentDate(addMonths(currentDate, -1))}
                  >
                    <ChevronLeft className="size-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-7"
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
                      "border-b py-3 text-center text-xs font-medium",
                      i === 0 || i === 6 ? "text-muted-foreground" : "text-foreground"
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
                      key={index}
                      onClick={() => setSelectedDate(day)}
                      className={cn(
                        "relative flex min-h-[100px] flex-col border-b border-r p-2 text-left transition-all hover:bg-muted/30",
                        !isCurrentMonth && "bg-muted/10 opacity-40",
                        isSelected && "bg-primary/5 ring-2 ring-inset ring-primary",
                        index % 7 === 6 && "border-r-0",
                      )}
                    >
                      <div className="flex items-start justify-between">
                        <span
                          className={cn(
                            "flex size-7 items-center justify-center rounded-full text-sm transition-colors",
                            today && "bg-primary font-bold text-primary-foreground",
                            isSelected && !today && "bg-primary/10 font-semibold text-primary",
                            !today && !isSelected && "font-medium",
                          )}
                        >
                          {format(day, "d")}
                        </span>
                        {hasEvents && !today && (
                          <div className="flex gap-0.5">
                            {dayEvents.slice(0, 3).map((event) => (
                              <div
                                key={event.id}
                                className="size-1.5 rounded-full bg-foreground/50"
                              />
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="mt-1 flex flex-col gap-0.5">
                        {dayEvents.slice(0, 2).map((event) => (
                          <div
                            key={event.id}
                            className="flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[10px] font-medium bg-foreground/10 text-foreground border border-foreground/15"
                          >
                            <span className="truncate">{event.title}</span>
                          </div>
                        ))}
                        {dayEvents.length > 2 && (
                          <span className="px-1 text-[10px] text-muted-foreground">
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
                  <CardTitle className="text-lg font-semibold">
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
                <CardTitle className="text-lg font-semibold">Upcoming</CardTitle>
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
                      <div className="flex-1 min-w-0">
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
