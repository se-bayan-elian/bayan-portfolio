"use client";

import { m, useReducedMotion } from "framer-motion";
import { FaTelegramPlane } from "react-icons/fa";
import { personal } from "@/data/personal";
import { cn } from "@/lib/utils";

export function TelegramFloatButton() {
  const url = personal.social.telegram?.trim();
  const reducedMotion = useReducedMotion();

  if (!url) return null;

  return (
    <m.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Telegram"
      className={cn(
        "telegram-fab relative overflow-visible fixed bottom-6 end-4 z-[55] flex h-[3.65rem] w-[3.65rem] items-center justify-center rounded-full bg-[#229ED9] text-white shadow-[0_12px_40px_-8px_rgba(34,158,217,0.65)] outline-none ring-2 ring-white/30 transition-colors hover:bg-[#1f8fc7] focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-primary)] md:bottom-8 md:end-8",
        !reducedMotion && "telegram-fab-bounce",
      )}
      whileHover={reducedMotion ? undefined : { scale: 1.06 }}
      whileTap={reducedMotion ? undefined : { scale: 0.94 }}
    >
      {!reducedMotion ? (
        <>
          <span className="telegram-fab__pulse pointer-events-none" aria-hidden />
          <span className="telegram-fab__pulse telegram-fab__pulse--delay pointer-events-none" aria-hidden />
          <span className="telegram-fab__pulse telegram-fab__pulse--delay2 pointer-events-none" aria-hidden />
        </>
      ) : null}
      <FaTelegramPlane className="relative z-[2] h-[1.65rem] w-[1.65rem] drop-shadow-sm" aria-hidden />
    </m.a>
  );
}
