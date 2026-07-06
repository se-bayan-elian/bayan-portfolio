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
    companyLogo: "https://res.cloudinary.com/nextjs-bayan/image/upload/v1776862416/newlogo_tsilib.png",
    role: "Front-end Web and Mobile Developer",
    roleAr: "مطور واجهات ويب وموبايل",
    roleFr: "Développeur Front-end Web et Mobile",
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
    id: "smart-network-trading",
    company: "Smart Network Trading",
    companyAr: "الشبكة الذكية للتجارة",
    companyFr: "Smart Network Trading",
    companyUrl: "https://www.smartnetworktrd.com",
    companyLogo: "https://res.cloudinary.com/nextjs-bayan/image/upload/v1783330164/smartnetworkcon.png_lc2eyr.webp",
    role: "Software Engineer",
    roleAr: "مهندس برمجيات",
    roleFr: "Ingénieur logiciel",
    type: "full-time",
    location: "Muscat, Oman",
    remote: true,
    startDate: "2025-04",
    endDate: "2026-04",
    current: false,
    description:
      "Software Engineer at Smart Network Trading (Oman), April 2025 — April 2026. Developed software solutions and delivered assigned technical projects, demonstrating strong professional competence and commitment to team responsibilities — as certified by the company's employment letter.",
    descriptionAr:
      "مهندس برمجيات في شركة الشبكة الذكية للتجارة (سلطنة عُمان)، من أبريل 2025 حتى أبريل 2026. شاركت في تطوير الحلول البرمجية والمساهمة في تنفيذ المشاريع التقنية الموكلة إليّ، مع مستوى جيد من الكفاءة المهنية والالتزام بالمهام — وفق إفادة العمل الصادرة عن الشركة.",
    descriptionFr:
      "Ingénieur logiciel chez Smart Network Trading (Oman), avril 2025 — avril 2026. Développement de solutions logicielles et livraison de projets techniques assignés, avec un bon niveau de compétence professionnelle et d'engagement — attesté par la lettre d'emploi de l'entreprise.",
    responsibilities: [
      "Developed software solutions across assigned technical projects",
      "Contributed to end-to-end implementation of company deliverables",
      "Maintained professional standards and accountability for assigned tasks",
    ],
    responsibilitiesAr: [
      "تطوير الحلول البرمجية ضمن المشاريع التقنية الموكلة",
      "المساهمة في تنفيذ المشاريع من البداية حتى التسليم",
      "الالتزام بمعايير مهنية عالية ومسؤوليات الفريق",
    ],
    techUsed: ["Next.js", "Nest.js", "TypeScript", "REST APIs"],
  },
  {
    id: "rabt-elkhayal",
    company: "Rabt Elkhayal",
    companyAr: "ربط الخيال",
    companyFr: "Rabt Elkhayal",
    companyUrl: "",
    companyLogo: "https://res.cloudinary.com/nextjs-bayan/image/upload/v1776862436/m-logo_ayy3xx.png",
    role: "Fullstack Developer",
    roleAr: "مطور ويب Fullstack",
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
    techUsed: ["Next.js", "Nest.js", "TypeScript", "PostgreSQL", "MongoDB"],
  },
];
