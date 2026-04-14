import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDarkMode } from "./hooks/useDarkMode";
import { useLanguage } from "./hooks/useLanguage";
import { translations } from "./translations";
import { MainLayout } from "./components/Layout/MainLayout";
import { Home } from "./pages/Home/Home";
import { ProjectsPage } from "./pages/ProjectsPage/ProjectsPage";
import { ExperiencePage } from "./pages/ExperiencePage/ExperiencePage";
import { Contact } from "./pages/Contact/Contact";
import { Gallery } from "./pages/Gallery/Gallery";
import { EssayDetail } from "./pages/Essay/EssayDetail";
import { Landing } from "./pages/Landing/Landing";
import { DataAnalystProjectPage } from "./pages/ProjectDetailPage/DataAnalystProjectPage";
import { preloadGalleryImages, preloadHomeImages } from "./utils/preloadImages";

/**
 * Renders the active panel based on the activeTab state.
 * Uses AnimatePresence for smooth fade transitions between panels.
 */
const ActivePanel = ({
  activeTab,
  t,
  isDarkMode,
  language,
  toggleDarkMode,
  toggleLanguage,
}: {
  activeTab: string;
  t: any;
  isDarkMode: boolean;
  language: string;
  toggleDarkMode: () => void;
  toggleLanguage: () => void;
}) => {
  // All panels are rendered simultaneously but only the active one is visible.
  // This ensures everything is preloaded and ready for instant switching.
  const panels = [
    { id: "home", content: <Home t={t} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} toggleLanguage={toggleLanguage} language={language} /> },
    { id: "experience", content: <ExperiencePage t={t} isDarkMode={isDarkMode} language={language} /> },
    { id: "projects", content: <ProjectsPage t={t} isDarkMode={isDarkMode} language={language} /> },
    { id: "gallery", content: <Gallery t={t} isDarkMode={isDarkMode} /> },
    { id: "contact", content: <Contact t={t} isDarkMode={isDarkMode} /> },
  ];

  return (
    <div className="relative h-full w-full">
      {panels.map((panel) => {
        const isActive = activeTab === panel.id;
        return (
          <motion.div
            key={panel.id}
            initial={false}
            animate={{ opacity: isActive ? 1 : 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className={`absolute inset-0 h-full w-full ${isActive ? "z-10 pointer-events-auto" : "z-0 pointer-events-none"}`}
          >
            {panel.content}
          </motion.div>
        );
      })}
    </div>
  );
};

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
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<string>("home");

  const pageVariants = {
    initial: { opacity: 0, x: 20 },
    animate: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    },
    exit: {
      opacity: 0,
      x: -20,
      transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    },
  };

  const bgColor = isDarkMode ? "bg-black" : "bg-white";

  // Check if we're on a deep-linked route (essay detail, project detail)
  const isDeepLink = location.pathname.startsWith("/essay/") || location.pathname === "/projects/data-analyst";

  return (
    <div className={`fixed inset-0 ${bgColor} transition-colors duration-300`}>
      <AnimatePresence mode="wait" initial={location.pathname === "/"}>
        <motion.div
          key={location.pathname === "/" ? "landing" : "main"}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="h-screen h-[100dvh] w-full"
        >
          <Routes location={location}>
            <Route
              path="/"
              element={<Landing t={t} isDarkMode={isDarkMode} />}
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
                  {isDeepLink ? (
                    <Routes>
                      <Route
                        path="/essay/:id"
                        element={<EssayDetail t={t} isDarkMode={isDarkMode} language={language} />}
                      />
                      <Route
                        path="/projects/data-analyst"
                        element={<DataAnalystProjectPage t={t} isDarkMode={isDarkMode} />}
                      />
                    </Routes>
                  ) : (
                    <ActivePanel
                      activeTab={activeTab}
                      t={t}
                      isDarkMode={isDarkMode}
                      language={language}
                      toggleDarkMode={toggleDarkMode}
                      toggleLanguage={toggleLanguage}
                    />
                  )}
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

  // Preload images on app mount
  useEffect(() => {
    preloadGalleryImages();
    preloadHomeImages();
  }, []);

  return (
    <BrowserRouter>
      <AppRoutes t={t} isDarkMode={isDarkMode} language={language} toggleDarkMode={toggleDarkMode} toggleLanguage={toggleLanguage} />
    </BrowserRouter>
  );
}

export default App;
