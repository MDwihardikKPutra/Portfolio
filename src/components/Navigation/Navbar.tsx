import { motion } from "framer-motion";
import type { Translations } from "../../translations";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface NavbarProps {
  t: Translations;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  toggleDarkMode?: () => void;
  isDarkMode?: boolean;
}

export const Navbar = ({ activeTab, setActiveTab }: NavbarProps) => {
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { id: "home", label: "Home" },
    { id: "manifesto", label: "Profile" },
    { id: "projects", label: "Projects" },
    { id: "gallery", label: "Archive" },
    { id: "contact", label: "Contact" },
    { id: "experimental", label: "Exp. 01" },
  ];

  const handleNav = (id: string) => {
    if (id === "experimental") {
      navigate("/experimental");
      return;
    }
    
    // If we are not on the home page, go to home first then scroll
    if (location.pathname !== "/home" && location.pathname !== "/") {
      navigate("/home");
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }

    setActiveTab(id); 
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isDarkSection = (activeTab === "contact" || location.pathname.includes("experimental")) && activeTab !== "home";

  return (
    <nav className="fixed top-0 left-0 w-full z-[200] pointer-events-none">
      <div className={`w-full transition-all duration-300 py-4 swiss-px ${
        isDarkSection ? "bg-black/80 backdrop-blur-md border-b border-white/[0.05]" : "bg-white/80 backdrop-blur-md border-b border-black/[0.03]"
      }`}>
        <div className="max-w-[1800px] mx-auto flex items-center justify-between">
          
          <div className="flex items-center gap-4 pointer-events-auto">
            {/* Spinning Wireframe Cube */}
            <div className="w-[18px] h-[18px] perspective-[1000px]">
              <div className="w-full h-full relative preserve-3d animate-cube">
                {/* Cube Faces (Wireframe) */}
                {[...Array(6)].map((_, i) => (
                  <div 
                    key={i}
                    className={`absolute inset-0 border transition-colors duration-500 ${isDarkSection ? "border-white/40" : "border-black/40"}`}
                    style={{
                      transform: i === 0 ? "translateZ(9px)" :
                                 i === 1 ? "translateZ(-9px)" :
                                 i === 2 ? "rotateY(90deg) translateZ(9px)" :
                                 i === 3 ? "rotateY(-90deg) translateZ(9px)" :
                                 i === 4 ? "rotateX(90deg) translateZ(9px)" :
                                           "rotateX(-90deg) translateZ(9px)"
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-8 md:gap-12 pointer-events-auto">
             {navItems.map((item) => (
               <button
                 key={item.id}
                 onClick={() => handleNav(item.id)}
                 className={`transition-all text-[10px] font-bold tracking-tight relative whitespace-nowrap duration-500 ${
                   isDarkSection 
                    ? (activeTab === item.id ? "text-white" : "text-white/30 hover:text-white/60")
                    : (activeTab === item.id ? "text-black" : "text-black/30 hover:text-black/60")
                 }`}
               >
                 {item.label}
                 {activeTab === item.id && (
                   <motion.div 
                     layoutId="activeTab"
                     className={`absolute -bottom-1 left-0 right-0 h-[1.5px] transition-colors duration-500 ${isDarkSection ? "bg-white" : "bg-black"}`}
                   />
                 )}
               </button>
             ))}
          </div>
        </div>
      </div>
    </nav>
  );
};
