import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import type { Translations } from "../../translations";
import { galleryPhotos } from "../../utils/preloadImages";
import { X } from "lucide-react";

interface GalleryProps {
  t: Translations;
  isDarkMode: boolean;
}

// Bento grid: 4 cols × 4 rows = 16 cells, 9 items, zero gaps
const bentoLayout = [
  { col: "md:col-span-2", row: "md:row-span-2" },  // 0: large (on md+)
  { col: "col-span-1",    row: "row-span-1" },      // 1: small
  { col: "col-span-1",    row: "row-span-1" },      // 2: small
  { col: "col-span-1",    row: "row-span-1" },      // 3: small
  { col: "col-span-1",    row: "row-span-1" },      // 4: small
  { col: "md:col-span-2", row: "md:row-span-2" },  // 5: large (on md+)
  { col: "col-span-1",    row: "row-span-1" },      // 6: small
  { col: "col-span-1",    row: "row-span-1" },      // 7: small
  { col: "md:col-span-2", row: "row-span-1" },      // 8: wide (on md+)
];

export const Gallery = ({ }: GalleryProps) => {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const displayPhotos = galleryPhotos.slice(0, 9);

  return (
    <div id="gallery" className="section-full flex flex-col items-center justify-center">
      <div className="section-container w-full h-full flex flex-col justify-center">
        
        <header className="mb-4 md:mb-6 flex flex-col items-start text-left">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter uppercase leading-[0.85]">
            Still <br /> Captures
          </h2>
        </header>

        {/* Bento Grid — 4 col, dense, no gaps */}
        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[100px] md:auto-rows-[150px] gap-1.5" style={{ gridAutoFlow: "row dense" }}>
          {displayPhotos.map((photo, index) => {
            const layout = bentoLayout[index];
            return (
              <motion.div
                key={photo}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.04 }}
                viewport={{ once: true }}
                className={`relative overflow-hidden cursor-pointer group ${layout.col} ${layout.row}`}
                onClick={() => setSelectedPhoto(photo)}
              >
                <img
                  src={photo}
                  alt={`Capture ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            className="fixed inset-0 z-[200] bg-white/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-10 cursor-zoom-out"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
          >
            <button 
              className="absolute top-8 right-8 w-12 h-12 flex items-center justify-center border border-black/10 text-black hover:bg-black hover:text-white transition-all rounded-full"
              onClick={() => setSelectedPhoto(null)}
            >
              <X size={20} />
            </button>
            <motion.img
              src={selectedPhoto}
              alt="Full size"
              className="max-w-full max-h-[85vh] object-contain shadow-2xl border border-black/5 p-2 bg-white"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
