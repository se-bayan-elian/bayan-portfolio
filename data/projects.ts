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
      "Qader (qader.vip) positions itself as a companion for assessments and learning—an educational ecosystem where students engage with structured content, tests, and performance insights. I worked as a Next.js frontend developer on the main production platform: stabilizing large legacy areas of the UI, fixing critical production bugs, and refactoring for maintainability. I contributed to real-time group chat used by study and trading communities, built and improved assessment flows, and helped integrate AI-assisted score analysis so educators get faster, clearer feedback. The work emphasized performance, resilience, and UX quality across a high-traffic SaaS surface.",
    longDescriptionAr:
      "منصة قادر (qader.vip) تقدّم نفسها كرفيق للاختبارات والتعلّم: منظومة تعليمية يتفاعل فيها الطلاب مع محتوى منظم واختبارات ورؤى أداء. عملت كمطوّر واجهات Next.js على المنصة الإنتاجية الرئيسية: تثبيت أجزاء واسعة من الواجهة القديمة، إصلاح أعطال حرجة في الإنتاج، وإعادة هيكلة لسهولة الصيانة. ساهمت في دردشة جماعية فورية لمجتمعات دراسية وتداول، وبناء وتحسين مسارات التقييم، ودعم دمج تحليل الدرجات بمساعدة الذكاء الاصطناعي ليتلقى المعلّمون ملاحظات أسرع أوضح. ركّز العمل على الأداء والاستقرار وجودة تجربة المستخدم على واجهة SaaS مزدحمة.",
    longDescriptionFr:
      "Qader (qader.vip) se présente comme un compagnon pour les évaluations et l'apprentissage : un écosystème où les étudiants accèdent à du contenu structuré, des tests et des indicateurs de performance. J'ai travaillé en Next.js sur la plateforme de production : stabilisation de larges zones héritées, correction de bugs critiques et refactorisation pour la maintenabilité. J'ai contribué au chat de groupe temps réel (communautés d'étude et de trading), aux modules d'évaluation et à l'intégration d'analyses de scores assistées par l'IA pour des retours plus rapides aux enseignants. Priorité à la performance, la résilience et l'UX sur une SaaS à fort trafic.",
    thumbnail: "https://res.cloudinary.com/nextjs-bayan/image/upload/v1776861190/%D9%82%D8%A7%D8%AF%D8%B1-Qader-%D8%B1%D9%81%D9%8A%D9%82-%D8%AF%D8%B1%D8%A8%D9%83-%D9%84%D9%84%D8%A7%D8%AE%D8%AA%D8%A8%D8%A7%D8%B1%D8%A7%D8%AA-04-22-2026_03_24_PM_w7yj7q.png",
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
      "Jmaa (jmaa.sa) is a Saudi group-buying marketplace: shoppers team up on the same SKU so everyone benefits from a lower group price once the pool fills—positioned as “Buy together. Save more.” The storefront showcases electronics and more, with clear regular vs Jmaa pricing and Tamara installment messaging. On the engineering side I contributed across NestJS services and Next.js UI: payment integrations (including NowLater, Paymob, Amwal Tech), refactors, and critical bug fixes to keep checkout and group flows reliable at scale.",
    longDescriptionAr:
      "جمعة (jmaa.sa) سوق سعودي للشراء الجماعي: يتجمّع المشترون على نفس المنتج ليحصل الجميع على سعر أقل عند اكتمال المجموعة — بشعار «اشترِ معاً ووفّر أكثر». المتجر يعرض إلكترونيات وغيرها مع مقارنة واضحة بين السعر العادي وسعر جمعة ورسائل تقسيط تمارا. على الصعيد التقني ساهمت عبر خدمات NestJS وواجهة Next.js: تكاملات دفع (منها NowLater وPaymob وAmwal Tech)، إعادة هيكلة، وإصلاح أعطال حرجة للحفاظ على موثوقية الدفع ومسارات المجموعة على نطاق واسع.",
    longDescriptionFr:
      "Jmaa (jmaa.sa) est une place de marché d'achat groupé : les acheteurs se regroupent sur un même produit pour obtenir un prix de groupe une fois le quota atteint — « Achetez ensemble. Économisez plus. » Le site met en avant l'électronique avec prix normal vs prix groupe et mentions Tamara. Côté technique : contributions NestJS et Next.js, intégrations paiement (NowLater, Paymob, Amwal Tech), refactorisations et corrections pour fiabiliser checkout et flux de groupe.",
    thumbnail: "/images/projects/jmaa.jpg",
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
      "SurveyGenius (surveygenius.app) markets a simple survey builder with smarter analysis: AI-assisted analytics, customizable themes, and dashboards aimed at teams who need fast, honest signal from respondents. Built for the National AI Hackathon (1st place): Next.js frontend with a no-code style survey editor, live previews, and rich analytics surfaces (graphical, textual, numerical). The product story emphasizes security, customization, and turning raw replies into recommendations—not just charts.",
    longDescriptionAr:
      "SurveyGenius (surveygenius.app) يقدّم منشئ استطلاعات بسيطاً مع تحليل أذكى: تحليلات مدعومة بالذكاء الاصطناعي، قوالب قابلة للتخصيص، ولوحات معلومات للفرق التي تحتاج إشارة سريعة من المستجيبين. بُني لصالح هاكاثون الذكاء الاصطناعي الوطني (المركز الأول): واجهة Next.js مع محرر استطلاع يشبه الـ no-code، معاينات حية، وتحليلات غنية (رسومية ونصية ورقمية). القصة التسويقية تؤكد الأمان والتخصيص وتحويل الردود الخام إلى توصيات لا مجرد رسوم بيانية.",
    longDescriptionFr:
      "SurveyGenius (surveygenius.app) propose un éditeur de sondages simple avec analyse plus intelligente : analytics IA, personnalisation et tableaux de bord pour les équipes pressées. Conçu pour le hackathon IA national (1er prix) : frontend Next.js avec éditeur type no-code, prévisualisations et analytics riches (graphiques, texte, chiffres). L'accent est mis sur sécurité, personnalisation et transformation des réponses brutes en recommandations.",
    thumbnail: "/images/projects/survey-genius.jpg",
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
      "Rab-t.com presents Rabt Alkhayal as a creative shopfront: featured products, company stats (projects delivered, satisfaction, clients, tenure), and a services layer pitched as secure, fast, and supported. Technically the build pairs a responsive Next.js client with NestJS APIs—covering a real-time style design editor so customers tweak text, imagery, and colors without design tools, plus order management, inventory, payments, and print workflow tracking end to end.",
    longDescriptionAr:
      "rab-t.com يعرض رابط الخيال كواجهة متجر إبداعية: منتجات مميزة، أرقام للشركة (مشاريع منجزة، رضا، عملاء، خبرة)، وطبقة خدمات تُسوَّق كآمنة وسريعة ومدعومة. تقنياً الربط بين Next.js متجاوب وواجهات NestJS — يشمل محرر تصميم يشبه الوقت الفعلي ليعدّل العملاء النص والصور والألوان دون أدوات تصميم، مع إدارة طلبات ومخزون ودفع وتتبع سير عمل الطباعة من البداية للنهاية.",
    longDescriptionFr:
      "rab-t.com présente Rabt Alkhayal comme vitrine créative : produits vedettes, chiffres clés (projets, satisfaction, clients, ancienneté) et services sécurité/perf/support. Côté stack : Next.js responsive et APIs NestJS — éditeur temps réel pour texte/images/couleurs sans logiciel de design, plus commandes, stock, paiement et suivi du flux d'impression.",
    thumbnail: "/images/projects/rabt-store.jpg",
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
      "Waiter (waiter.sa) targets restaurants, cafés, and supermarkets that want a mobile-first cashier: POS hardware integration, bilingual UX, and a promise that businesses can go live quickly—often framed as launching within ~48 hours without needing an in-house developer. The stack centers on Next.js with Styled Components, MUI, RTK, and next-i18n so Arabic/English experiences stay consistent while teams manage operations and statistics from one hub.",
    longDescriptionAr:
      "وايتر (waiter.sa) يستهدف المطاعم والمقاهي والسوبرماركت التي تريد صندوقاً يقدّم الجوال أولاً: تكامل أجهزة نقاط البيع، تجربة ثنائية اللغة، ووعد بإطلاق سريع—غالباً خلال نحو 48 ساعة دون مطوّر داخل المنظمة. التقنية تمر عبر Next.js مع Styled Components وMUI وRTK وnext-i18n لتجربة عربي/إنجليزي متسقة مع إدارة العمليات والإحصاءات من لوحة واحدة.",
    longDescriptionFr:
      "Waiter (waiter.sa) cible restaurants, cafés et supermarchés avec une caisse mobile-first : intégration TPE, UX bilingue et mise en ligne rapide — souvent sous ~48 h sans développeur interne. Stack Next.js, Styled Components, MUI, RTK et next-i18n pour parcours AR/EN homogènes et pilotage opérationnel centralisé.",
    thumbnail: "/images/projects/waiter.jpg",
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
      "Albayan Charity (albayancharity.org) showcases Al-Bayan Foundation’s mission: humanitarian aid for families (including Gaza-focused appeals), transparency narratives, beneficiary counters, volunteer footprint, and FAQs about how donations are used. Engineering-wise the dashboard pairs Next.js + ShadCN + Tailwind with a NestJS + MongoDB backend, OAuth2 flows, RBAC for staff roles, GitHub Actions CI/CD, Nginx reverse proxying, and multi-subdomain deployment on VPS infrastructure.",
    longDescriptionAr:
      "البيان الخيرية (albayancharity.org) تعرض رسالة مؤسسة البيان: مساعدات إنسانية للعائلات (منها نداءات تركز على غزة)، قصص شفافية، عدادات للمستفيدين، حضور المتطوعين، وأسئلة شائعة حول استخدام التبرعات. تقنياً تربط لوحة Next.js وShadCN وTailwind مع خلفية NestJS وMongoDB، وتدفقات OAuth2، وRBAC لأدوار الطاقم، وCI/CD عبر GitHub Actions، وNginx كوسيط عكسي، ونشر على عدة نطاقات فرعية على بنية VPS.",
    longDescriptionFr:
      "Albayan Charity (albayancharity.org) présente la fondation : aide humanitaire (appels dont Gaza), transparence, chiffres clés bénéficiaires/bénévoles, FAQ sur l'usage des dons. Ingénierie : Next.js + ShadCN + Tailwind, backend NestJS + MongoDB, OAuth2, RBAC, CI/CD GitHub Actions, Nginx et sous-domaines sur VPS.",
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
      "Hawaak (m-hawaak.com) celebrates Sudanese goods in Saudi Arabia: seasonal discounts (site banners cite limited-time percentage savings), flagship sections for staple foods and Sudanese creams/perfumes, Bankak payment cues, and social proof/testimonials baked into the homepage narrative. Full-stack delivery combines a modern Next.js + ShadCN + Tailwind storefront with NestJS REST services—catalog, checkout flows, profiles, and carefully modeled schemas for products and orders.",
    longDescriptionAr:
      "هواك (m-hawaak.com) يبرز البضائع السودانية في السعودية: تخفيضات موسمية (لافتات تذكر نسبة ولمدة محدودة)، أقسام رئيسية للمؤن الغذائية وللكريمات والعطور السودانية، إشارات لدفع بنكك، وشهادات عملاء في الصفحة الرئيسية. التسليم full-stack يجمع واجهة Next.js وShadCN وTailwind مع خدمات NestJS REST — كتالوج، مسارات دفع، ملفات مستخدمين، ونمذجة دقيقة للمنتجات والطلبات.",
    longDescriptionFr:
      "Hawaak (m-hawaak.com) met en avant les produits soudanais en Arabie : promotions saisonnières, rayons alimentaires et cosmétiques/parfums, paiement Bankak, témoignages clients. Full-stack Next.js + ShadCN + Tailwind et APIs NestJS — catalogue, checkout, profils, schémas produits/commandes.",
    thumbnail: "/images/projects/hawaak.jpg",
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
