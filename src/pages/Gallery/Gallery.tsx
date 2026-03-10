import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import type { Translations } from "../../translations";
import { galleryPhotos } from "../../utils/preloadImages";

interface GalleryProps {
  t: Translations;
  isDarkMode: boolean;
}

export const Gallery = ({ t, isDarkMode }: GalleryProps) => {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  return (
    <div className="h-full bg-[#0a0a0a] text-[#f5f5f5] overflow-hidden w-full flex flex-col">
      <div className="flex-1 px-6 md:px-10 lg:px-16 py-6 md:py-8 flex flex-col overflow-hidden min-h-0">

        {/* Compact Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-4"
        >
          <h1 className="text-2xl sm:text-3xl font-normal tracking-tight mb-1">{t.gallery}</h1>
          <p className="text-xs text-[#a0a0a0]">Click any photo to view it in full size.</p>
        </motion.div>

        {/* Thumbnail Grid */}
        <motion.div
          className="flex-1 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 min-h-0 overflow-hidden content-start"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {galleryPhotos.map((photo, index) => (
            <motion.button
              key={photo}
              onClick={() => setSelectedPhoto(photo)}
              className="relative aspect-square overflow-hidden cursor-pointer group"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: index * 0.03 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <img
                src={photo}
                alt={`Photo ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* ═══════════════════════════════════
          Full-size Photo Popup (fills main)
          ═══════════════════════════════════ */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            className="absolute inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setSelectedPhoto(null)}
          >
            {/* Close hint */}
            <motion.div
              className="absolute top-6 right-6 text-white/60 text-xs tracking-wider uppercase"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Click anywhere to close
            </motion.div>

            {/* Full image */}
            <motion.img
              src={selectedPhoto}
              alt="Full size"
              className="max-w-[90%] max-h-[85%] object-contain shadow-2xl"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
