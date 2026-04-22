"use client";

import { AnimatePresence, m } from "framer-motion";
import { Palette } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useId, useRef, useState } from "react";
import { useThemeContext } from "@/components/providers/ThemeProvider";
import type { ThemeName } from "@/types";
import { cn } from "@/lib/utils";

const swatches: { id: ThemeName; color: string }[] = [
  { id: "light", color: "#0f766e" },
  { id: "dark", color: "#2dd4bf" },
  { id: "dracula", color: "#50fa7b" },
  { id: "nord", color: "#88c0d0" },
  { id: "solarized", color: "#268bd2" },
];

export function ThemeSwitcher() {
  const t = useTranslations("theme");
  const { theme, setTheme, mounted } = useThemeContext();
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

  if (!mounted) {
    return (
      <span className="glass-control inline-flex h-10 w-10 items-center justify-center" />
    );
  }

  return (
    <div className="relative" ref={rootRef}>
      <m.button
        type="button"
        className="group/theme glass-control inline-flex h-10 w-10 items-center justify-center text-[var(--text-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
        aria-expanded={open}
        aria-controls={panelId}
        aria-haspopup="dialog"
        onClick={() => setOpen((v) => !v)}
        title={t("label")}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.93 }}
        transition={{ type: "spring", stiffness: 440, damping: 26 }}
      >
        <Palette className="h-5 w-5 transition duration-300 group-hover/theme:rotate-12 motion-reduce:transition-none motion-reduce:group-hover/theme:rotate-0" aria-hidden />
        <span className="sr-only">{t("label")}</span>
      </m.button>

      <AnimatePresence>
        {open && (
          <m.div
            id={panelId}
            role="dialog"
            aria-label={t("label")}
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="glass-menu-panel absolute end-0 z-50 mt-2 w-56 p-3 shadow-xl"
          >
            <p className="mb-2 px-1 text-xs font-medium text-[var(--text-muted)]">
              {t("label")}
            </p>
            <div className="grid grid-cols-5 gap-2">
              {swatches.map((s) => (
                <m.button
                  key={s.id}
                  type="button"
                  title={t(s.id)}
                  onClick={() => {
                    setTheme(s.id);
                    setOpen(false);
                  }}
                  className={cn(
                    "relative h-9 w-9 rounded-full border-2 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]",
                    theme === s.id
                      ? "border-[var(--text-primary)] shadow-lg"
                      : "border-transparent hover:border-[var(--border)]",
                  )}
                  style={{ background: s.color }}
                  whileHover={{ scale: 1.12 }}
                  whileTap={{ scale: 0.94 }}
                  transition={{ type: "spring", stiffness: 400, damping: 22 }}
                >
                  <span className="sr-only">{t(s.id)}</span>
                </m.button>
              ))}
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
