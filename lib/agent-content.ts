/**
 * Agent-facing content: the same facts the site shows, rendered as Markdown / JSON
 * for AI agents (Markdown negotiation, /llms.txt, the profile API, WebMCP tools).
 * Everything is derived from /data so it never drifts from the visible site.
 */
import { experiences } from "@/data/experience";
import { personal } from "@/data/personal";
import { projects } from "@/data/projects";
import { skills } from "@/data/skills";
import { testimonials } from "@/data/testimonials";
import { routing, type Locale } from "@/i18n/routing";
import { experienceLocalized } from "@/lib/experience-localize";
import { pickStr } from "@/lib/locale-text";
import { projectLocalized } from "@/lib/project-localize";

export const SITE = personal.siteUrl.replace(/\/$/, "");
export const SITE_HOST = new URL(SITE).host.replace(/^www\./, "");

const name = (l: Locale) => pickStr(l, personal.name, personal.nameAr, personal.nameFr);
const title = (l: Locale) => pickStr(l, personal.title, personal.titleAr, personal.titleFr);
const bio = (l: Locale) => pickStr(l, personal.bio, personal.bioAr, personal.bioFr);

function contactBlock() {
  const lines = [
    `- Email: ${personal.email}`,
    `- Contact form: ${SITE}/en/contact`,
    `- Book a 30-min coffee chat: ${SITE}/en/contact?tab=coffee`,
    `- LinkedIn: ${personal.social.linkedin}`,
    `- GitHub: ${personal.social.github}`,
  ];
  if (personal.social.telegram?.trim()) lines.push(`- Telegram: ${personal.social.telegram.trim()}`);
  return lines.join("\n");
}

export function profileMarkdown(l: Locale = "en") {
  const featured = projects.filter((p) => p.featured);
  return `# ${name(l)} — ${title(l)}

> ${personal.available ? "Currently available for full-time, contract and freelance work." : "Not currently taking new work."} ${personal.yearsExperience}+ years shipping production software with Next.js, NestJS and React Native.

${bio(l)}

## Featured projects

${featured
  .map((p) => {
    const loc = projectLocalized(p, l);
    return `- [${loc.title}](${SITE}/${l}/projects/${p.slug}) — ${loc.description}`;
  })
  .join("\n")}

## Core skills

${skills
  .filter((s) => s.featured)
  .map((s) => `- ${s.name} (${s.yearsOfExperience}+ yrs)`)
  .join("\n")}

## Hire / contact

${contactBlock()}

## More

- [All projects](${SITE}/${l}/projects)
- [Experience](${SITE}/${l}/experience)
- [Skills](${SITE}/${l}/skills)
- [About](${SITE}/${l}/about)
`;
}

export function projectsMarkdown(l: Locale = "en") {
  return `# Projects — ${name(l)}

${projects
  .map((p) => {
    const loc = projectLocalized(p, l);
    return `## [${loc.title}](${SITE}/${l}/projects/${p.slug})

${loc.description}

- Category: ${p.category} · Status: ${p.status} · ${p.startDate} — ${p.endDate ?? "present"}
- Stack: ${p.techStack.join(", ")}${p.liveUrl?.trim() ? `\n- Live: ${p.liveUrl.trim()}` : ""}${p.award ? `\n- Award: ${p.award}` : ""}`;
  })
  .join("\n\n")}
`;
}

export function projectMarkdown(slug: string, l: Locale = "en") {
  const p = projects.find((x) => x.slug === slug);
  if (!p) return null;
  const loc = projectLocalized(p, l);
  return `# ${loc.title}

> ${loc.description}

- Category: ${p.category}
- Status: ${p.status}
- Timeline: ${p.startDate} — ${p.endDate ?? "present"}
- Stack: ${p.techStack.join(", ")}${p.liveUrl?.trim() ? `\n- Live site: ${p.liveUrl.trim()}` : ""}${p.githubUrl?.trim() ? `\n- Source: ${p.githubUrl.trim()}` : ""}${p.award ? `\n- Award: ${p.award}` : ""}

## Overview

${loc.body}

## Highlights

${loc.highlights.map((h) => `- ${h}`).join("\n")}

---

Want something similar? ${SITE}/${l}/contact
`;
}

export function skillsMarkdown(l: Locale = "en") {
  const cats = Array.from(new Set(skills.map((s) => s.category)));
  return `# Skills — ${name(l)}

${cats
  .map(
    (c) =>
      `## ${c[0].toUpperCase()}${c.slice(1)}\n\n${skills
        .filter((s) => s.category === c)
        .map((s) => `- ${s.name} — ${s.level}% · ${s.yearsOfExperience}+ yrs`)
        .join("\n")}`,
  )
  .join("\n\n")}
`;
}

export function experienceMarkdown(l: Locale = "en") {
  return `# Experience — ${name(l)}

${experiences
  .map((e) => {
    const loc = experienceLocalized(e, l);
    return `## ${loc.role} · ${loc.company}

${e.startDate} — ${e.current ? "present" : e.endDate ?? ""}${e.remote ? " · Remote" : ""}

${loc.description}

${loc.responsibilities.map((r) => `- ${r}`).join("\n")}

Stack: ${e.techUsed.join(", ")}`;
  })
  .join("\n\n")}
`;
}

export function aboutMarkdown(l: Locale = "en") {
  return `# About ${name(l)}

${bio(l)}

## Testimonials

${testimonials
  .map((t) => `> ${pickStr(l, t.quote, t.quoteAr, t.quoteFr)}\n> — ${t.author}, ${t.role} · ${t.company}`)
  .join("\n\n")}

## Contact

${contactBlock()}
`;
}

export function contactMarkdown() {
  return `# Contact ${personal.name}

Fastest: email or the contact form — replies usually within 24 hours.

${contactBlock()}
`;
}

/** Map a site path (with or without locale prefix) to Markdown. */
export function markdownForPath(pathname: string): string | null {
  const parts = pathname.split("/").filter(Boolean);
  let l: Locale = "en";
  if (parts[0] && (routing.locales as readonly string[]).includes(parts[0])) l = parts.shift() as Locale;
  const [page, slug] = parts;
  if (!page) return profileMarkdown(l);
  if (page === "projects" && slug) return projectMarkdown(slug, l);
  if (page === "projects") return projectsMarkdown(l);
  if (page === "skills") return skillsMarkdown(l);
  if (page === "experience") return experienceMarkdown(l);
  if (page === "about") return aboutMarkdown(l);
  if (page === "contact") return contactMarkdown();
  return null;
}

export function llmsTxt() {
  return `# ${personal.name}

> ${personal.title} — ${personal.yearsExperience}+ years building production web platforms, APIs and mobile apps with Next.js, NestJS and React Native. ${personal.available ? "Open to full-time, contract and freelance work." : ""}

Every page on this site also answers with Markdown when requested with \`Accept: text/markdown\`.

## Pages

- [Profile](${SITE}/en): who I am, featured work, how to hire me
- [Projects](${SITE}/en/projects): every case study with stack and links
- [Experience](${SITE}/en/experience): roles, responsibilities and tech
- [Skills](${SITE}/en/skills): skills by category with proficiency
- [About](${SITE}/en/about): bio and testimonials
- [Contact](${SITE}/en/contact): email, contact form and coffee-chat booking

## Case studies

${projects.map((p) => `- [${p.title}](${SITE}/en/projects/${p.slug}): ${p.description}`).join("\n")}

## Machine-readable

- [Profile API (JSON)](${SITE}/api/profile)
- [OpenAPI description](${SITE}/openapi.json)
- [AI catalog](${SITE}/.well-known/ai-catalog.json)
- [Agent skill: hire Bayan](${SITE}/.well-known/agent-skills/hire-bayan/SKILL.md)

## Optional

- Languages on site: English, Arabic (RTL), French
- Contact: ${personal.email}
`;
}

/** Plain JSON profile used by /api/profile and the WebMCP tools. */
export function profileJson() {
  return {
    name: personal.name,
    title: personal.title,
    available: personal.available,
    yearsExperience: personal.yearsExperience,
    bio: personal.bio,
    languages: personal.languages,
    contact: {
      email: personal.email,
      contactForm: `${SITE}/en/contact`,
      coffeeChat: `${SITE}/en/contact?tab=coffee`,
      linkedin: personal.social.linkedin,
      github: personal.social.github,
      telegram: personal.social.telegram || undefined,
    },
    skills: skills.map(({ name: n, category, level, yearsOfExperience }) => ({ name: n, category, level, yearsOfExperience })),
    projects: projects.map((p) => ({
      slug: p.slug,
      title: p.title,
      description: p.description,
      category: p.category,
      status: p.status,
      techStack: p.techStack,
      liveUrl: p.liveUrl || undefined,
      url: `${SITE}/en/projects/${p.slug}`,
      award: p.award,
    })),
    experience: experiences.map((e) => ({
      company: e.company,
      role: e.role,
      start: e.startDate,
      end: e.current ? null : e.endDate,
      remote: e.remote,
      techUsed: e.techUsed,
    })),
  };
}

/** Rough token estimate for the x-markdown-tokens header. */
export const tokenEstimate = (md: string) => Math.ceil(md.length / 4);
