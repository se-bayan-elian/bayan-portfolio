export type StatIconKey = "projects" | "experience" | "globe" | "award";

export const stats: {
  label: string;
  labelAr: string;
  labelFr: string;
  value: number;
  suffix: string;
  iconKey: StatIconKey;
}[] = [
  {
    label: "Projects Delivered",
    labelAr: "مشروع مُسلَّم",
    labelFr: "Projets livrés",
    value: 20,
    suffix: "+",
    iconKey: "projects",
  },
  {
    label: "Years Experience",
    labelAr: "سنوات خبرة",
    labelFr: "Ans d'expérience",
    value: 4,
    suffix: "+",
    iconKey: "experience",
  },
  {
    label: "Countries Served",
    labelAr: "دولة خُدمت",
    labelFr: "Pays servis",
    value: 5,
    suffix: "+",
    iconKey: "globe",
  },
  {
    label: "Hackathon Awards",
    labelAr: "جائزة هاكاثون",
    labelFr: "Prix hackathon",
    value: 2,
    suffix: "+",
    iconKey: "award",
  },
];
