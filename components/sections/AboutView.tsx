"use client";

import { m } from "framer-motion";
import {
  ArrowUpRight,
  Check,
  Copy,
  Download,
  Gauge,
  Layers3,
  MousePointerClick,
  Sparkles,
  Trophy,
} from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { personal } from "@/data/personal";
import { projects } from "@/data/projects";
import { specialties } from "@/data/specialties";
import { stats } from "@/data/stats";
import { EducationBlock } from "@/components/sections/EducationBlock";
import { Testimonials } from "@/components/sections/Testimonials";
import { Contact } from "@/components/sections/Contact";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { HeroTerminal } from "@/components/ui/HeroTerminal";
import { pickStr } from "@/lib/locale-text";
import { cn } from "@/lib/utils";
import type { Locale } from "@/i18n/routing";

type Props = { locale: Locale };

const ease = [0.22, 1, 0.36, 1] as const;
const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-8% 0px" },
  transition: { duration: 0.6, delay, ease },
});

export function AboutView({ locale }: Props) {
  const t = useTranslations("about");
  const tx = useTranslations("about_page");
  const [copied, setCopied] = useState(false);

  const name = pickStr(locale, personal.name, personal.nameAr, personal.nameFr);
  const bio = pickStr(locale, personal.bio, personal.bioAr, personal.bioFr);
  const [lead, ...story] = bio.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);
  const languages = locale === "ar" ? personal.languagesAr : locale === "fr" ? personal.languagesFr : personal.languages;
  const specs = locale === "ar" ? specialties.ar : locale === "fr" ? specialties.fr : specialties.en;
  const countries = stats.find((s) => s.iconKey === "globe");

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personal.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = personal.social.email;
    }
  };

  const principles = [
    { Icon: Layers3, title: tx("p1_title"), body: tx("p1_body") },
    { Icon: Gauge, title: tx("p2_title"), body: tx("p2_body") },
    { Icon: MousePointerClick, title: tx("p3_title"), body: tx("p3_body") },
  ];

  return (
    <div className="pb-6">
      {/* ── 1. Intro: statement + portrait with hand-placed stickers ── */}
      <section className="mx-auto grid max-w-6xl items-center gap-14 px-4 pt-10 md:px-6 md:pt-16 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        <div>
          <span className="enter-up inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--bg-card)]/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent)] rtl:tracking-normal">
            <Sparkles className="h-3.5 w-3.5" aria-hidden />
            {t("title")}
          </span>
          <h1
            className="enter-up mt-6 text-4xl font-semibold leading-[1.08] tracking-tight text-[var(--text-primary)] sm:text-5xl lg:text-[3.6rem] rtl:leading-[1.35]"
            style={{ "--enter-delay": "0.08s" } as React.CSSProperties}
          >
            {tx("headline_1")} <span className="hero-sticker">{tx("headline_mark")}</span> {tx("headline_2")}
          </h1>
          <p
            className="enter-up mt-7 max-w-xl text-pretty text-lg leading-relaxed text-[var(--text-secondary)]"
            style={{ "--enter-delay": "0.16s" } as React.CSSProperties}
          >
            {lead}
          </p>
          <div
            className="enter-up mt-9 flex flex-wrap items-center gap-x-6 gap-y-4"
            style={{ "--enter-delay": "0.24s" } as React.CSSProperties}
          >
            <a
              href={personal.resume}
              className="group/cv inline-flex min-h-12 items-center gap-2 rounded-full bg-gradient-cta px-7 text-sm font-semibold"
            >
              <Download className="h-4 w-4 transition-transform duration-300 group-hover/cv:translate-y-0.5" aria-hidden />
              {t("download_cv")}
            </a>
            <button type="button" onClick={copyEmail} className="hero-text-link inline-flex items-center gap-2 text-sm font-semibold text-[var(--text-primary)]" aria-live="polite">
              {copied ? <Check className="h-4 w-4 text-emerald-500" aria-hidden /> : <Copy className="h-4 w-4 text-[var(--accent)]" aria-hidden />}
              <span dir="ltr">{copied ? tx("copied") : personal.email}</span>
            </button>
          </div>
        </div>

        <div className="enter-up relative mx-auto w-full max-w-[22rem]" style={{ "--enter-delay": "0.1s" } as React.CSSProperties}>
          <div className="pointer-events-none absolute inset-[-14%] -z-10 rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--accent)_28%,transparent),transparent_62%)] blur-3xl" aria-hidden />
          <div className="relative rotate-[2deg] overflow-hidden rounded-[2rem] bg-[var(--bg-card)] p-2.5 shadow-[0_34px_70px_-30px_rgba(0,0,0,0.6)] ring-1 ring-[var(--glass-border)] rtl:-rotate-[2deg]">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem]">
              <Image src={personal.avatar} alt={name} fill priority quality={92} sizes="(max-width: 1024px) 88vw, 352px" className="object-cover object-[50%_28%]" />
            </div>
            <p className="px-2 pb-1 pt-3 text-center font-mono text-xs text-[var(--text-muted)]">{name} — {pickStr(locale, personal.title, personal.titleAr, personal.titleFr)}</p>
          </div>

          {/* stickers: slightly rotated, like they were placed by hand */}
          <Sticker className="-end-8 top-8 rotate-[5deg]" accent>
            {personal.yearsExperience}+ {tx("sticker_years")}
          </Sticker>
          {/* code snippet back on the photo — overlaps only the lower edge */}
          <div className="absolute -bottom-12 -start-8 z-20 sm:-start-14">
            <HeroTerminal />
          </div>
        </div>
      </section>

      {/* ── 2. Story ── */}
      {story.length > 0 ? (
        <section className="mx-auto mt-28 max-w-3xl px-4 md:px-6">
          <m.h2 {...reveal()} className="section-heading text-2xl font-semibold tracking-tight text-[var(--text-primary)] md:text-3xl">
            {tx("story_heading")}
          </m.h2>
          <div className="mt-8 space-y-6">
            {story.map((p, i) => (
              <m.p
                key={i}
                {...reveal(i * 0.06)}
                className={cn(
                  "text-pretty text-lg leading-[1.85] text-[var(--text-secondary)]",
                  i === 0 && "first-letter:float-start first-letter:me-3 first-letter:mt-1 first-letter:text-6xl first-letter:font-bold first-letter:leading-[0.8] first-letter:text-[var(--accent)]",
                )}
              >
                {p}
              </m.p>
            ))}
          </div>
        </section>
      ) : null}

      {/* ── 3. Bento: quick facts ── */}
      <section className="mx-auto mt-24 max-w-6xl px-4 md:px-6">
        <m.h2 {...reveal()} className="section-heading text-2xl font-semibold tracking-tight text-[var(--text-primary)] md:text-3xl">
          {tx("facts_heading")}
        </m.h2>
        <div className="mt-8 grid auto-rows-[minmax(9.5rem,auto)] grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          <m.div {...reveal(0)} className="card-surface card-surface-glow flex flex-col justify-between rounded-3xl p-5">
            <span className="text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">{tx("fact_years")}</span>
            <span className="text-5xl font-bold tabular-nums text-[var(--text-primary)]">
              <AnimatedCounter value={personal.yearsExperience} suffix="+" />
            </span>
          </m.div>
          <m.div {...reveal(0.05)} className="card-surface card-surface-glow flex flex-col justify-between rounded-3xl p-5">
            <span className="text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">{tx("fact_projects")}</span>
            <span className="text-5xl font-bold tabular-nums text-[var(--text-primary)]">
              <AnimatedCounter value={stats.find((x) => x.iconKey === "projects")?.value ?? 20} suffix="+" />
            </span>
          </m.div>

          {/* hackathon — the highlight tile */}
          <m.div
            {...reveal(0.1)}
            className="relative col-span-2 row-span-2 flex flex-col justify-between overflow-hidden rounded-3xl bg-[var(--accent)] p-6 text-[var(--bg-primary)] md:p-8"
          >
            <Trophy className="pointer-events-none absolute -bottom-8 -end-8 h-48 w-48 opacity-15" aria-hidden />
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-black/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider">
              <Trophy className="h-3.5 w-3.5" aria-hidden />
              {t("hackathon_title")}
            </span>
            <div>
              <p className="text-3xl font-bold leading-tight md:text-4xl">{tx("hackathon_big")}</p>
              <p className="mt-3 max-w-md text-sm leading-relaxed opacity-85 md:text-base">{t("hackathon_body")}</p>
            </div>
          </m.div>

          <m.div {...reveal(0.15)} className="card-surface card-surface-glow col-span-2 flex flex-col justify-between rounded-3xl p-5">
            <span className="text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">{t("specialties_heading")}</span>
            <ul className="mt-4 flex flex-wrap gap-2">
              {specs.map((s) => (
                <li key={s} className="rounded-full border border-[var(--border)] bg-[var(--glass-track)] px-3 py-1.5 text-sm font-medium text-[var(--text-primary)]">
                  {s}
                </li>
              ))}
            </ul>
          </m.div>

          <m.div {...reveal(0.2)} className="card-surface card-surface-glow flex flex-col justify-between rounded-3xl p-5">
            <span className="text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">{t("languages_label")}</span>
            <ul className="space-y-1 text-sm font-medium text-[var(--text-primary)]">
              {languages.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
          </m.div>
          <m.div {...reveal(0.25)} className="card-surface card-surface-glow flex flex-col justify-between rounded-3xl p-5">
            <span className="text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">{tx("fact_countries")}</span>
            <span className="text-5xl font-bold tabular-nums text-[var(--text-primary)]">
              <AnimatedCounter value={countries?.value ?? 5} suffix={countries?.suffix ?? "+"} />
            </span>
          </m.div>
        </div>
      </section>

      {/* ── 4. How I work ── */}
      <section className="mx-auto mt-24 max-w-6xl px-4 md:px-6">
        <m.h2 {...reveal()} className="section-heading text-2xl font-semibold tracking-tight text-[var(--text-primary)] md:text-3xl">
          {tx("principles_heading")}
        </m.h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {principles.map(({ Icon, title, body }, i) => (
            <m.div key={title} {...reveal(i * 0.08)} className="card-surface card-surface-glow group/pr relative overflow-hidden rounded-3xl p-6 md:p-7">
              <span className="font-mono text-6xl font-bold leading-none text-[var(--accent)] opacity-15 transition-opacity duration-500 group-hover/pr:opacity-30">
                0{i + 1}
              </span>
              <span className="mt-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--accent-subtle)] text-[var(--accent)] ring-1 ring-[color-mix(in_srgb,var(--accent)_30%,transparent)]">
                <Icon className="h-5 w-5 transition-transform duration-500 group-hover/pr:rotate-[-12deg]" aria-hidden />
              </span>
              <h3 className="mt-5 text-xl font-semibold text-[var(--text-primary)]">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">{body}</p>
            </m.div>
          ))}
        </div>
        <m.a
          {...reveal(0.1)}
          href={personal.social.linkedin}
          target="_blank"
          rel="noreferrer"
          className="hero-text-link mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[var(--text-primary)]"
        >
          <span>{tx("linkedin_cta")}</span>
          <ArrowUpRight className="h-4 w-4 text-[var(--accent)] rtl:-scale-x-100" aria-hidden />
        </m.a>
      </section>

      {/* ── 5. Education, testimonials, CTA ── */}
      <div className="mt-12">
        <EducationBlock locale={locale} />
      </div>
      <Testimonials />
      <Contact />
    </div>
  );
}

function Sticker({ children, className, accent = false }: { children: React.ReactNode; className?: string; accent?: boolean }) {
  return (
    <span
      className={cn(
        "absolute z-10 inline-flex items-center gap-2 whitespace-nowrap rounded-2xl px-3.5 py-2 text-sm font-semibold shadow-[0_14px_30px_-16px_rgba(0,0,0,0.55)] ring-1",
        accent
          ? "bg-[var(--accent)] text-[var(--bg-primary)] ring-transparent"
          : "bg-[var(--bg-card)] text-[var(--text-primary)] ring-[var(--border)]",
        className,
      )}
    >
      {children}
    </span>
  );
}
