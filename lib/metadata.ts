import type { Metadata } from "next";
import { personal } from "@/data/personal";
import type { Locale } from "@/i18n/routing";

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

  return {
    metadataBase: new URL(personal.siteUrl),
    title: fullTitle,
    description: desc,
    alternates: {
      canonical: url,
      languages: {
        en: `${personal.siteUrl}/en${path}`,
        ar: `${personal.siteUrl}/ar${path}`,
        fr: `${personal.siteUrl}/fr${path}`,
      },
    },
    openGraph: {
      type: "website",
      url,
      title: fullTitle,
      description: desc,
      siteName: personal.name,
      locale: locale === "ar" ? "ar_PS" : locale === "fr" ? "fr_FR" : "en_US",
      images: [{ url: image, width: 1200, height: 630, alt: personal.name }],
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
