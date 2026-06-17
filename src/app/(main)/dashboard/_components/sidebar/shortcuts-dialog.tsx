"use client";

import { useEffect, useState } from "react";

import { Keyboard } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Kbd } from "@/components/ui/kbd";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface Shortcut {
  keys: string[];
  description: string;
}

interface ShortcutGroup {
  title: string;
  shortcuts: Shortcut[];
}

const shortcutGroups: ShortcutGroup[] = [
  {
    title: "Navigation",
    shortcuts: [
      { keys: ["⌘", "J"], description: "Open search" },
      { keys: ["⌘", "K"], description: "Command palette" },
      { keys: ["G", "D"], description: "Go to Dashboard" },
      { keys: ["G", "U"], description: "Go to Users" },
      { keys: ["G", "S"], description: "Go to Settings" },
    ],
  },
  {
    title: "Dashboard",
    shortcuts: [
      { keys: ["⌘", "R"], description: "Refresh data" },
      { keys: ["⌘", "E"], description: "Export report" },
      { keys: ["⌘", "P"], description: "Print dashboard" },
    ],
  },
  {
    title: "Kanban",
    shortcuts: [
      { keys: ["N"], description: "New task" },
      { keys: ["E"], description: "Edit selected task" },
      { keys: ["⌫"], description: "Delete selected task" },
      { keys: ["←", "→"], description: "Move task between columns" },
    ],
  },
  {
    title: "Chat",
    shortcuts: [
      { keys: ["Enter"], description: "Send message" },
      { keys: ["Shift", "Enter"], description: "New line" },
      { keys: ["Esc"], description: "Close conversation" },
    ],
  },
  {
    title: "General",
    shortcuts: [
      { keys: ["?"], description: "Show shortcuts" },
      { keys: ["Esc"], description: "Close dialog/modal" },
      { keys: ["⌘", "/"], description: "Toggle sidebar" },
      { keys: ["⌘", "Shift", "D"], description: "Toggle dark mode" },
    ],
  },
];

export function ShortcutsDialog() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "?" && !e.metaKey && !e.ctrlKey) {
        const target = e.target as HTMLElement;
        if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable) {
          return;
        }
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Keyboard className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Keyboard Shortcuts</DialogTitle>
          <DialogDescription>
            Navigate faster with these keyboard shortcuts.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[400px]">
          <div className="flex flex-col gap-6 pr-4">
            {shortcutGroups.map((group, groupIndex) => (
              <div key={group.title}>
                {groupIndex > 0 && <Separator className="mb-4" />}
                <h3 className="mb-3 font-medium text-sm">{group.title}</h3>
                <div className="flex flex-col gap-2">
                  {group.shortcuts.map((shortcut, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-md px-2 py-1.5 hover:bg-muted/50"
                    >
                      <span className="text-sm">{shortcut.description}</span>
                      <div className="flex items-center gap-1">
                        {shortcut.keys.map((key, keyIndex) => (
                          <Kbd key={keyIndex} className="text-xs">
                            {key}
                          </Kbd>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
