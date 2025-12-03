import { Mail } from "lucide-react";
import type { Translations } from "../../translations";

interface ContactProps {
  t: Translations;
  isDarkMode: boolean;
}

export const Contact = ({ t, isDarkMode }: ContactProps) => {
  const borderClass = isDarkMode ? "border-[#2a2a2a]" : "border-[#e5e5e5]";
  const textColor = isDarkMode ? "text-[#a0a0a0]" : "text-[#666666]";
  const buttonClass = isDarkMode
    ? "bg-[#f5f5f5] text-[#0a0a0a] hover:bg-[#e5e5e5]"
    : "bg-[#1a1a1a] text-[#fafafa] hover:bg-[#2a2a2a]";

  const titleWords = t.letsBuild.split(" ");

  return (
    <div id="contact" className={`text-center pb-16 border-b mb-16 transition-colors ${borderClass}`}>
      <h2 className="text-2xl md:text-3xl font-medium mb-4">
        {titleWords.map((word, i) => {
          if (word === "powerful") {
            return (
              <span key={i} className="italic">
                {word}{" "}
              </span>
            );
          }
          return <span key={i}>{word} </span>;
        })}
      </h2>
      <p className={`text-base mb-6 leading-relaxed transition-colors max-w-2xl mx-auto ${textColor}`}>
        {t.contactDesc}
      </p>
      <a
        href="mailto:ddiko105@gmail.com"
        className={`inline-flex items-center gap-3 px-8 py-4 rounded-full text-sm font-medium tracking-wide transition-all duration-300 hover-lift hover:gap-4 ${buttonClass}`}
      >
        <Mail size={16} className="transition-transform duration-300 group-hover:scale-110" />
        {t.getInTouch}
      </a>
    </div>
  );
};

