import { motion } from "framer-motion";
import type { Translations } from "../../translations";

interface ToggleButtonsProps {
  t: Translations;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  toggleLanguage: () => void;
  language: string;
}

export const ToggleButtons = ({
  t,
  isDarkMode,
  toggleDarkMode,
  toggleLanguage,
  language,
}: ToggleButtonsProps) => {
  const buttonTextColor = isDarkMode ? "text-[#f5f5f5]" : "text-[#1a1a1a]";
  const buttonHoverBg = isDarkMode ? "hover:bg-[#1a1a1a]" : "hover:bg-[#f5f5f5]";

  return (
    <header className="flex-shrink-0 px-4 sm:px-6 md:px-8 lg:px-12 pt-4 sm:pt-6 md:pt-8 pb-4 sm:pb-6 absolute top-0 right-0 z-10">
      <div className="flex items-center gap-2 sm:gap-3">
        <motion.button
          onClick={toggleLanguage}
          className={`px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm ${buttonTextColor} ${buttonHoverBg} rounded-md transition-colors`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {language === "en" ? "ID" : "EN"}
        </motion.button>
        <motion.button
          onClick={toggleDarkMode}
          className={`px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm ${buttonTextColor} ${buttonHoverBg} rounded-md transition-colors whitespace-nowrap`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isDarkMode ? t.lightMode : t.darkMode}
        </motion.button>
      </div>
    </header>
  );
};
