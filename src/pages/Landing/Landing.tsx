import { motion } from "framer-motion";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { Translations } from "../../translations";

interface LandingProps {
  t: Translations;
  isDarkMode: boolean;
}

export const Landing = ({ t, isDarkMode }: LandingProps) => {
  const navigate = useNavigate();
  const bgColor = isDarkMode ? "bg-[#0a0a0a]" : "bg-white";
  const textColor = isDarkMode ? "text-[#f5f5f5]" : "text-[#1a1a1a]";

  useEffect(() => {
    // Auto redirect to home after 3.5 seconds (exit animation will be handled by AnimatePresence)
    const timer = setTimeout(() => {
      navigate("/home");
    }, 3500);

    return () => {
      clearTimeout(timer);
    };
  }, [navigate]);

  const words = t.thankYouMessage.split(" ");
  // Split into two parts: "Thanks for coming" and "for sure"
  const firstPart = words.slice(0, -2); // "Thanks", "for", "coming"
  const secondPart = words.slice(-2); // "for", "sure"

  return (
    <motion.div 
      className={`h-screen h-[100dvh] ${bgColor} ${textColor} relative overflow-hidden w-full flex flex-col items-center justify-center px-6 md:px-8 lg:px-0`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <h1 className={`text-center mb-8 md:mb-12 w-full px-4 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 md:gap-x-3 md:gap-y-1 lg:gap-x-4 lg:gap-y-2 ${textColor}`}>
        {/* First part: "Thanks for coming" */}
        <motion.span
          className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 md:gap-x-3 md:gap-y-1 lg:gap-x-4 lg:gap-y-2"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            delay: 0.3, 
            duration: 0.8, 
            ease: [0.16, 1, 0.3, 1] 
          }}
        >
          {firstPart.map((word, index) => (
            <span
              key={`first-${index}`}
              className="text-[clamp(1.4rem,6.5vw,2.2rem)] md:text-[clamp(1.75rem,4.5vw,3.5rem)] font-light tracking-[-0.01em] md:tracking-[-0.04em] leading-snug md:leading-none whitespace-nowrap"
            >
              {word}
            </span>
          ))}
        </motion.span>
        
        {/* Second part: "for sure" */}
        <motion.span
          className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 md:gap-x-3 md:gap-y-1 lg:gap-x-4 lg:gap-y-2"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            delay: 1.2, 
            duration: 0.8, 
            ease: [0.16, 1, 0.3, 1] 
          }}
        >
          {secondPart.map((word, index) => {
            const cleanWord = word.replace(/[.,]/g, '');
            const isBold = cleanWord === "for" || cleanWord === "sure";
            return (
              <span
                key={`second-${index}`}
                className={`text-[clamp(1.4rem,6.5vw,2.2rem)] md:text-[clamp(1.75rem,4.5vw,3.5rem)] ${isBold ? 'font-medium' : 'font-light'} tracking-[-0.01em] md:tracking-[-0.04em] leading-snug md:leading-none whitespace-nowrap`}
              >
                {word}
              </span>
            );
          })}
        </motion.span>
      </h1>

      {/* Loading Loader */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className={`loader ${isDarkMode ? 'dark' : 'light'}`}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Landing;

