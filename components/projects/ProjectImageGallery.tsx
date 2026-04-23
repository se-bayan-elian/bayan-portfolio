"use client";

import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/** Nine scrapbook-style frames (rotation + thick border); cycles for more than nine images. */
const SCRAPBOOK_PRESETS: { deg: number; shell: string }[] = [
  {
    deg: -2.4,
    shell:
      "border-[10px] border-violet-500 bg-[color-mix(in_srgb,var(--bg-primary)_92%,#faf5ff)] shadow-[8px_12px_0_0_rgba(124,58,237,0.18)] dark:border-violet-400 dark:bg-[color-mix(in_srgb,var(--bg-primary)_88%,#1e1033)] dark:shadow-[8px_12px_0_0_rgba(167,139,250,0.12)]",
  },
  {
    deg: 2.1,
    shell:
      "border-[10px] border-teal-500 bg-[color-mix(in_srgb,var(--bg-primary)_90%,#f0fdfa)] shadow-[7px_10px_0_0_rgba(20,184,166,0.2)] dark:border-teal-400 dark:bg-[color-mix(in_srgb,var(--bg-primary)_88%,#042f2e)] dark:shadow-[7px_10px_0_0_rgba(45,212,191,0.12)]",
  },
  {
    deg: -1.7,
    shell:
      "border-[10px] border-amber-800 bg-[color-mix(in_srgb,var(--bg-primary)_88%,#fffbeb)] shadow-[9px_11px_0_0_rgba(146,64,14,0.2)] dark:border-amber-600 dark:bg-[color-mix(in_srgb,var(--bg-primary)_90%,#292524)] dark:shadow-[9px_11px_0_0_rgba(217,119,6,0.15)]",
  },
  {
    deg: 1.9,
    shell:
      "border-[10px] border-lime-600 bg-[color-mix(in_srgb,var(--bg-primary)_91%,#f7fee7)] shadow-[6px_9px_0_0_rgba(101,163,13,0.22)] dark:border-lime-500 dark:bg-[color-mix(in_srgb,var(--bg-primary)_89%,#1a2e05)] dark:shadow-[6px_9px_0_0_rgba(132,204,22,0.14)]",
  },
  {
    deg: -2.1,
    shell:
      "border-[10px] border-rose-700 bg-[color-mix(in_srgb,var(--bg-primary)_89%,#fff1f2)] shadow-[8px_10px_0_0_rgba(190,18,60,0.16)] dark:border-rose-500 dark:bg-[color-mix(in_srgb,var(--bg-primary)_88%,#3f0d1d)] dark:shadow-[8px_10px_0_0_rgba(251,113,133,0.12)]",
  },
  {
    deg: 1.5,
    shell:
      "border-[10px] border-orange-600 bg-[color-mix(in_srgb,var(--bg-primary)_90%,#fff7ed)] shadow-[7px_11px_0_0_rgba(234,88,12,0.18)] dark:border-orange-500 dark:bg-[color-mix(in_srgb,var(--bg-primary)_88%,#431407)] dark:shadow-[7px_11px_0_0_rgba(251,146,60,0.12)]",
  },
  {
    deg: -2.6,
    shell:
      "border-[10px] border-slate-600 bg-[color-mix(in_srgb,var(--bg-primary)_92%,#f1f5f9)] shadow-[8px_10px_0_0_rgba(71,85,105,0.22)] dark:border-slate-400 dark:bg-[color-mix(in_srgb,var(--bg-primary)_92%,#0f172a)] dark:shadow-[8px_10px_0_0_rgba(148,163,184,0.14)]",
  },
  {
    deg: 2.3,
    shell:
      "border-[10px] border-sky-500 bg-[color-mix(in_srgb,var(--bg-primary)_91%,#f0f9ff)] shadow-[6px_10px_0_0_rgba(14,165,233,0.2)] dark:border-sky-400 dark:bg-[color-mix(in_srgb,var(--bg-primary)_88%,#082f49)] dark:shadow-[6px_10px_0_0_rgba(56,189,248,0.12)]",
  },
  {
    deg: -1.4,
    shell:
      "border-[10px] border-yellow-500 bg-[color-mix(in_srgb,var(--bg-primary)_88%,#fefce8)] shadow-[9px_12px_0_0_rgba(202,138,4,0.22)] dark:border-yellow-400 dark:bg-[color-mix(in_srgb,var(--bg-primary)_86%,#422006)] dark:shadow-[9px_12px_0_0_rgba(250,204,21,0.12)]",
  },
];

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
        <div
          className={cn(
            "mt-8 rounded-[1.75rem] border border-[var(--border)]/60 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] md:p-8",
            "bg-gradient-to-br from-[color-mix(in_srgb,var(--bg-secondary)_86%,#efe4d6)] via-[var(--bg-secondary)] to-[color-mix(in_srgb,var(--bg-secondary)_88%,#dbe7f3)]",
            "dark:from-[color-mix(in_srgb,var(--bg-secondary)_96%,#292524)] dark:via-[var(--bg-secondary)] dark:to-[color-mix(in_srgb,var(--bg-secondary)_94%,#1e293b)]",
          )}
        >
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12 lg:grid-cols-3 lg:gap-x-10 lg:gap-y-14">
            {images.map((src, i) => {
              const preset = SCRAPBOOK_PRESETS[i % SCRAPBOOK_PRESETS.length]!;
              const tilt = reducedMotion ? 0 : preset.deg;
              return (
                <button
                  key={`${src}-${i}`}
                  type="button"
                  onClick={() => setOpen(i)}
                  className="group/img w-full text-start focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
                >
                  <m.div
                    className="origin-center"
                    initial={{ rotate: tilt, y: 0, scale: 1 }}
                    animate={{ rotate: tilt, y: 0, scale: 1 }}
                    whileHover={
                      reducedMotion
                        ? undefined
                        : {
                            rotate: 0,
                            y: -10,
                            scale: 1.02,
                            boxShadow: "0 28px 50px -18px rgba(0,0,0,0.32)",
                            transition: { type: "spring", stiffness: 320, damping: 22 },
                          }
                    }
                    transition={{ type: "spring", stiffness: 280, damping: 26 }}
                  >
                    <div className={cn("rounded-[3px] p-[6px]", preset.shell)}>
                      <div className="relative aspect-square w-full overflow-hidden rounded-[2px] bg-white shadow-[inset_0_2px_6px_rgba(0,0,0,0.08)] dark:bg-zinc-950">
                        <Image
                          src={src}
                          alt={`${altBase} — ${i + 1}`}
                          fill
                          quality={92}
                          className={cn(
                            "object-cover transition duration-500 ease-out motion-reduce:group-hover/img:scale-100",
                            !reducedMotion && "group-hover/img:scale-[1.05]",
                          )}
                          sizes="(max-width: 640px) 88vw, (max-width: 1024px) 44vw, 30vw"
                        />
                      </div>
                    </div>
                  </m.div>
                </button>
              );
            })}
          </div>
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
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
