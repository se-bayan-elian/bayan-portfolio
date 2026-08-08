"use client";

import { m } from "framer-motion";
import { useTranslations } from "next-intl";

type Section = { heading: string; body: string };

type Props = { doc: "privacy" | "terms" };

export function LegalDocumentView({ doc }: Props) {
  const t = useTranslations(`legal.${doc}`);
  const meta = useTranslations("legal");
  const sections = t.raw("sections") as Section[];

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 md:px-6 md:py-16">
      <m.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-3xl font-semibold tracking-tight text-[var(--text-primary)] md:text-4xl">
          {t("title")}
        </h1>
        <p className="mt-2 text-sm text-[var(--text-muted)]">
          {meta("updated_label")}: {meta("updated_date")}
        </p>
        <p className="mt-6 text-[var(--text-secondary)] leading-relaxed">
          {t("intro")}
        </p>

        <div className="mt-10 space-y-8">
          {sections.map((section, i) => (
            <section
              key={i}
              className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-5 md:p-6"
            >
              <h2 className="text-lg font-semibold text-[var(--text-primary)]">
                {section.heading}
              </h2>
              <p className="mt-2 text-[var(--text-secondary)] leading-relaxed">
                {section.body}
              </p>
            </section>
          ))}
        </div>
      </m.div>
    </div>
  );
}
