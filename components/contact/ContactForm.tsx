"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { m } from "framer-motion";
import { Loader2, Send } from "lucide-react";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

function buildContactSchema(t: (key: string) => string) {
  return z.object({
    name: z.string().min(2, { message: t("validation_name_min") }),
    email: z.string().email({ message: t("validation_email") }),
    message: z.string().min(10, { message: t("validation_message_min") }),
  });
}

type ContactFormValues = z.infer<ReturnType<typeof buildContactSchema>>;

export function ContactForm() {
  const t = useTranslations("contact");
  const [sending, setSending] = useState(false);

  const schema = useMemo(() => buildContactSchema(t), [t]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", message: "" },
    mode: "onTouched",
  });

  const onSubmit = async (values: ContactFormValues) => {
    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("bad");
      toast.success(t("form_success"), {
        className:
          "!border-[color-mix(in_srgb,var(--accent)_42%,var(--glass-border))] !bg-[color-mix(in_srgb,var(--accent)_12%,var(--glass-bg-strong))]",
      });
      reset();
    } catch {
      toast.error(t("form_error"), {
        className:
          "!border-[color-mix(in_srgb,#f87171_48%,var(--glass-border))] !bg-[color-mix(in_srgb,#ef4444_10%,var(--glass-bg-strong))]",
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <m.form
      onSubmit={handleSubmit(onSubmit)}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-3xl card-surface p-6 md:p-8"
      noValidate
    >
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="text-sm font-medium text-[var(--text-primary)]">
            {t("form_name")}
          </label>
          <input
            id="name"
            autoComplete="name"
            placeholder={t("form_name_placeholder")}
            className="mt-2 w-full rounded-2xl border border-[var(--border)] bg-[var(--bg-primary)] px-4 py-3 text-sm text-[var(--text-primary)] transition placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] aria-invalid:border-red-500/80"
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? "name-error" : undefined}
            {...register("name")}
          />
          {errors.name?.message ? (
            <p id="name-error" className="mt-1 text-xs text-red-500" role="alert">
              {errors.name.message}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="email" className="text-sm font-medium text-[var(--text-primary)]">
            {t("form_email")}
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder={t("form_email_placeholder")}
            className="mt-2 w-full rounded-2xl border border-[var(--border)] bg-[var(--bg-primary)] px-4 py-3 text-sm text-[var(--text-primary)] transition placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] aria-invalid:border-red-500/80"
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? "email-error" : undefined}
            {...register("email")}
          />
          {errors.email?.message ? (
            <p id="email-error" className="mt-1 text-xs text-red-500" role="alert">
              {errors.email.message}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="message" className="text-sm font-medium text-[var(--text-primary)]">
            {t("form_message")}
          </label>
          <textarea
            id="message"
            rows={5}
            placeholder={t("form_message_placeholder")}
            className="mt-2 w-full resize-y rounded-2xl border border-[var(--border)] bg-[var(--bg-primary)] px-4 py-3 text-sm text-[var(--text-primary)] transition placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] aria-invalid:border-red-500/80"
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={errors.message ? "message-error" : undefined}
            {...register("message")}
          />
          {errors.message?.message ? (
            <p id="message-error" className="mt-1 text-xs text-red-500" role="alert">
              {errors.message.message}
            </p>
          ) : null}
        </div>
      </div>

      <m.button
        type="submit"
        disabled={sending}
        className="group/submit mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white shadow-md shadow-[color-mix(in_srgb,var(--accent)_35%,transparent)] transition-[box-shadow,background-color] duration-300 hover:bg-[var(--accent-hover)] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60 motion-reduce:transition-none"
        whileHover={sending ? undefined : { scale: 1.01 }}
        whileTap={sending ? undefined : { scale: 0.985 }}
      >
        {sending ? (
          <>
            <Loader2 className="h-4 w-4 shrink-0 animate-spin" aria-hidden />
            <span>{t("form_sending")}</span>
          </>
        ) : (
          <>
            <Send className="h-4 w-4 shrink-0 transition duration-300 group-hover/submit:-translate-y-0.5 group-hover/submit:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover/submit:-translate-x-0.5 motion-reduce:transition-none" aria-hidden />
            <span>{t("form_submit")}</span>
          </>
        )}
      </m.button>
    </m.form>
  );
}
