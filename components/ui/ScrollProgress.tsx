"use client";

import { m, useScroll, useSpring } from "framer-motion";
import { useThemeContext } from "@/components/providers/ThemeProvider";

export function ScrollProgress() {
  const { mounted } = useThemeContext();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  if (!mounted) return null;

  return (
    <m.div
      className="fixed start-0 top-0 z-[100] h-1 w-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)]"
      style={{ scaleX, transformOrigin: "0 50%" }}
      aria-hidden
    />
  );
}
