import { Github, Linkedin, Mail } from "lucide-react";
import type { Translations } from "../../translations";

interface FooterProps {
  t: Translations;
  isDarkMode: boolean;
}

export const Footer = ({ t, isDarkMode }: FooterProps) => {
  const iconStyle = isDarkMode
    ? "text-[#666666] hover:text-[#f5f5f5]"
    : "text-[#999999] hover:text-[#1a1a1a]";
  const borderClass = isDarkMode ? "border-[#2a2a2a]" : "border-[#e5e5e5]";
  const copyrightColor = isDarkMode ? "text-[#666666]" : "text-[#999999]";

  return (
    <div className="pt-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-6">
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
          <div className="text-3xl md:text-4xl font-medium">
            <span>Mokhamad</span>
          </div>
          <div className="text-3xl md:text-4xl font-medium">
            <span>Dwihardik</span>
          </div>
        </div>
        <div className="flex gap-6">
          <a href="#" className={`transition-all duration-300 hover-scale hover:rotate-12 ${iconStyle}`}>
            <Github size={18} />
          </a>
          <a
            href="https://www.linkedin.com/in/mokhamad-dwihardik-kusuma-putra-470854190/"
            target="_blank"
            rel="noopener noreferrer"
            className={`transition-all duration-300 hover-scale hover:rotate-12 ${iconStyle}`}
          >
            <Linkedin size={18} />
          </a>
          <a href="mailto:ddiko105@gmail.com" className={`transition-all duration-300 hover-scale hover:rotate-12 ${iconStyle}`}>
            <Mail size={18} />
          </a>
        </div>
      </div>
      <div className={`pt-6 border-t transition-colors ${borderClass}`}>
        <p className={`text-xs text-center transition-colors ${copyrightColor}`}>
          {t.copyright}
        </p>
      </div>
    </div>
  );
};

