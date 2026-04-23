import { personal } from "@/data/personal";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
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
      { error: "Email service not configured (RESEND_API_KEY + CONTACT_FROM)" },
      { status: 503 },
    );
  }

  const resend = new Resend(apiKey);
  const result = await resend.emails.send({
    from,
    to,
    replyTo: parsed.data.email,
    subject: `Portfolio contact from ${parsed.data.name}`,
    text: `${parsed.data.name} <${parsed.data.email}>\n\n${parsed.data.message}`,
  });

  if (result.error) {
    return NextResponse.json({ error: "Failed to send" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
