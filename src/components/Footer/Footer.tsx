import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import type { Translations } from "../../translations";

interface FooterProps {
  t: Translations;
  isDarkMode: boolean;
}

export const Footer = ({ t, isDarkMode }: FooterProps) => {
  const textColor = isDarkMode ? "text-[#f5f5f5]" : "text-[#1a1a1a]";
  const iconStyle = isDarkMode
    ? "text-[#666666] hover:text-[#f5f5f5]"
    : "text-[#999999] hover:text-[#1a1a1a]";
  const copyrightColor = isDarkMode ? "text-[#666666]" : "text-[#999999]";

  return (
    <div className={`pt-8 ${textColor}`}>
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-6">
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
          <div className="text-2xl md:text-3xl font-medium">
            <span>Mokhamad</span>
          </div>
          <div className="text-2xl md:text-3xl font-medium">
            <span>Dwihardik</span>
          </div>
        </div>
        <div className="flex gap-6">
          <motion.a 
            href="https://github.com/ddiko105" 
            target="_blank" 
            rel="noopener noreferrer" 
            className={iconStyle}
            whileHover={{ scale: 1.2, rotate: 12 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <Github size={18} />
          </motion.a>
          <motion.a
            href="https://www.linkedin.com/in/mokhamad-dwihardik-kusuma-putra-470854190/"
            target="_blank"
            rel="noopener noreferrer"
            className={iconStyle}
            whileHover={{ scale: 1.2, rotate: 12 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <Linkedin size={18} />
          </motion.a>
          <motion.a 
            href="mailto:ddiko105@gmail.com" 
            className={iconStyle}
            whileHover={{ scale: 1.2, rotate: 12 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <Mail size={18} />
          </motion.a>
        </div>
      </div>
      <div className="pt-6">
        <p className={`text-xs text-center transition-colors ${copyrightColor}`}>
          {t.copyright}
        </p>
      </div>
    </div>
  );
};

