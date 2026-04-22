"use client";

import { m, useReducedMotion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { Brain, Globe, LayoutGrid, ShoppingBag, Smartphone } from "lucide-react";
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

const filterIcon: Record<FilterKey, LucideIcon> = {
  all: LayoutGrid,
  ecommerce: ShoppingBag,
  ai: Brain,
  web: Globe,
  mobile: Smartphone,
};

export function ProjectsDirectory() {
  const t = useTranslations("projects");
  const locale = useLocale() as Locale;
  const [active, setActive] = useState<FilterKey>("all");
  const reduceMotion = useReducedMotion();
  const filterMotion = {
    whileHover: reduceMotion ? undefined : { y: -3, scale: 1.02 },
    whileTap: reduceMotion ? undefined : { scale: 0.97 },
  } as const;

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
        {filters.map((f) => {
          const Icon = filterIcon[f.key];
          return (
            <m.button
              key={f.key}
              type="button"
              role="tab"
              aria-selected={active === f.key}
              onClick={() => setActive(f.key)}
              className={cn(
                "group/filt inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-200",
                active === f.key
                  ? "bg-[var(--accent)] text-white shadow-md shadow-[color-mix(in_srgb,var(--accent)_25%,transparent)]"
                  : "border border-[var(--border)] bg-[var(--bg-card)] text-[var(--text-secondary)] hover:border-[var(--accent)]/40 hover:text-[var(--accent)]",
              )}
              {...filterMotion}
              transition={{ type: "spring", stiffness: 420, damping: 28 }}
            >
              <Icon
                className={cn(
                  "h-3.5 w-3.5 shrink-0 transition duration-300 motion-reduce:transition-none",
                  active === f.key
                    ? "text-white"
                    : "text-[var(--accent)] opacity-90 group-hover/filt:rotate-12 group-hover/filt:scale-110",
                )}
                aria-hidden
              />
              {t(f.labelKey as "filter_all")}
            </m.button>
          );
        })}
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
