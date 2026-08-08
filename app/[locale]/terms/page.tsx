import { setRequestLocale } from "next-intl/server";
import { LegalDocumentView } from "@/components/sections/LegalDocumentView";
import { buildMetadata } from "@/lib/metadata";
import type { Locale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return buildMetadata({
    locale: locale as Locale,
    path: "/terms",
    title:
      locale === "ar"
        ? "شروط الاستخدام"
        : locale === "fr"
          ? "Conditions d'utilisation"
          : "Terms of Use",
  });
}

export default async function TermsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <LegalDocumentView doc="terms" />;
}
