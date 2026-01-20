import type { Translations } from "../../translations";
import { getSkills, type Language } from "../../data";

interface ExperiencePageProps {
  t: Translations;
  isDarkMode: boolean;
  language: string;
}

export const ExperiencePage = ({ t, isDarkMode, language }: ExperiencePageProps) => {
  const bgColor = isDarkMode ? "bg-[#0a0a0a]" : "bg-white";
  const textColor = isDarkMode ? "text-white" : "text-black";
  const descColor = isDarkMode ? "text-[#cccccc]" : "text-black";

  const skills = getSkills(language as Language);

  return (
    <div className={`h-[100dvh] ${bgColor} ${textColor} w-full flex flex-col pt-20 pb-8 px-6 sm:px-12 lg:px-20 box-border overflow-hidden`}>
      <div className="flex-1 w-full max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start h-full overflow-y-auto lg:overflow-hidden">

        {/* Left Column: Experience */}
        <div className="h-full flex flex-col lg:overflow-y-auto pr-4 no-scrollbar">
          <div className="mb-8">
            <h2 className={`text-sm font-bold uppercase tracking-widest mb-6 ${isDarkMode ? "opacity-40" : "opacity-100"}`}>
              {t.experience}
            </h2>
          </div>

          <div className="space-y-12">
            {/* PGE Experience - Removed vertical line/dot */}
            <div className="pl-0">
              <div className="mb-4">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-1">
                  <h3 className="text-lg font-medium tracking-tight">{t.informationTechnologyEngineer}</h3>
                  <span className={`text-xs font-mono ${isDarkMode ? "opacity-60" : "opacity-100"}`}>{t.jun2025Present}</span>
                </div>
                <a
                  href="https://pg-engineering.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-xs hover:underline transition-opacity ${isDarkMode ? "opacity-50 hover:opacity-100" : "opacity-100"}`}
                >
                  {t.pgeCompany}
                </a>
              </div>
              <ul className={`space-y-3 text-sm leading-relaxed ${descColor} ${isDarkMode ? "opacity-90" : "opacity-100"} list-disc list-outside ml-4 text-justify`}>
                <li>{t.expDesc1}</li>
                <li>{t.expDesc2}</li>
                <li>{t.expDesc3}</li>
              </ul>
            </div>

            {/* UI/UX Internship Experience - Removed vertical line/dot */}
            <div className="pl-0">
              <div className="mb-4">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-1">
                  <h3 className="text-lg font-medium tracking-tight">{t.wofWoodenPosition}</h3>
                  <span className={`text-xs font-mono ${isDarkMode ? "opacity-60" : "opacity-100"}`}>{t.wofWoodenDate}</span>
                </div>
                <p className={`text-xs ${isDarkMode ? "opacity-50" : "opacity-100"}`}>{t.wofWoodenCompany}</p>
              </div>
              <ul className={`space-y-3 text-sm leading-relaxed ${descColor} ${isDarkMode ? "opacity-90" : "opacity-100"} list-disc list-outside ml-4 text-justify`}>
                <li>{t.wofWoodenDesc1}</li>
                <li>{t.wofWoodenDesc2}</li>
                <li>{t.wofWoodenDesc3}</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right Column: Skills */}
        <div className="h-full flex flex-col lg:overflow-y-auto pr-2 no-scrollbar">
          <div className="mb-8">
            <h2 className={`text-sm font-bold uppercase tracking-widest mb-6 ${isDarkMode ? "opacity-40" : "opacity-100"}`}>
              {t.skills}
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-x-12 gap-y-12 content-start">
            {skills.map((skillSet) => (
              <div key={skillSet.category}>
                <h4 className={`text-[10px] font-bold uppercase tracking-widest mb-4 border-b border-gray-200 dark:border-gray-800 pb-2 inline-block ${isDarkMode ? "opacity-50" : "opacity-100"}`}>
                  {skillSet.category}
                </h4>
                <ul className="space-y-2">
                  {skillSet.items.map((item) => (
                    <li
                      key={item}
                      className={`text-sm ${descColor} ${isDarkMode ? "opacity-80 hover:opacity-100" : "opacity-100"} transition-opacity text-justify`}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
