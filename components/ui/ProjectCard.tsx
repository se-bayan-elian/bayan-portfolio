"use client";

import { m, useMotionTemplate, useMotionValue } from "framer-motion";
import { ArrowRight, Braces, Star, Tag, Trophy } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import type { Project } from "@/data/projects";
import { glassCardHover, glassCardTap } from "@/lib/motion-variants";
import { Link } from "@/navigation";
import { cn } from "@/lib/utils";

const MotionLink = m(Link);

type Props = {
  project: Project;
  title: string;
  description: string;
  highlights: string[];
  awardLabel?: string;
};

export function ProjectCard({
  project,
  title,
  description,
  highlights,
  awardLabel,
}: Props) {
  const t = useTranslations("projects");
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useMotionTemplate`rotateX(${my}deg)`;
  const rotateY = useMotionTemplate`rotateY(${mx}deg)`;

  const onCardMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    mx.set(px * -10);
    my.set(py * 10);
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    e.currentTarget.style.setProperty("--liq-x", `${x.toFixed(1)}%`);
    e.currentTarget.style.setProperty("--liq-y", `${y.toFixed(1)}%`);
  };

  const onCardLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    mx.set(0);
    my.set(0);
    e.currentTarget.style.removeProperty("--liq-x");
    e.currentTarget.style.removeProperty("--liq-y");
  };

  return (
    <m.div
      className="group h-full [perspective:1200px]"
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
    >
      <m.div
        className="card-surface card-surface-glow group relative flex h-full flex-col rounded-3xl"
        onMouseMove={onCardMove}
        onMouseLeave={onCardLeave}
        whileHover={glassCardHover}
        whileTap={glassCardTap}
      >
        {project.award && awardLabel && (
          <m.div
            className="group/award absolute end-4 top-4 z-10 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 px-3 py-1 text-xs font-semibold text-amber-950 shadow-lg"
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
            whileHover={{ scale: 1.06 }}
          >
            <Trophy className="h-3 w-3 shrink-0 opacity-95 transition duration-300 group-hover/award:rotate-12 motion-reduce:transition-none motion-reduce:group-hover/award:rotate-0" aria-hidden />
            {awardLabel}
          </m.div>
        )}

        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-t-3xl bg-[var(--bg-secondary)]">
          <Image
            src={project.thumbnail}
            alt=""
            fill
            className="object-cover transition duration-500 group-hover:scale-[1.05]"
            sizes="(max-width:768px) 100vw, 33vw"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)]/90 via-[var(--bg-primary)]/15 to-[var(--accent-2)]/5" />
        </div>

        <div className="flex flex-1 flex-col p-6">
          <div className="flex flex-wrap items-center gap-2">
            {project.featured && (
              <span className="group/feat inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-[var(--accent)]/20 to-[var(--accent-2)]/20 px-2.5 py-0.5 text-xs font-medium text-[var(--text-primary)] ring-1 ring-[var(--accent)]/20 transition duration-300 hover:-translate-y-0.5 hover:shadow-sm motion-reduce:transition-none motion-reduce:hover:translate-y-0">
                <Star className="h-3 w-3 shrink-0 text-[var(--accent)] transition duration-300 group-hover/feat:fill-[var(--accent)] group-hover/feat:rotate-12 motion-reduce:transition-none" aria-hidden />
                {t("featured")}
              </span>
            )}
            <span className="group/cat inline-flex items-center gap-1 rounded-full border border-[var(--border)] px-2.5 py-0.5 text-xs text-[var(--text-muted)] transition duration-300 hover:border-[var(--accent)]/35 hover:text-[var(--accent)] motion-reduce:transition-none">
              <Tag className="h-3 w-3 shrink-0 opacity-80 transition duration-300 group-hover/cat:-rotate-6 motion-reduce:transition-none" aria-hidden />
              {project.category}
            </span>
          </div>

          <h3 className="mt-3 text-xl font-semibold text-[var(--text-primary)]">{title}</h3>
          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-[var(--text-secondary)]">
            {description}
          </p>

          <ul
            className={cn(
              "mt-4 space-y-1 text-sm text-[var(--text-muted)]",
              "list-disc ps-4 [dir=rtl]:ps-0 [dir=rtl]:pe-4",
            )}
          >
            {highlights.slice(0, 3).map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>

          <div className="mt-auto flex flex-wrap gap-2 pt-5">
            {project.techStack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="group/tech inline-flex items-center gap-1 rounded-md border border-[var(--border)]/60 bg-gradient-to-r from-[var(--bg-secondary)] to-[var(--bg-card)] px-2 py-0.5 text-xs text-[var(--text-secondary)] transition duration-300 hover:border-[var(--accent)]/30 hover:text-[var(--accent)] motion-reduce:transition-none"
              >
                <Braces className="h-3 w-3 shrink-0 opacity-60 transition duration-300 group-hover/tech:opacity-100 group-hover/tech:rotate-6 motion-reduce:transition-none" aria-hidden />
                {tech}
              </span>
            ))}
          </div>

          <MotionLink
            href={`/projects/${project.slug}`}
            className="group/view mt-5 inline-flex w-fit items-center gap-2 rounded-xl bg-gradient-cta px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[var(--accent)]/25 transition-shadow duration-300 hover:shadow-xl hover:shadow-[var(--accent)]/35 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] motion-reduce:transition-none"
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {t("view_details")}
            <ArrowRight className="h-4 w-4 shrink-0 transition duration-300 group-hover/view:translate-x-1 rtl:rotate-180 rtl:group-hover/view:-translate-x-1 motion-reduce:transition-none" aria-hidden />
          </MotionLink>
        </div>
      </m.div>
    </m.div>
  );
}
