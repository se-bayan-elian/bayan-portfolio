"use client";

import { m } from "framer-motion";
import { useTranslations } from "next-intl";
import { skills } from "@/data/skills";
import { SkillBar } from "@/components/ui/SkillBar";
import { glassCardHover, glassCardTap } from "@/lib/motion-variants";
import { useLiquidGlassPointer } from "@/lib/use-liquid-glass";
import { Link } from "@/navigation";
import type { Skill } from "@/data/skills";

const order: Skill["category"][] = [
  "frontend",
  "backend",
  "mobile",
  "database",
  "devops",
  "tools",
];

function titleCase(cat: string) {
  return cat.replace("-", " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

type SkillsProps = { featuredOnly?: boolean };

export function Skills({ featuredOnly = false }: SkillsProps) {
  const t = useTranslations("skills");
  const liq = useLiquidGlassPointer();
  const source = featuredOnly ? skills.filter((s) => s.featured) : skills;
  const grouped = order.map((cat) => ({
    cat,
    items: source.filter((s) => s.category === cat),
  }));

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
        <p className="mt-2 max-w-2xl text-[var(--text-secondary)]">{t("subtitle")}</p>
      </m.div>

      {featuredOnly ? (
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {source.map((s, i) => (
            <m.div
              key={s.name}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8% 0px" }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="card-surface card-surface-glow rounded-3xl p-5"
              onPointerMove={liq.onPointerMove}
              onPointerLeave={liq.onPointerLeave}
              whileHover={glassCardHover}
              whileTap={glassCardTap}
            >
              <SkillBar name={s.name} level={s.level} />
              <p className="mt-2 text-xs text-[var(--text-muted)]">
                {s.yearsOfExperience} {t("years_short")}
              </p>
            </m.div>
          ))}
        </div>
      ) : null}

      {featuredOnly ? (
        <div className="mt-8 flex justify-center">
          <Link
            href="/skills"
            className="inline-flex rounded-2xl border border-[var(--border)] bg-[var(--bg-card)]/95 px-5 py-2.5 text-sm font-semibold text-[var(--text-primary)] shadow-sm transition hover:border-[var(--accent-2)]/40 hover:text-[var(--accent)] hover:shadow-glow"
          >
            {t("explore_all")}
          </Link>
        </div>
      ) : null}

      {!featuredOnly ? (
        <div className="mt-10 grid gap-10 lg:grid-cols-2">
          {grouped.map(
            (g, gi) =>
              g.items.length > 0 && (
                <m.div
                  key={g.cat}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-8% 0px" }}
                  transition={{ duration: 0.4, delay: gi * 0.05 }}
                  className="card-surface card-surface-glow rounded-3xl p-6"
                  onPointerMove={liq.onPointerMove}
                  onPointerLeave={liq.onPointerLeave}
                  whileHover={glassCardHover}
                  whileTap={glassCardTap}
                >
                  <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                    {titleCase(g.cat)}
                  </h3>
                  <div className="mt-5 space-y-4">
                    {g.items.map((s) => (
                      <SkillBar key={s.name} name={s.name} level={s.level} />
                    ))}
                  </div>
                </m.div>
              ),
          )}
        </div>
      ) : null}
    </section>
  );
}
