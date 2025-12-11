import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Translations } from "../../translations";

interface LandingProps {
  t: Translations;
  isDarkMode: boolean;
}

export const Landing = ({ t, isDarkMode }: LandingProps) => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const bgColor = isDarkMode ? "bg-[#0a0a0a]" : "bg-white";
  const textColor = isDarkMode ? "text-[#f5f5f5]" : "text-[#1a1a1a]";
  const progressColor = isDarkMode ? "bg-[#f5f5f5]" : "bg-[#1a1a1a]";

  // Reset progress on mount to ensure animation works on refresh
  useEffect(() => {
    setProgress(0);
  }, []);

  useEffect(() => {
    // Progress bar animation - 3.5 seconds total
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + (100 / 35); // 35 frames for 3.5 seconds (100ms per frame)
      });
    }, 100);

    // Auto redirect to home after 3.5 seconds (exit animation will be handled by AnimatePresence)
    const timer = setTimeout(() => {
      navigate("/home");
    }, 3500);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, [navigate]);

  const words = t.thankYouMessage.split(" ");
  const textAnimationDuration = 3; // Total text animation duration in seconds
  const startDelay = 0.7; // Start delay after wrapper animation completes (0.6s wrapper + 0.1s buffer)
  const wordDuration = 0.8; // Duration per word
  const staggerDelay = words.length > 1 
    ? (textAnimationDuration - startDelay - wordDuration) / (words.length - 1)
    : 0;

  return (
    <motion.div 
      className={`h-screen h-[100dvh] ${bgColor} ${textColor} relative overflow-hidden w-full flex flex-col items-center justify-center px-6 md:px-8 lg:px-0`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div 
        className="text-center mb-10 md:mb-12 w-full max-w-[90vw] md:max-w-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.3 }}
      >
        <h1 className={`flex flex-wrap items-center justify-center gap-x-1.5 gap-y-0.5 md:gap-x-3 md:gap-y-1 lg:gap-x-4 lg:gap-y-2 ${textColor}`}>
          {words.map((word, index) => {
            const cleanWord = word.replace(/[.,]/g, ''); // Remove punctuation for comparison
            const isBold = cleanWord === "for" || cleanWord === "sure";
            return (
              <motion.span
                key={`word-${index}`}
                className={`text-[clamp(1.25rem,6vw,2rem)] sm:text-[clamp(1.5rem,5vw,2.5rem)] md:text-[clamp(1.75rem,4.5vw,3.5rem)] ${isBold ? 'font-medium' : 'font-light'} tracking-[-0.02em] md:tracking-[-0.04em] leading-tight md:leading-none inline-flex items-center`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: startDelay + index * staggerDelay,
                  duration: wordDuration,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ scale: 1.05 }}
              >
                {word}
              </motion.span>
            );
          })}
        </h1>
      </motion.div>

      {/* Loading Progress Bar */}
      <motion.div
        className="w-[280px] sm:w-64 md:w-72 lg:w-80 h-px relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        {/* Progress fill */}
        <motion.div
          className={`absolute left-0 top-0 h-full ${progressColor}`}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.1, ease: [0.16, 1, 0.3, 1] }}
        />
      </motion.div>
    </motion.div>
  );
};

export default Landing;

