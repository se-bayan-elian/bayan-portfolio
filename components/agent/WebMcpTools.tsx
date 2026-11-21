"use client";

import { useEffect } from "react";
import { useRouter } from "@/navigation";

type ToolResult = { content: { type: "text"; text: string }[] };
type Tool = {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
  execute: (input: Record<string, unknown>) => Promise<ToolResult>;
};
type ModelContext = { registerTool: (tool: Tool, opts?: { signal?: AbortSignal }) => Promise<unknown> | unknown };

const text = (t: string): ToolResult => ({ content: [{ type: "text", text: t }] });

const PAGES = ["/", "/about", "/projects", "/skills", "/experience", "/contact"] as const;

/**
 * WebMCP: exposes read-only site tools to in-browser AI agents
 * (document.modelContext / navigator.modelContext). No-op in normal browsers.
 */
export function WebMcpTools() {
  const router = useRouter();

  useEffect(() => {
    const mc =
      (document as unknown as { modelContext?: ModelContext }).modelContext ??
      (navigator as unknown as { modelContext?: ModelContext }).modelContext;
    if (!mc?.registerTool) return;

    const controller = new AbortController();
    const getProfile = async () => {
      const res = await fetch("/api/profile");
      return res.json();
    };

    const tools: Tool[] = [
      {
        name: "get_profile",
        description: "Get Bayan's profile: title, availability, bio, languages and contact options.",
        inputSchema: { type: "object", properties: {} },
        execute: async () => {
          const p = await getProfile();
          const { name, title, available, yearsExperience, bio, languages, contact } = p;
          return text(JSON.stringify({ name, title, available, yearsExperience, bio, languages, contact }, null, 2));
        },
      },
      {
        name: "list_projects",
        description: "List Bayan's projects with category, tech stack and links. Optionally filter by category or technology.",
        inputSchema: {
          type: "object",
          properties: {
            category: { type: "string", enum: ["web", "mobile", "ai", "ecommerce", "other"] },
            tech: { type: "string", description: "Technology name to filter by, e.g. 'Next.js'" },
          },
        },
        execute: async (input) => {
          const p = await getProfile();
          let list = p.projects as { category: string; techStack: string[] }[];
          if (typeof input.category === "string") list = list.filter((x) => x.category === input.category);
          if (typeof input.tech === "string") {
            const q = input.tech.toLowerCase();
            list = list.filter((x) => x.techStack.some((s) => s.toLowerCase().includes(q)));
          }
          return text(JSON.stringify(list, null, 2));
        },
      },
      {
        name: "get_project",
        description: "Get the full case study for one project as Markdown.",
        inputSchema: {
          type: "object",
          properties: { slug: { type: "string", description: "Project slug from list_projects" } },
          required: ["slug"],
        },
        execute: async (input) => {
          const res = await fetch(`/en/projects/${encodeURIComponent(String(input.slug))}`, {
            headers: { Accept: "text/markdown" },
          });
          return text(await res.text());
        },
      },
      {
        name: "get_skills",
        description: "Get Bayan's skills grouped by category with proficiency and years of experience.",
        inputSchema: { type: "object", properties: {} },
        execute: async () => text(JSON.stringify((await getProfile()).skills, null, 2)),
      },
      {
        name: "open_page",
        description: "Navigate the site to a page (e.g. the contact page so the user can send a message).",
        inputSchema: {
          type: "object",
          properties: { page: { type: "string", enum: [...PAGES] } },
          required: ["page"],
        },
        execute: async (input) => {
          const page = String(input.page);
          if (!(PAGES as readonly string[]).includes(page)) return text(`Unknown page: ${page}`);
          router.push(page);
          return text(`Opened ${page}`);
        },
      },
    ];

    for (const tool of tools) {
      try {
        void mc.registerTool(tool, { signal: controller.signal });
      } catch {
        /* older WebMCP builds: ignore */
      }
    }
    return () => controller.abort();
  }, [router]);

  return null;
}
