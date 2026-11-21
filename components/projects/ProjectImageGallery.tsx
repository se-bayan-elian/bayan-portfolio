"use client";

import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";


type Props = {
  images: string[];
  altBase: string;
  /** Scrapbook wall: 3-column tilted frames (project detail gallery). */
  variant?: "default" | "polaroid";
};

export function ProjectImageGallery({ images, altBase, variant = "default" }: Props) {
  const t = useTranslations("projects");
  const reducedMotion = useReducedMotion();
  const [open, setOpen] = useState<number | null>(null);
  const isPolaroid = variant === "polaroid";

  const close = useCallback(() => setOpen(null), []);
  const next = useCallback(() => {
    setOpen((i) => (i === null ? null : (i + 1) % images.length));
  }, [images.length]);
  const prev = useCallback(() => {
    setOpen((i) => (i === null ? null : (i - 1 + images.length) % images.length));
  }, [images.length]);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close, next, prev]);

  useEffect(() => {
    if (open === null) {
      document.body.style.overflow = "";
    } else {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!images.length) return null;

  return (
    <>
      {isPolaroid ? (
        /* Browser-frame grid: real website proportions, first shot featured,
           hover slowly scrolls the screenshot in place (nothing moves). */
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {images.map((src, i) => (
            <button
              key={`${src}-${i}`}
              type="button"
              onClick={() => setOpen(i)}
              className={cn(
                "group/img card-surface card-surface-glow block overflow-hidden rounded-2xl text-start focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]",
                i === 0 && images.length > 2 && "sm:col-span-2",
              )}
            >
              <div className="flex items-center gap-1.5 border-b border-[var(--border)] bg-[var(--bg-secondary)] px-3 py-2">
                <span className="h-2 w-2 rounded-full bg-[#ff5f57]" aria-hidden />
                <span className="h-2 w-2 rounded-full bg-[#febc2e]" aria-hidden />
                <span className="h-2 w-2 rounded-full bg-[#28c840]" aria-hidden />
                <span className="ms-auto font-mono text-[0.65rem] tabular-nums text-[var(--text-muted)]">
                  {String(i + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
                </span>
              </div>
              <div
                className={cn(
                  "relative w-full overflow-hidden bg-[var(--bg-secondary)]",
                  i === 0 && images.length > 2 ? "aspect-[16/8]" : "aspect-[16/10]",
                )}
              >
                <Image
                  src={src}
                  alt={`${altBase} — ${i + 1}`}
                  fill
                  quality={92}
                  className={cn(
                    "object-cover object-top",
                    !reducedMotion && "transition-[object-position] duration-[3200ms] ease-in-out group-hover/img:object-bottom",
                  )}
                  sizes={i === 0 ? "(max-width: 1200px) 92vw, 1150px" : "(max-width: 640px) 92vw, 560px"}
                />
                <span className="pointer-events-none absolute end-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/55 text-white opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover/img:opacity-100">
                  <Expand className="h-4 w-4" aria-hidden />
                </span>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="mt-8 columns-1 gap-x-4 sm:columns-2 lg:columns-3">
          {images.map((src, i) => (
            <button
              key={`${src}-${i}`}
              type="button"
              onClick={() => setOpen(i)}
              className="group/img mb-4 w-full break-inside-avoid text-start focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] motion-reduce:transition-none"
            >
              <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] transition hover:border-[var(--accent)]/35 hover:shadow-lg hover:shadow-[color-mix(in_srgb,var(--accent)_12%,transparent)]">
                <Image
                  src={src}
                  alt={`${altBase} — ${i + 1}`}
                  width={1920}
                  height={1440}
                  quality={92}
                  className="w-full object-cover transition duration-300 group-hover/img:scale-[1.03] motion-reduce:group-hover/img:scale-100"
                  sizes="(max-width: 640px) 96vw, (max-width: 1024px) 50vw, (max-width: 1536px) 34vw, 420px"
                />
              </div>
            </button>
          ))}
        </div>
      )}

      <AnimatePresence mode="wait">
        {open !== null && (
          <m.div
            role="dialog"
            aria-modal="true"
            aria-label={t("gallery_dialog_label")}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex flex-col bg-[color-mix(in_srgb,var(--bg-primary)_28%,#000)] backdrop-blur-md"
          >
            <div className="flex shrink-0 items-center justify-between gap-3 border-b border-[var(--border)]/60 px-4 py-3 md:px-6">
              <p className="text-sm font-medium tabular-nums text-[var(--text-secondary)]">
                {open + 1} / {images.length}
              </p>
              <button
                type="button"
                onClick={close}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--glass-bg)] text-[var(--text-primary)] transition hover:border-[var(--accent)]/40 hover:text-[var(--accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
                aria-label={t("gallery_close")}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="relative flex min-h-0 flex-1 items-center justify-center px-2 py-4 md:px-10">
              <m.div
                key={open}
                initial={{ opacity: 0.85, scale: 0.985 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.22 }}
                className="relative h-[min(78vh,calc(100vh-9rem))] w-full max-w-6xl"
              >
                <Image
                  src={images[open]!}
                  alt={`${altBase} — ${open + 1}`}
                  fill
                  quality={95}
                  className="object-contain"
                  sizes="(max-width: 1280px) 92vw, min(1152px, 85vw)"
                  priority
                />
              </m.div>

              {images.length > 1 ? (
                <>
                  <button
                    type="button"
                    onClick={prev}
                    className="absolute start-2 top-1/2 z-[1] inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--glass-bg-strong)] text-[var(--text-primary)] shadow-lg backdrop-blur-md transition hover:border-[var(--accent)]/45 hover:text-[var(--accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] md:start-6"
                    aria-label={t("gallery_prev")}
                  >
                    <ChevronLeft className="h-6 w-6 rtl:rotate-180" aria-hidden />
                  </button>
                  <button
                    type="button"
                    onClick={next}
                    className="absolute end-2 top-1/2 z-[1] inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--glass-bg-strong)] text-[var(--text-primary)] shadow-lg backdrop-blur-md transition hover:border-[var(--accent)]/45 hover:text-[var(--accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] md:end-6"
                    aria-label={t("gallery_next")}
                  >
                    <ChevronRight className="h-6 w-6 rtl:rotate-180" aria-hidden />
                  </button>
                </>
              ) : null}
            </div>

            {images.length > 1 ? (
              <div className="flex shrink-0 justify-center gap-2 overflow-x-auto border-t border-[var(--border)]/60 px-4 py-3">
                {images.map((src, i) => (
                  <button
                    key={`thumb-${src}-${i}`}
                    type="button"
                    onClick={() => setOpen(i)}
                    aria-label={`${i + 1} / ${images.length}`}
                    aria-current={open === i}
                    className={cn(
                      "relative h-12 w-20 shrink-0 overflow-hidden rounded-lg ring-2 transition",
                      open === i ? "ring-[var(--accent)]" : "opacity-60 ring-transparent hover:opacity-100",
                    )}
                  >
                    <Image src={src} alt="" fill sizes="80px" className="object-cover object-top" />
                  </button>
                ))}
              </div>
            ) : null}
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
