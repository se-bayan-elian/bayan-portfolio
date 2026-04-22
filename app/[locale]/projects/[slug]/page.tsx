import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { PageMotion } from "@/components/PageMotion";
import { ProjectDetailView } from "@/components/sections/ProjectDetailView";
import { projects } from "@/data/projects";
import { projectLocalized } from "@/lib/project-localize";
import { buildMetadata } from "@/lib/metadata";
import type { Locale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) {
    return buildMetadata({ locale: locale as Locale, path: "/projects" });
  }
  const loc = projectLocalized(project, locale as Locale);
  return buildMetadata({
    locale: locale as Locale,
    path: `/projects/${slug}`,
    title: loc.title,
    description: loc.description,
    image: project.thumbnail,
  });
}

export default async function ProjectPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const loc = projectLocalized(project, locale as Locale);
  const t = await getTranslations("projects");

  return (
    <PageMotion>
      <ProjectDetailView
        project={project}
        title={loc.title}
        description={loc.description}
        body={loc.body}
        highlights={loc.highlights}
        awardLabel={project.award ? t("award_ribbon") : undefined}
      />
    </PageMotion>
  );
}
