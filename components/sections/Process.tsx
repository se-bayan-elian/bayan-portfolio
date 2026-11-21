"use client";

import { m, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { Clock3, Code2, FileCheck2, LifeBuoy, Rocket, Search, Video, PenTool } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRef } from "react";
import { cn } from "@/lib/utils";

const STEPS = [
  { key: "s1", Icon: Search },
  { key: "s2", Icon: PenTool },
  { key: "s3", Icon: Code2 },
  { key: "s4", Icon: Rocket },
] as const;

const PROMISES = [
  { key: "p1", Icon: Clock3 },
  { key: "p2", Icon: Video },
  { key: "p3", Icon: FileCheck2 },
  { key: "p4", Icon: LifeBuoy },
] as const;

/** "How we'll work together": a scroll-linked line fills through 4 steps, then the promises. */
export function Process() {
  const t = useTranslations("process");
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <section className="mx-auto max-w-6xl px-4 py-20 md:px-6">
      <m.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
        className="max-w-2xl"
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--glass-track)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent)] rtl:tracking-normal">
          {t("eyebrow")}
        </span>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[var(--text-primary)] md:text-4xl">
          {t("title")} <span className="text-gradient-hero">{t("title_accent")}</span>
        </h2>
        <p className="mt-3 text-[var(--text-secondary)]">{t("subtitle")}</p>
      </m.div>

      <div ref={ref} className="relative mt-14">
        {/* connector: base + scroll-filled line (horizontal on desktop, vertical on mobile) */}
        <div className="pointer-events-none absolute start-[1.75rem] top-7 bottom-7 w-px bg-[var(--border)] lg:inset-x-[12.5%] lg:bottom-auto lg:top-7 lg:h-px lg:w-auto" aria-hidden />
        <m.div
          className="pointer-events-none absolute start-[1.75rem] top-7 bottom-7 hidden w-[2px] origin-top bg-[image:linear-gradient(180deg,var(--accent),var(--accent-2))] max-lg:block"
          style={{ scaleY: progress }}
          aria-hidden
        />
        <m.div
          className="pointer-events-none absolute inset-x-[12.5%] top-7 hidden h-[2px] origin-left bg-[image:var(--gradient-line)] shadow-[0_0_14px_var(--accent)] lg:block rtl:origin-right"
          style={{ scaleX: progress }}
          aria-hidden
        />

        <ol className="relative grid gap-8 lg:grid-cols-4 lg:gap-6">
          {STEPS.map((s, i) => (
            <Step key={s.key} i={i} progress={progress} Icon={s.Icon} title={t(`${s.key}_title`)} body={t(`${s.key}_body`)} />
          ))}
        </ol>
      </div>

      <div className="mt-16 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {PROMISES.map(({ key, Icon }, i) => (
          <m.div
            key={key}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            className="flex items-center gap-3 rounded-2xl border border-[var(--border)] bg-[var(--glass-track)] px-4 py-3.5"
          >
            <Icon className="h-5 w-5 shrink-0 text-[var(--accent)]" aria-hidden />
            <span className="text-sm font-medium text-[var(--text-primary)]">{t(key)}</span>
          </m.div>
        ))}
      </div>
    </section>
  );
}

function Step({
  i,
  progress,
  Icon,
  title,
  body,
}: {
  i: number;
  progress: MotionValue<number>;
  Icon: typeof Search;
  title: string;
  body: string;
}) {
  const at = i / (STEPS.length - 1);
  const lit = useTransform(progress, [Math.max(0, at - 0.12), at], [0, 1]);
  const ringOpacity = useTransform(lit, [0, 1], [0, 1]);
  const iconScale = useTransform(lit, [0, 1], [0.9, 1]);

  return (
    <m.li
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.5, delay: i * 0.08 }}
      className="relative flex gap-5 lg:flex-col lg:gap-0"
    >
      <m.span
        style={{ scale: iconScale }}
        className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] text-[var(--text-muted)] shadow-[var(--shadow)] lg:mx-auto"
      >
        <m.span
          style={{ opacity: ringOpacity }}
          className="absolute inset-0 rounded-2xl bg-gradient-cta shadow-glow"
          aria-hidden
        />
        <Icon className="relative h-6 w-6" aria-hidden />
        <LitIcon lit={lit} Icon={Icon} />
      </m.span>
      <div className={cn("card-surface card-surface-glow flex-1 rounded-3xl p-5 lg:mt-6 lg:text-center")}>
        <span className="font-mono text-xs text-[var(--accent)]">0{i + 1}</span>
        <h3 className="mt-1 text-lg font-semibold text-[var(--text-primary)]">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">{body}</p>
      </div>
    </m.li>
  );
}

/** White icon that fades in over the gradient once the step is reached. */
function LitIcon({ lit, Icon }: { lit: MotionValue<number>; Icon: typeof Search }) {
  return (
    <m.span style={{ opacity: lit }} className="absolute inset-0 flex items-center justify-center text-white" aria-hidden>
      <Icon className="h-6 w-6" />
    </m.span>
  );
}
