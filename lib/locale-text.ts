import type { Locale } from "@/i18n/routing";

export function pickLocale<T extends Record<string, unknown>>(
  locale: Locale,
  en: T["en"],
  ar: T["ar"],
  fr: T["fr"],
) {
  if (locale === "ar") return ar;
  if (locale === "fr") return fr;
  return en;
}

/** Pick localized string with optional fallbacks to English. */
export function pickStr(
  locale: Locale,
  en: string,
  ar?: string,
  fr?: string,
): string {
  if (locale === "ar" && ar !== undefined && ar !== "") return ar;
  if (locale === "fr" && fr !== undefined && fr !== "") return fr;
  return en;
}
