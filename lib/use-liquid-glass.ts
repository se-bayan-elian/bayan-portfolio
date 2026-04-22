"use client";

import { useCallback, type PointerEvent } from "react";

/**
 * Updates `--liq-x` / `--liq-y` for `.card-surface-glow` radial “liquid” highlight (see globals.css).
 */
export function useLiquidGlassPointer() {
  const onPointerMove = useCallback((e: PointerEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    el.style.setProperty("--liq-x", `${x.toFixed(1)}%`);
    el.style.setProperty("--liq-y", `${y.toFixed(1)}%`);
  }, []);

  const onPointerLeave = useCallback((e: PointerEvent<HTMLElement>) => {
    const el = e.currentTarget;
    el.style.removeProperty("--liq-x");
    el.style.removeProperty("--liq-y");
  }, []);

  return { onPointerMove, onPointerLeave };
}
