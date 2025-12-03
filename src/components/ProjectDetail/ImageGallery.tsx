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
      className="relative w-full mt-6"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative rounded-lg overflow-hidden">
        <img
          src={images[currentIndex]}
          alt={`${title} - Image ${currentIndex + 1}`}
          className="w-full h-auto object-cover transition-opacity duration-500"
        />
        {images.length > 1 && (
          <>
            <button
              onClick={() => {
                onPrevious();
                handleManualNavigation();
              }}
              className={`absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full transition-colors z-10 ${
                isDarkMode
                  ? "bg-black/50 hover:bg-black/70 text-white"
                  : "bg-white/50 hover:bg-white/70 text-black"
              }`}
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => {
                onNext();
                handleManualNavigation();
              }}
              className={`absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full transition-colors z-10 ${
                isDarkMode
                  ? "bg-black/50 hover:bg-black/70 text-white"
                  : "bg-white/50 hover:bg-white/70 text-black"
              }`}
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}
      </div>
      {images.length > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                onGoToImage(index);
                handleManualNavigation();
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                currentIndex === index
                  ? isDarkMode
                    ? "bg-white w-8"
                    : "bg-black w-8"
                  : isDarkMode
                  ? "bg-white/30"
                  : "bg-black/30"
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

