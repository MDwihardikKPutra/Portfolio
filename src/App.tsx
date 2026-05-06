import { useNavigate, useLocation, Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDarkMode } from "./hooks/useDarkMode";
import { useLanguage } from "./hooks/useLanguage";
import { translations } from "./translations";

// Components & Pages
import { Landing } from "./pages/Landing/Landing";
import { Home } from "./pages/Home/Home";
import { Projects } from "./pages/Projects/Projects";
import { Gallery } from "./pages/Gallery/Gallery";
import { Contact } from "./pages/Contact/Contact";
import { ProjectDetail } from "./pages/ProjectDetail/ProjectDetail";
import { Manifesto } from "./pages/Manifesto/Manifesto";
import { Galaxy } from "./pages/Galaxy/Galaxy";
import { Experimental } from "./pages/Experimental/Experimental";
import { MainLayout } from "./components/Layout/MainLayout";
import { preloadAll } from "./utils/preloadImages";

import "./index.css";

const AppRoutes = ({
  t,
  isDarkMode,
  language,
  toggleDarkMode,
  toggleLanguage,
}: {
  t: any;
  isDarkMode: boolean;
  language: string;
  toggleDarkMode: () => void;
  toggleLanguage: () => void;
}) => {
  const [activeTab, setActiveTab] = useState("home");
  const handleSetActiveTab = useCallback((tab: string) => {
    setActiveTab(tab);
  }, []);
  const location = useLocation();

  const pageVariants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <div className="bg-white min-h-screen selection:bg-black selection:text-white">
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="w-full flex flex-col"
        >
          <Routes location={location}>
            <Route
              path="/"
              element={<Navigate to="/home" replace />}
            />
            <Route
              path="/projects/data-analyst"
              element={<ProjectDetail t={t} isDarkMode={isDarkMode} />}
            />
            <Route
              path="/*"
              element={
                <MainLayout
                  t={t}
                  isDarkMode={isDarkMode}
                  toggleDarkMode={toggleDarkMode}
                  toggleLanguage={toggleLanguage}
                  language={language}
                  activeTab={activeTab}
                  setActiveTab={handleSetActiveTab}
                >
                   <Routes>
                      <Route path="/home" element={<Home t={t} setActiveTab={handleSetActiveTab} />} />
                      <Route path="/experimental" element={<Experimental />} />
                      <Route path="*" element={<Home t={t} setActiveTab={handleSetActiveTab} />} />
                   </Routes>
                </MainLayout>
              }
            />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

function App() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const { language, toggleLanguage } = useLanguage();
  const t = translations[language];

  useEffect(() => {
    preloadAll();
  }, []);

  return (
    <BrowserRouter>
      <AppRoutes t={t} isDarkMode={isDarkMode} language={language} toggleDarkMode={toggleDarkMode} toggleLanguage={toggleLanguage} />
    </BrowserRouter>
  );
}

export default App;
