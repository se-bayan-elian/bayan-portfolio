"use client";

import { AnimatePresence, m } from "framer-motion";
import { Check, Palette } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useId, useRef, useState } from "react";
import { useThemeContext } from "@/components/providers/ThemeProvider";
import type { ThemeName } from "@/types";
import { cn } from "@/lib/utils";

/** Preview colors for each theme: page background, card, accent, secondary accent. */
const swatches: { id: ThemeName; bg: string; card: string; a: string; b: string }[] = [
  { id: "light", bg: "#f5f1ea", card: "#fffdf9", a: "#c2410c", b: "#a16207" },
  { id: "dark", bg: "#131211", card: "#1f1d1b", a: "#ff8552", b: "#e9b949" },
  { id: "dracula", bg: "#282a36", card: "#343746", a: "#50fa7b", b: "#bd93f9" },
  { id: "nord", bg: "#2e3440", card: "#3b4252", a: "#88c0d0", b: "#b48ead" },
  { id: "solarized", bg: "#fdf6e3", card: "#eee8d5", a: "#268bd2", b: "#2aa198" },
  { id: "payload", bg: "#000000", card: "#121214", a: "#3b82f6", b: "#8b5cf6" },
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
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  if (!mounted) {
    return <span className="glass-control inline-flex h-10 w-10 items-center justify-center" />;
  }

  const current = swatches.find((s) => s.id === theme);

  return (
    <div className="relative" ref={rootRef}>
      <m.button
        type="button"
        className="group/theme glass-control relative inline-flex h-10 w-10 items-center justify-center text-[var(--text-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
        aria-expanded={open}
        aria-controls={panelId}
        aria-haspopup="dialog"
        onClick={() => setOpen((v) => !v)}
        title={t("label")}
        whileTap={{ scale: 0.93 }}
        transition={{ type: "spring", stiffness: 440, damping: 26 }}
      >
        <Palette className="h-5 w-5 transition duration-300 group-hover/theme:rotate-12 motion-reduce:transition-none motion-reduce:group-hover/theme:rotate-0" aria-hidden />
        {current ? (
          <span
            className="absolute bottom-1.5 end-1.5 h-2 w-2 rounded-full ring-2 ring-[var(--bg-primary)]"
            style={{ background: current.a }}
            aria-hidden
          />
        ) : null}
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
            className="glass-menu-panel absolute end-0 z-50 mt-2 w-[17rem] p-2.5 shadow-xl"
          >
            <p className="mb-2 px-1.5 text-xs font-medium text-[var(--text-muted)]">{t("label")}</p>
            <div className="grid grid-cols-2 gap-1.5" role="radiogroup" aria-label={t("label")}>
              {swatches.map((s) => {
                const active = theme === s.id;
                return (
                  <button
                    key={s.id}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    onClick={() => {
                      setTheme(s.id);
                      setOpen(false);
                    }}
                    className={cn(
                      "group/sw flex items-center gap-2.5 rounded-xl border p-1.5 pe-2 text-start text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--accent)]",
                      active
                        ? "border-[color-mix(in_srgb,var(--accent)_55%,var(--border))] bg-[var(--accent-subtle)] text-[var(--text-primary)]"
                        : "border-transparent text-[var(--text-secondary)] hover:border-[var(--border)] hover:bg-[var(--glass-track)] hover:text-[var(--text-primary)]",
                    )}
                  >
                    {/* Mini preview: page bg, a card, and both accents */}
                    <span
                      className="relative flex h-8 w-10 shrink-0 items-end gap-0.5 overflow-hidden rounded-lg p-1 ring-1 ring-black/10 transition-transform duration-200 group-hover/sw:scale-105"
                      style={{ background: s.bg }}
                      aria-hidden
                    >
                      <span className="h-3.5 flex-1 rounded-[3px]" style={{ background: s.card }} />
                      <span className="flex flex-col gap-0.5">
                        <span className="h-1.5 w-1.5 rounded-full" style={{ background: s.a }} />
                        <span className="h-1.5 w-1.5 rounded-full" style={{ background: s.b }} />
                      </span>
                    </span>
                    <span className="min-w-0 flex-1 truncate">{t(s.id)}</span>
                    {active ? <Check className="h-3.5 w-3.5 shrink-0 text-[var(--accent)]" aria-hidden /> : null}
                  </button>
                );
              })}
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
