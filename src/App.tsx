import { useLocation, Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { useEffect, useState, useCallback, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppContext } from "./context/AppContext";

// Components & Pages (Lazy loaded for high performance bundle splitting)
const Home = lazy(() => import("./pages/Home/Home").then(m => ({ default: m.Home })));
const VisualArchive = lazy(() => import("./pages/Gallery/VisualArchive"));
const ProjectsPage = lazy(() => import("./pages/Projects/ProjectsPage"));
const Exp = lazy(() => import("./pages/Exp/Exp"));
const IoTKeyManagement = lazy(() => import("./pages/Journals/IoTKeyManagement").then(m => ({ default: m.IoTKeyManagement })));

import { MainLayout } from "./components/Layout/MainLayout";
import { preloadAll } from "./utils/preloadImages";

import "./index.css";

const AppRoutes = () => {
  const [activeTab, setActiveTab] = useState("home");
  const handleSetActiveTab = useCallback((tab: string) => {
    setActiveTab(tab);
  }, []);
  const location = useLocation();

  const pageVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { duration: 0.4, ease: "easeInOut" },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.2, ease: "easeInOut" },
    },
  };

  return (
    <div className="min-h-screen selection:bg-accent selection:text-bg-primary">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={location.pathname}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="w-full flex flex-col"
        >
          <Routes location={location}>
            <Route path="/" element={<Navigate to="/home" replace />} />

            <Route
              path="/*"
              element={
                <MainLayout activeTab={activeTab} setActiveTab={handleSetActiveTab}>
                  <Suspense fallback={
                    <div className="w-full min-h-screen bg-white text-neutral-400 flex items-center justify-center font-mono text-[10px] tracking-[0.3em] uppercase">
                      LOADING...
                    </div>
                  }>
                    <Routes>
                      <Route path="/home" element={<Home setActiveTab={handleSetActiveTab} />} />
                      <Route path="/visual-archive" element={<VisualArchive />} />
                      <Route path="/projects" element={<ProjectsPage />} />
                      <Route path="/exp" element={<Exp />} />
                      <Route path="/journal/iot-key-management" element={<IoTKeyManagement />} />
                      <Route path="*" element={<Home setActiveTab={handleSetActiveTab} />} />
                    </Routes>
                  </Suspense>
                </MainLayout>
              }
            />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Delay scroll reset to run after AnimatePresence exit animation (exit duration: 200ms)
    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }, 220);
    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
};

function App() {
  useEffect(() => {
    // Run preloading in background without blocking the UI
    preloadAll();
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
