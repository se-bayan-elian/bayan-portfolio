export type {
  Experience,
} from "@/data/experience";
export type { Project } from "@/data/projects";
export type { Skill } from "@/data/skills";
export type { Testimonial } from "@/data/testimonials";

import type { Project } from "@/data/projects";

export type ThemeName = "light" | "dark" | "dracula" | "nord" | "solarized";

export type ProjectCategory = Project["category"];
