"use client";

import {
  m,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { Cloud, Database, Layout, Server, Smartphone, Wrench } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRef, useState } from "react";
import { skills, type Skill } from "@/data/skills";
import { ScrollWords } from "@/components/motion/ScrollWords";
import { cn } from "@/lib/utils";

const CATS: { id: Skill["category"]; Icon: typeof Layout }[] = [
  { id: "frontend", Icon: Layout },
  { id: "backend", Icon: Server },
  { id: "mobile", Icon: Smartphone },
  { id: "database", Icon: Database },
  { id: "devops", Icon: Cloud },
  { id: "tools", Icon: Wrench },
];

/**
 * Pinned, scroll-driven skills story:
 *  - the section sticks to the viewport while you scroll through it
 *  - the statement reveals word by word (scrubbed)
 *  - one card per skill category slides up and stacks on the previous ones
 */
export function SkillsShowcase() {
  const t = useTranslations("showcase");
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.0005 });
  // 0 → first card, n-1 → last card
  const active = useTransform(progress, [0.12, 0.92], [0, CATS.length - 1]);
  const [index, setIndex] = useState(0);
  useMotionValueEvent(active, "change", (v) => {
    const next = Math.min(CATS.length - 1, Math.max(0, Math.round(v)));
    setIndex((prev) => (prev === next ? prev : next));
  });
  const bar = useTransform(progress, [0.05, 0.95], [0, 1]);

  if (reduced) {
    return (
      <section className="mx-auto max-w-6xl px-4 py-16 md:px-6">
        <p className="text-3xl font-semibold tracking-tight text-[var(--text-primary)]">{t("statement")}</p>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {CATS.map((c) => (
            <CategoryCard key={c.id} cat={c} t={t} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} className="relative" style={{ height: `${CATS.length * 75 + 100}vh` }} aria-label={t("eyebrow")}>
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-8 px-4 pt-20 md:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-14 lg:pt-16">
          {/* Left: statement + category index */}
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--glass-track)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent)] rtl:tracking-normal">
              {t("eyebrow")}
            </span>
            <ScrollWords
              text={t("statement")}
              progress={progress}
              range={[0, 0.35]}
              highlight={t("highlight").split(",")}
              className="mt-5 text-2xl font-semibold leading-snug tracking-tight text-[var(--text-primary)] sm:text-3xl lg:text-[clamp(1.5rem,4.6svh,2.6rem)] lg:leading-[1.18]"
            />

            <ol className="mt-8 hidden gap-1 lg:grid [@media(max-height:760px)]:!hidden">
              {CATS.map((c, i) => (
                <li
                  key={c.id}
                  className={cn(
                    "flex items-center gap-3 text-sm transition-all duration-300",
                    i === index ? "translate-x-1 text-[var(--text-primary)] rtl:-translate-x-1" : "text-[var(--text-muted)]",
                  )}
                >
                  <span
                    className={cn(
                      "h-px transition-all duration-300",
                      i === index ? "w-10 bg-[var(--accent)]" : "w-4 bg-[var(--border)]",
                    )}
                  />
                  <span className="font-mono text-xs tabular-nums">0{i + 1}</span>
                  {t(`cat_${c.id}`)}
                </li>
              ))}
            </ol>

            <div className="mt-6 flex items-center gap-3 lg:mt-8">
              <span dir="ltr" className="font-mono text-sm tabular-nums text-[var(--text-primary)]">
                0{index + 1}
                <span className="text-[var(--text-muted)]"> / 0{CATS.length}</span>
              </span>
              <div className="h-1 flex-1 overflow-hidden rounded-full bg-[var(--glass-track)]">
                <m.div className="h-full origin-left rounded-full bg-[image:var(--gradient-line)] rtl:origin-right" style={{ scaleX: bar }} />
              </div>
            </div>
          </div>

          {/* Right: stacking cards */}
          <div className="relative h-[min(50svh,28rem)] lg:h-[min(30rem,66svh)]">
            {CATS.map((c, i) => (
              <StackCard key={c.id} i={i} active={active}>
                <CategoryCard cat={c} t={t} />
              </StackCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StackCard({ i, active, children }: { i: number; active: MotionValue<number>; children: React.ReactNode }) {
  // before its turn: below the stage; on its turn: centered; afterwards: pushed back into the stack
  const y = useTransform(active, (v) => {
    const d = v - i;
    if (d <= -1) return "115%";
    if (d < 0) return `${-d * 115}%`;
    return `${-Math.min(d, 3) * 5}%`;
  });
  const scale = useTransform(active, (v) => 1 - Math.min(Math.max(v - i, 0), 3) * 0.06);
  const rotate = useTransform(active, (v) => {
    const d = v - i;
    if (d < 0) return d * -6; // tilts in
    return 0;
  });
  const opacity = useTransform(active, (v) => {
    const d = v - i;
    if (d > 3) return 0;
    if (d > 0) return 1 - d * 0.22;
    // waiting cards stay hidden; the incoming card fades in as it rises
    if (d <= -1) return 0;
    return Math.min(1, (d + 1) * 1.6);
  });
  const filter = useTransform(active, (v) => `blur(${Math.min(Math.max(v - i, 0), 3) * 1.2}px)`);

  return (
    <m.div
      className="absolute inset-0 will-change-transform"
      style={{ y, scale, rotate, opacity, filter, zIndex: i + 1, transformOrigin: "50% 0%" }}
    >
      {children}
    </m.div>
  );
}

function CategoryCard({
  cat,
  t,
}: {
  cat: (typeof CATS)[number];
  t: ReturnType<typeof useTranslations<"showcase">>;
}) {
  const items = skills.filter((s) => s.category === cat.id).sort((a, b) => b.level - a.level);
  const avg = Math.round(items.reduce((n, s) => n + s.level, 0) / Math.max(items.length, 1));
  const { Icon } = cat;

  return (
    <article className="card-surface flex h-full flex-col overflow-hidden rounded-[2rem] !bg-[color-mix(in_srgb,var(--bg-card)_96%,transparent)] p-5 sm:p-7">
      <div
        data-glass-back
        className="pointer-events-none absolute -end-20 -top-20 -z-10 h-64 w-64 rounded-full bg-[var(--accent)]/20 blur-3xl"
      />
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="inline-flex rounded-2xl bg-[var(--accent-subtle)] p-3 text-[var(--accent)] ring-1 ring-[color-mix(in_srgb,var(--accent)_30%,transparent)]">
            <Icon className="h-6 w-6" aria-hidden />
          </span>
          <div>
            <h3 className="text-2xl font-semibold tracking-tight text-[var(--text-primary)]">{t(`cat_${cat.id}`)}</h3>
            <p className="text-sm text-[var(--text-muted)]">
              {items.length} {t("tools")}
            </p>
          </div>
        </div>
        <div className="text-end">
          <p className="text-gradient-hero text-3xl font-bold tabular-nums">{avg}%</p>
          <p className="text-xs text-[var(--text-muted)]">{t("proficiency")}</p>
        </div>
      </div>

      <p className="mt-4 line-clamp-2 text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
        {t(`blurb_${cat.id}`)}
      </p>

      <ul className="mt-auto grid grid-cols-1 gap-x-6 gap-y-2.5 pt-5 sm:grid-cols-2">
        {items.slice(0, 6).map((s) => (
          <li key={s.name} className="min-w-0">
            <div className="flex items-center justify-between gap-2 text-sm">
              <span className="truncate text-[var(--text-primary)]">{s.name}</span>
              <span className="font-mono text-xs tabular-nums text-[var(--text-muted)]">{s.level}</span>
            </div>
            <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-[var(--glass-track)]">
              <div className="h-full rounded-full bg-[image:var(--gradient-line)]" style={{ width: `${s.level}%` }} />
            </div>
          </li>
        ))}
      </ul>
    </article>
  );
}
