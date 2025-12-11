import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useDarkMode } from "./hooks/useDarkMode";
import { useLanguage } from "./hooks/useLanguage";
import { translations } from "./translations";
import { MainLayout } from "./components/Layout/MainLayout";
import { Home } from "./pages/Home/Home";
import { Work } from "./pages/Work/Work";
import { Contact } from "./pages/Contact/Contact";

const AnimatedRoutes = ({
  t,
  isDarkMode,
  language,
}: {
  t: any;
  isDarkMode: boolean;
  language: string;
}) => {
  const location = useLocation();

  const pageVariants = {
    initial: {
      opacity: 0,
      scale: 0.95,
      y: 50,
      rotateX: -10,
      filter: "blur(20px)",
    },
    animate: {
      opacity: 1,
      scale: 1,
      y: 0,
      rotateX: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.6,
        ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number],
        filter: {
          duration: 0.4,
          ease: "easeOut",
        },
        rotateX: {
          duration: 0.5,
          ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number],
        },
      },
    },
    exit: {
      opacity: 0,
      scale: 1.05,
      y: -50,
      rotateX: 10,
      filter: "blur(20px)",
      transition: {
        duration: 0.5,
        ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number],
        filter: {
          duration: 0.3,
          ease: "easeIn",
        },
        rotateX: {
          duration: 0.4,
          ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number],
        },
      },
    },
  };

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        style={{
          transformStyle: "preserve-3d",
          perspective: "1000px",
        }}
        className="h-full w-full origin-center overflow-hidden"
      >
        <Routes location={location}>
          <Route path="/" element={<Home t={t} isDarkMode={isDarkMode} />} />
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
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

function App() {
  const { isDarkMode } = useDarkMode();
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <BrowserRouter>
      <MainLayout t={t} isDarkMode={isDarkMode}>
        <AnimatedRoutes t={t} isDarkMode={isDarkMode} language={language} />
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
