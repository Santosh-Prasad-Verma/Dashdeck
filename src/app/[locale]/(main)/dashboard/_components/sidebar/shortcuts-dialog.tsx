"use client";

import { useEffect, useState } from "react";

import { Keyboard } from "lucide-react";
import { useTranslations } from "next-intl";

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
  descriptionKey: string;
}

interface ShortcutGroup {
  titleKey: string;
  shortcuts: Shortcut[];
}

const shortcutGroups: ShortcutGroup[] = [
  {
    titleKey: "Shortcuts.groups.navigation",
    shortcuts: [
      { keys: ["⌘", "J"], descriptionKey: "Shortcuts.shortcuts.openSearch" },
      { keys: ["⌘", "K"], descriptionKey: "Shortcuts.shortcuts.commandPalette" },
      { keys: ["G", "D"], descriptionKey: "Shortcuts.shortcuts.goToDashboard" },
      { keys: ["G", "U"], descriptionKey: "Shortcuts.shortcuts.goToUsers" },
      { keys: ["G", "S"], descriptionKey: "Shortcuts.shortcuts.goToSettings" },
    ],
  },
  {
    titleKey: "Shortcuts.groups.dashboard",
    shortcuts: [
      { keys: ["⌘", "R"], descriptionKey: "Shortcuts.shortcuts.refreshData" },
      { keys: ["⌘", "E"], descriptionKey: "Shortcuts.shortcuts.exportReport" },
      { keys: ["⌘", "P"], descriptionKey: "Shortcuts.shortcuts.printDashboard" },
    ],
  },
  {
    titleKey: "Shortcuts.groups.kanban",
    shortcuts: [
      { keys: ["N"], descriptionKey: "Shortcuts.shortcuts.newTask" },
      { keys: ["E"], descriptionKey: "Shortcuts.shortcuts.editTask" },
      { keys: ["⌫"], descriptionKey: "Shortcuts.shortcuts.deleteTask" },
      { keys: ["←", "→"], descriptionKey: "Shortcuts.shortcuts.moveTask" },
    ],
  },
  {
    titleKey: "Shortcuts.groups.chat",
    shortcuts: [
      { keys: ["Enter"], descriptionKey: "Shortcuts.shortcuts.sendMessage" },
      { keys: ["Shift", "Enter"], descriptionKey: "Shortcuts.shortcuts.newLine" },
      { keys: ["Esc"], descriptionKey: "Shortcuts.shortcuts.closeConversation" },
    ],
  },
  {
    titleKey: "Shortcuts.groups.general",
    shortcuts: [
      { keys: ["?"], descriptionKey: "Shortcuts.shortcuts.showShortcuts" },
      { keys: ["Esc"], descriptionKey: "Shortcuts.shortcuts.closeDialog" },
      { keys: ["⌘", "/"], descriptionKey: "Shortcuts.shortcuts.toggleSidebar" },
      { keys: ["⌘", "Shift", "D"], descriptionKey: "Shortcuts.shortcuts.toggleDarkMode" },
    ],
  },
];

export function ShortcutsDialog() {
  const t = useTranslations();
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
          <DialogTitle>{t("Shortcuts.title")}</DialogTitle>
          <DialogDescription>{t("Shortcuts.description")}</DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[400px]">
          <div className="flex flex-col gap-6 pr-4">
            {shortcutGroups.map((group, groupIndex) => (
              <div key={group.titleKey}>
                {groupIndex > 0 && <Separator className="mb-4" />}
                <h3 className="mb-3 font-medium text-sm">{t(group.titleKey)}</h3>
                <div className="flex flex-col gap-2">
                  {group.shortcuts.map((shortcut, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-md px-2 py-1.5 hover:bg-muted/50"
                    >
                      <span className="text-sm">{t(shortcut.descriptionKey)}</span>
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
