export type Education = {
  id: string;
  institution: string;
  institutionAr: string;
  institutionFr: string;
  logo: string;
  degree: string;
  degreeAr: string;
  degreeFr: string;
  field: string;
  fieldAr: string;
  fieldFr: string;
  startDate: string;
  endDate: string;
  grade: string;
  gradeAr: string;
  gradeFr: string;
  achievements: string[];
  achievementsAr: string[];
  /** Optional public URL to degree/certificate PDF or verification page */
  certificateUrl?: string;
  /** Optional URL to academic transcript PDF */
  transcriptUrl?: string;
};

export const education: Education[] = [
  {
    id: "university-of-palestine",
    institution: "University of Palestine",
    institutionAr: "جامعة فلسطين",
    institutionFr: "Université de Palestine",
    logo: "https://students.up.edu.ps/assets/images/logo_up.png",
    degree: "Bachelor of Software Engineering",
    degreeAr: "بكالوريوس هندسة البرمجيات",
    degreeFr: "Licence en Génie Logiciel",
    field: "Software Engineering",
    fieldAr: "هندسة البرمجيات",
    fieldFr: "Génie Logiciel",
    startDate: "2020",
    endDate: "2025",
    grade: "Excellent",
    gradeAr: "ممتاز",
    gradeFr: "Mention Excellent",
    achievements: [
      "Graduated with Excellent honors",
      "Specialized in system design and advanced technologies",
      "Hands-on experience through projects and internships",
      "Mastered programming, algorithms, and software architecture",
    ],
    achievementsAr: [
      "تخرج بمرتبة الشرف",
      "تخصص في تصميم الأنظمة والتقنيات المتقدمة",
      "خبرة عملية من خلال المشاريع والتدريب",
    ],
    certificateUrl : "https://verify.up.edu.ps/documents/17632217921202002926918a1205c01c",
    transcriptUrl : "https://verify.up.edu.ps/documents/176156367012020029268ff5416cf840"
  },
];
