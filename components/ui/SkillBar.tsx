"use client";

import { m, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

type Props = {
  name: string;
  level: number;
  className?: string;
};

export function SkillBar({ name, level, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-5% 0px" });

  return (
    <div ref={ref} className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between text-sm text-[var(--text-secondary)]">
        <span>{name}</span>
        <span className="tabular-nums text-[var(--text-muted)]">{level}%</span>
      </div>
      <div
        className="h-2 overflow-hidden rounded-full bg-[var(--bg-secondary)]"
        role="progressbar"
        aria-valuenow={level}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={name}
      >
        <m.div
          className="h-full rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)]"
          initial={{ width: 0 }}
          animate={{ width: inView ? `${level}%` : 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}
