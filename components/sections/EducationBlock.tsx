"use client";

import { m } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { education } from "@/data/education";
import { pickStr } from "@/lib/locale-text";
import type { Locale } from "@/i18n/routing";

type Props = { locale: Locale };

export function EducationBlock({ locale }: Props) {
  const t = useTranslations("experience");
  const edu = education[0]!;

  const institution = pickStr(locale, edu.institution, edu.institutionAr, edu.institutionFr);
  const degree = pickStr(locale, edu.degree, edu.degreeAr, edu.degreeFr);
  const grade = pickStr(locale, edu.grade, edu.gradeAr, edu.gradeFr);
  const achievements =
    locale === "ar" ? edu.achievementsAr : locale === "fr" ? edu.achievements : edu.achievements;

  return (
    <section className="mx-auto max-w-6xl px-4 pb-16 md:px-6">
      <m.h2
        className="text-2xl font-semibold text-[var(--text-primary)]"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        {t("education")}
      </m.h2>

      <m.div
        className="mt-6 rounded-3xl card-surface p-6 md:p-8"
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
      >
        <div className="flex flex-col gap-4 md:flex-row md:items-start">
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl bg-[var(--bg-secondary)]">
            <Image src={edu.logo} alt="" fill className="object-cover" sizes="64px" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-lg font-semibold text-[var(--text-primary)]">{institution}</p>
            <p className="mt-1 text-[var(--text-secondary)]">{degree}</p>
            <p className="mt-2 text-sm text-[var(--text-muted)]">
              {edu.startDate} — {edu.endDate} · {grade}
            </p>
            <ul
              className={[
                "mt-4 space-y-2 text-sm text-[var(--text-secondary)]",
                locale === "ar" ? "list-disc pe-4" : "list-disc ps-4",
              ].join(" ")}
            >
              {achievements.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </div>
        </div>
      </m.div>
    </section>
  );
}
