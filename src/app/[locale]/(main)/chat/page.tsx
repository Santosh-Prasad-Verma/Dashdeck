"use client";

import { useChatStore } from "@/stores/chat-store";

import { Chat } from "./_components/chat";

export default function Page() {
  const conversations = useChatStore((state) => state.conversations);
  return <Chat conversations={conversations} />;
}
