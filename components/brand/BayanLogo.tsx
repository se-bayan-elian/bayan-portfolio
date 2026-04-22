"use client";

import { useId } from "react";
import { m, useReducedMotion } from "framer-motion";
import { useLocale } from "next-intl";
import { personal } from "@/data/personal";
import { pickStr } from "@/lib/locale-text";
import type { Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

type Variant = "mark" | "horizontal";

type Props = {
  variant?: Variant;
  /** Visual size: mark = box; horizontal scales with text */
  size?: "sm" | "md" | "lg";
  className?: string;
};

function splitNameForMark(full: string) {
  const parts = full.trim().split(/\s+/);
  if (parts.length < 2) {
    return { first: full, rest: "" as string };
  }
  return { first: parts[0]!, rest: parts.slice(1).join(" ") };
}

function NameLine({ locale }: { locale: Locale }) {
  const full = pickStr(locale, personal.name, personal.nameAr, personal.nameFr);
  if (locale === "ar") {
    return (
      <span
        className="min-w-0 bg-gradient-to-l from-[var(--logo-gradient-start)] to-[var(--logo-gradient-end)] bg-clip-text text-[1.05rem] font-bold leading-tight text-transparent"
        style={{ fontFamily: "var(--font-arabic), var(--font-sans), sans-serif" }}
      >
        {full}
      </span>
    );
  }
  const { first, rest } = splitNameForMark(full);
  if (!rest) {
    return (
      <span className="font-logo text-[1.05rem] font-bold tracking-tight text-[var(--text-primary)]">
        {first}
      </span>
    );
  }
  return (
    <span className="inline min-w-0 font-logo text-[1.05rem] font-bold leading-tight tracking-tight">
      <span className="text-[var(--text-primary)]">{first}</span>{" "}
      <span className="bg-gradient-to-r from-[var(--logo-gradient-start)] to-[var(--logo-gradient-end)] bg-clip-text text-transparent">
        {rest}
      </span>
    </span>
  );
}

function SubtitleLine({ locale }: { locale: Locale }) {
  const line = pickStr(locale, personal.title, personal.titleAr, personal.titleFr);
  return (
    <p
      className={cn(
        "text-[0.62rem] font-semibold uppercase tracking-[0.28em] text-[var(--text-muted)]",
        locale !== "ar" && "font-logo",
      )}
      style={locale === "ar" ? { fontFamily: "var(--font-arabic), var(--font-sans), sans-serif" } : undefined}
    >
      {line}
    </p>
  );
}

function LogoMark({ className, labelId }: { className?: string; labelId: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient
          id={labelId}
          x1="4"
          y1="4"
          x2="44"
          y2="44"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="var(--logo-gradient-start)" />
          <stop offset="1" stopColor="var(--logo-gradient-end)" />
        </linearGradient>
      </defs>
      <rect
        x="2.5"
        y="2.5"
        width="43"
        height="43"
        rx="14"
        fill="var(--logo-frame-fill)"
        stroke="var(--logo-frame-stroke)"
        strokeWidth="1.25"
      />
      <text
        x="24"
        y="30.5"
        textAnchor="middle"
        fill={`url(#${labelId})`}
        style={{ fontFamily: "var(--font-logo-display)" }}
        fontSize="16.5"
        fontWeight="800"
        letterSpacing="-0.04em"
      >
        BE
      </text>
      <text
        x="36.5"
        y="40.5"
        textAnchor="end"
        fill={`url(#${labelId})`}
        style={{ fontFamily: "ui-monospace, monospace" }}
        fontSize="7.5"
        fontWeight="700"
        opacity={0.95}
      >
        {"\u003c/\u003e"}
      </text>
    </svg>
  );
}

export function BayanLogo({ variant = "horizontal", size = "md", className }: Props) {
  const reactId = useId();
  const gradId = `bayan-logo-grad-${reactId.replace(/:/g, "")}`;
  const locale = useLocale() as Locale;
  const reduceMotion = useReducedMotion();

  const markSize =
    size === "sm" ? "h-8 w-8" : size === "lg" ? "h-11 w-11 md:h-12 md:w-12" : "h-9 w-9 sm:h-10 sm:w-10";

  const skewHover = reduceMotion ? undefined : { skewX: locale === "ar" ? 5 : -5 };

  if (variant === "mark") {
    return (
      <m.span
        className={cn("inline-flex shrink-0", className)}
        whileHover={reduceMotion ? undefined : { skewX: locale === "ar" ? 6 : -6 }}
        transition={{ type: "spring", stiffness: 440, damping: 28 }}
      >
        <LogoMark className={markSize} labelId={gradId} />
      </m.span>
    );
  }

  return (
    <m.div
      className={cn(
        "group/logo inline-flex min-w-0 items-center gap-2.5 sm:gap-3",
        size === "sm" && "gap-2",
        className,
      )}
      whileHover={skewHover}
      transition={{ type: "spring", stiffness: 440, damping: 28 }}
    >
      <m.span
        className="relative shrink-0"
        whileHover={reduceMotion ? undefined : { rotate: locale === "ar" ? -2 : 2 }}
        transition={{ type: "spring", stiffness: 380, damping: 22 }}
      >
        <LogoMark className={markSize} labelId={gradId} />
        <span
          className="pointer-events-none absolute -inset-1 -z-10 rounded-2xl bg-[radial-gradient(circle_at_30%_30%,color-mix(in_srgb,var(--logo-gradient-start)_35%,transparent),transparent_65%)] opacity-0 blur-md transition-opacity duration-500 group-hover/logo:opacity-100"
          aria-hidden
        />
      </m.span>

      <div className="relative flex min-w-0 flex-col items-start gap-0.5 text-start">
        <span
          className="pointer-events-none absolute -start-3 top-1/2 hidden h-10 w-[3px] -translate-y-1/2 rounded-full bg-gradient-to-b from-[var(--logo-gradient-start)]/90 via-[var(--accent)]/35 to-[var(--logo-gradient-end)]/50 opacity-90 sm:block"
          aria-hidden
        />
        <span
          className="pointer-events-none absolute -top-2.5 end-0 flex translate-x-0.5 gap-1 opacity-80 sm:-top-3"
          aria-hidden
        >
          <span className="h-1 w-1 rounded-full bg-[var(--logo-gradient-start)] shadow-[0_0_8px_color-mix(in_srgb,var(--logo-gradient-start)_60%,transparent)]" />
          <span className="h-1 w-1 rounded-full bg-[var(--logo-gradient-end)] shadow-[0_0_8px_color-mix(in_srgb,var(--logo-gradient-end)_55%,transparent)]" />
          <span className="hidden h-1 w-1 rounded-full bg-[var(--accent)]/90 sm:inline" />
        </span>

        <div className="flex min-w-0 items-baseline gap-2">
          <NameLine locale={locale} />
          
        </div>
        <SubtitleLine locale={locale} />
      </div>
    </m.div>
  );
}
