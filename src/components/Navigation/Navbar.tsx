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
    { id: "about", label: "01. About" },
    { id: "manifesto", label: "02. Core" },
    { id: "experimental", label: "03. Galaxy" },
    { id: "projects", label: "04. Works" },
    { id: "gallery", label: "05. Archive" },
    { id: "contact", label: "06. Connect" },
  ];

  // Update active tab based on route
  useEffect(() => {
    const currentPath = location.pathname.replace("/", "");
    const matched = navItems.find(item => 
      item.id === currentPath || (currentPath === "galaxy" && item.id === "experimental")
    );
    if (matched) setActiveTab(matched.id);
    else if (location.pathname === "/about") setActiveTab("about");
  }, [location, setActiveTab]);

  const handleNav = (id: string) => {
    setActiveTab(id); 
    if (id === "experimental") {
      navigate("/galaxy");
    } else {
      navigate(`/${id}`);
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-[200] pointer-events-none">
      <div className="w-full bg-white/80 backdrop-blur-md border-b border-black/[0.03] pt-8 pb-6 swiss-px">
        <div className="max-w-[1800px] mx-auto flex items-end justify-between">
          
          <div className="flex flex-col pointer-events-auto">
            <span className="text-[10px] font-black tracking-[0.2em] text-black">Mdw.</span>
            <span className="text-[8px] font-bold text-black/20 mt-1 uppercase">Portfolio / 2026</span>
          </div>
          
          <div className="flex flex-col gap-4 items-end pointer-events-auto max-w-[60%] w-full">
             <div className="flex items-center gap-8 md:gap-14 pr-1">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNav(item.id)}
                    className={`transition-all text-[10px] font-bold tracking-tight relative whitespace-nowrap ${
                      activeTab === item.id ? "text-black" : "text-black/30 hover:text-black/60"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
             </div>

             <div className="w-full h-[1px] bg-black/5 relative mt-1">
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
             </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
