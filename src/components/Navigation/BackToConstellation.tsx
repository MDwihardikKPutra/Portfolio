import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export const BackToConstellation = ({ isDark = false }: { isDark?: boolean }) => {
  const navigate = useNavigate();
  
  return (
    <div className="absolute top-12 left-8 md:left-20 lg:left-32 z-[150] pointer-events-auto">
      <motion.button 
        onClick={() => navigate("/manifesto")}
        whileHover="hover"
        className={`flex items-center gap-6 group relative ${
          isDark ? 'text-white' : 'text-black'
        }`}
      >
        {/* MINI ROTATING CUBE */}
        <div className="mini-cube-container">
          <div className={`mini-cube ${isDark ? 'is-dark' : ''}`}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>

        {/* Clean Text with Expansion & Hidden Reveal */}
        <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] opacity-0 -translate-x-4 group-hover:opacity-60 group-hover:translate-x-0 transition-all duration-700 pointer-events-none">
          Back to Constellation
        </span>
      </motion.button>
    </div>
  );
};
