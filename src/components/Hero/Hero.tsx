import { ArrowRight } from "lucide-react";
import type { Translations } from "../../translations";

interface HeroProps {
  t: Translations;
  isDarkMode: boolean;
}

export const Hero = ({ t, isDarkMode }: HeroProps) => {
  const borderColor = isDarkMode ? "border-[#2a2a2a]" : "border-[#e5e5e5]";
  const textColor = isDarkMode ? "text-[#a0a0a0]" : "text-[#666666]";
  const textColorHover = isDarkMode ? "hover:text-[#f5f5f5]" : "hover:text-[#1a1a1a]";
  const degreeColor = isDarkMode ? "text-[#666666]" : "text-[#999999]";

  return (
    <div
      id="about"
      className={`flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-12 pb-16 border-b mb-16 transition-colors ${borderColor}`}
    >
      <div className="flex-shrink-0">
        <img
          src="/profile.jpg"
          alt="Mokhamad Dwihardik Kusuma Putra"
          className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700"
          onError={(e) => {
            e.currentTarget.src = "https://via.placeholder.com/160";
          }}
        />
      </div>
      <div className="flex-1">
        <div className="mb-4">
          <span className={`text-sm font-medium tracking-wider uppercase transition-colors ${degreeColor}`}>
            {t.bachelorDegree}
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-light leading-[1.1] tracking-[-0.03em] mb-4">
          {t.hello}
          <br />
          <span className="font-medium">Mokhamad Dwihardik</span>
          <br />
          <span className="italic">Kusuma Putra</span>.
        </h1>
        <p className={`text-lg mb-6 transition-colors ${textColor}`}>
          {t.anITEngineer.split(" ").map((word, i) => {
            if (word === "IT" || word === "Engineer.") {
              return (
                <span key={i} className="font-medium">
                  {word}{" "}
                </span>
              );
            }
            return <span key={i}>{word} </span>;
          })}
        </p>
        <a
          href="#contact"
          className={`inline-flex items-center gap-2 text-sm font-medium transition-all duration-300 hover-underline hover:gap-3 ${textColor} ${textColorHover}`}
        >
          {t.contactMe}
          <ArrowRight
            size={16}
            className="rotate-[-45deg] transition-transform duration-300 group-hover:translate-x-1"
          />
        </a>
      </div>
    </div>
  );
};

