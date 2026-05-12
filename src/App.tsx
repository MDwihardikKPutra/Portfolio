import { useLocation, Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppContext } from "./context/AppContext";

// Components & Pages
import { Home } from "./pages/Home/Home";
import { Experimental } from "./pages/Experimental/Experimental";
import VisualArchive from "./pages/Gallery/VisualArchive";
import ProjectsPage from "./pages/Projects/ProjectsPage";
import Exp from "./pages/Exp/Exp";
import { MainLayout } from "./components/Layout/MainLayout";
import { preloadAll } from "./utils/preloadImages";

import "./index.css";

const AppRoutes = () => {
  const { t } = useAppContext();
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
                  <Routes>
                    <Route path="/home" element={<Home setActiveTab={handleSetActiveTab} />} />
                    <Route path="/visual-archive" element={<VisualArchive />} />
                    <Route path="/projects" element={<ProjectsPage />} />
                    <Route path="/experimental" element={<Experimental />} />
                    <Route path="/exp" element={<Exp />} />
                    <Route path="*" element={<Home setActiveTab={handleSetActiveTab} />} />
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
  useEffect(() => {
    // Run preloading in background without blocking the UI
    preloadAll();
  }, []);

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
