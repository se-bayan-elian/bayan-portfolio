"use client";

import { m, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { CoffeeChatModal } from "./CoffeeChatModal";

export function CoffeeChatButton() {
  const t = useTranslations("coffee_chat");
  const [open, setOpen] = useState(false);
  const reducedMotion = useReducedMotion();

  return (
    <>
      <m.button
        onClick={() => setOpen(true)}
        aria-label={t("button_label")}
        title={t("button_label")}
        className="fixed bottom-[7.8rem] end-4 z-[54] flex h-[3.65rem] w-[3.65rem] items-center justify-center rounded-full bg-[var(--color-coffee)] text-2xl shadow-[0_12px_40px_-8px_var(--color-coffee-glow)] outline-none ring-2 ring-white/20 transition-colors hover:bg-[var(--color-coffee-hover)] md:bottom-[10rem] md:end-8"
        whileHover={reducedMotion ? undefined : { scale: 1.06 }}
        whileTap={reducedMotion ? undefined : { scale: 0.94 }}
      >
        <span role="img" aria-hidden>☕</span>
      </m.button>

      <CoffeeChatModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
