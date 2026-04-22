import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { personal } from "@/data/personal";
import { routing } from "@/i18n/routing";

const STATIC_PATHS = ["", "/about", "/projects", "/skills", "/experience", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = personal.siteUrl.replace(/\/$/, "");
  const modified = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    for (const path of STATIC_PATHS) {
      entries.push({
        url: `${base}/${locale}${path}`,
        lastModified: modified,
        changeFrequency: path === "" ? "weekly" : "monthly",
        priority: path === "" ? 1 : 0.85,
      });
    }
    for (const p of projects) {
      entries.push({
        url: `${base}/${locale}/projects/${p.slug}`,
        lastModified: modified,
        changeFrequency: "monthly",
        priority: 0.65,
      });
    }
  }

  return entries;
}
