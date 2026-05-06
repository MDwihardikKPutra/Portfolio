import type { Language } from "../translations";
export type { Language };
import { translations } from "../translations";

export interface Project {
  title: string;
  category: string;
  description: string;
  images?: string[];
  image?: string;
  tags: string[];
  link: string;
  featured: boolean;
  type: "project" | "personal";
}

export interface SkillSet {
  category: string;
  items: string[];
}

const projectCache: Record<string, Project[]> = {};
export const getProjects = (language: Language): Project[] => {
  if (projectCache[language]) return projectCache[language];

  const t = translations[language];
  const result: Project[] = [
    {
      title: "Archi Studio",
      category: t.archiStudioCategory,
      description: t.archiStudioDesc,
      image: "/Gallery/Archi-Studio/preview-1.png",
      images: ["/Gallery/Archi-Studio/preview-1.png", "/Gallery/Archi-Studio/preview-2.png"],
      tags: ["React", "TypeScript", "Vite", "Editorial"],
      link: "https://landing-page-archi-studio.vercel.app/",
      featured: true,
      type: "personal",
    },
    {
      title: "Smart Finance Tracker",
      category: language === "en" ? "Finance Management" : "Manajemen Keuangan",
      description: language === "en"
        ? "AI-powered financial management system for tracking transactions and wealth growth."
        : "Sistem manajemen keuangan berbasis AI untuk melacak transaksi dan pertumbuhan kekayaan.",
      image: "/Gallery/SmartFinance/1-smartfinance.png",
      images: ["/Gallery/SmartFinance/1-smartfinance.png", "/Gallery/SmartFinance/2-smartfinance.png"],
      tags: ["Next.js", "AI", "Finance", "PostgreSQL"],
      link: "https://smart-finance-tracker-smoky.vercel.app/",
      featured: true,
      type: "personal",
    },
    {
      title: "Oceanus Energy",
      category: language === "en" ? "Corporate Website" : "Website Perusahaan",
      description: language === "en"
        ? "High-impact corporate company profile with a focus on sustainable energy sector services."
        : "Company profile perusahaan dengan fokus pada layanan sektor energi terbarukan.",
      image: "/Gallery/Oceanus.png",
      tags: ["React", "Corporate", "Company Profile"],
      link: "https://oceanusenergy.vercel.app/",
      featured: true,
      type: "personal",
    },
    {
      title: "HRIS Six",
      category: language === "en" ? "HR Management" : "Manajemen HR",
      description: language === "en"
        ? "Compact Human Resource Integration System with streamlined attendance and payroll."
        : "Sistem Integrasi SDM ringkas dengan absensi dan penggajian yang efisien.",
      image: "/Gallery/HRIS/1-hris.png",
      images: ["/Gallery/HRIS/1-hris.png", "/Gallery/HRIS/2-hris.png"],
      tags: ["Next.js", "HRIS", "Prisma", "Tailwind"],
      link: "https://hris-six-pi.vercel.app/",
      featured: true,
      type: "personal",
    },
    {
      title: "PT Puri Ganesha Engineering",
      category: t.project1Category,
      description: t.project1Desc,
      images: ["/pge-hero.png", "/pge-project.png", "/pge-aboutus.png"],
      tags: ["React", "Full-Stack"],
      link: "https://pg-engineering.com",
      featured: true,
      type: "project",
    },
    {
      title: "PGE System",
      category: t.project2Category,
      description: t.project2Desc,
      images: [
        "/Web-PGE-System.png",
        "/Web-PGE-System1.png",
        "/Web-PGE-System2.png",
        "/Web-PGE-System3.png",
        "/Web-PGE-System4.png",
      ],
      tags: ["Laravel 11", "Enterprise"],
      link: "#",
      featured: true,
      type: "project",
    },
    {
      title: "ScaleUpGo",
      category: language === "en" ? "Web Development Agency" : "Jasa Pembuatan Web",
      description: language === "en"
        ? "Boutique web development agency landing page showcasing modern tech solutions for businesses."
        : "Landing page agensi pembuatan website yang menawarkan solusi teknologi modern bagi bisnis.",
      image: "/Gallery/Scaleup.png",
      tags: ["React", "Business", "Web Services"],
      link: "https://scaleupgo.vercel.app/",
      featured: true,
      type: "personal",
    },
    {
      title: "Brewhouse",
      category: language === "en" ? "Landing Page" : "Landing Page",
      description: language === "en"
        ? "Modern coffee shop landing page with sophisticated design aesthetics and interactive elements."
        : "Landing page coffee shop modern dengan estetika desain yang canggih dan elemen interaktif.",
      image: "/Gallery/brewhouse.png",
      tags: ["React", "Landing Page", "Coffee Shop"],
      link: "https://brewhouse-rho.vercel.app/",
      featured: true,
      type: "personal",
    },
    {
      title: t.dataAnalystProjectTitle,
      category: t.project4Category,
      description: t.project4Desc,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
      tags: ["Python", "Data Analysis", "Pandas"],
      link: "/projects/data-analyst",
      featured: true,
      type: "personal",
    },
    {
      title: "Network Infrastructure",
      category: t.project3Category,
      description: t.project3Desc,
      image:
        "https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=1000",
      tags: ["Linux", "Network"],
      link: "#",
      featured: true,
      type: "project",
    },
  ];

  projectCache[language] = result;
  return result;
};

export interface SocialLink {
  name: string;
  url: string;
  icon: "github" | "linkedin" | "medium";
}

export const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    url: "https://github.com/MDwihardikKPutra",
    icon: "github",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/mokhamad-dwihardik-kusuma-putra-470854190/",
    icon: "linkedin",
  },
  {
    name: "Medium",
    url: "https://medium.com/@ddiko105",
    icon: "medium",
  },
];

export const contactInfo = {
  email: "ddiko105@gmail.com",
  phone: "+62 878 5632 4656",
  whatsapp: "https://wa.me/6287856324656",
  linkedinName: "Mokhamad Dwihardik K.P.",
  githubName: "MDwihardikKPutra",
  copyright: "© 2026 Mokhamad Dwihardik Kusuma Putra",
  location: "Bandung, West Java",
  zone: "Indonesia / SEA Zone"
};


const skillCache: Record<string, SkillSet[]> = {};
export const getSkills = (language: Language): SkillSet[] => {
  if (skillCache[language]) return skillCache[language];

  const t = translations[language];
  const result: SkillSet[] = [
    {
      category: t.backendDev,
      items: ["Laravel 11", "PHP", "RESTful API"],
    },
    {
      category: t.frontendDev,
      items: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    },
    {
      category: t.databaseMgmt,
      items: ["MySQL", "PostgreSQL"],
    },
    {
      category: language === "en" ? "Infrastructure & Operations" : "Infrastruktur & Operasi",
      items: [
        "Linux Server Administration",
        "MikroTik RouterOS",
        "TrueNAS Scale",
        "Cloud Services & Security",
        "Server Management",
      ],
    },
  ];

  skillCache[language] = result;
  return result;
};
