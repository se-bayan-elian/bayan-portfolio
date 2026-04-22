"use client";

import { m } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import type { Project } from "@/data/projects";
import { Link } from "@/navigation";

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

  return (
    <article className="mx-auto max-w-6xl px-4 py-12 md:px-6">
      <m.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)] transition hover:text-[var(--accent-hover)]"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          {tCommon("back")}
        </Link>

        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-start">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              {project.award && awardLabel ? (
                <m.span
                  className="rounded-full bg-gradient-to-r from-amber-500 to-amber-600 px-3 py-1 text-xs font-semibold text-amber-950"
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 2.2, repeat: Infinity }}
                >
                  {awardLabel}
                </m.span>
              ) : null}
              <span className="rounded-full border border-[var(--border)] px-2.5 py-0.5 text-xs text-[var(--text-muted)]">
                {project.category}
              </span>
              <span className="rounded-full bg-[var(--accent-subtle)] px-2.5 py-0.5 text-xs font-medium text-[var(--text-primary)]">
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
                  className="rounded-full bg-[var(--bg-secondary)] px-3 py-1 text-xs text-[var(--text-secondary)]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="relative aspect-[16/10] overflow-hidden rounded-[2rem] card-surface">
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
          <section>
            <h2 className="text-lg font-semibold text-[var(--text-primary)]">{t("overview")}</h2>
            <p className="mt-3 whitespace-pre-line text-[var(--text-secondary)] leading-relaxed">{body}</p>
            <ul className="mt-6 space-y-2 text-sm text-[var(--text-secondary)] list-disc ps-5 [dir=rtl]:ps-0 [dir=rtl]:pe-5">
              {highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </section>

          <aside className="card-surface rounded-3xl p-6">
            <p className="text-sm text-[var(--text-muted)]">
              {project.startDate}
              {project.endDate ? ` — ${project.endDate}` : ""}
            </p>
            <div className="mt-4 space-y-2">
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="block rounded-xl bg-[var(--accent)] px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-[var(--accent-hover)]"
                >
                  {t("live")}
                </a>
              ) : null}
              {project.githubUrl ? (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="block rounded-xl border border-[var(--border)] px-4 py-3 text-center text-sm font-semibold text-[var(--text-primary)] transition hover:border-[var(--accent)]/40"
                >
                  GitHub
                </a>
              ) : null}
            </div>
          </aside>
        </div>
      </m.div>
    </article>
  );
}
