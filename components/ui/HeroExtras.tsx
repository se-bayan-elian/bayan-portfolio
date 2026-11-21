"use client";

import { ArrowUpRight, Trophy } from "lucide-react";
import { SiNestjs, SiNextdotjs, SiPostgresql, SiReact, SiTypescript } from "react-icons/si";
import { useTranslations } from "next-intl";
import { useId } from "react";
import { Link } from "@/navigation";

/** "Hi, I'm 👋" — the hand waves a few times on load (CSS only). */
export function HeroGreeting() {
  const t = useTranslations("hero");
  return (
    <p className="enter-up mt-6 flex items-center gap-2 text-base font-medium text-[var(--text-secondary)] sm:text-lg">
      {t("greeting")}
      <span className="hero-wave inline-block origin-[70%_70%]" role="img" aria-hidden>
        👋
      </span>
    </p>
  );
}

/** Hand-drawn underline that draws itself under a word. */
export function HandUnderline() {
  return (
    <svg
      className="hand-underline pointer-events-none absolute -bottom-2 start-0 h-3 w-full text-[var(--accent)]"
      viewBox="0 0 200 12"
      preserveAspectRatio="none"
      aria-hidden
    >
      <path
        d="M2 8.5C30 3.5 62 2.6 96 4.2c27 1.3 52 3.1 100 1.4"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        pathLength={1}
      />
    </svg>
  );
}

/** Proof chips under the CTAs: real, verifiable achievements. */
export function HeroProof() {
  const t = useTranslations("hero_extra");
  return (
    <ul className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-[var(--text-secondary)]">
      <li className="inline-flex items-center gap-1.5">
        <Trophy className="h-4 w-4 text-[var(--accent)]" aria-hidden />
        {t("proof_award")}
      </li>
      <li className="hidden h-1 w-1 rounded-full bg-[var(--border)] sm:block" aria-hidden />
      <li>{t("proof_products")}</li>
      <li className="hidden h-1 w-1 rounded-full bg-[var(--border)] sm:block" aria-hidden />
      <li>{t("proof_countries")}</li>
    </ul>
  );
}

/** Circular "Available for work" badge: text slowly rotates around an arrow link. */
export function AvailableBadge() {
  const t = useTranslations("hero_extra");
  const id = useId().replace(/:/g, "");
  const text = `${t("badge_ring")} ✦ `;
  return (
    <Link
      href="/contact"
      aria-label={t("badge_ring")}
      className="group/ring absolute -end-4 -top-4 z-20 flex h-28 w-28 items-center justify-center rounded-full bg-[var(--bg-card)] shadow-[var(--shadow)] ring-1 ring-[var(--border)] sm:-end-6 sm:-top-6"
    >
      <svg viewBox="0 0 100 100" className="ring-spin absolute inset-1 h-[calc(100%-0.5rem)] w-[calc(100%-0.5rem)]" aria-hidden>
        <defs>
          <path id={`ring-${id}`} d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
        </defs>
        <text className="fill-[var(--text-secondary)] text-[10px] font-semibold uppercase">
          {/* textLength stretches the label to exactly one lap, in any language */}
          <textPath href={`#ring-${id}`} textLength="236" lengthAdjust="spacing">
            {text}
          </textPath>
        </text>
      </svg>
      <span className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-gradient-cta">
        <ArrowUpRight className="h-5 w-5 transition-transform duration-500 group-hover/ring:rotate-45 rtl:-scale-x-100" aria-hidden />
      </span>
    </Link>
  );
}

/** One calm status pill (replaces the cluster of badges). */
export function StatusPill({ years }: { years: number }) {
  const t = useTranslations("hero");
  const tx = useTranslations("hero_extra");
  return (
    <span className="inline-flex items-center gap-2.5 rounded-full border border-[var(--border)] bg-[var(--bg-card)]/70 py-1.5 pe-4 ps-2 text-xs font-medium text-[var(--text-secondary)] backdrop-blur-sm">
      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-2 py-0.5 font-semibold text-emerald-600 dark:text-emerald-300">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70 motion-reduce:animate-none" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
        </span>
        {t("available")}
      </span>
      {tx("status_years", { years })}
    </span>
  );
}

const STACK = [
  { name: "Next.js", Icon: SiNextdotjs },
  { name: "NestJS", Icon: SiNestjs },
  { name: "React Native", Icon: SiReact },
  { name: "TypeScript", Icon: SiTypescript },
  { name: "PostgreSQL", Icon: SiPostgresql },
];

/** "Building with" — solid logo chips (inspired by integration pills). */
export function StackChips() {
  const t = useTranslations("hero_extra");
  return (
    <div>
      <p className="mb-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)] rtl:tracking-normal">
        {t("stack_label")}
      </p>
      <ul className="flex flex-wrap gap-2" dir="ltr">
        {STACK.map(({ name, Icon }) => (
          <li key={name} className="stack-chip">
            <span className="stack-chip__icon">
              <Icon className="h-3.5 w-3.5" aria-hidden />
            </span>
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
}
