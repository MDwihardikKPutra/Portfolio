import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDarkMode } from "./hooks/useDarkMode";
import { useLanguage } from "./hooks/useLanguage";
import { translations } from "./translations";
import { MainLayout } from "./components/Layout/MainLayout";
import { Home } from "./pages/Home/Home";
import { ProjectsPage } from "./pages/ProjectsPage/ProjectsPage";
import { Contact } from "./pages/Contact/Contact";
import { Gallery } from "./pages/Gallery/Gallery";
import { EssayDetail } from "./pages/Essay/EssayDetail";
import { Landing } from "./pages/Landing/Landing";
import { DataAnalystProjectPage } from "./pages/ProjectDetailPage/DataAnalystProjectPage";
import { preloadGalleryImages, preloadHomeImages } from "./utils/preloadImages";

/**
 * Renders all sections in a vertical stack for a single-page experience.
 */
const SinglePageContent = ({ t, language }: { t: any; language: string }) => {
  return (
    <div id="main-snap-container" className="snap-container">
      <Home t={t} />
      <ProjectsPage t={t} language={language} />
      <Gallery t={t} isDarkMode={false} />
      <Contact t={t} isDarkMode={false} />
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
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.3, ease: "easeIn" },
    },
  };

  // Check if we're on a deep-linked route (essay detail, project detail)
  const isDeepLink = location.pathname.startsWith("/essay/") || location.pathname === "/projects/data-analyst";

  // Scroll Spy logic to update activeTab in Navbar
  useEffect(() => {
    if (isDeepLink) return;

    const handleScrollSpy = () => {
      const observerOptions = {
        root: document.getElementById("main-snap-container"),
        threshold: 0.5,
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveTab(entry.target.id);
          }
        });
      }, observerOptions);

      ["home", "work", "gallery", "contact"].forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });

      return () => observer.disconnect();
    };

    return handleScrollSpy();
  }, [isDeepLink]);

  return (
    <div className="bg-white">
      <AnimatePresence mode="wait" initial={location.pathname === "/"}>
        <motion.div
          key={location.pathname === "/" ? "landing" : "main"}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="min-h-screen w-full flex flex-col"
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
                    <SinglePageContent
                      t={t}
                      language={language}
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
