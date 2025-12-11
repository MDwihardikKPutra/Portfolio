import { motion } from "framer-motion";
import { useState } from "react";
import type { Translations } from "../../translations";
import { galleryPhotos } from "../../utils/preloadImages";

interface GalleryProps {
  t: Translations;
  isDarkMode: boolean;
}

export const Gallery = ({ t, isDarkMode }: GalleryProps) => {
  const bgColor = isDarkMode ? "bg-[#0a0a0a]" : "bg-white";
  const textColor = isDarkMode ? "text-[#f5f5f5]" : "text-[#1a1a1a]";
  const textSecondaryColor = isDarkMode ? "text-[#a0a0a0]" : "text-[#666666]";
  const borderColor = isDarkMode ? "border-[#2a2a2a]" : "border-[#e5e5e5]";

  // Photos from preloaded images
  const [photos] = useState<string[]>(galleryPhotos);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
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
      <div className="h-full w-full flex flex-col pb-20 md:pb-24">
        {/* Gallery Grid - Responsive */}
        <motion.div
          className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 min-h-0 relative overflow-hidden"
          style={{ gap: 0 }}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {photos.map((photo, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative group cursor-pointer overflow-hidden"
              style={{ margin: 0, padding: 0 }}
            >
              <img
                src={photo}
                alt={`Photo ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                style={{ display: 'block', margin: 0, padding: 0 }}
                onError={(e) => {
                  // Fallback to placeholder if image fails to load
                  const target = e.target as HTMLImageElement;
                  target.src = `https://via.placeholder.com/400x400/${isDarkMode ? '1a1a1a' : 'e5e5e5'}/${isDarkMode ? '666666' : '999999'}?text=Photo+${index + 1}`;
                }}
              />
              <div
                className={`absolute inset-0 ${bgColor} opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none`}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

