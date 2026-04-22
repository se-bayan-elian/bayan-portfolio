import { setRequestLocale } from "next-intl/server";
import { PageMotion } from "@/components/PageMotion";
import { Skills } from "@/components/sections/Skills";
import { buildMetadata } from "@/lib/metadata";
import type { Locale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return buildMetadata({
    locale: locale as Locale,
    path: "/skills",
    title: locale === "ar" ? "المهارات" : locale === "fr" ? "Compétences" : "Skills",
  });
}

export default async function SkillsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <PageMotion>
      <Skills featuredOnly={false} />
    </PageMotion>
  );
}
