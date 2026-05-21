import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";

export const Navbar = ({ activeTab, setActiveTab }: any) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { id: "home", label: "Home" },
    { id: "projects", label: "Projects" },
    { id: "visual-archive", label: "Visual Archive" },
    { id: "exp", label: "Exp" },
  ];

  // Determine which tab is actually active based on route
  const currentActiveTab = location.pathname === "/projects"
    ? "projects"
    : location.pathname === "/visual-archive" 
      ? "visual-archive" 
      : location.pathname === "/exp" 
        ? "exp" 
        : activeTab;

  const handleNav = (id: string) => {
    if (id === "projects") {
      navigate("/projects");
      return;
    }

    if (id === "visual-archive") {
      navigate("/visual-archive");
      return;
    }

    if (id === "exp") {
      navigate("/exp");
      return;
    }
    
    if (location.pathname !== "/home" && location.pathname !== "/") {
      navigate("/home");
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 500);
      return;
    }

    if (setActiveTab) setActiveTab(id); 
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isJournalPage = location.pathname.startsWith("/journal");

  return (
    <nav className="fixed top-0 left-0 w-full z-[200] pointer-events-none">
      <div className={`w-full transition-all duration-500 py-4 ${
        isJournalPage 
          ? "bg-white border-b border-neutral-100" 
          : "bg-black"
      }`}>
        <div className="w-full px-6 md:px-10 flex items-center justify-between pointer-events-auto">
          
          <div className="flex items-center">
            <span className={`text-[12px] md:text-[14px] font-medium tracking-tight font-helvetica transition-colors duration-500 ${
              isJournalPage 
                ? "text-black" 
                : "text-white"
            }`}>
              M. Dwihardik
            </span>
          </div>
          
          <div className="flex items-center gap-4 md:gap-10">
             {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`transition-all text-[11px] font-medium tracking-tight font-helvetica relative pb-1 duration-500 ${
                    isJournalPage
                      ? "text-black"
                      : "text-white"
                  }`}
                >
                  {item.label}
                  {currentActiveTab === item.id && (
                    <motion.div 
                      layoutId="activeTabIndicator"
                      className={`absolute bottom-0 left-0 right-0 h-[1.5px] transition-colors duration-500 ${
                        isJournalPage 
                          ? "bg-black" 
                          : "bg-white"
                      }`}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
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
