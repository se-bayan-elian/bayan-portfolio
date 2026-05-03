"use client";

import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { Bot, ChevronDown, Loader2, Send, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const BRAND_LOGO_SRC = "/images/bezo-logo.png";

type Message = {
  id: number;
  role: "user" | "assistant";
  content: string;
};

function parseMarkdown(text: string) {
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/\n/g, "<br />");
}

export function BezoChat() {
  const t = useTranslations("bezo");
  const locale = useLocale();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [dailyLimitReached, setDailyLimitReached] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const nextId = useRef(1);
  const reducedMotion = useReducedMotion();

  const welcome: Message = {
    id: 0,
    role: "assistant",
    content: t("welcome"),
  };

  const visibleMessages = messages.length === 0 ? [welcome] : messages;

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 120);
    }
  }, [open]);

  const resizeInput = () => {
    const el = inputRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    resizeInput();
  }, [input, open]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading || dailyLimitReached) return;

    const userMsg: Message = {
      id: nextId.current++,
      role: "user",
      content: text,
    };
    const allMessages =
      messages.length === 0 ? [welcome, userMsg] : [...messages, userMsg];
    setMessages(allMessages);
    setInput("");
    setLoading(true);
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
    }

    try {
      const history = allMessages.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history, locale }),
      });

      const data = await res.json();
      let reply: string;
      if (res.status === 429 && data.error === "daily_limit") {
        setDailyLimitReached(true);
        reply =
          data.message ??
          (locale === "ar"
            ? "يا أهلا! وصلت الحد اليومي (10 رسايل). ارجع بكرا وبكمّل معك."
            : locale === "fr"
              ? "Vous avez atteint la limite du jour (10 messages). Revenez demain."
              : "You've reached today's limit (10 messages). Please come back tomorrow.");
      } else if (res.status === 429 || data.error === "quota") {
        reply = t("error_quota");
      } else if (!res.ok) {
        reply = t("error_generic");
      } else {
        reply = data.reply ?? t("error_generic");
      }

      setMessages((prev) => [
        ...prev,
        { id: nextId.current++, role: "assistant", content: reply },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: nextId.current++,
          role: "assistant",
          content: t("error_generic"),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (dailyLimitReached) return;
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <>
      {/* FAB toggle */}
      <m.button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? t("close") : t("open")}
        className={cn(
          "telegram-fab overflow-visible fixed bottom-4 end-4 z-[54] flex h-[3.65rem] w-[3.65rem] items-center justify-center rounded-full bg-[var(--accent)] text-white shadow-[0_12px_40px_-8px_color-mix(in_srgb,var(--accent)_60%,transparent)] outline-none ring-2 ring-white/20 transition-colors hover:bg-[var(--accent-hover)] md:bottom-2 md:end-8",
          !open && !reducedMotion && "telegram-fab-bounce",
        )}
        whileHover={reducedMotion ? undefined : { scale: 1.06 }}
        whileTap={reducedMotion ? undefined : { scale: 0.94 }}
      >
        {!open && !reducedMotion ? (
          <>
            <span
              className="telegram-fab__pulse pointer-events-none"
              aria-hidden
            />
            <span
              className="telegram-fab__pulse telegram-fab__pulse--delay pointer-events-none"
              aria-hidden
            />
            <span
              className="telegram-fab__pulse telegram-fab__pulse--delay2 pointer-events-none"
              aria-hidden
            />
          </>
        ) : null}
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <m.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <X className="h-6 w-6" aria-hidden />
            </m.span>
          ) : (
            <m.span
              key="bot"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <img
                src={BRAND_LOGO_SRC}
                alt=""
                aria-hidden
                className="h-8 w-8 rounded-full object-cover"
              />
            </m.span>
          )}
        </AnimatePresence>
      </m.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <m.div
            key="bezo-panel"
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 360, damping: 32 }}
            className={cn(
              "fixed z-[53] flex flex-col overflow-hidden",
              "rounded-3xl border border-[var(--border)] bg-[var(--glass-bg-strong)] shadow-2xl backdrop-blur-2xl",
              // Mobile: near-full width, anchored bottom
              "bottom-[2.5rem] end-2 start-2",
              "h-[min(520px,calc(100dvh-7rem))]",
              // Tablet+: fixed width, anchored to end
              "sm:start-auto sm:w-[380px] sm:end-4",
              "md:bottom-[6rem] md:end-8",
            )}
            role="dialog"
            aria-label={`${t("title")} ${t("subtitle")}`}
          >
            {/* Header */}
            <div className="flex shrink-0 items-center gap-3 border-b border-[var(--border)] bg-[color-mix(in_srgb,var(--accent)_10%,var(--glass-bg-strong))] px-4 py-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--accent)]">
                <img
                  src={BRAND_LOGO_SRC}
                  alt=""
                  aria-hidden
                  className="h-9 w-9 rounded-full object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-[var(--text-primary)]">
                  {t("title")}{" "}
                </p>
                <p className="text-xs text-[var(--text-muted)]">
                  {t("subtitle")}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-1.5">
                <span
                  className="h-2 w-2 rounded-full bg-emerald-400"
                  aria-hidden
                />
                <span className="text-xs text-[var(--text-muted)]">
                  {t("online")}
                </span>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label={t("close")}
                className="rounded-lg p-1 text-[var(--text-muted)] transition hover:bg-[var(--border)] hover:text-[var(--text-primary)]"
              >
                <ChevronDown className="h-4 w-4" aria-hidden />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4 text-sm">
              {visibleMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    "flex gap-2",
                    msg.role === "user" ? "flex-row" : "flex-row-reverse",
                  )}
                >
                  {msg.role === "assistant" && (
                    <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--accent)]">
                      <img
                        src={BRAND_LOGO_SRC}
                        alt=""
                        aria-hidden
                        className="h-6 w-6 rounded-full object-cover"
                      />
                    </div>
                  )}
                  <div
                    className={cn(
                      "max-w-[80%] rounded-2xl px-3.5 py-2.5 leading-relaxed",
                      msg.role === "user"
                        ? "rounded-tr-sm bg-[var(--accent)] text-white"
                        : "rounded-tl-sm bg-[var(--bg-primary)] text-[var(--text-primary)]",
                    )}
                    dangerouslySetInnerHTML={{
                      __html: parseMarkdown(msg.content),
                    }}
                  />
                </div>
              ))}

              {loading && (
                <div className="flex flex-row-reverse items-center gap-2">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--accent)]">
                    <img
                      src={BRAND_LOGO_SRC}
                      alt=""
                      aria-hidden
                      className="h-6 w-6 rounded-full object-cover"
                    />
                  </div>
                  <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-sm bg-[var(--bg-primary)] px-4 py-3">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[var(--text-muted)] [animation-delay:0ms]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[var(--text-muted)] [animation-delay:120ms]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[var(--text-muted)] [animation-delay:240ms]" />
                  </div>
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="shrink-0 border-t border-[var(--border)] bg-[var(--glass-bg-strong)] px-3 py-3">
              <div className="flex items-end gap-2 rounded-2xl border border-[var(--border)] bg-[var(--bg-primary)] px-3 py-2 transition focus-within:border-[var(--accent)]">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => {
                    setInput(e.target.value);
                    resizeInput();
                  }}
                  onKeyDown={handleKey}
                  placeholder={
                    dailyLimitReached
                      ? locale === "ar"
                        ? "وصلت الحد اليومي (10 رسايل) - جرّب بكرا."
                        : locale === "fr"
                          ? "Limite quotidienne atteinte (10 messages) - réessayez demain."
                          : "Daily limit reached (10 messages) - try again tomorrow."
                      : t("placeholder")
                  }
                  rows={1}
                  disabled={loading || dailyLimitReached}
                  className="flex-1 resize-y bg-transparent text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none disabled:opacity-50"
                  style={{ minHeight: 24, maxHeight: 160 }}
                />
                <button
                  onClick={send}
                  disabled={!input.trim() || loading || dailyLimitReached}
                  aria-label="Send"
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-[var(--accent)] text-white transition hover:bg-[var(--accent-hover)] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {loading ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden />
                  ) : (
                    <Send className="h-3.5 w-3.5 rtl:scale-x-100" aria-hidden />
                  )}
                </button>
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
