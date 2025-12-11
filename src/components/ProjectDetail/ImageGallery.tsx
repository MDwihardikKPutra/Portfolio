import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ImageGalleryProps {
  images: string[];
  currentIndex: number;
  onPrevious: () => void;
  onNext: () => void;
  onGoToImage: (index: number) => void;
  title: string;
  isDarkMode: boolean;
  autoPlayInterval?: number; // dalam milliseconds, default 4000ms (4 detik)
}

export const ImageGallery = ({
  images,
  currentIndex,
  onPrevious,
  onNext,
  onGoToImage,
  title,
  isDarkMode,
  autoPlayInterval = 4000,
}: ImageGalleryProps) => {
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const onNextRef = useRef(onNext);

  // keep ref updated
  useEffect(() => {
    onNextRef.current = onNext;
  }, [onNext]);

  // auto-play logic
  useEffect(() => {
    // skip if single image or paused
    if (images.length <= 1) {
      return;
    }
    
    if (isPaused) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    // cleanup existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // start auto-play
    intervalRef.current = setInterval(() => {
      onNextRef.current();
    }, autoPlayInterval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [images.length, isPaused, autoPlayInterval]);

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  const handleManualNavigation = () => {
    setIsPaused(true);
    // resume after delay
    const resumeTimer = setTimeout(() => {
      setIsPaused(false);
    }, 2000);
    
    return () => clearTimeout(resumeTimer);
  };

  if (!images || images.length === 0) return null;

  return (
    <div
      className="relative w-full h-full flex flex-col min-h-0 overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Image Container */}
      <div 
        className="relative rounded-lg overflow-hidden flex-1 min-h-0 flex items-center justify-center"
      >
        <img
          src={images[currentIndex]}
          alt={`${title} - Image ${currentIndex + 1}`}
          className="w-full h-full object-contain transition-all duration-500 ease-in-out"
        />
        
        {images.length > 1 && (
          <>
            {/* Navigation Buttons */}
            <button
              onClick={() => {
                onPrevious();
                handleManualNavigation();
              }}
              className={`absolute left-2 top-1/2 -translate-y-1/2 p-2.5 rounded-full transition-all duration-200 z-10 ${
                isDarkMode
                  ? "bg-black/80 hover:bg-black text-white backdrop-blur-sm"
                  : "bg-white/80 hover:bg-white text-black backdrop-blur-sm"
              } shadow-lg hover:scale-110`}
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => {
                onNext();
                handleManualNavigation();
              }}
              className={`absolute right-2 top-1/2 -translate-y-1/2 p-2.5 rounded-full transition-all duration-200 z-10 ${
                isDarkMode
                  ? "bg-black/80 hover:bg-black text-white backdrop-blur-sm"
                  : "bg-white/80 hover:bg-white text-black backdrop-blur-sm"
              } shadow-lg hover:scale-110`}
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Image Counter */}
            <div className={`absolute top-3 right-3 px-3 py-1.5 rounded-full text-xs font-medium z-10 ${
              isDarkMode
                ? "bg-black/80 text-white backdrop-blur-sm"
                : "bg-white/80 text-black backdrop-blur-sm"
            } shadow-lg`}>
              {currentIndex + 1} / {images.length}
            </div>
          </>
        )}
      </div>

      {/* Indicator Dots */}
      {images.length > 1 && (
        <div className="flex justify-center items-center gap-2 mt-4 flex-shrink-0">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                onGoToImage(index);
                handleManualNavigation();
              }}
              className={`rounded-full transition-all duration-300 ${
                currentIndex === index
                  ? isDarkMode
                    ? "bg-white h-2 w-8"
                    : "bg-black h-2 w-8"
                  : isDarkMode
                  ? "bg-white/40 h-2 w-2 hover:bg-white/60"
                  : "bg-black/40 h-2 w-2 hover:bg-black/60"
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

