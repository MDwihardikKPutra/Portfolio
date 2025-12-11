import { motion } from "framer-motion";
import type { Translations } from "../../translations";
import type { SkillSet } from "../../data";

interface SkillsProps {
  t: Translations;
  isDarkMode: boolean;
  skills: SkillSet[];
}

export const Skills = ({ t, isDarkMode, skills }: SkillsProps) => {
  const itemTextColor = isDarkMode ? "text-[#a0a0a0]" : "text-[#666666]";

  return (
    <div className="w-full h-full">
      <div className="grid sm:grid-cols-2 gap-12 w-full">
        {skills.map((skillSet, idx) => {
          const categoryWords = skillSet.category.split(" ");

          return (
            <div key={idx} className="space-y-4">
              <h3 className="text-[clamp(1.125rem,2.5vw,1.5rem)] font-medium">
                {categoryWords.map((word, i) => {
                  if (i === 0) {
                    return <span key={i} className="font-medium">{word} </span>;
                  }
                  return <span key={i}>{word} </span>;
                })}
              </h3>
              <ul className="space-y-2">
                {skillSet.items.map((item, itemIdx) => (
                  <li
                    key={itemIdx}
                    className={`text-[clamp(0.875rem,1.5vw,1rem)] leading-relaxed ${itemTextColor}`}
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