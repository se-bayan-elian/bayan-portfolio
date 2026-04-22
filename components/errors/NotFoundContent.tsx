"use client";

import { m } from "framer-motion";
import { Coffee, Ghost, Home, Layers } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";

export function NotFoundContent() {
  const t = useTranslations("errors.not_found");

  return (
    <div className="relative mx-auto flex min-h-[min(70vh,720px)] max-w-2xl flex-col items-center justify-center px-4 py-16 text-center">
      <m.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
        className="glass-panel relative w-full overflow-hidden rounded-[2rem] px-8 py-12 shadow-xl"
      >
        <div
          className="pointer-events-none absolute -end-10 -top-10 h-40 w-40 rounded-full bg-[var(--accent)]/20 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-8 -start-8 h-36 w-36 rounded-full bg-[var(--accent-2)]/15 blur-3xl"
          aria-hidden
        />

        <div className="relative flex flex-col items-center gap-4">
          <m.div
            className="flex items-center gap-2 text-[var(--text-muted)]"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
          >
            <Ghost className="h-8 w-8 shrink-0 text-[var(--accent)]" aria-hidden />
            <Coffee className="h-6 w-6 shrink-0 opacity-70" aria-hidden />
          </m.div>

          <p className="text-gradient-hero font-mono text-7xl font-black tabular-nums tracking-tighter sm:text-8xl">
            {t("code")}
          </p>

          <m.h1
            className="text-balance text-2xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-3xl"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
          >
            {t("headline")}
          </m.h1>

          <m.p
            className="text-pretty text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18 }}
          >
            {t("body")}
          </m.p>

          <m.div
            className="mt-6 flex w-full flex-col gap-3 sm:flex-row sm:justify-center"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.24 }}
          >
            <Link
              href="/"
              className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl bg-gradient-cta px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[var(--accent)]/25 transition hover:opacity-95"
            >
              <Home className="h-4 w-4 shrink-0 transition group-hover:-rotate-6" aria-hidden />
              {t("cta_home")}
            </Link>
            <Link
              href="/projects"
              className="glass-control inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl px-6 py-3 text-sm font-semibold text-[var(--text-primary)] transition hover:text-[var(--accent)]"
            >
              <Layers className="h-4 w-4 shrink-0" aria-hidden />
              {t("cta_projects")}
            </Link>
          </m.div>
        </div>
      </m.div>
    </div>
  );
}
