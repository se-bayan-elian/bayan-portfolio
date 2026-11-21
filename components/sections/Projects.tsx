"use client";

import { m, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowRight, LayoutGrid, MoveHorizontal } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { projects } from "@/data/projects";
import { projectLocalized } from "@/lib/project-localize";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Link } from "@/navigation";
import type { Locale } from "@/i18n/routing";

const MotionLink = m(Link);
const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

type Props = {
  limit?: number;
};

export function Projects({ limit = 6 }: Props) {
  const t = useTranslations("projects");
  const locale = useLocale() as Locale;
  const list = projects.filter((p) => p.featured).slice(0, limit);

  const header = (
    <m.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45 }}
      className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between"
    >
      <div>
        <h2 className="section-heading text-3xl font-semibold tracking-tight text-[var(--text-primary)]">{t("title")}</h2>
        <p className="mt-2 max-w-2xl text-[var(--text-secondary)] lg:[@media(max-height:700px)]:hidden">{t("subtitle")}</p>
      </div>
      <MotionLink
        href="/projects"
        className="group/proj inline-flex w-fit items-center gap-2 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)]/95 px-4 py-2 text-sm font-semibold text-[var(--text-primary)] shadow-sm transition-colors hover:border-[var(--accent-2)]/40 hover:text-[var(--accent)] hover:shadow-glow"
        whileTap={{ scale: 0.98 }}
      >
        <LayoutGrid className="h-4 w-4 shrink-0 text-[var(--accent)] transition duration-300 group-hover/proj:rotate-6 motion-reduce:transition-none" aria-hidden />
        {t("view_all")}
        <ArrowRight className="h-4 w-4 shrink-0 transition duration-300 group-hover/proj:translate-x-1 rtl:rotate-180 rtl:group-hover/proj:-translate-x-1 motion-reduce:transition-none" aria-hidden />
      </MotionLink>
    </m.div>
  );

  const cards = list.map((p) => {
    const loc = projectLocalized(p, locale);
    return { p, loc };
  });

  return (
    <>
      {/* Mobile / tablet: regular grid */}
      <section className="mx-auto max-w-6xl px-4 py-16 md:px-6 lg:hidden">
        {header}
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {cards.slice(0, 4).map(({ p, loc }, i) => (
            <m.div
              key={p.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8% 0px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <ProjectCard
                project={p}
                title={loc.title}
                description={loc.description}
                highlights={loc.highlights}
                awardLabel={p.award ? t("award_ribbon") : undefined}
              />
            </m.div>
          ))}
        </div>
      </section>

      {/* Desktop: pinned horizontal gallery */}
      <HorizontalGallery header={header} rtl={locale === "ar"}>
        {cards.map(({ p, loc }, i) => (
          <div key={p.id} className="flex w-[clamp(19rem,min(28vw,54svh),24rem)] shrink-0 flex-col">
            <span className="mb-2 block font-mono text-xs text-[var(--text-muted)]">
              {String(i + 1).padStart(2, "0")} / {String(cards.length).padStart(2, "0")}
            </span>
            <ProjectCard
              project={p}
              title={loc.title}
              description={loc.description}
              highlights={loc.highlights}
              awardLabel={p.award ? t("award_ribbon") : undefined}
              compact
            />
          </div>
        ))}
        <Link
          href="/projects"
          className="card-surface card-surface-glow group/all mt-6 flex w-[clamp(14rem,22vw,18rem)] shrink-0 flex-col items-center justify-center gap-4 rounded-3xl p-8 text-center"
        >
          <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-cta text-white shadow-glow transition-transform duration-500 group-hover/all:scale-110 group-hover/all:-rotate-12">
            <ArrowRight className="h-7 w-7 rtl:rotate-180" aria-hidden />
          </span>
          <span className="text-xl font-semibold text-[var(--text-primary)]">{t("view_all")}</span>
          <span className="text-sm text-[var(--text-muted)]">{t("more_hint")}</span>
        </Link>
      </HorizontalGallery>
    </>
  );
}

function HorizontalGallery({
  header,
  rtl,
  children,
}: {
  header: React.ReactNode;
  rtl: boolean;
  children: React.ReactNode;
}) {
  const t = useTranslations("projects");
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const [vh, setVh] = useState(800);

  useIsoLayoutEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      setDistance(Math.max(0, track.scrollWidth - window.innerWidth));
      setVh(window.innerHeight);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 220, damping: 40, restDelta: 0.0005 });
  const x = useTransform(smooth, [0.08, 0.95], [0, rtl ? distance : -distance]);
  const bar = useTransform(smooth, [0.08, 0.95], [0, 1]);

  if (reduced) {
    return (
      <section className="mx-auto hidden max-w-6xl px-4 py-16 md:px-6 lg:block">
        {header}
        <div className="mt-10 flex gap-6 overflow-x-auto pb-6">{children}</div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="relative hidden lg:block" style={{ height: distance + vh * 1.1 }}>
      <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden pb-5 pt-[clamp(5rem,13svh,7rem)]">
        <div className="mx-auto w-full max-w-6xl px-6">
          {header}
        </div>
        <m.div
          ref={trackRef}
          style={{ x }}
          className="mt-[clamp(0.75rem,3svh,2rem)] flex min-h-0 w-max flex-1 items-center gap-6 px-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))] will-change-transform"
        >
          {children}
        </m.div>
        <div className="mx-auto mt-4 flex w-full max-w-6xl shrink-0 items-center gap-4 px-6">
          <MoveHorizontal className="h-4 w-4 text-[var(--accent)]" aria-hidden />
          <span className="text-xs text-[var(--text-muted)]">{t("scroll_hint")}</span>
          <div className="h-1 flex-1 overflow-hidden rounded-full bg-[var(--glass-track)]">
            <m.div className="h-full origin-left rounded-full bg-[image:var(--gradient-line)] rtl:origin-right" style={{ scaleX: bar }} />
          </div>
        </div>
      </div>
    </section>
  );
}
