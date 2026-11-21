"use client";

import { m } from "framer-motion";
import { ArrowRight, Check, Clock3, Coffee, Copy, Globe2, Mail } from "lucide-react";
import { FaTelegramPlane } from "react-icons/fa";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { personal } from "@/data/personal";
import { Magnetic } from "@/components/motion/Magnetic";
import { Link } from "@/navigation";

/** Closing call-to-action: spotlight card that follows the cursor, availability + response promise. */
export function Contact() {
  const t = useTranslations("hire");
  const tCoffee = useTranslations("coffee_chat");
  const locale = useLocale();
  const cardRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [month, setMonth] = useState("");

  // Client-only so the static build never freezes an old month into the HTML.
  useEffect(() => {
    setMonth(new Intl.DateTimeFormat(locale, { month: "long", year: "numeric" }).format(new Date()));
  }, [locale]);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--spot-x", `${e.clientX - r.left}px`);
    el.style.setProperty("--spot-y", `${e.clientY - r.top}px`);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(personal.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = personal.social.email;
    }
  };

  return (
    <section className="mx-auto max-w-6xl px-4 py-20 md:px-6">
      <m.div
        ref={cardRef}
        onPointerMove={onMove}
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="hire-card card-surface relative overflow-hidden rounded-[2.5rem] px-6 py-14 text-center sm:px-12 md:py-20"
      >
        {/* cursor spotlight + slow conic halo */}
        <div className="hire-card__spot pointer-events-none absolute inset-0 -z-10" aria-hidden />
        <div className="hire-card__halo pointer-events-none absolute left-1/2 top-1/2 -z-20 h-[46rem] w-[46rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-3xl" aria-hidden />

        <div className="mx-auto flex max-w-3xl flex-col items-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/12 px-4 py-1.5 text-sm font-semibold text-emerald-700 ring-1 ring-emerald-500/30 dark:text-emerald-300">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60 motion-reduce:animate-none" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </span>
            {t("available")}
            {month ? <span className="font-normal opacity-80">· {month}</span> : null}
          </span>

          <h2 className="mt-7 text-balance text-4xl font-semibold leading-[1.08] tracking-tight text-[var(--text-primary)] sm:text-5xl md:text-6xl rtl:leading-[1.3]">
            {t("title")} <span className="text-gradient-hero">{t("title_accent")}</span>
          </h2>
          <p className="mt-5 max-w-xl text-pretty text-lg text-[var(--text-secondary)]">{t("subtitle")}</p>

          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
            <Magnetic>
              <Link
                href="/contact"
                className="btn-fx-primary group/go inline-flex min-h-14 items-center gap-2 overflow-hidden rounded-2xl bg-gradient-cta px-8 text-base font-semibold text-white"
              >
                {t("cta")}
                <ArrowRight className="h-5 w-5 transition-transform group-hover/go:translate-x-1 rtl:rotate-180 rtl:group-hover/go:-translate-x-1" aria-hidden />
              </Link>
            </Magnetic>
            <Link
              href="/contact?tab=coffee"
              className="glass-control inline-flex min-h-14 items-center gap-2 rounded-2xl px-7 text-base font-semibold"
            >
              <Coffee className="h-5 w-5 text-[var(--color-coffee)]" aria-hidden />
              {tCoffee("section_cta")}
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            <button
              type="button"
              onClick={copy}
              className="glass-control group/cp gap-2 px-4 py-2 text-sm font-medium"
              aria-live="polite"
            >
              <Mail className="h-4 w-4 text-[var(--accent)]" aria-hidden />
              <span dir="ltr">{personal.email}</span>
              {copied ? (
                <Check className="h-4 w-4 text-emerald-500" aria-hidden />
              ) : (
                <Copy className="h-3.5 w-3.5 opacity-60 group-hover/cp:opacity-100" aria-hidden />
              )}
              <span className="sr-only">{copied ? t("copied") : t("copy")}</span>
            </button>
            {personal.social.telegram?.trim() ? (
              <a
                href={personal.social.telegram.trim()}
                target="_blank"
                rel="noreferrer"
                className="glass-control gap-2 px-4 py-2 text-sm font-medium"
              >
                <FaTelegramPlane className="h-4 w-4 text-[#229ED9]" aria-hidden />
                Telegram
              </a>
            ) : null}
          </div>

          <ul className="mt-10 grid w-full max-w-2xl grid-cols-1 gap-3 text-sm sm:grid-cols-3">
            {[
              { Icon: Clock3, text: t("fact_reply") },
              { Icon: Globe2, text: t("fact_timezone") },
              { Icon: Check, text: t("fact_free") },
            ].map(({ Icon, text }) => (
              <li
                key={text}
                className="flex items-center justify-center gap-2 rounded-2xl border border-[var(--border)] bg-[var(--glass-track)] px-3 py-2.5 text-[var(--text-secondary)]"
              >
                <Icon className="h-4 w-4 shrink-0 text-[var(--accent)]" aria-hidden />
                {text}
              </li>
            ))}
          </ul>
        </div>
      </m.div>
    </section>
  );
}
