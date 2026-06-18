import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  type: "meeting" | "task" | "reminder";
  color: "blue" | "green" | "purple" | "red" | "amber";
  location?: string;
  attendees?: string[];
}

const initialEvents: CalendarEvent[] = [
  {
    id: "1",
    title: "Team Standup",
    description: "Daily sync with the engineering team",
    date: new Date().toISOString().split("T")[0],
    time: "09:00",
    type: "meeting",
    color: "blue",
    location: "Conference Room A",
    attendees: ["Sarah", "Mike", "John"],
  },
  {
    id: "2",
    title: "Product Review",
    description: "Review Q2 product roadmap",
    date: new Date().toISOString().split("T")[0],
    time: "14:00",
    type: "meeting",
    color: "purple",
    location: "Zoom",
    attendees: ["Alex", "Lisa"],
  },
  {
    id: "3",
    title: "Submit Report",
    description: "Monthly performance report due",
    date: new Date().toISOString().split("T")[0],
    time: "17:00",
    type: "task",
    color: "red",
  },
  {
    id: "4",
    title: "Client Call",
    description: "Discuss project milestones with Acme Corp",
    date: new Date(Date.now() + 86400000).toISOString().split("T")[0],
    time: "10:00",
    type: "meeting",
    color: "green",
    location: "Phone",
    attendees: ["Tom", "Acme Team"],
  },
  {
    id: "5",
    title: "Lunch with Design Team",
    description: "Team bonding lunch",
    date: new Date(Date.now() + 86400000).toISOString().split("T")[0],
    time: "12:30",
    type: "meeting",
    color: "amber",
    location: "Cafe Milano",
    attendees: ["Emma", "David", "Sophie"],
  },
  {
    id: "6",
    title: "Sprint Planning",
    description: "Plan tasks for the next sprint",
    date: new Date(Date.now() + 2 * 86400000).toISOString().split("T")[0],
    time: "11:00",
    type: "meeting",
    color: "blue",
    location: "Conference Room B",
    attendees: ["Full Team"],
  },
  {
    id: "7",
    title: "Deploy to Production",
    description: "Release v2.0 features",
    date: new Date(Date.now() + 3 * 86400000).toISOString().split("T")[0],
    time: "16:00",
    type: "task",
    color: "green",
  },
  {
    id: "8",
    title: "Birthday Reminder",
    description: "Alex's birthday",
    date: new Date(Date.now() + 5 * 86400000).toISOString().split("T")[0],
    time: "09:00",
    type: "reminder",
    color: "amber",
  },
];

interface CalendarState {
  events: CalendarEvent[];
  addEvent: (event: CalendarEvent) => void;
  updateEvent: (id: string, updates: Partial<CalendarEvent>) => void;
  deleteEvent: (id: string) => void;
  resetEvents: () => void;
}

export const useCalendarStore = create<CalendarState>()(
  persist(
    (set) => ({
      events: initialEvents,
      addEvent: (event) =>
        set((state) => ({
          events: [...state.events, event],
        })),
      updateEvent: (id, updates) =>
        set((state) => ({
          events: state.events.map((e) => (e.id === id ? { ...e, ...updates } : e)),
        })),
      deleteEvent: (id) =>
        set((state) => ({
          events: state.events.filter((e) => e.id !== id),
        })),
      resetEvents: () => set({ events: initialEvents }),
    }),
    {
      name: "dashdeck-calendar-storage",
    },
  ),
);
