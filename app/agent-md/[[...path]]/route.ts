import { markdownForPath, tokenEstimate } from "@/lib/agent-content";

/**
 * Markdown for Agents. The middleware rewrites any page request that sends
 * `Accept: text/markdown` here; browsers keep getting HTML.
 */
export async function GET(_req: Request, ctx: { params: Promise<{ path?: string[] }> }) {
  const { path = [] } = await ctx.params;
  const md = markdownForPath("/" + path.join("/"));
  if (!md) {
    return new Response("# Not found\n", { status: 404, headers: { "Content-Type": "text/markdown; charset=utf-8" } });
  }
  return new Response(md, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "x-markdown-tokens": String(tokenEstimate(md)),
      Vary: "Accept",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
