import { motion } from "framer-motion";
import type { Translations } from "../../translations";

interface AboutProps {
  t: Translations;
  isDarkMode: boolean;
}

export const About = ({ t, isDarkMode }: AboutProps) => {
  const textColor = isDarkMode ? "text-[#f5f5f5]" : "text-[#1a1a1a]";
  const textStyle = isDarkMode ? "text-[#a0a0a0]" : "text-[#666666]";

  return (
    <div className={`flex flex-col h-full justify-center w-full ${textColor}`}>
      <div className={`space-y-[clamp(0.5rem,1.5vh,1rem)] ${textStyle} text-center md:text-left`}>
        <motion.p 
          className="text-[clamp(0.875rem,1.8vw,1rem)] leading-relaxed cursor-default"
          whileHover={{ x: 4, opacity: 0.9 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          {t.aboutText1}
        </motion.p>
      </div>
    </div>
  );
};

