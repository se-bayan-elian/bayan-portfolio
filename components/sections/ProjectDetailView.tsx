"use client";

import { m } from "framer-motion";
import { ArrowLeft, Braces, ExternalLink, Github, Layers, Trophy } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import type { Project } from "@/data/projects";
import { ProjectImageGallery } from "@/components/projects/ProjectImageGallery";
import { Link } from "@/navigation";

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

  return (
    <article className="mx-auto max-w-6xl px-4 py-12 md:px-6">
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

        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-start lg:gap-10">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              {project.award && awardLabel ? (
                <m.span
                  className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 px-3 py-1 text-xs font-semibold text-amber-950"
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 2.2, repeat: Infinity }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Trophy className="h-3 w-3 shrink-0" aria-hidden />
                  {awardLabel}
                </m.span>
              ) : null}
              <span className="inline-flex items-center gap-1 rounded-full border border-[var(--border)] px-2.5 py-0.5 text-xs text-[var(--text-muted)]">
                <Layers className="h-3 w-3 shrink-0 opacity-70" aria-hidden />
                {project.category}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-[var(--accent-subtle)] px-2.5 py-0.5 text-xs font-medium text-[var(--text-primary)]">
                {t(project.status)}
              </span>
            </div>

            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-[var(--text-primary)] md:text-4xl">
              {title}
            </h1>
            <p className="mt-3 text-lg text-[var(--text-secondary)]">{description}</p>

            <div className="mt-6 flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="group/tech inline-flex items-center gap-1 rounded-full bg-[var(--bg-secondary)] px-3 py-1 text-xs text-[var(--text-secondary)] transition duration-300 hover:bg-[var(--accent-subtle)] hover:text-[var(--text-primary)] motion-reduce:transition-none"
                >
                  <Braces className="h-3 w-3 shrink-0 opacity-50 transition group-hover/tech:opacity-100 motion-reduce:transition-none" aria-hidden />
                  {tech}
                </span>
              ))}
            </div>

            {showLive ? (
              <m.a
                href={liveHref}
                target="_blank"
                rel="noreferrer"
                className="group/live mt-5 inline-flex w-full max-w-sm items-center justify-center gap-2 rounded-xl bg-[var(--accent)] px-4 py-3 text-center text-sm font-semibold text-white shadow-md shadow-[color-mix(in_srgb,var(--accent)_25%,transparent)] transition-[box-shadow,background-color] hover:bg-[var(--accent-hover)] hover:shadow-lg sm:w-fit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <ExternalLink className="h-4 w-4 shrink-0 transition duration-300 group-hover/live:-translate-y-0.5 group-hover/live:translate-x-0.5 rtl:-scale-x-100 motion-reduce:transition-none" aria-hidden />
                {t("live")}
              </m.a>
            ) : null}
          </div>

          <div className="relative aspect-[16/10] min-h-0 w-full overflow-hidden rounded-[2rem] card-surface ring-1 ring-[var(--border)]/40">
            <Image
              src={project.thumbnail}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width:1024px) 100vw, 480px"
              priority
            />
          </div>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
          <section className="min-w-0">
            <h2 className="text-lg font-semibold text-[var(--text-primary)]">{t("overview")}</h2>
            <p className="mt-3 whitespace-pre-line leading-relaxed text-[var(--text-secondary)]">{body}</p>

            {galleryImages.length > 0 ? (
              <>
                <h3 className="mt-10 text-base font-semibold text-[var(--text-primary)]">{t("gallery_title")}</h3>
                <ProjectImageGallery images={galleryImages} altBase={title} />
              </>
            ) : null}

            <ul className="mt-8 list-disc space-y-2 ps-5 text-sm text-[var(--text-secondary)] [dir=rtl]:ps-0 [dir=rtl]:pe-5">
              {highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </section>

          <aside className="card-surface h-fit rounded-3xl p-6">
            <p className="text-sm text-[var(--text-muted)]">
              {project.startDate}
              {project.endDate ? ` — ${project.endDate}` : ""}
            </p>
            <div className="mt-4 space-y-2">
              {project.githubUrl?.trim() ? (
                <m.a
                  href={project.githubUrl.trim()}
                  target="_blank"
                  rel="noreferrer"
                  className="group/gh flex items-center justify-center gap-2 rounded-xl border border-[var(--border)] px-4 py-3 text-center text-sm font-semibold text-[var(--text-primary)] transition-colors hover:border-[var(--accent)]/40 hover:bg-[var(--accent-subtle)]"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Github className="h-4 w-4 shrink-0 transition duration-300 group-hover/gh:rotate-12 motion-reduce:transition-none" aria-hidden />
                  GitHub
                </m.a>
              ) : null}
            </div>
          </aside>
        </div>
      </m.div>
    </article>
  );
}
