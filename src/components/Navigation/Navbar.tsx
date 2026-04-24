import { motion } from "framer-motion";
import type { Translations } from "../../translations";
import { useEffect, useState } from "react";

interface NavbarProps {
  t: Translations;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  toggleDarkMode?: () => void;
  isDarkMode?: boolean;
}

export const Navbar = ({ activeTab, setActiveTab }: NavbarProps) => {
  const [progress, setProgress] = useState(0);

  const navItems = [
    { id: "home", label: "01. Head" },
    { id: "manifesto", label: "02. Core" },
    { id: "projects", label: "03. Works" },
    { id: "gallery", label: "04. Archive" },
    { id: "contact", label: "05. Connect" },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    const container = document.getElementById("main-snap-container");

    setActiveTab(id); 

    if (element && container) {
      container.scrollTo({
        left: element.offsetLeft,
        behavior: "smooth"
      });
    } else if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const container = document.getElementById("main-snap-container");
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const maxScroll = container.scrollWidth - container.clientWidth;
      setProgress(maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full z-[200] pointer-events-none">
      {/* Editorial Header Bar */}
      <div className="w-full bg-white/80 backdrop-blur-md border-b border-black/[0.03] pt-8 pb-6 swiss-px">
        <div className="max-w-[1800px] mx-auto flex items-end justify-between">
          
          {/* Left: Brand Monogram */}
          <div className="flex flex-col pointer-events-auto">
            <span className="text-[10px] font-black tracking-[0.2em] text-black">Mdw.</span>
            <span className="text-[8px] font-bold text-black/20 mt-1 uppercase">Portfolio / 2026</span>
          </div>
          
          {/* Right: Integrated Timeline Nav */}
          <div className="flex flex-col gap-4 items-end pointer-events-auto max-w-[60%] w-full">
             
             {/* Chapters Names */}
             <div className="flex items-center gap-8 md:gap-14 pr-1">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`transition-all text-[10px] font-bold tracking-tight relative whitespace-nowrap ${
                      activeTab === item.id ? "text-black" : "text-black/30 hover:text-black/60"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
             </div>

             {/* Dynamic Progress Track - Perfectly Aligned with Buttons Above */}
             <div className="w-full h-[1px] bg-black/5 relative mt-1">
                {/* Visual Anchors (Dots) positioned relatively within the same flex logic */}
                <div className="absolute inset-0 flex justify-between items-center px-[2px]">
                   {navItems.map((item) => (
                      <div 
                        key={`dot-${item.id}`}
                        className={`w-[4px] h-[4px] rounded-full transition-all duration-500 ${
                          activeTab === item.id ? 'bg-black scale-110' : 'bg-black/10 scale-90'
                        }`}
                      />
                   ))}
                </div>

                {/* Progress Bar Mapping */}
                <motion.div 
                  className="absolute top-0 left-0 h-full bg-black origin-left"
                  style={{ width: `${progress}%` }}
                  transition={{ type: "spring", stiffness: 100, damping: 20 }}
                />
             </div>

          </div>

        </div>

        </div>
      </div>
    </nav>
  );
};
