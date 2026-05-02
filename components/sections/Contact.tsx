"use client";

import { m } from "framer-motion";
import { ArrowRight, Coffee, Mail, Send } from "lucide-react";
import { useTranslations } from "next-intl";
import { personal } from "@/data/personal";
import { glassCardHoverTight, glassCardTapTight } from "@/lib/motion-variants";
import { useLiquidGlassPointer } from "@/lib/use-liquid-glass";
import { Link } from "@/navigation";

const MotionLink = m(Link);

export function Contact() {
  const t = useTranslations("contact");
  const tHero = useTranslations("hero");
  const tCoffee = useTranslations("coffee_chat");
  const liq = useLiquidGlassPointer();
  const liqCoffee = useLiquidGlassPointer();

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 md:px-6">
      <div className="grid gap-4 sm:grid-cols-2">
        {/* Work contact card */}
        <m.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="card-surface card-surface-glow relative overflow-hidden rounded-[2rem] p-8 md:p-10"
          onPointerMove={liq.onPointerMove}
          onPointerLeave={liq.onPointerLeave}
          whileHover={glassCardHoverTight}
          whileTap={glassCardTapTight}
        >
          <div
            data-glass-back
            className="pointer-events-none absolute -end-16 -top-16 h-56 w-56 rounded-full bg-[var(--accent)]/25 blur-3xl"
          />
          <div
            data-glass-back
            className="pointer-events-none absolute -bottom-8 -start-10 h-40 w-40 rounded-full bg-[var(--accent-2)]/15 blur-3xl"
          />
          <div className="relative flex h-full flex-col gap-6">
            <div className="flex-1">
              <h2 className="section-heading text-2xl font-semibold tracking-tight text-[var(--text-primary)] md:text-3xl">
                {t("title")}
              </h2>
              <p className="mt-2 text-[var(--text-secondary)]">{t("subtitle")}</p>
              <m.a
                href={personal.social.email}
                className="group/mail mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)] transition-colors hover:text-[var(--accent-2)]"
                whileHover={{ x: 0, y: -1 }}
                whileTap={{ scale: 0.99 }}
                transition={{ type: "spring", stiffness: 380, damping: 28 }}
              >
                <Mail className="h-4 w-4 transition duration-300 group-hover/mail:-rotate-12 group-hover/mail:scale-110 motion-reduce:transition-none" aria-hidden />
                {personal.email}
              </m.a>
            </div>
            <MotionLink
              href="/contact"
              className="group/cta inline-flex items-center gap-2 self-start rounded-2xl bg-gradient-cta px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[var(--accent)]/30 transition-shadow hover:shadow-xl"
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Send className="h-4 w-4 shrink-0 opacity-95 transition duration-300 group-hover/cta:-rotate-12 group-hover/cta:scale-110 motion-reduce:transition-none" aria-hidden />
              {tHero("cta_contact")}
              <ArrowRight className="h-4 w-4 transition duration-300 group-hover/cta:translate-x-1 rtl:rotate-180 rtl:group-hover/cta:-translate-x-1 motion-reduce:transition-none" aria-hidden />
            </MotionLink>
          </div>
        </m.div>

        {/* Coffee chat card */}
        <m.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="card-surface relative overflow-hidden rounded-[2rem] p-8 md:p-10"
          onPointerMove={liqCoffee.onPointerMove}
          onPointerLeave={liqCoffee.onPointerLeave}
          whileHover={glassCardHoverTight}
          whileTap={glassCardTapTight}
        >
          <div
            data-glass-back
            className="pointer-events-none absolute -end-16 -top-16 h-56 w-56 rounded-full bg-[var(--color-coffee)]/20 blur-3xl"
          />
          <div
            data-glass-back
            className="pointer-events-none absolute -bottom-8 -start-10 h-40 w-40 rounded-full bg-[var(--color-coffee)]/10 blur-3xl"
          />
          <div className="relative flex h-full flex-col gap-6">
            <div className="flex-1">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[color-mix(in_srgb,var(--color-coffee)_30%,var(--border))] bg-[color-mix(in_srgb,var(--color-coffee)_10%,var(--bg-primary))] px-3 py-1 text-xs font-semibold text-[var(--color-coffee)]">
                <Coffee className="h-3.5 w-3.5 shrink-0" aria-hidden />
                {tCoffee("section_badge")}
              </div>
              <h2 className="text-2xl font-semibold tracking-tight text-[var(--text-primary)] md:text-3xl">
                {tCoffee("section_title")}
              </h2>
              <p className="mt-2 text-[var(--text-secondary)]">{tCoffee("section_body")}</p>
            </div>
            <MotionLink
              href="/contact?tab=coffee"
              className="group/cta inline-flex items-center gap-2 self-start rounded-2xl bg-[var(--color-coffee)] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[color-mix(in_srgb,var(--color-coffee)_35%,transparent)] transition hover:bg-[var(--color-coffee-hover)] hover:shadow-xl"
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Coffee className="h-4 w-4 shrink-0 opacity-95 transition duration-300 group-hover/cta:rotate-12 group-hover/cta:scale-110 motion-reduce:transition-none" aria-hidden />
              {tCoffee("section_cta")}
              <ArrowRight className="h-4 w-4 transition duration-300 group-hover/cta:translate-x-1 rtl:rotate-180 rtl:group-hover/cta:-translate-x-1 motion-reduce:transition-none" aria-hidden />
            </MotionLink>
          </div>
        </m.div>
      </div>
    </section>
  );
}
