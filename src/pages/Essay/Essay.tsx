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

  const essays = getEssays("en" as Language);

  return (
    <div className={`h-full ${bgColor} ${textColor} overflow-hidden w-full`}>
      <div className="h-full w-full px-6 md:px-10 lg:px-16 py-6 md:py-8 flex flex-col overflow-hidden">
        <div className="max-w-[1200px] mx-auto w-full flex flex-col flex-1 overflow-hidden min-h-0">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-3"
          >
            <h1 className="text-2xl sm:text-3xl font-light mb-1">
              {t.essay}
            </h1>
          </motion.div>

          <motion.div
            className="flex-1 overflow-hidden min-h-0 flex flex-col"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            {essays.length > 0 ? (
              <div className="space-y-0">
                {essays.map((essay) => (
                  <Link
                    key={essay.id}
                    to={`/essay/${essay.id}`}
                    className={`flex items-center justify-between gap-4 border-t ${borderColor} py-3 transition-all duration-200 ${hoverBg} -mx-1 px-1 rounded group`}
                  >
                    <div className="flex-1 min-w-0">
                      <h2 className="text-sm font-light line-clamp-1 group-hover:underline">
                        {essay.title}
                      </h2>
                      <p className={`text-[10px] leading-relaxed ${textSecondaryColor} line-clamp-1 mt-0.5`}>
                        {essay.excerpt}
                      </p>
                    </div>
                    <span className={`text-[10px] ${textSecondaryColor} whitespace-nowrap shrink-0`}>
                      {new Date(essay.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </Link>
                ))}
              </div>
            ) : (
              <div className={`border-t ${borderColor} pt-4`}>
                <p className={`text-xs leading-relaxed ${textSecondaryColor}`}>
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

