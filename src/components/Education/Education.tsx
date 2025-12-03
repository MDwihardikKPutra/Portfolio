import type { Translations } from "../../translations";

interface EducationProps {
  t: Translations;
  isDarkMode: boolean;
}

export const Education = ({ t, isDarkMode }: EducationProps) => {
  const borderStyle = isDarkMode ? "border-[#2a2a2a]" : "border-[#e5e5e5]";
  const accentBar = isDarkMode ? "bg-[#f5f5f5]" : "bg-[#1a1a1a]";
  const dateColor = isDarkMode ? "text-[#666666]" : "text-[#999999]";
  const gpaColor = isDarkMode ? "text-[#a0a0a0]" : "text-[#666666]";

  return (
    <div
      id="education"
      className={`grid md:grid-cols-12 gap-12 items-start pb-16 border-b mb-16 transition-colors ${borderStyle}`}
    >
      <div className="md:col-span-4">
        <h2 className="text-2xl md:text-3xl font-medium mb-0">
          {t.education}
        </h2>
      </div>
      <div className="md:col-span-8">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className={`w-1 h-12 transition-colors ${accentBar}`} />
            <div>
              <div className={`text-xs font-medium tracking-wider uppercase mb-1 transition-colors ${dateColor}`}>
                {t.aug2020_2024}
              </div>
              <h3 className="text-2xl font-light tracking-[-0.02em]">
                <span className="font-medium">D4</span>, Information Technology
              </h3>
              <p className={`text-sm mt-1 transition-colors ${dateColor}`}>
                {t.statePolytechnicMalang}
              </p>
            </div>
          </div>
          <div className="pt-2 pl-4">
            <span className={`text-sm font-medium transition-colors ${gpaColor}`}>
              {t.gpa}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

