"use client";

import { AnimatePresence, LayoutGroup, m } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { navLinks } from "@/data/navigation";
import { personal } from "@/data/personal";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { ThemeSwitcher } from "@/components/ui/ThemeSwitcher";
import { Link, usePathname } from "@/navigation";
import { cn } from "@/lib/utils";

export function Navbar() {
  const t = useTranslations();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <m.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="pointer-events-none fixed inset-x-0 top-0 z-50"
    >
      <div className="pointer-events-auto mx-auto w-full max-w-6xl px-3 pt-3 md:px-4 md:pt-4">
        <div className="glass-nav-shell">
          <div className="flex min-h-12 items-center justify-between gap-2 px-2.5 py-1.5 sm:min-h-14 sm:px-3 sm:py-2">
            <Link
              href="/"
              className="flex min-w-0 items-center gap-2.5 font-semibold tracking-tight text-[var(--text-primary)]"
              onClick={() => setOpen(false)}
            >
              <span
                className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/20 bg-gradient-to-br from-[var(--accent)]/30 to-[var(--accent-2)]/20 text-xs font-bold text-[var(--accent)] shadow-sm ring-1 ring-inset ring-white/30 dark:border-white/10 dark:ring-white/5"
                aria-hidden
              >
                <span className="absolute inset-0 bg-gradient-to-t from-white/0 via-white/25 to-white/10 opacity-60" />
                <span className="relative">BE</span>
              </span>
              <span className="hidden min-w-0 truncate sm:inline">{personal.name.split(" ")[0]}</span>
            </Link>

            <div className="hidden min-w-0 flex-1 justify-center md:flex">
              <LayoutGroup id="main-nav-pill">
                <nav className="glass-nav-track inline-flex max-w-full items-center gap-0.5 p-1 [direction:inherit]">
                  {navLinks.map((item) => {
                    const active =
                      item.href === "/"
                        ? pathname === "/"
                        : pathname === item.href || pathname.startsWith(`${item.href}/`);
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          "relative z-0 rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200",
                          active
                            ? "text-[var(--text-primary)]"
                            : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]",
                        )}
                      >
                        {active ? (
                          <m.span
                            layoutId="nav-liquid-pill"
                            className="glass-pill-active absolute inset-0 -z-10 rounded-lg"
                            transition={{ type: "spring", stiffness: 400, damping: 33 }}
                            aria-hidden
                          />
                        ) : null}
                        <span className="relative z-10">{t(item.labelKey as "nav.home")}</span>
                      </Link>
                    );
                  })}
                </nav>
              </LayoutGroup>
            </div>

            <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
              <LanguageSwitcher />
              <ThemeSwitcher />
              <button
                type="button"
                className="glass-control inline-flex h-10 w-10 md:hidden"
                aria-expanded={open}
                aria-controls="mobile-nav"
                onClick={() => setOpen((v) => !v)}
              >
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                <span className="sr-only">Menu</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {open ? (
          <m.div
            id="mobile-nav"
            key="nav-drawer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-auto mx-auto w-full max-w-6xl overflow-hidden px-3 md:hidden"
          >
            <div className="glass-menu-panel mt-2 p-2">
              <div className="flex flex-col gap-0.5">
                {navLinks.map((item) => {
                  const active =
                    item.href === "/"
                      ? pathname === "/"
                      : pathname === item.href || pathname.startsWith(`${item.href}/`);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "rounded-xl px-3 py-2.5 text-sm font-medium transition",
                        active
                          ? "bg-[var(--glass-track)] text-[var(--text-primary)] ring-1 ring-inset ring-[var(--glass-border)]"
                          : "text-[var(--text-secondary)] hover:bg-[var(--glass-track)] hover:text-[var(--text-primary)]",
                      )}
                    >
                      {t(item.labelKey as "nav.home")}
                    </Link>
                  );
                })}
              </div>
            </div>
          </m.div>
        ) : null}
      </AnimatePresence>
    </m.header>
  );
}
