"use client";

import type React from "react";
import { m, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Coffee,
  Github,
  Linkedin,
  Mail,
  MessageCircle,
} from "lucide-react";
import Image from "next/image";
import { FaTelegramPlane } from "react-icons/fa";
import { useLocale, useTranslations } from "next-intl";
import { personal } from "@/data/personal";
import { pickStringList } from "@/lib/i18n-data";
import { Link } from "@/navigation";
import { TypingAnimation } from "@/components/ui/TypingAnimation";
import { HeroTerminal } from "@/components/ui/HeroTerminal";
import { AvailableBadge, HeroGreeting, StackChips, StatusPill } from "@/components/ui/HeroExtras";
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
  const tCoffee = useTranslations("coffee_chat");
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
  const ctaTap = reducedMotion ? undefined : { scale: 0.98 };

  return (
    <section
      // Pull the hero (and its grid / glow backdrop) up behind the fixed navbar so the
      // top of the page reads as one surface instead of a separate band above the hero.
      className="relative isolate -mt-[5.25rem] overflow-hidden pb-14 pt-[6.25rem] sm:-mt-[5.5rem] sm:pt-[6.5rem] md:pb-20 md:pt-[7rem] lg:flex lg:min-h-[100svh] lg:items-center lg:pb-16 lg:pt-[5.5rem]"
    >
      {/* Stack: grid lines → mesh → glows (all pointer-events-none, above page backdrop) */}
      <div className="hero-bg-grid pointer-events-none absolute inset-0 z-0" aria-hidden />
      <div className="hero-mesh-layer pointer-events-none absolute inset-0 z-[1] mesh-bg opacity-85 motion-reduce:animate-none" aria-hidden />
      <div className="pointer-events-none absolute -start-24 top-10 z-[2] h-80 w-80 rounded-full bg-[var(--accent)]/25 blur-3xl dark:bg-[var(--accent)]/22" aria-hidden />
      <div className="pointer-events-none absolute -end-20 bottom-0 z-[2] h-80 w-80 rounded-full bg-[var(--accent-2)]/20 blur-3xl dark:bg-[var(--accent-2)]/18" aria-hidden />
      <div
        className="pointer-events-none absolute start-1/2 top-1/3 z-[2] h-64 w-64 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl dark:bg-cyan-400/5"
        aria-hidden
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 md:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.12fr)_minmax(0,0.72fr)] lg:gap-14">
          <div>
          <div className="enter-up">
            <StatusPill years={years} />
          </div>

          <HeroGreeting />
          <h1
            className="mt-1 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl"
          >
            {locale === "ar" ? (
              <span className="enter-up block py-2 text-[var(--text-primary)]">{name}</span>
            ) : (
              <span className="flex flex-wrap text-[var(--text-primary)]">
                {letters?.map((char, i) => (
                  <span
                    key={`${char}-${i}`}
                    className="enter-up inline-block"
                    style={{ "--enter-delay": `${i * 0.03}s` } as React.CSSProperties}
                  >
                    {char === " " ? "\u00A0" : char}
                  </span>
                ))}
              </span>
            )}
          </h1>

          <m.p
            className="enter-up hero-role-line mt-4 text-lg font-semibold sm:text-xl"
            style={{ "--enter-delay": "0.15s" } as React.CSSProperties}
          >
            <span className="hero-sticker">{title}</span>
          </m.p>

          <m.div
            className="enter-up mt-4 min-h-[2.5rem] text-base text-[var(--text-secondary)] sm:text-lg"
            style={{ "--enter-delay": "0.2s" } as React.CSSProperties}
          >
            <TypingAnimation phrases={taglines} />
          </m.div>

          <m.p
            className="enter-up mt-6 max-w-xl text-pretty text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base"
            style={{ "--enter-delay": "0.28s" } as React.CSSProperties}
          >
            {t("intro")}
          </m.p>

          <div
            className="enter-up mt-8 flex flex-wrap items-center gap-x-6 gap-y-4"
            style={{ "--enter-delay": "0.35s" } as React.CSSProperties}
          >
            <MotionLink
              href="/projects"
              className="hero-cta-primary group/cta relative inline-flex min-h-12 items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-cta px-7 py-3 text-sm font-semibold"
              whileTap={ctaTap}
            >
              {t("cta_work")}
              <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover/cta:translate-x-1 rtl:rotate-180 rtl:group-hover/cta:-translate-x-1 motion-reduce:transition-none" aria-hidden />
            </MotionLink>
            <Link href="/contact" className="hero-text-link group/l inline-flex items-center gap-2 text-sm font-semibold text-[var(--text-primary)]">
              <MessageCircle className="h-4 w-4 text-[var(--accent)]" aria-hidden />
              <span>{t("cta_contact")}</span>
            </Link>
            <Link href="/contact?tab=coffee" className="hero-text-link group/l inline-flex items-center gap-2 text-sm font-semibold text-[var(--text-secondary)]">
              <Coffee className="h-4 w-4 text-[var(--color-coffee)] transition-transform duration-300 group-hover/l:rotate-12" aria-hidden />
              <span>{tCoffee("cta_hero")}</span>
            </Link>
          </div>

          <div
            className="enter-up mt-10 flex flex-wrap items-end justify-between gap-x-6 gap-y-5"
            style={{ "--enter-delay": "0.45s" } as React.CSSProperties}
          >
          <StackChips />
          <m.div className="flex flex-wrap gap-2">
            <m.a
              href={personal.social.github}
              target="_blank"
              rel="noreferrer"
              className="btn-fx-glass-icon glass-control relative inline-flex h-9 w-9 overflow-hidden text-[var(--text-secondary)] hover:text-[var(--accent)] hover:shadow-glow"
              aria-label="GitHub"
              whileTap={reducedMotion ? undefined : { scale: 0.94 }}
              transition={{ type: "spring", stiffness: 400, damping: 22 }}
            >
              <Github className="h-4 w-4" />
            </m.a>
            <m.a
              href={personal.social.linkedin}
              target="_blank"
              rel="noreferrer"
              className="btn-fx-glass-icon glass-control relative inline-flex h-9 w-9 overflow-hidden text-[var(--text-secondary)] hover:text-[var(--accent)] hover:shadow-glow"
              aria-label="LinkedIn"
              whileTap={reducedMotion ? undefined : { scale: 0.94 }}
              transition={{ type: "spring", stiffness: 400, damping: 22 }}
            >
              <Linkedin className="h-4 w-4" />
            </m.a>
            <m.a
              href={personal.social.email}
              className="btn-fx-glass-icon glass-control relative inline-flex h-9 w-9 overflow-hidden text-[var(--text-secondary)] hover:text-[var(--accent)] hover:shadow-glow"
              aria-label="Email"
              whileTap={reducedMotion ? undefined : { scale: 0.94 }}
              transition={{ type: "spring", stiffness: 400, damping: 22 }}
            >
              <Mail className="h-4 w-4" />
            </m.a>
            {personal.social.telegram?.trim() ? (
              <m.a
                href={personal.social.telegram.trim()}
                target="_blank"
                rel="noreferrer"
                className="btn-fx-glass-icon glass-control relative inline-flex h-9 w-9 overflow-hidden text-[#229ED9] hover:text-[#1f8fc7] hover:shadow-glow"
                aria-label="Telegram"
                whileTap={reducedMotion ? undefined : { scale: 0.94 }}
                transition={{ type: "spring", stiffness: 400, damping: 22 }}
              >
                <FaTelegramPlane className="h-4 w-4" />
              </m.a>
            ) : null}
          </m.div>
          </div>
          </div>

          <m.div
          className="enter-up relative mx-auto flex w-full max-w-[22rem] justify-center lg:mx-0 lg:max-w-none lg:justify-end"
          style={{ "--enter-delay": "0.06s" } as React.CSSProperties}
        >
          <div className="relative isolate flex w-full max-w-[min(23rem,88vw)] flex-col items-center sm:max-w-[min(25rem,80vw)] lg:max-w-[min(25rem,calc((100svh-13rem)*0.8))] lg:items-end">
            {/* soft warm glow behind the photo (never on top of it) */}
            <div
              className="pointer-events-none absolute inset-[-12%] -z-10 rounded-full bg-[radial-gradient(circle_at_50%_40%,color-mix(in_srgb,var(--accent)_32%,transparent),transparent_62%)] blur-3xl"
              aria-hidden
            />

            <div className="relative w-full">
              <div className="relative overflow-hidden rounded-[2rem] bg-[var(--bg-secondary)] shadow-[0_30px_70px_-30px_rgba(0,0,0,0.65)] ring-1 ring-[var(--glass-border)]">
                <div className="relative aspect-[4/5] w-full">
                  <Image
                    src={personal.avatar}
                    alt={t("card_photo_alt")}
                    fill
                    priority
                    quality={92}
                    className="object-cover object-[50%_28%]"
                    sizes="(max-width: 640px) 88vw, (max-width: 1024px) 400px, 440px"
                  />
                </div>
              </div>
              {personal.available ? <AvailableBadge /> : null}
            </div>

            {/* terminal sits under the photo, overlapping only its bottom edge */}
            <div className="relative z-20 -mt-24 w-fit self-center sm:-mt-28 lg:-mt-[38%] lg:-ms-20 lg:self-start rtl:lg:-me-20 rtl:lg:ms-0">
              <HeroTerminal />
            </div>
          </div>
          </m.div>
        </div>
      </div>
    </section>
  );
}
