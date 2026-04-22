"use client";

import { m } from "framer-motion";
import {
  Github,
  Heart,
  Linkedin,
  Mail,
} from "lucide-react";
import { FaTelegramPlane } from "react-icons/fa";
import { useTranslations } from "next-intl";
import { BayanLogo } from "@/components/brand/BayanLogo";
import { personal } from "@/data/personal";
import { Link } from "@/navigation";

export function Footer() {
  const t = useTranslations("footer");
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
          <Link
            href="/"
            className="mb-5 inline-flex opacity-95 transition hover:opacity-100"
          >
            <BayanLogo variant="horizontal" size="sm" />
          </Link>
          <div className="flex flex-wrap items-center gap-3">
            <m.a
              href={personal.social.github}
              target="_blank"
              rel="noreferrer"
              className="glass-control inline-flex h-10 w-10 text-[var(--text-secondary)] hover:text-[var(--accent)]"
              aria-label="GitHub"
              whileHover={{ y: -2, scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              transition={{ type: "spring", stiffness: 400, damping: 24 }}
            >
              <Github className="h-5 w-5" />
            </m.a>
            <m.a
              href={personal.social.linkedin}
              target="_blank"
              rel="noreferrer"
              className="glass-control inline-flex h-10 w-10 text-[var(--text-secondary)] hover:text-[var(--accent)]"
              aria-label="LinkedIn"
              whileHover={{ y: -2, scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              transition={{ type: "spring", stiffness: 400, damping: 24 }}
            >
              <Linkedin className="h-5 w-5" />
            </m.a>
            <m.a
              href={personal.social.email}
              className="glass-control inline-flex h-10 w-10 text-[var(--text-secondary)] hover:text-[var(--accent)]"
              aria-label="Email"
              whileHover={{ y: -2, scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              transition={{ type: "spring", stiffness: 400, damping: 24 }}
            >
              <Mail className="h-5 w-5" />
            </m.a>
            {personal.social.telegram?.trim() ? (
              <m.a
                href={personal.social.telegram.trim()}
                target="_blank"
                rel="noreferrer"
                className="glass-control inline-flex h-10 w-10 text-[#229ED9] hover:text-[#1f8fc7]"
                aria-label="Telegram"
                whileHover={{ y: -2, scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                transition={{ type: "spring", stiffness: 400, damping: 24 }}
              >
                <FaTelegramPlane className="h-5 w-5" />
              </m.a>
            ) : null}
          </div>
        </div>

        <div className="justify-center">
          <p className="text-sm font-semibold text-[var(--text-primary)]">
            {personal.name}
          </p>
          <p className="mt-1 text-sm text-[var(--text-muted)]">
            © {year} {personal.name}. {t("rights")}
          </p>
          <p className="mt-1 text-xs text-[var(--text-muted)]">
            {t("built_with")}
          </p>
          <p className="mt-2 flex flex-wrap items-center gap-1.5 text-xs text-[var(--text-muted)]">
            <span>{t("made_with")}</span>
            <Heart
              className="h-3.5 w-3.5 shrink-0 fill-red-500 text-red-500"
              aria-hidden
            />
          </p>
        </div>
      </div>
    </m.footer>
  );
}
