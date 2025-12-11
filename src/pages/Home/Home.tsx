import { motion } from "framer-motion";
import { Github, Linkedin } from "lucide-react";
import type { Translations } from "../../translations";
import { useDarkMode } from "../../hooks/useDarkMode";
import { useLanguage } from "../../hooks/useLanguage";

interface HomeProps {
  t: Translations;
  isDarkMode: boolean;
}

export const Home = ({ t, isDarkMode }: HomeProps) => {
  const { language, toggleLanguage } = useLanguage();
  const { toggleDarkMode } = useDarkMode();
  const iconStyle = isDarkMode
    ? "text-[#666666] hover:text-[#f5f5f5]"
    : "text-[#999999] hover:text-[#1a1a1a]";

  return (
    <div className="h-screen h-[100dvh] bg-white text-[#1a1a1a] relative overflow-hidden flex flex-col w-full">
      {/* Header - Minimal */}
      <header className="flex-shrink-0 px-8 lg:px-12 pt-8 pb-6">
        <div className="max-w-[1600px] mx-auto flex items-center justify-end">
          <div className="flex items-center gap-3">
            <motion.button
              onClick={toggleLanguage}
              className="px-4 py-2 text-sm text-[#1a1a1a] hover:bg-[#f5f5f5] rounded-md transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {language === "en" ? "ID" : "EN"}
            </motion.button>
            <motion.button
              onClick={toggleDarkMode}
              className="px-4 py-2 text-sm text-[#1a1a1a] hover:bg-[#f5f5f5] rounded-md transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isDarkMode ? "Light" : "Dark"}
            </motion.button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-start px-8 lg:px-12 pb-20 md:pb-24 min-h-0 relative">
        <div className="max-w-[1600px] w-full mx-auto h-full flex relative">
          
          {/* Left - Name (Top Left) */}
          <div className="absolute left-0 top-0 pl-8 lg:pl-12 pt-8">
            <motion.div
              className="flex flex-col space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <h1 className="text-[clamp(3.5rem,10vw,7rem)] font-light leading-none tracking-[-0.03em]">
                <span className="font-medium text-[clamp(1.811rem,5.17vw,3.622rem)] block">Mokhamad Dwihardik</span>
                <span className="font-medium text-[clamp(2.8rem,8vw,5.6rem)] block">Kusuma Putra</span>
              </h1>
            </motion.div>
          </div>

          {/* Right - Text Content (Center Right) */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 pr-8 lg:pr-12">
            <motion.div
              className="space-y-4 max-w-[600px]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <p className="text-[clamp(0.875rem,1.5vw,1rem)] leading-[1.7] text-[#4a4a4a] font-light text-justify">
                Born in <span className="font-medium">Kediri</span> on May 2, <span className="font-medium">2001</span>, I moved to <span className="font-medium">Malang</span> during high school and have been living there since. I completed my secondary education at <span className="font-medium">Lab School UM</span>, majoring in Natural Sciences (<span className="font-medium">IPA</span>), and went on to pursue a <span className="font-medium">D4 in Informatics Engineering</span> at <span className="font-medium">State Polytechnic of Malang</span>, graduating in <span className="font-medium">2024</span> with a GPA of <span className="font-medium">3.42</span>.
              </p>
            </motion.div>
          </div>

          {/* Left - Profile Image (Bottom Left) */}
          <motion.div
            className="absolute left-0 bottom-0 flex flex-col justify-start items-start pl-8 lg:pl-12 pb-20 md:pb-24"
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
              <motion.a
                href="https://github.com/ddiko105"
                target="_blank"
                rel="noopener noreferrer"
                className={iconStyle}
                whileHover={{ scale: 1.2, rotate: 12 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <Github size={20} />
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
                <Linkedin size={20} />
              </motion.a>
              <motion.a
                href="https://medium.com/@ddiko105"
                target="_blank"
                rel="noopener noreferrer"
                className={iconStyle}
                whileHover={{ scale: 1.2, rotate: 12 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
                </svg>
              </motion.a>
            </motion.div>
            <div className="w-full max-w-[228px] aspect-[3/4] overflow-hidden">
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
      </div>
    </div>
  );
};