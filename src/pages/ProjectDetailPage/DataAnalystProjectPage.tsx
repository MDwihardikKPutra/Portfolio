import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import type { Translations } from "../../translations";

interface DataAnalystProjectPageProps {
  t: Translations;
  isDarkMode: boolean;
  language: string;
}

export const DataAnalystProjectPage = ({
  t,
  isDarkMode,
  language,
}: DataAnalystProjectPageProps) => {
  const bgColor = isDarkMode ? "bg-[#0a0a0a]" : "bg-white";
  const textColor = isDarkMode ? "text-[#f5f5f5]" : "text-[#1a1a1a]";
  const textSecondaryColor = isDarkMode ? "text-[#a0a0a0]" : "text-[#666666]";
  const borderColor = isDarkMode ? "border-[#1a1a1a]" : "border-[#e5e5e5]";
  const hoverBg = isDarkMode ? "hover:bg-[#1a1a1a]" : "hover:bg-[#f5f5f5]";
  const headingColor = isDarkMode ? "text-gray-200" : "text-gray-800"; // Keeping distinct heading color for sections if needed, or align with textColor

  return (
    <div className={`h-full ${bgColor} ${textColor} overflow-hidden w-full relative`}>
      <div className="h-full w-full px-4 sm:px-6 md:px-8 lg:px-12 pt-12 sm:pt-16 pb-8 overflow-y-auto">
        <div className="max-w-[800px] mx-auto">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-6 sm:mb-8"
          >
            <Link
              to="/projects"
              className={`inline-flex items-center gap-2 text-xs sm:text-sm ${textSecondaryColor} transition-all duration-300 ${hoverBg} -ml-2 pl-2 pr-3 py-1 rounded`}
            >
              <ArrowLeft size={14} className="sm:w-4 sm:h-4" />
              <span>{t.backToProjects}</span>
            </Link>
          </motion.div>

          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-8 border-b pb-8 border-gray-200 dark:border-gray-800"
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light mb-4 leading-tight">
              {t.dataAnalystProjectTitle}
            </h1>
            <div className={`text-xs sm:text-sm ${textSecondaryColor} space-y-2`}>
              <p className="font-medium">{t.dataAnalystProjectRole}</p>
              <p>{t.dataAnalystProjectTools}</p>
            </div>
          </motion.div>

          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8 sm:space-y-12"
          >
            {/* Executive Summary */}
            <section>
              <h3 className="text-sm sm:text-base font-bold mb-3 uppercase tracking-wider opacity-80">
                1. {t.executiveSummary || "Executive Summary"}
              </h3>
              <p className={`text-xs sm:text-sm leading-relaxed ${textSecondaryColor} text-justify`}>
                {t.dataAnalystExecutiveSummary}
              </p>
            </section>

            {/* Project Objective */}
            <section>
              <h3 className="text-sm sm:text-base font-bold mb-3 uppercase tracking-wider opacity-80">
                2. {t.projectObjective || "Project Objectives"}
              </h3>
              <ul className={`text-xs sm:text-sm leading-relaxed ${textSecondaryColor} list-disc list-inside space-y-2 ml-2`}>
                <li>{t.dataAnalystObjective1}</li>
                <li>{t.dataAnalystObjective2}</li>
                <li>{t.dataAnalystObjective3}</li>
                <li>{t.dataAnalystObjective4}</li>
              </ul>
            </section>

            {/* Data Engineering Process */}
            <section>
              <h3 className="text-sm sm:text-base font-bold mb-3 uppercase tracking-wider opacity-80">
                {t.dataAnalystDataEngineeringProcessTitle}
              </h3>
              <div className={`text-xs sm:text-sm leading-relaxed ${textSecondaryColor} space-y-4 text-justify`}>
                <p>{t.dataAnalystDataEngineeringProcess1}</p>
                <ul className="list-disc list-inside space-y-2 ml-2">
                  <li>{t.dataAnalystDataEngineeringProcess2}</li>
                  <li>{t.dataAnalystDataEngineeringProcess3}</li>
                </ul>
              </div>
            </section>

            {/* Key Insights & Results */}
            <section>
              <h3 className="text-sm sm:text-base font-bold mb-6 uppercase tracking-wider opacity-80">
                {t.dataAnalystKeyInsightsResultsTitle}
              </h3>

              <div className="space-y-8">
                {/* Insight A */}
                <div className="bg-gray-50 dark:bg-[#111] p-4 sm:p-6 rounded-lg border border-gray-100 dark:border-[#222]">
                  <h4 className="text-sm font-bold mb-3">{t.dataAnalystInsightARiskTitle}</h4>
                  <div className={`text-xs sm:text-sm ${textSecondaryColor} space-y-3`}>
                    <p className="text-justify"><span className={`font-semibold ${textColor}`}>Findings:</span> {t.dataAnalystInsightARiskFindings.replace("Findings:", "").replace("Temuan:", "").trim()}</p>
                    <p className="text-justify"><span className={`font-semibold ${textColor}`}>Analysis:</span> {t.dataAnalystInsightARiskAnalysis.replace("Analysis:", "").replace("Analisis:", "").trim()}</p>
                  </div>
                </div>

                {/* Insight B */}
                <div className="bg-gray-50 dark:bg-[#111] p-4 sm:p-6 rounded-lg border border-gray-100 dark:border-[#222]">
                  <h4 className="text-sm font-bold mb-3">{t.dataAnalystInsightBMarketTitle}</h4>
                  <div className={`text-xs sm:text-sm ${textSecondaryColor} space-y-3`}>
                    <p className="text-justify"><span className={`font-semibold ${textColor}`}>Findings:</span> {t.dataAnalystInsightBMarketFindings.replace("Findings:", "").replace("Temuan:", "").trim()}</p>
                    <p className="text-justify"><span className={`font-semibold ${textColor}`}>Analysis:</span> {t.dataAnalystInsightBMarketAnalysis.replace("Analysis:", "").replace("Analisis:", "").trim()}</p>
                  </div>
                </div>

                {/* Insight C */}
                <div className="bg-gray-50 dark:bg-[#111] p-4 sm:p-6 rounded-lg border border-gray-100 dark:border-[#222]">
                  <h4 className="text-sm font-bold mb-3">{t.dataAnalystInsightCWholesaleTitle}</h4>
                  <div className={`text-xs sm:text-sm ${textSecondaryColor} space-y-3`}>
                    <p className="text-justify"><span className={`font-semibold ${textColor}`}>Findings:</span> {t.dataAnalystInsightCWholesaleFindings.replace("Findings:", "").replace("Temuan:", "").trim()}</p>
                    <p className="text-justify"><span className={`font-semibold ${textColor}`}>Analysis:</span> {t.dataAnalystInsightCWholesaleAnalysis.replace("Analysis:", "").replace("Analisis:", "").trim()}</p>
                  </div>
                </div>

                {/* Insight D */}
                <div className="bg-gray-50 dark:bg-[#111] p-4 sm:p-6 rounded-lg border border-gray-100 dark:border-[#222]">
                  <h4 className="text-sm font-bold mb-3">{t.dataAnalystInsightDFinancialTitle}</h4>
                  <div className={`text-xs sm:text-sm ${textSecondaryColor} space-y-3`}>
                    <p className="text-justify"><span className={`font-semibold ${textColor}`}>Findings:</span> {t.dataAnalystInsightDFinancialFindings.replace("Findings:", "").replace("Temuan:", "").trim()}</p>
                    <p className="text-justify"><span className={`font-semibold ${textColor}`}>Analysis:</span> {t.dataAnalystInsightDFinancialAnalysis.replace("Analysis:", "").replace("Analisis:", "").trim()}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Business Recommendations */}
            <section className="mb-12">
              <h3 className="text-sm sm:text-base font-bold mb-3 uppercase tracking-wider opacity-80">
                {t.dataAnalystBusinessRecommendationsTitle}
              </h3>
              <div className={`bg-blue-50 dark:bg-blue-900/10 p-6 rounded-lg border border-blue-100 dark:border-blue-900/20`}>
                <ul className={`text-xs sm:text-sm leading-relaxed ${textSecondaryColor} list-disc list-inside space-y-3`}>
                  <li>{t.dataAnalystRecommendation1}</li>
                  <li>{t.dataAnalystRecommendation2}</li>
                  <li>{t.dataAnalystRecommendation3}</li>
                </ul>
              </div>
            </section>

          </motion.div>
        </div>
      </div>
    </div>
  );
};
