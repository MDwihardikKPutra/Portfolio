import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { getProjects } from "../../data";
import { useAppContext } from "../../context/AppContext";

const editorialEase = [0.22, 1, 0.36, 1];

export const Projects = ({ isHome = false }: { isHome?: boolean }) => {
  const { language } = useAppContext();
  const rawProjects = getProjects(language);

  // Filter projects by Home/Page requirements
  const displayProjects = isHome 
    ? rawProjects.filter(p => ["Archi Studio", "Smart Finance Tracker", "Oceanus Energy"].includes(p.title)) 
    : rawProjects;

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // HOME LAYOUT: Premium 3-column auto-sliding carousel
  if (isHome) {
    const [currentIndex, setCurrentIndex] = useState(0);
    
    useEffect(() => {
      const maxIndex = isMobile ? displayProjects.length - 1 : displayProjects.length - 3;
      if (maxIndex <= 0) return;
      const interval = setInterval(() => {
        setCurrentIndex((prev) => {
          if (prev >= maxIndex) return 0;
          return prev + 1;
        });
      }, 4000);
      return () => clearInterval(interval);
    }, [isMobile, displayProjects.length]);

    const translation = -currentIndex * (isMobile ? 100 : 33.3333);

    return (
      <div className="w-full overflow-hidden relative">
        <motion.div 
          animate={{ x: `${translation}%` }}
          transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
          className="flex w-full"
        >
          {displayProjects.map((project) => (
            <a 
              key={project.title}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full md:w-1/3 flex-shrink-0 relative aspect-[16/10] overflow-hidden cursor-pointer block group bg-[#030c16]"
            >
              <img 
                src={project.image || (project.images && project.images[0])} 
                alt={project.title} 
                className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/75 transition-colors duration-500 flex flex-col items-center justify-center p-6 text-center">
                <span 
                  className="w-8 h-[1px] mb-3 opacity-0 group-hover:opacity-100 transition-all duration-700 scale-x-0 group-hover:scale-x-100" 
                  style={{ backgroundColor: project.accent || '#D9A066' }}
                />
                <span className="text-white text-[12px] md:text-[13px] font-bold opacity-0 group-hover:opacity-100 transform translate-y-3 group-hover:translate-y-0 transition-all duration-500 font-helvetica">
                  {project.title}
                </span>
                <span className="text-white text-[10px] mt-1 opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100 font-mono font-semibold">
                  {project.category}
                </span>
              </div>
            </a>
          ))}
        </motion.div>
      </div>
    );
  }

  // DESKTOP LAYOUT: Perfect 16:9 (1920x1080) Grid (Fits exactly 1 page, 0% gaps, 0% single-item rows)
  // Every card is strictly locked to aspect-[16/9] (representing 1920x1080 aspect ratio),
  // dynamically scaling down via percentage widths as a uniform grid to fit exactly 1 scrollbar-free page.
  return (
    <div className="w-full h-[calc(100vh-210px)] select-none px-8 flex items-center justify-center">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 w-full max-w-[1920px] mx-auto">
        {displayProjects.map((project, index) => {
          const imageSrc = project.image || (project.images && project.images[0]);
          const isHovered = hoveredIndex === index;

          return (
            <motion.a
              key={project.title}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="col-span-1 w-full flex flex-col cursor-pointer group overflow-hidden"
              animate={{
                scale: isHovered ? 1.025 : 1,
                zIndex: isHovered ? 20 : 10,
              }}
              transition={{ duration: 0.4, ease: editorialEase }}
            >
              {/* Perfect 16:9 Website Screenshot Preview (strictly aspect-[16/9] matching 1920x1080) */}
              <div className="w-full aspect-[16/9] overflow-hidden bg-neutral-50 dark:bg-neutral-950 relative shadow-sm">
                <img
                  src={imageSrc}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-[1200ms] ease-[0.16,1,0.3,1] group-hover:scale-[1.03]"
                  loading="lazy"
                />
                
                {/* Accent indicator bar on hover */}
                <div 
                  className="absolute bottom-0 left-0 right-0 h-[3px] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                  style={{ backgroundColor: project.accent || "#D9A066" }}
                />
              </div>

              {/* Tiny Elegant Editorial Caption Block (aligned cleanly at the bottom) */}
              <div className="mt-2.5 shrink-0 text-[11px] md:text-[12px] font-normal leading-relaxed text-neutral-950 dark:text-neutral-50 font-sans tracking-wide">
                <span className="font-bold border-b border-transparent group-hover:border-neutral-950 dark:group-hover:border-neutral-50 transition-colors">
                  {project.title}
                </span> 
                <span className="opacity-60 font-mono text-[10px] ml-1.5">{project.category}</span>
              </div>
            </motion.a>
          );
        })}
      </div>
    </div>
  );
};
