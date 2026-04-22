"use client";

import { m } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import { personal } from "@/data/personal";
import { Link } from "@/navigation";

export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const year = new Date().getFullYear();

  return (
    <m.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45 }}
      className="relative z-10 mt-16 px-4 pb-10 md:mt-20 md:px-6"
    >
      <div className="glass-panel mx-auto flex max-w-6xl flex-col gap-6 rounded-3xl px-5 py-9 md:flex-row md:items-center md:justify-between md:px-8">
        <div>
          <p className="text-sm font-semibold text-[var(--text-primary)]">{personal.name}</p>
          <p className="mt-1 text-sm text-[var(--text-muted)]">
            © {year} {personal.name}. {t("rights")}
          </p>
          <p className="mt-1 text-xs text-[var(--text-muted)]">{t("built_with")}</p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={personal.social.github}
            target="_blank"
            rel="noreferrer"
            className="glass-control inline-flex h-10 w-10 text-[var(--text-secondary)]"
            aria-label="GitHub"
          >
            <Github className="h-5 w-5" />
          </a>
          <a
            href={personal.social.linkedin}
            target="_blank"
            rel="noreferrer"
            className="glass-control inline-flex h-10 w-10 text-[var(--text-secondary)]"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-5 w-5" />
          </a>
          <a
            href={personal.social.email}
            className="glass-control inline-flex h-10 w-10 text-[var(--text-secondary)]"
            aria-label="Email"
          >
            <Mail className="h-5 w-5" />
          </a>
          <Link
            href="/contact"
            className="rounded-xl bg-gradient-cta px-4 py-2 text-sm font-semibold text-white shadow-md shadow-[var(--accent)]/25 transition hover:opacity-90"
          >
            {tNav("contact")}
          </Link>
        </div>
      </div>
    </m.footer>
  );
}
