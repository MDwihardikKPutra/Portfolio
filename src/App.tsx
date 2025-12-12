import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { useDarkMode } from "./hooks/useDarkMode";
import { useLanguage } from "./hooks/useLanguage";
import { translations } from "./translations";
import { MainLayout } from "./components/Layout/MainLayout";
import { Home } from "./pages/Home/Home";
import { Work } from "./pages/Work/Work";
import { Contact } from "./pages/Contact/Contact";
import { Gallery } from "./pages/Gallery/Gallery";
import { Essay } from "./pages/Essay/Essay";
import { EssayDetail } from "./pages/Essay/EssayDetail";
import { Landing } from "./pages/Landing/Landing";
import { preloadGalleryImages, preloadHomeImages } from "./utils/preloadImages";

const AnimatedRoutes = ({
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

  const pageVariants = {
    initial: {
      opacity: 0,
      x: 20,
    },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
    exit: {
      opacity: 0,
      x: -20,
      transition: {
        duration: 0.3,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={`${location.pathname}-${language}`}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="h-full w-full"
      >
        <Routes location={location}>
          <Route path="/home" element={<Home t={t} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} toggleLanguage={toggleLanguage} language={language} />} />
          <Route
            path="/work"
            element={
              <Work t={t} isDarkMode={isDarkMode} language={language} />
            }
          />
          <Route
            path="/contact"
            element={<Contact t={t} isDarkMode={isDarkMode} />}
          />
          <Route
            path="/gallery"
            element={<Gallery t={t} isDarkMode={isDarkMode} />}
          />
          <Route
            path="/essay"
            element={<Essay t={t} isDarkMode={isDarkMode} language={language} />}
          />
          <Route
            path="/essay/:id"
            element={<EssayDetail t={t} isDarkMode={isDarkMode} language={language} />}
          />
        </Routes>
      </motion.div>
    </AnimatePresence>
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

  const pageVariants = {
    initial: {
      opacity: 0,
      x: 20,
    },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
    exit: {
      opacity: 0,
      x: -20,
      transition: {
        duration: 0.3,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  };

  const bgColor = isDarkMode ? "bg-[#0a0a0a]" : "bg-white";

  return (
    <div className={`fixed inset-0 ${bgColor} transition-colors duration-300`}>
      <AnimatePresence mode="wait" initial={location.pathname === "/"}>
        <motion.div
          key={location.pathname}
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
              >
                <AnimatedRoutes t={t} isDarkMode={isDarkMode} language={language} toggleDarkMode={toggleDarkMode} toggleLanguage={toggleLanguage} />
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
