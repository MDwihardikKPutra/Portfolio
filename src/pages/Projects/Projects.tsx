import { motion, AnimatePresence } from "framer-motion";
import { memo, useState, useEffect, useRef } from "react";
import { getProjects } from "../../data";
import type { Translations, Language } from "../../translations";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";

const ProjectImageSlideshow = ({ images }: { images: string[] }) => {
  const [index, setIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const entry = useIntersectionObserver(containerRef, { threshold: 0.1 });
  const isVisible = !!entry?.isIntersecting;

  useEffect(() => {
    if (images.length <= 1 || !isVisible) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [images.length, isVisible]);

  return (
    <div ref={containerRef} className="relative w-full h-full" style={{ willChange: "contents" }}>
      <AnimatePresence initial={false}>
        <motion.img
          key={index}
          src={images[index]}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>
    </div>
  );
};

export const Projects = memo(({ t, language }: { t: any; language: string }) => {
  const projects = getProjects(language as Language);

  return (
    <div className="section-full bg-white flex flex-col justify-center items-center !pt-0">
      {/* 
        Micro-Panoramic Container
        High-density miniature look, spanning the full cinematic width.
      */}
      <div className="w-full h-[70vh] flex flex-col px-4 md:px-8 max-w-[2600px] mx-auto transform scale-[0.75] origin-center transition-transform duration-700">
        
        {/* Minimalist Section Title */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col mb-12 self-start text-left items-start"
        >
          <h2 className="text-[32px] md:text-[40px] text-black tracking-tight leading-none flex items-center gap-3">
            <span className="font-black">Project / </span>
            <span className="font-normal">Personal Project</span>
          </h2>
        </motion.div>
        
        {/* Strictly 3 Rows, 4 Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-5 md:grid-rows-3 grid-flow-dense gap-2 md:gap-4 w-full h-full">
          {projects.slice(0, 9).map((project, itemIdx) => {
            const projectImages = project.images || (project.image ? [project.image] : []);
            
            // Bento Compact Spans: 
            // 1 Hero Project (2x2), 8 Supporting Projects (1x1)
            // On mobile, grid is 2 cols, 5 rows. Hero is 2x2, others 1x1. Total 10 cells. Hero=4, others=8. Doesn't fit?
            // Mobile: 2 cols x 5 rows = 10 cells. Hero(2x2=4) + 6 others(1x1=6) = 10. (Wait, we have 9 items. We need 12 cells for mobile? No, auto rows for mobile is better).
            // Let's use auto-rows on mobile, fixed rows on desktop.
            const isHero = itemIdx === 0;
            const spanClass = isHero 
              ? "col-span-2 row-span-2 md:col-span-2 md:row-span-2" 
              : "col-span-1 row-span-1 md:col-span-1 md:row-span-1";

            return (
              <motion.div
                key={itemIdx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-5%" }}
                transition={{ duration: 0.8, delay: itemIdx * 0.05 }}
                className={`relative rounded-sm overflow-hidden group bg-gray-50 flex flex-col ${spanClass}`}
              >
                {/* Background Slideshow */}
                <ProjectImageSlideshow images={projectImages} />

                {/* Subtle Base Gradient */}
                <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-black/80 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Content Overlay */}
                <div className="absolute inset-0 p-4 md:p-6 flex flex-col justify-end pointer-events-none">
                  <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    <div className="flex flex-col gap-1 relative z-10">
                      <span className="text-[8px] md:text-[9px] uppercase font-bold tracking-widest text-white/70">
                        {project.category}
                      </span>
                      <h3 className={`font-bold text-white tracking-tight leading-tight ${isHero ? 'text-2xl md:text-4xl' : 'text-sm md:text-lg'} truncate`}>
                        {project.title}
                      </h3>
                    </div>

                    {/* Expandable Meta */}
                    <div className="mt-2 overflow-hidden h-0 group-hover:h-auto opacity-0 group-hover:opacity-100 transition-all duration-300 relative z-10 pointer-events-auto">
                      <div className="flex items-center justify-between pt-2 border-t border-white/20">
                        <div className="flex flex-wrap gap-1 md:gap-2 max-w-[80%] hidden md:flex">
                          {project.tags.slice(0, isHero ? 3 : 1).map((tag, tIdx) => (
                            <span key={tIdx} className="text-[8px] font-medium px-2 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full whitespace-nowrap">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <a 
                          href={project.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 transition-transform flex-shrink-0 text-xs md:text-sm"
                        >
                          ↗
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
});
