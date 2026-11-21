import { profileJson } from "@/lib/agent-content";

export const dynamic = "force-static";

/** Read-only public profile for agents and integrations. */
export function GET() {
  return Response.json(profileJson(), {
    headers: { "Access-Control-Allow-Origin": "*", "Cache-Control": "public, max-age=3600" },
  });
}
