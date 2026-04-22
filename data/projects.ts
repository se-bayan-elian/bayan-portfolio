export type Project = {
  id: string;
  slug: string;
  title: string;
  titleAr: string;
  titleFr: string;
  description: string;
  descriptionAr: string;
  descriptionFr: string;
  longDescription: string;
  thumbnail: string;
  images: string[];
  techStack: string[];
  category: "web" | "mobile" | "ai" | "ecommerce" | "other";
  featured: boolean;
  liveUrl: string;
  githubUrl: string;
  status: "live" | "in-progress" | "archived";
  startDate: string;
  endDate: string | null;
  highlights: string[];
  highlightsAr: string[];
  award?: string;
};

export const projects: Project[] = [
  {
    id: "1",
    slug: "jmaa-store",
    title: "Jmaa Store",
    titleAr: "متجر جماع",
    titleFr: "Jmaa Store",
    description:
      "Saudi group-buying e-commerce platform — buy together, save more.",
    descriptionAr:
      "منصة تجارة إلكترونية سعودية للشراء الجماعي — اشترِ معاً، وفّر أكثر.",
    descriptionFr:
      "Plateforme saoudienne d'e-commerce groupé — achetez ensemble, économisez plus.",
    longDescription:
      "Large-scale group-buying e-commerce platform enabling users to purchase products together for discounted prices. Contributed to backend services with NestJS and frontend features with Next.js. Integrated multiple payment gateways including NowLater, Paymob, and Amwal Tech for secure online payments and installment options.",
    thumbnail: "/images/projects/jmaa.jpg",
    images: [],
    techStack: ["Next.js", "NestJS", "TypeScript", "Paymob", "NowLater", "Amwal Tech"],
    category: "ecommerce",
    featured: true,
    liveUrl: "",
    githubUrl: "",
    status: "live",
    startDate: "2026-02",
    endDate: "2026-03",
    highlights: [
      "Large-scale group-buying platform",
      "3 payment gateway integrations (NowLater, Paymob, Amwal Tech)",
      "Refactored modules and fixed critical bugs",
      "Full-stack: NestJS backend + Next.js frontend",
      "Scalable collaborative purchase architecture",
    ],
    highlightsAr: [
      "منصة شراء جماعي واسعة النطاق",
      "تكامل 3 بوابات دفع (NowLater, Paymob, Amwal Tech)",
      "إعادة هيكلة الوحدات وإصلاح الأخطاء الحرجة",
    ],
  },
  {
    id: "2",
    slug: "survey-genius",
    title: "Survey Genius App",
    titleAr: "تطبيق Survey Genius",
    titleFr: "Survey Genius App",
    description:
      "AI-powered survey creation and analysis platform. 1st Place, National AI Hackathon.",
    descriptionAr:
      "منصة إنشاء وتحليل استطلاعات مدعومة بالذكاء الاصطناعي. المركز الأول في هاكاثون الذكاء الاصطناعي الوطني.",
    descriptionFr:
      "Plateforme de création et d'analyse de sondages par IA. 1er prix au Hackathon national IA.",
    longDescription:
      "AI-powered survey creation and analysis platform built at Techno Park National AI Hackathon. Built the front end using Next.js including a no-code drag-and-drop survey editor, real-time previews, and analytics dashboards (graphical, textual, numerical). Delivered an AI-powered solution that automates survey analysis and insight generation.",
    thumbnail: "/images/projects/survey-genius.jpg",
    images: [],
    techStack: ["Next.js", "TypeScript", "AI/ML", "Drag & Drop", "Analytics Dashboard"],
    category: "ai",
    featured: true,
    liveUrl: "",
    githubUrl: "",
    status: "live",
    startDate: "2025-05",
    endDate: "2025-07",
    highlights: [
      "1st Place — National AI Hackathon (Techno Park)",
      "No-code drag-and-drop survey editor",
      "Real-time survey previews",
      "AI-powered analysis and insight generation",
      "Multi-type analytics dashboard (graphical, textual, numerical)",
    ],
    highlightsAr: [
      "المركز الأول — هاكاثون الذكاء الاصطناعي الوطني (Techno Park)",
      "محرر استطلاع بدون كود بتقنية السحب والإفلات",
      "معاينات فورية للاستطلاع",
      "تحليل مدعوم بالذكاء الاصطناعي",
    ],
    award: "1st Place — National AI Hackathon",
  },
  {
    id: "3",
    slug: "rabt-alkhayal-store",
    title: "Rabt Alkhayal Store",
    titleAr: "متجر رابط الخيال",
    titleFr: "Rabt Alkhayal Store",
    description:
      "Dynamic full-stack platform for customizing and ordering print products online.",
    descriptionAr:
      "منصة متكاملة لتخصيص وطلب منتجات الطباعة عبر الإنترنت.",
    descriptionFr:
      "Plateforme full-stack pour personnaliser et commander des produits imprimés en ligne.",
    longDescription:
      "Dynamic platform for customizing and ordering print products online. Full-stack development translating complex operational logic into a clean responsive interface. Features a real-time design editor allowing customers to preview and edit designs including text, images, and colors without any design skills. Complete order management system with product setup, inventory control, payment integration, and print workflow tracking.",
    thumbnail: "/images/projects/rabt-store.jpg",
    images: [],
    techStack: ["Next.js", "NestJS", "TypeScript", "Real-time Editor", "Payment Integration"],
    category: "ecommerce",
    featured: true,
    liveUrl: "",
    githubUrl: "",
    status: "live",
    startDate: "2025-09",
    endDate: "2025-10",
    highlights: [
      "Real-time design editor (text, images, colors)",
      "Complete order management system",
      "Inventory control and payment integration",
      "Print workflow tracking to delivery",
      "Full-stack: Next.js + NestJS + admin dashboard",
    ],
    highlightsAr: [
      "محرر تصميم في الوقت الفعلي (نصوص، صور، ألوان)",
      "نظام إدارة طلبات متكامل",
      "تكامل المخزون والدفع",
    ],
  },
  {
    id: "4",
    slug: "waiter-app",
    title: "Waiter App",
    titleAr: "تطبيق وايتر",
    titleFr: "Waiter App",
    description:
      "Mobile cash register / POS system for Saudi restaurants, cafes and supermarkets.",
    descriptionAr:
      "تطبيق صندوق نقدي متنقل لنقاط البيع للمطاعم والمقاهي والسوبر ماركت السعودية.",
    descriptionFr:
      "Caisse enregistreuse mobile / POS pour restaurants, cafés et supermarchés saoudiens.",
    longDescription:
      "Mobile cash register for Saudi businesses including restaurants, cafes, and supermarkets. Enables businesses to set up their own mobile cashier system using POS devices to streamline operations and manage statistics. Businesses can launch their apps within 48 hours without needing a developer.",
    thumbnail: "/images/projects/waiter.jpg",
    images: [],
    techStack: ["Next.js", "Styled Components", "MUI", "Next i18n", "RTK", "TypeScript"],
    category: "web",
    featured: false,
    liveUrl: "",
    githubUrl: "",
    status: "live",
    startDate: "2024-08",
    endDate: "2024-10",
    highlights: [
      "Business launch in under 48 hours — no developer needed",
      "POS device integration",
      "Multi-business support (restaurants, cafes, supermarkets)",
      "Statistics and operations management",
      "Full i18n support (Arabic/English)",
    ],
    highlightsAr: [
      "إطلاق الأعمال في أقل من 48 ساعة — بدون مطور",
      "تكامل مع أجهزة نقاط البيع",
      "دعم متعدد الأعمال",
    ],
  },
  {
    id: "5",
    slug: "albayan-charity",
    title: "AlBayan Charity",
    titleAr: "لوحة تحكم البيان الخيرية",
    titleFr: "AlBayan Charity",
    description:
      "Palestinian charity management dashboard with full-stack OAuth2 + RBAC + CI/CD.",
    descriptionAr:
      "لوحة إدارة للجمعية الخيرية الفلسطينية مع OAuth2 و RBAC و CI/CD.",
    descriptionFr:
      "Dashboard de gestion pour association caritative palestinienne avec OAuth2, RBAC et CI/CD.",
    longDescription:
      "Management system dashboard for Al Bayan Charity using Next.js, ShadCN, TailwindCSS, React Hook Form with Zod, and React Query. Secure scalable API built with NestJS and MongoDB, implementing OAuth2 authentication with role-based access control (RBAC). Deployed across three subdomains on Hostinger VPS using GitHub Actions for CI/CD and Nginx as reverse proxy.",
    thumbnail: "/images/projects/albayan.jpg",
    images: [],
    techStack: [
      "Next.js",
      "NestJS",
      "MongoDB",
      "ShadCN",
      "TailwindCSS",
      "OAuth2",
      "RBAC",
      "GitHub Actions",
      "Nginx",
      "Zod",
    ],
    category: "web",
    featured: false,
    liveUrl: "",
    githubUrl: "",
    status: "live",
    startDate: "2025-03",
    endDate: "2025-03",
    highlights: [
      "OAuth2 authentication with role-based access control",
      "NestJS + MongoDB secure backend",
      "Deployed on 3 subdomains — Hostinger VPS",
      "GitHub Actions CI/CD pipeline",
      "Nginx reverse proxy configuration",
    ],
    highlightsAr: [
      "مصادقة OAuth2 مع التحكم في الوصول المستند إلى الأدوار",
      "واجهة خلفية آمنة NestJS + MongoDB",
      "نشر على 3 نطاقات فرعية على Hostinger VPS",
    ],
  },
  {
    id: "6",
    slug: "hawaak-store",
    title: "Hawaak Store",
    titleAr: "متجر هواك",
    titleFr: "Hawaak Store",
    description:
      "E-commerce platform for high-quality Sudanese goods in Saudi Arabia.",
    descriptionAr:
      "منصة تجارة إلكترونية للبضائع السودانية عالية الجودة في المملكة العربية السعودية.",
    descriptionFr:
      "Plateforme e-commerce pour produits soudanais de qualité en Arabie Saoudite.",
    longDescription:
      "E-commerce platform for high-quality Sudanese goods (agricultural crops, perfumes, natural skincare) in Saudi Arabia. Modern responsive frontend with Next.js, ShadCN, Tailwind CSS. Backend with NestJS covering REST APIs, database schemas, and business logic for product management, ordering, and user workflows.",
    thumbnail: "/images/projects/hawaak.jpg",
    images: [],
    techStack: ["Next.js", "NestJS", "ShadCN", "Tailwind CSS", "TypeScript", "REST APIs"],
    category: "ecommerce",
    featured: false,
    liveUrl: "",
    githubUrl: "",
    status: "live",
    startDate: "2024-11",
    endDate: "2024-12",
    highlights: [
      "Full-stack: Next.js frontend + NestJS backend",
      "Product catalog, checkout, user profiles",
      "REST APIs and database schema design",
      "ShadCN + Tailwind CSS modern UI",
      "Cultural e-commerce for Sudanese products",
    ],
    highlightsAr: [
      "Full-stack: واجهة Next.js + خلفية NestJS",
      "كتالوج المنتجات، الدفع، ملفات المستخدمين",
      "تصميم REST APIs وقاعدة البيانات",
    ],
  },
];
