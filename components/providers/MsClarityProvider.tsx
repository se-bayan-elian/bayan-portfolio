"use client";

import { useEffect } from "react";
import Clarity from "@microsoft/clarity";
import { useCookieConsent } from "@/hooks/useCookieConsent";

/** Only initializes after the visitor accepts analytics cookies via the consent banner. */
export default function ClarityProvider() {
  const { status } = useCookieConsent();

  useEffect(() => {
    if (status !== "granted") return;
    const projectId = process.env.NEXT_PUBLIC_CLARITY_ID;
    if (!projectId) return;
    Clarity.init(projectId);
  }, [status]);

  return null;
}