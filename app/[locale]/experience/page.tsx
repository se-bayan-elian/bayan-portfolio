import { setRequestLocale } from "next-intl/server";
import { PageMotion } from "@/components/PageMotion";
import { EducationBlock } from "@/components/sections/EducationBlock";
import { Experience } from "@/components/sections/Experience";
import { buildMetadata } from "@/lib/metadata";
import type { Locale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return buildMetadata({
    locale: locale as Locale,
    path: "/experience",
    title:
      locale === "ar" ? "الخبرة" : locale === "fr" ? "Expérience" : "Experience",
  });
}

export default async function ExperiencePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <PageMotion>
      <Experience showViewAll={false} />
      <EducationBlock locale={locale as Locale} />
    </PageMotion>
  );
}
