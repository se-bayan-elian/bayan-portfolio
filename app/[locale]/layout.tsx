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
import { BezoChat } from "@/components/ui/BezoChat";
import { WebMcpTools } from "@/components/agent/WebMcpTools";
import { routing } from "@/i18n/routing";
import { Analytics } from "@vercel/analytics/next";
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

/**
 * Runs before first paint so the saved / system theme is applied immediately
 * (otherwise the page renders without any theme tokens until React hydrates).
 */
const themeInitScript = `(function(){try{var k="bayan-portfolio-theme",l=["light","dark","dracula","nord","solarized","payload"],t=localStorage.getItem(k);if(l.indexOf(t)<0){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.setAttribute("data-theme",t)}catch(e){}})();`;

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
    <html lang={locale} dir={dir} data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        {/* Agent discovery */}
        <link rel="ai-catalog" href="/.well-known/ai-catalog.json" type="application/json" />
        <link rel="alternate" type="text/markdown" href={`/${locale}`} title="Markdown (send Accept: text/markdown)" />
        <link rel="describedby" href="/llms.txt" type="text/plain" />
      </head>
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
          <BezoChat />
          <WebMcpTools />
        </AppProviders>
        <Analytics />
      </body>
    </html>
  );
}
