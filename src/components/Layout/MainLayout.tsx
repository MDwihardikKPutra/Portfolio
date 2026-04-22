import { ReactNode } from "react";
import { Navbar } from "../Navigation/Navbar";
import { CustomCursor } from "../Shared/CustomCursor";
import { socialLinks } from "../../data";
import type { Translations } from "../../translations";
import { motion } from "framer-motion";
import { Github, Linkedin } from "lucide-react";

const MediumIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
  </svg>
);

const iconMap: Record<string, React.ReactNode> = {
  GitHub: <Github size={14} strokeWidth={2.5} />,
  LinkedIn: <Linkedin size={14} strokeWidth={2.5} />,
  Medium: <MediumIcon size={14} />,
};

interface MainLayoutProps {
  children: ReactNode;
  t: Translations;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  toggleLanguage: () => void;
  language: string;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const MainLayout = ({
  children,
  t,
  activeTab,
  setActiveTab,
}: MainLayoutProps) => {

  return (
    <div className="w-full bg-white text-black relative">

      {/* Cinematic Bokeh Effect */}
      <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-black/[0.015] blur-[100px]"
            style={{ willChange: "transform" }}
            initial={{
              width: Math.random() * 400 + 300,
              height: Math.random() * 400 + 300,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0
            }}
            animate={{
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, 0],
              opacity: [0.03, 0.08, 0.03],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: Math.random() * 20 + 20,
              repeat: Infinity,
              ease: "linear",
              delay: i * 5,
            }}
          />
        ))}
      </div>

      {/* Main Content Area */}
      <main className="flex-1 w-full h-full relative z-10">
        {children}
      </main>

    </div>
  );
};
