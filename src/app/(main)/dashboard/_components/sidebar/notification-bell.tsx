"use client";

import { useState } from "react";

import { Bell, Check, MessageSquare, User, Zap } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface Notification {
  id: number;
  type: "message" | "user" | "system" | "ai";
  title: string;
  description: string;
  time: string;
  read: boolean;
}

const initialNotifications: Notification[] = [
  {
    id: 1,
    type: "ai",
    title: "AI Model Updated",
    description: "Claude 3.5 Sonnet has been updated to the latest version",
    time: "2 min ago",
    read: false,
  },
  {
    id: 2,
    type: "message",
    title: "New message from Sarah",
    description: "Hey, can you review the latest PR?",
    time: "15 min ago",
    read: false,
  },
  {
    id: 3,
    type: "user",
    title: "New team member joined",
    description: "Alex Johnson has joined the Engineering team",
    time: "1 hour ago",
    read: false,
  },
  {
    id: 4,
    type: "system",
    title: "System maintenance scheduled",
    description: "Scheduled downtime tonight from 2-4 AM UTC",
    time: "2 hours ago",
    read: true,
  },
  {
    id: 5,
    type: "ai",
    title: "Token usage alert",
    description: "Daily token usage exceeded 80% of limit",
    time: "3 hours ago",
    read: true,
  },
];

function getNotificationIcon(type: Notification["type"]) {
  switch (type) {
    case "message":
      return <MessageSquare className="size-4" />;
    case "user":
      return <User className="size-4" />;
    case "ai":
      return <Zap className="size-4" />;
    case "system":
      return <Bell className="size-4" />;
    default:
      return <Bell className="size-4" />;
  }
}

function getNotificationColor(type: Notification["type"]) {
  switch (type) {
    case "message":
      return "bg-blue-500/10 text-blue-600 dark:text-blue-400";
    case "user":
      return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400";
    case "ai":
      return "bg-violet-500/10 text-violet-600 dark:text-violet-400";
    case "system":
      return "bg-amber-500/10 text-amber-600 dark:text-amber-400";
    default:
      return "bg-muted text-muted-foreground";
  }
}

export function NotificationBell() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="size-4" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 size-4 p-0 text-[10px]"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="end" sideOffset={4}>
        <div className="flex items-center justify-between px-4 py-2">
          <span className="font-medium text-sm">Notifications</span>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="h-7 text-xs"
              onClick={markAllAsRead}
            >
              Mark all as read
            </Button>
          )}
        </div>
        <DropdownMenuSeparator />
        <ScrollArea className="h-80">
          {notifications.map((notification) => (
            <DropdownMenuItem
              key={notification.id}
              className={cn(
                "flex items-start gap-3 px-4 py-3 cursor-pointer",
                !notification.read && "bg-muted/50"
              )}
              onClick={() => markAsRead(notification.id)}
            >
              <Avatar className="size-8 shrink-0">
                <AvatarFallback className={getNotificationColor(notification.type)}>
                  {getNotificationIcon(notification.type)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{notification.title}</span>
                  {!notification.read && (
                    <div className="size-1.5 rounded-full bg-blue-500" />
                  )}
                </div>
                <p className="text-muted-foreground text-xs truncate">{notification.description}</p>
                <span className="text-muted-foreground text-xs">{notification.time}</span>
              </div>
            </DropdownMenuItem>
          ))}
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
