import { motion } from "framer-motion";
import type { Translations } from "../../translations";
import { getSkills, type Language } from "../../data";

interface ExperiencePageProps {
  t: Translations;
  isDarkMode: boolean;
  language: string;
}

export const ExperiencePage = ({ t, isDarkMode, language }: ExperiencePageProps) => {
  const textColor = isDarkMode ? "text-[#f5f5f5]" : "text-[#111111]";
  const textSecondary = isDarkMode ? "text-[#a3a3a3]" : "text-[#666666]";
  const borderColor = isDarkMode ? "border-white/10" : "border-black/10";

  const skills = getSkills(language as Language);

  return (
    <div className={`h-full ${textColor} flex flex-col overflow-hidden`}>
      <div className="flex-1 px-6 md:px-10 lg:px-16 py-6 md:py-8 flex flex-col overflow-hidden">

        {/* Compact Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-4 md:mb-6"
        >
          <h1 className="text-2xl sm:text-3xl font-normal tracking-tight mb-1">{t.experience}</h1>
          <p className={`text-xs sm:text-sm ${textSecondary} leading-relaxed`}>
            A timeline of my professional journey, highlighting key roles in IT Engineering, UI/UX Design, and Data Analysis.
          </p>
        </motion.div>

        {/* Content Grid */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-[7fr_3fr] gap-6 lg:gap-10 overflow-hidden min-h-0">

          {/* Left Column: Work Experience (70%) */}
          <div className="overflow-y-auto no-scrollbar min-h-0 space-y-4 pr-2">

            {/* Experience Item 1: PGE */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className={`pb-4 border-b ${borderColor}`}
            >
              <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-2">
                <h3 className="text-lg md:text-xl font-medium tracking-tight mb-1 md:mb-0">{t.informationTechnologyEngineer}</h3>
                <span className="text-[10px] font-medium tracking-wide uppercase px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 self-start md:self-auto">
                  {t.jun2025Present}
                </span>
              </div>
              <a
                href="https://pg-engineering.com/"
                target="_blank"
                rel="noopener noreferrer"
                className={`text-sm font-medium hover:underline transition-all ${textSecondary} block mb-2`}
              >
                {t.pgeCompany}
              </a>
              <ul className={`space-y-1 text-xs leading-relaxed ${textSecondary} list-disc list-outside ml-4`}>
                <li>{t.expDesc1}</li>
                <li>{t.expDesc2}</li>
                <li>{t.expDesc3}</li>
                <li>{t.expDesc4}</li>
              </ul>
            </motion.div>

            {/* Experience Item 2: Elux Space */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-2">
                <h3 className="text-lg md:text-xl font-medium tracking-tight mb-1 md:mb-0">{t.wofWoodenPosition}</h3>
                <span className="text-[10px] font-medium tracking-wide uppercase px-2.5 py-0.5 rounded-full bg-white/10 self-start md:self-auto">
                  {t.wofWoodenDate}
                </span>
              </div>
              <p className={`text-sm font-medium ${textSecondary} mb-2`}>{t.wofWoodenCompany}</p>
              <ul className={`space-y-1 text-xs leading-relaxed ${textSecondary} list-disc list-outside ml-4`}>
                <li>{t.wofWoodenDesc1}</li>
                <li>{t.wofWoodenDesc2}</li>
                <li>{t.wofWoodenDesc3}</li>
              </ul>
            </motion.div>
          </div>

          {/* Right Column: Skills (30%) */}
          <div className="overflow-y-auto no-scrollbar min-h-0">
            <h2 className="text-sm font-bold tracking-tight mb-4 uppercase">{t.skills}</h2>
            <div className="space-y-4">
              {skills.map((skillSet) => (
                <div key={skillSet.category}>
                  <h4 className={`text-[10px] font-bold uppercase tracking-widest mb-2 pb-1.5 border-b ${borderColor} text-white`}>
                    {skillSet.category}
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {skillSet.items.map((item) => (
                      <span
                        key={item}
                        className="text-[10px] px-2.5 py-1 rounded-full bg-white/5 text-gray-300 hover:bg-white/10 transition-colors"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
