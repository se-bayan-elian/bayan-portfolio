"use client";

import { m } from "framer-motion";
import { ArrowRight, LayoutGrid } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { projects } from "@/data/projects";
import { projectLocalized } from "@/lib/project-localize";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Link } from "@/navigation";
import type { Locale } from "@/i18n/routing";

const MotionLink = m(Link);

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
        <MotionLink
          href="/projects"
          className="group/proj inline-flex w-fit items-center gap-2 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)]/95 px-4 py-2 text-sm font-semibold text-[var(--text-primary)] shadow-sm transition-colors hover:border-[var(--accent-2)]/40 hover:text-[var(--accent)] hover:shadow-glow"
          whileHover={{ y: -3, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <LayoutGrid className="h-4 w-4 shrink-0 text-[var(--accent)] transition duration-300 group-hover/proj:rotate-6 motion-reduce:transition-none" aria-hidden />
          {t("view_all")}
          <ArrowRight className="h-4 w-4 shrink-0 transition duration-300 group-hover/proj:translate-x-1 rtl:rotate-180 rtl:group-hover/proj:-translate-x-1 motion-reduce:transition-none" aria-hidden />
        </MotionLink>
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
