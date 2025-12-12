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
    <header className="flex-shrink-0 px-8 lg:px-12 pt-8 pb-6 absolute top-0 right-0 z-10">
      <div className="flex items-center gap-3">
        <motion.button
          onClick={toggleLanguage}
          className={`px-4 py-2 text-sm ${buttonTextColor} ${buttonHoverBg} rounded-md transition-colors`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {language === "en" ? "ID" : "EN"}
        </motion.button>
        <motion.button
          onClick={toggleDarkMode}
          className={`px-4 py-2 text-sm ${buttonTextColor} ${buttonHoverBg} rounded-md transition-colors`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isDarkMode ? t.lightMode : t.darkMode}
        </motion.button>
      </div>
    </header>
  );
};
