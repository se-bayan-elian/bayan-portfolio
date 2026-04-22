export type Experience = {
  id: string;
  company: string;
  companyAr: string;
  companyFr: string;
  companyUrl: string;
  companyLogo: string;
  role: string;
  roleAr: string;
  roleFr: string;
  type: "full-time" | "part-time" | "freelance" | "contract";
  location: string;
  remote: boolean;
  startDate: string;
  endDate: string | null;
  current: boolean;
  description: string;
  descriptionAr: string;
  descriptionFr: string;
  responsibilities: string[];
  responsibilitiesAr: string[];
  techUsed: string[];
};

export const experiences: Experience[] = [
  {
    id: "qader",
    company: "Qader",
    companyAr: "قادر",
    companyFr: "Qader",
    companyUrl: "https://qader.vip",
    companyLogo: "/images/logos/qader.png",
    role: "Front-end Next.js Developer",
    roleAr: "مطور واجهات Next.js",
    roleFr: "Développeur Front-end Next.js",
    type: "full-time",
    location: "Riyadh, Saudi Arabia",
    remote: true,
    startDate: "2025-09",
    endDate: null,
    current: true,
    description:
      "Working as a Next.js developer on the Qader.vip platform — the company's main software product. Responsible for fixing bugs, reviewing and improving the existing codebase, and enhancing overall application stability and performance. Contributed to group chat features for study and trading rooms, test and assessment modules, and AI-based score analysis.",
    descriptionAr:
      "أعمل كمطور Next.js على منصة Qader.vip البرنامج الرئيسي للشركة. مسؤول عن إصلاح الأخطاء ومراجعة قاعدة الكود وتعزيز استقرار التطبيق وأدائه. ساهمت في ميزات الدردشة الجماعية لغرف الدراسة والتداول، ووحدات الاختبار والتقييم، وتحليل الدرجات بالذكاء الاصطناعي.",
    descriptionFr:
      "Développeur Next.js sur la plateforme Qader.vip, logiciel principal de l'entreprise. Responsable de la correction de bugs, de la revue et de l'amélioration de la base de code.",
    responsibilities: [
      "Reviewed and improved existing codebase for stability and performance",
      "Developed group chat features for study and trading rooms",
      "Built test and assessment modules",
      "Implemented AI-based score analysis features",
      "Enhanced multiple platform features for improved UX",
    ],
    responsibilitiesAr: [
      "مراجعة وتحسين قاعدة الكود الحالية",
      "تطوير ميزات الدردشة الجماعية لغرف الدراسة والتداول",
      "بناء وحدات الاختبار والتقييم",
      "تنفيذ تحليل الدرجات بالذكاء الاصطناعي",
    ],
    techUsed: ["Next.js", "TypeScript", "React Query", "Tailwind CSS", "WebSockets"],
  },
  {
    id: "rabt-elkhayal",
    company: "Rabt Elkhayal",
    companyAr: "رابط الخيال",
    companyFr: "Rabt Elkhayal",
    companyUrl: "",
    companyLogo: "/images/logos/rabt.png",
    role: "Fullstack Developer",
    roleAr: "مطور متكامل",
    roleFr: "Développeur Fullstack",
    type: "freelance",
    location: "Riyadh, Saudi Arabia",
    remote: true,
    startDate: "2022-01",
    endDate: "2025-05",
    current: false,
    description:
      "Freelance fullstack developer specializing in building and maintaining web applications using Next.js and Nest.js. Worked on real-world projects from start to finish for clients in Saudi Arabia and Canada, focusing on ERP and CMS systems. Collaborated with teams to deliver high-quality solutions, optimized code, and enhanced API integrations.",
    descriptionAr:
      "مطور متكامل مستقل متخصص في بناء وصيانة تطبيقات الويب باستخدام Next.js و Nest.js. عملت على مشاريع حقيقية من البداية إلى النهاية لعملاء في السعودية وكندا، مع التركيز على أنظمة ERP و CMS.",
    descriptionFr:
      "Développeur fullstack freelance spécialisé dans la construction et la maintenance d'applications web avec Next.js et Nest.js pour des clients en Arabie Saoudite et au Canada.",
    responsibilities: [
      "Built full-stack web applications using Next.js and Nest.js",
      "Delivered ERP and CMS systems for clients in Saudi Arabia and Canada",
      "Optimized API integrations for improved performance and scalability",
      "Collaborated with international teams to deliver high-quality solutions",
      "Developed and maintained production-ready applications",
    ],
    responsibilitiesAr: [
      "بناء تطبيقات ويب متكاملة باستخدام Next.js و Nest.js",
      "تسليم أنظمة ERP و CMS لعملاء في السعودية وكندا",
      "تحسين تكاملات API لتحقيق أداء وقابلية توسع أفضل",
    ],
    techUsed: ["Next.js", "Nest.js", "TypeScript", "PostgreSQL", "MongoDB", "REST APIs"],
  },
];
