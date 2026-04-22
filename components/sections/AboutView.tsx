"use client";

import { m } from "framer-motion";
import { Award, Download, Sparkles } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { education } from "@/data/education";
import { personal } from "@/data/personal";
import { specialties } from "@/data/specialties";
import { pickStr } from "@/lib/locale-text";
import { Link } from "@/navigation";
import type { Locale } from "@/i18n/routing";

const MotionLink = m(Link);

type Props = { locale: Locale };

export function AboutView({ locale }: Props) {
  const t = useTranslations("about");
  const edu = education[0]!;

  const name = pickStr(locale, personal.name, personal.nameAr, personal.nameFr);
  const bio = pickStr(locale, personal.bio, personal.bioAr, personal.bioFr);
  const location = pickStr(locale, personal.location, personal.locationAr, personal.locationFr);
  const languages =
    locale === "ar"
      ? personal.languagesAr
      : locale === "fr"
        ? personal.languagesFr
        : personal.languages;
  const specs =
    locale === "ar" ? specialties.ar : locale === "fr" ? specialties.fr : specialties.en;

  const institution = pickStr(locale, edu.institution, edu.institutionAr, edu.institutionFr);
  const degree = pickStr(locale, edu.degree, edu.degreeAr, edu.degreeFr);
  const grade = pickStr(locale, edu.grade, edu.gradeAr, edu.gradeFr);
  const achievements =
    locale === "ar" ? edu.achievementsAr : locale === "fr" ? edu.achievements : edu.achievements;

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
      <m.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="grid gap-10 lg:grid-cols-[280px_minmax(0,1fr)] lg:items-start"
      >
        <div className="relative mx-auto w-full max-w-xs lg:mx-0">
          <div className="relative aspect-[3/4] overflow-hidden rounded-[2rem] card-surface">
            <Image src={personal.avatar} alt={name} fill className="object-cover" sizes="280px" priority />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)]/70 to-transparent" />
          </div>
          <MotionLink
            href={personal.resume}
            className="group/dl mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[var(--accent)] px-4 py-3 text-sm font-semibold text-white shadow-md shadow-[color-mix(in_srgb,var(--accent)_30%,transparent)] transition-[box-shadow,background-color] hover:bg-[var(--accent-hover)] hover:shadow-lg"
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Download className="h-4 w-4 transition duration-300 group-hover/dl:-translate-y-0.5 group-hover/dl:translate-x-0.5 rtl:-scale-x-100 motion-reduce:transition-none" aria-hidden />
            {t("download_cv")}
          </MotionLink>
        </div>

        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-[var(--text-primary)] md:text-4xl">
            {name}
          </h1>
          <p className="mt-2 text-lg text-[var(--accent)]">
            {pickStr(locale, personal.title, personal.titleAr, personal.titleFr)}
          </p>

          <section className="mt-8">
            <h2 className="text-lg font-semibold text-[var(--text-primary)]">{t("bio_heading")}</h2>
            <p className="mt-3 whitespace-pre-line text-[var(--text-secondary)] leading-relaxed">
              {bio}
            </p>
          </section>

          <section className="mt-10">
            <h2 className="text-lg font-semibold text-[var(--text-primary)]">{t("info_heading")}</h2>
            <dl className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-4">
                <dt className="text-xs font-medium text-[var(--text-muted)]">{t("location_label")}</dt>
                <dd className="mt-1 text-sm font-semibold text-[var(--text-primary)]">{location}</dd>
              </div>
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-4">
                <dt className="text-xs font-medium text-[var(--text-muted)]">{t("email_label")}</dt>
                <dd className="mt-1 text-sm font-semibold text-[var(--text-primary)]">
                  <a href={personal.social.email} className="text-[var(--accent)] hover:underline">
                    {personal.email}
                  </a>
                </dd>
              </div>
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-4 sm:col-span-2">
                <dt className="text-xs font-medium text-[var(--text-muted)]">{t("languages_label")}</dt>
                <dd className="mt-1 text-sm font-semibold text-[var(--text-primary)]">
                  {languages.join(" · ")}
                </dd>
              </div>
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-4 sm:col-span-2">
                <dt className="text-xs font-medium text-[var(--text-muted)]">{t("available_label")}</dt>
                <dd className="mt-1 text-sm font-semibold text-[var(--text-primary)]">
                  {personal.available ? t("available_yes") : t("available_no")}
                </dd>
              </div>
            </dl>
          </section>

          <section className="mt-10">
            <h2 className="text-lg font-semibold text-[var(--text-primary)]">
              {t("specialties_heading")}
            </h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {specs.map((s) => (
                <m.li
                  key={s}
                  className="inline-flex cursor-default items-center gap-1.5 rounded-full bg-[var(--accent-subtle)] px-3 py-1 text-sm font-medium text-[var(--text-primary)]"
                  whileHover={{ y: -3, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 26 }}
                >
                  <Sparkles className="h-3.5 w-3.5 shrink-0 text-[var(--accent)]" aria-hidden />
                  {s}
                </m.li>
              ))}
            </ul>
          </section>

          <m.div
            className="mt-10 rounded-3xl border border-amber-500/30 bg-gradient-to-br from-amber-500/15 to-transparent p-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.45 }}
          >
            <div className="flex items-start gap-3">
              <Award className="mt-0.5 h-6 w-6 text-amber-600 dark:text-amber-300" aria-hidden />
              <div>
                <h2 className="text-lg font-semibold text-[var(--text-primary)]">
                  {t("hackathon_title")}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                  {t("hackathon_body")}
                </p>
              </div>
            </div>
          </m.div>

          <section className="mt-10">
            <h2 className="text-lg font-semibold text-[var(--text-primary)]">
              {t("education_heading")}
            </h2>
            <div className="mt-4 rounded-3xl card-surface p-6">
              <div className="flex items-start gap-4">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl bg-[var(--bg-secondary)]">
                  <Image src={edu.logo} alt="" fill className="object-cover" sizes="56px" />
                </div>
                <div>
                  <p className="font-semibold text-[var(--text-primary)]">{institution}</p>
                  <p className="mt-1 text-sm text-[var(--text-secondary)]">{degree}</p>
                  <p className="mt-2 text-xs text-[var(--text-muted)]">
                    {edu.startDate} — {edu.endDate} · {grade}
                  </p>
                </div>
              </div>
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
          </section>
        </div>
      </m.div>
    </div>
  );
}
