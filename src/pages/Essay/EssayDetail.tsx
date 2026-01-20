import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import type { Translations } from "../../translations";
import { getEssayById, getEssays, type Language } from "../../data";

interface EssayDetailProps {
  t: Translations;
  isDarkMode: boolean;
  language: string;
}

export const EssayDetail = ({ t, isDarkMode, language }: EssayDetailProps) => {
  const { id } = useParams<{ id: string }>();
  const bgColor = isDarkMode ? "bg-[#0a0a0a]" : "bg-white";
  const textColor = isDarkMode ? "text-[#f5f5f5]" : "text-[#1a1a1a]";
  const textSecondaryColor = isDarkMode ? "text-[#a0a0a0]" : "text-[#666666]";
  const borderColor = isDarkMode ? "border-[#1a1a1a]" : "border-[#e5e5e5]";
  const hoverBg = isDarkMode ? "hover:bg-[#1a1a1a]" : "hover:bg-[#f5f5f5]";

  const essay = id ? getEssayById(id, language as Language) : undefined;
  const allEssays = getEssays(language as Language);
  const otherEssays = allEssays
    .filter((e) => e.id !== id)
    .slice(0, 5);

  if (!essay) {
    return (
      <div className={`h-full ${bgColor} ${textColor} overflow-hidden w-full flex items-center justify-center`}>
        <div className="text-center">
          <h1 className="text-2xl font-light mb-4">Essay not found</h1>
          <Link
            to="/essay"
            className={`text-sm ${textSecondaryColor} underline`}
          >
            Back to Essays
          </Link>
        </div>
      </div>
    );
  }

  const content = language === "en" ? essay.content : essay.contentId;
  const title = language === "en" ? essay.title : essay.titleId;

  return (
    <div className={`h-full ${bgColor} ${textColor} overflow-hidden w-full relative`}>
      <div className="h-full w-full px-4 sm:px-6 md:px-8 lg:px-12 pt-12 sm:pt-16 pb-8 overflow-y-auto">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8 sm:gap-12 lg:gap-16">
          {/* Main Content */}
          <div className="max-w-[800px] w-full">
            {/* Back Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-6 sm:mb-8"
            >
              <Link
                to="/essay"
                className={`inline-flex items-center gap-2 text-xs sm:text-sm ${textSecondaryColor} transition-all duration-300 ${hoverBg} -ml-2 pl-2 pr-3 py-1 rounded`}
              >
                <ArrowLeft size={14} className="sm:w-4 sm:h-4" />
                <span>Back to Essays</span>
              </Link>
            </motion.div>

            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-6 sm:mb-8"
            >
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light mb-3 sm:mb-4 leading-tight">
                {title}
              </h1>
              <p className={`text-[10px] sm:text-xs ${textSecondaryColor}`}>
                {new Date(essay.date).toLocaleDateString(language === "en" ? "en-US" : "id-ID", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`border-t ${borderColor} pt-6 sm:pt-8`}
            >
              <article className={`text-xs sm:text-sm leading-relaxed ${textColor} text-justify`}>
                {content
                  .split("\n\n")
                  .filter((p) => p.trim().length > 0)
                  .map((paragraph, index) => (
                    <p key={index} className="mb-4 sm:mb-6 last:mb-0">
                      {paragraph.trim()}
                    </p>
                  ))}
              </article>
            </motion.div>
          </div>

          {/* Sidebar - Other Essays */}
          {otherEssays.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="hidden lg:block"
            >
              <div className="sticky top-24">
                <h2 className={`text-sm font-light mb-6 ${textColor}`}>
                  {language === "en" ? "Other Essays" : "Essay Lainnya"}
                </h2>
                <div className="space-y-4">
                  {otherEssays.map((otherEssay, index) => (
                    <Link
                      key={otherEssay.id}
                      to={`/essay/${otherEssay.id}`}
                      className={`block border-t ${borderColor} pt-4 transition-all duration-300 ${hoverBg} -mx-2 px-2 rounded`}
                    >
                      <h3 className={`text-xs font-light mb-2 ${textColor} line-clamp-2`}>
                        {language === "en" ? otherEssay.title : otherEssay.titleId}
                      </h3>
                      <p className={`text-xs leading-relaxed ${textSecondaryColor} line-clamp-2 mb-2`}>
                        {language === "en" ? otherEssay.excerpt : otherEssay.excerptId}
                      </p>
                      <span className={`text-[10px] ${textSecondaryColor}`}>
                        {new Date(otherEssay.date).toLocaleDateString(language === "en" ? "en-US" : "id-ID", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

