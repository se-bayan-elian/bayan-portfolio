"use client";

import { AnimatePresence, LayoutGroup, m, useReducedMotion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { ArrowUpRight, Brain, File, Globe, LayoutGrid, ShoppingBag, Smartphone, Trophy } from "lucide-react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import { projects } from "@/data/projects";
import { stats } from "@/data/stats";
import type { Project } from "@/data/projects";
import { projectLocalized } from "@/lib/project-localize";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Contact } from "@/components/sections/Contact";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { Link } from "@/navigation";
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
  other: File,
};

const sortProjects = (list: Project[]) =>
  [...list].sort((a, b) => {
    if (a.featured !== b.featured) return Number(b.featured) - Number(a.featured);
    return b.startDate.localeCompare(a.startDate);
  });

export function ProjectsDirectory() {
  const t = useTranslations("projects");
  const tx = useTranslations("projects_page");
  const locale = useLocale() as Locale;
  const reduced = useReducedMotion();
  const [active, setActive] = useState<FilterKey>("all");

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: projects.length };
    for (const p of projects) c[p.category] = (c[p.category] ?? 0) + 1;
    return c;
  }, []);

  // Spotlight: the award winner if there is one, otherwise the newest featured project.
  const spotlight = useMemo(() => sortProjects(projects.filter((p) => p.award))[0] ?? sortProjects(projects)[0]!, []);

  const list = useMemo(() => {
    const base = active === "all" ? projects.filter((p) => p.id !== spotlight.id) : projects.filter((p) => p.category === active);
    return sortProjects(base);
  }, [active, spotlight.id]);

  const spot = projectLocalized(spotlight, locale);
  // Total shipped comes from stats (more than the case studies shown here)
  const shipped = stats.find((x) => x.iconKey === "projects") ?? { value: projects.length, suffix: "+" };

  return (
    <>
      <section className="mx-auto max-w-6xl px-4 pt-10 md:px-6 md:pt-16">
        {/* ── Header with live counter ── */}
        <div className="grid items-end gap-8 lg:grid-cols-[minmax(0,1fr)_auto]">
          <div>
            <span className="enter-up inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--bg-card)]/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent)] rtl:tracking-normal">
              <LayoutGrid className="h-3.5 w-3.5" aria-hidden />
              {t("title")}
            </span>
            <h1
              className="enter-up mt-6 text-4xl font-semibold leading-[1.08] tracking-tight text-[var(--text-primary)] sm:text-5xl lg:text-6xl rtl:leading-[1.35]"
              style={{ "--enter-delay": "0.08s" } as React.CSSProperties}
            >
              {tx("headline_1")} <span className="hero-sticker">{tx("headline_mark")}</span>
            </h1>
            <p className="enter-up mt-5 max-w-2xl text-lg text-[var(--text-secondary)]" style={{ "--enter-delay": "0.14s" } as React.CSSProperties}>
              {t("subtitle")}
            </p>
          </div>
          <div className="enter-up flex items-end gap-3" style={{ "--enter-delay": "0.2s" } as React.CSSProperties}>
            <span className="text-7xl font-bold leading-none tabular-nums text-[var(--text-primary)] md:text-8xl">
              <AnimatedCounter value={shipped.value} suffix={shipped.suffix} />
            </span>
            <span className="pb-2 text-sm font-medium leading-tight text-[var(--text-muted)]">
              {tx("count_line_1")}
              <br />
              {tx("count_line_2")}
              <span className="mt-1 block text-xs text-[var(--text-muted)]/80">{tx("count_note", { count: projects.length })}</span>
            </span>
          </div>
        </div>

        {/* ── Spotlight ── */}
        <Link
          href={`/projects/${spotlight.slug}`}
          className="card-surface card-surface-glow group/spot enter-up mt-14 grid overflow-hidden rounded-[2rem] md:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]"
          style={{ "--enter-delay": "0.26s" } as React.CSSProperties}
        >
          <div className="relative aspect-[16/10] overflow-hidden bg-[var(--bg-secondary)] md:aspect-auto md:min-h-[22rem]">
            <Image
              src={spotlight.thumbnail}
              alt={spot.title}
              fill
              priority
              quality={90}
              sizes="(max-width: 768px) 92vw, 640px"
              className="object-cover object-top transition-[object-position] duration-[3000ms] ease-in-out group-hover/spot:object-bottom motion-reduce:transition-none"
            />
          </div>
          <div className="flex flex-col p-6 md:p-9">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-[var(--accent)] px-3 py-1 text-xs font-semibold text-[var(--bg-primary)]">
                {tx("spotlight")}
              </span>
              {spotlight.award ? (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] px-3 py-1 text-xs font-medium text-[var(--text-secondary)]">
                  <Trophy className="h-3.5 w-3.5 text-amber-500" aria-hidden />
                  {t("award_ribbon")}
                </span>
              ) : null}
            </div>
            <h2 className="mt-5 text-3xl font-semibold tracking-tight text-[var(--text-primary)] md:text-4xl">{spot.title}</h2>
            <p className="mt-3 text-pretty leading-relaxed text-[var(--text-secondary)]">{spot.description}</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {spotlight.techStack.slice(0, 5).map((tech) => (
                <li key={tech} className="rounded-full border border-[var(--border)] bg-[var(--glass-track)] px-3 py-1 text-xs font-medium text-[var(--text-primary)]">
                  {tech}
                </li>
              ))}
            </ul>
            <span className="hero-text-link mt-auto inline-flex items-center gap-2 pt-8 text-sm font-semibold text-[var(--text-primary)]">
              <span>{t("view_details")}</span>
              <ArrowUpRight className="h-4 w-4 text-[var(--accent)] transition-transform duration-300 group-hover/spot:rotate-45 rtl:-scale-x-100" aria-hidden />
            </span>
          </div>
        </Link>

        {/* ── Segmented filter with sliding pill + counts ── */}
        <LayoutGroup id="project-filters">
          <div
            className="mt-14 inline-flex max-w-full flex-wrap gap-1 rounded-full border border-[var(--border)] bg-[var(--bg-card)]/70 p-1.5 backdrop-blur-sm"
            role="tablist"
            aria-label={t("title")}
          >
            {filters
              .filter((f) => f.key === "all" || counts[f.key])
              .map((f) => {
                const Icon = filterIcon[f.key];
                const on = active === f.key;
                return (
                  <button
                    key={f.key}
                    type="button"
                    role="tab"
                    aria-selected={on}
                    onClick={() => setActive(f.key)}
                    className={cn(
                      "relative inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-200",
                      on ? "text-[var(--bg-primary)]" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]",
                    )}
                  >
                    {on ? (
                      <m.span
                        layoutId="filter-pill"
                        className="absolute inset-0 -z-10 rounded-full bg-[var(--text-primary)]"
                        transition={{ type: "spring", stiffness: 420, damping: 34 }}
                        aria-hidden
                      />
                    ) : null}
                    <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden />
                    {t(f.labelKey as "filter_all")}
                    <span
                      className={cn(
                        "rounded-full px-1.5 text-[0.7rem] tabular-nums",
                        on ? "bg-[var(--bg-primary)]/15" : "bg-[var(--glass-track)] text-[var(--text-muted)]",
                      )}
                    >
                      {f.key === "all" ? counts.all : counts[f.key]}
                    </span>
                  </button>
                );
              })}
          </div>
        </LayoutGroup>

        {/* ── Grid: cards reflow smoothly when filtering ── */}
        <m.div layout={!reduced} className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {list.map((p) => {
              const loc = projectLocalized(p, locale);
              return (
                <m.div
                  key={p.id}
                  layout={!reduced}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <ProjectCard
                    project={p}
                    title={loc.title}
                    description={loc.description}
                    highlights={loc.highlights}
                    awardLabel={p.award ? t("award_ribbon") : undefined}
                    compact
                  />
                </m.div>
              );
            })}
          </AnimatePresence>
        </m.div>
      </section>

      <Contact />
    </>
  );
}
