import { defineRouting } from "next-intl/routing";

export const locales = ["en", "hi", "es"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = {
  en: "English",
  hi: "हिन्दी",
  es: "Español",
};

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: "always",
});
