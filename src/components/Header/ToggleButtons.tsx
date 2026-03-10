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

  return (
    <header className="flex-shrink-0 px-4 sm:px-6 md:px-8 lg:px-12 py-4 sm:py-6 md:py-8 sticky top-0 z-50 w-full flex justify-end pointer-events-none">
      <div className="flex items-center gap-2 sm:gap-3 pointer-events-auto bg-transparent">
        <motion.button
          onClick={toggleLanguage}
          className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-[#f5f5f5] hover:bg-[#1a1a1a] rounded-md transition-colors bg-transparent"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {language === "en" ? "ID" : "EN"}
        </motion.button>
      </div>
    </header>
  );
};
