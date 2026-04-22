"use client";

import { useEffect, useRef, useState } from "react";

export function useIntersection<T extends Element>(
  options?: IntersectionObserverInit,
) {
  const ref = useRef<T | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) setIsInView(true);
    }, options);

    obs.observe(el);
    return () => obs.disconnect();
  }, [options?.root, options?.rootMargin, options?.threshold]);

  return { ref, isInView };
}
