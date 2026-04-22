import type { Metadata } from "next";
import { personal } from "@/data/personal";
import { routing, type Locale } from "@/i18n/routing";

const localeTitles: Record<Locale, string> = {
  en: `${personal.name} — ${personal.title}`,
  ar: `${personal.nameAr} — ${personal.titleAr}`,
  fr: `${personal.nameFr} — ${personal.titleFr}`,
};

const localeDescriptions: Record<Locale, string> = {
  en: personal.bio.slice(0, 160),
  ar: personal.bioAr.slice(0, 160),
  fr: personal.bioFr.slice(0, 160),
};

const localeKeywords: Record<Locale, string[]> = {
  en: [
    "Bayan Alreqeb",
    "Full Stack Developer",
    "Next.js",
    "NestJS",
    "React",
    "TypeScript",
    "Portfolio",
    "Palestine",
    "Ramallah",
    "Web Developer",
    "Software Engineer",
  ],
  ar: [
    "بيان الرقب",
    "مطور ويب",
    "Next.js",
    "NestJS",
    "رياكت",
    "تايب سكربت",
    "محفظة أعمال",
    "فلسطين",
    "رام الله",
    "مهندس برمجيات",
  ],
  fr: [
    "Bayan Alreqeb",
    "Développeur Full Stack",
    "Next.js",
    "NestJS",
    "React",
    "TypeScript",
    "Portfolio",
    "Palestine",
    "Ramallah",
    "Ingénieur logiciel",
  ],
};

function ogAlternateLocales(locale: Locale): string[] {
  return routing.locales
    .filter((l) => l !== locale)
    .map((l) => (l === "ar" ? "ar_PS" : l === "fr" ? "fr_FR" : "en_US"));
}

type BuildMetaOptions = {
  locale: Locale;
  path?: string;
  title?: string;
  description?: string;
  image?: string;
};

export function buildMetadata({
  locale,
  path = "",
  title,
  description,
  image = personal.avatar,
}: BuildMetaOptions): Metadata {
  const baseTitle = localeTitles[locale];
  const fullTitle = title ? `${title} | ${personal.name}` : baseTitle;
  const desc = description ?? localeDescriptions[locale];
  const url = `${personal.siteUrl.replace(/\/$/, "")}/${locale}${path}`;
  const ogLocale = locale === "ar" ? "ar_PS" : locale === "fr" ? "fr_FR" : "en_US";

  return {
    metadataBase: new URL(personal.siteUrl),
    title: fullTitle,
    description: desc,
    applicationName: personal.name,
    keywords: localeKeywords[locale],
    authors: [{ name: personal.name, url: personal.siteUrl }],
    creator: personal.name,
    alternates: {
      canonical: url,
      languages: {
        en: `${personal.siteUrl}/en${path}`,
        ar: `${personal.siteUrl}/ar${path}`,
        fr: `${personal.siteUrl}/fr${path}`,
      },
    },
    icons: {
      icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
      shortcut: "/favicon.svg",
      apple: "/favicon.svg",
    },
    openGraph: {
      type: "website",
      url,
      title: fullTitle,
      description: desc,
      siteName: personal.name,
      locale: ogLocale,
      alternateLocale: ogAlternateLocales(locale),
      images: [{ url: image, width: 1200, height: 630, alt: fullTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: desc,
      images: [image],
    },
    robots: { index: true, follow: true },
  };
}
