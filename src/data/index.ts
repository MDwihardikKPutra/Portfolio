import type { Language } from "../translations";
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
}

export interface SkillSet {
  category: string;
  items: string[];
}

export const getProjects = (language: Language): Project[] => {
  const t = translations[language];

  return [
    {
      title: "PT Puri Ganesha Engineering",
      category: t.project1Category,
      description: t.project1Desc,
      images: ["/pge-hero.png", "/pge-project.png", "/pge-aboutus.png"],
      tags: ["React", "Full-Stack"],
      link: "https://pg-engineering.com",
      featured: true,
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
    },
    {
      title: "Network Infrastructure",
      category: t.project3Category,
      description: t.project3Desc,
      image:
        "https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["Linux", "Network"],
      link: "#",
      featured: true,
    },
  ];
};

export interface SocialLink {
  name: string;
  url: string;
  icon: "github" | "linkedin" | "medium";
}

export const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    url: "https://github.com/ddiko105",
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

export const getSkills = (language: Language): SkillSet[] => {
  const t = translations[language];

  return [
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
};
