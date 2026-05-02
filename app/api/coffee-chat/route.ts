import { personal } from "@/data/personal";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  date: z.string().min(1),
  time: z.string().min(1),
  topic: z.string().min(5),
});

export async function POST(req: Request) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = schema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM;
  const to = process.env.CONTACT_TO ?? personal.email;

  if (!apiKey || !from) {
    return NextResponse.json(
      { error: "Email service not configured" },
      { status: 503 },
    );
  }

  const { name, email, date, time, topic } = parsed.data;

  const resend = new Resend(apiKey);
  const result = await resend.emails.send({
    from,
    to,
    replyTo: email,
    subject: `☕ Coffee Chat Request from ${name}`,
    text: `Coffee Chat Request\n\nName: ${name}\nEmail: ${email}\nPreferred Date: ${date}\nPreferred Time: ${time}\n\nTopic:\n${topic}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #0f0f11; color: #e2e8f0; border-radius: 12px;">
        <h2 style="color: #a78bfa; margin-bottom: 4px;">☕ Coffee Chat Request</h2>
        <p style="color: #94a3b8; margin-top: 0; font-size: 14px;">Someone wants to connect with you!</p>
        <hr style="border: none; border-top: 1px solid #27272a; margin: 20px 0;" />
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr><td style="padding: 8px 0; color: #94a3b8; width: 140px;">Name</td><td style="padding: 8px 0; font-weight: 600;">${name}</td></tr>
          <tr><td style="padding: 8px 0; color: #94a3b8;">Email</td><td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #a78bfa;">${email}</a></td></tr>
          <tr><td style="padding: 8px 0; color: #94a3b8;">Preferred Date</td><td style="padding: 8px 0;">${date}</td></tr>
          <tr><td style="padding: 8px 0; color: #94a3b8;">Preferred Time</td><td style="padding: 8px 0;">${time}</td></tr>
        </table>
        <hr style="border: none; border-top: 1px solid #27272a; margin: 20px 0;" />
        <p style="color: #94a3b8; font-size: 13px; margin-bottom: 6px;">Topic / Message</p>
        <p style="background: #18181b; padding: 16px; border-radius: 8px; margin: 0; white-space: pre-wrap;">${topic}</p>
        <hr style="border: none; border-top: 1px solid #27272a; margin: 20px 0;" />
        <p style="color: #52525b; font-size: 12px; text-align: center;">Sent from Bayan Alreqeb's portfolio — bayan-reqeb.tech</p>
      </div>
    `,
  });

  if (result.error) {
    return NextResponse.json({ error: "Failed to send" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
