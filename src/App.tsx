import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState, useRef, memo } from "react";
import { useDarkMode } from "./hooks/useDarkMode";
import { useLanguage } from "./hooks/useLanguage";
import { translations } from "./translations";
import { MainLayout } from "./components/Layout/MainLayout";
import { Home } from "./pages/Home/Home";
import { Projects } from "./pages/Projects/Projects";
import { Contact } from "./pages/Contact/Contact";
import { Gallery } from "./pages/Gallery/Gallery";
import { Landing } from "./pages/Landing/Landing";
import { ProjectDetail } from "./pages/ProjectDetail/ProjectDetail";
import { Manifesto } from "./pages/Manifesto/Manifesto";
import { preloadGalleryImages, preloadHomeImages } from "./utils/preloadImages";

/**
 * Renders all sections in a vertical stack for a single-page experience.
 */
const SinglePageContent = memo(({ t, language }: { t: any; language: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let isTicking = false;
    let snapTimeout: NodeJS.Timeout;

    const handleNativeWheel = (e: WheelEvent) => {
      // 1. Logic Check - Prioritize Horizontal Native
      const isHorizontalSwipe = Math.abs(e.deltaX) > Math.abs(e.deltaY);
      if (isHorizontalSwipe) return;

      e.preventDefault();

      // 2. State Management - Disable snapping during active movement to prevent layout fighting
      if (container.style.scrollSnapType !== 'none') {
        container.style.scrollSnapType = 'none';
      }

      // 3. Execution - Throttled Frame Sync (O(1) frame scheduling)
      if (!isTicking) {
        requestAnimationFrame(() => {
          container.scrollBy({ left: e.deltaY, behavior: "auto" });
          isTicking = false;
        });
        isTicking = true;
      }

      // 4. Persistence - Re-engage Snap (Mathematical Precision Lock)
      clearTimeout(snapTimeout);
      snapTimeout = setTimeout(() => {
        container.style.scrollSnapType = 'x mandatory';
      }, 100); // 100ms is the sweet spot for natural friction
    };

    container.addEventListener("wheel", handleNativeWheel, { passive: false });
    return () => {
      container.removeEventListener("wheel", handleNativeWheel);
      clearTimeout(snapTimeout);
    };
  }, []);

  return (
    <div 
      id="main-snap-container" 
      ref={containerRef} 
      className="snap-container"
      style={{ willChange: "transform, scroll-position" }}
    >
      <Home t={t} />
      <Manifesto t={t} />
      <Projects t={t} language={language} />
      <Gallery t={t} isDarkMode={false} />
      <Contact t={t} isDarkMode={false} />
    </div>
  );
});

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

  // Check if we're on a deep-linked route (project detail)
  const isDeepLink = location.pathname === "/projects/data-analyst";

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

      ["home", "manifesto", "work", "gallery", "contact"].forEach((id) => {
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
                        path="/projects/data-analyst"
                        element={<ProjectDetail t={t} isDarkMode={isDarkMode} />}
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
