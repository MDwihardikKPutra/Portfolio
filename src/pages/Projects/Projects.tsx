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

  // HOME LAYOUT: Breathtaking 3-grid full-width preview gallery
  if (isHome) {
    return (
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-0 overflow-hidden relative">
        {displayProjects.map((project) => (
          <a 
            key={project.title}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full relative aspect-[16/10] overflow-hidden cursor-pointer block group bg-[#030c16]"
          >
            <img 
              src={project.image || (project.images && project.images[0])} 
              alt={project.title} 
              className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105" 
            />
            {/* Elegant luxury black hover mask with spaced typography title */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-colors duration-500 flex items-center justify-center">
              <span className="text-white text-[12px] md:text-[13px] uppercase tracking-[0.25em] font-normal opacity-0 group-hover:opacity-100 transform translate-y-3 group-hover:translate-y-0 transition-all duration-500">
                {project.title}
              </span>
            </div>
          </a>
        ))}
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
