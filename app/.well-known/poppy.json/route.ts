import { personal } from "@/data/personal";
import { SITE_HOST } from "@/lib/agent-content";

export const dynamic = "force-static";

/** Personal Agent Protocol — website-only declaration (no agent auth / APIs). */
export function GET() {
  return Response.json({
    protocol_version: "0.1",
    organization: { name: personal.name, domain: SITE_HOST },
    web: {},
  });
}
