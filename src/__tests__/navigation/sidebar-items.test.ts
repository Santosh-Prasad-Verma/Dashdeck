import { describe, expect, it } from "vitest";

import { type NavGroup, type NavMainItem, type NavSubItem, sidebarItems } from "@/navigation/sidebar/sidebar-items";

/** Recursively collect all URLs from a nav group tree */
function collectAllUrls(groups: NavGroup[]): string[] {
  const urls: string[] = [];
  for (const group of groups) {
    for (const item of group.items) {
      urls.push(item.url);
      if (item.subItems) {
        for (const sub of item.subItems) {
          urls.push(sub.url);
        }
      }
    }
  }
  return urls;
}

describe("Sidebar Items", () => {
  describe("structure", () => {
    it("exports a non-empty array of nav groups", () => {
      expect(Array.isArray(sidebarItems)).toBe(true);
      expect(sidebarItems.length).toBeGreaterThan(0);
    });

    it("every group has id, labelKey, and items", () => {
      for (const group of sidebarItems) {
        expect(group).toHaveProperty("id");
        expect(typeof group.id).toBe("number");
        expect(group).toHaveProperty("labelKey");
        expect(typeof group.labelKey).toBe("string");
        expect(group.labelKey.length).toBeGreaterThan(0);
        expect(group).toHaveProperty("items");
        expect(Array.isArray(group.items)).toBe(true);
        expect(group.items.length).toBeGreaterThan(0);
      }
    });

    it("all group ids are unique", () => {
      const ids = sidebarItems.map((g) => g.id);
      expect(new Set(ids).size).toBe(ids.length);
    });
  });

  describe("nav items", () => {
    it("every item has titleKey and url", () => {
      for (const group of sidebarItems) {
        for (const item of group.items) {
          expect(typeof item.titleKey).toBe("string");
          expect(item.titleKey.length).toBeGreaterThan(0);
          expect(typeof item.url).toBe("string");
          expect(item.url.length).toBeGreaterThan(0);
        }
      }
    });

    it("all top-level item URLs start with /", () => {
      for (const group of sidebarItems) {
        for (const item of group.items) {
          expect(item.url).toMatch(/^\//);
        }
      }
    });

    it("items with icons have valid icon components", () => {
      for (const group of sidebarItems) {
        for (const item of group.items) {
          if (item.icon !== undefined) {
            // Lucide icons are React forwardRef components (typeof === 'object')
            expect(["function", "object"]).toContain(typeof item.icon);
          }
        }
      }
    });
  });

  describe("sub items", () => {
    const itemsWithSubItems = sidebarItems
      .flatMap((g) => g.items)
      .filter((item): item is NavMainItem & { subItems: NavSubItem[] } => !!item.subItems && item.subItems.length > 0);

    it("at least one item has sub items", () => {
      expect(itemsWithSubItems.length).toBeGreaterThan(0);
    });

    it("every sub item has titleKey and url", () => {
      for (const item of itemsWithSubItems) {
        for (const sub of item.subItems) {
          expect(typeof sub.titleKey).toBe("string");
          expect(sub.titleKey.length).toBeGreaterThan(0);
          expect(typeof sub.url).toBe("string");
          expect(sub.url.length).toBeGreaterThan(0);
        }
      }
    });

    it("all sub item URLs start with /", () => {
      for (const item of itemsWithSubItems) {
        for (const sub of item.subItems) {
          expect(sub.url).toMatch(/^\//);
        }
      }
    });
  });

  describe("URL uniqueness", () => {
    it("there are no duplicate URLs across the entire sidebar (excluding legacy parent URLs)", () => {
      const urls = collectAllUrls(sidebarItems);
      const seen = new Set<string>();
      const duplicates: string[] = [];
      for (const url of urls) {
        if (seen.has(url)) {
          duplicates.push(url);
        }
        seen.add(url);
      }
      // Legacy group parent URLs may duplicate their first sub-item (e.g. /dashboard/default-v1)
      const legacyGroup = sidebarItems.find((g) => g.labelKey === "Sidebar.groups.legacy");
      const legacyParentUrls = legacyGroup?.items.map((i) => i.url) ?? [];
      const unexpectedDuplicates = duplicates.filter((url) => !legacyParentUrls.includes(url));
      expect(unexpectedDuplicates).toEqual([]);
    });
  });

  describe("known groups", () => {
    it("has the expected group labels", () => {
      const labels = sidebarItems.map((g) => g.labelKey);
      expect(labels).toContain("Sidebar.groups.dashboards");
      expect(labels).toContain("Sidebar.groups.pages");
      expect(labels).toContain("Sidebar.groups.legacy");
      expect(labels).toContain("Sidebar.groups.misc");
    });

    it("dashboards group has the most items", () => {
      const dashboardsGroup = sidebarItems.find((g) => g.labelKey === "Sidebar.groups.dashboards");
      expect(dashboardsGroup).toBeDefined();
      for (const group of sidebarItems) {
        if (group.labelKey !== "Sidebar.groups.dashboards") {
          expect(dashboardsGroup?.items.length).toBeGreaterThanOrEqual(group.items.length);
        }
      }
    });
  });
});
