import { motion } from "framer-motion";
import type { Translations } from "../../translations";

interface NavbarProps {
  t: Translations;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  toggleDarkMode?: () => void;
  isDarkMode?: boolean;
}

export const Navbar = ({ t, activeTab }: NavbarProps) => {
  const navItems = [
    { id: "home", label: t.about },
    { id: "work", label: t.work },
    { id: "gallery", label: t.gallery },
    { id: "contact", label: t.contact },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-white h-16 flex items-center justify-center px-6">
      <div className="flex items-center gap-10 md:gap-16">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className={`text-[10px] uppercase font-black tracking-[0.3em] transition-all relative py-2 ${
              activeTab === item.id ? "text-black" : "text-black/20 hover:text-black"
            }`}
          >
            {item.label}
            {activeTab === item.id && (
              <motion.div 
                layoutId="nav-active-indicator"
                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-black"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>
    </nav>
  );
};
