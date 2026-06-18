import { beforeEach, describe, expect, it } from "vitest";

import { type CalendarEvent, useCalendarStore } from "@/stores/calendar-store";

const store = useCalendarStore;

const makeMockEvent = (overrides: Partial<CalendarEvent> = {}): CalendarEvent => ({
  id: `test-event-${Date.now()}`,
  title: "Test Event",
  description: "A test calendar event",
  date: "2025-07-15",
  time: "10:00",
  type: "meeting",
  color: "blue",
  ...overrides,
});

describe("Calendar Store", () => {
  beforeEach(() => {
    store.getState().resetEvents();
  });

  describe("initial state", () => {
    it("has a non-empty array of events", () => {
      const { events } = store.getState();
      expect(Array.isArray(events)).toBe(true);
      expect(events.length).toBeGreaterThan(0);
    });

    it("every event has required fields", () => {
      const { events } = store.getState();
      for (const event of events) {
        expect(event).toHaveProperty("id");
        expect(event).toHaveProperty("title");
        expect(event).toHaveProperty("description");
        expect(event).toHaveProperty("date");
        expect(event).toHaveProperty("time");
        expect(event).toHaveProperty("type");
        expect(event).toHaveProperty("color");
      }
    });

    it("all event types are valid", () => {
      const validTypes = ["meeting", "task", "reminder"];
      const { events } = store.getState();
      for (const event of events) {
        expect(validTypes).toContain(event.type);
      }
    });

    it("all event colors are valid", () => {
      const validColors = ["blue", "green", "purple", "red", "amber"];
      const { events } = store.getState();
      for (const event of events) {
        expect(validColors).toContain(event.color);
      }
    });

    it("all event ids are unique", () => {
      const { events } = store.getState();
      const ids = events.map((e) => e.id);
      expect(new Set(ids).size).toBe(ids.length);
    });
  });

  describe("addEvent", () => {
    it("appends a new event to the list", () => {
      const event = makeMockEvent({ id: "new-event-1" });
      const countBefore = store.getState().events.length;

      store.getState().addEvent(event);

      const eventsAfter = store.getState().events;
      expect(eventsAfter.length).toBe(countBefore + 1);
      expect(eventsAfter[eventsAfter.length - 1]).toEqual(event);
    });

    it("preserves existing events when adding", () => {
      const firstEvent = store.getState().events[0];

      store.getState().addEvent(makeMockEvent({ id: "added-event" }));

      expect(store.getState().events[0]).toEqual(firstEvent);
    });

    it("can add events with optional fields", () => {
      const event = makeMockEvent({
        id: "full-event",
        location: "Room 42",
        attendees: ["Alice", "Bob"],
      });

      store.getState().addEvent(event);

      const added = store.getState().events.find((e) => e.id === "full-event");
      expect(added?.location).toBe("Room 42");
      expect(added?.attendees).toEqual(["Alice", "Bob"]);
    });
  });

  describe("updateEvent", () => {
    it("updates the title of an existing event", () => {
      const firstEvent = store.getState().events[0];

      store.getState().updateEvent(firstEvent.id, { title: "Updated Title" });

      const updated = store.getState().events.find((e) => e.id === firstEvent.id);
      expect(updated?.title).toBe("Updated Title");
    });

    it("preserves fields not included in the update", () => {
      const firstEvent = store.getState().events[0];
      const originalDescription = firstEvent.description;

      store.getState().updateEvent(firstEvent.id, { title: "Changed" });

      const updated = store.getState().events.find((e) => e.id === firstEvent.id);
      expect(updated?.description).toBe(originalDescription);
    });

    it("can update type and color simultaneously", () => {
      const firstEvent = store.getState().events[0];

      store.getState().updateEvent(firstEvent.id, { type: "reminder", color: "amber" });

      const updated = store.getState().events.find((e) => e.id === firstEvent.id);
      expect(updated?.type).toBe("reminder");
      expect(updated?.color).toBe("amber");
    });

    it("does not affect other events", () => {
      const [first, second] = store.getState().events;

      store.getState().updateEvent(first.id, { title: "Only first changed" });

      const secondAfter = store.getState().events.find((e) => e.id === second.id);
      expect(secondAfter?.title).toBe(second.title);
    });
  });

  describe("deleteEvent", () => {
    it("removes the event with the given id", () => {
      const firstEvent = store.getState().events[0];
      const countBefore = store.getState().events.length;

      store.getState().deleteEvent(firstEvent.id);

      expect(store.getState().events.length).toBe(countBefore - 1);
      expect(store.getState().events.find((e) => e.id === firstEvent.id)).toBeUndefined();
    });

    it("preserves other events", () => {
      const [first, second] = store.getState().events;

      store.getState().deleteEvent(first.id);

      expect(store.getState().events.find((e) => e.id === second.id)).toBeDefined();
    });

    it("is a no-op for a non-existent id", () => {
      const countBefore = store.getState().events.length;

      store.getState().deleteEvent("non-existent-id");

      expect(store.getState().events.length).toBe(countBefore);
    });
  });

  describe("resetEvents", () => {
    it("restores events after modifications", () => {
      const initialSnapshot = JSON.stringify(store.getState().events);

      store.getState().addEvent(makeMockEvent({ id: "temp" }));
      store.getState().deleteEvent(store.getState().events[0].id);

      expect(JSON.stringify(store.getState().events)).not.toBe(initialSnapshot);

      store.getState().resetEvents();

      expect(JSON.stringify(store.getState().events)).toBe(initialSnapshot);
    });
  });
});
