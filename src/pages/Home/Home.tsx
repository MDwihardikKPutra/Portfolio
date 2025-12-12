import { motion } from "framer-motion";
import { Github, Linkedin } from "lucide-react";
import type { Translations } from "../../translations";
import { socialLinks } from "../../data";

interface HomeProps {
  t: Translations;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  toggleLanguage: () => void;
  language: string;
}

export const Home = ({ t, isDarkMode, toggleDarkMode, toggleLanguage, language }: HomeProps) => {
  const iconStyle = isDarkMode
    ? "text-[#666666] hover:text-[#f5f5f5]"
    : "text-[#999999] hover:text-[#1a1a1a]";
  const bgColor = isDarkMode ? "bg-[#0a0a0a]" : "bg-white";
  const textColor = isDarkMode ? "text-[#f5f5f5]" : "text-[#1a1a1a]";
  const textSecondaryColor = isDarkMode ? "text-white" : "text-black";
  const buttonTextColor = isDarkMode ? "text-[#f5f5f5]" : "text-[#1a1a1a]";
  const buttonHoverBg = isDarkMode ? "hover:bg-[#1a1a1a]" : "hover:bg-[#f5f5f5]";

  return (
    <div className={`h-screen h-[100dvh] ${bgColor} ${textColor} relative overflow-hidden flex flex-col w-full transition-colors duration-300`}>
      {/* Header - Minimal */}
      <header className="flex-shrink-0 px-8 lg:px-12 pt-8 pb-6">
        <div className="max-w-[1600px] mx-auto flex items-center justify-end">
          <div className="flex items-center gap-3">
            <motion.button
              onClick={toggleLanguage}
              className={`px-4 py-2 text-sm ${buttonTextColor} ${buttonHoverBg} rounded-md transition-colors`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {language === "en" ? "ID" : "EN"}
            </motion.button>
            <motion.button
              onClick={toggleDarkMode}
              className={`px-4 py-2 text-sm ${buttonTextColor} ${buttonHoverBg} rounded-md transition-colors`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isDarkMode ? t.lightMode : t.darkMode}
            </motion.button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-start px-4 sm:px-8 lg:px-12 pb-20 md:pb-24 min-h-0 relative">
        <div className="max-w-[1600px] w-full mx-auto h-full flex flex-col md:flex-row relative">
          
          {/* Left Column - Name and Image */}
          <div className="flex flex-col justify-between w-full md:w-auto md:flex-shrink-0 mb-6 md:mb-0">
            {/* Name (Top Left) */}
            <div className="mb-6 md:mb-0">
              <motion.div
                className="flex flex-col space-y-2 md:space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
              >
                <h1 className="text-[clamp(2.5rem,8vw,7rem)] md:text-[clamp(3.5rem,10vw,7rem)] font-light leading-none tracking-[-0.03em]">
                  <span className="font-medium text-[clamp(1.3rem,4vw,3.622rem)] md:text-[clamp(1.811rem,5.17vw,3.622rem)] block">{t.firstName}</span>
                  <span className="font-medium text-[clamp(2rem,6vw,5.6rem)] md:text-[clamp(2.8rem,8vw,5.6rem)] block">{t.lastName}</span>
                </h1>
              </motion.div>
            </div>

            {/* Profile Image (Bottom Left) */}
            <motion.div
              className="flex flex-col justify-start items-start md:absolute md:left-0 md:bottom-0 md:pb-20 md:pb-24"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {/* Social Icons - Above Image */}
              <motion.div
                className="flex flex-row gap-4 mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={iconStyle}
                    whileHover={{ scale: 1.2, rotate: 12 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    aria-label={social.name}
                  >
                    {social.icon === "github" && <Github size={20} />}
                    {social.icon === "linkedin" && <Linkedin size={20} />}
                    {social.icon === "medium" && (
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
                      </svg>
                    )}
                  </motion.a>
                ))}
              </motion.div>
              <div className="w-full max-w-[180px] sm:max-w-[228px] aspect-[3/4] overflow-hidden">
                <motion.img
                  src="/profile.jpg"
                  alt="Mokhamad Dwihardik Kusuma Putra"
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6 }}
                  onError={(e) => {
                    e.currentTarget.src = "https://via.placeholder.com/500x667";
                  }}
                />
              </div>
            </motion.div>
          </div>

          {/* Right - Text Content (Center Right) */}
          <div className="flex-1 flex items-center md:absolute md:right-0 md:top-1/2 md:-translate-y-1/2 md:pr-8 lg:pr-12">
            <motion.div
              className="space-y-4 w-full max-w-[600px]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <p className={`text-sm leading-relaxed ${textSecondaryColor}`}>
                {(() => {
                  const boldTexts = ["Lab School UM", t.statePolytechnicMalang];
                  let text = t.aboutText1;
                  const parts = [];
                  let lastIndex = 0;
                  
                  // Find all bold text positions
                  const positions = [];
                  boldTexts.forEach(boldText => {
                    const index = text.indexOf(boldText, lastIndex);
                    if (index !== -1) {
                      positions.push({ index, text: boldText, length: boldText.length });
                    }
                  });
                  
                  // Sort by index
                  positions.sort((a, b) => a.index - b.index);
                  
                  // Build parts array
                  positions.forEach((pos, i) => {
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
                  
                  return parts.map((part, index) => 
                    part.bold ? (
                      <span key={index} className="font-bold">{part.text}</span>
                    ) : (
                      <span key={index}>{part.text}</span>
                    )
                  );
                })()}
              </p>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
};