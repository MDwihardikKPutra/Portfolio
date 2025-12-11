import { motion } from "framer-motion";
import type { Translations } from "../../translations";

interface ExperienceProps {
  t: Translations;
  isDarkMode: boolean;
}

export const Experience = ({ t, isDarkMode }: ExperienceProps) => {
  const textColor = isDarkMode ? "text-[#f5f5f5]" : "text-[#1a1a1a]";
  const dateColor = isDarkMode ? "text-[#666666]" : "text-[#999999]";
  const descColor = isDarkMode ? "text-[#a0a0a0]" : "text-[#666666]";

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
    <div className={`w-full h-full ${textColor}`}>
      <div className="h-full flex items-center px-8 lg:px-12 pt-8 pb-20 md:pb-24">
        <div className="max-w-[1600px] w-full mx-auto h-full flex items-center">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 w-full items-start">
            
            {/* Column 1 - Title */}
            <div className="md:col-span-4 flex items-center h-full">
              <h2 className="text-[clamp(2rem,6vw,4rem)] font-medium">
                {t.experience}
              </h2>
            </div>

            {/* Column 2 - Experience Details */}
            <div className="md:col-span-6 flex flex-col space-y-6">
              {/* Date, Role, Company */}
              <div className="flex flex-col space-y-1">
                <div className={`text-[clamp(0.625rem,1.2vw,0.75rem)] font-medium tracking-wider uppercase ${dateColor}`}>
                  {t.jun2025Present}
                </div>
                <h3 className="text-[clamp(1.125rem,2.5vw,1.5rem)] font-medium">
                  {t.informationTechnologyEngineer}
                </h3>
                <p className={`text-[clamp(0.75rem,1.3vw,0.875rem)] ${dateColor}`}>
                  {t.pgeCompany}
                </p>
              </div>

              {/* Descriptions */}
              <div className={`space-y-4 ${descColor}`}>
                <p className="text-[clamp(0.875rem,1.8vw,1rem)] leading-relaxed">
                  {t.expDesc1}
                </p>
                <p className="text-[clamp(0.875rem,1.8vw,1rem)] leading-relaxed">
                  {t.expDesc2}
                </p>
                <p className="text-[clamp(0.875rem,1.8vw,1rem)] leading-relaxed">
                  {t.expDesc3}
                </p>
              </div>
            </div>

            {/* Column 3 - Tech Stack */}
            <div className="md:col-span-2 flex flex-col space-y-3">
              <p className={`text-[clamp(0.625rem,1.2vw,0.75rem)] font-medium tracking-wider uppercase ${dateColor}`}>
                {t.techStack}
              </p>
              <div className="flex flex-col gap-y-2">
                {techList.map((tech) => (
                  <span 
                    key={tech} 
                    className={`text-[clamp(0.875rem,1.5vw,0.875rem)] font-normal ${descColor}`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};