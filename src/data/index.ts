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
  accent?: string; // New: Accent color for visual differentiation
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
      accent: "#B49673", // Earthy Sand
      type: "personal",
    },
    {
      title: "Smart Finance Tracker",
      category: t.smartFinanceCategory,
      description: t.smartFinanceDesc,
      image: "/Gallery/SmartFinance/1-smartfinance.png",
      images: ["/Gallery/SmartFinance/1-smartfinance.png", "/Gallery/SmartFinance/2-smartfinance.png"],
      tags: ["Next.js", "AI", "Finance", "PostgreSQL"],
      link: "https://smart-finance-tracker-smoky.vercel.app/",
      featured: true,
      accent: "#3C4C3D", // Forest Green
      type: "personal",
    },
    {
      title: "Oceanus Energy",
      category: t.oceanusCategory,
      description: t.oceanusDesc,
      image: "/Gallery/Oceanus.png",
      tags: ["React", "Corporate", "Company Profile"],
      link: "https://oceanusenergy.vercel.app/",
      featured: true,
      accent: "#2A4B6B", // Deep Ocean Blue
      type: "personal",
    },
    {
      title: "HRIS Six",
      category: t.hrisCategory,
      description: t.hrisDesc,
      image: "/Gallery/HRIS/1-hris.png",
      images: ["/Gallery/HRIS/1-hris.png", "/Gallery/HRIS/2-hris.png"],
      tags: ["Next.js", "HRIS", "Prisma", "Tailwind"],
      link: "https://hris-six-pi.vercel.app/",
      featured: true,
      accent: "#6B2A2A", // Crimson Earth
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
      accent: "#111111",
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
      accent: "#333333",
      type: "project",
    },
    {
      title: "ScaleUpGo",
      category: t.scaleupCategory,
      description: t.scaleupDesc,
      image: "/Gallery/Scaleup.png",
      tags: ["React", "Business", "Web Services"],
      link: "https://scaleupgo.vercel.app/",
      featured: true,
      accent: "#4A5568",
      type: "personal",
    },
    {
      title: "Brewhouse",
      category: t.brewhouseCategory,
      description: t.brewhouseDesc,
      image: "/Gallery/brewhouse.png",
      tags: ["React", "Landing Page", "Coffee Shop"],
      link: "https://brewhouse-rho.vercel.app/",
      featured: true,
      accent: "#744210",
      type: "personal",
    },
  ];

  projectCache[language] = result;
  return result;
};

export const projects = getProjects('en');

export const contactInfo = {
  email: "ddiko105@gmail.com",
  phone: "+62 878 5632 4656",
  whatsapp: "https://wa.me/6287856324656",
  linkedinName: "Mokhamad Dwihardik Kusuma Putra / Diko Putra",
  githubName: "MDwihardikKPutra",
  copyright: "© 2026 Mokhamad Dwihardik Kusuma Putra / Diko Putra",
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
      category: t.infrastructureCategory,
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
