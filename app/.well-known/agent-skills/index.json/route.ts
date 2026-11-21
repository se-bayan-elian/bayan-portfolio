import { SITE } from "@/lib/agent-content";
import { hireSkillMarkdown, sha256 } from "@/lib/agent-skill";

export const dynamic = "force-static";

/** Agent Skills Discovery index (v0.2.0). */
export function GET() {
  const md = hireSkillMarkdown();
  const body = {
    $schema: "https://agentskills.io/schemas/discovery/v0.2.0/index.json",
    skills: [
      {
        name: "hire-bayan",
        type: "skill-md",
        description: "Learn about Bayan Alreqeb (full-stack engineer) and contact him about a project or role.",
        url: `${SITE}/.well-known/agent-skills/hire-bayan/SKILL.md`,
        sha256: sha256(md),
      },
    ],
  };
  return Response.json(body, { headers: { "Access-Control-Allow-Origin": "*" } });
}
