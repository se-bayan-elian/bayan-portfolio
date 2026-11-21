"use client";

import { m } from "framer-motion";
import { Briefcase } from "lucide-react";
import { useTranslations } from "next-intl";
import { experiences } from "@/data/experience";
import { personal } from "@/data/personal";
import { Experience } from "@/components/sections/Experience";
import { EducationBlock } from "@/components/sections/EducationBlock";
import { Contact } from "@/components/sections/Contact";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import type { Locale } from "@/i18n/routing";

/** Every technology used across roles, weighted by how many roles used it. */
function techCloud() {
  const counts = new Map<string, number>();
  for (const e of experiences) for (const t of e.techUsed) counts.set(t, (counts.get(t) ?? 0) + 1);
  return [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
}

export function ExperiencePageView({ locale }: { locale: Locale }) {
  const tx = useTranslations("experience_page");
  const cloud = techCloud();
  const max = cloud[0]?.[1] ?? 1;
  const remote = experiences.filter((e) => e.remote).length;

  const counters = [
    { value: personal.yearsExperience, suffix: "+", label: tx("stat_years") },
    { value: experiences.length, suffix: "", label: tx("stat_roles") },
    { value: remote, suffix: "", label: tx("stat_remote") },
  ];

  return (
    <>
      <section className="mx-auto max-w-6xl px-4 pt-10 md:px-6 md:pt-16">
        <span className="enter-up inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--bg-card)]/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent)] rtl:tracking-normal">
          <Briefcase className="h-3.5 w-3.5" aria-hidden />
          {tx("eyebrow")}
        </span>
        <div className="mt-6 grid items-end gap-10 lg:grid-cols-[minmax(0,1fr)_auto]">
          <div>
            <h1
              className="enter-up text-4xl font-semibold leading-[1.08] tracking-tight text-[var(--text-primary)] sm:text-5xl lg:text-6xl rtl:leading-[1.35]"
              style={{ "--enter-delay": "0.08s" } as React.CSSProperties}
            >
              {tx("headline_1")} <span className="hero-sticker">{tx("headline_mark")}</span>
            </h1>
            <p className="enter-up mt-5 max-w-2xl text-lg text-[var(--text-secondary)]" style={{ "--enter-delay": "0.14s" } as React.CSSProperties}>
              {tx("subtitle")}
            </p>
          </div>
          <dl className="enter-up grid grid-cols-3 gap-6" style={{ "--enter-delay": "0.2s" } as React.CSSProperties}>
            {counters.map((c) => (
              <div key={c.label}>
                <dd className="text-5xl font-bold leading-none tabular-nums text-[var(--text-primary)]">
                  <AnimatedCounter value={c.value} suffix={c.suffix} />
                </dd>
                <dt className="mt-2 text-xs font-medium text-[var(--text-muted)]">{c.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <div className="mt-10">
        <Experience showViewAll={false} hideHeader />
      </div>

      {/* Tech cloud: size = how many roles used it */}
      <section className="mx-auto max-w-6xl px-4 md:px-6">
        <m.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="card-surface rounded-[2rem] p-6 md:p-10"
        >
          <h2 className="section-heading text-2xl font-semibold tracking-tight text-[var(--text-primary)]">{tx("cloud_heading")}</h2>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">{tx("cloud_body")}</p>
          <ul className="mt-8 flex flex-wrap items-center gap-2.5" dir="ltr">
            {cloud.map(([name, n], i) => {
              const weight = n / max;
              return (
                <m.li
                  key={name}
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.03 }}
                  className="rounded-full border px-4 py-2 font-semibold"
                  style={{
                    fontSize: `${0.8 + weight * 0.55}rem`,
                    borderColor: `color-mix(in srgb, var(--accent) ${Math.round(weight * 55)}%, var(--border))`,
                    background: `color-mix(in srgb, var(--accent) ${Math.round(weight * 14)}%, transparent)`,
                    color: weight > 0.6 ? "var(--text-primary)" : "var(--text-secondary)",
                  }}
                >
                  {name}
                  <span className="ms-2 font-mono text-[0.7em] text-[var(--text-muted)]">×{n}</span>
                </m.li>
              );
            })}
          </ul>
        </m.div>
      </section>

      <div className="mt-6">
        <EducationBlock locale={locale} />
      </div>
      <Contact />
    </>
  );
}
