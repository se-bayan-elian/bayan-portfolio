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
        ? p.highlightsFr
        : p.highlights;

  const body = pickStr(locale, p.longDescription, p.longDescriptionAr, p.longDescriptionFr);

  return { title, description, highlights, body };
}
