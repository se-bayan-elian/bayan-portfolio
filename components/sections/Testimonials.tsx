"use client";

import { m } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { testimonials } from "@/data/testimonials";
import { pickStr } from "@/lib/locale-text";
import { glassCardHover, glassCardTap } from "@/lib/motion-variants";
import { useLiquidGlassPointer } from "@/lib/use-liquid-glass";
import type { Locale } from "@/i18n/routing";

export function Testimonials() {
  const t = useTranslations("testimonials");
  const locale = useLocale() as Locale;
  const liq = useLiquidGlassPointer();

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 md:px-6">
      <m.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
      >
        <h2 className="section-heading text-3xl font-semibold tracking-tight text-[var(--text-primary)]">
          {t("title")}
        </h2>
        <p className="mt-2 text-[var(--text-secondary)]">{t("subtitle")}</p>
      </m.div>

      {testimonials.length === 0 ? (
        <m.p
          className="card-surface card-surface-glow mt-8 rounded-3xl px-6 py-10 text-center text-[var(--text-muted)]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          onPointerMove={liq.onPointerMove}
          onPointerLeave={liq.onPointerLeave}
          whileHover={glassCardHover}
          whileTap={glassCardTap}
        >
          <span className="relative z-[3] block">{t("empty")}</span>
        </m.p>
      ) : (
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {testimonials.map((item, i) => (
            <m.blockquote
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              className="card-surface card-surface-glow rounded-3xl p-6"
              onPointerMove={liq.onPointerMove}
              onPointerLeave={liq.onPointerLeave}
              whileHover={glassCardHover}
              whileTap={glassCardTap}
            >
              <p className="text-[var(--text-secondary)]">
                “{pickStr(locale, item.quote, item.quoteAr, item.quoteFr)}”
              </p>
              <footer className="mt-4 text-sm font-semibold text-[var(--text-primary)]">
                {item.author}
                <span className="block text-xs font-normal text-[var(--text-muted)]">
                  {item.role} · {item.company}
                </span>
              </footer>
            </m.blockquote>
          ))}
        </div>
      )}
    </section>
  );
}
