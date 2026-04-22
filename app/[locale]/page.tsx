import { setRequestLocale } from "next-intl/server";
import { PageMotion } from "@/components/PageMotion";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Stats } from "@/components/sections/Stats";
import { Testimonials } from "@/components/sections/Testimonials";
import { buildMetadata } from "@/lib/metadata";
import type { Locale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return buildMetadata({ locale: locale as Locale, path: "" });
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Bayan Elian Alreqeb",
  jobTitle: "Full Stack Engineer",
  email: "bezo2024@gmail.com",
  url: "https://bayan-elian.dev",
  knowsAbout: ["Next.js", "Nest.js", "React Native", "TypeScript"],
  alumniOf: "University of Palestine",
  award: "1st Place National AI Hackathon — Techno Park 2025",
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageMotion>
        <Hero />
        <Stats />
        <Projects />
        <Skills featuredOnly />
        <Experience />
        <Testimonials />
        <Contact />
      </PageMotion>
    </>
  );
}
