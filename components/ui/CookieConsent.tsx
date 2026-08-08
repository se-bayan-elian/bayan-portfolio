"use client";

import { AnimatePresence, m } from "framer-motion";
import { useTranslations } from "next-intl";
import { useCookieConsent } from "@/hooks/useCookieConsent";
import { Link } from "@/navigation";

export function CookieConsent() {
  const t = useTranslations("cookie_consent");
  const { status, hydrated, setConsent } = useCookieConsent();
  const visible = hydrated && status === "unset";

  return (
    <AnimatePresence>
      {visible ? (
        <m.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.35 }}
          role="dialog"
          aria-label={t("message")}
          className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-xl rounded-2xl border border-[var(--border)] bg-[var(--glass-bg-strong)] p-5 shadow-2xl backdrop-blur-2xl sm:inset-x-auto sm:end-6 sm:bottom-6"
        >
          <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
            {t("message")}{" "}
            <Link
              href="/privacy"
              className="text-[var(--accent)] hover:underline"
            >
              {t("privacy_link")}
            </Link>
          </p>
          <div className="mt-4 flex flex-wrap gap-2.5">
            <button
              type="button"
              onClick={() => setConsent("granted")}
              className="rounded-xl bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[var(--accent-hover)]"
            >
              {t("accept")}
            </button>
            <button
              type="button"
              onClick={() => setConsent("denied")}
              className="glass-control px-4 py-2 text-sm font-semibold text-[var(--text-secondary)]"
            >
              {t("reject")}
            </button>
          </div>
        </m.div>
      ) : null}
    </AnimatePresence>
  );
}
