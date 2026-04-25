"use client";

import { NextIntlClientProvider } from "next-intl";
import type { AbstractIntlMessages, Locale } from "next-intl";
import type { ReactNode } from "react";
import { GoogleTags } from "@/components/analytics/GoogleTags";
import { MotionProvider } from "./MotionProvider";
import { ThemeProvider } from "./ThemeProvider";
import { ToasterHost } from "./ToasterHost";
import { useParams } from "next/navigation";
import ClarityProvider from './MsClarityProvider'
type Props = {
  children: ReactNode;
  messages: AbstractIntlMessages;
};

export function AppProviders({ children, messages }: Props) {
  const locale = useParams().locale;
  return (
    <ClarityProvider/>
    <NextIntlClientProvider messages={messages} locale={locale as Locale}>
      <ThemeProvider>
        <MotionProvider>{children}</MotionProvider>
        <ToasterHost />
        <GoogleTags />
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
