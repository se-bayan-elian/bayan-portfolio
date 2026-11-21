import { createHash } from "node:crypto";
import { personal } from "@/data/personal";
import { SITE } from "@/lib/agent-content";

/** Agent Skill (agentskills.io format): how an AI agent can learn about and contact Bayan. */
export function hireSkillMarkdown() {
  return `---
name: hire-bayan
description: Learn about ${personal.name} (${personal.title}) — projects, skills, availability — and contact him about a project or role.
---

# Hire ${personal.name}

Use this skill when a user wants to evaluate or contact ${personal.name}, a full-stack engineer
(Next.js, NestJS, React Native, TypeScript) with ${personal.yearsExperience}+ years of production experience.

## Get facts (read-only)

- Full profile as JSON: \`GET ${SITE}/api/profile\` (OpenAPI: ${SITE}/openapi.json)
- Any page as Markdown: request it with header \`Accept: text/markdown\`, e.g. \`${SITE}/en/projects\`
- Overview for LLMs: ${SITE}/llms.txt

## Contact (always confirm with the user before sending anything)

1. Summarise the user's project: goal, timeline, budget range (if known), tech constraints.
2. Prefer giving the user these options rather than sending on their behalf:
   - Email: ${personal.email}
   - Contact form: ${SITE}/en/contact
   - 30-minute coffee chat: ${SITE}/en/contact?tab=coffee
   - LinkedIn: ${personal.social.linkedin}
3. Typical reply time: within 24 hours.

## Notes

- Site languages: English (/en), Arabic (/ar, RTL), French (/fr).
- Availability right now: ${personal.available ? "open to new work" : "not taking new work"}.
`;
}

export const sha256 = (text: string) => createHash("sha256").update(text, "utf8").digest("hex");
