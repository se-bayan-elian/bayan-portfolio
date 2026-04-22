export type Skill = {
  name: string;
  level: number;
  category:
    | "frontend"
    | "backend"
    | "mobile"
    | "database"
    | "devops"
    | "tools";
  yearsOfExperience: number;
  featured: boolean;
};

export const skills: Skill[] = [
  { name: "Next.js", level: 95, category: "frontend", yearsOfExperience: 3, featured: true },
  { name: "React", level: 92, category: "frontend", yearsOfExperience: 4, featured: true },
  { name: "TypeScript", level: 90, category: "frontend", yearsOfExperience: 3, featured: true },
  { name: "Tailwind CSS", level: 92, category: "frontend", yearsOfExperience: 3, featured: true },
  { name: "React Query", level: 88, category: "frontend", yearsOfExperience: 2, featured: false },
  { name: "Redux / RTK", level: 82, category: "frontend", yearsOfExperience: 2, featured: false },
  { name: "Framer Motion", level: 78, category: "frontend", yearsOfExperience: 1, featured: false },
  { name: "ShadCN UI", level: 85, category: "frontend", yearsOfExperience: 2, featured: false },
  { name: "MUI", level: 80, category: "frontend", yearsOfExperience: 2, featured: false },
  { name: "i18n / next-intl", level: 88, category: "frontend", yearsOfExperience: 2, featured: false },
  { name: "Nest.js", level: 90, category: "backend", yearsOfExperience: 3, featured: true },
  { name: "REST APIs", level: 92, category: "backend", yearsOfExperience: 3, featured: true },
  { name: "Microservices", level: 78, category: "backend", yearsOfExperience: 2, featured: false },
  { name: "WebSockets", level: 80, category: "backend", yearsOfExperience: 2, featured: false },
  { name: "JWT & OAuth2", level: 85, category: "backend", yearsOfExperience: 2, featured: false },
  { name: "Stripe", level: 82, category: "backend", yearsOfExperience: 2, featured: false },
  { name: "Paymob", level: 85, category: "backend", yearsOfExperience: 2, featured: false },
  { name: "React Native", level: 85, category: "mobile", yearsOfExperience: 2, featured: true },
  { name: "NativeWind", level: 80, category: "mobile", yearsOfExperience: 1, featured: false },
  { name: "Push Notifications", level: 75, category: "mobile", yearsOfExperience: 1, featured: false },
  { name: "Offline-First Apps", level: 72, category: "mobile", yearsOfExperience: 1, featured: false },
  { name: "PostgreSQL", level: 82, category: "database", yearsOfExperience: 2, featured: false },
  { name: "MongoDB", level: 85, category: "database", yearsOfExperience: 3, featured: false },
  { name: "Redis", level: 70, category: "database", yearsOfExperience: 1, featured: false },
  { name: "Prisma / TypeORM", level: 80, category: "database", yearsOfExperience: 2, featured: false },
  { name: "GitHub Actions", level: 80, category: "devops", yearsOfExperience: 2, featured: false },
  { name: "Docker", level: 72, category: "devops", yearsOfExperience: 1, featured: false },
  { name: "Nginx", level: 75, category: "devops", yearsOfExperience: 1, featured: false },
  { name: "Vercel", level: 88, category: "devops", yearsOfExperience: 2, featured: false },
  { name: "Git", level: 90, category: "tools", yearsOfExperience: 4, featured: false },
  { name: "React Hook Form + Zod", level: 88, category: "tools", yearsOfExperience: 2, featured: false },
  { name: "SSR / SSG / ISR", level: 90, category: "tools", yearsOfExperience: 3, featured: false },
];
