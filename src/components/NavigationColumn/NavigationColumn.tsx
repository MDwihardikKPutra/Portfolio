import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import type { Translations } from "../../translations";

interface NavigationColumnProps {
  t: Translations;
  isDarkMode: boolean;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const NavigationColumn = ({ t, isDarkMode, activeTab, setActiveTab }: NavigationColumnProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { text: "Home", sectionId: "home" },
    { text: t.experience, sectionId: "experience" },
    { text: t.selectedWork, sectionId: "projects" },
    { text: t.gallery, sectionId: "gallery" },
    { text: t.contact, sectionId: "contact" },
  ];

  const isDeepLink = location.pathname.startsWith("/essay/") || location.pathname === "/projects/data-analyst";

  const handleTabClick = (sectionId: string) => {
    if (isDeepLink) {
      navigate("/home");
    }
    setActiveTab(sectionId);
  };

  return (
    <>
      {/* ── Desktop Sidebar Container ── */}
      <aside className="hidden md:flex flex-col justify-center items-stretch w-[140px] bg-[#111111] h-full">
        {/* ── Tab Items ── */}
        <div className="flex flex-col justify-center h-full">
          {navItems.map((item) => {
            const isActive = activeTab === item.sectionId;

            return (
              <button
                key={item.sectionId}
                onClick={() => handleTabClick(item.sectionId)}
                className={`relative text-left px-5 py-4 w-full cursor-pointer transition-colors duration-200 ${isActive
                  ? (isDarkMode ? "text-white" : "text-black")
                  : (isDarkMode ? "text-neutral-600 hover:text-neutral-400" : "text-neutral-400 hover:text-neutral-600")
                  }`}
              >
                {/* Sliding active background */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      layoutId="tab-active-bg"
                      className={`absolute inset-0 z-[-1] ${isDarkMode
                        ? "bg-white/[0.04]"
                        : "bg-black/[0.03]"
                        }`}
                      initial={false}
                      transition={{ type: "spring", stiffness: 400, damping: 35 }}
                    />
                  )}
                </AnimatePresence>

                {/* Active left accent line */}
                {isActive && (
                  <motion.div
                    layoutId="tab-accent"
                    className={`absolute left-0 top-1/4 bottom-1/4 w-[2px] rounded-full ${isDarkMode ? "bg-white" : "bg-black"
                      }`}
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  />
                )}

                <span className={`relative z-10 text-[11px] tracking-[0.15em] uppercase ${isActive ? "font-semibold" : "font-normal"
                  }`}>
                  {item.text}
                </span>
              </button>
            );
          })}
        </div>
      </aside>

      {/* ── Mobile Bottom Nav ── */}
      <nav
        className={`md:hidden fixed bottom-0 left-0 right-0 z-50 flex items-center justify-evenly px-4 py-3 border-t backdrop-blur-xl transition-colors duration-300 ${isDarkMode
          ? "bg-[#0a0a0a]/80 border-white/5"
          : "bg-white/80 border-black/5"
          }`}
      >
        {navItems.map((item) => {
          const isActive = activeTab === item.sectionId;
          return (
            <button
              key={item.sectionId}
              onClick={() => handleTabClick(item.sectionId)}
              className={`text-[10px] tracking-wider uppercase transition-colors duration-200 flex flex-col items-center gap-1 ${isActive
                ? (isDarkMode ? "text-white font-bold" : "text-black font-bold")
                : (isDarkMode ? "text-gray-500 hover:text-white" : "text-gray-400 hover:text-black")
                }`}
            >
              <div className={`w-1 h-1 rounded-full transition-colors duration-200 ${isActive ? (isDarkMode ? "bg-white" : "bg-black") : "bg-transparent"
                }`} />
              {item.text}
            </button>
          );
        })}
      </nav>
    </>
  );
};
