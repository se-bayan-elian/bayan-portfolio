"use client";

import { m, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
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

  return (
    <section className="relative overflow-hidden px-4 pb-16 pt-10 md:px-6 md:pb-24 md:pt-16">
      <div className="pointer-events-none absolute inset-0 -z-10 mesh-bg opacity-95 motion-reduce:animate-none" />
      <div className="pointer-events-none absolute -start-24 top-10 h-80 w-80 rounded-full bg-[var(--accent)]/25 blur-3xl" />
      <div className="pointer-events-none absolute -end-20 bottom-0 h-80 w-80 rounded-full bg-[var(--accent-2)]/20 blur-3xl" />
      <div className="pointer-events-none absolute start-1/2 top-1/3 h-64 w-64 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl dark:bg-cyan-400/5" />

      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[minmax(0,1.12fr)_minmax(0,0.72fr)] lg:gap-14">
        <div>
          <m.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="flex flex-wrap items-center gap-2"
          >
            <span className="glass-control inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium text-[var(--text-secondary)]">
              <Sparkles className="h-3.5 w-3.5 shrink-0 text-[var(--accent)]" aria-hidden />
              {t("greeting")}
            </span>

            <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[var(--accent)]/18 to-[var(--accent-2)]/12 px-3 py-1 text-xs font-semibold text-[var(--text-primary)] ring-1 ring-[var(--accent)]/20">
              <Clock className="h-3.5 w-3.5 shrink-0 text-[var(--accent)]" aria-hidden />
              {t("badge_years", { years })}
            </span>

            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)]/80 bg-[var(--glass-track)]/80 px-3 py-1 text-xs font-medium text-[var(--text-secondary)] backdrop-blur-sm">
              <Code2 className="h-3.5 w-3.5 shrink-0 text-[var(--accent)]" aria-hidden />
              {t("badge_stack")}
            </span>

            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)]/80 bg-[var(--glass-track)]/80 px-3 py-1 text-xs font-medium text-[var(--text-secondary)] backdrop-blur-sm">
              <Globe className="h-3.5 w-3.5 shrink-0 text-[var(--accent)]" aria-hidden />
              {t("badge_langs")}
            </span>

            {personal.available ? (
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                {t("available")}
              </span>
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
                className="text-gradient-hero block"
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
            className="mt-4 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] bg-clip-text text-lg font-semibold text-transparent sm:text-xl"
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
            <Link
              href="/projects"
              className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl bg-gradient-cta px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[var(--accent)]/30 transition hover:opacity-[0.92] hover:shadow-glow active:scale-[0.98]"
            >
              <Briefcase className="h-4 w-4 shrink-0 opacity-95" aria-hidden />
              <span className="sm:hidden">{t("cta_work_short")}</span>
              <span className="hidden sm:inline">{t("cta_work")}</span>
              <ArrowRight className="h-4 w-4 shrink-0 opacity-90 transition group-hover:translate-x-0.5" aria-hidden />
            </Link>
            <Link
              href="/contact"
              className="glass-control inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl px-6 py-3 text-sm font-semibold text-[var(--text-primary)] transition hover:text-[var(--accent)] active:scale-[0.98]"
            >
              <MessageCircle className="h-4 w-4 shrink-0" aria-hidden />
              <span className="sm:hidden">{t("cta_contact_short")}</span>
              <span className="hidden sm:inline">{t("cta_contact")}</span>
            </Link>
          </m.div>

          <m.div
            className="mt-8 flex flex-wrap gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45, duration: 0.4 }}
          >
            <a
              href={personal.social.github}
              target="_blank"
              rel="noreferrer"
              className="glass-control inline-flex h-11 w-11 text-[var(--text-secondary)] hover:shadow-glow"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href={personal.social.linkedin}
              target="_blank"
              rel="noreferrer"
              className="glass-control inline-flex h-11 w-11 text-[var(--text-secondary)] hover:shadow-glow"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href={personal.social.email}
              className="glass-control inline-flex h-11 w-11 text-[var(--text-secondary)] hover:shadow-glow"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </a>
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
