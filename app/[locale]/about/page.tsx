import { setRequestLocale } from "next-intl/server";
import { AboutView } from "@/components/sections/AboutView";
import { buildMetadata } from "@/lib/metadata";
import type { Locale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return buildMetadata({
    locale: locale as Locale,
    path: "/about",
    title: locale === "ar" ? "من أنا" : locale === "fr" ? "À propos" : "About",
  });
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <AboutView locale={locale as Locale} />;
}
