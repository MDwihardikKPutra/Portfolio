import { memo, useEffect } from "react";
import { ParticleField } from "../../components/Visuals/ParticleField";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { BackToConstellation } from "../../components/Navigation/BackToConstellation";

export const Galaxy = memo(({ isStandalone = true }: { isStandalone?: boolean }) => {
  const navigate = useNavigate();
  useEffect(() => {
    // Page navigation removed for Infinite Loop request
  }, [navigate]);

  // Escape key to go back safely
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") navigate("/manifesto");
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [navigate]);

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden cursor-crosshair font-outfit">
      
      {/* 1. INITIAL FADE-FROM-BLACK OVERLAY */}
      <motion.div 
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 2.5, ease: "easeInOut" }}
        className="absolute inset-0 z-50 bg-black pointer-events-none"
      />

      {/* The 3D Visual */}
      <div className="absolute inset-0 z-0">
        <ParticleField />
      </div>

      {/* Standalone UI Layer */}
      {isStandalone && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <BackToConstellation isDark={true} />
        </motion.div>
      )}
    </div>
  );
});

Galaxy.displayName = "Galaxy";
