import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useAppContext } from "../../context/AppContext";
import { galleryPhotos } from "../../utils/preloadImages";

export const ExpandOnHover = () => {
  const images = useMemo(() => {
    return [...galleryPhotos].sort(() => Math.random() - 0.5).slice(0, 7);
  }, []);

  const [expandedImage, setExpandedImage] = useState(3);
  const { language } = useAppContext();

  const word1 = language === "id" ? "Perspektif" : "Visual";
  const word2 = language === "id" ? "visual" : "perspectives";

  const getImageWidth = (index: number) =>
    index === expandedImage ? "41.6rem" : "6.5rem";

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      }
    }
  };

  const wordVariants = {
    hidden: { 
      opacity: 0, 
      y: 12 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as any
      }
    }
  };

  return (
    <section className="w-full py-16 md:py-24 bg-black border-t border-neutral-900 overflow-hidden">
      {/* Centered Title Header with Staggered Word Reveal */}
      <div className="w-full flex flex-col items-center justify-center text-center mb-12 px-4 md:px-12 overflow-hidden">
        <motion.h2 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-10% 0px -10% 0px" }}
          className="w-full flex flex-wrap justify-center gap-x-[0.3em] text-[9.5vw] sm:text-[7.5vw] md:text-[5.8vw] lg:text-[5.2vw] xl:text-[5.1vw] font-medium tracking-tighter font-helvetica text-text-primary"
        >
          <motion.span variants={wordVariants} className="inline-block">
            {word1}
          </motion.span>
          <motion.span variants={wordVariants} className="inline-block">
            {word2}
          </motion.span>
        </motion.h2>
      </div>

      {/* Accordion Image Strip Wrapper */}
      <div className="relative flex items-center justify-center p-2 transition-all duration-300 ease-in-out w-full">
        <div className="w-full max-w-[1700px] px-4 md:px-12">
          <div className="flex h-full w-full items-center justify-center overflow-hidden">
            <div className="relative w-full overflow-x-auto lg:overflow-visible scrollbar-none py-4">
              <div className="flex w-fit lg:w-full items-center justify-center gap-2 mx-auto">
                {images.map((src, idx) => {
                  const isExpanded = idx + 1 === expandedImage;
                  return (
                    <motion.div
                      key={idx}
                      className="relative cursor-pointer overflow-hidden rounded-[24px] transition-all duration-500 ease-in-out flex-shrink-0"
                      style={{
                        width: getImageWidth(idx + 1),
                        height: "23.4rem",
                      }}
                      onMouseEnter={() => setExpandedImage(idx + 1)}
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* Smooth black overlay for unexpanded images to draw cinematic focus */}
                      <div 
                        className={`absolute inset-0 bg-black transition-opacity duration-500 ease-in-out z-10 pointer-events-none ${
                          isExpanded ? "opacity-0" : "opacity-45 hover:opacity-20"
                        }`}
                      />
                      <img
                        className="w-full h-full object-cover select-none pointer-events-none"
                        src={src}
                        alt={`35mm Archive Image ${idx + 1}`}
                        loading="lazy"
                      />
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
