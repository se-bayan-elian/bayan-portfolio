"use client";

import { NextIntlClientProvider, useLocale } from "next-intl";
import type { AbstractIntlMessages, Locale } from "next-intl";
import type { ReactNode } from "react";
import { MotionProvider } from "./MotionProvider";
import { ThemeProvider } from "./ThemeProvider";
import { useParams } from "next/navigation";

type Props = {
  children: ReactNode;
  messages: AbstractIntlMessages;
};

export function AppProviders({ children, messages }: Props) {
  const locale = useParams().locale;
  return (
    <NextIntlClientProvider messages={messages} locale={locale as Locale}>
      <ThemeProvider>
        <MotionProvider>{children}</MotionProvider>
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
