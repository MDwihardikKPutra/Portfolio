import { motion, AnimatePresence } from "framer-motion";
import { useState, memo, useEffect, useRef } from "react";
import { galleryPhotos } from "../../utils/preloadImages";
import { X } from "lucide-react";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";

const GalleryCell = memo(({ spanClass, currentPhoto, onClick }: { spanClass: string, currentPhoto: string, onClick: (photo: string) => void }) => {
  if (!currentPhoto) return null;

  return (
    <div 
      className={`relative overflow-hidden group bg-gray-100 cursor-pointer ${spanClass} md:row-span-1`}
      onClick={() => onClick(currentPhoto)}
    >
      {/* Overlapping Crossfade Slideshow */}
      <AnimatePresence initial={false}>
        <motion.img
          key={currentPhoto}
          src={currentPhoto}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
        />
      </AnimatePresence>
    </div>
  );
});

export const Gallery = memo(({ }: { t: any; isDarkMode: boolean }) => {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [photos, setPhotos] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const entry = useIntersectionObserver(containerRef, { threshold: 0.1 });
  const isVisible = !!entry?.isIntersecting;

  useEffect(() => {
    // Initial slice
    setPhotos(galleryPhotos.slice(0, 9));

    // Optimized Derangement Shuffle (Guarantees NO photo stays in its current slot with O(n) complexity)
    const shuffleArray = (array: string[]) => {
      let result = [...array];
      const n = result.length;
      
      // 1. Standard Fisher-Yates Shuffle
      for (let i = n - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
      }

      // 2. Deterministic Derangement Correction
      // If any item matches its original position, swap it with its neighbor
      for (let i = 0; i < n; i++) {
        if (result[i] === array[i]) {
          const next = (i + 1) % n;
          [result[i], result[next]] = [result[next], result[i]];
        }
      }
      
      return result;
    };

    if (!isVisible) return;

    const timer = setInterval(() => {
      setPhotos((prev) => (!prev.length ? galleryPhotos.slice(0, 9) : shuffleArray(prev)));
    }, 6000); // Perfect mass synchronization

    return () => clearInterval(timer);
  }, [isVisible]);

  // Fixed Structural Blueprint (Classic 6-col Masonry)
  const spans = [
    "md:col-span-2", "md:col-span-2", "md:col-span-2", // R1
    "md:col-span-3", "md:col-span-3",                  // R2
    "md:col-span-1", "md:col-span-1", "md:col-span-2", "md:col-span-2" // R3
  ];

  return (
    <div id="gallery" ref={containerRef} className="section-full flex flex-col items-center justify-center bg-white !pt-0" style={{ willChange: "transform" }}>
      
      {/* 
        Micro-Panoramic Gallery Container
        Matched to Projects scale (0.75) for consistent typographic weight.
      */}
      <div className="w-full h-[70vh] flex flex-col px-4 md:px-8 max-w-[2600px] mx-auto transform scale-[0.75] origin-center transition-transform duration-700">
        
        {/* Cinematic Section Header */}
        <div className="w-full flex items-end justify-between mb-4">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col"
          >
            <h2 className="text-[32px] md:text-[40px] text-black tracking-tight leading-none">
              <span className="font-black">Self </span>
              <span className="font-normal">Titled</span>
            </h2>
          </motion.div>

          {/* Right-aligned meta label */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-[32px] md:text-[40px] font-normal text-black tracking-tight leading-none">
              Photograph
            </span>
          </motion.div>
        </div>

        {/* Panoramic Gallery Strip */}
        <div className="w-full flex-1 bg-white flex flex-col justify-center relative shadow-2xl shadow-black/[0.03] overflow-hidden rounded-sm" style={{ willChange: "contents" }}>
          <div className="w-full h-full">
            
            {/* Mosaic Grid (Rigid Layout) */}
            <div className="h-full overflow-hidden no-scrollbar">
               <div className="grid grid-cols-2 md:grid-cols-6 grid-rows-3 gap-0 h-full">
                  {spans.map((spanClass, i) => (
                    <GalleryCell 
                      key={i} 
                      spanClass={spanClass} 
                      currentPhoto={photos[i]}
                      onClick={setSelectedPhoto} 
                    />
                  ))}
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            className="fixed inset-0 z-[200] bg-white/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-10"
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
              className="max-w-full max-h-[85vh] object-contain shadow-2xl p-2 bg-white"
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
});
