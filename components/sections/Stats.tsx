"use client";

import { m } from "framer-motion";
import { Award, Clock, FolderKanban, Globe2 } from "lucide-react";
import { useLocale } from "next-intl";
import { useState } from "react";
import type { StatIconKey } from "@/data/stats";
import { stats } from "@/data/stats";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
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

  return (
    <section className="mx-auto max-w-6xl px-4 py-14 md:px-6">
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {stats.map((s, i) => (
          <StatCard key={s.label} s={s} i={i} label={labelFor(locale, s)} />
        ))}
      </div>
    </section>
  );
}

function StatCard({ s, i, label }: { s: (typeof stats)[number]; i: number; label: string }) {
  const Icon = STAT_ICONS[s.iconKey];
  const liq = useLiquidGlassPointer();
  // Re-mount the counter on hover so the number counts up again — playful, but nothing moves.
  const [run, setRun] = useState(0);

  return (
    <m.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.45, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
      onPointerMove={liq.onPointerMove}
      onPointerLeave={liq.onPointerLeave}
      onPointerEnter={() => setRun((r) => r + 1)}
      className="card-surface card-surface-glow group/stat relative overflow-hidden rounded-3xl p-5 sm:p-6"
    >
      {/* watermark icon: rotates + brightens in place */}
      <Icon
        className="pointer-events-none absolute -bottom-6 -end-6 h-28 w-28 text-[var(--accent)] opacity-[0.06] transition-all duration-700 ease-out group-hover/stat:rotate-[-14deg] group-hover/stat:opacity-[0.14] motion-reduce:transition-none"
        aria-hidden
      />

      <div className="flex items-center justify-between gap-3">
        <span className="relative inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl text-[var(--accent)] ring-1 ring-[color-mix(in_srgb,var(--accent)_30%,transparent)]">
          {/* fill rises from the bottom on hover */}
          <span className="absolute inset-0 origin-bottom scale-y-0 bg-[var(--accent)] transition-transform duration-500 ease-out group-hover/stat:scale-y-100 motion-reduce:transition-none" aria-hidden />
          <Icon className="relative h-5 w-5 transition-colors duration-300 group-hover/stat:text-[var(--bg-primary)]" aria-hidden />
        </span>
        <span className="font-mono text-xs text-[var(--text-muted)]">0{i + 1}</span>
      </div>

      <p className="mt-6 text-4xl font-bold tabular-nums tracking-tight text-[var(--text-primary)] sm:text-5xl">
        <AnimatedCounter key={run} value={s.value} suffix={s.suffix} />
      </p>
      <p className="mt-2 text-sm font-medium leading-snug text-[var(--text-secondary)]">{label}</p>
    </m.div>
  );
}
