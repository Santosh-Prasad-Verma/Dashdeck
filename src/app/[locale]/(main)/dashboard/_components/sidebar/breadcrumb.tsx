"use client";

import { ChevronRight, Home } from "lucide-react";
import { useTranslations } from "next-intl";

import { Link as I18nLink, usePathname } from "@/i18n/navigation";
import { sidebarItems } from "@/navigation/sidebar/sidebar-items";

export function Breadcrumb() {
  const t = useTranslations();
  const pathname = usePathname();

  const findPageTitle = (path: string): string => {
    for (const group of sidebarItems) {
      for (const item of group.items) {
        if (item.url === path) return t(item.titleKey);
        if (item.subItems) {
          for (const sub of item.subItems) {
            if (sub.url === path) return t(sub.titleKey);
          }
        }
      }
    }
    return path.split("/").pop()?.replace(/-/g, " ") || "";
  };

  const pathSegments = pathname.split("/").filter(Boolean);
  const breadcrumbs = pathSegments.map((segment, index) => {
    const path = `/${pathSegments.slice(0, index + 1).join("/")}`;
    const title = findPageTitle(path);
    return { path, title: title.charAt(0).toUpperCase() + title.slice(1) };
  });

  if (breadcrumbs.length <= 1) return null;

  return (
    <nav className="flex items-center gap-1 text-sm text-muted-foreground">
      <I18nLink href="/dashboard/default" className="flex items-center gap-1 hover:text-foreground transition-colors">
        <Home className="size-3.5" />
      </I18nLink>
      {breadcrumbs.slice(1).map((breadcrumb, index) => (
        <div key={breadcrumb.path} className="flex items-center gap-1">
          <ChevronRight className="size-3.5" />
          {index === breadcrumbs.length - 2 ? (
            <span className="font-medium text-foreground">{breadcrumb.title}</span>
          ) : (
            <I18nLink href={breadcrumb.path} className="hover:text-foreground transition-colors">
              {breadcrumb.title}
            </I18nLink>
          )}
        </div>
      ))}
    </nav>
  );
}
