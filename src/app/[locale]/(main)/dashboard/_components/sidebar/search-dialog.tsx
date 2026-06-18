"use client";

import * as React from "react";

import { Search } from "lucide-react";
import { useTranslations } from "next-intl";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { useRouter } from "@/i18n/navigation";
import type { NavMainItem } from "@/navigation/sidebar/sidebar-items";
import { sidebarItems } from "@/navigation/sidebar/sidebar-items";

type SearchItem = {
  groupKey: string;
  labelKey: string;
  url: string;
  icon?: NavMainItem["icon"];
  disabled?: boolean;
  newTab?: boolean;
};

const sidebarGroupLabelKeys = new Set(sidebarItems.flatMap((group) => (group.labelKey ? [group.labelKey] : [])));

function getSubItemGroup(groupLabelKey: string | undefined, itemTitleKey: string) {
  return sidebarGroupLabelKeys.has(itemTitleKey) ? (groupLabelKey ?? "Sidebar.other") : itemTitleKey;
}

const searchItems: SearchItem[] = sidebarItems.flatMap((group) =>
  group.items.flatMap((item) => {
    if (item.subItems) {
      return item.subItems.map((sub) => ({
        groupKey: getSubItemGroup(group.labelKey, item.titleKey),
        labelKey: sub.titleKey,
        url: sub.url,
        icon: item.icon,
        disabled: sub.comingSoon,
        newTab: sub.newTab,
      }));
    }
    return [
      {
        groupKey: group.labelKey ?? "Sidebar.other",
        labelKey: item.titleKey,
        url: item.url,
        icon: item.icon,
        disabled: item.comingSoon,
        newTab: item.newTab,
      },
    ];
  }),
);

function getAvailableItems(items: SearchItem[]) {
  return items.filter((item) => !item.disabled && !item.url.includes("coming-soon"));
}

const recommendations = getAvailableItems(searchItems);

function groupBy(items: SearchItem[]) {
  const groups = [...new Set(items.map((item) => item.groupKey))];
  return groups.map((group) => ({
    group,
    items: items.filter((item) => item.groupKey === group),
  }));
}

export function SearchDialog() {
  const t = useTranslations();
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const router = useRouter();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleOpenChange = (value: boolean) => {
    setOpen(value);
    if (!value) setQuery("");
  };

  const handleSelect = (item: SearchItem) => {
    if (item.disabled) return;
    handleOpenChange(false);
    if (item.newTab) {
      window.open(item.url, "_blank", "noopener,noreferrer");
    } else {
      router.push(item.url);
    }
  };

  const renderGroups = (items: SearchItem[]) =>
    groupBy(items).map(({ group, items: groupItems }, index) => (
      <React.Fragment key={group}>
        {index > 0 && <CommandSeparator />}
        <CommandGroup heading={t(group)}>
          {groupItems.map((item) => (
            <CommandItem
              disabled={item.disabled}
              key={`${group}-${item.url}-${item.labelKey}`}
              value={`${t(group)} ${t(item.labelKey)}`}
              onSelect={() => handleSelect(item)}
            >
              {item.icon && <item.icon />}
              <span>{t(item.labelKey)}</span>

              {item.disabled && (
                <Badge variant="outline" className="text-xs">
                  {t("Sidebar.soon")}
                </Badge>
              )}
            </CommandItem>
          ))}
        </CommandGroup>
      </React.Fragment>
    ));

  return (
    <>
      <Button
        onClick={() => handleOpenChange(true)}
        variant="link"
        className="px-0! font-normal text-muted-foreground hover:no-underline"
      >
        <Search data-icon="inline-start" />
        {t("Sidebar.search")}
        <kbd className="inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-medium text-[10px]">
          <span className="text-xs">⌘</span>J
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={handleOpenChange}>
        <Command>
          <CommandInput placeholder={t("Sidebar.searchPlaceholder")} value={query} onValueChange={setQuery} />
          <CommandList>
            <CommandEmpty>{t("Sidebar.noResults")}</CommandEmpty>
            {query ? renderGroups(searchItems) : renderGroups(recommendations)}
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  );
}
