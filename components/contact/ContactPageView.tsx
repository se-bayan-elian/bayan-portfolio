"use client";

import { AnimatePresence, m } from "framer-motion";
import { ArrowUpRight, Briefcase, Check, Coffee, Copy, Github, Linkedin, Mail, MessageSquareText, PhoneCall, Rocket } from "lucide-react";
import { FaTelegramPlane } from "react-icons/fa";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { personal } from "@/data/personal";
import { ContactForm } from "@/components/contact/ContactForm";
import { CoffeeChatForm } from "@/components/contact/CoffeeChatForm";
import { cn } from "@/lib/utils";

function profileHandle(url: string) {
  try {
    const parts = new URL(url).pathname.split("/").filter(Boolean);
    return parts[parts.length - 1] ?? url;
  } catch {
    return url;
  }
}

type Tab = "work" | "coffee";

export function ContactPageView({ defaultTab = "work" }: { defaultTab?: Tab }) {
  const t = useTranslations("contact");
  const tCoffee = useTranslations("coffee_chat");
  const tx = useTranslations("contact_page");
  const telegramUrl = personal.social.telegram?.trim();
  const [activeTab, setActiveTab] = useState<Tab>(defaultTab);
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personal.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = personal.social.email;
    }
  };

  const channels = [
    ...(telegramUrl ? [{ href: telegramUrl, label: t("telegram"), value: `@${profileHandle(telegramUrl)}`, Icon: FaTelegramPlane, tint: "#229ED9", hint: tx("fastest") }] : []),
    { href: personal.social.linkedin, label: t("linkedin"), value: profileHandle(personal.social.linkedin), Icon: Linkedin, tint: "#0A66C2", hint: null },
    { href: personal.social.github, label: t("github"), value: profileHandle(personal.social.github), Icon: Github, tint: "var(--text-primary)", hint: null },
  ];

  const steps = [
    { Icon: MessageSquareText, title: tx("s1_title"), body: tx("s1_body") },
    { Icon: PhoneCall, title: tx("s2_title"), body: tx("s2_body") },
    { Icon: Rocket, title: tx("s3_title"), body: tx("s3_body") },
  ];

  const tabs: { id: Tab; label: string; Icon: typeof Briefcase }[] = [
    { id: "work", label: t("tab_work"), Icon: Briefcase },
    { id: "coffee", label: tCoffee("tab_label"), Icon: Coffee },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 pt-10 md:px-6 md:pt-16">
      {/* Header */}
      <span className="enter-up inline-flex items-center gap-2.5 rounded-full border border-[var(--border)] bg-[var(--bg-card)]/70 py-1.5 pe-4 ps-2 text-xs font-medium text-[var(--text-secondary)]">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-2 py-0.5 font-semibold text-emerald-600 dark:text-emerald-300">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70 motion-reduce:animate-none" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
          </span>
          {t("status_open")}
        </span>
        {tx("reply_time")}
      </span>
      <h1
        className="enter-up mt-6 max-w-3xl text-4xl font-semibold leading-[1.08] tracking-tight text-[var(--text-primary)] sm:text-5xl lg:text-6xl rtl:leading-[1.35]"
        style={{ "--enter-delay": "0.08s" } as React.CSSProperties}
      >
        {tx("headline_1")} <span className="hero-sticker">{tx("headline_mark")}</span>
      </h1>
      <p className="enter-up mt-5 max-w-2xl text-lg text-[var(--text-secondary)]" style={{ "--enter-delay": "0.14s" } as React.CSSProperties}>
        {t("subtitle")}
      </p>

      <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
        {/* Left: channels + what happens next */}
        <div className="enter-up space-y-4" style={{ "--enter-delay": "0.2s" } as React.CSSProperties}>
          {/* Email = hero tile with copy */}
          <div className="card-surface card-surface-glow rounded-3xl p-5">
            <div className="flex items-center gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[var(--accent)] text-[var(--bg-primary)]">
                <Mail className="h-5 w-5" aria-hidden />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">{t("email")}</p>
                <a href={personal.social.email} className="block truncate text-lg font-semibold text-[var(--text-primary)]" dir="ltr">
                  {personal.email}
                </a>
              </div>
              <button type="button" onClick={copyEmail} className="glass-control h-10 shrink-0 gap-1.5 px-3 text-xs font-semibold" aria-live="polite">
                {copied ? <Check className="h-4 w-4 text-emerald-500" aria-hidden /> : <Copy className="h-4 w-4" aria-hidden />}
                {copied ? tx("copied") : tx("copy")}
              </button>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {channels.map(({ href, label, value, Icon, tint, hint }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="card-surface card-surface-glow group/ch relative flex flex-col gap-3 rounded-2xl p-4"
              >
                <div className="flex items-center justify-between">
                  <Icon className="h-5 w-5" style={{ color: tint }} aria-hidden />
                  <ArrowUpRight className="h-4 w-4 text-[var(--text-muted)] transition-transform duration-300 group-hover/ch:rotate-45 group-hover/ch:text-[var(--accent)] rtl:-scale-x-100" aria-hidden />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-[var(--text-primary)]">{label}</p>
                  <p className="truncate text-xs text-[var(--text-muted)]" dir="ltr">
                    {value}
                  </p>
                </div>
                {hint ? (
                  <span className="absolute end-3 top-3 hidden rounded-full bg-[#229ED9]/15 px-2 py-0.5 text-[0.65rem] font-semibold text-[#229ED9] xl:inline">
                    {hint}
                  </span>
                ) : null}
              </a>
            ))}
          </div>

          {/* What happens next */}
          <div className="card-surface rounded-3xl p-6">
            <p className="text-sm font-semibold text-[var(--text-primary)]">{tx("next_heading")}</p>
            <ol className="relative mt-5 space-y-5 before:absolute before:bottom-3 before:start-[1.05rem] before:top-3 before:w-px before:bg-[var(--border)]">
              {steps.map(({ Icon, title, body }, i) => (
                <li key={title} className="relative flex gap-4">
                  <span className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--bg-card)] text-[var(--accent)]">
                    <Icon className="h-4 w-4" aria-hidden />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-[var(--text-primary)]">
                      <span className="me-2 font-mono text-xs text-[var(--accent)]">0{i + 1}</span>
                      {title}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-[var(--text-secondary)]">{body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Right: form card with segmented tabs */}
        <div className="enter-up card-surface rounded-[2rem] p-5 md:p-7" style={{ "--enter-delay": "0.26s" } as React.CSSProperties}>
          <div className="mb-6 flex gap-1 rounded-full border border-[var(--border)] bg-[var(--glass-track)] p-1" role="tablist" aria-label={t("tabs_label")}>
            {tabs.map(({ id, label, Icon }) => {
              const on = activeTab === id;
              return (
                <button
                  key={id}
                  role="tab"
                  aria-selected={on}
                  onClick={() => setActiveTab(id)}
                  className={cn(
                    "relative flex flex-1 items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-colors duration-200",
                    on ? "text-[var(--bg-primary)]" : "text-[var(--text-muted)] hover:text-[var(--text-primary)]",
                  )}
                >
                  {on ? (
                    <m.span layoutId="contact-tab-bg" className="absolute inset-0 rounded-full bg-[var(--text-primary)]" transition={{ type: "spring", stiffness: 380, damping: 32 }} />
                  ) : null}
                  <span className="relative z-10 flex items-center gap-2">
                    <Icon className={cn("h-4 w-4", id === "coffee" && !on && "text-[var(--color-coffee)]")} aria-hidden />
                    {label}
                  </span>
                </button>
              );
            })}
          </div>

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
        </div>
      </div>
    </div>
  );
}
