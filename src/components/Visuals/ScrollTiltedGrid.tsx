import { motion } from "framer-motion";
import { useMemo, memo } from "react";
import { galleryPhotos } from "../../utils/preloadImages";

export const DEFAULT_GRID_IMAGES: readonly string[] = galleryPhotos;

// --- TickerCard (Visual-First, High-Performance 3D Frame) ---
const TickerCard = memo(({ src, index }: { src: string; index: number }) => {
  return (
    <motion.div
      whileHover={{
        scale: 1.15,
        y: -12,
        z: 80,
        zIndex: 50,
        transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
      }}
      className="relative shrink-0 bg-neutral-950 overflow-hidden rounded-[3px] cursor-pointer shadow-2xl transition-shadow duration-300 hover:shadow-text-primary/10 will-change-transform group"
      style={{
        transformStyle: "preserve-3d",
        width: "clamp(650px, 80vw, 1500px)",
        aspectRatio: "16/9",
        outline: "1px solid transparent",
        backfaceVisibility: "hidden",
      }}
    >
      {/* Cover Image - Smooth 12% Magnification & Spot exposure */}
      <img
        src={src}
        alt={`Visual Frame ${index}`}
        className="w-full h-full object-cover opacity-65 group-hover:opacity-100 group-hover:scale-112 transition-all duration-700 ease-out will-change-transform"
        loading="lazy"
        decoding="async"
      />

      {/* Editorial Shadow Vignette & Label */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6 select-none">
        <span className="text-[9px] font-mono tracking-widest text-text-primary/50 uppercase">ARCHIVE STREAM</span>
        <h4 className="text-sm font-normal tracking-tight font-helvetica text-text-primary mt-1">
          SHOT {((index % 12) + 1).toString().padStart(2, "0")}
        </h4>
      </div>
    </motion.div>
  );
});

TickerCard.displayName = "TickerCard";

// --- ScrollTiltedGridProps ---
export type ScrollTiltedGridProps = {
  images?: readonly string[];
  className?: string;
};

// --- Main ScrollTiltedGrid (High-Performance 3D Panoramic Ticker) ---
export const ScrollTiltedGrid = memo(({
  images = DEFAULT_GRID_IMAGES,
  className,
}: ScrollTiltedGridProps = {}) => {

  // Create infinite buffer stream
  const doubleImages = useMemo(() => [...images, ...images], [images]);

  return (
    <section className={`w-full bg-black pt-12 pb-0 select-none relative overflow-hidden ${className || ""}`}>
      <div className="w-full flex flex-col justify-center">
        
        {/* Editorial Subtitle & Main Header */}
        <div className="w-full px-4 md:px-8 lg:px-12 mb-4 flex flex-col gap-1.5 z-20">
          <h3 className="text-[32px] md:text-[42px] lg:text-[48px] font-normal tracking-tight leading-tight text-text-primary">
            Visual.
          </h3>
        </div>

        {/* 3D Viewport Area - Pulled up to perfectly sit right below the heading */}
        <div 
          className="w-full overflow-hidden pt-0 pb-0 mt-[-220px] relative flex items-center"
          style={{ perspective: "750px" }}
        >
          {/* Inject a dedicated style tag for native, no-reset play-state pausing */}
          <style>{`
            @keyframes tiltMarquee {
              0% { transform: translate3d(-25%, 0, 0); }
              100% { transform: translate3d(-75%, 0, 0); }
            }
            .tilt-marquee-track {
              animation: tiltMarquee 38s linear infinite;
            }
            .tilt-marquee-track:hover {
              animation-play-state: paused;
            }
          `}</style>

          {/* Left Cinematic Lens - Edge Vignette & Smooth Progressive Lens Bokeh Blur */}
          <div 
            className="absolute top-0 left-0 bottom-0 w-[25%] bg-gradient-to-r from-black via-black/40 to-transparent z-30 pointer-events-none backdrop-blur-[8px]" 
            style={{
              WebkitMaskImage: "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.7) 30%, rgba(0,0,0,0) 100%)",
              maskImage: "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.7) 30%, rgba(0,0,0,0) 100%)"
            }}
          />

          {/* Right Cinematic Lens - Edge Vignette & Smooth Progressive Lens Bokeh Blur */}
          <div 
            className="absolute top-0 right-0 bottom-0 w-[25%] bg-gradient-to-l from-black via-black/40 to-transparent z-30 pointer-events-none backdrop-blur-[8px]" 
            style={{
              WebkitMaskImage: "linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0.7) 30%, rgba(0,0,0,0) 100%)",
              maskImage: "linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0.7) 30%, rgba(0,0,0,0) 100%)"
            }}
          />

          {/* Majestic 3D tilted belt plane - Clean layout and elegant quiet luxury depth angles */}
          <div
            style={{
              transform: "rotateX(6deg) rotateY(-12deg)",
              transformStyle: "preserve-3d",
            }}
            className="relative z-10 w-max"
          >
            {/* Loop marquee sliding track - slides smoothly inside the 3D coordinate system */}
            <div className="tilt-marquee-track flex flex-row gap-8 md:gap-12 w-max">
              {doubleImages.map((src, i) => (
                <TickerCard
                  key={`${i}-${src}`}
                  src={src}
                  index={i}
                />
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
});

ScrollTiltedGrid.displayName = "ScrollTiltedGrid";
