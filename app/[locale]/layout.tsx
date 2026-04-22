import { Geist, Geist_Mono, Outfit, Tajawal } from "next/font/google";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { AppProviders } from "@/components/providers/AppProviders";
import { Footer } from "@/components/layout/Footer";
import { BackgroundLineGrid } from "@/components/layout/BackgroundLineGrid";
import { LiquidAmbient } from "@/components/layout/LiquidAmbient";
import { Navbar } from "@/components/layout/Navbar";
import { Cursor } from "@/components/ui/Cursor";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { TelegramFloatButton } from "@/components/ui/TelegramFloatButton";
import { routing } from "@/i18n/routing";
import '../globals.css'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const tajawal = Tajawal({
  variable: "--font-tajawal",
  subsets: ["arabic"],
  weight: ["400", "500", "700"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["600", "700"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${tajawal.variable} ${outfit.variable} min-h-screen antialiased`}
      >
        <AppProviders messages={messages}>
          <LiquidAmbient />
          <BackgroundLineGrid />
          <ScrollProgress />
          <Cursor />
          <Navbar />
          <main
            id="main-content"
            className="relative z-10 w-full min-w-0 max-w-full min-h-[60vh] bg-transparent pt-[5.25rem] sm:pt-[5.5rem]"
          >
            {children}
          </main>
          <Footer />
          <TelegramFloatButton />
        </AppProviders>
      </body>
    </html>
  );
}
