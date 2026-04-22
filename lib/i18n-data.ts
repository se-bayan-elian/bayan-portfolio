import type { Locale } from "@/i18n/routing";

export function pickLocale<T extends Record<string, unknown>>(
  locale: Locale,
  en: keyof T,
  ar: keyof T,
  fr: keyof T,
  obj: T,
): string {
  const key = locale === "ar" ? ar : locale === "fr" ? fr : en;
  const v = obj[key];
  return typeof v === "string" ? v : String(v ?? "");
}

export function pickStringList(
  locale: Locale,
  en: string[],
  ar: string[],
  fr: string[] | undefined,
): string[] {
  if (locale === "ar") return ar;
  if (locale === "fr" && fr?.length) return fr;
  return en;
}
