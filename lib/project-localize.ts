import type { Project } from "@/data/projects";
import type { Locale } from "@/i18n/routing";
import { pickStr } from "@/lib/locale-text";

export function projectLocalized(p: Project, locale: Locale) {
  const title = pickStr(locale, p.title, p.titleAr, p.titleFr);
  const description = pickStr(locale, p.description, p.descriptionAr, p.descriptionFr);
  const highlights =
    locale === "ar"
      ? p.highlightsAr
      : locale === "fr"
        ? p.highlights
        : p.highlights;

  const body =
    locale === "en"
      ? p.longDescription
      : locale === "ar"
        ? [p.descriptionAr, "", ...p.highlightsAr.map((h) => `• ${h}`)].join("\n")
        : [p.descriptionFr, "", ...p.highlights.map((h) => `• ${h}`)].join("\n");

  return { title, description, highlights, body };
}
