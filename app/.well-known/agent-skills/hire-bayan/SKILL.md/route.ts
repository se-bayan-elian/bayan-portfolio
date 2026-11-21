import { hireSkillMarkdown } from "@/lib/agent-skill";

export const dynamic = "force-static";

export function GET() {
  return new Response(hireSkillMarkdown(), {
    headers: { "Content-Type": "text/markdown; charset=utf-8", "Access-Control-Allow-Origin": "*" },
  });
}
