"use client";

import { useEffect, useState } from "react";

type Props = {
  phrases: string[];
  className?: string;
};

export function TypingAnimation({ phrases, className }: Props) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [text, setText] = useState("");

  useEffect(() => {
    setPhraseIndex(0);
    setText("");
  }, [phrases]);

  useEffect(() => {
    const phrase = phrases[phraseIndex % phrases.length] ?? "";
    let pos = 0;
    let timeout: ReturnType<typeof setTimeout>;

    const typeChar = () => {
      pos += 1;
      setText(phrase.slice(0, pos));
      if (pos < phrase.length) {
        timeout = setTimeout(typeChar, 42);
      } else {
        timeout = setTimeout(deleteChar, 1600);
      }
    };

    const deleteChar = () => {
      pos -= 1;
      setText(phrase.slice(0, pos));
      if (pos > 0) {
        timeout = setTimeout(deleteChar, 28);
      } else {
        setPhraseIndex((i) => i + 1);
      }
    };

    typeChar();
    return () => clearTimeout(timeout);
  }, [phraseIndex, phrases]);

  return (
    <span className={className} aria-live="polite">
      {text}
      <span className="ms-0.5 inline-block h-[1em] w-px animate-pulse bg-[var(--accent)] align-[-0.1em]" />
    </span>
  );
}
