import { describe, expect, it } from "vitest";

import { cn, formatCurrency, getInitials } from "@/lib/utils";

describe("cn (class name merger)", () => {
  it("merges simple class names", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  it("handles conditional classes via clsx syntax", () => {
    expect(cn("base", false && "hidden", "visible")).toBe("base visible");
  });

  it("handles undefined and null inputs gracefully", () => {
    expect(cn("a", undefined, null, "b")).toBe("a b");
  });

  it("deduplicates conflicting Tailwind classes", () => {
    const result = cn("px-2 py-1", "px-4");
    expect(result).toBe("py-1 px-4");
  });

  it("last conflicting Tailwind class wins", () => {
    const result = cn("text-red-500", "text-blue-500");
    expect(result).toBe("text-blue-500");
  });

  it("merges bg classes correctly", () => {
    const result = cn("bg-white", "bg-black");
    expect(result).toBe("bg-black");
  });

  it("handles empty string inputs", () => {
    expect(cn("", "foo", "")).toBe("foo");
  });

  it("handles no arguments", () => {
    expect(cn()).toBe("");
  });

  it("handles array inputs via clsx", () => {
    expect(cn(["foo", "bar"])).toBe("foo bar");
  });

  it("handles object inputs for conditional classes", () => {
    expect(cn({ hidden: true, visible: false })).toBe("hidden");
  });

  it("merges responsive Tailwind classes", () => {
    const result = cn("md:px-2", "md:px-4");
    expect(result).toBe("md:px-4");
  });
});

describe("getInitials", () => {
  it("returns initials from a full name", () => {
    expect(getInitials("John Doe")).toBe("JD");
  });

  it("returns single initial from a single word", () => {
    expect(getInitials("Alice")).toBe("A");
  });

  it("returns initials from three words", () => {
    expect(getInitials("Mary Jane Watson")).toBe("MJW");
  });

  it("returns ? for empty string", () => {
    expect(getInitials("")).toBe("?");
  });

  it("returns ? for whitespace-only string", () => {
    expect(getInitials("   ")).toBe("?");
  });

  it("handles extra whitespace between words", () => {
    expect(getInitials("  John    Doe  ")).toBe("JD");
  });

  it("returns uppercase initials for lowercase input", () => {
    expect(getInitials("alice bob")).toBe("AB");
  });

  it("returns ? for non-string input coerced", () => {
    // The function checks typeof str !== "string"
    expect(getInitials(undefined as unknown as string)).toBe("?");
    expect(getInitials(null as unknown as string)).toBe("?");
  });
});

describe("formatCurrency", () => {
  it("formats a basic USD amount", () => {
    const result = formatCurrency(1000);
    expect(result).toContain("1,000");
    expect(result).toContain("$");
  });

  it("formats with a different currency", () => {
    const result = formatCurrency(500, { currency: "EUR", locale: "en-US" });
    expect(result).toContain("500");
    expect(result).toContain("€");
  });

  it("formats with noDecimals option", () => {
    const result = formatCurrency(1234.56, { noDecimals: true });
    expect(result).not.toContain(".56");
    expect(result).toContain("1,235");
  });

  it("formats zero correctly", () => {
    const result = formatCurrency(0);
    expect(result).toContain("$");
    expect(result).toContain("0");
  });

  it("formats negative amounts", () => {
    const result = formatCurrency(-500);
    expect(result).toContain("500");
  });

  it("respects minimumFractionDigits", () => {
    const result = formatCurrency(100, { minimumFractionDigits: 2 });
    expect(result).toContain("100.00");
  });

  it("uses default locale and currency when no options are provided", () => {
    const result = formatCurrency(42);
    // Default is USD, en-US locale
    expect(result).toContain("$");
    expect(result).toContain("42");
  });
});
