import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import type { Translations } from "../../translations";

interface NavigationColumnProps {
  t: Translations;
  isDarkMode: boolean;
}

export const NavigationColumn = ({ t, isDarkMode }: NavigationColumnProps) => {
  const location = useLocation();
  const textColor = isDarkMode ? "text-[#f5f5f5]" : "text-[#1a1a1a]";
  const [activeSection, setActiveSection] = useState<string>("/");

  const navItems = [
    { path: "/", text: "Home", sectionId: "home" },
    { path: "/work", text: t.work, sectionId: "work" },
    { path: "/contact", text: t.contact, sectionId: "contact" },
  ];

  useEffect(() => {
    // Set active section based on current route
    const currentPath = location.pathname;
    setActiveSection(currentPath);
  }, [location]);

  return (
    <>
      {/* Mobile Navigation - Bottom Bar */}
      <div 
        className={`fixed bottom-0 left-0 right-0 z-50 flex md:hidden justify-center items-center pb-4 pt-2 ${
          isDarkMode ? "bg-[#0a0a0a]/80 backdrop-blur-sm" : "bg-white/80 backdrop-blur-sm"
        }`}
      >
        <div className="flex flex-row items-center gap-2 overflow-x-auto max-w-full px-2 scrollbar-hide">
          {navItems.map((item) => {
            const isActive = activeSection === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`text-[10px] font-normal text-center inline-block whitespace-nowrap`}
                style={{
                  textDecoration: "none",
                  color: isActive
                    ? isDarkMode
                      ? "#1a1a1a"
                      : "#f5f5f5"
                    : isDarkMode
                    ? "#f5f5f5"
                    : "#1a1a1a",
                  backgroundColor: isActive
                    ? isDarkMode
                      ? "#f5f5f5"
                      : "#1a1a1a"
                    : "transparent",
                  padding: "6px 10px",
                  borderRadius: "4px",
                  transition: "all 0.3s ease",
                }}
              >
                {item.text}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Desktop Navigation */}
      <div 
        className={`fixed bottom-0 left-0 right-0 z-50 hidden md:flex justify-center items-center pb-8 pt-4`}
        style={{
          backgroundColor: "transparent",
        }}
      >
        <div className="flex flex-row items-center gap-3 md:gap-4">
        {navItems.map((item) => {
          const isActive = activeSection === item.path;
          return (
            <motion.div
              key={item.path}
              whileHover={!isActive ? { 
                scale: 1.1,
              } : {}}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                to={item.path}
                className={`text-xs md:text-sm font-normal text-center inline-block transition-all duration-300 ${
                  !isActive ? "hover:scale-110 hover:opacity-80" : ""
                }`}
                style={{
                  textDecoration: "none",
                  color: isActive
                    ? isDarkMode
                      ? "#1a1a1a"
                      : "#f5f5f5"
                    : isDarkMode
                    ? "#f5f5f5"
                    : "#1a1a1a",
                  backgroundColor: isActive
                    ? isDarkMode
                      ? "#f5f5f5"
                      : "#1a1a1a"
                    : "transparent",
                  padding: "4px 8px",
                  borderRadius: "4px",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  display: "inline-block",
                }}
              >
                {item.text}
              </Link>
            </motion.div>
          );
        })}
      </div>
      </div>
    </>
  );
};