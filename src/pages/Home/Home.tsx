import { motion } from "framer-motion";
import { useState } from "react";
import type { Translations } from "../../translations";

interface HomeProps {
  t: Translations;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  toggleLanguage: () => void;
  language: string;
}

export const Home = ({ t, isDarkMode, toggleDarkMode, toggleLanguage, language }: HomeProps) => {
  const [isImageHovered, setIsImageHovered] = useState(false);
  const bgColor = isDarkMode ? "bg-[#0a0a0a]" : "bg-white";
  const textColor = isDarkMode ? "text-[#f5f5f5]" : "text-[#1a1a1a]";
  const textSecondaryColor = isDarkMode ? "text-white" : "text-black";

  return (
    <div className={`h-full ${bgColor} ${textColor} relative overflow-hidden flex flex-col w-full transition-colors duration-300`}>
      {/* Main Content */}
      <div className="flex-1 flex items-center px-4 sm:px-6 md:px-8 lg:px-12 pb-20 md:pb-24 min-h-0 pt-12 sm:pt-16">
        <div className="max-w-[1400px] w-full mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            
            {/* Left Column - Text Content */}
            <div className="space-y-6">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
              >
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-tight mb-4 sm:mb-6">
                  <motion.span 
                    className="block cursor-default"
                    whileHover={{ x: 5, transition: { duration: 0.2 } }}
                  >
                    {t.firstName}
                  </motion.span>
                  <motion.span 
                    className="block cursor-default"
                    whileHover={{ x: 5, transition: { duration: 0.2 } }}
                  >
                    {t.lastName}
                  </motion.span>
                </h1>
              </motion.div>

              {/* Body Text */}
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <motion.p 
                  className={`text-[0.7875rem] leading-relaxed text-justify ${textSecondaryColor} cursor-default`}
                  whileHover={{ opacity: 0.8, transition: { duration: 0.2 } }}
                >
                  {(() => {
                    const boldTexts = ["Lab School UM", t.statePolytechnicMalang, "Informatics Engineering", "Teknik Informatika"];
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
                </motion.p>
              </motion.div>
            </div>

            {/* Right Column - Profile Image */}
            <div className="flex justify-center lg:justify-end mt-6 lg:mt-0">
              <motion.div
                className="w-full max-w-[250px] sm:max-w-[300px] lg:max-w-[400px]"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <motion.img
                  src="/home.jpeg"
                  alt="Mokhamad Dwihardik Kusuma Putra"
                  className={`w-full h-auto object-contain cursor-pointer transition-all duration-300 ${
                    isImageHovered ? "grayscale-0" : "grayscale"
                  }`}
                  whileHover={{ 
                    scale: 1.05,
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                  onMouseEnter={() => setIsImageHovered(true)}
                  onMouseLeave={() => setIsImageHovered(false)}
                  transition={{ duration: 0.3 }}
                  onError={(e) => {
                    e.currentTarget.src = "https://via.placeholder.com/500x667";
                  }}
                />
              </motion.div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};