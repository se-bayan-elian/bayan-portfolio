"use client";

import { m, useTransform, type MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  text: string;
  /** Scroll progress (0..1) driving the reveal. */
  progress: MotionValue<number>;
  /** Portion of `progress` over which the full sentence reveals. */
  range?: [number, number];
  className?: string;
  /** Words to emphasise with the accent gradient. */
  highlight?: string[];
};

/** Scroll-scrubbed text: each word brightens as the reader scrolls through `range`. */
export function ScrollWords({ text, progress, range = [0, 1], className, highlight = [] }: Props) {
  const words = text.split(" ");
  const [from, to] = range;
  const step = (to - from) / words.length;

  return (
    <p className={cn("flex flex-wrap gap-x-[0.28em] gap-y-1", className)}>
      {words.map((w, i) => {
        const start = from + i * step;
        const clean = w.replace(/[.,—!?]/g, "").toLowerCase();
        return (
          <Word
            key={`${w}-${i}`}
            word={w}
            progress={progress}
            range={[start, start + step * 2.5]}
            accent={highlight.some((h) => h.toLowerCase() === clean)}
          />
        );
      })}
    </p>
  );
}

function Word({
  word,
  progress,
  range,
  accent,
}: {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
  accent: boolean;
}) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  const y = useTransform(progress, range, [6, 0]);
  return (
    <m.span style={{ opacity, y }} className={cn("inline-block", accent && "text-gradient-hero")}>
      {word}
    </m.span>
  );
}
