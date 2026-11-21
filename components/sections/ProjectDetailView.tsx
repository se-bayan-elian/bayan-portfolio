"use client";

import { m, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CalendarRange,
  Check,
  ExternalLink,
  Github,
  Layers,
  MessageCircle,
  Sparkles,
  Trophy,
  Zap,
} from "lucide-react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { useRef, useState } from "react";
import { projects, type Project } from "@/data/projects";
import { ProjectImageGallery } from "@/components/projects/ProjectImageGallery";
import { LivePreviewFrame } from "@/components/projects/LivePreviewFrame";
import { Magnetic } from "@/components/motion/Magnetic";
import { projectLocalized } from "@/lib/project-localize";
import { Link } from "@/navigation";
import { cn } from "@/lib/utils";
import type { Locale } from "@/i18n/routing";

type Props = {
  project: Project;
  title: string;
  description: string;
  body: string;
  highlights: string[];
  awardLabel?: string;
  /** Server-checked: the live site allows being embedded in an iframe. */
  embeddable?: boolean;
};

const ease = [0.22, 1, 0.36, 1] as const;

function hostOf(url: string) {
  try {
    return new URL(url).host.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export function ProjectDetailView({ project, title, description, body, highlights, awardLabel, embeddable = false }: Props) {
  const t = useTranslations("projects");
  const tCommon = useTranslations("common");
  const locale = useLocale() as Locale;
  const reduced = useReducedMotion();

  const liveHref = project.liveUrl?.trim();
  const githubHref = project.githubUrl?.trim();
  const canPreview = Boolean(embeddable && liveHref);
  const [mode, setMode] = useState<"live" | "shot">(canPreview ? "live" : "shot");
  const galleryImages = project.images ?? [];
  const paragraphs = body
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);
  const [lead, ...rest] = paragraphs;

  const statusLabel =
    project.status === "live" ? t("status_live") : project.status === "in-progress" ? t("in_progress") : t("archived");
  const dateRange = `${project.startDate} — ${project.endDate ?? t("date_present")}`;

  // Neighbours for the "next / previous project" navigator
  const idx = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(idx + 1) % projects.length];
  const prev = projects[(idx - 1 + projects.length) % projects.length];

  // Cinematic hero: the browser mockup tilts from 3D into place as you scroll
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start end", "end start"] });
  const p = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });
  const rotateX = useTransform(p, [0, 0.45], [18, 0]);
  const scale = useTransform(p, [0, 0.45], [0.9, 1]);
  const imgY = useTransform(p, [0.3, 1], ["0%", "-8%"]);

  return (
    <article className="pb-10">
      {/* ── Header ───────────────────────────────────────────── */}
      <header className="mx-auto max-w-6xl px-4 pt-10 md:px-6 md:pt-14">
        <Link
          href="/projects"
          className="group/back enter-up inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--glass-track)] px-3.5 py-1.5 text-sm font-medium text-[var(--text-secondary)] backdrop-blur-sm transition-colors hover:border-[var(--accent)]/40 hover:text-[var(--text-primary)]"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover/back:-translate-x-0.5 rtl:rotate-180 rtl:group-hover/back:translate-x-0.5" aria-hidden />
          {tCommon("back")}
        </Link>

        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div className="min-w-0">
            <div className="enter-up flex flex-wrap items-center gap-2" style={{ "--enter-delay": "0.05s" } as React.CSSProperties}>
              {project.award && awardLabel ? (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 px-3 py-1 text-xs font-semibold text-amber-950 shadow-md shadow-amber-900/20">
                  <Trophy className="h-3.5 w-3.5 shrink-0" aria-hidden />
                  {awardLabel}
                </span>
              ) : null}
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--glass-track)] px-3 py-1 text-xs font-medium uppercase tracking-wider text-[var(--text-secondary)]">
                <Layers className="h-3 w-3" aria-hidden />
                {project.category}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/12 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-500/25 dark:text-emerald-300">
                <span className="relative flex h-2 w-2">
                  {project.status === "live" ? (
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60 motion-reduce:animate-none" />
                  ) : null}
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                {statusLabel}
              </span>
            </div>

            <h1
              className="enter-up mt-5 text-4xl font-semibold leading-[1.05] tracking-tight text-[var(--text-primary)] sm:text-5xl lg:text-6xl rtl:leading-[1.3]"
              style={{ "--enter-delay": "0.1s" } as React.CSSProperties}
            >
              <span className="text-gradient-hero">{title}</span>
            </h1>
            <p
              className="enter-up mt-5 max-w-3xl text-pretty text-lg leading-relaxed text-[var(--text-secondary)] md:text-xl"
              style={{ "--enter-delay": "0.16s" } as React.CSSProperties}
            >
              {description}
            </p>
          </div>

          <div
            className="enter-up flex flex-wrap gap-3 lg:justify-end"
            style={{ "--enter-delay": "0.22s" } as React.CSSProperties}
          >
            {liveHref ? (
              <Magnetic>
                <a
                  href={liveHref}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-fx-primary group/live inline-flex min-h-12 items-center gap-2 overflow-hidden rounded-2xl bg-gradient-cta px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[color-mix(in_srgb,var(--accent)_35%,transparent)]"
                >
                  <ExternalLink className="h-4 w-4" aria-hidden />
                  {t("visit_live")}
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover/live:-translate-y-0.5 group-hover/live:translate-x-0.5 rtl:-scale-x-100" aria-hidden />
                </a>
              </Magnetic>
            ) : null}
            <Link
              href="/contact"
              className="glass-control group/sim inline-flex min-h-12 items-center gap-2 rounded-2xl px-6 py-3 text-sm font-semibold"
            >
              <MessageCircle className="h-4 w-4" aria-hidden />
              {t("similar_cta")}
            </Link>
          </div>
        </div>
      </header>

      {/* ── Cinematic browser mockup ─────────────────────────── */}
      <div ref={heroRef} className="mx-auto mt-12 max-w-6xl px-4 [perspective:1600px] md:px-6">
        <m.div
          style={reduced ? undefined : { rotateX, scale, transformOrigin: "50% 0%" }}
          className="relative overflow-hidden rounded-[1.4rem] border border-[var(--glass-border)] bg-[var(--bg-card)] shadow-[0_60px_120px_-40px_color-mix(in_srgb,var(--accent)_45%,transparent)]"
        >
          {/* browser chrome */}
          <div className="flex items-center gap-3 border-b border-[var(--border)] bg-[var(--bg-secondary)] px-4 py-3">
            <div className="flex gap-1.5" aria-hidden>
              <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
              <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
              <span className="h-3 w-3 rounded-full bg-[#28c840]" />
            </div>
            <div className="mx-auto flex min-w-0 max-w-md flex-1 items-center justify-center gap-2 rounded-lg bg-[var(--glass-track)] px-3 py-1 text-xs text-[var(--text-muted)] ring-1 ring-[var(--border)]">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" aria-hidden />
              <span className="truncate font-mono" dir="ltr">
                {liveHref ? hostOf(liveHref) : `${project.slug}.app`}
              </span>
            </div>
            {canPreview ? (
              <div className="flex shrink-0 rounded-lg bg-[var(--glass-track)] p-0.5 text-xs ring-1 ring-[var(--border)]" role="tablist">
                {(["live", "shot"] as const).map((k) => (
                  <button
                    key={k}
                    type="button"
                    role="tab"
                    aria-selected={mode === k}
                    onClick={() => setMode(k)}
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 font-medium transition-colors",
                      mode === k ? "bg-[var(--bg-card)] text-[var(--text-primary)] shadow-sm" : "text-[var(--text-muted)] hover:text-[var(--text-primary)]",
                    )}
                  >
                    {k === "live" ? <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden /> : null}
                    {k === "live" ? t("preview_live") : t("preview_shot")}
                  </button>
                ))}
              </div>
            ) : (
              <span className="hidden w-[3.25rem] sm:block" aria-hidden />
            )}
          </div>
          <div className="relative aspect-[16/9] overflow-hidden bg-[var(--bg-secondary)]">
            <m.div className="absolute inset-x-0 -bottom-[10%] top-0" style={reduced ? undefined : { y: imgY }}>
              <Image
                src={project.thumbnail}
                alt={title}
                fill
                priority
                quality={92}
                sizes="(max-width: 1200px) 94vw, 1150px"
                className="object-cover object-top"
              />
            </m.div>
            {canPreview && mode === "live" && liveHref ? (
              <LivePreviewFrame src={liveHref} title={`${title} — ${t("preview_live")}`} loadingLabel={t("preview_loading")} />
            ) : null}
          </div>
        </m.div>
      </div>

      {/* ── Fact strip ───────────────────────────────────────── */}
      <div className="mx-auto mt-12 max-w-6xl px-4 md:px-6">
        <dl className="grid grid-cols-2 overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--border)] [gap:1px] lg:grid-cols-4">
          {[
            { k: t("timeline"), v: dateRange, Icon: CalendarRange },
            { k: t("category_label"), v: project.category, Icon: Layers },
            { k: t("stack_label"), v: `${project.techStack.length} ${t("technologies")}`, Icon: Zap },
            { k: t("status_label"), v: statusLabel, Icon: Sparkles },
          ].map(({ k, v, Icon }, i) => (
            <m.div
              key={k}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.06, ease }}
              className="bg-[var(--bg-card)] p-5 md:p-6"
            >
              <dt className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">
                <Icon className="h-3.5 w-3.5 text-[var(--accent)]" aria-hidden />
                {k}
              </dt>
              <dd className="mt-2 text-base font-semibold capitalize tabular-nums text-[var(--text-primary)] md:text-lg">{v}</dd>
            </m.div>
          ))}
        </dl>
      </div>

      {/* ── Story + sticky sidebar ───────────────────────────── */}
      <div className="mx-auto mt-16 grid max-w-6xl gap-12 px-4 md:px-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="min-w-0 space-y-14">
          <section>
            <h2 className="section-heading text-2xl font-semibold tracking-tight text-[var(--text-primary)] md:text-3xl">
              {t("overview")}
            </h2>
            {lead ? (
              <m.p
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease }}
                className="mt-6 text-pretty text-xl leading-relaxed text-[var(--text-primary)] md:text-2xl md:leading-relaxed"
              >
                {lead}
              </m.p>
            ) : null}
            <div className="mt-6 space-y-5">
              {rest.map((paragraph, i) => (
                <m.p
                  key={i}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease }}
                  className="text-pretty leading-relaxed text-[var(--text-secondary)] md:text-[1.06rem] md:leading-8"
                >
                  {paragraph}
                </m.p>
              ))}
            </div>
          </section>

          {highlights.length > 0 ? (
            <section>
              <h2 className="section-heading text-2xl font-semibold tracking-tight text-[var(--text-primary)] md:text-3xl">
                {t("highlights_heading")}
              </h2>
              <ol className="mt-8 grid gap-4 sm:grid-cols-2">
                {highlights.map((h, i) => (
                  <m.li
                    key={h}
                    initial={{ opacity: 0, y: 18, scale: 0.98 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-6% 0px" }}
                    transition={{ duration: 0.5, delay: (i % 2) * 0.08, ease }}
                    className="card-surface card-surface-glow group/hl rounded-3xl p-6"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-gradient-hero font-mono text-3xl font-bold tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--accent-subtle)] text-[var(--accent)] ring-1 ring-[var(--accent)]/25 transition-transform duration-300 group-hover/hl:rotate-12 group-hover/hl:scale-110">
                        <Check className="h-4 w-4 stroke-[2.5]" aria-hidden />
                      </span>
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-[var(--text-secondary)] md:text-[0.95rem]">{h}</p>
                  </m.li>
                ))}
              </ol>
            </section>
          ) : null}
        </div>

        <aside className="space-y-4 lg:sticky lg:top-28 lg:self-start">
          <div className="card-surface rounded-3xl p-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">{t("tech_heading")}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.techStack.map((tech, i) => (
                <m.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                  className="rounded-full border border-[var(--border)] bg-[var(--glass-track)] px-3 py-1.5 text-xs font-medium text-[var(--text-primary)] transition-colors hover:border-[var(--accent)]/45 hover:bg-[var(--accent-subtle)]"
                >
                  {tech}
                </m.span>
              ))}
            </div>
            {(liveHref || githubHref) && (
              <div className="mt-6 grid gap-2 border-t border-[var(--border)] pt-5">
                {liveHref ? (
                  <a
                    href={liveHref}
                    target="_blank"
                    rel="noreferrer"
                    className="group/l flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium text-[var(--text-primary)] transition-colors hover:bg-[var(--glass-track)]"
                  >
                    <span className="flex items-center gap-2">
                      <ExternalLink className="h-4 w-4 text-[var(--accent)]" aria-hidden />
                      <span dir="ltr">{hostOf(liveHref)}</span>
                    </span>
                    <ArrowUpRight className="h-4 w-4 opacity-60 transition group-hover/l:opacity-100 rtl:-scale-x-100" aria-hidden />
                  </a>
                ) : null}
                {githubHref ? (
                  <a
                    href={githubHref}
                    target="_blank"
                    rel="noreferrer"
                    className="group/l flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium text-[var(--text-primary)] transition-colors hover:bg-[var(--glass-track)]"
                  >
                    <span className="flex items-center gap-2">
                      <Github className="h-4 w-4 text-[var(--accent)]" aria-hidden />
                      GitHub
                    </span>
                    <ArrowUpRight className="h-4 w-4 opacity-60 transition group-hover/l:opacity-100 rtl:-scale-x-100" aria-hidden />
                  </a>
                ) : null}
              </div>
            )}
          </div>

          <div className="card-surface relative overflow-hidden rounded-3xl border-[color-mix(in_srgb,var(--accent)_35%,var(--border))] p-6">
            <div className="pointer-events-none absolute -end-12 -top-12 -z-10 h-40 w-40 rounded-full bg-[var(--accent)]/15 blur-2xl" aria-hidden />
            <Sparkles className="h-6 w-6 text-[var(--accent)]" aria-hidden />
            <p className="mt-3 text-lg font-semibold leading-snug text-[var(--text-primary)]">{t("similar_title")}</p>
            <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">{t("similar_body")}</p>
            <Link
              href="/contact"
              className="group/c mt-5 inline-flex items-center gap-2 rounded-xl bg-gradient-cta px-4 py-2.5 text-sm font-semibold"
            >
              {t("similar_cta")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover/c:translate-x-0.5 rtl:rotate-180" aria-hidden />
            </Link>
          </div>
        </aside>
      </div>

      {/* ── Gallery ──────────────────────────────────────────── */}
      {galleryImages.length > 0 ? (
        <section className="mx-auto mt-20 max-w-6xl px-4 md:px-6">
          <h2 className="section-heading text-2xl font-semibold tracking-tight text-[var(--text-primary)] md:text-3xl">
            {t("gallery_title")}
          </h2>
          <ProjectImageGallery images={galleryImages} altBase={title} variant="polaroid" />
        </section>
      ) : null}

      {/* ── Prev / next navigator ────────────────────────────── */}
      <nav className="mx-auto mt-20 grid max-w-6xl gap-4 px-4 md:grid-cols-2 md:px-6" aria-label={t("more_projects")}>
        {[
          { item: prev, label: t("prev_project"), dir: "prev" as const },
          { item: next, label: t("next_project"), dir: "next" as const },
        ].map(({ item, label, dir }) => {
          const loc = projectLocalized(item, locale);
          return (
            <Link
              key={dir}
              href={`/projects/${item.slug}`}
              className={cn(
                "card-surface card-surface-glow group/nx relative flex min-h-[11rem] overflow-hidden rounded-3xl",
                dir === "next" && "md:text-end",
              )}
            >
              <Image
                src={item.thumbnail}
                alt=""
                fill
                sizes="(max-width: 768px) 92vw, 560px"
                className="object-cover object-top opacity-25 transition duration-700 group-hover/nx:scale-105 group-hover/nx:opacity-40"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-[var(--bg-primary)]/70 to-transparent" />
              <div className={cn("relative mt-auto w-full p-6", dir === "next" && "md:flex md:flex-col md:items-end")}>
                <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
                  {dir === "prev" ? <ArrowLeft className="h-3.5 w-3.5 rtl:rotate-180" aria-hidden /> : null}
                  {label}
                  {dir === "next" ? <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" aria-hidden /> : null}
                </span>
                <span className="mt-2 block text-2xl font-semibold tracking-tight text-[var(--text-primary)]">{loc.title}</span>
                <span className="mt-1 line-clamp-1 text-sm text-[var(--text-secondary)]">{loc.description}</span>
              </div>
            </Link>
          );
        })}
      </nav>
    </article>
  );
}
