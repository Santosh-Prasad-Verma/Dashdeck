import { beforeEach, describe, expect, it } from "vitest";

import type { Message } from "@/app/[locale]/(main)/chat/_components/data";
import { useChatStore } from "@/stores/chat-store";

const store = useChatStore;

describe("Chat Store", () => {
  beforeEach(() => {
    store.getState().resetConversations();
    // Reset selectedId to the first conversation's id
    const firstId = store.getState().conversations[0]?.id ?? null;
    if (firstId !== null) {
      store.getState().setSelectedId(firstId);
    }
  });

  describe("initial state", () => {
    it("has a non-empty array of conversations", () => {
      const { conversations } = store.getState();
      expect(Array.isArray(conversations)).toBe(true);
      expect(conversations.length).toBeGreaterThan(0);
    });

    it("selectedId defaults to the first conversation id", () => {
      const { selectedId, conversations } = store.getState();
      expect(selectedId).toBe(conversations[0]?.id);
    });

    it("every conversation has required fields", () => {
      const { conversations } = store.getState();
      for (const conv of conversations) {
        expect(conv).toHaveProperty("id");
        expect(conv).toHaveProperty("name");
        expect(conv).toHaveProperty("subject");
        expect(conv).toHaveProperty("preview");
        expect(conv).toHaveProperty("messages");
        expect(Array.isArray(conv.messages)).toBe(true);
      }
    });

    it("every message has required fields", () => {
      const { conversations } = store.getState();
      for (const conv of conversations) {
        for (const msg of conv.messages) {
          expect(msg).toHaveProperty("id");
          expect(msg).toHaveProperty("side");
          expect(["in", "out"]).toContain(msg.side);
          expect(msg).toHaveProperty("text");
          expect(msg).toHaveProperty("time");
        }
      }
    });
  });

  describe("setSelectedId", () => {
    it("updates the selected conversation id", () => {
      const secondConv = store.getState().conversations[1];
      store.getState().setSelectedId(secondConv.id);
      expect(store.getState().selectedId).toBe(secondConv.id);
    });

    it("can set to any valid conversation id", () => {
      const conversations = store.getState().conversations;
      const lastConv = conversations[conversations.length - 1];

      store.getState().setSelectedId(lastConv.id);

      expect(store.getState().selectedId).toBe(lastConv.id);
    });
  });

  describe("addMessage", () => {
    it("appends a message to the correct conversation", () => {
      const targetConv = store.getState().conversations[0];
      const messageCountBefore = targetConv.messages.length;

      const newMessage: Message = {
        id: 99999,
        side: "out",
        text: "This is a test message",
        time: "Just now",
      };

      store.getState().addMessage(targetConv.id, newMessage);

      const updatedConv = store.getState().conversations.find((c) => c.id === targetConv.id);
      expect(updatedConv?.messages.length).toBe(messageCountBefore + 1);
      expect(updatedConv?.messages[updatedConv.messages.length - 1]).toEqual(newMessage);
    });

    it("does not add messages to other conversations", () => {
      const [first, second] = store.getState().conversations;
      const secondMessageCount = second.messages.length;

      const newMessage: Message = {
        id: 88888,
        side: "in",
        text: "Message for first conv only",
        time: "1 min ago",
      };

      store.getState().addMessage(first.id, newMessage);

      const secondAfter = store.getState().conversations.find((c) => c.id === second.id);
      expect(secondAfter?.messages.length).toBe(secondMessageCount);
    });

    it("can add multiple messages in sequence", () => {
      const targetConv = store.getState().conversations[0];
      const initialCount = targetConv.messages.length;

      const msg1: Message = { id: 77771, side: "out", text: "First", time: "1m" };
      const msg2: Message = { id: 77772, side: "in", text: "Second", time: "2m" };

      store.getState().addMessage(targetConv.id, msg1);
      store.getState().addMessage(targetConv.id, msg2);

      const updated = store.getState().conversations.find((c) => c.id === targetConv.id);
      expect(updated?.messages.length).toBe(initialCount + 2);
    });

    it("does nothing for a non-existent conversation id", () => {
      const conversationsBefore = JSON.stringify(store.getState().conversations);

      const newMessage: Message = {
        id: 66666,
        side: "out",
        text: "Ghost message",
        time: "Now",
      };

      store.getState().addMessage(-999, newMessage);

      expect(JSON.stringify(store.getState().conversations)).toBe(conversationsBefore);
    });
  });

  describe("resetConversations", () => {
    it("restores conversations after modifications", () => {
      const initialSnapshot = JSON.stringify(store.getState().conversations);

      // Add a message
      const targetConv = store.getState().conversations[0];
      store.getState().addMessage(targetConv.id, {
        id: 55555,
        side: "out",
        text: "Temp message",
        time: "Now",
      });

      expect(JSON.stringify(store.getState().conversations)).not.toBe(initialSnapshot);

      store.getState().resetConversations();

      expect(JSON.stringify(store.getState().conversations)).toBe(initialSnapshot);
    });
  });
});
