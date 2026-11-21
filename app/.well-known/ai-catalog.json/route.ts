import { personal } from "@/data/personal";
import { SITE, SITE_HOST } from "@/lib/agent-content";

export const dynamic = "force-static";

/** ARD (Agentic Resource Discovery) catalog. */
export function GET() {
  const urn = (ns: string, n: string) => `urn:air:${SITE_HOST}:${ns}:${n}`;
  const body = {
    specVersion: "1.0",
    host: { name: `${personal.name} — portfolio`, url: SITE, contact: personal.email },
    entries: [
      {
        id: urn("docs", "llms"),
        displayName: "Site overview for LLMs",
        type: "text/plain",
        url: `${SITE}/llms.txt`,
        representativeQueries: ["Who is Bayan Alreqeb?", "What projects has Bayan built?", "How do I hire a Next.js developer?"],
      },
      {
        id: urn("api", "profile"),
        displayName: "Profile API (OpenAPI)",
        type: "application/openapi+json",
        url: `${SITE}/openapi.json`,
        representativeQueries: ["Get Bayan's skills as JSON", "List Bayan's projects and tech stack", "Is Bayan available for work?"],
      },
      {
        id: urn("skill", "hire-bayan"),
        displayName: "Agent skill: hire Bayan",
        type: "text/markdown",
        url: `${SITE}/.well-known/agent-skills/hire-bayan/SKILL.md`,
        representativeQueries: ["Contact Bayan about a project", "Book a call with a full-stack engineer"],
      },
    ],
  };
  return Response.json(body, { headers: { "Access-Control-Allow-Origin": "*" } });
}
