"use client";

import { m } from "framer-motion";
import {
  ArrowLeft,
  Braces,
  CalendarRange,
  Check,
  ExternalLink,
  Github,
  Layers,
  Trophy,
} from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import type { Project } from "@/data/projects";
import { ProjectImageGallery } from "@/components/projects/ProjectImageGallery";
import { Link } from "@/navigation";
import { cn } from "@/lib/utils";

const MotionLink = m(Link);

type Props = {
  project: Project;
  title: string;
  description: string;
  body: string;
  highlights: string[];
  awardLabel?: string;
};

export function ProjectDetailView({
  project,
  title,
  description,
  body,
  highlights,
  awardLabel,
}: Props) {
  const t = useTranslations("projects");
  const tCommon = useTranslations("common");

  const liveHref = project.liveUrl?.trim();
  const showLive = Boolean(liveHref);
  const galleryImages = project.images ?? [];
  const showAside = Boolean(project.githubUrl?.trim());

  const dateRange = project.endDate
    ? `${project.startDate} — ${project.endDate}`
    : `${project.startDate} — ${t("date_present")}`;

  return (
    <article className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:pb-16">
      <m.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <MotionLink
          href="/projects"
          className="group/back inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)] transition-colors hover:text-[var(--accent-hover)]"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <ArrowLeft className="h-4 w-4 transition duration-300 group-hover/back:-translate-x-1 rtl:rotate-180 rtl:group-hover/back:translate-x-1 motion-reduce:transition-none" aria-hidden />
          {tCommon("back")}
        </MotionLink>

        {/* Hero: title column + polaroid thumbnail */}
        <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:items-start lg:gap-12">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              {project.award && awardLabel ? (
                <m.span
                  className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 px-3 py-1 text-xs font-semibold text-amber-950 shadow-md shadow-amber-900/15"
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 2.2, repeat: Infinity }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Trophy className="h-3 w-3 shrink-0" aria-hidden />
                  {awardLabel}
                </m.span>
              ) : null}
              <span className="inline-flex items-center gap-1 rounded-full border border-[var(--border)] bg-[var(--bg-card)]/80 px-2.5 py-0.5 text-xs text-[var(--text-muted)] backdrop-blur-sm">
                <Layers className="h-3 w-3 shrink-0 opacity-70" aria-hidden />
                {project.category}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-[var(--accent-subtle)] px-2.5 py-0.5 text-xs font-medium text-[var(--text-primary)] ring-1 ring-[var(--accent)]/15">
                {t(project.status)}
              </span>
            </div>

            <h1 className="mt-5 text-3xl font-semibold tracking-tight text-[var(--text-primary)] md:text-[2.15rem] md:leading-tight lg:text-4xl">
              {title}
            </h1>

            <p
              className="mt-3 flex flex-wrap items-center gap-2 text-sm text-[var(--text-secondary)]"
              title={dateRange}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)]/90 bg-[var(--bg-secondary)]/90 px-3 py-1.5 font-medium tabular-nums text-[var(--text-secondary)] shadow-sm ring-1 ring-black/[0.03] dark:ring-white/[0.06]">
                <CalendarRange className="h-4 w-4 shrink-0 text-[var(--accent)]" aria-hidden />
                {dateRange}
              </span>
            </p>

            <p className="mt-5 text-lg leading-relaxed text-[var(--text-secondary)] md:text-xl">{description}</p>

            <div className="mt-8 flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="group/tech inline-flex items-center gap-1.5 rounded-full border border-[var(--border)]/70 bg-[var(--bg-secondary)] px-3 py-1.5 text-xs font-medium text-[var(--text-secondary)] transition duration-300 hover:border-[var(--accent)]/35 hover:bg-[var(--accent-subtle)] hover:text-[var(--text-primary)] motion-reduce:transition-none"
                >
                  <Braces className="h-3 w-3 shrink-0 opacity-55 transition group-hover/tech:opacity-100 motion-reduce:transition-none" aria-hidden />
                  {tech}
                </span>
              ))}
            </div>

            {showLive ? (
              <m.a
                href={liveHref}
                target="_blank"
                rel="noreferrer"
                className="btn-fx-primary group/live mt-6 inline-flex w-full max-w-md items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-cta px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[color-mix(in_srgb,var(--accent)_28%,transparent)] sm:w-fit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <ExternalLink className="h-4 w-4 shrink-0 opacity-95" aria-hidden />
                {t("live")}
              </m.a>
            ) : null}
          </div>

          <div className="flex w-full justify-center lg:justify-end lg:pt-2">
            <div
              className={cn(
                "project-polaroid-frame w-full max-w-[min(100%,28rem)] -rotate-[0.55deg] shadow-2xl transition duration-500 ease-out",
                "hover:-translate-y-1 hover:rotate-0 hover:shadow-[0_32px_70px_-24px_rgba(0,0,0,0.35)]",
                "motion-reduce:rotate-0 motion-reduce:transition-none motion-reduce:hover:translate-y-0",
              )}
            >
              <div className="relative aspect-[16/10] min-h-[180px] w-full overflow-hidden rounded-[2px] bg-[var(--bg-secondary)] shadow-[inset_0_1px_3px_rgba(0,0,0,0.15)] sm:min-h-[220px]">
                <Image
                  src={project.thumbnail}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width:1024px) 100vw, min(448px, 45vw)"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        {/* Overview + highlights + gallery */}
        <div
          className={cn(
            "mt-14 grid gap-10",
            showAside && "lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-12",
          )}
        >
          <div className="min-w-0 space-y-10">
            <section className="rounded-[1.75rem] border border-[var(--border)]/80 bg-[color-mix(in_srgb,var(--bg-card)_92%,transparent)] p-6 shadow-[var(--shadow)] backdrop-blur-sm md:p-8">
              <h2 className="text-lg font-semibold tracking-tight text-[var(--text-primary)] md:text-xl">{t("overview")}</h2>
              <p className="mt-4 whitespace-pre-line leading-relaxed text-[var(--text-secondary)] md:text-[1.05rem] md:leading-[1.75rem]">
                {body}
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold tracking-tight text-[var(--text-primary)] md:text-xl">{t("highlights_heading")}</h2>
              <ul className="mt-5 space-y-3 rounded-2xl border border-[var(--border)]/70 bg-[var(--bg-secondary)]/40 p-5 md:p-6 [dir=rtl]:[padding-inline-start:1.25rem]">
                {highlights.map((h) => (
                  <li
                    key={h}
                    className="flex gap-3 text-sm leading-relaxed text-[var(--text-secondary)] md:text-[0.95rem]"
                  >
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--accent-subtle)] text-[var(--accent)] ring-1 ring-[var(--accent)]/20">
                      <Check className="h-3.5 w-3.5 stroke-[2.5]" aria-hidden />
                    </span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </section>

            {galleryImages.length > 0 ? (
              <section className="border-t border-[var(--border)]/60 pt-10">
                <h2 className="text-lg font-semibold tracking-tight text-[var(--text-primary)] md:text-xl">{t("gallery_title")}</h2>
                <ProjectImageGallery images={galleryImages} altBase={title} variant="polaroid" />
              </section>
            ) : null}
          </div>

          {showAside ? (
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-3xl border border-[var(--border)]/80 bg-[var(--glass-bg-strong)] p-6 shadow-[var(--shadow)] backdrop-blur-md">
                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">{t("repo_heading")}</p>
                <div className="mt-4">
                  <m.a
                    href={project.githubUrl.trim()}
                    target="_blank"
                    rel="noreferrer"
                    className="group/gh flex w-full items-center justify-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--bg-card)]/90 px-4 py-3 text-center text-sm font-semibold text-[var(--text-primary)] shadow-sm transition-colors hover:border-[var(--accent)]/45 hover:bg-[var(--accent-subtle)]"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Github className="h-4 w-4 shrink-0 transition duration-300 group-hover/gh:rotate-12 motion-reduce:transition-none" aria-hidden />
                    GitHub
                  </m.a>
                </div>
              </div>
            </aside>
          ) : null}
        </div>
      </m.div>
    </article>
  );
}
