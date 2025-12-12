import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import type { Translations } from "../../translations";
import { galleryPhotos } from "../../utils/preloadImages";

interface GalleryProps {
  t: Translations;
  isDarkMode: boolean;
}

// Fisher-Yates shuffle algorithm
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Shuffle ensuring no image is in the same position
const shuffleWithoutSamePosition = (current: string[], all: string[]): string[] => {
  let shuffled: string[];
  let attempts = 0;
  const maxAttempts = 50;
  
  do {
    shuffled = shuffleArray(all);
    attempts++;
  } while (
    attempts < maxAttempts &&
    shuffled.some((photo, index) => photo === current[index])
  );
  
  return shuffled;
};

export const Gallery = ({ t, isDarkMode }: GalleryProps) => {
  const bgColor = isDarkMode ? "bg-[#0a0a0a]" : "bg-white";
  const textColor = isDarkMode ? "text-[#f5f5f5]" : "text-[#1a1a1a]";
  const textSecondaryColor = isDarkMode ? "text-[#a0a0a0]" : "text-[#666666]";
  const borderColor = isDarkMode ? "border-[#2a2a2a]" : "border-[#e5e5e5]";

  // Photos from preloaded images - shuffled initially
  const [photos, setPhotos] = useState<string[]>(() => shuffleArray(galleryPhotos));
  const [shuffleKey, setShuffleKey] = useState(0);

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

  // Auto-shuffle images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setPhotos((current) => {
        const newPhotos = shuffleWithoutSamePosition(current, galleryPhotos);
        setShuffleKey(prev => prev + 1);
        return newPhotos;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

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
              key={`${index}-${shuffleKey}-${photo}`}
              className="relative group cursor-pointer overflow-hidden"
              style={{ margin: 0, padding: 0 }}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ 
                duration: 0.8, 
                ease: [0.16, 1, 0.3, 1] 
              }}
            >
              <motion.img
                key={`img-${photo}-${shuffleKey}`}
                src={photo}
                alt={`Photo ${index + 1}`}
                className="w-full h-full object-cover group-hover:scale-105"
                style={{ display: 'block', margin: 0, padding: 0 }}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ 
                  duration: 1, 
                  ease: [0.16, 1, 0.3, 1] 
                }}
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

