"use client";

import { AnimatePresence, LayoutGroup, m, useInView, useReducedMotion } from "framer-motion";
import { Cloud, Database, Layout, LayoutGrid, Server, Smartphone, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useMemo, useRef, useState } from "react";
import { projects } from "@/data/projects";
import { skills, type Skill } from "@/data/skills";
import { Contact } from "@/components/sections/Contact";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { cn } from "@/lib/utils";

type Cat = Skill["category"];
const CATS: { id: Cat; Icon: LucideIcon }[] = [
  { id: "frontend", Icon: Layout },
  { id: "backend", Icon: Server },
  { id: "mobile", Icon: Smartphone },
  { id: "database", Icon: Database },
  { id: "devops", Icon: Cloud },
  { id: "tools", Icon: Wrench },
];

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");

/** How many real projects list this skill in their stack (proof, not just a percentage). */
function projectsUsing(skill: string) {
  const key = norm(skill.split(/[\s/(]/)[0] ?? skill);
  if (key.length < 2) return 0;
  return projects.filter((p) => p.techStack.some((t) => norm(t).includes(key) || key.includes(norm(t)))).length;
}

export function SkillsPageView() {
  const t = useTranslations("showcase");
  const tx = useTranslations("skills_page");
  const reduced = useReducedMotion();
  const [active, setActive] = useState<Cat | "all">("all");

  const stats = useMemo(
    () =>
      CATS.map((c) => {
        const items = skills.filter((s) => s.category === c.id);
        return { ...c, count: items.length, avg: Math.round(items.reduce((n, s) => n + s.level, 0) / Math.max(items.length, 1)) };
      }).filter((c) => c.count > 0),
    [],
  );

  const list = useMemo(
    () =>
      [...(active === "all" ? skills : skills.filter((s) => s.category === active))]
        .sort((a, b) => Number(b.featured) - Number(a.featured) || b.level - a.level)
        .map((s) => ({ ...s, used: projectsUsing(s.name) })),
    [active],
  );

  return (
    <>
      <section className="mx-auto max-w-6xl px-4 pt-10 md:px-6 md:pt-16">
        {/* Header */}
        <div className="grid items-end gap-8 lg:grid-cols-[minmax(0,1fr)_auto]">
          <div>
            <span className="enter-up inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--bg-card)]/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent)] rtl:tracking-normal">
              <Wrench className="h-3.5 w-3.5" aria-hidden />
              {tx("eyebrow")}
            </span>
            <h1
              className="enter-up mt-6 text-4xl font-semibold leading-[1.08] tracking-tight text-[var(--text-primary)] sm:text-5xl lg:text-6xl rtl:leading-[1.35]"
              style={{ "--enter-delay": "0.08s" } as React.CSSProperties}
            >
              {tx("headline_1")} <span className="hero-sticker">{tx("headline_mark")}</span>
            </h1>
            <p className="enter-up mt-5 max-w-2xl text-lg text-[var(--text-secondary)]" style={{ "--enter-delay": "0.14s" } as React.CSSProperties}>
              {tx("subtitle")}
            </p>
          </div>
          <div className="enter-up flex items-end gap-3" style={{ "--enter-delay": "0.2s" } as React.CSSProperties}>
            <span className="text-7xl font-bold leading-none tabular-nums text-[var(--text-primary)] md:text-8xl">
              <AnimatedCounter value={skills.length} />
            </span>
            <span className="pb-2 text-sm font-medium leading-tight text-[var(--text-muted)]">
              {tx("count_line_1")}
              <br />
              {tx("count_line_2")}
            </span>
          </div>
        </div>

        {/* Category tiles = filters */}
        <LayoutGroup id="skill-cats">
          <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-7" role="tablist" aria-label={tx("eyebrow")}>
            <CategoryTile
              on={active === "all"}
              onClick={() => setActive("all")}
              Icon={LayoutGrid}
              label={tx("all")}
              count={skills.length}
            />
            {stats.map((c) => (
              <CategoryTile
                key={c.id}
                on={active === c.id}
                onClick={() => setActive(c.id)}
                Icon={c.Icon}
                label={t(`cat_${c.id}`)}
                count={c.count}
                avg={c.avg}
              />
            ))}
          </div>
        </LayoutGroup>

        {/* Skills grid */}
        <m.div layout={!reduced} className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {list.map((s) => (
              <m.div
                key={s.name}
                layout={!reduced}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <SkillCard skill={s} used={s.used} yrs={tx("yrs")} usedLabel={tx("used_in", { count: s.used })} cat={t(`cat_${s.category}`)} featured={s.featured ? tx("core") : null} />
              </m.div>
            ))}
          </AnimatePresence>
        </m.div>
      </section>

      <Contact />
    </>
  );
}

function CategoryTile({
  on,
  onClick,
  Icon,
  label,
  count,
  avg,
}: {
  on: boolean;
  onClick: () => void;
  Icon: LucideIcon;
  label: string;
  count: number;
  avg?: number;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={on}
      onClick={onClick}
      className={cn(
        "relative flex flex-col items-start gap-3 overflow-hidden rounded-2xl border p-4 text-start transition-colors duration-300",
        on
          ? "border-transparent text-[var(--bg-primary)]"
          : "border-[var(--border)] bg-[var(--bg-card)]/60 text-[var(--text-primary)] hover:border-[color-mix(in_srgb,var(--accent)_45%,var(--border))]",
      )}
    >
      {on ? (
        <m.span layoutId="skill-cat-pill" className="absolute inset-0 -z-10 bg-[var(--text-primary)]" transition={{ type: "spring", stiffness: 420, damping: 34 }} aria-hidden />
      ) : null}
      <Icon className={cn("h-5 w-5", on ? "" : "text-[var(--accent)]")} aria-hidden />
      <span className="text-sm font-semibold leading-tight">{label}</span>
      <span className={cn("font-mono text-xs tabular-nums", on ? "opacity-70" : "text-[var(--text-muted)]")}>
        {count}
        {avg ? ` · ${avg}%` : ""}
      </span>
    </button>
  );
}

/** Skill card with a level ring that fills when scrolled into view. */
function SkillCard({
  skill,
  used,
  yrs,
  usedLabel,
  cat,
  featured,
}: {
  skill: Skill;
  used: number;
  yrs: string;
  usedLabel: string;
  cat: string;
  featured: string | null;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-5% 0px" });
  const R = 26;
  const C = 2 * Math.PI * R;

  return (
    <div ref={ref} className="card-surface card-surface-glow group/sk flex items-center gap-4 rounded-2xl p-4">
      <div className="relative h-16 w-16 shrink-0">
        <svg viewBox="0 0 64 64" className="h-16 w-16 -rotate-90" aria-hidden>
          <circle cx="32" cy="32" r={R} fill="none" stroke="var(--glass-track)" strokeWidth="5" />
          <circle
            cx="32"
            cy="32"
            r={R}
            fill="none"
            stroke="var(--accent)"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={C}
            strokeDashoffset={inView ? C * (1 - skill.level / 100) : C}
            style={{ transition: "stroke-dashoffset 1.1s cubic-bezier(0.22,1,0.36,1)" }}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center font-mono text-sm font-bold tabular-nums text-[var(--text-primary)]">
          {skill.level}
        </span>
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="truncate font-semibold text-[var(--text-primary)]" dir="ltr">
            {skill.name}
          </p>
          {featured ? (
            <span className="shrink-0 rounded-full bg-[var(--accent-subtle)] px-2 py-0.5 text-[0.65rem] font-semibold text-[var(--accent)]">{featured}</span>
          ) : null}
        </div>
        <p className="mt-1 text-xs text-[var(--text-muted)]">
          {cat} · {skill.yearsOfExperience}+ {yrs}
        </p>
        {used > 0 ? <p className="mt-1.5 text-xs font-medium text-[var(--text-secondary)]">{usedLabel}</p> : null}
      </div>
    </div>
  );
}
