"use client";

import { m } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { experiences } from "@/data/experience";
import { experienceLocalized } from "@/lib/experience-localize";
import { TimelineItem } from "@/components/ui/TimelineItem";
import { Link } from "@/navigation";
import type { Locale } from "@/i18n/routing";

type ExperienceProps = { showViewAll?: boolean };

export function Experience({ showViewAll = true }: ExperienceProps) {
  const t = useTranslations("experience");
  const locale = useLocale() as Locale;

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 md:px-6">
      <m.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
        className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between"
      >
        <div>
          <h2 className="section-heading text-3xl font-semibold tracking-tight text-[var(--text-primary)]">
            {t("title")}
          </h2>
          <p className="mt-2 max-w-2xl text-[var(--text-secondary)]">{t("subtitle")}</p>
        </div>
        {showViewAll ? (
          <Link
            href="/experience"
            className="inline-flex w-fit items-center rounded-2xl border border-[var(--border)] bg-[var(--bg-card)]/95 px-4 py-2 text-sm font-semibold text-[var(--text-primary)] shadow-sm transition hover:border-[var(--accent-2)]/40 hover:text-[var(--accent)] hover:shadow-glow"
          >
            {t("view_timeline")}
          </Link>
        ) : null}
      </m.div>

      <div className="mt-12 space-y-12">
        {experiences.map((item, index) => {
          const loc = experienceLocalized(item, locale);
          return (
            <TimelineItem
              key={item.id}
              item={item}
              index={index}
              locale={locale}
              company={loc.company}
              role={loc.role}
              description={loc.description}
              responsibilities={loc.responsibilities}
            />
          );
        })}
      </div>
    </section>
  );
}
