"use client";

import { AnimatePresence, LayoutGroup, m } from "framer-motion";
import {
  BriefcaseBusiness,
  Code2,
  Home,
  Layers,
  Mail,
  Menu,
  UserRound,
  X,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { navLinks } from "@/data/navigation";
import { BayanLogo } from "@/components/brand/BayanLogo";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { ThemeSwitcher } from "@/components/ui/ThemeSwitcher";
import { Link, usePathname } from "@/navigation";
import { cn } from "@/lib/utils";

const navIcon = {
  "/": Home,
  "/about": UserRound,
  "/projects": Layers,
  "/skills": Code2,
  "/experience": BriefcaseBusiness,
  "/contact": Mail,
} as const;

export function Navbar() {
  const t = useTranslations();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <m.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="pointer-events-none fixed inset-x-0 top-0 z-50 w-full min-w-0"
    >
      <div className="pointer-events-auto mx-auto w-full min-w-0 max-w-full pt-3 sm:px-4 md:px-4 md:pt-4 lg:max-w-6xl">
        <div className="glass-nav-shell w-full min-w-0">
          <div className="flex w-full min-w-0 min-h-12 items-center justify-between gap-2 px-2.5 py-1.5 sm:min-h-14 sm:px-3 sm:py-2">
            <Link
              href="/"
              className="flex min-w-0 flex-1 items-center gap-2 overflow-hidden font-semibold tracking-tight text-[var(--text-primary)]"
              onClick={() => setOpen(false)}
            >
              <span className="flex sm:hidden">
                <BayanLogo variant="mark" />
              </span>
              <span className="hidden min-w-0 sm:flex">
                <BayanLogo variant="horizontal" />
              </span>
            </Link>

            <div className="hidden min-w-0 flex-1 justify-center lg:flex">
              <LayoutGroup id="main-nav-pill">
                <nav className="glass-nav-track inline-flex max-w-full items-center gap-0.5 p-1 [direction:inherit]">
                  {navLinks.map((item) => {
                    const active =
                      item.href === "/"
                        ? pathname === "/"
                        : pathname === item.href || pathname.startsWith(`${item.href}/`);
                    const Icon = navIcon[item.href as keyof typeof navIcon];
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          "group/nav relative z-0 inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200",
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
                        <Icon
                          className={cn(
                            "relative z-10 h-4 w-4 shrink-0 transition duration-300 motion-reduce:transition-none",
                            active
                              ? "text-[var(--accent)]"
                              : "opacity-75 group-hover/nav:opacity-100 group-hover/nav:scale-110",
                          )}
                          aria-hidden
                        />
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
              <m.button
                type="button"
                className="glass-control inline-flex h-10 w-10 lg:hidden"
                aria-expanded={open}
                aria-controls="mobile-nav"
                onClick={() => setOpen((v) => !v)}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                transition={{ type: "spring", stiffness: 460, damping: 28 }}
              >
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                <span className="sr-only">Menu</span>
              </m.button>
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
            className="pointer-events-auto mx-auto w-full min-w-0 max-w-full overflow-hidden px-3 sm:px-4 md:hidden lg:max-w-6xl"
          >
            <div className="glass-menu-panel mt-2 p-2">
              <div className="flex flex-col gap-0.5">
                {navLinks.map((item) => {
                  const active =
                    item.href === "/"
                      ? pathname === "/"
                      : pathname === item.href || pathname.startsWith(`${item.href}/`);
                  const Icon = navIcon[item.href as keyof typeof navIcon];
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition active:scale-[0.99]",
                        active
                          ? "bg-[var(--glass-track)] text-[var(--text-primary)] ring-1 ring-inset ring-[var(--glass-border)]"
                          : "text-[var(--text-secondary)] hover:bg-[var(--glass-track)] hover:text-[var(--text-primary)]",
                      )}
                    >
                      <Icon
                        className={cn(
                          "h-4 w-4 shrink-0 transition duration-300 motion-reduce:transition-none",
                          active ? "text-[var(--accent)]" : "opacity-75",
                        )}
                        aria-hidden
                      />
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
