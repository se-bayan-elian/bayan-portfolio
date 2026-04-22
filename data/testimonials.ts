export type Testimonial = {
  id: string;
  quote: string;
  quoteAr: string;
  quoteFr: string;
  author: string;
  role: string;
  company: string;
};
export const testimonials: Testimonial[] = [
  {
    id: "1",
    quote:
      "Demonstrates strong problem-solving skills, especially when dealing with production issues. Was able to identify and fix critical bugs quickly while maintaining system stability. Could further improve by documenting solutions more consistently.",
    quoteAr:
      "يُظهر مهارات قوية في حل المشاكل خاصة في بيئة الإنتاج، حيث تمكن من إصلاح أخطاء حرجة بسرعة مع الحفاظ على استقرار النظام. يمكنه التحسن أكثر في توثيق الحلول بشكل منتظم.",
    quoteFr:
      "Démontre de solides compétences en résolution de problèmes, notamment en production. Corrige efficacement les bugs critiques. Une amélioration possible serait une meilleure documentation.",
    author: "Senior Engineer",
    role: "Backend Lead",
    company: "Jmaa Store"
  },

  {
    id: "2",
    quote:
      "Delivers high-quality frontend features with good attention to UI/UX details. The drag-and-drop survey builder was implemented effectively. Occasionally could improve communication during rapid iteration phases.",
    quoteAr:
      "يقدم ميزات واجهة أمامية بجودة عالية مع اهتمام جيد بتجربة المستخدم. تم تنفيذ محرر السحب والإفلات بشكل ممتاز، ويمكن تحسين التواصل خلال مراحل التطوير السريعة.",
    quoteFr:
      "Fournit des fonctionnalités frontend de haute qualité avec une bonne attention au design. Peut améliorer la communication lors des phases rapides.",
    author: "Project Supervisor",
    role: "AI Product Manager",
    company: "Survey Genius"
  },

  {
    id: "3",
    quote:
      "Shows strong ownership when working on complex features like the real-time design editor. Successfully translated business requirements into usable UI. Could benefit from deeper testing coverage in edge cases.",
    quoteAr:
      "يُظهر تحملاً للمسؤولية عند العمل على ميزات معقدة مثل محرر التصميم الفوري، ونجح في تحويل متطلبات العمل إلى واجهات عملية. يمكنه تحسين تغطية الاختبارات للحالات الطرفية.",
    quoteFr:
      "Montre un bon sens de responsabilité sur des fonctionnalités complexes. Bonne traduction des besoins métier en UI. Peut améliorer les tests sur les cas limites.",
    author: "Technical Manager",
    role: "Full-stack Lead",
    company: "Rabt Alkhayal Store"
  },

  {
    id: "4",
    quote:
      "Reliable developer who consistently delivers features on time. The POS system modules were stable and easy to use. Should continue improving performance optimization for larger datasets.",
    quoteAr:
      "مطور موثوق يلتزم بتسليم المهام في الوقت المحدد. وحدات نظام نقاط البيع كانت مستقرة وسهلة الاستخدام، ويمكنه الاستمرار في تحسين الأداء مع البيانات الكبيرة.",
    quoteFr:
      "Développeur fiable livrant ses tâches à temps. Les modules POS sont stables. Peut améliorer l’optimisation des performances avec des volumes élevés.",
    author: "Operations Director",
    role: "Business Operations",
    company: "Waiter App"
  }
];