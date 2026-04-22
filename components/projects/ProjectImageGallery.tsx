"use client";

import { AnimatePresence, m } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";

type Props = {
  images: string[];
  altBase: string;
};

export function ProjectImageGallery({ images, altBase }: Props) {
  const t = useTranslations("projects");
  const [open, setOpen] = useState<number | null>(null);

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
      <div className="mt-8 columns-1 gap-x-4 sm:columns-2 lg:columns-3">
        {images.map((src, i) => (
          <button
            key={`${src}-${i}`}
            type="button"
            onClick={() => setOpen(i)}
            className="group/img mb-4 w-full break-inside-avoid overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] text-start transition hover:border-[var(--accent)]/35 hover:shadow-lg hover:shadow-[color-mix(in_srgb,var(--accent)_12%,transparent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] motion-reduce:transition-none"
          >
            <Image
              src={src}
              alt={`${altBase} — ${i + 1}`}
              width={960}
              height={720}
              className="w-full object-cover transition duration-300 group-hover/img:scale-[1.03] motion-reduce:group-hover/img:scale-100"
              sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
            />
          </button>
        ))}
      </div>

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
                  className="object-contain"
                  sizes="100vw"
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
