import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import type { Translations } from "../../translations";
import { getEssays, type Language } from "../../data";

interface EssayProps {
  t: Translations;
  isDarkMode: boolean;
  language: string;
}

export const Essay = ({ t, isDarkMode, language }: EssayProps) => {
  const bgColor = isDarkMode ? "bg-[#0a0a0a]" : "bg-white";
  const textColor = isDarkMode ? "text-[#f5f5f5]" : "text-[#1a1a1a]";
  const textSecondaryColor = isDarkMode ? "text-[#a0a0a0]" : "text-[#666666]";
  const borderColor = isDarkMode ? "border-[#1a1a1a]" : "border-[#e5e5e5]";
  const hoverBg = isDarkMode ? "hover:bg-[#1a1a1a]" : "hover:bg-[#f5f5f5]";

  const essays = getEssays(language as Language);

  return (
    <div className={`h-full ${bgColor} ${textColor} overflow-hidden w-full`}>
      <div className="h-full w-full px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-20 md:pb-24 overflow-y-auto">
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light mb-3 sm:mb-4">
              {t.essay}
            </h1>
          </motion.div>

          <motion.div
            className="space-y-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {essays.length > 0 ? (
              essays.map((essay, index) => (
                <Link
                  key={essay.id}
                  to={`/essay/${essay.id}`}
                  className={`block border-t ${borderColor} pt-3 pb-3 transition-all duration-300 ${hoverBg} -mx-1 px-1 rounded`}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.05 + index * 0.05 }}
                  >
                    <div className="flex items-start justify-between gap-2 sm:gap-4">
                      <div className="flex-1 min-w-0">
                        <h2 className="text-sm sm:text-base md:text-lg font-light mb-1 sm:mb-1.5 line-clamp-1">
                          {language === "en" ? essay.title : essay.titleId}
                        </h2>
                        <p className={`text-[10px] sm:text-xs leading-relaxed ${textSecondaryColor} mb-1.5 sm:mb-2 line-clamp-2`}>
                          {language === "en" ? essay.excerpt : essay.excerptId}
                        </p>
                        <span className={`text-[9px] sm:text-[10px] ${textSecondaryColor}`}>
                          {new Date(essay.date).toLocaleDateString(language === "en" ? "en-US" : "id-ID", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))
            ) : (
              <div className={`border-t ${borderColor} pt-6`}>
                <p className={`text-xs sm:text-sm leading-relaxed ${textSecondaryColor}`}>
                  {t.essayComingSoon}
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

