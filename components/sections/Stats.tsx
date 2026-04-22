"use client";

import { m } from "framer-motion";
import { Award, Clock, FolderKanban, Globe2 } from "lucide-react";
import { useLocale } from "next-intl";
import type { StatIconKey } from "@/data/stats";
import { stats } from "@/data/stats";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { glassCardHover, glassCardTap } from "@/lib/motion-variants";
import { useLiquidGlassPointer } from "@/lib/use-liquid-glass";
import type { Locale } from "@/i18n/routing";

const STAT_ICONS: Record<StatIconKey, typeof FolderKanban> = {
  projects: FolderKanban,
  experience: Clock,
  globe: Globe2,
  award: Award,
};

function labelFor(locale: Locale, s: (typeof stats)[number]) {
  if (locale === "ar") return s.labelAr;
  if (locale === "fr") return s.labelFr;
  return s.label;
}

export function Stats() {
  const locale = useLocale() as Locale;
  const liq = useLiquidGlassPointer();

  return (
    <section className="mx-auto max-w-6xl px-4 py-14 md:px-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => {
          const Icon = STAT_ICONS[s.iconKey];
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
              <div className="flex items-start justify-between gap-3">
                <p className="text-sm font-medium leading-snug text-[var(--text-muted)]">
                  {labelFor(locale, s)}
                </p>
                <span className="inline-flex shrink-0 rounded-xl bg-[color-mix(in_srgb,var(--accent)_14%,transparent)] p-2 text-[var(--accent)] ring-1 ring-[color-mix(in_srgb,var(--accent)_28%,transparent)]">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
              </div>
              <p className="mt-3 text-3xl font-bold tabular-nums">
                <AnimatedCounter
                  className="text-gradient-hero"
                  value={s.value}
                  suffix={s.suffix}
                />
              </p>
            </m.div>
          );
        })}
      </div>
    </section>
  );
}
