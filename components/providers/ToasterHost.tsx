"use client";

import { CheckCircle2, CircleAlert } from "lucide-react";
import type { CSSProperties } from "react";
import { Toaster } from "sonner";
import { useThemeContext } from "./ThemeProvider";

const toasterCssVars = {
  ["--width" as string]: "min(22rem, calc(100vw - 2rem))",
} as CSSProperties;

export function ToasterHost() {
  const { theme } = useThemeContext();
  const sonnerTheme = theme === "light" || theme === "solarized" ? "light" : "dark";

  return (
    <Toaster
      theme={sonnerTheme}
      richColors={false}
      closeButton
      position="top-center"
      duration={4800}
      offset={{ top: "5.75rem" }}
      className="site-sonner-toaster"
      style={toasterCssVars}
      icons={{
        success: <CheckCircle2 className="h-[18px] w-[18px] shrink-0 text-[var(--accent)]" strokeWidth={2.25} aria-hidden />,
        error: (
          <CircleAlert className="h-[18px] w-[18px] shrink-0 text-red-600 dark:text-red-400" strokeWidth={2.25} aria-hidden />
        ),
      }}
      toastOptions={{
        classNames: {
          toast:
            "!rounded-2xl !border !border-[var(--glass-border)] !bg-[color-mix(in_srgb,var(--glass-bg-strong)_85%,transparent)] !px-4 !py-3.5 !backdrop-blur-xl !gap-3 [box-shadow:var(--shadow),var(--glass-highlight),var(--glass-lowlight)]",
          title: "!text-sm !font-semibold !leading-snug !text-[var(--text-primary)]",
          description: "!text-xs !font-medium !leading-relaxed !text-[var(--text-secondary)]",
          closeButton:
            "!h-8 !w-8 !rounded-xl !border !border-[var(--glass-border)] !bg-[var(--glass-bg)] !text-[var(--text-primary)] hover:!border-[color-mix(in_srgb,var(--accent)_38%,var(--glass-border))] hover:!bg-[var(--glass-track)]",
          icon: "!self-start !mt-0.5",
        },
      }}
    />
  );
}
