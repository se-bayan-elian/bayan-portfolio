"use client";

import { useId } from "react";

/**
 * Full-viewport SVG line grid. Client component so pattern ids are unique and SVG uses a real viewBox (fixes invisible % rect in some browsers).
 */
export function BackgroundLineGrid() {
  const reactId = useId();
  const patternId = `grid-pattern-${reactId.replace(/:/g, "")}`;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[2] h-full min-h-[100dvh] w-full max-w-full min-w-0 opacity-[0.48] dark:opacity-[0.26] sm:opacity-[0.52]"
      style={{
        maskImage:
          "radial-gradient(ellipse 95% 75% at 50% 10%, #000 0%, #000 42%, rgba(0,0,0,0.55) 62%, transparent 82%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 95% 75% at 50% 10%, #000 0%, #000 42%, rgba(0,0,0,0.55) 62%, transparent 82%)",
      }}
      aria-hidden
    >
      <svg
        className="block h-full min-h-[100dvh] w-full min-w-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1600 1200"
        preserveAspectRatio="xMidYMid slice"
        width="100%"
        height="100%"
      >
        <defs>
          <pattern
            id={patternId}
            width={48}
            height={48}
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 48 0 L 0 0 0 48"
              fill="none"
              stroke="var(--border)"
              strokeWidth={1}
              strokeOpacity={0.62}
              vectorEffect="nonScalingStroke"
            />
          </pattern>
        </defs>
        <rect width="1600" height="1200" fill={`url(#${patternId})`} />
      </svg>
    </div>
  );
}
