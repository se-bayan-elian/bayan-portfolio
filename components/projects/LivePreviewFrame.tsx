"use client";

import { Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const DESKTOP_W = 1280;

/**
 * Renders a live site at desktop width (1280px) and scales it down to fit the frame,
 * so the preview looks like a real desktop browser instead of a squeezed mobile layout.
 */
export function LivePreviewFrame({
  src,
  title,
  loadingLabel,
  onLoaded,
}: {
  src: string;
  title: string;
  loadingLabel: string;
  onLoaded?: () => void;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.5);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const measure = () => setScale(el.clientWidth / DESKTOP_W);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={wrapRef} className="absolute inset-0 overflow-hidden">
      <iframe
        src={src}
        title={title}
        loading="lazy"
        referrerPolicy="no-referrer"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        onLoad={() => {
          setLoaded(true);
          onLoaded?.();
        }}
        className="absolute left-0 top-0 origin-top-left border-0 bg-white transition-opacity duration-500"
        style={{
          width: DESKTOP_W,
          height: `${100 / scale}%`,
          transform: `scale(${scale})`,
          opacity: loaded ? 1 : 0,
        }}
      />
      {!loaded ? (
        <div className="pointer-events-none absolute bottom-3 end-3 inline-flex items-center gap-2 rounded-full bg-black/60 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md">
          <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden />
          {loadingLabel}
        </div>
      ) : null}
    </div>
  );
}
