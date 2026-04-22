"use client";

import { m } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { stats } from "@/data/stats";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { glassCardHover, glassCardTap } from "@/lib/motion-variants";
import { useLiquidGlassPointer } from "@/lib/use-liquid-glass";
import type { Locale } from "@/i18n/routing";

function labelFor(locale: Locale, s: (typeof stats)[number]) {
  if (locale === "ar") return s.labelAr;
  if (locale === "fr") return s.labelFr;
  return s.label;
}

export function Stats() {
  const locale = useLocale() as Locale;
  const tStats = useTranslations("stats");
  const liq = useLiquidGlassPointer();

  return (
    <section className="mx-auto max-w-6xl px-4 py-14 md:px-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => {
          const suffix =
            s.label === "Hackathon Awards" ? tStats("hackathon_suffix") : s.suffix;
          return (
            <m.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="card-surface card-surface-glow rounded-3xl p-6"
              onPointerMove={liq.onPointerMove}
              onPointerLeave={liq.onPointerLeave}
              whileHover={glassCardHover}
              whileTap={glassCardTap}
            >
              <p className="text-sm font-medium text-[var(--text-muted)]">{labelFor(locale, s)}</p>
              <p className="mt-3 text-3xl font-bold tabular-nums">
                <AnimatedCounter
                  className="text-gradient-hero"
                  value={s.value}
                  suffix={suffix}
                />
              </p>
            </m.div>
          );
        })}
      </div>
    </section>
  );
}
