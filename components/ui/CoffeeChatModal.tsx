"use client";

import { AnimatePresence, m } from "framer-motion";
import { Calendar, Clock, Loader2, Mail, Send, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function CoffeeChatModal({ open, onClose }: Props) {
  const t = useTranslations("coffee_chat");
  const [sending, setSending] = useState(false);

  function buildSchema() {
    return z.object({
      name: z.string().min(2, t("validation_name")),
      email: z.string().email(t("validation_email")),
      date: z.string().min(1, t("validation_date")),
      time: z.string().min(1, t("validation_time")),
      topic: z.string().min(5, t("validation_topic")),
    });
  }

  type FormValues = z.infer<ReturnType<typeof buildSchema>>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(buildSchema()),
    defaultValues: { name: "", email: "", date: "", time: "", topic: "" },
    mode: "onTouched",
  });

  useEffect(() => {
    if (!open) return;
    const handleEsc = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) reset();
  }, [open, reset]);

  const onSubmit = async (values: FormValues) => {
    setSending(true);
    try {
      const res = await fetch("/api/coffee-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("failed");
      toast.success(t("success"), {
        className:
          "!border-[color-mix(in_srgb,var(--accent)_42%,var(--glass-border))] !bg-[color-mix(in_srgb,var(--accent)_12%,var(--glass-bg-strong))]",
      });
      reset();
      onClose();
    } catch {
      toast.error(t("error"), {
        className:
          "!border-[color-mix(in_srgb,#f87171_48%,var(--glass-border))] !bg-[color-mix(in_srgb,#ef4444_10%,var(--glass-bg-strong))]",
      });
    } finally {
      setSending(false);
    }
  };

  const inputClass =
    "mt-1.5 w-full rounded-xl border border-[var(--border)] bg-[var(--bg-primary)] px-3.5 py-2.5 text-sm text-[var(--text-primary)] transition placeholder:text-[var(--text-muted)] focus:border-[var(--color-coffee)] focus:outline-none aria-invalid:border-red-500/80";
  const labelClass = "block text-xs font-medium text-[var(--text-secondary)]";
  const errorClass = "mt-1 text-xs text-red-500";

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <m.div
            key="coffee-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden
          />

          {/* Modal — scrollable on mobile */}
          <div className="fixed inset-0 z-[61] overflow-y-auto px-4 py-6 flex items-center justify-center">
            <m.div
              key="coffee-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="coffee-chat-title"
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ type: "spring", stiffness: 340, damping: 30 }}
              className="relative w-full max-w-md rounded-3xl border border-[var(--border)] bg-[var(--glass-bg-strong)] p-5 sm:p-6 shadow-2xl backdrop-blur-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close */}
              <button
                onClick={onClose}
                aria-label={t("close")}
                className="absolute end-4 top-4 rounded-xl p-1.5 text-[var(--text-muted)] transition hover:bg-[var(--border)] hover:text-[var(--text-primary)]"
              >
                <X className="h-4 w-4" aria-hidden />
              </button>

              {/* Header */}
              <div className="mb-5 pe-6">
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-2xl" role="img" aria-label="coffee">☕</span>
                  <h2
                    id="coffee-chat-title"
                    className="text-lg font-semibold text-[var(--text-primary)] sm:text-xl"
                  >
                    {t("title")}
                  </h2>
                </div>
                <p className="text-sm text-[var(--text-muted)]">{t("subtitle")}</p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
                {/* Name + Email */}
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <label htmlFor="cc-name" className={labelClass}>{t("label_name")}</label>
                    <input
                      id="cc-name"
                      autoComplete="name"
                      placeholder={t("placeholder_name")}
                      className={inputClass}
                      aria-invalid={errors.name ? true : undefined}
                      {...register("name")}
                    />
                    {errors.name && <p className={errorClass}>{errors.name.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="cc-email" className={labelClass}>{t("label_email")}</label>
                    <input
                      id="cc-email"
                      type="email"
                      autoComplete="email"
                      placeholder={t("placeholder_email")}
                      className={inputClass}
                      aria-invalid={errors.email ? true : undefined}
                      {...register("email")}
                    />
                    {errors.email && <p className={errorClass}>{errors.email.message}</p>}
                  </div>
                </div>

                {/* Date + Time */}
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <label htmlFor="cc-date" className={labelClass}>
                      <Calendar className="mb-0.5 me-1 inline h-3 w-3" aria-hidden />
                      {t("label_date")}
                    </label>
                    <input
                      id="cc-date"
                      type="date"
                      className={inputClass}
                      aria-invalid={errors.date ? true : undefined}
                      {...register("date")}
                    />
                    {errors.date && <p className={errorClass}>{errors.date.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="cc-time" className={labelClass}>
                      <Clock className="mb-0.5 me-1 inline h-3 w-3" aria-hidden />
                      {t("label_time")}
                    </label>
                    <input
                      id="cc-time"
                      type="time"
                      className={inputClass}
                      aria-invalid={errors.time ? true : undefined}
                      {...register("time")}
                    />
                    {errors.time && <p className={errorClass}>{errors.time.message}</p>}
                  </div>
                </div>

                {/* Topic */}
                <div>
                  <label htmlFor="cc-topic" className={labelClass}>{t("label_topic")}</label>
                  <textarea
                    id="cc-topic"
                    rows={3}
                    placeholder={t("placeholder_topic")}
                    className={`${inputClass} resize-none`}
                    aria-invalid={errors.topic ? true : undefined}
                    {...register("topic")}
                  />
                  {errors.topic && <p className={errorClass}>{errors.topic.message}</p>}
                </div>

                <p className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
                  <Mail className="h-3 w-3 shrink-0" aria-hidden />
                  {t("footer_note")}
                </p>

                <m.button
                  type="submit"
                  disabled={sending}
                  className="group/btn inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[var(--color-coffee)] px-5 py-3 text-sm font-semibold text-white shadow-md shadow-[color-mix(in_srgb,var(--color-coffee)_35%,transparent)] transition hover:bg-[var(--color-coffee-hover)] disabled:cursor-not-allowed disabled:opacity-60"
                  whileHover={sending ? undefined : { scale: 1.01 }}
                  whileTap={sending ? undefined : { scale: 0.985 }}
                >
                  {sending ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                      {t("submitting")}
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 transition duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5 rtl:-scale-x-100" aria-hidden />
                      {t("submit")}
                    </>
                  )}
                </m.button>
              </form>
            </m.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
