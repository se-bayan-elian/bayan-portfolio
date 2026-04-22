"use client";

import { m, useReducedMotion } from "framer-motion";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";
import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export function RuntimeErrorContent({ error, reset }: Props) {
  const t = useTranslations("errors.runtime");
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="relative mx-auto flex min-h-[min(70vh,720px)] max-w-2xl flex-col items-center justify-center px-4 py-16 text-center">
      <m.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 24 }}
        className="glass-panel relative w-full overflow-hidden rounded-[2rem] px-8 py-12 shadow-xl"
      >
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_0%,color-mix(in_srgb,var(--accent)_18%,transparent),transparent_55%)]"
          aria-hidden
        />

        <div className="relative flex flex-col items-center gap-4">
          <m.div
            className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 text-amber-700 motion-reduce:animate-none dark:text-amber-200"
            initial={{ rotate: -4 }}
            animate={
              reducedMotion ? { rotate: 0 } : { rotate: [-4, 4, -4] }
            }
            transition={
              reducedMotion
                ? undefined
                : { duration: 4, repeat: Infinity, ease: "easeInOut" }
            }
          >
            <AlertTriangle className="h-12 w-12" aria-hidden />
          </m.div>

          <m.h1
            className="text-balance text-2xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-3xl"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {t("headline")}
          </m.h1>

          <p className="text-lg font-medium text-[var(--accent)]">{t("subhead")}</p>

          <m.p
            className="text-pretty text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.06 }}
          >
            {t("body")}
          </m.p>

          {process.env.NODE_ENV === "development" && error.message ? (
            <pre className="mt-2 max-h-32 w-full overflow-auto rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] p-3 text-start text-xs text-red-600 dark:text-red-400">
              {error.message}
            </pre>
          ) : null}

          <m.div
            className="mt-6 flex w-full flex-col gap-3 sm:flex-row sm:justify-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
          >
            <button
              type="button"
              onClick={() => reset()}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-[var(--accent-hover)]"
            >
              <RefreshCw className="h-4 w-4 shrink-0" aria-hidden />
              {t("retry")}
            </button>
            <Link
              href="/"
              className="glass-control inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl px-6 py-3 text-sm font-semibold text-[var(--text-primary)] transition hover:text-[var(--accent)]"
            >
              <Home className="h-4 w-4 shrink-0" aria-hidden />
              {t("cta_home")}
            </Link>
          </m.div>
        </div>
      </m.div>
    </div>
  );
}
