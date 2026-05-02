"use client";

import { AnimatePresence, m } from "framer-motion";
import { Briefcase, Coffee, Github, Linkedin, Mail } from "lucide-react";
import { FaTelegramPlane } from "react-icons/fa";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { personal } from "@/data/personal";
import { ContactForm } from "@/components/contact/ContactForm";
import { CoffeeChatForm } from "@/components/contact/CoffeeChatForm";
import { cn } from "@/lib/utils";

function profileHandle(url: string) {
  try {
    const { pathname } = new URL(url);
    const parts = pathname.split("/").filter(Boolean);
    return parts[parts.length - 1] ?? url;
  } catch {
    return url;
  }
}

type Tab = "work" | "coffee";

export function ContactPageView({ defaultTab = "work" }: { defaultTab?: Tab }) {
  const t = useTranslations("contact");
  const tCoffee = useTranslations("coffee_chat");
  const telegramUrl = personal.social.telegram?.trim();
  const [activeTab, setActiveTab] = useState<Tab>(defaultTab);

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    {
      id: "work",
      label: t("tab_work"),
      icon: <Briefcase className="h-4 w-4 shrink-0" aria-hidden />,
    },
    {
      id: "coffee",
      label: tCoffee("tab_label"),
      icon: <Coffee className="h-4 w-4 shrink-0" aria-hidden />,
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
      <m.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-3xl font-semibold tracking-tight text-[var(--text-primary)] md:text-4xl">
          {t("title")}
        </h1>
        <p className="mt-2 max-w-2xl text-[var(--text-secondary)]">{t("subtitle")}</p>
      </m.div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-start">
        {/* Sidebar */}
        <m.aside
          className="rounded-3xl card-surface p-6 md:p-8"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
        >
          <dl className="space-y-5">
            <div>
              <dt className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">
                <Mail className="h-4 w-4 text-[var(--accent)]" aria-hidden />
                {t("email")}
              </dt>
              <dd className="mt-2">
                <a
                  href={personal.social.email}
                  className="text-sm font-semibold text-[var(--text-primary)] transition-colors hover:text-[var(--accent)]"
                >
                  {personal.email}
                </a>
              </dd>
            </div>

            {telegramUrl ? (
              <div>
                <dt className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">
                  <FaTelegramPlane className="h-4 w-4 text-[#229ED9]" aria-hidden />
                  {t("telegram")}
                </dt>
                <dd className="mt-2">
                  <a
                    href={telegramUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-semibold text-[var(--text-primary)] transition-colors hover:text-[#229ED9]"
                  >
                    {profileHandle(telegramUrl)}
                  </a>
                </dd>
              </div>
            ) : null}

            <div>
              <dt className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">
                <Github className="h-4 w-4 text-[var(--accent)]" aria-hidden />
                {t("github")}
              </dt>
              <dd className="mt-2">
                <a
                  href={personal.social.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-semibold text-[var(--text-primary)] transition-colors hover:text-[var(--accent)]"
                >
                  {profileHandle(personal.social.github)}
                </a>
              </dd>
            </div>

            <div>
              <dt className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">
                <Linkedin className="h-4 w-4 text-[var(--accent)]" aria-hidden />
                {t("linkedin")}
              </dt>
              <dd className="mt-2">
                <a
                  href={personal.social.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-semibold text-[var(--text-primary)] transition-colors hover:text-[var(--accent)]"
                >
                  {profileHandle(personal.social.linkedin)}
                </a>
              </dd>
            </div>

            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">
                {t("status")}
              </dt>
              <dd className="mt-2 inline-flex items-center gap-2 rounded-full border border-[color-mix(in_srgb,var(--accent)_28%,var(--border))] bg-[var(--accent-subtle)] px-3 py-1 text-sm font-semibold text-[var(--text-primary)] ring-1 ring-[var(--accent)]/12">
                <span className="relative flex h-2.5 w-2.5 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)]/40 opacity-70 motion-reduce:hidden" aria-hidden />
                  <span className="relative m-auto h-2 w-2 rounded-full bg-[var(--accent)]" aria-hidden />
                </span>
                {t("status_open")}
              </dd>
            </div>

            {/* Coffee chat hint */}
            <div className="rounded-2xl border border-[color-mix(in_srgb,var(--color-coffee)_28%,var(--border))] bg-[color-mix(in_srgb,var(--color-coffee)_8%,var(--bg-primary))] p-4">
              <p className="flex items-center gap-2 text-xs font-semibold text-[var(--color-coffee)]">
                <Coffee className="h-3.5 w-3.5 shrink-0" aria-hidden />
                {tCoffee("sidebar_hint_title")}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-[var(--text-muted)]">
                {tCoffee("sidebar_hint_body")}
              </p>
            </div>
          </dl>
        </m.aside>

        {/* Tab area */}
        <m.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {/* Tab switcher */}
          <div
            className="mb-6 flex gap-1 rounded-2xl border border-[var(--border)] bg-[var(--bg-primary)] p-1"
            role="tablist"
            aria-label={t("tabs_label")}
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "relative flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors duration-200",
                  activeTab === tab.id
                    ? "text-white"
                    : "text-[var(--text-muted)] hover:text-[var(--text-primary)]",
                )}
              >
                {activeTab === tab.id && (
                  <m.span
                    layoutId="contact-tab-bg"
                    className={cn(
                      "absolute inset-0 rounded-xl",
                      tab.id === "coffee" ? "bg-[var(--color-coffee)]" : "bg-[var(--accent)]",
                    )}
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  {tab.icon}
                  {tab.label}
                </span>
              </button>
            ))}
          </div>

          {/* Tab content */}
          <AnimatePresence mode="wait">
            <m.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
            >
              {activeTab === "work" ? <ContactForm /> : <CoffeeChatForm />}
            </m.div>
          </AnimatePresence>
        </m.div>
      </div>
    </div>
  );
}
