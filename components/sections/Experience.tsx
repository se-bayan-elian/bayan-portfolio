"use client";

import { m, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Clock } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { experiences } from "@/data/experience";
import { experienceLocalized } from "@/lib/experience-localize";
import { TimelineItem } from "@/components/ui/TimelineItem";
import { Link } from "@/navigation";
import type { Locale } from "@/i18n/routing";

const MotionLink = m(Link);

type ExperienceProps = { showViewAll?: boolean; hideHeader?: boolean };

export function Experience({ showViewAll = true, hideHeader = false }: ExperienceProps) {
  const t = useTranslations("experience");
  const locale = useLocale() as Locale;
  const listRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 75%", "end 60%"] });
  const lineScale = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <section className={hideHeader ? "mx-auto max-w-6xl px-4 pb-16 pt-4 md:px-6" : "mx-auto max-w-6xl px-4 py-16 md:px-6"}>
      {hideHeader ? null : (
      <m.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
        className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between"
      >
        <div>
          <h2 className="section-heading text-3xl font-semibold tracking-tight text-[var(--text-primary)]">
            {t("title")}
          </h2>
          <p className="mt-2 max-w-2xl text-[var(--text-secondary)]">{t("subtitle")}</p>
        </div>
        {showViewAll ? (
          <MotionLink
            href="/experience"
            className="group/exp inline-flex w-fit items-center gap-2 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)]/95 px-4 py-2 text-sm font-semibold text-[var(--text-primary)] shadow-sm transition-colors hover:border-[var(--accent-2)]/40 hover:text-[var(--accent)] hover:shadow-glow"
            whileTap={{ scale: 0.98 }}
          >
            <Clock className="h-4 w-4 shrink-0 text-[var(--accent)] transition duration-300 group-hover/exp:rotate-12 motion-reduce:transition-none" aria-hidden />
            {t("view_timeline")}
            <ArrowRight className="h-4 w-4 shrink-0 transition duration-300 group-hover/exp:translate-x-1 rtl:rotate-180 rtl:group-hover/exp:-translate-x-1 motion-reduce:transition-none" aria-hidden />
          </MotionLink>
        ) : null}
      </m.div>
      )}

      <div ref={listRef} className="relative mt-12">
        <div
          className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-[var(--border)] md:block"
          aria-hidden
        />
        {/* Progress line that draws itself as you scroll through the timeline */}
        <m.div
          className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-[3px] origin-top -translate-x-1/2 rounded-full bg-[image:linear-gradient(180deg,var(--accent),var(--accent-2))] shadow-[0_0_18px_var(--accent)] md:block"
          style={{ scaleY: lineScale }}
          aria-hidden
        />
        <div className="space-y-12">
          {experiences.map((item, index) => {
            const loc = experienceLocalized(item, locale);
            return (
              <TimelineItem
                key={item.id}
                item={item}
                index={index}
                locale={locale}
                company={loc.company}
                role={loc.role}
                description={loc.description}
                responsibilities={loc.responsibilities}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
