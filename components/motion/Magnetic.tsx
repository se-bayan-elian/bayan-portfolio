import type { ReactNode } from "react";

/**
 * Previously pulled buttons toward the cursor. Hover effects are now in-place only
 * (see `.bg-gradient-cta` / `.glass-control` sheen in globals.css), so this is a pass-through.
 */
export function Magnetic({ children }: { children: ReactNode; strength?: number }) {
  return <>{children}</>;
}
