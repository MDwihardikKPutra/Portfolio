import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import type { Translations } from "../../translations";

interface NavigationColumnProps {
  t: Translations;
  isDarkMode: boolean;
}

export const NavigationColumn = ({ t, isDarkMode }: NavigationColumnProps) => {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState<string>("/");

  const navItems = [
    { path: "/home", text: "Home", sectionId: "home" },
    { path: "/work", text: t.work, sectionId: "work" },
    { path: "/gallery", text: t.gallery, sectionId: "gallery" },
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
                className={`text-[10px] font-normal text-center inline-block whitespace-nowrap transition-all duration-300 ${
                  isActive
                    ? isDarkMode
                      ? "text-[#1a1a1a] bg-[#f5f5f5]"
                      : "text-[#f5f5f5] bg-[#1a1a1a]"
                    : isDarkMode
                    ? "text-[#f5f5f5] hover:bg-[#1a1a1a]"
                    : "text-[#1a1a1a] hover:bg-[#f5f5f5]"
                }`}
                style={{
                  textDecoration: "none",
                  padding: "6px 10px",
                  borderRadius: "4px",
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
      >
        <div className="flex flex-row items-center gap-3 md:gap-4">
          {navItems.map((item) => {
            const isActive = activeSection === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`text-xs md:text-sm font-normal text-center inline-block transition-all duration-300 ${
                  isActive
                    ? isDarkMode
                      ? "text-[#1a1a1a] bg-[#f5f5f5]"
                      : "text-[#f5f5f5] bg-[#1a1a1a]"
                    : isDarkMode
                    ? "text-[#f5f5f5] hover:opacity-70"
                    : "text-[#1a1a1a] hover:opacity-70"
                }`}
                style={{
                  textDecoration: "none",
                  padding: "4px 8px",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                {item.text}
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};
