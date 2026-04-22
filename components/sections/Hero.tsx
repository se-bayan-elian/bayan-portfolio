"use client";

import { m, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Briefcase,
  Clock,
  Code2,
  Github,
  Globe,
  Linkedin,
  Mail,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { personal } from "@/data/personal";
import { pickStringList } from "@/lib/i18n-data";
import { Link } from "@/navigation";
import { TypingAnimation } from "@/components/ui/TypingAnimation";
import type { Locale } from "@/i18n/routing";

function displayName(locale: Locale) {
  if (locale === "ar") return personal.nameAr;
  if (locale === "fr") return personal.nameFr;
  return personal.name;
}

function displayTitle(locale: Locale) {
  if (locale === "ar") return personal.titleAr;
  if (locale === "fr") return personal.titleFr;
  return personal.title;
}

export function Hero() {
  const t = useTranslations("hero");
  const locale = useLocale() as Locale;
  const reducedMotion = useReducedMotion();
  const name = displayName(locale);
  const title = displayTitle(locale);
  const years = personal.yearsExperience;
  const taglines = pickStringList(
    locale,
    personal.taglines,
    personal.taglinesAr,
    personal.taglinesFr,
  );

  const letters = locale === "ar" ? null : name.split("");
  const MotionLink = m(Link);
  const badgeHover = reducedMotion ? undefined : { y: -4 };
  const badgeTap = reducedMotion ? undefined : { scale: 0.97 };
  const ctaHover = reducedMotion ? undefined : { y: -2, scale: 1.02 };
  const ctaTap = reducedMotion ? undefined : { scale: 0.98 };

  return (
    <section className="relative isolate overflow-hidden px-4 pb-16 pt-10 md:px-6 md:pb-24 md:pt-16">
      {/* Stack: grid lines → mesh → glows (all pointer-events-none, above page backdrop) */}
      <div className="hero-bg-grid pointer-events-none absolute inset-0 z-0" aria-hidden />
      <div className="hero-mesh-layer pointer-events-none absolute inset-0 z-[1] mesh-bg opacity-85 motion-reduce:animate-none" aria-hidden />
      <div className="pointer-events-none absolute -start-24 top-10 z-[2] h-80 w-80 rounded-full bg-[var(--accent)]/25 blur-3xl dark:bg-[var(--accent)]/22" aria-hidden />
      <div className="pointer-events-none absolute -end-20 bottom-0 z-[2] h-80 w-80 rounded-full bg-[var(--accent-2)]/20 blur-3xl dark:bg-[var(--accent-2)]/18" aria-hidden />
      <div
        className="pointer-events-none absolute start-1/2 top-1/3 z-[2] h-64 w-64 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl dark:bg-cyan-400/5"
        aria-hidden
      />

      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[minmax(0,1.12fr)_minmax(0,0.72fr)] lg:gap-14">
        <div>
          <m.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="flex flex-wrap items-center gap-2"
          >
            <m.span
              className="hero-badge-years group/badge inline-flex cursor-default items-center gap-2 rounded-full bg-gradient-to-r from-[var(--accent)]/18 to-[var(--accent-2)]/12 px-3 py-1 text-xs font-semibold text-[var(--text-primary)] ring-1 ring-[var(--accent)]/20"
              whileHover={badgeHover}
              whileTap={badgeTap}
              transition={{ type: "spring", stiffness: 420, damping: 26 }}
            >
              <Clock className="h-3.5 w-3.5 shrink-0 text-[var(--accent)] transition duration-300 group-hover/badge:-rotate-12 group-hover/badge:scale-110 motion-reduce:transition-none" aria-hidden />
              {t("badge_years", { years })}
            </m.span>

            <m.span
              className="group/badge inline-flex cursor-default items-center gap-2 rounded-full border border-[var(--border)]/80 bg-[var(--glass-track)]/80 px-3 py-1 text-xs font-medium text-[var(--text-secondary)] backdrop-blur-sm"
              whileHover={badgeHover}
              whileTap={badgeTap}
              transition={{ type: "spring", stiffness: 420, damping: 26 }}
            >
              <Code2 className="h-3.5 w-3.5 shrink-0 text-[var(--accent)] transition duration-300 group-hover/badge:rotate-6 group-hover/badge:scale-110 motion-reduce:transition-none" aria-hidden />
              {t("badge_stack")}
            </m.span>

            <m.span
              className="group/badge inline-flex cursor-default items-center gap-2 rounded-full border border-[var(--border)]/80 bg-[var(--glass-track)]/80 px-3 py-1 text-xs font-medium text-[var(--text-secondary)] backdrop-blur-sm"
              whileHover={badgeHover}
              whileTap={badgeTap}
              transition={{ type: "spring", stiffness: 420, damping: 26 }}
            >
              <Globe className="h-3.5 w-3.5 shrink-0 text-[var(--accent)] transition duration-300 group-hover/badge:-rotate-6 group-hover/badge:scale-110 motion-reduce:transition-none" aria-hidden />
              {t("badge_langs")}
            </m.span>

            {personal.available ? (
              <m.span
                className="hero-badge-available group/badge inline-flex cursor-default items-center gap-2 rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-900 dark:bg-emerald-500/15 dark:text-emerald-300"
                whileHover={badgeHover}
                whileTap={badgeTap}
                transition={{ type: "spring", stiffness: 420, damping: 26 }}
              >
                <span className="relative flex h-2.5 w-2.5 shrink-0">
                  <span className="hero-available-ping absolute inline-flex h-full w-full animate-ping rounded-full opacity-60 motion-reduce:animate-none" />
                  <span className="hero-available-dot relative m-auto inline-flex h-2 w-2 rounded-full" />
                </span>
                <BadgeCheck className="hero-available-icon h-3.5 w-3.5 shrink-0 text-emerald-700 transition duration-300 group-hover/badge:rotate-12 group-hover/badge:scale-110 dark:text-emerald-400 motion-reduce:transition-none" aria-hidden />
                {t("available")}
              </m.span>
            ) : null}
          </m.div>

          <m.h1
            className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl"
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: locale === "ar" ? 0 : 0.03 } },
            }}
          >
            {locale === "ar" ? (
              <m.span
                variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
                className="text-gradient-hero py-2 block"
              >
                {name}
              </m.span>
            ) : (
              <span className="text-gradient-hero flex flex-wrap gap-x-1">
                {letters?.map((char, i) => (
                  <m.span
                    key={`${char}-${i}`}
                    variants={{
                      hidden: { opacity: 0, y: 18 },
                      show: { opacity: 1, y: 0 },
                    }}
                    className="inline-block"
                  >
                    {char === " " ? "\u00A0" : char}
                  </m.span>
                ))}
              </span>
            )}
          </m.h1>

          <m.p
            className="hero-role-line mt-4 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] bg-clip-text text-lg font-semibold text-transparent sm:text-xl"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.4 }}
          >
            {title}
          </m.p>

          <m.div
            className="mt-4 min-h-[2.5rem] text-base text-[var(--text-secondary)] sm:text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <TypingAnimation phrases={taglines} />
          </m.div>

          <m.p
            className="mt-6 max-w-xl text-pretty text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, duration: 0.45 }}
          >
            {t("intro")}
          </m.p>

          <m.div
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.4 }}
          >
            <MotionLink
              href="/projects"
              className="btn-fx-primary hero-cta-primary group/cta relative inline-flex min-h-11 items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-cta px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[var(--accent)]/30 transition-[box-shadow] duration-300 hover:shadow-glow"
              whileHover={ctaHover}
              whileTap={ctaTap}
            >
              <Briefcase className="h-4 w-4 shrink-0 opacity-95 transition duration-300 group-hover/cta:-rotate-6 group-hover/cta:scale-110 motion-reduce:transition-none" aria-hidden />
              <span className="sm:hidden">{t("cta_work_short")}</span>
              <span className="hidden sm:inline">{t("cta_work")}</span>
              <ArrowRight className="h-4 w-4 shrink-0 opacity-90 transition duration-300 group-hover/cta:translate-x-1 rtl:rotate-180 rtl:group-hover/cta:-translate-x-1 motion-reduce:transition-none motion-reduce:group-hover/cta:translate-x-0 rtl:motion-reduce:group-hover/cta:-translate-x-0" aria-hidden />
            </MotionLink>
            <MotionLink
              href="/contact"
              className="btn-fx-glass group/cta glass-control relative inline-flex min-h-11 items-center justify-center gap-2 overflow-hidden rounded-2xl px-6 py-3 text-sm font-semibold text-[var(--text-primary)] transition-colors duration-300 hover:text-[var(--accent)]"
              whileHover={ctaHover}
              whileTap={ctaTap}
            >
              <MessageCircle className="h-4 w-4 shrink-0 transition duration-300 group-hover/cta:scale-110 motion-reduce:transition-none" aria-hidden />
              <span className="sm:hidden">{t("cta_contact_short")}</span>
              <span className="hidden sm:inline">{t("cta_contact")}</span>
            </MotionLink>
          </m.div>

          <m.div
            className="mt-8 flex flex-wrap gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45, duration: 0.4 }}
          >
            <m.a
              href={personal.social.github}
              target="_blank"
              rel="noreferrer"
              className="btn-fx-glass-icon glass-control relative inline-flex h-11 w-11 overflow-hidden text-[var(--text-secondary)] hover:text-[var(--accent)] hover:shadow-glow"
              aria-label="GitHub"
              whileHover={reducedMotion ? undefined : { y: -3, scale: 1.06 }}
              whileTap={reducedMotion ? undefined : { scale: 0.94 }}
              transition={{ type: "spring", stiffness: 400, damping: 22 }}
            >
              <Github className="h-5 w-5" />
            </m.a>
            <m.a
              href={personal.social.linkedin}
              target="_blank"
              rel="noreferrer"
              className="btn-fx-glass-icon glass-control relative inline-flex h-11 w-11 overflow-hidden text-[var(--text-secondary)] hover:text-[var(--accent)] hover:shadow-glow"
              aria-label="LinkedIn"
              whileHover={reducedMotion ? undefined : { y: -3, scale: 1.06 }}
              whileTap={reducedMotion ? undefined : { scale: 0.94 }}
              transition={{ type: "spring", stiffness: 400, damping: 22 }}
            >
              <Linkedin className="h-5 w-5" />
            </m.a>
            <m.a
              href={personal.social.email}
              className="btn-fx-glass-icon glass-control relative inline-flex h-11 w-11 overflow-hidden text-[var(--text-secondary)] hover:text-[var(--accent)] hover:shadow-glow"
              aria-label="Email"
              whileHover={reducedMotion ? undefined : { y: -3, scale: 1.06 }}
              whileTap={reducedMotion ? undefined : { scale: 0.94 }}
              transition={{ type: "spring", stiffness: 400, damping: 22 }}
            >
              <Mail className="h-5 w-5" />
            </m.a>
          </m.div>
        </div>

        <m.div
          className="relative mx-auto flex w-full max-w-[22rem] justify-center lg:mx-0 lg:max-w-none lg:justify-end"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 280, damping: 28, delay: 0.06 }}
        >
          <div className="relative isolate flex aspect-square w-full max-w-[min(22rem,88vw)] items-center justify-center sm:max-w-[min(24rem,80vw)]">
            <m.div
              className="pointer-events-none absolute inset-[-18%] -z-10 rounded-full bg-[radial-gradient(circle_at_40%_35%,color-mix(in_srgb,var(--accent)_45%,transparent),transparent_62%)] blur-3xl"
              animate={
                reducedMotion
                  ? undefined
                  : { opacity: [0.45, 0.72, 0.45], scale: [0.92, 1.08, 0.92] }
              }
              transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
            />
            <m.div
              className="pointer-events-none absolute inset-[-12%] -z-10 rounded-full bg-[radial-gradient(circle_at_65%_55%,color-mix(in_srgb,var(--accent-2)_38%,transparent),transparent_58%)] blur-2xl"
              animate={
                reducedMotion
                  ? undefined
                  : { opacity: [0.35, 0.55, 0.35], x: ["-3%", "3%", "-3%"], y: ["2%", "-2%", "2%"] }
              }
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            />

            <m.div
              className="relative w-[88%]"
              animate={reducedMotion ? undefined : { y: [0, -14, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <m.div
                className="relative overflow-hidden rounded-[2.25rem] shadow-[0_28px_80px_-24px_color-mix(in_srgb,var(--accent)_35%,transparent)] ring-2 ring-[var(--border)]/60 ring-offset-4 ring-offset-[var(--bg-primary)]"
                initial={{ opacity: 0, scale: 0.94, rotate: -3 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 22, delay: 0.12 }}
                whileHover={
                  reducedMotion
                    ? undefined
                    : { scale: 1.03, rotate: 1.5, transition: { type: "spring", stiffness: 380, damping: 22 } }
                }
              >
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[var(--accent)]/15 via-transparent to-[var(--accent-2)]/20" />
                <div className="relative aspect-square w-full">
                  <Image
                    src={personal.avatar}
                    alt={t("card_photo_alt")}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 320px, 384px"
                    priority
                  />
                </div>
              </m.div>
            </m.div>
          </div>
        </m.div>
      </div>
    </section>
  );
}
