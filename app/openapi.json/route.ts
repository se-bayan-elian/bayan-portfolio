import { personal } from "@/data/personal";
import { SITE } from "@/lib/agent-content";

export const dynamic = "force-static";

export function GET() {
  const spec = {
    openapi: "3.1.0",
    info: {
      title: `${personal.name} — portfolio API`,
      version: "1.0.0",
      description: "Read-only public data about Bayan's profile, skills, projects and experience.",
      contact: { name: personal.name, email: personal.email, url: SITE },
    },
    servers: [{ url: SITE }],
    paths: {
      "/api/profile": {
        get: {
          operationId: "getProfile",
          summary: "Profile, availability, contact options, skills, projects and experience",
          responses: { "200": { description: "Profile JSON", content: { "application/json": { schema: { type: "object" } } } } },
        },
      },
    },
  };
  return Response.json(spec, { headers: { "Access-Control-Allow-Origin": "*" } });
}
