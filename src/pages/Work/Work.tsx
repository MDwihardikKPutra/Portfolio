import type { Translations } from "../../translations";
import { getProjects, getSkills, type Language } from "../../data";

interface WorkProps {
  t: Translations;
  isDarkMode: boolean;
  language: string;
}

export const Work = ({ t, isDarkMode, language }: WorkProps) => {
  const bgColor = isDarkMode ? "bg-[#0a0a0a]" : "bg-white";
  const textColor = isDarkMode ? "text-[#f5f5f5]" : "text-[#1a1a1a]";
  const dateColor = isDarkMode ? "text-[#666666]" : "text-[#999999]";
  const descColor = isDarkMode ? "text-[#a0a0a0]" : "text-[#666666]";

  const projects = getProjects(language as Language);
  const skills = getSkills(language as Language);

  const techList = [
    "Laravel 11",
    "MySQL/PostgreSQL",
    "Ubuntu Server",
    "TrueNAS",
    "MikroTik RouterOS",
    "Nextcloud",
    "Cloudflare Tunnel",
    "cPanel",
  ];

  const accentColor = isDarkMode ? "bg-[#f5f5f5]" : "bg-[#1a1a1a]";

  return (
    <div className={`h-screen h-[100dvh] ${bgColor} ${textColor} overflow-hidden w-full`}>
      <div className="h-full w-full px-8 lg:px-12 pt-16 pb-20 md:pb-24 overflow-y-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-[1600px] mx-auto h-full">
          
          {/* Left Column - Experience */}
          <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-5">
              <div className={`w-1 h-7 ${accentColor}`} />
              <h2 className="text-xl font-medium uppercase tracking-wide">
                {t.experience}
              </h2>
            </div>
            
            <div className="mb-4">
              <div className={`text-xs ${dateColor} mb-1`}>
                {t.jun2025Present}
              </div>
              <h3 className="text-base font-medium mb-1">
                {t.informationTechnologyEngineer}
              </h3>
              <p className={`text-xs ${dateColor}`}>
                {t.pgeCompany}
              </p>
            </div>

            <div className={`space-y-2 text-sm leading-relaxed ${descColor}`}>
              <p>{t.expDesc1}</p>
              <p>{t.expDesc2}</p>
              <p>{t.expDesc3}</p>
            </div>
          </div>

          {/* Right Column - Projects & Skills */}
          <div className="flex flex-col space-y-10">
            {/* Projects */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className={`w-1 h-7 ${accentColor}`} />
                <h2 className="text-xl font-medium uppercase tracking-wide">
                  {t.selectedWork}
                </h2>
              </div>

              <div className="space-y-6">
                {projects.map((project, idx) => (
                  <div key={project.title} className="flex gap-3">
                    <div className={`text-3xl font-light ${dateColor} flex-shrink-0 leading-none`}>
                      {String(idx + 1).padStart(2, '0')}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium mb-1">
                        {project.title}
                      </h3>
                      <div className={`text-xs mb-1 ${dateColor}`}>
                        {project.category}
                      </div>
                      <p className={`text-sm leading-relaxed ${descColor}`}>
                        {project.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className={`w-1 h-7 ${accentColor}`} />
                <h2 className="text-xl font-medium uppercase tracking-wide">
                  {t.skills}
                </h2>
              </div>

              <div className="grid grid-cols-2 gap-x-6 gap-y-5">
                {skills.map((skillSet) => (
                  <div key={skillSet.category}>
                    <h3 className="text-xs font-medium uppercase mb-2 tracking-wide">
                      {skillSet.category}
                    </h3>
                    <ul className="space-y-1">
                      {skillSet.items.map((item) => (
                        <li
                          key={item}
                          className={`text-sm ${descColor}`}
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
      </div>
    </div>
  );
};
