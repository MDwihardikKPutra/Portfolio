import type { Translations } from "../../translations";

interface AboutProps {
  t: Translations;
  isDarkMode: boolean;
}

export const About = ({ t, isDarkMode }: AboutProps) => {
  const borderStyle = isDarkMode ? "border-[#2a2a2a]" : "border-[#e5e5e5]";
  const textStyle = isDarkMode ? "text-[#a0a0a0]" : "text-[#666666]";

  return (
    <div className={`grid md:grid-cols-12 gap-12 items-start pb-16 border-b mb-16 transition-colors ${borderStyle}`}>
      <div className="md:col-span-4">
        <h2 className="text-2xl md:text-3xl font-medium mb-0">{t.whoAmI}</h2>
      </div>
      <div className="md:col-span-8">
        <div className={`space-y-4 transition-colors ${textStyle}`}>
          <p className="text-base leading-relaxed">{t.aboutText1}</p>
          <p className="text-base leading-relaxed">{t.aboutText2}</p>
        </div>
      </div>
    </div>
  );
};

