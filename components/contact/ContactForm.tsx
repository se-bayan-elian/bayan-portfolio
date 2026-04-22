"use client";

import { m } from "framer-motion";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
});

type FormValues = z.infer<typeof schema>;

export function ContactForm() {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<FormValues>({ defaultValues: { name: "", email: "", message: "" } });

  const onSubmit = async (values: FormValues) => {
    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      for (const issue of parsed.error.issues) {
        const key = issue.path[0];
        if (key === "name" || key === "email" || key === "message") {
          setError(key, { type: "validate" });
        }
      }
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (!res.ok) throw new Error("bad");
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
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
            className="mt-2 w-full rounded-2xl border border-[var(--border)] bg-[var(--bg-primary)] px-4 py-3 text-sm text-[var(--text-primary)] transition focus:border-[var(--accent)]"
            {...register("name")}
          />
          {errors.name ? (
            <p className="mt-1 text-xs text-red-500" role="alert">
              {t("form_error")}
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
            className="mt-2 w-full rounded-2xl border border-[var(--border)] bg-[var(--bg-primary)] px-4 py-3 text-sm text-[var(--text-primary)] transition focus:border-[var(--accent)]"
            {...register("email")}
          />
          {errors.email ? (
            <p className="mt-1 text-xs text-red-500" role="alert">
              {t("form_error")}
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
            className="mt-2 w-full resize-y rounded-2xl border border-[var(--border)] bg-[var(--bg-primary)] px-4 py-3 text-sm text-[var(--text-primary)] transition focus:border-[var(--accent)]"
            {...register("message")}
          />
          {errors.message ? (
            <p className="mt-1 text-xs text-red-500" role="alert">
              {t("form_error")}
            </p>
          ) : null}
        </div>
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--accent-hover)] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "sending" ? t("form_sending") : t("form_submit")}
      </button>

      {status === "success" ? (
        <p className="mt-4 text-sm text-emerald-600 dark:text-emerald-400" role="status">
          {t("form_success")}
        </p>
      ) : null}
      {status === "error" ? (
        <p className="mt-4 text-sm text-red-500" role="alert">
          {t("form_error")}
        </p>
      ) : null}
    </m.form>
  );
}
