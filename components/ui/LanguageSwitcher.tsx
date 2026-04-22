"use client";

import { AnimatePresence, m } from "framer-motion";
import { Check, Languages } from "lucide-react";
import { useLocale } from "next-intl";
import { useEffect, useId, useRef, useState } from "react";
import { routing } from "@/i18n/routing";
import { usePathname, useRouter } from "@/navigation";
import { cn } from "@/lib/utils";

const labels: Record<string, string> = {
  en: "EN",
  ar: "عربي",
  fr: "FR",
};

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  return (
    <div className="relative" ref={rootRef}>
      <m.button
        type="button"
        className="group/lang glass-control inline-flex h-10 min-h-10 items-center gap-2 px-3 text-sm font-medium text-[var(--text-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
        aria-expanded={open}
        aria-controls={panelId}
        aria-haspopup="listbox"
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 420, damping: 28 }}
      >
        <Languages className="h-4 w-4 transition duration-300 group-hover/lang:rotate-12 motion-reduce:transition-none" aria-hidden />
        <span>{labels[locale] ?? locale.toUpperCase()}</span>
      </m.button>

      <AnimatePresence>
        {open && (
          <m.ul
            id={panelId}
            role="listbox"
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="glass-menu-panel absolute end-0 z-50 mt-2 min-w-[9rem] p-1 shadow-xl"
          >
            {routing.locales.map((l) => (
              <li key={l} role="option" aria-selected={l === locale}>
                <m.button
                  type="button"
                  className={cn(
                    "flex w-full items-center justify-between gap-2 rounded-xl px-3 py-2 text-start text-sm transition-colors hover:bg-[var(--accent-subtle)]",
                    l === locale && "bg-[var(--accent-subtle)] font-semibold",
                  )}
                  onClick={() => {
                    router.replace(pathname, { locale: l });
                    setOpen(false);
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                >
                  <span>{labels[l] ?? l}</span>
                  {l === locale ? (
                    <Check className="h-4 w-4 shrink-0 text-[var(--accent)]" aria-hidden />
                  ) : null}
                </m.button>
              </li>
            ))}
          </m.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
