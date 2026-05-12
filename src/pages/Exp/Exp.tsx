import { memo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ParticleField } from "../../components/Visuals/ParticleField";
import { ConstellationBg } from "../../components/Visuals/ConstellationBg";

const Exp = memo(() => {
  const [activeView, setActiveView] = useState<"galaxy" | "constellation">("galaxy");

  return (
    <div className="relative w-full min-h-screen bg-black overflow-hidden">
      
      {/* BACKGROUND & CONTENT LAYER */}
      <AnimatePresence mode="wait">
        {activeView === "galaxy" ? (
          <motion.div 
            key="galaxy-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 z-10 flex items-center justify-center"
          >
            <div className="w-full h-full">
              <ParticleField />
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="constellation-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 z-10"
          >
            <ConstellationBg pages={1} showLabels={true} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Minimal Header Overlay */}
      <div className="absolute top-24 md:top-32 left-6 md:left-12 z-30 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex flex-col items-start gap-4 pointer-events-auto">
            <button 
              onClick={() => setActiveView("galaxy")}
              className={`text-[10px] uppercase tracking-[0.3em] transition-all duration-300 text-left ${
                activeView === "galaxy" ? "text-white" : "text-white/40 hover:text-white"
              }`}
            >
              Galaxy
            </button>
            <button 
              onClick={() => setActiveView("constellation")}
              className={`text-[10px] uppercase tracking-[0.2em] transition-all duration-300 text-left ${
                activeView === "constellation" ? "text-white" : "text-white/40 hover:text-white"
              }`}
            >
              Constellation
            </button>
          </div>
        </motion.div>
      </div>

    </div>
  );
});

export default Exp;
