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
  longDescriptionAr: string;
  longDescriptionFr: string;
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
  highlightsFr: string[];
  award?: string;
};

export const projects: Project[] = [
  {
    id: "8",
    slug: "msooqak",
    title: "Msooqak — Smart Marketer",
    titleAr: "مسوّقك الذكي",
    titleFr: "Msooqak — Marketeur intelligent",
    description:
      "AI marketing dashboard for Saudi merchants — connects to Salla & Zid stores, generates videos and posts, then launches and optimizes ad campaigns on Meta, Snapchat, TikTok, and Google.",
    descriptionAr:
      "لوحة تسويق بالذكاء الاصطناعي للتجار — تتصل بمتاجر سلة وزد لجلب المنتجات، تولّد فيديوهات ومنشورات، ثم تطلق الحملات والإعلانات وتحسّنها.",
    descriptionFr:
      "Tableau marketing IA pour commerçants — connexion Salla & Zid pour importer les produits, génération de vidéos et posts, puis lancement et optimisation des campagnes sur Meta, Snapchat, TikTok et Google.",
    longDescription:
      "Msooqak (ilanakdhaki.com) is an AI marketing agency built for Saudi merchants: a production dashboard that connects to Salla and Zid store apps to pull product catalogs, then uses smart agents to turn that inventory into sellable creative.\n\nFrom synced products, the platform generates videos, social posts, and ad-ready assets — then launches campaigns across Meta, Snapchat, TikTok, and Google and keeps optimizing performance on a continuous loop (tuning every 15 minutes). The product story centers on 60 AI agents working 24/7 so store owners can scale marketing without hiring a full in-house team.\n\nI built the merchant-facing experience end to end: Arabic-first UX, Salla/Zid integrations, PWA-ready shell, and a polished interface around the full flow from product sync → content generation → campaign launch → optimization.",
    longDescriptionAr:
      "مسوّقك الذكي (ilanakdhaki.com) وكالة تسويق بالذكاء الاصطناعي للتجار السعوديين: لوحة إنتاجية تتصل بتطبيقات متاجر سلة وزد لجلب كتالوج المنتجات، ثم تستخدم إيجنتات ذكية لتحويل المخزون إلى محتوى قابل للبيع.\n\nمن المنتجات المزامنة، تولّد المنصة فيديوهات ومنشورات ومواد جاهزة للإعلان — ثم تطلق الحملات على Meta وSnapchat وTikTok وGoogle وتستمر في تحسين الأداء بشكل مستمر (ضبط كل 15 دقيقة). القصة تتمحور حول 60 إيجنت ذكي يعملون 24/7 ليتمكن أصحاب المتاجر من توسيع التسويق دون فريق داخلي كامل.\n\nبنيت تجربة التاجر من البداية للنهاية: واجهة عربية أولاً، تكامل سلة وزد، هيكل جاهز كـ PWA، ومسار مصقول من مزامنة المنتجات → توليد المحتوى → إطلاق الحملات → التحسين.",
    longDescriptionFr:
      "Msooqak (ilanakdhaki.com) est une agence marketing IA pour commerçants saoudiens : un tableau de bord connecté aux apps Salla et Zid pour importer le catalogue produits, puis des agents intelligents transforment l'inventaire en créations vendables.\n\nÀ partir des produits synchronisés, la plateforme génère vidéos, posts et assets publicitaires — lance les campagnes sur Meta, Snapchat, TikTok et Google et optimise en continu (toutes les 15 minutes). Positionnement : 60 agents IA 24/7 pour scaler le marketing sans équipe interne.\n\nJ'ai livré l'expérience marchande de bout en bout : UX arabe d'abord, intégrations Salla/Zid, coque PWA et parcours soigné sync produits → génération de contenu → lancement campagnes → optimisation.",
    thumbnail: "https://res.cloudinary.com/nextjs-bayan/image/upload/v1783329476/ChatGPT_Image_6_%D9%8A%D9%88%D9%84%D9%8A%D9%88_2026_12_17_32_%D9%85_rbyk4m.png",
    images: [
      "https://res.cloudinary.com/nextjs-bayan/image/upload/v1783329447/1_s40l68.png",
      "https://res.cloudinary.com/nextjs-bayan/image/upload/v1783329450/2_b1ljer.png",
      "https://res.cloudinary.com/nextjs-bayan/image/upload/v1783329450/2_b1ljer.png",
      "https://res.cloudinary.com/nextjs-bayan/image/upload/v1783329449/07e060f0-8efc-4b78-baf8-5cab9ba08343_rq1fml.png",
      "https://res.cloudinary.com/nextjs-bayan/image/upload/v1783329444/bf964c60-e7a7-4096-8034-8f90abea684f_ovlndl.png",
      "https://res.cloudinary.com/nextjs-bayan/image/upload/v1783329443/1a5755d6-b08f-4777-967b-216a4b024545_jcabtd.png",
      "https://res.cloudinary.com/nextjs-bayan/image/upload/v1783329438/30b17d51-23cd-4ec6-8026-c0457a8c8530_jmssv9.png",
      "https://res.cloudinary.com/nextjs-bayan/image/upload/v1783329440/b7ac179a-1b73-4191-a19a-aab6b493558f_baajll.png",
      "https://res.cloudinary.com/nextjs-bayan/image/upload/v1783329435/62293f05-7964-48a0-aac2-babbc051c0dc_df1qcm.png",
      "https://res.cloudinary.com/nextjs-bayan/image/upload/v1783329436/23d1ef39-827c-4ef0-a1a2-9b65a092d6ac_oraany.png"
    ],
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Salla API", "Zid API", "AI Integration", "PWA"],
    category: "ai",
    featured: true,
    liveUrl: "https://ilanakdhaki.com",
    githubUrl: "",
    status: "live",
    startDate: "2026-05",
    endDate: "2026-07",
    highlights: [
      "Salla & Zid store app integrations to sync merchant product catalogs",
      "AI-generated videos, social posts, and ad-ready creative from synced products",
      "Automated campaign and ad launch across Meta, Snapchat, TikTok, and Google",
      "Continuous performance optimization — tuning every 15 minutes, 24/7",
      "Arabic-first merchant dashboard with PWA-ready mobile experience",
    ],
    highlightsAr: [
      "تكامل تطبيقات متاجر سلة وزد لمزامنة كتالوج منتجات التاجر",
      "توليد فيديوهات ومنشورات ومواد إعلانية بالذكاء الاصطناعي من المنتجات",
      "إطلاق حملات وإعلانات تلقائي على Meta وSnapchat وTikTok وGoogle",
      "تحسين أداء مستمر — ضبط كل 15 دقيقة على مدار الساعة",
      "لوحة تاجر عربية أولاً مع تجربة PWA للجوال",
    ],
    highlightsFr: [
      "Intégrations apps Salla & Zid pour synchroniser le catalogue produits",
      "Génération IA de vidéos, posts et créations pub à partir des produits",
      "Lancement automatique de campagnes et annonces sur Meta, Snapchat, TikTok et Google",
      "Optimisation continue des performances — toutes les 15 minutes, 24/7",
      "Tableau de bord marchand arabe d'abord, expérience PWA mobile",
    ],
  },
  {
    id: "7",
    slug: "empleo-match",
    title: "Empleo Match",
    titleAr: "إمبليو ماتش",
    titleFr: "Empleo Match",
    description:
      "Bilingual recruiting platform for South Florida — job listings, filters, and employer hiring support across blue-collar industries.",
    descriptionAr:
      "منصة توظيف ثنائية اللغة لجنوب فلوريدا — عروض عمل، فلاتر، ودعم توظيف لأصحاب العمل في القطاعات الميدانية.",
    descriptionFr:
      "Plateforme de recrutement bilingue pour le sud de la Floride — offres, filtres et accompagnement employeurs dans les métiers terrain.",
    longDescription:
      "Empleo Match (empleo-match.com) is a bilingual recruiting and hiring platform serving South Florida—positioned around Miami and surrounding cities. The public jobs directory lets candidates filter by category (janitorial, event support, warehouse & logistics, security, hospitality, administrative), employment type (full-time, part-time, temporary, contract), and city to find roles with clear pay ranges and location context.\n\nThe marketing surface highlights active placements across multiple cities, employer services, and an apply flow designed for Spanish/English audiences.\n\nI delivered the production web experience end to end: responsive listings UX, localized routing, and a polished funnel from discovery through job detail and application.",
    longDescriptionAr:
      "إمبليو ماتش (empleo-match.com) منصة توظيف وتوظيف ثنائية اللغة تخدم جنوب فلوريدا — بتركيز على ميامي والمدن المحيطة. دليل الوظائف العام يتيح للمرشحين التصفية حسب الفئة (نظافة، دعم فعاليات، مستودعات ولوجستيات، أمن، ضيافة، إداري)، نوع التوظيف (دوام كامل، جزئي، مؤقت، عقد)، والمدينة مع نطاقات رواتب ومواقع واضحة.\n\nالسطح التسويقي يبرز التوظيف النشط عبر عدة مدن وخدمات أصحاب العمل ومسار تقديم مصمم لجمهور إسباني/إنجليزي.\n\nسلّمت تجربة الويب الإنتاجية من البداية للنهاية: واجهة قوائم متجاوبة، مسارات محلية، ومسار مصقول من الاكتشاف إلى تفاصيل الوظيفة والتقديم.",
    longDescriptionFr:
      "Empleo Match (empleo-match.com) est une plateforme de recrutement bilingue pour le sud de la Floride — autour de Miami et des villes voisines. L'annuaire public permet de filtrer par catégorie (propreté, événementiel, entrepôt & logistique, sécurité, hôtellerie, administratif), type de contrat et ville, avec fourchettes salariales et localisation.\n\nLe site met en avant les placements actifs, les services employeurs et un parcours de candidature pensé pour un public anglophone et hispanophone.\n\nJ'ai livré l'expérience web de production : listes responsives, routage localisé et tunnel soigné de la découverte au détail d'offre et à la candidature.",
    thumbnail: "https://res.cloudinary.com/nextjs-bayan/image/upload/v1783327981/ChatGPT_Image_6_%D9%8A%D9%88%D9%84%D9%8A%D9%88_2026_11_52_39_%D8%B5_lnxu3g.png",
    images: [
      "https://res.cloudinary.com/nextjs-bayan/image/upload/v1783327577/366bb306-808b-4aec-8bae-98996ff0cdd8_j7btpi.png",
      "https://res.cloudinary.com/nextjs-bayan/image/upload/v1783327820/e9e9d5fb-9451-4654-8246-35391bbff1d1_gg6f4z.png",
      "https://res.cloudinary.com/nextjs-bayan/image/upload/v1783327839/a6c9092d-6671-4056-9a22-5ab2ac7be1b3_e9ninv.png",
      "https://res.cloudinary.com/nextjs-bayan/image/upload/v1783327889/ce179bda-d6bf-4e5c-a758-a5a70ea19a0e_a6pgoh.png",
      "https://res.cloudinary.com/nextjs-bayan/image/upload/v1783327964/20c5270e-204e-4516-bd57-b46220761909_s3wzji.png",
      "https://res.cloudinary.com/nextjs-bayan/image/upload/v1783327975/dfef87f4-b2a9-4592-9efb-10ba3d13f0f9_rmy2xs.png",
    ],
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "next-intl", "SEO"],
    category: "web",
    featured: true,
    liveUrl: "https://empleo-match.com",
    githubUrl: "",
    status: "live",
    startDate: "2026-04",
    endDate: "2026-06",
    highlights: [
      "Bilingual EN/ES recruiting platform for South Florida job seekers and employers",
      "Filterable jobs directory: category, employment type, and city",
      "Blue-collar verticals — janitorial, warehouse, security, events, hospitality",
      "Job cards with pay ranges, locations, and detail → apply funnel",
      "Employer services and contact surfaces alongside public listings",
    ],
    highlightsAr: [
      "منصة توظيف ثنائية اللغة إنجليزي/إسباني لجنوب فلوريدا",
      "دليل وظائف قابل للتصفية: فئة، نوع توظيف، ومدينة",
      "قطاعات ميدانية: نظافة، مستودعات، أمن، فعاليات، ضيافة",
      "بطاقات وظائف بنطاق رواتب ومواقع ومسار تفاصيل → تقديم",
      "خدمات أصحاب عمل وصفحات تواصل بجانب القوائم العامة",
    ],
    highlightsFr: [
      "Plateforme bilingue EN/ES pour candidats et employeurs du sud de la Floride",
      "Annuaire filtrable : catégorie, type de contrat et ville",
      "Métiers terrain : propreté, entrepôt, sécurité, événementiel, hôtellerie",
      "Fiches avec fourchette salariale, lieu et tunnel détail → candidature",
      "Services employeurs et contact aux côtés des offres publiques",
    ],
  },
  {
    id: "0",
    slug: "qader-platform",
    title: "Qader Platform",
    titleAr: "منصة قادر",
    titleFr: "Plateforme Qader",
    description:
      "Core educational SaaS platform focused on learning, assessments, and real-time student interaction.",
    descriptionAr:
      "منصة تعليمية SaaS للتعلم والاختبارات والتفاعل اللحظي بين الطلاب والمدرسين.",
    descriptionFr:
      "Plateforme SaaS éducative centrée sur l'apprentissage, les évaluations et l'interaction en temps réel.",
    longDescription:
      "Qader (qader.vip) positions itself as a companion for assessments and learning—an educational ecosystem where students engage with structured content, tests, and performance insights.\n\nI worked as a Next.js frontend developer on the main production platform: stabilizing large legacy areas of the UI, fixing critical production bugs, and refactoring for maintainability. I contributed to real-time group chat used by study and trading communities, built and improved assessment flows, and helped integrate AI-assisted score analysis so educators get faster, clearer feedback.\n\nThe work emphasized performance, resilience, and UX quality across a high-traffic SaaS surface.",
    longDescriptionAr:
      "منصة قادر (qader.vip) تقدّم نفسها كرفيق للاختبارات والتعلّم: منظومة تعليمية يتفاعل فيها الطلاب مع محتوى منظم واختبارات ورؤى أداء.\n\nعملت كمطوّر واجهات Next.js على المنصة الإنتاجية الرئيسية: تثبيت أجزاء واسعة من الواجهة القديمة، إصلاح أعطال حرجة في الإنتاج، وإعادة هيكلة لسهولة الصيانة. ساهمت في دردشة جماعية فورية لمجتمعات دراسية وتداول، وبناء وتحسين مسارات التقييم، ودعم دمج تحليل الدرجات بمساعدة الذكاء الاصطناعي ليتلقى المعلّمون ملاحظات أسرع أوضح.\n\nركّز العمل على الأداء والاستقرار وجودة تجربة المستخدم على واجهة SaaS مزدحمة.",
    longDescriptionFr:
      "Qader (qader.vip) se présente comme un compagnon pour les évaluations et l'apprentissage : un écosystème où les étudiants accèdent à du contenu structuré, des tests et des indicateurs de performance.\n\nJ'ai travaillé en Next.js sur la plateforme de production : stabilisation de larges zones héritées, correction de bugs critiques et refactorisation pour la maintenabilité. J'ai contribué au chat de groupe temps réel (communautés d'étude et de trading), aux modules d'évaluation et à l'intégration d'analyses de scores assistées par l'IA pour des retours plus rapides aux enseignants.\n\nPriorité à la performance, la résilience et l'UX sur une SaaS à fort trafic.",
    thumbnail: "https://res.cloudinary.com/nextjs-bayan/image/upload/v1776940079/kb6rh61hrwfhre6jajnv_spal9r.webp",
    images: ["https://res.cloudinary.com/nextjs-bayan/image/upload/v1776861190/%D9%82%D8%A7%D8%AF%D8%B1-Qader-%D8%B1%D9%81%D9%8A%D9%82-%D8%AF%D8%B1%D8%A8%D9%83-%D9%84%D9%84%D8%A7%D8%AE%D8%AA%D8%A8%D8%A7%D8%B1%D8%A7%D8%AA-04-22-2026_03_24_PM_w7yj7q.png",
      "https://res.cloudinary.com/nextjs-bayan/image/upload/v1776861179/%D8%AA%D8%AD%D8%AF%D9%8A%D8%AF-%D9%85%D8%B3%D8%AA%D9%88%D8%A7%D9%83-04-22-2026_03_31_PM_hq4kkw.png",
      "https://res.cloudinary.com/nextjs-bayan/image/upload/v1776861191/%D9%81%D9%8A%D8%AF%D9%8A%D9%88-%D8%AC%D8%AF%D9%8A%D8%AF-%D8%AC%D8%AF%D9%8A%D8%AF-04-22-2026_03_30_PM_dcupv3.png",
      "https://res.cloudinary.com/nextjs-bayan/image/upload/v1776861186/%D9%85%D8%AC%D9%85%D9%88%D8%B9%D8%A9-%D8%AC%D8%AF%D9%8A%D8%AF%D8%A9-04-22-2026_03_30_PM_nyxv4f.png",
      "https://res.cloudinary.com/nextjs-bayan/image/upload/v1776861178/%D8%B3%D9%88%D9%84%D9%81-%D9%88%D9%8A-%D8%AE%D9%88%D9%8A-%D8%A5%D8%B5%D8%B7%D9%86%D8%A7%D8%B9%D9%8A-04-22-2026_03_30_PM_s1xhh5.png"
    ],
    techStack: [
      "Next.js",
      "TypeScript",
      "React Query",
      "WebSockets",
      "State Management",
      "AI Integration",
      "Performance Optimization",
    ],
    category: "web",
    featured: true,
    liveUrl: "https://qader.vip",
    githubUrl: "",
    status: "live",
    startDate: "2025-12",
    endDate: "2026-02",
    highlights: [
      "Production-grade educational SaaS (assessments & learning companion positioning)",
      "Frontend stability, bug fixes, and large-scale legacy refactor",
      "Real-time group chat for study & trading communities",
      "Assessment modules: flows, UX, and reliability",
      "AI-assisted score analysis integration",
      "Performance tuning and UX polish under load",
    ],
    highlightsAr: [
      "منصة SaaS تعليمية للإنتاج (اختبارات وتعلّم)",
      "استقرار الواجهة، إصلاح الأعطال، وإعادة هيكلة واسعة",
      "دردشة جماعية فورية لمجتمعات دراسية وتداول",
      "وحدات تقييم: مسارات وتجربة مستخدم وموثوقية",
      "دمج تحليل الدرجات بمساعدة الذكاء الاصطناعي",
      "ضبط الأداء وتحسين الواجهة تحت الضغط",
    ],
    highlightsFr: [
      "SaaS éducative production (évaluations & apprentissage)",
      "Stabilité frontend, correctifs et refactor legacy à grande échelle",
      "Chat de groupe temps réel (étude & trading)",
      "Modules d'évaluation : parcours, UX, fiabilité",
      "Intégration d'analyse de scores assistée par IA",
      "Performance et finitions UX sous charge",
    ],
  },
  {
    id: "1",
    slug: "jmaa-store",
    title: "Jmaa Store",
    titleAr: "متجر جمعة",
    titleFr: "Jmaa Store",
    description:
      "Saudi group-buying e-commerce — join or start a group, unlock lower prices, with installments via Tamara.",
    descriptionAr:
      "تجارة إلكترونية سعودية للشراء الجماعي — انضم أو أنشئ جمعة واحصل على سعر أقل، مع تقسيط عبر تمارا.",
    descriptionFr:
      "E-commerce saoudien d'achat groupé — rejoignez ou créez un groupe pour payer moins, avec paiement fractionné (Tamara).",
    longDescription:
      "Jmaa (jmaa.sa) is a Saudi group-buying marketplace: shoppers team up on the same SKU so everyone benefits from a lower group price once the pool fills—positioned as “Buy together. Save more.” The storefront showcases electronics and more, with clear regular vs Jmaa pricing and Tamara installment messaging.\n\nOn the engineering side I contributed across NestJS services and Next.js UI: payment integrations (including NowLater, Paymob, Amwal Tech), refactors, and critical bug fixes to keep checkout and group flows reliable at scale.",
    longDescriptionAr:
      "جمعة (jmaa.sa) سوق سعودي للشراء الجماعي: يتجمّع المشترون على نفس المنتج ليحصل الجميع على سعر أقل عند اكتمال المجموعة — بشعار «اشترِ معاً ووفّر أكثر». المتجر يعرض إلكترونيات وغيرها مع مقارنة واضحة بين السعر العادي وسعر جمعة ورسائل تقسيط تمارا.\n\nعلى الصعيد التقني ساهمت عبر خدمات NestJS وواجهة Next.js: تكاملات دفع (منها NowLater وPaymob وAmwal Tech)، إعادة هيكلة، وإصلاح أعطال حرجة للحفاظ على موثوقية الدفع ومسارات المجموعة على نطاق واسع.",
    longDescriptionFr:
      "Jmaa (jmaa.sa) est une place de marché d'achat groupé : les acheteurs se regroupent sur un même produit pour obtenir un prix de groupe une fois le quota atteint — « Achetez ensemble. Économisez plus. » Le site met en avant l'électronique avec prix normal vs prix groupe et mentions Tamara.\n\nCôté technique : contributions NestJS et Next.js, intégrations paiement (NowLater, Paymob, Amwal Tech), refactorisations et corrections pour fiabiliser checkout et flux de groupe.",
    thumbnail: "https://res.cloudinary.com/nextjs-bayan/image/upload/v1776941962/Gemini_Generated_Image_r22x9er22x9er22x_cbiuuc.webp",
    images: [],
    techStack: ["Next.js", "NestJS", "TypeScript", "Paymob", "NowLater", "Amwal Tech"],
    category: "ecommerce",
    featured: true,
    liveUrl: "https://jmaa.sa",
    githubUrl: "",
    status: "live",
    startDate: "2026-02",
    endDate: "2026-03",
    highlights: [
      "Group-buy model: join/create groups, tiered pricing when the pool fills",
      "Featured catalog (e.g. electronics) with regular vs group price UX",
      "Multiple payment gateways & installment journeys (Tamara messaging on PDP)",
      "Full-stack delivery: NestJS APIs + Next.js storefront",
      "Reliability work: refactors and production bug fixes at scale",
    ],
    highlightsAr: [
      "نموذج شراء جماعي: الانضمام أو إنشاء مجموعة وسعر أفضل عند الاكتمال",
      "كتالوج مميز مع مقارنة سعر عادي مقابل سعر جمعة",
      "عدة بوابات دفع ومسارات تقسيط (تمارا على صفحة المنتج)",
      "تسليم full-stack: NestJS + Next.js",
      "موثوقية: إعادة هيكلة وإصلاح أعطال على نطاق واسع",
    ],
    highlightsFr: [
      "Achat groupé : rejoindre/créer un groupe, prix débloqué à complétion",
      "Catalogue avec prix barré vs prix groupe",
      "Passerelles de paiement et fractionnement (Tamara)",
      "Full-stack NestJS + Next.js",
      "Fiabilisation : refactor et correctifs en production",
    ],
  },
  {
    id: "2",
    slug: "survey-genius",
    title: "Survey Genius App",
    titleAr: "تطبيق Survey Genius",
    titleFr: "Survey Genius App",
    description:
      "AI-powered survey builder and analytics—create, distribute, and turn responses into actionable insights.",
    descriptionAr:
      "منصة استطلاعات مع تحليلات بالذكاء الاصطناعي — أنشئ، وزّع، وحوّل الإجابات إلى قرارات.",
    descriptionFr:
      "Création de sondages et analyses IA — créez, diffusez, transformez les réponses en décisions.",
    longDescription:
      "SurveyGenius (surveygenius.app) markets a simple survey builder with smarter analysis: AI-assisted analytics, customizable themes, and dashboards aimed at teams who need fast, honest signal from respondents.\n\nBuilt for the National AI Hackathon (1st place): Next.js frontend with a no-code style survey editor, live previews, and rich analytics surfaces (graphical, textual, numerical).\n\nThe product story emphasizes security, customization, and turning raw replies into recommendations—not just charts.",
    longDescriptionAr:
      "SurveyGenius (surveygenius.app) يقدّم منشئ استطلاعات بسيطاً مع تحليل أذكى: تحليلات مدعومة بالذكاء الاصطناعي، قوالب قابلة للتخصيص، ولوحات معلومات للفرق التي تحتاج إشارة سريعة من المستجيبين.\n\nبُني لصالح هاكاثون الذكاء الاصطناعي الوطني (المركز الأول): واجهة Next.js مع محرر استطلاع يشبه الـ no-code، معاينات حية، وتحليلات غنية (رسومية ونصية ورقمية).\n\nالقصة التسويقية تؤكد الأمان والتخصيص وتحويل الردود الخام إلى توصيات لا مجرد رسوم بيانية.",
    longDescriptionFr:
      "SurveyGenius (surveygenius.app) propose un éditeur de sondages simple avec analyse plus intelligente : analytics IA, personnalisation et tableaux de bord pour les équipes pressées.\n\nConçu pour le hackathon IA national (1er prix) : frontend Next.js avec éditeur type no-code, prévisualisations et analytics riches (graphiques, texte, chiffres).\n\nL'accent est mis sur sécurité, personnalisation et transformation des réponses brutes en recommandations.",
    thumbnail: "https://res.cloudinary.com/nextjs-bayan/image/upload/v1776941492/Gemini_Generated_Image_g7qnrvg7qnrvg7qn_zh8isr.webp",
    images: [],
    techStack: ["Next.js", "TypeScript", "AI/ML", "Drag & Drop", "Analytics Dashboard"],
    category: "ai",
    featured: true,
    liveUrl: "https://surveygenius.app",
    githubUrl: "",
    status: "live",
    startDate: "2025-05",
    endDate: "2025-07",
    highlights: [
      "1st Place — National AI Hackathon (Techno Park)",
      "AI-powered survey analysis & insight positioning on the marketing site",
      "No-code / drag-and-drop survey authoring with live preview",
      "Dashboards for graphical, textual, and numerical reporting",
      "Security- and customization-forward product narrative",
    ],
    highlightsAr: [
      "المركز الأول — هاكاثون الذكاء الاصطناعي الوطني (Techno Park)",
      "تحليل استطلاعات بالذكاء الاصطناعي كما يظهر في الموقع",
      "محرر استطلاع بالسحب والإفلات مع معاينة حية",
      "لوحات للتقارير الرسومية والنصية والرقمية",
      "تركيز على الأمان والتخصيص في الرسالة التسويقية",
    ],
    highlightsFr: [
      "1er prix — Hackathon IA national (Techno Park)",
      "Analyse de sondages IA (positionnement site marketing)",
      "Éditeur drag-and-drop avec prévisualisation",
      "Tableaux graphiques, textuels et numériques",
      "Discours produit axé sécurité & personnalisation",
    ],
    award: "1st Place — National AI Hackathon",
  },
  {
    id: "3",
    slug: "rabt-alkhayal-store",
    title: "Rabt Alkhayal Store",
    titleAr: "متجر ربط الخيال",
    titleFr: "Rabt Alkhayal Store",
    description:
      "Full-stack print & merchandise platform—design editor, orders, and operational workflows for Rabt Alkhayal.",
    descriptionAr:
      "منصة متكاملة للطباعة والمنتجات — محرر تصميم، طلبات، وسير عمل تشغيلي لربط الخيال.",
    descriptionFr:
      "Plateforme print & merch full-stack — éditeur, commandes et workflows pour Rabt Alkhayal.",
    longDescription:
      "Rab-t.com presents Rabt Alkhayal as a creative shopfront: featured products, company stats (projects delivered, satisfaction, clients, tenure), and a services layer pitched as secure, fast, and supported.\n\nTechnically the build pairs a responsive Next.js client with NestJS APIs—covering a real-time style design editor so customers tweak text, imagery, and colors without design tools, plus order management, inventory, payments, and print workflow tracking end to end.",
    longDescriptionAr:
      "rab-t.com يعرض رابط الخيال كواجهة متجر إبداعية: منتجات مميزة، أرقام للشركة (مشاريع منجزة، رضا، عملاء، خبرة)، وطبقة خدمات تُسوَّق كآمنة وسريعة ومدعومة.\n\nتقنياً الربط بين Next.js متجاوب وواجهات NestJS — يشمل محرر تصميم يشبه الوقت الفعلي ليعدّل العملاء النص والصور والألوان دون أدوات تصميم، مع إدارة طلبات ومخزون ودفع وتتبع سير عمل الطباعة من البداية للنهاية.",
    longDescriptionFr:
      "rab-t.com présente Rabt Alkhayal comme vitrine créative : produits vedettes, chiffres clés (projets, satisfaction, clients, ancienneté) et services sécurité/perf/support.\n\nCôté stack : Next.js responsive et APIs NestJS — éditeur temps réel pour texte/images/couleurs sans logiciel de design, plus commandes, stock, paiement et suivi du flux d'impression.",
    thumbnail: "https://res.cloudinary.com/nextjs-bayan/image/upload/v1776944084/Gemini_Generated_Image_d3wdz0d3wdz0d3wd_asl6ni.webp",
    images: [],
    techStack: ["Next.js", "NestJS", "TypeScript", "Real-time Editor", "Payment Integration"],
    category: "ecommerce",
    featured: true,
    liveUrl: "https://rab-t.com",
    githubUrl: "",
    status: "live",
    startDate: "2025-09",
    endDate: "2025-10",
    highlights: [
      "Marketing site highlights catalog, stats, and premium services positioning",
      "Real-time design customization (text, imagery, colors) for non-designers",
      "Order management: inventory, payments, fulfillment tracking",
      "Full-stack Next.js + NestJS + admin/ops surfaces",
      "Operational complexity translated into a clean shopper UX",
    ],
    highlightsAr: [
      "الموقع التسويقي يبرز الكتالوج والإحصاءات وخدمات مميزة",
      "تخصيص تصميم شبه فوري (نص، صور، ألوان) لغير المصممين",
      "إدارة طلبات: مخزون، دفع، تتبع التنفيذ",
      "Full-stack Next.js + NestJS ولوحات تشغيل",
      "ترجمة تعقيد العمليات إلى تجربة شراء واضحة",
    ],
    highlightsFr: [
      "Site vitrine : catalogue, stats, services premium",
      "Personnalisation temps réel (texte, visuels, couleurs)",
      "Commandes : stock, paiement, suivi logistique",
      "Full-stack Next.js + NestJS + back-office",
      "UX simple malgré la logique opérationnelle",
    ],
  },
  {
    id: "4",
    slug: "waiter-app",
    title: "Waiter App",
    titleAr: "تطبيق وايتر",
    titleFr: "Waiter App",
    description:
      "Saudi POS & mobile cashier product—launch a branded checkout experience in days without hiring developers.",
    descriptionAr:
      "منتج سعودي لنقاط البيع والصندوق المتنقل — أطلق تجربة صندوق بعلامتك خلال أيام دون مطوّر.",
    descriptionFr:
      "Produit POS / caisse mobile en Arabie — lancez votre caisse en marque en quelques jours sans dev dédié.",
    longDescription:
      "Waiter (waiter.sa) targets restaurants, cafés, and supermarkets that want a mobile-first cashier: POS hardware integration, bilingual UX, and a promise that businesses can go live quickly—often framed as launching within ~48 hours without needing an in-house developer.\n\nThe stack centers on Next.js with Styled Components, MUI, RTK, and next-i18n so Arabic/English experiences stay consistent while teams manage operations and statistics from one hub.",
    longDescriptionAr:
      "وايتر (waiter.sa) يستهدف المطاعم والمقاهي والسوبرماركت التي تريد صندوقاً يقدّم الجوال أولاً: تكامل أجهزة نقاط البيع، تجربة ثنائية اللغة، ووعد بإطلاق سريع—غالباً خلال نحو 48 ساعة دون مطوّر داخل المنظمة.\n\nالتقنية تمر عبر Next.js مع Styled Components وMUI وRTK وnext-i18n لتجربة عربي/إنجليزي متسقة مع إدارة العمليات والإحصاءات من لوحة واحدة.",
    longDescriptionFr:
      "Waiter (waiter.sa) cible restaurants, cafés et supermarchés avec une caisse mobile-first : intégration TPE, UX bilingue et mise en ligne rapide — souvent sous ~48 h sans développeur interne.\n\nStack Next.js, Styled Components, MUI, RTK et next-i18n pour parcours AR/EN homogènes et pilotage opérationnel centralisé.",
    thumbnail: "https://res.cloudinary.com/nextjs-bayan/image/upload/v1776941992/Gemini_Generated_Image_temq93temq93temq_a8j94s.webp",
    images: [],
    techStack: ["Next.js", "Styled Components", "MUI", "Next i18n", "RTK", "TypeScript"],
    category: "web",
    featured: false,
    liveUrl: "https://waiter.sa",
    githubUrl: "",
    status: "live",
    startDate: "2024-08",
    endDate: "2024-10",
    highlights: [
      "Fast go-live positioning for SMB operators (minimal engineering overhead)",
      "POS device integration for in-venue workflows",
      "Arabic/English i18n across cashier flows",
      "State and UI toolkit: MUI + RTK for dependable dashboards",
      "Operations & statistics surfaces for owners and staff",
    ],
    highlightsAr: [
      "إطلاق سريع لأصحاب الأعمال (أقل اعتماداً على هندسة داخلية)",
      "تكامل أجهزة نقاط البيع لسير العمل داخل المحل",
      "عربي/إنجليزي عبر مسارات الصندوق",
      "واجهات MUI وRTK للوحات الموثوقة",
      "لوحات عمليات وإحصاءات للمالك والموظفين",
    ],
    highlightsFr: [
      "Mise en ligne rapide pour les PME (peu d'ingénierie interne)",
      "Intégration terminaux POS",
      "Parcours AR/EN sur la caisse",
      "MUI + RTK pour tableaux de bord fiables",
      "Pilotage opérationnel et statistiques",
    ],
  },
  {
    id: "5",
    slug: "albayan-charity",
    title: "AlBayan Charity",
    titleAr: "لوحة تحكم البيان الخيرية",
    titleFr: "AlBayan Charity",
    description:
      "Charity foundation portal—donations, projects, transparency, and secure RBAC-backed operations.",
    descriptionAr:
      "بوابة الجمعية الخيرية — تبرعات، مشروعات، شفافية، وعمليات آمنة مع صلاحيات RBAC.",
    descriptionFr:
      "Portail caritatif — dons, projets, transparence et back-office sécurisé RBAC.",
    longDescription:
      "Albayan Charity (albayancharity.org) showcases Al-Bayan Foundation’s mission: humanitarian aid for families (including Gaza-focused appeals), transparency narratives, beneficiary counters, volunteer footprint, and FAQs about how donations are used.\n\nEngineering-wise the dashboard pairs Next.js + ShadCN + Tailwind with a NestJS + MongoDB backend, OAuth2 flows, RBAC for staff roles, GitHub Actions CI/CD, Nginx reverse proxying, and multi-subdomain deployment on VPS infrastructure.",
    longDescriptionAr:
      "البيان الخيرية (albayancharity.org) تعرض رسالة مؤسسة البيان: مساعدات إنسانية للعائلات (منها نداءات تركز على غزة)، قصص شفافية، عدادات للمستفيدين، حضور المتطوعين، وأسئلة شائعة حول استخدام التبرعات.\n\nتقنياً تربط لوحة Next.js وShadCN وTailwind مع خلفية NestJS وMongoDB، وتدفقات OAuth2، وRBAC لأدوار الطاقم، وCI/CD عبر GitHub Actions، وNginx كوسيط عكسي، ونشر على عدة نطاقات فرعية على بنية VPS.",
    longDescriptionFr:
      "Albayan Charity (albayancharity.org) présente la fondation : aide humanitaire (appels dont Gaza), transparence, chiffres clés bénéficiaires/bénévoles, FAQ sur l'usage des dons.\n\nIngénierie : Next.js + ShadCN + Tailwind, backend NestJS + MongoDB, OAuth2, RBAC, CI/CD GitHub Actions, Nginx et sous-domaines sur VPS.",
    thumbnail: "https://res.cloudinary.com/nextjs-bayan/image/upload/v1776944078/Gemini_Generated_Image_n6lbbwn6lbbwn6lb_krzgni.webp",
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
    liveUrl: "https://albayancharity.org",
    githubUrl: "",
    status: "live",
    startDate: "2025-03",
    endDate: "2025-03",
    highlights: [
      "Public storytelling: sliders, donation CTAs, FAQ and impact counters",
      "OAuth2 authentication with granular RBAC for operational staff",
      "Secure NestJS + MongoDB APIs powering donor and admin flows",
      "GitHub Actions CI/CD + Nginx reverse proxy on Hostinger VPS",
      "Multi-subdomain deployment architecture",
    ],
    highlightsAr: [
      "سرد علني: شرائح، أزرار تبرع، أسئلة شائعة وأعداد تأثير",
      "OAuth2 مع RBAC دقيق لفريق العمليات",
      "واجهات NestJS + MongoDB آمنة للمتبرعين والإدارة",
      "CI/CD عبر GitHub Actions وNginx على VPS Hostinger",
      "بنية بعدة نطاقات فرعية",
    ],
    highlightsFr: [
      "Storytelling public : slides, dons, FAQ, chiffres d'impact",
      "OAuth2 + RBAC pour les équipes terrain",
      "APIs NestJS + MongoDB pour donateurs et admin",
      "CI/CD GitHub Actions + Nginx sur VPS Hostinger",
      "Architecture multi-sous-domaines",
    ],
  },
  {
    id: "6",
    slug: "hawaak-store",
    title: "Hawaak Store",
    titleAr: "متجر هواك",
    titleFr: "Hawaak Store",
    description:
      "Sudanese heritage e-commerce in KSA—seasonal promos, flagship categories, and nationwide customer love.",
    descriptionAr:
      "تجارة إلكترونية للتراث السوداني في السعودية — عروض موسمية، أقسام رئيسية، وثقة العملاء.",
    descriptionFr:
      "E-commerce du patrimoine soudanais en Arabie — promos saisonnières et catégories phares.",
    longDescription:
      "Hawaak (m-hawaak.com) celebrates Sudanese goods in Saudi Arabia: seasonal discounts (site banners cite limited-time percentage savings), flagship sections for staple foods and Sudanese creams/perfumes, Bankak payment cues, and social proof/testimonials baked into the homepage narrative.\n\nFull-stack delivery combines a modern Next.js + ShadCN + Tailwind storefront with NestJS REST services—catalog, checkout flows, profiles, and carefully modeled schemas for products and orders.",
    longDescriptionAr:
      "هواك (m-hawaak.com) يبرز البضائع السودانية في السعودية: تخفيضات موسمية (لافتات تذكر نسبة ولمدة محدودة)، أقسام رئيسية للمؤن الغذائية وللكريمات والعطور السودانية، إشارات لدفع بنكك، وشهادات عملاء في الصفحة الرئيسية.\n\nالتسليم full-stack يجمع واجهة Next.js وShadCN وTailwind مع خدمات NestJS REST — كتالوج، مسارات دفع، ملفات مستخدمين، ونمذجة دقيقة للمنتجات والطلبات.",
    longDescriptionFr:
      "Hawaak (m-hawaak.com) met en avant les produits soudanais en Arabie : promotions saisonnières, rayons alimentaires et cosmétiques/parfums, paiement Bankak, témoignages clients.\n\nFull-stack Next.js + ShadCN + Tailwind et APIs NestJS — catalogue, checkout, profils, schémas produits/commandes.",
    thumbnail: "https://res.cloudinary.com/nextjs-bayan/image/upload/v1776944082/Gemini_Generated_Image_j6vhuhj6vhuhj6vh_dzlrmh.webp",
    images: [],
    techStack: ["Next.js", "NestJS", "ShadCN", "Tailwind CSS", "TypeScript", "REST APIs"],
    category: "ecommerce",
    featured: false,
    liveUrl: "https://m-hawaak.com",
    githubUrl: "",
    status: "live",
    startDate: "2024-11",
    endDate: "2024-12",
    highlights: [
      "Seasonal promo storytelling + Sudan-focused merchandising sections",
      "Checkout UX aligned with regional payment norms (Bankak cues on-site)",
      "NestJS REST layer for catalog, checkout, and customer profiles",
      "ShadCN + Tailwind UI tuned for bilingual merchandising content",
      "Community proof and heritage positioning throughout the funnel",
    ],
    highlightsAr: [
      "عروض موسمية وأقسام تركز على الهوية السودانية",
      "تجربة دفع متوافقة مع طرق الدفع المحلية (إشارات بنكك)",
      "طبقة NestJS REST للكتالوج والدفع والملفات",
      "واجهة ShadCN + Tailwind لمحتوى تجاري ثنائي اللغة",
      "إثبات مجتمعي وهوية تراثية عبر مسار الشراء",
    ],
    highlightsFr: [
      "Promotions saisonnières et rayons patrimoine soudanais",
      "Checkout adapté aux paiements locaux (Bankak)",
      "APIs NestJS pour catalogue, paiement et profils",
      "UI ShadCN + Tailwind pour merchandising bilingue",
      "Preuve sociale et storytelling culturel",
    ],
  },
];
