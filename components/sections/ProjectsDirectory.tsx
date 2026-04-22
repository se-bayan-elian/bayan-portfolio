"use client";

import { m } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import { projects } from "@/data/projects";
import type { Project } from "@/data/projects";
import { projectLocalized } from "@/lib/project-localize";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { cn } from "@/lib/utils";
import type { Locale } from "@/i18n/routing";

type FilterKey = "all" | Project["category"];

const filters: { key: FilterKey; labelKey: string }[] = [
  { key: "all", labelKey: "filter_all" },
  { key: "ecommerce", labelKey: "filter_ecommerce" },
  { key: "ai", labelKey: "filter_ai" },
  { key: "web", labelKey: "filter_web" },
  { key: "mobile", labelKey: "filter_mobile" },
];

export function ProjectsDirectory() {
  const t = useTranslations("projects");
  const locale = useLocale() as Locale;
  const [active, setActive] = useState<FilterKey>("all");

  const list = useMemo(() => {
    const base =
      active === "all" ? projects : projects.filter((p) => p.category === active);
    return [...base].sort((a, b) => {
      if (a.featured !== b.featured) return Number(b.featured) - Number(a.featured);
      return b.startDate.localeCompare(a.startDate);
    });
  }, [active]);

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 md:px-6">
      <m.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
      >
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-[var(--text-primary)] md:text-4xl">
            {t("title")}
          </h1>
          <p className="mt-2 max-w-2xl text-[var(--text-secondary)]">{t("subtitle")}</p>
        </div>
      </m.div>

      <div
        className="mt-8 flex flex-wrap gap-2"
        role="tablist"
        aria-label={t("title")}
      >
        {filters.map((f) => (
          <button
            key={f.key}
            type="button"
            role="tab"
            aria-selected={active === f.key}
            onClick={() => setActive(f.key)}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-semibold transition",
              active === f.key
                ? "bg-[var(--accent)] text-white shadow-md"
                : "border border-[var(--border)] bg-[var(--bg-card)] text-[var(--text-secondary)] hover:border-[var(--accent)]/40 hover:text-[var(--accent)]",
            )}
          >
            {t(f.labelKey as "filter_all")}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {list.map((p, i) => {
          const loc = projectLocalized(p, locale);
          return (
            <m.div
              key={p.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: Math.min(i * 0.04, 0.35) }}
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
