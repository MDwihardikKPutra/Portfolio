import { useNavigate, useLocation, Routes, Route, BrowserRouter } from "react-router-dom";
import { useEffect, useState } from "react";
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
  const location = useLocation();

  const pageVariants = {
    initial: {
      opacity: 0,
      scale: 0.98,
    },
    animate: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      scale: 1.02,
      transition: { duration: 0.3, ease: "easeIn" },
    },
  };

  return (
    <div className="bg-black min-h-screen">
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
              element={<Landing t={t} isDarkMode={isDarkMode} />}
            />
            <Route
              path="/galaxy"
              element={<Galaxy isStandalone />}
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
                  setActiveTab={setActiveTab}
                >
                   <Routes>
                      <Route path="/about" element={<Home t={t} />} />
                      <Route path="/manifesto" element={<Manifesto t={t} />} />
                      <Route path="/projects" element={<Projects t={t} language={language} />} />
                      <Route path="/gallery" element={<Gallery t={t} isDarkMode={false} />} />
                      <Route path="/contact" element={<Contact t={t} isDarkMode={false} />} />
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
