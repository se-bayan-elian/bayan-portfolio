"use client";

import Script from "next/script";
import { useCookieConsent } from "@/hooks/useCookieConsent";

const ADSENSE_CLIENT_ID = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID?.trim();

/**
 * Loads the AdSense loader script only after the visitor accepts advertising
 * cookies in the consent banner, and only once `NEXT_PUBLIC_ADSENSE_CLIENT_ID`
 * (the "ca-pub-…" client ID from the AdSense dashboard) is configured.
 */
export function AdsenseScript() {
  const { status } = useCookieConsent();

  if (!ADSENSE_CLIENT_ID || status !== "granted") return null;

  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}
