import type { Translations } from "../../translations";
import type { SkillSet } from "../../data";

interface SkillsProps {
  t: Translations;
  isDarkMode: boolean;
  skills: SkillSet[];
}

export const Skills = ({ t, isDarkMode, skills }: SkillsProps) => {
  const borderStyle = isDarkMode ? "border-[#2a2a2a]" : "border-[#e5e5e5]";
  const itemTextColor = isDarkMode ? "text-[#a0a0a0] hover:text-[#f5f5f5]" : "text-[#666666] hover:text-[#1a1a1a]";

  return (
    <div id="skills" className={`pb-16 border-b mb-16 transition-colors ${borderStyle}`}>
      <h2 className="text-2xl md:text-3xl font-medium mb-8">{t.expertise}</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {skills.map((skillSet, idx) => {
          const categoryWords = skillSet.category.split(" ");

          return (
            <div
              key={idx}
              className="space-y-4 hover-lift p-4 rounded-lg transition-all duration-300"
            >
              <h3 className="text-lg font-light tracking-[-0.01em] transition-colors duration-300">
                {categoryWords.map((word, i) => {
                  if (i === 0) {
                    return (
                      <span key={i} className="font-medium">
                        {word}
                      </span>
                    );
                  }
                  return <span key={i}> {word}</span>;
                })}
              </h3>
              <ul className="space-y-2">
                {skillSet.items.map((item, itemIdx) => (
                  <li
                    key={itemIdx}
                    className={`text-sm leading-relaxed transition-all duration-300 hover:translate-x-2 hover:scale-105 cursor-default ${itemTextColor}`}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};

