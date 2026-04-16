import { motion } from "framer-motion";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { Translations } from "../../translations";

interface LandingProps {
  t: Translations;
  isDarkMode: boolean;
}

export const Landing = ({ t }: LandingProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Auto redirect after a shorter duration for a snappier feel
    const timer = setTimeout(() => {
      navigate("/home");
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <motion.div 
      className="h-screen w-full bg-white flex flex-col items-center justify-center p-6 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex flex-col items-center">
        <motion.span
          initial={{ opacity: 0, letterSpacing: "1em" }}
          animate={{ opacity: 1, letterSpacing: "0.5em" }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="text-[10px] uppercase font-medium text-black mb-10 block"
        >
          {t.firstName.split(" ")[0]}
        </motion.span>
        
        <div className="overflow-hidden">
          <motion.h1 
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-5xl font-medium tracking-tighter text-black flex flex-col items-center gap-2"
          >
            <span>{t.lastName}</span>
            <span className="serif italic font-light text-black text-xl md:text-2xl opacity-40 uppercase tracking-widest">Portfolio — 2025</span>
          </motion.h1>
        </div>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 100 }}
          transition={{ delay: 0.5, duration: 1, ease: "easeInOut" }}
          className="h-[1px] bg-black mt-8"
        />
      </div>
    </motion.div>
  );
};
