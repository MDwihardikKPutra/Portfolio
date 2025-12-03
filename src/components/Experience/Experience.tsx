import type { Translations } from "../../translations";

interface ExperienceProps {
  t: Translations;
  isDarkMode: boolean;
}

export const Experience = ({ t, isDarkMode }: ExperienceProps) => {
  const borderClass = isDarkMode ? "border-[#2a2a2a]" : "border-[#e5e5e5]";
  const accentColor = isDarkMode ? "bg-[#f5f5f5]" : "bg-[#1a1a1a]";
  const dateColor = isDarkMode ? "text-[#666666]" : "text-[#999999]";
  const textColor = isDarkMode ? "text-[#a0a0a0]" : "text-[#666666]";

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

  return (
    <div
      id="experience"
      className={`grid md:grid-cols-12 gap-12 items-start pb-16 border-b mb-16 transition-colors ${borderClass}`}
    >
      <div className="md:col-span-4">
        <h2 className="text-2xl md:text-3xl font-medium mb-0">
          {t.experience}
        </h2>
      </div>
      <div className="md:col-span-8 space-y-12">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className={`w-1 h-12 transition-colors ${accentColor}`} />
            <div>
              <div className={`text-xs font-medium tracking-wider uppercase mb-1 transition-colors ${dateColor}`}>
                {t.jun2025Present}
              </div>
              <h3 className="text-2xl font-light tracking-[-0.02em]">
                <span className="font-medium">
                  {t.informationTechnologyEngineer}
                </span>
              </h3>
              <p className={`text-sm mt-1 transition-colors ${dateColor}`}>
                {t.pgeCompany}
              </p>
            </div>
          </div>
          <div className={`space-y-4 pl-4 transition-colors ${textColor}`}>
            <p className="text-base leading-relaxed text-justify">
              {t.expDesc1}
            </p>
            <p className="text-base leading-relaxed text-justify">
              {t.expDesc2}
            </p>
            <p className="text-base leading-relaxed text-justify">
              {t.expDesc3}
            </p>
          </div>
          <div className="pt-6 pl-4">
            <p className={`text-xs font-medium tracking-wider uppercase mb-4 transition-colors ${dateColor}`}>
              {t.techStack}
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-3">
              {techList.map((tech) => (
                <span key={tech} className={`text-sm font-medium transition-colors ${textColor}`}>
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

