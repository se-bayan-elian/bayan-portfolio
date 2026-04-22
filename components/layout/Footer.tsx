"use client";

import { m } from "framer-motion";
import { ArrowUpRight, Github, Linkedin, Mail, MessageCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { BayanLogo } from "@/components/brand/BayanLogo";
import { personal } from "@/data/personal";
import { Link } from "@/navigation";

const MotionLink = m(Link);

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
          <Link href="/" className="mb-5 inline-flex opacity-95 transition hover:opacity-100">
            <BayanLogo variant="horizontal" size="sm" />
          </Link>
          <p className="text-sm font-semibold text-[var(--text-primary)]">{personal.name}</p>
          <p className="mt-1 text-sm text-[var(--text-muted)]">
            © {year} {personal.name}. {t("rights")}
          </p>
          <p className="mt-1 text-xs text-[var(--text-muted)]">{t("built_with")}</p>
        </div>

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
          <MotionLink
            href="/contact"
            className="group/foot inline-flex items-center gap-2 rounded-xl bg-gradient-cta px-4 py-2 text-sm font-semibold text-white shadow-md shadow-[var(--accent)]/25 transition-shadow hover:shadow-lg"
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <MessageCircle className="h-4 w-4 shrink-0 opacity-95 transition duration-300 group-hover/foot:scale-110 motion-reduce:transition-none" aria-hidden />
            {tNav("contact")}
            <ArrowUpRight className="h-3.5 w-3.5 shrink-0 opacity-90 transition duration-300 group-hover/foot:-translate-y-0.5 group-hover/foot:translate-x-0.5 rtl:-scale-x-100 motion-reduce:transition-none" aria-hidden />
          </MotionLink>
        </div>
      </div>
    </m.footer>
  );
}
