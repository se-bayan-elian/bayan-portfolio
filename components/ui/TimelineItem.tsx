"use client";

import { m } from "framer-motion";
import { Braces, Home, Radio } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import type { Experience } from "@/data/experience";
import type { Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

type Props = {
  item: Experience;
  index: number;
  locale: Locale;
  company: string;
  role: string;
  description: string;
  responsibilities: string[];
};

export function TimelineItem({
  item,
  index,
  locale,
  company,
  role,
  description,
  responsibilities,
}: Props) {
  const t = useTranslations("experience");
  const isEven = index % 2 === 0;
  const dateRange = formatRange(item.startDate, item.endDate, item.current, t);

  return (
    <m.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "relative grid gap-4 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:items-start",
      )}
    >
      <m.div
        className={cn(
          "md:pt-1",
          isEven ? "md:col-start-1 md:row-start-1 md:text-end" : "md:col-start-3 md:row-start-1 md:text-start",
        )}
        initial={{ opacity: 0, x: isEven ? -20 : 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
      >
        <div className="inline-block w-full max-w-xl rounded-2xl card-surface p-6 text-start transition hover:border-[var(--accent)]/35">
          <div className="flex items-start gap-3">
            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-[var(--bg-secondary)]">
              <Image
                src={item.companyLogo}
                alt=""
                fill
                className="object-cover"
                sizes="48px"
              />
            </div>
            <div className="min-w-0">
              <h3 className="text-lg font-semibold text-[var(--text-primary)]">{role}</h3>
              <p className="text-sm text-[var(--accent)]">{company}</p>
              <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                {description}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {item.current && (
                  <span className="group/cur inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-xs font-medium text-emerald-700 transition duration-300 hover:scale-105 dark:text-emerald-300 motion-reduce:transition-none motion-reduce:hover:scale-100">
                    <Radio className="h-3 w-3 shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden />
                    {t("current")}
                  </span>
                )}
                {item.remote && (
                  <span className="group/rem inline-flex items-center gap-1 rounded-full bg-[var(--accent-subtle)] px-2.5 py-0.5 text-xs font-medium text-[var(--text-primary)] transition duration-300 hover:scale-105 motion-reduce:transition-none motion-reduce:hover:scale-100">
                    <Home className="h-3 w-3 shrink-0 opacity-80 transition group-hover/rem:rotate-12 motion-reduce:transition-none" aria-hidden />
                    {t("remote")}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </m.div>

      <div className="relative hidden md:col-start-2 md:row-start-1 md:flex md:flex-col md:items-center md:px-2">
        <div className="absolute inset-y-0 w-px bg-[var(--border)]" aria-hidden />
        <div className="relative z-[1] mt-8 h-3.5 w-3.5 shrink-0 rounded-full border-2 border-[var(--accent)] bg-[var(--bg-primary)] shadow-[0_0_0_6px_var(--accent-subtle)]" />
      </div>

      <m.div
        className={cn(
          "md:pt-1",
          isEven ? "md:col-start-3 md:row-start-1" : "md:col-start-1 md:row-start-1",
        )}
        initial={{ opacity: 0, x: isEven ? 20 : -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
      >
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)]/70 p-5 backdrop-blur-sm">
          <p className="text-sm font-medium text-[var(--text-muted)]">{dateRange}</p>
          <p className="mt-3 text-sm font-semibold text-[var(--text-primary)]">
            {t("responsibilities")}
          </p>
          <ul
            className={cn(
              "mt-2 space-y-1.5 text-sm text-[var(--text-secondary)] ps-6 list-disc"
,
            )}
          >
            {responsibilities.slice(0, 5).map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
          <p className="mt-4 text-sm font-semibold text-[var(--text-primary)]">{t("tech")}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {item.techUsed.map((tech) => (
              <span
                key={tech}
                className="group/t inline-flex items-center gap-1 rounded-full bg-[var(--accent-subtle)] px-2.5 py-0.5 text-xs text-[var(--text-primary)] transition duration-300 hover:bg-[color-mix(in_srgb,var(--accent)_22%,transparent)] hover:shadow-sm motion-reduce:transition-none"
              >
                <Braces className="h-3 w-3 shrink-0 opacity-60 transition group-hover/t:opacity-100 motion-reduce:transition-none" aria-hidden />
                {tech}
              </span>
            ))}
          </div>
        </div>
      </m.div>
    </m.article>
  );
}

function formatRange(
  start: string,
  end: string | null,
  current: boolean,
  t: (k: string) => string,
) {
  const endLabel = current ? t("current") : end ?? "";
  return `${start} — ${endLabel}`;
}
