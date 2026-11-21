"use client";

import { m } from "framer-motion";
import { Quote } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { testimonials, type Testimonial } from "@/data/testimonials";
import { pickStr } from "@/lib/locale-text";
import { cn } from "@/lib/utils";
import type { Locale } from "@/i18n/routing";

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function Testimonials() {
  const t = useTranslations("testimonials");
  const locale = useLocale() as Locale;

  const rowA = testimonials;
  const rowB = [...testimonials].reverse();

  return (
    <section className="py-16">
      <m.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
        className="mx-auto max-w-6xl px-4 md:px-6"
      >
        <h2 className="section-heading text-3xl font-semibold tracking-tight text-[var(--text-primary)]">{t("title")}</h2>
        <p className="mt-2 text-[var(--text-secondary)]">{t("subtitle")}</p>
      </m.div>

      {testimonials.length === 0 ? (
        <p className="card-surface mx-auto mt-8 max-w-6xl rounded-3xl px-6 py-10 text-center text-[var(--text-muted)]">
          {t("empty")}
        </p>
      ) : (
        <div className="mt-10 space-y-5">
          <MarqueeRow items={rowA} locale={locale} />
          <MarqueeRow items={rowB} locale={locale} reverse />
        </div>
      )}
    </section>
  );
}

/** Infinite, pausable marquee (pure CSS; respects reduced motion). */
function MarqueeRow({ items, locale, reverse = false }: { items: Testimonial[]; locale: Locale; reverse?: boolean }) {
  return (
    <div className="testimonial-marquee group/marquee overflow-hidden">
      <div className={cn("testimonial-marquee__track flex w-max gap-5", reverse && "testimonial-marquee__track--reverse")}>
        {[0, 1].map((copy) =>
          items.map((item) => (
            <figure
              key={`${copy}-${item.id}`}
              aria-hidden={copy === 1 ? true : undefined}
              className="card-surface card-surface-glow flex w-[min(24rem,82vw)] shrink-0 flex-col rounded-3xl p-6"
            >
              <Quote className="h-6 w-6 text-[var(--accent)] opacity-80" aria-hidden />
              <blockquote className="mt-3 line-clamp-5 text-sm leading-relaxed text-[var(--text-secondary)]">
                {pickStr(locale, item.quote, item.quoteAr, item.quoteFr)}
              </blockquote>
              <figcaption className="mt-auto flex items-center gap-3 pt-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-cta text-xs font-bold text-white">
                  {initials(item.author)}
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold text-[var(--text-primary)]">{item.author}</span>
                  <span className="block truncate text-xs text-[var(--text-muted)]">
                    {item.role} · {item.company}
                  </span>
                </span>
              </figcaption>
            </figure>
          )),
        )}
      </div>
    </div>
  );
}
