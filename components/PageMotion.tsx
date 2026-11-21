import type { ReactNode } from "react";

/**
 * Page entrance. Pure CSS (see `.page-enter` in globals.css) so the server-rendered
 * HTML is visible immediately instead of waiting for JS hydration to fade it in.
 */
export function PageMotion({ children }: { children: ReactNode }) {
  return <div className="page-enter bg-transparent">{children}</div>;
}
