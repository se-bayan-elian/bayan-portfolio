/**
 * Server-side check: can this URL be shown inside an <iframe> on our domain?
 * Looks at X-Frame-Options and CSP `frame-ancestors`. Cached for a day; any error → false.
 */
export async function isFrameable(url: string | undefined | null): Promise<boolean> {
  const target = url?.trim();
  if (!target) return false;
  try {
    const res = await fetch(target, {
      method: "GET",
      redirect: "follow",
      signal: AbortSignal.timeout(5000),
      next: { revalidate: 86400 },
      headers: { "User-Agent": "Mozilla/5.0 (portfolio preview check)" },
    });
    if (!res.ok) return false;
    const xfo = res.headers.get("x-frame-options")?.toLowerCase() ?? "";
    if (xfo.includes("deny") || xfo.includes("sameorigin")) return false;
    const csp = res.headers.get("content-security-policy")?.toLowerCase() ?? "";
    const fa = csp.split(";").map((d) => d.trim()).find((d) => d.startsWith("frame-ancestors"));
    if (fa && !fa.includes("*")) return false;
    return true;
  } catch {
    return false;
  }
}
