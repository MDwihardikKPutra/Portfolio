import { motion, AnimatePresence } from "framer-motion";
import { useState, memo, useEffect, useRef, useCallback } from "react";
import { galleryPhotos } from "../../utils/preloadImages";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";

const GalleryCell = memo(({ currentPhoto, className, onClick, style }: { currentPhoto: string, className: string, onClick: (photo: string) => void, style?: any }) => {
  if (!currentPhoto) return null;

  return (
    <div 
      className={`relative group cursor-pointer ${className}`}
      onClick={() => onClick(currentPhoto)}
      style={style}
    >
      <AnimatePresence mode="wait">
        <motion.img
          key={currentPhoto}
          src={currentPhoto}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          draggable={false}
          className="w-full h-full object-contain select-none"
/>
      </AnimatePresence>
    </div>
  );
});

export const Gallery = ({ }: { t: any; isDarkMode: boolean }) => {
  // State for positions based on the user's arrangement (Pixels for smoothness)
  const [photoItems, setPhotoItems] = useState<{ id: number, src: string, x: number, y: number }[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const entry = useIntersectionObserver(containerRef, { threshold: 0.1 });
  const isVisible = !!entry?.isIntersecting;

  // The layout from your screenshot (Converted to screen-relative percentages)
  const baseLayout = [
    { x: 17, y: 7 },
    { x: 42, y: 9 },
    { x: 68, y: 11 },
    { x: 5,  y: 30 },
    { x: 31, y: 37 },
    { x: 57, y: 34 },
    { x: 16, y: 60 },
    { x: 46, y: 60 },
    { x: 74, y: 60 }
  ];

  // Initial Load (One-time)
  useEffect(() => {
    if (!isVisible || photoItems.length > 0) return;

    const initial = galleryPhotos.map((src, i) => {
      const pos = baseLayout[i] || { x: 50, y: 50 };
      return {
        id: i,
        src,
        x: (pos.x / 100) * window.innerWidth,
        y: (pos.y / 100) * window.innerHeight
      };
    });
    setPhotoItems(initial);
  }, [isVisible, photoItems.length]);

  const handleDragEnd = useCallback((id: number, info: any) => {
    setPhotoItems(prev => {
      return prev.map(item => {
        if (item.id === id) {
          // info.offset is the delta from the start of the drag
          return {
            ...item,
            x: item.x + info.offset.x,
            y: item.y + info.offset.y
          };
        }
        return item;
      });
    });
  }, []);

  return (
    <div id="gallery" className="section-full !bg-black !pt-0 relative" style={{ touchAction: 'auto' }}>
      
      <div className="w-full h-full relative">
        <div className="absolute top-10 right-10 flex items-end justify-end z-40 pointer-events-none">
          <div>
            <span className="text-[28px] md:text-[36px] text-white tracking-tight leading-none animate-fade-in">
              <span className="font-bold">Photo</span>
              <span className="font-normal">graph</span>
            </span>
          </div>
        </div>

        <div className="absolute inset-0" ref={containerRef}>

          {photoItems.map((item) => (
            <motion.div 
              key={item.id} 
              drag
              dragMomentum={false}
              onDragEnd={(_, info) => handleDragEnd(item.id, info)}
              whileHover={{ scale: 1.02 }}
              whileDrag={{ zIndex: 100 }}
              className="absolute cursor-grab active:cursor-grabbing z-20 touch-none select-none"
              style={{ 
                left: 0,
                top: 0,
                x: item.x,
                y: item.y,
                width: '20vw'
              }}
            >
              <GalleryCell 
                currentPhoto={item.src}
                className="w-full"
                onClick={() => {}} 
                style={{ maxHeight: '35vh' }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
