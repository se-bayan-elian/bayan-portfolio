"use client";

import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

const COMMAND = "npx hire bayan";

/**
 * Tiny animated terminal that "runs" a hire command and prints why Bayan is a good pick.
 * Typing is pure state + timers (no libs); reduced-motion users get the final frame.
 */
export function HeroTerminal() {
  const t = useTranslations("terminal");
  const reduced = useReducedMotion();
  const lines = [t("l1"), t("l2"), t("l3"), t("l4")];
  const [typed, setTyped] = useState(reduced ? COMMAND.length : 0);
  const [shown, setShown] = useState(reduced ? lines.length : 0);

  useEffect(() => {
    if (reduced) return;
    let i = 0;
    let n = 0;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const typeNext = () => {
      i += 1;
      setTyped(i);
      if (i < COMMAND.length) timers.push(setTimeout(typeNext, 55 + Math.random() * 45));
      else timers.push(setTimeout(showNext, 380));
    };
    const showNext = () => {
      n += 1;
      setShown(n);
      if (n < lines.length) timers.push(setTimeout(showNext, 420));
    };
    timers.push(setTimeout(typeNext, 1100));
    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  const done = shown >= lines.length;

  return (
    <div
      dir="ltr"
      className="w-[min(19rem,80vw)] overflow-hidden rounded-2xl border border-white/10 bg-[#0b0d17]/90 text-left font-mono text-[0.72rem] leading-relaxed text-slate-300 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.6)] backdrop-blur-xl"
      aria-label={t("label")}
      role="img"
    >
      <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ms-2 text-[0.65rem] text-slate-500">~/bayan — zsh</span>
      </div>
      <div className="space-y-1 px-3.5 py-3">
        <p>
          <span className="text-emerald-400">➜</span> <span className="text-sky-400">~</span>{" "}
          <span className="text-slate-100">{COMMAND.slice(0, typed)}</span>
          {typed < COMMAND.length || done ? (
            <span className="ms-0.5 inline-block h-3.5 w-1.5 translate-y-0.5 animate-pulse bg-slate-200 motion-reduce:animate-none" />
          ) : null}
        </p>
        {/* All lines are always rendered (reserving the final height) and fade in one by one,
            so typing never changes the box size or shifts the layout around it. */}
        {lines.map((line, i) => (
          <p
            key={line}
            className={cn(
              "transition-[opacity,transform] duration-300 motion-reduce:transition-none",
              i < shown ? "translate-x-0 opacity-100" : "-translate-x-1.5 opacity-0",
              i === lines.length - 1 ? "text-orange-300" : "text-slate-300",
            )}
            aria-hidden={i >= shown}
          >
            <span className={i === lines.length - 1 ? "text-orange-400" : "text-emerald-400"}>
              {i === lines.length - 1 ? "→" : "✓"}
            </span>{" "}
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}
