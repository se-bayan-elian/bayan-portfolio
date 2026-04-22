import type { Experience } from "@/data/experience";
import type { Locale } from "@/i18n/routing";
import { pickStr } from "@/lib/locale-text";

export function experienceLocalized(e: Experience, locale: Locale) {
  return {
    company: pickStr(locale, e.company, e.companyAr, e.companyFr),
    role: pickStr(locale, e.role, e.roleAr, e.roleFr),
    description: pickStr(locale, e.description, e.descriptionAr, e.descriptionFr),
    responsibilities:
      locale === "ar"
        ? e.responsibilitiesAr
        : locale === "fr"
          ? e.responsibilities
          : e.responsibilities,
  };
}
