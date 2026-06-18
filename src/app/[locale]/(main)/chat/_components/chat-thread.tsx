"use client";

import { useState } from "react";

import {
  AlarmClock,
  ArrowLeft,
  Copy,
  Flag,
  Link,
  MoreHorizontal,
  Paperclip,
  PhoneCall,
  Send,
  Smile,
  Sparkles,
  Tag,
  Type,
  UserRound,
} from "lucide-react";

import { Avatar, AvatarBadge, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn, getInitials } from "@/lib/utils";
import { useChatStore } from "@/stores/chat-store";

import { type Contact, currentUser, type Message } from "./data";

interface ChatThreadProps {
  contact: Contact;
  messages: Message[];
  conversationId?: number;
  onOpenContact?: () => void;
  onBack?: () => void;
  showBackButton?: boolean;
  className?: string;
}

export function ChatThread({
  contact,
  messages,
  conversationId,
  onOpenContact,
  onBack,
  showBackButton,
  className,
}: ChatThreadProps) {
  return (
    <div className={cn("flex h-full flex-col py-3", className)}>
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-4 px-2">
          <div className="flex items-center gap-3">
            {showBackButton && (
              <Button
                variant="ghost"
                size="icon-sm"
                className="md:hidden"
                aria-label="Back to conversations"
                onClick={onBack}
              >
                <ArrowLeft />
              </Button>
            )}
            <Avatar className="size-8">
              <AvatarFallback className="bg-background text-foreground">{getInitials(contact.name)}</AvatarFallback>
              <AvatarBadge className="bg-green-600 dark:bg-green-800" />
            </Avatar>
            <div>
              <div className="font-medium text-sm">{contact.name}</div>
              <div className="text-muted-foreground text-xs leading-3">{contact.role}</div>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon-sm" aria-label="Call">
                  <PhoneCall />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Call</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon-sm" aria-label="Tag">
                  <Tag />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Tag</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon-sm" aria-label="Snooze">
                  <AlarmClock />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Snooze</TooltipContent>
            </Tooltip>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon-sm" aria-label="More actions">
                  <MoreHorizontal />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-44">
                <DropdownMenuGroup>
                  <DropdownMenuItem onSelect={onOpenContact}>
                    <UserRound />
                    View profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Copy />
                    Copy email
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Flag />
                    Mark priority
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem variant="destructive">Block contact</DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <Separator />
      </div>

      <ScrollArea
        type="hover"
        className="min-h-0 flex-1 [&_[data-orientation=vertical][data-slot=scroll-area-scrollbar]]:w-1.5"
      >
        <div className="flex flex-col gap-6 px-4 py-8">
          <div className="flex items-center gap-2">
            <div className="h-px flex-1 bg-border/40" />
            <span className="rounded-full bg-muted/60 px-3 py-1 font-semibold text-[9px] text-muted-foreground text-xs uppercase tracking-wider">
              May 6, 2026
            </span>
            <div className="h-px flex-1 bg-border/40" />
          </div>

          {messages.map((message) => {
            const isOutbound = message.side === "out";
            const senderName = isOutbound ? currentUser.name : contact.name;

            return (
              <div key={message.id} className={cn("flex items-end gap-3", isOutbound && "flex-row-reverse")}>
                <Avatar className="size-8 shrink-0">
                  <AvatarFallback
                    className={cn(
                      "font-semibold text-[10px]",
                      isOutbound
                        ? "border border-indigo-200 bg-indigo-100 text-indigo-700 dark:border-indigo-500/20 dark:bg-indigo-500/10 dark:text-indigo-400"
                        : "border border-border/30 bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300",
                    )}
                  >
                    {getInitials(senderName)}
                  </AvatarFallback>
                </Avatar>

                <div
                  className={cn(
                    "flex max-w-md flex-col gap-1 rounded-2xl border px-4 py-2.5 text-sm shadow-2xs transition-all duration-300",
                    isOutbound
                      ? "rounded-br-sm border-indigo-700 bg-indigo-600 text-white dark:border-indigo-600 dark:bg-indigo-500"
                      : "rounded-bl-sm border-zinc-200/50 bg-zinc-100 bg-zinc-105 text-zinc-800 dark:border-zinc-800/50 dark:bg-zinc-900 dark:text-zinc-250",
                  )}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                  <div
                    className={cn(
                      "mt-1 font-semibold text-[9px] uppercase tracking-wider",
                      isOutbound ? "text-right text-indigo-200" : "text-zinc-400 dark:text-zinc-500",
                    )}
                  >
                    {message.time}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>

      <div className="border-border/30 border-t bg-background/50 px-4 pt-4 pb-2 backdrop-blur-md">
        <Tabs
          defaultValue="reply"
          className="overflow-hidden rounded-2xl border border-border/40 bg-zinc-50/30 transition-all duration-300 focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/10 dark:bg-zinc-900/30"
        >
          <TabsList
            variant="line"
            className="w-full justify-start gap-2 border-border/30 border-b bg-muted/40 px-3 *:font-semibold *:text-xs"
          >
            <TabsTrigger value="reply" className="flex-none px-3 py-2">
              Reply
            </TabsTrigger>
            <TabsTrigger value="note" className="flex-none px-3 py-2">
              Internal note
            </TabsTrigger>
          </TabsList>

          <TabsContent value="reply" className="m-0">
            <MessageComposer placeholder="Type your message..." conversationId={conversationId} />
          </TabsContent>
          <TabsContent value="note" className="m-0">
            <MessageComposer placeholder="Write an internal note..." />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function MessageComposer({ placeholder, conversationId }: { placeholder: string; conversationId?: number }) {
  const [message, setMessage] = useState("");
  const addMessage = useChatStore((state) => state.addMessage);

  const handleSubmit = () => {
    if (!message.trim() || !conversationId) return;

    addMessage(conversationId, {
      id: Date.now(),
      side: "out",
      text: message.trim(),
      time: "Just now",
    });

    setMessage("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="flex flex-col gap-3 bg-transparent px-4 py-3">
      <Textarea
        placeholder={placeholder}
        className="min-h-[50px] w-full resize-none border-0 bg-transparent px-0 py-0.5 text-sm shadow-none placeholder:text-muted-foreground/50 focus-visible:ring-0"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-1.5">
          <Button variant="ghost" size="icon" className="size-8 rounded-lg text-muted-foreground hover:text-foreground">
            <Type className="size-4" />
          </Button>
          <Button variant="ghost" size="icon" className="size-8 rounded-lg text-muted-foreground hover:text-foreground">
            <Smile className="size-4" />
          </Button>
          <Button variant="ghost" size="icon" className="size-8 rounded-lg text-muted-foreground hover:text-foreground">
            <Paperclip className="size-4" />
          </Button>
          <Button variant="ghost" size="icon" className="size-8 rounded-lg text-muted-foreground hover:text-foreground">
            <Link className="size-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="size-8 rounded-lg border-border/30 bg-indigo-500/5 text-indigo-600 hover:bg-indigo-500/10 dark:text-indigo-400"
          >
            <Sparkles className="size-4" />
          </Button>
        </div>

        <Button
          size="icon"
          onClick={handleSubmit}
          disabled={!message.trim()}
          className="size-8 shrink-0 rounded-lg bg-indigo-600 text-white shadow-sm hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-400"
        >
          <Send className="size-3.5" />
        </Button>
      </div>
    </div>
  );
}
