import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { projects } from "../../data";

const editorialEase = [0.22, 1, 0.36, 1];

export const Projects = ({ isHome = false }: { isHome?: boolean }) => {
  const displayProjects = isHome 
    ? projects.filter(p => ["Archi Studio", "Smart Finance Tracker", "Oceanus Energy"].includes(p.title)) 
    : projects;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const nextProject = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % displayProjects.length);
  }, [displayProjects.length]);

  const prevProject = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + displayProjects.length) % displayProjects.length);
  }, [displayProjects.length]);

  // Auto-play logic
  useEffect(() => {
    if (!isHome || isHovered) return;

    const interval = setInterval(() => {
      nextProject();
    }, 5000); // 5 seconds interval

    return () => clearInterval(interval);
  }, [isHome, isHovered, nextProject]);

  const project = displayProjects[currentIndex];

  // HOME LAYOUT: One project at a time with switcher
  if (isHome) {
    return (
      <div 
        className="w-full flex flex-col gap-8 md:gap-12 relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <AnimatePresence mode="wait">
          <motion.div 
            key={project.title}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.8, ease: editorialEase }}
            className="editorial-grid items-start group"
          >
            {/* Column 1: Category Label (3-span) */}
            <div className="col-span-12 lg:col-span-3">
               <span className="editorial-label font-normal" style={{ color: project.accent || 'inherit' }}>
                  {project.category}
               </span>
               
               {/* Desktop Switcher Controls */}
               <div className="hidden lg:flex flex-col gap-4 mt-12">
                  <div className="flex gap-2">
                    {displayProjects.map((_, i) => (
                      <button 
                        key={i}
                        onClick={() => setCurrentIndex(i)}
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                          i === currentIndex ? "bg-text-primary w-6" : "bg-text-primary/20 hover:bg-text-primary/40"
                        }`}
                        aria-label={`Go to project ${i + 1}`}
                      />
                    ))}
                  </div>
                  <div className="flex gap-8 items-center pt-2">
                    <button 
                      onClick={prevProject}
                      className="text-[11px] uppercase tracking-widest text-text-primary/40 hover:text-text-primary transition-colors"
                    >
                      Prev
                    </button>
                    <button 
                      onClick={nextProject}
                      className="text-[11px] uppercase tracking-widest text-text-primary/40 hover:text-text-primary transition-colors"
                    >
                      Next
                    </button>
                  </div>
               </div>
            </div>

            {/* Column 2: Project Title & Tags (4-span) */}
            <div className="col-span-12 lg:col-span-4 lg:pr-20">
              <div className="flex flex-col space-y-1 mb-6">
                <span className="text-[11px] font-normal text-text-primary opacity-40">{project.year}</span>
                <h3 className="text-[24px] md:text-[28px] font-normal tracking-tight text-text-primary leading-tight">
                  {project.title}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2.5 mb-8">
                 {project.tags?.slice(0, 3).map((tag) => (
                   <span key={tag} className="pill-blue text-[10px] md:text-[11px] font-normal">
                     {tag}
                   </span>
                 ))}
              </div>

              <p className="text-editorial-body text-[16px] leading-relaxed mb-8">
                {project.description}
              </p>

              <div className="lg:hidden flex justify-between items-center pt-4 border-t border-border-primary/50">
                 <div className="flex gap-2">
                    {displayProjects.map((_, i) => (
                      <div 
                        key={i}
                        className={`w-1 h-1 rounded-full ${i === currentIndex ? "bg-text-primary" : "bg-text-primary/20"}`}
                      />
                    ))}
                 </div>
                 <div className="flex gap-6">
                    <button onClick={prevProject} className="text-[10px] uppercase tracking-widest">Prev</button>
                    <button onClick={nextProject} className="text-[10px] uppercase tracking-widest">Next</button>
                 </div>
              </div>
            </div>

            {/* Column 3: Project Preview Image (4-span) */}
            <div className="col-span-12 lg:col-span-4 mt-6 lg:mt-0">
               <a 
                 href={project.link} 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="w-full relative aspect-[16/11] overflow-hidden cursor-pointer block hover:opacity-95 transition-all duration-500 bg-surface-secondary shadow-sm"
               >
                 <motion.img 
                   key={project.image}
                   initial={{ scale: 1.1 }}
                   animate={{ scale: 1 }}
                   transition={{ duration: 1.5, ease: editorialEase }}
                   src={project.image || (project.images && project.images[0])} 
                   alt={project.title} 
                   className="w-full h-full object-cover" 
                 />
                 <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
               </a>
            </div>

            {/* Column 4: Right Spacer (1-span) */}
            <div className="hidden lg:block lg:col-span-1"></div>
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }

  // PROJECTS PAGE LAYOUT: High-density 4-column grid
  return (
    <div className="w-full px-6 md:px-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
        {displayProjects.map((project, index) => (
          <motion.div 
            key={project.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-5% 0px -5% 0px" }}
            transition={{ duration: 1, ease: editorialEase, delay: index * 0.05 }}
            className="flex flex-col group"
          >
            {/* Project Image Container */}
            <a 
              href={project.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full aspect-[16/9] overflow-hidden mb-6 block relative bg-surface-secondary"
            >
              <img 
                src={project.image || (project.images && project.images[0])} 
                alt={project.title} 
                className="w-full h-full object-cover transition-all duration-700 ease-editorial group-hover:scale-105" 
              />
              <div className="absolute top-4 left-4">
                 <span className="text-[10px] uppercase tracking-widest text-white/60 font-medium">
                    {project.year}
                 </span>
              </div>
            </a>

            {/* Project Info */}
            <div className="flex flex-col space-y-3">
              <div className="flex flex-col">
                <span className="text-[11px] uppercase tracking-tighter mb-1 opacity-40 font-medium" style={{ color: project.accent }}>
                  {project.category}
                </span>
                <h3 className="text-[18px] font-normal tracking-tight text-text-primary leading-tight">
                  {project.title}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2">
                 {project.tags?.slice(0, 2).map((tag) => (
                   <span key={tag} className="text-[10px] uppercase tracking-tighter text-text-primary/40 border-b border-text-primary/10 pb-0.5">
                     {tag}
                   </span>
                 ))}
              </div>

              <p className="text-[14px] leading-relaxed text-text-primary/60 line-clamp-3">
                {project.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
