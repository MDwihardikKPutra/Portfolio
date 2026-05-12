import { memo } from "react";
import { motion } from "framer-motion";
import { Gallery } from "./Gallery";

const editorialEase = [0.22, 1, 0.36, 1];

// --- VISUAL ARCHIVE PAGE (Revision 8.73: Dense Full-Bleed Stream) ---
const VisualArchive = memo(() => {
  return (
    <div className="w-full min-h-screen bg-white selection:bg-black selection:text-white font-helvetica">
      
      {/* Header Section - Wide & Symmetrical Grid Alignment */}
      <section className="w-full pt-44 pb-20">
        <div className="editorial-grid">
           <div className="col-span-12 lg:col-span-10 lg:col-start-2 text-left">
              <motion.h1 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: editorialEase }}
                className="text-[32px] md:text-[42px] lg:text-[48px] font-normal tracking-tight leading-tight text-text-primary mb-6"
              >
                Visual Archive.
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-[18px] md:text-[20px] leading-relaxed text-text-primary/70 font-normal max-w-3xl text-justify"
              >
                A personal collection of visual experiments, digital textures, and moments captured through various lenses. Exploring the intersection of digital artifacts and physical reality.
              </motion.p>
           </div>
        </div>
      </section>
      
      {/* HERO IMAGE - Full Bleed */}
      <section className="w-full h-[60vh] md:h-[80vh] overflow-hidden">
         <motion.img 
           initial={{ scale: 1.1, opacity: 0 }}
           animate={{ scale: 1, opacity: 1 }}
           transition={{ duration: 2, ease: editorialEase }}
           src="/Gallery/Photography/imgi_691_b98968177718225.67e0fca617465.jpg" 
           alt="Visual Archive Hero" 
           className="w-full h-full object-cover"
         />
      </section>

      {/* Dense Gallery Stream */}
      <div className="w-full">
        <Gallery />
      </div>

    </div>
  );
});

export default VisualArchive;
