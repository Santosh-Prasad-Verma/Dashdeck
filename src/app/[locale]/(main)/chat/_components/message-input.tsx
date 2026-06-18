"use client";

import { useState } from "react";

import { Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useChatStore } from "@/stores/chat-store";

export function MessageInput({ conversationId }: { conversationId: number }) {
  const [message, setMessage] = useState("");
  const addMessage = useChatStore((state) => state.addMessage);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    addMessage(conversationId, {
      id: Date.now(),
      side: "out",
      text: message.trim(),
      time: "Just now",
    });

    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t p-4">
      <Input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
        className="flex-1"
      />
      <Button type="submit" size="icon" disabled={!message.trim()}>
        <Send className="size-4" />
      </Button>
    </form>
  );
}
