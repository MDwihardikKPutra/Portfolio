import { motion } from "framer-motion";
import { Mail, Github, Linkedin } from "lucide-react";
import type { Translations } from "../../translations";
import { socialLinks } from "../../data";

interface ContactProps {
  t: Translations;
  isDarkMode: boolean;
}

export const Contact = ({ t, isDarkMode }: ContactProps) => {
  const bgColor = isDarkMode ? "bg-[#0a0a0a]" : "bg-white";
  const textColor = isDarkMode ? "text-[#f5f5f5]" : "text-[#1a1a1a]";
  const textSecondaryColor = isDarkMode ? "text-[#a0a0a0]" : "text-[#666666]";
  const accentColor = isDarkMode ? "text-[#666666]" : "text-[#999999]";
  const borderColor = isDarkMode ? "border-[#2a2a2a]" : "border-[#e5e5e5]";
  const buttonBg = isDarkMode ? "bg-[#f5f5f5]" : "bg-[#1a1a1a]";
  const buttonText = isDarkMode ? "text-[#0a0a0a]" : "text-[#f5f5f5]";
  const iconColor = isDarkMode ? "text-[#666666]" : "text-[#999999]";
  const iconHoverColor = isDarkMode ? "hover:text-[#f5f5f5]" : "hover:text-[#1a1a1a]";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <div className={`h-screen h-[100dvh] ${bgColor} ${textColor} relative overflow-hidden w-full`}>
      {/* Main Content */}
      <div className="relative h-full w-full flex items-center justify-center px-8 lg:px-12 pb-20 md:pb-24">
        <motion.div
          className="max-w-[1400px] w-full mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column - Title (Random Position) */}
            <motion.div
              className="lg:col-span-5 lg:col-start-2 relative"
              variants={itemVariants}
            >
              <div>
                <motion.h1
                  className={`flex flex-wrap items-center gap-x-3 md:gap-x-4 gap-y-2 ${textColor}`}
                  initial="hidden"
                  animate="visible"
                  variants={containerVariants}
                >
                  {/* Trying */}
                  <motion.span
                    className={`text-[clamp(1.75rem,4.5vw,3.5rem)] font-light tracking-[-0.04em] leading-none inline-flex items-center`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.6 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    Trying
                  </motion.span>

                  {/* to do */}
                  <motion.span
                    className={`text-[clamp(1.75rem,4.5vw,3.5rem)] font-light ${textColor} tracking-[-0.04em] leading-none inline-flex items-center`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    to do
                  </motion.span>

                  {/* better */}
                  <motion.span
                    className={`text-[clamp(1.75rem,4.5vw,3.5rem)] font-medium tracking-[-0.04em] leading-none inline-flex items-center`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    better
                  </motion.span>
                </motion.h1>
              </div>
            </motion.div>

            {/* Right Column - Contact Info (Random Position) */}
            <motion.div
              className="lg:col-span-5 lg:col-start-8"
              variants={itemVariants}
            >
              {/* Email Button & Social Links */}
              <motion.div
                className="flex flex-wrap items-center justify-start gap-4 md:gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                {/* Email Button */}
                <motion.a
                  href="mailto:ddiko105@gmail.com"
                  className={`inline-flex items-center justify-center gap-3 px-8 py-4 ${buttonBg} ${buttonText} rounded-full text-[clamp(0.875rem,1.3vw,1rem)] font-medium transition-all duration-300 group`}
                  whileHover={{ scale: 1.05, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Mail size={20} className="group-hover:rotate-12 transition-transform flex-shrink-0" />
                  {t.getInTouch}
                </motion.a>

                {/* Social Links */}
                <div className="flex items-center justify-center gap-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${iconColor} ${iconHoverColor} transition-colors flex items-center justify-center`}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        delay: 0.7 + index * 0.1,
                        type: "spring",
                        stiffness: 200,
                      }}
                      whileHover={{ 
                        scale: 1.3,
                        rotate: index % 2 === 0 ? 12 : -12,
                      }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {social.icon === "github" && <Github size={22} />}
                      {social.icon === "linkedin" && <Linkedin size={22} />}
                      {social.icon === "medium" && (
                        <svg
                          width="22"
                          height="22"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
                        </svg>
                      )}
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Footer - Bottom Right (Random Position) */}
          <motion.div
            className={`absolute bottom-8 right-8 lg:right-12 ${accentColor} text-xs`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <p>{t.copyright}</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
