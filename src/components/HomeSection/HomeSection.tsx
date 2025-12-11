import { motion } from "framer-motion";
import type { Translations } from "../../translations";

interface HomeSectionProps {
  t: Translations;
  isDarkMode: boolean;
}

export const HomeSection = ({ t, isDarkMode }: HomeSectionProps) => {
  const textColor = isDarkMode ? "text-[#f5f5f5]" : "text-[#1a1a1a]";
  const accentColor = isDarkMode ? "text-[#666666]" : "text-[#999999]";


  return (
    <div className={`relative w-full h-full min-h-0 ${textColor}`}>
      <div className="h-full flex flex-col items-center justify-center min-h-0 overflow-hidden">
        {/* Main Content Area - Centered */}
        <div className="w-full h-full flex items-center px-4 sm:px-6 md:px-16 lg:px-32 xl:px-40 py-[clamp(1rem,4vh,2rem)]">
          <div className="max-w-7xl w-full mx-auto h-full flex items-center">
            {/* 3 Column Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-[clamp(1rem,2vh,1.5rem)] md:gap-[clamp(1.5rem,3vh,2rem)] lg:gap-[clamp(2rem,4vh,2.5rem)] items-center w-full h-full">
              
              {/* Column 1 - Profile Picture */}
              <div className="md:col-span-4 flex flex-col justify-center px-2 md:px-3 lg:px-4 h-full">
                <motion.img
                  src="/profile.jpg"
                  alt="Mokhamad Dwihardik Kusuma Putra"
                  className="w-[clamp(5rem,15vw,15rem)] h-[clamp(5rem,15vw,15rem)] border border-current object-cover mx-auto"
                  onError={(e) => {
                    e.currentTarget.src = "https://via.placeholder.com/240";
                  }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>

              {/* Column 2 - Heading */}
              <div className="md:col-span-6 flex flex-col items-center justify-center px-2 md:px-3 lg:px-4 h-full">
                <div className="flex flex-col items-center space-y-[clamp(0.25rem,1vh,0.5rem)] sm:space-y-[clamp(0.5rem,1.5vh,0.75rem)]">
                  {/* Degree Label */}
                  <p
                    className={`text-[clamp(0.625rem,1.5vw,0.75rem)] tracking-[0.2em] uppercase ${accentColor} font-normal text-center`}
                  >
                    {t.bachelorDegree}
                  </p>

                  {/* Main Heading */}
                  <h1 className="text-[clamp(1.25rem,4vw,2.5rem)] leading-[1.1] tracking-[-0.02em] text-center">
                    <span className="font-normal">{t.hello}</span>
                    <br />
                    <span className="font-bold">Mokhamad Dwihardik</span>
                    <br />
                    <span className="italic font-normal">Kusuma Putra</span>.
                  </h1>
                </div>

                {/* Role/Title - Bottom */}
                <p className="text-[clamp(0.875rem,2vw,1rem)] font-normal text-center mt-auto">
                  {t.anITEngineer.split(" ").map((word, i) => {
                    if (word === "IT") {
                      return (
                        <span key={i} className="font-bold">
                          {word}{" "}
                        </span>
                      );
                    }
                    if (word === "Engineer.") {
                      return (
                        <span key={i} className="italic font-normal">
                          {word}{" "}
                        </span>
                      );
                    }
                    return <span key={i} className="font-normal">{word} </span>;
                  })}
                </p>
              </div>

              {/* Column 3 - Social Links */}
              <div className="md:col-span-2 flex flex-col justify-center px-2 md:px-3 lg:px-4 h-full">
                <div className="flex flex-row md:flex-col justify-center gap-4 md:gap-0 md:space-y-[clamp(0.25rem,1vh,0.5rem)]">
                  <motion.a
                    href="https://www.linkedin.com/in/mokhamad-dwihardik-kusuma-putra-470854190/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-sm md:text-sm lg:text-base font-normal text-left ${textColor}`}
                    style={{ textDecoration: "none" }}
                    whileHover={{ x: 4, opacity: 0.8 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  >
                    LinkedIn
                  </motion.a>
                  <motion.a
                    href="https://medium.com/@ddiko105"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-sm md:text-sm lg:text-base font-normal text-left ${textColor}`}
                    style={{ textDecoration: "none" }}
                    whileHover={{ x: 4, opacity: 0.8 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  >
                    Medium
                  </motion.a>
                  <motion.a
                    href="https://github.com/ddiko105"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-sm md:text-sm lg:text-base font-normal text-left ${textColor}`}
                    style={{ textDecoration: "none" }}
                    whileHover={{ x: 4, opacity: 0.8 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  >
                    GitHub
                  </motion.a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
