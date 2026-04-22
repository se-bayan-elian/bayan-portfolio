"use client";

import { useId } from "react";
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
        className="min-w-0 bg-gradient-to-l from-[var(--logo-gradient-start)] to-[var(--logo-gradient-end)] bg-clip-text text-base font-semibold leading-tight text-transparent"
        style={{ fontFamily: "var(--font-arabic), var(--font-sans), sans-serif" }}
      >
        {full}
      </span>
    );
  }
  const { first, rest } = splitNameForMark(full);
  if (!rest) {
    return <span className="text-base font-semibold text-[var(--text-primary)]">{first}</span>;
  }
  return (
    <span className="inline min-w-0 text-base font-semibold leading-tight">
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
      className="text-[0.65rem] font-medium uppercase tracking-[0.2em] text-[var(--text-muted)]"
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
        style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }}
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

  const markSize =
    size === "sm" ? "h-8 w-8" : size === "lg" ? "h-11 w-11 md:h-12 md:w-12" : "h-9 w-9 sm:h-10 sm:w-10";

  if (variant === "mark") {
    return (
      <span className={cn("inline-flex shrink-0", className)}>
        <LogoMark className={markSize} labelId={gradId} />
      </span>
    );
  }

  return (
    <div
      className={cn(
        "flex min-w-0 items-center gap-2.5 sm:gap-3",
        size === "sm" && "gap-2",
        className,
      )}
    >
      <LogoMark className={markSize} labelId={gradId} />
      <div className="flex min-w-0 flex-col items-start gap-0 text-start">
        <NameLine locale={locale} />
        <SubtitleLine locale={locale} />
      </div>
    </div>
  );
}
