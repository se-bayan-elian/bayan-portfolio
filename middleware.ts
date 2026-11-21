import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { routing } from "./i18n/routing";

const intl = createMiddleware(routing);

/** Markdown for Agents: `Accept: text/markdown` gets a Markdown rendering of the page. */
function wantsMarkdown(req: NextRequest) {
  const accept = req.headers.get("accept") ?? "";
  return accept.includes("text/markdown");
}

export default function middleware(req: NextRequest) {
  if (wantsMarkdown(req)) {
    const url = req.nextUrl.clone();
    url.pathname = `/agent-md${req.nextUrl.pathname === "/" ? "" : req.nextUrl.pathname}`;
    return NextResponse.rewrite(url);
  }
  const res = intl(req);
  res.headers.append("Vary", "Accept");
  res.headers.append("Link", '</llms.txt>; rel="describedby"; type="text/plain"');
  res.headers.append("Link", '</.well-known/ai-catalog.json>; rel="ai-catalog"; type="application/json"');
  return res;
}

export const config = {
  matcher: ["/", "/(ar|en|fr)/:path*", "/((?!api|agent-md|_next|_vercel|.*\\..*).*)"],
};
