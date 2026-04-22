"use client";

import { m, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 500, damping: 40 });
  const sy = useSpring(y, { stiffness: 500, damping: 40 });

  useEffect(() => {
    const mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mqFine = window.matchMedia("(pointer: fine)");
    const update = () => setEnabled(!mqReduce.matches && mqFine.matches);
    update();
    mqReduce.addEventListener("change", update);
    mqFine.addEventListener("change", update);
    return () => {
      mqReduce.removeEventListener("change", update);
      mqFine.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <m.div
      className="pointer-events-none fixed z-[99] h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--accent)] bg-[var(--accent-subtle)] mix-blend-difference"
      style={{ left: sx, top: sy }}
      aria-hidden
    />
  );
}
