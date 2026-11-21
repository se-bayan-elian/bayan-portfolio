import { SITE } from "@/lib/agent-content";

export const dynamic = "force-static";

/** Explicit AI crawler rules + Content Signals (contentsignals.org). */
const AI_BOTS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
  "Meta-ExternalAgent",
];

// Private form/chat endpoints stay closed; the read-only profile API is open to agents.
const PRIVATE = ["/api/contact", "/api/coffee-chat", "/api/chat"];

export function GET() {
  const signal = "Content-Signal: search=yes, ai-input=yes, ai-train=no";
  const group = (ua: string) => [`User-Agent: ${ua}`, signal, "Allow: /", ...PRIVATE.map((p) => `Disallow: ${p}`)].join("\n");
  const body = [
    "# Humans and agents welcome. See /llms.txt for a guided overview.",
    group("*"),
    ...AI_BOTS.map(group),
    `Sitemap: ${SITE}/sitemap.xml`,
    "",
  ].join("\n\n");
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
