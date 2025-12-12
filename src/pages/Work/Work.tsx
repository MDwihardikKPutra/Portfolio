import type { Translations } from "../../translations";
import { getProjects, getSkills, type Language } from "../../data";

interface WorkProps {
  t: Translations;
  isDarkMode: boolean;
  language: string;
}

// Helper function to make specific texts bold
const makeBold = (text: string, boldTexts: string[]) => {
  const parts = [];
  let lastIndex = 0;
  
  // Find all bold text positions
  const positions = [];
  boldTexts.forEach(boldText => {
    let searchIndex = 0;
    while (true) {
      const index = text.indexOf(boldText, searchIndex);
      if (index === -1) break;
      positions.push({ index, text: boldText, length: boldText.length });
      searchIndex = index + 1;
    }
  });
  
  // Sort by index
  positions.sort((a, b) => a.index - b.index);
  
  // Remove overlapping positions (keep the first one)
  const filteredPositions = [];
  positions.forEach((pos) => {
    if (filteredPositions.length === 0 || pos.index >= filteredPositions[filteredPositions.length - 1].index + filteredPositions[filteredPositions.length - 1].length) {
      filteredPositions.push(pos);
    }
  });
  
  // Build parts array
  filteredPositions.forEach((pos) => {
    // Add text before bold
    if (pos.index > lastIndex) {
      parts.push({ text: text.substring(lastIndex, pos.index), bold: false });
    }
    // Add bold text
    parts.push({ text: pos.text, bold: true });
    lastIndex = pos.index + pos.length;
  });
  
  // Add remaining text
  if (lastIndex < text.length) {
    parts.push({ text: text.substring(lastIndex), bold: false });
  }
  
  // If no bold texts found, return original text
  if (parts.length === 0) {
    return [{ text, bold: false }];
  }
  
  return parts;
};

export const Work = ({ t, isDarkMode, language }: WorkProps) => {
  const bgColor = isDarkMode ? "bg-[#0a0a0a]" : "bg-white";
  const textColor = isDarkMode ? "text-white" : "text-black";
  const dateColor = isDarkMode ? "text-[#999999]" : "text-[#666666]";
  const descColor = isDarkMode ? "text-[#cccccc]" : "text-[#333333]";

  const projects = getProjects(language as Language);
  const skills = getSkills(language as Language);

  const borderColor = isDarkMode ? "border-[#1a1a1a]" : "border-[#e5e5e5]";
  
  // Bold texts for experience descriptions
  const expBoldTexts = language === "en" 
    ? ["PGE System", "MySQL", "PostgreSQL", "Ubuntu Server", "TrueNAS Scale", "RouterOS", "MikroTik", "VLAN"]
    : ["PGE System", "MySQL", "PostgreSQL", "Ubuntu Server", "TrueNAS Scale", "RouterOS", "MikroTik", "VLAN"];

  return (
    <div className={`h-screen h-[100dvh] ${bgColor} ${textColor} overflow-hidden w-full`}>
      <div className="h-full w-full px-8 lg:px-12 pt-16 pb-20 md:pb-24 overflow-y-auto">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-12 lg:gap-16">
            
            {/* Left Column */}
            <div className="space-y-6">
              {/* Experience */}
              <div>
                <h2 className="text-base font-light mb-4">
                  {t.experience}
                </h2>
                
                {/* PGE Experience */}
                <div className="mb-6">
                  <div className="mb-3">
                    <div className={`text-xs ${dateColor} mb-1.5`}>
                      {t.jun2025Present}
                    </div>
                    <h3 className="text-sm font-bold mb-1.5">
                      {t.informationTechnologyEngineer}
                    </h3>
                    <p className={`text-xs font-bold ${textColor}`}>
                      {t.pgeCompany}
                    </p>
                  </div>

                  <div className={`space-y-1.5 text-xs leading-relaxed ${descColor}`}>
                    <p>
                      {makeBold(t.expDesc1, expBoldTexts).map((part, index) => 
                        part.bold ? (
                          <span key={index} className="font-bold">{part.text}</span>
                        ) : (
                          <span key={index}>{part.text}</span>
                        )
                      )}
                    </p>
                    <p>
                      {makeBold(t.expDesc2, expBoldTexts).map((part, index) => 
                        part.bold ? (
                          <span key={index} className="font-bold">{part.text}</span>
                        ) : (
                          <span key={index}>{part.text}</span>
                        )
                      )}
                    </p>
                    <p>
                      {makeBold(t.expDesc3, expBoldTexts).map((part, index) => 
                        part.bold ? (
                          <span key={index} className="font-bold">{part.text}</span>
                        ) : (
                          <span key={index}>{part.text}</span>
                        )
                      )}
                    </p>
                  </div>
                </div>

                {/* WOF Wooden Experience */}
                <div className="mb-6">
                  <div className="mb-3">
                    <div className={`text-xs ${dateColor} mb-1.5`}>
                      {t.wofWoodenDate}
                    </div>
                    <h3 className="text-sm font-bold mb-1.5">
                      {t.wofWoodenPosition}
                    </h3>
                    <p className={`text-xs font-bold ${textColor}`}>
                      {t.wofWoodenCompany}
                    </p>
                  </div>

                  <div className={`space-y-1.5 text-xs leading-relaxed ${descColor}`}>
                    <p>{t.wofWoodenDesc1}</p>
                    <p>{t.wofWoodenDesc2}</p>
                    <p>{t.wofWoodenDesc3}</p>
                  </div>
                </div>
              </div>

              {/* Projects */}
              <div>
                <h2 className="text-base font-light mb-4">
                  {t.selectedWork}
                </h2>

                <div className="space-y-3">
                  {projects.map((project) => (
                    <div key={project.title}>
                      <h3 className="text-sm font-bold mb-1.5">
                        {project.title}
                      </h3>
                      <div className={`text-xs mb-1.5 ${dateColor}`}>
                        {project.category}
                      </div>
                      <p className={`text-xs leading-relaxed ${descColor}`}>
                        {project.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className={`hidden lg:block border-l border-dashed ${borderColor}`} />

            {/* Right Column - Skills */}
            <div className="space-y-6">
              <div>
                <h2 className="text-base font-light mb-4">
                  {t.skills}
                </h2>

                <div className="space-y-3">
                  {skills.map((skillSet) => (
                    <div key={skillSet.category}>
                      <h3 className="text-xs font-bold mb-2">
                        {skillSet.category}
                      </h3>
                      <ul className="space-y-1">
                        {skillSet.items.map((item) => (
                          <li
                            key={item}
                            className={`text-xs ${descColor}`}
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
    </div>
  );
};
