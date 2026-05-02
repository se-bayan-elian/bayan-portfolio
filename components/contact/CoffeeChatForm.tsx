"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { m } from "framer-motion";
import { Calendar, Clock, Loader2, Mail, Send } from "lucide-react";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

function buildSchema(t: (k: string) => string) {
  return z.object({
    name: z.string().min(2, t("validation_name")),
    email: z.string().email(t("validation_email")),
    date: z.string().min(1, t("validation_date")),
    time: z.string().min(1, t("validation_time")),
    topic: z.string().min(5, t("validation_topic")),
  });
}

type FormValues = z.infer<ReturnType<typeof buildSchema>>;

export function CoffeeChatForm() {
  const t = useTranslations("coffee_chat");
  const schema = useMemo(() => buildSchema(t), [t]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", date: "", time: "", topic: "" },
    mode: "onTouched",
  });

  const onSubmit = async (values: FormValues) => {
    try {
      const res = await fetch("/api/coffee-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error();
      toast.success(t("success"), {
        className:
          "!border-[color-mix(in_srgb,var(--color-coffee)_42%,var(--glass-border))] !bg-[color-mix(in_srgb,var(--color-coffee)_12%,var(--glass-bg-strong))]",
      });
      reset();
    } catch {
      toast.error(t("error"), {
        className:
          "!border-[color-mix(in_srgb,#f87171_48%,var(--glass-border))] !bg-[color-mix(in_srgb,#ef4444_10%,var(--glass-bg-strong))]",
      });
    }
  };

  const input =
    "mt-1.5 w-full rounded-2xl border border-[var(--border)] bg-[var(--bg-primary)] px-4 py-3 text-sm text-[var(--text-primary)] transition placeholder:text-[var(--text-muted)] focus:border-[var(--color-coffee)] focus:outline-none aria-invalid:border-red-500/80";
  const label = "block text-sm font-medium text-[var(--text-primary)]";
  const err = "mt-1 text-xs text-red-500";

  return (
    <m.form
      onSubmit={handleSubmit(onSubmit)}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-3xl card-surface p-6 md:p-8"
      noValidate
    >
      {/* Intro */}
      <div className="mb-6 flex items-start gap-3">
        <span className="text-3xl leading-none" role="img" aria-label="coffee">☕</span>
        <div>
          <p className="font-semibold text-[var(--text-primary)]">{t("form_intro_heading")}</p>
          <p className="mt-0.5 text-sm text-[var(--text-muted)]">{t("form_intro_body")}</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Name + Email */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="cf-name" className={label}>{t("label_name")}</label>
            <input
              id="cf-name"
              autoComplete="name"
              placeholder={t("placeholder_name")}
              className={input}
              aria-invalid={errors.name ? true : undefined}
              {...register("name")}
            />
            {errors.name && <p className={err}>{errors.name.message}</p>}
          </div>
          <div>
            <label htmlFor="cf-email" className={label}>{t("label_email")}</label>
            <input
              id="cf-email"
              type="email"
              autoComplete="email"
              placeholder={t("placeholder_email")}
              className={input}
              aria-invalid={errors.email ? true : undefined}
              {...register("email")}
            />
            {errors.email && <p className={err}>{errors.email.message}</p>}
          </div>
        </div>

        {/* Date + Time */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="cf-date" className={label}>
              <Calendar className="mb-0.5 me-1.5 inline h-3.5 w-3.5 text-[var(--color-coffee)]" aria-hidden />
              {t("label_date")}
            </label>
            <input
              id="cf-date"
              type="date"
              className={input}
              aria-invalid={errors.date ? true : undefined}
              {...register("date")}
            />
            {errors.date && <p className={err}>{errors.date.message}</p>}
          </div>
          <div>
            <label htmlFor="cf-time" className={label}>
              <Clock className="mb-0.5 me-1.5 inline h-3.5 w-3.5 text-[var(--color-coffee)]" aria-hidden />
              {t("label_time")}
            </label>
            <input
              id="cf-time"
              type="time"
              className={input}
              aria-invalid={errors.time ? true : undefined}
              {...register("time")}
            />
            {errors.time && <p className={err}>{errors.time.message}</p>}
          </div>
        </div>

        {/* Topic */}
        <div>
          <label htmlFor="cf-topic" className={label}>{t("label_topic")}</label>
          <textarea
            id="cf-topic"
            rows={5}
            placeholder={t("placeholder_topic")}
            className={`${input} resize-y`}
            aria-invalid={errors.topic ? true : undefined}
            {...register("topic")}
          />
          {errors.topic && <p className={err}>{errors.topic.message}</p>}
        </div>
      </div>

      <p className="mt-4 flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
        <Mail className="h-3 w-3 shrink-0" aria-hidden />
        {t("footer_note")}
      </p>

      <m.button
        type="submit"
        disabled={isSubmitting}
        className="group/submit mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[var(--color-coffee)] px-5 py-3 text-sm font-semibold text-white shadow-md shadow-[color-mix(in_srgb,var(--color-coffee)_35%,transparent)] transition hover:bg-[var(--color-coffee-hover)] disabled:cursor-not-allowed disabled:opacity-60"
        whileHover={isSubmitting ? undefined : { scale: 1.01 }}
        whileTap={isSubmitting ? undefined : { scale: 0.985 }}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 shrink-0 animate-spin" aria-hidden />
            {t("submitting")}
          </>
        ) : (
          <>
            <Send className="h-4 w-4 shrink-0 transition duration-300 group-hover/submit:-translate-y-0.5 group-hover/submit:translate-x-0.5 rtl:-scale-x-100" aria-hidden />
            {t("submit")}
          </>
        )}
      </m.button>
    </m.form>
  );
}
