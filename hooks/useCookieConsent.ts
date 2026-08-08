"use client";

import { useCallback, useEffect, useState } from "react";

export type ConsentStatus = "unset" | "granted" | "denied";

const STORAGE_KEY = "cookie-consent";
const EVENT_NAME = "cookie-consent-change";

function readStoredConsent(): ConsentStatus {
  if (typeof window === "undefined") return "unset";
  const value = window.localStorage.getItem(STORAGE_KEY);
  return value === "granted" || value === "denied" ? value : "unset";
}

/**
 * Single source of truth for cookie consent, backed by localStorage.
 * No context provider needed — components read/react independently via
 * a shared window event, since consent can change from anywhere (the
 * banner, or a future "manage cookies" link) after mount.
 */
export function useCookieConsent() {
  const [status, setStatus] = useState<ConsentStatus>("unset");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setStatus(readStoredConsent());
    setHydrated(true);

    function onChange() {
      setStatus(readStoredConsent());
    }
    window.addEventListener(EVENT_NAME, onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener(EVENT_NAME, onChange);
      window.removeEventListener("storage", onChange);
    };
  }, []);

  const setConsent = useCallback((next: "granted" | "denied") => {
    window.localStorage.setItem(STORAGE_KEY, next);
    window.dispatchEvent(new Event(EVENT_NAME));
  }, []);

  return { status, hydrated, setConsent };
}
