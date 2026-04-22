"use client";

import { m } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { projects } from "@/data/projects";
import { projectLocalized } from "@/lib/project-localize";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Link } from "@/navigation";
import type { Locale } from "@/i18n/routing";

type Props = {
  limit?: number;
};

export function Projects({ limit = 3 }: Props) {
  const t = useTranslations("projects");
  const locale = useLocale() as Locale;
  const list = projects.filter((p) => p.featured).slice(0, limit);

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
        <Link
          href="/projects"
          className="inline-flex w-fit items-center rounded-2xl border border-[var(--border)] bg-[var(--bg-card)]/95 px-4 py-2 text-sm font-semibold text-[var(--text-primary)] shadow-sm transition hover:border-[var(--accent-2)]/40 hover:text-[var(--accent)] hover:shadow-glow"
        >
          {t("view_all")}
        </Link>
      </m.div>

      <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {list.map((p, i) => {
          const loc = projectLocalized(p, locale);
          return (
            <m.div
              key={p.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8% 0px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <ProjectCard
                project={p}
                title={loc.title}
                description={loc.description}
                highlights={loc.highlights}
                awardLabel={p.award ? t("award_ribbon") : undefined}
              />
            </m.div>
          );
        })}
      </div>
    </section>
  );
}
