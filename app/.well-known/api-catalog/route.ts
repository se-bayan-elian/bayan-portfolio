import { SITE } from "@/lib/agent-content";

export const dynamic = "force-static";

/** RFC 9727 API catalog (application/linkset+json). */
export function GET() {
  const body = {
    linkset: [
      {
        anchor: `${SITE}/api/profile`,
        "service-desc": [{ href: `${SITE}/openapi.json`, type: "application/openapi+json" }],
        "service-doc": [{ href: `${SITE}/llms.txt`, type: "text/plain" }],
        status: [{ href: `${SITE}/api/profile`, type: "application/json" }],
      },
    ],
  };
  return new Response(JSON.stringify(body, null, 2), {
    headers: { "Content-Type": "application/linkset+json", "Access-Control-Allow-Origin": "*" },
  });
}
