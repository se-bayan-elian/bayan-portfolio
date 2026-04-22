"use client";

import { RuntimeErrorContent } from "@/components/errors/RuntimeErrorContent";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function LocaleError({ error, reset }: Props) {
  return <RuntimeErrorContent error={error} reset={reset} />;
}
