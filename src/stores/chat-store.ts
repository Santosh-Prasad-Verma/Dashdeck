import { create } from "zustand";
import { persist } from "zustand/middleware";

import {
  type Conversation,
  conversations as initialConversations,
  type Message,
} from "@/app/[locale]/(main)/chat/_components/data";

interface ChatState {
  conversations: Conversation[];
  selectedId: number | null;
  setSelectedId: (id: number) => void;
  addMessage: (conversationId: number, message: Message) => void;
  resetConversations: () => void;
}

export const useChatStore = create<ChatState>()(
  persist(
    (set) => ({
      conversations: initialConversations,
      selectedId: initialConversations[0].id,
      setSelectedId: (id) => set({ selectedId: id }),
      addMessage: (conversationId, message) =>
        set((state) => ({
          conversations: state.conversations.map((conv) =>
            conv.id === conversationId ? { ...conv, messages: [...conv.messages, message] } : conv,
          ),
        })),
      resetConversations: () => set({ conversations: initialConversations }),
    }),
    {
      name: "dashdeck-chat-storage",
    },
  ),
);
