"use client";

import { m } from "framer-motion";
import type { ReactNode } from "react";

export function PageMotion({ children }: { children: ReactNode }) {
  return (
    <m.div
      className="bg-transparent"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </m.div>
  );
}
