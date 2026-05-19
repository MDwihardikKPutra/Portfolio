import { useState } from "react";
import { motion } from "framer-motion";
import { useAppContext } from "../../context/AppContext";
import { galleryPhotos } from "../../utils/preloadImages";

const images = galleryPhotos;

export const ExpandOnHover = () => {
  const [expandedImage, setExpandedImage] = useState(3);
  const { language } = useAppContext();

  const getImageWidth = (index: number) =>
    index === expandedImage ? "41.6rem" : "6.5rem";

  return (
    <section className="w-full py-16 md:py-24 bg-black border-t border-neutral-900 overflow-hidden">
      {/* Centered Title Header */}
      <div className="w-full flex flex-col items-center justify-center text-center mb-12 px-4">
        <h2 className="text-[22px] md:text-[28px] font-light tracking-tight text-text-primary">
          {language === "id" ? "Perspektif visual" : "Visual perspectives"}
        </h2>
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
