"use client";

import { Sparkle } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { projects } from "@/data/projects";
import { projectLocalized } from "@/lib/project-localize";
import { Link } from "@/navigation";
import type { Locale } from "@/i18n/routing";

/** Social proof: an endless strip of real products shipped, each linking to its case study. */
export function ShippedStrip() {
  const t = useTranslations("process");
  const locale = useLocale() as Locale;
  const items = projects.map((p) => ({ slug: p.slug, title: projectLocalized(p, locale).title }));

  return (
    <section className="relative py-6" aria-label={t("shipped_label")}>
      <p className="mx-auto mb-4 max-w-6xl px-4 text-center text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)] md:px-6 rtl:tracking-normal">
        {t("shipped_label")}
      </p>
      <div className="testimonial-marquee overflow-hidden border-y border-[var(--border)]/70 bg-[var(--glass-track)]">
        <div className="testimonial-marquee__track flex w-max gap-5" style={{ animationDuration: "40s" }}>
          {[0, 1].map((copy) =>
            items.map((it) => (
              <Link
                key={`${copy}-${it.slug}`}
                href={`/projects/${it.slug}`}
                tabIndex={copy === 1 ? -1 : undefined}
                aria-hidden={copy === 1 ? true : undefined}
                className="group/sh flex shrink-0 items-center gap-5 py-1 text-lg font-semibold tracking-tight text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)] sm:text-xl"
              >
                <span className="whitespace-nowrap">{it.title}</span>
                <Sparkle className="h-4 w-4 text-[var(--accent)] transition-transform duration-500 group-hover/sh:rotate-90" aria-hidden />
              </Link>
            )),
          )}
        </div>
      </div>
    </section>
  );
}
