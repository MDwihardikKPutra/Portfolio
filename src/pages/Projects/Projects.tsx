import { motion, AnimatePresence } from "framer-motion";
import { memo, useState, useEffect, useRef } from "react";
import { BackToConstellation } from "../../components/Navigation/BackToConstellation";
import { getProjects } from "../../data";
import type { Translations, Language } from "../../translations";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";

const ProjectImageSlideshow = ({ images, autoPlay = true }: { images: string[]; autoPlay?: boolean }) => {
  const [index, setIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const entry = useIntersectionObserver(containerRef, { threshold: 0.1 });
  const isVisible = !!entry?.isIntersecting;

  useEffect(() => {
    if (images.length <= 1 || !isVisible || !autoPlay) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [images.length, isVisible, autoPlay]);

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

export const Projects = memo(({ t, language, isHome = false }: { t: any; language: string; isHome?: boolean }) => {
  const projects = getProjects(language as Language);
  const [activeFilter, setActiveFilter] = useState<"all" | "project" | "personal">("personal");
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3;

  const allFiltered = projects.filter(
    p => activeFilter === "all" || p.type === activeFilter
  );
  
  const totalPages = Math.ceil(allFiltered.length / itemsPerPage);
  const paginatedProjects = allFiltered.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  // Reset page when filter changes
  useEffect(() => {
    setCurrentPage(0);
  }, [activeFilter]);

  // Automatic page cycling when in view
  const containerRef = useRef<HTMLDivElement>(null);
  const entry = useIntersectionObserver(containerRef, { threshold: 0.5 });
  const isVisible = !!entry?.isIntersecting;

  useEffect(() => {
    if (totalPages <= 1 || !isVisible) return;

    const timer = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % totalPages);
    }, 8000); // 8 seconds per page

    return () => clearInterval(timer);
  }, [totalPages, isVisible]);

  return (
    <div id="projects" ref={containerRef} className="w-full bg-white flex flex-col">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: false, amount: 0.1 }}
        className={`flex-1 w-full flex flex-col px-4 md:px-8 lg:px-12 ${isHome ? 'py-4' : 'py-12'}`}
      >
        
        {/* Header: Filters + Pagination */}
        <div className="flex items-center justify-between mb-4">
          {/* Internal Filter Tabs */}
          <div className="flex items-center gap-8">
            <button 
              onClick={() => setActiveFilter("personal")}
              className={`text-[11px] font-bold tracking-widest transition-all ${activeFilter === "personal" ? "text-black border-b border-black" : "text-black/20"}`}
            >
              Personal
            </button>
            <button 
              onClick={() => setActiveFilter("project")}
              className={`text-[11px] font-bold tracking-widest transition-all ${activeFilter === "project" ? "text-black border-b border-black" : "text-black/20"}`}
            >
              Commercial
            </button>
            <button 
              onClick={() => setActiveFilter("all")}
              className={`text-[11px] font-bold tracking-widest transition-all ${activeFilter === "all" ? "text-black border-b border-black" : "text-black/20"}`}
            >
              All
            </button>
          </div>

          {/* Pagination Numbers */}
          <div className="flex items-center gap-4">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i)}
                className={`text-[11px] font-bold tracking-widest transition-all ${currentPage === i ? "text-black underline underline-offset-4" : "text-black/20"}`}
              >
                {String(i + 1).padStart(2, '0')}
              </button>
            ))}
          </div>
        </div>
        
        {/* Balanced Flexbox Layout - Responsive Height */}
        <div className={`flex flex-col md:flex-row gap-6 w-full ${isHome ? '' : 'pb-12'}`}>
          <div className="flex-[2] min-h-[400px] md:min-h-[600px]">
            <AnimatePresence mode="wait">
              {paginatedProjects.slice(0, 1).map((project) => {
                const projectImages = project.images || (project.image ? [project.image] : []);
                return (
                  <motion.div
                    key={project.title}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: "linear" }}
                    className="relative overflow-hidden group w-full h-full"
                  >
                    <div className="w-full h-full transition-all duration-1000 ease-in-out scale-100 group-hover:scale-105">
                      <ProjectImageSlideshow images={projectImages} autoPlay={!isHome} />
                    </div>
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex items-center justify-center">
                      <div className="text-center p-8">
                        <span className="text-[10px] font-bold text-white/40 tracking-[0.4em] mb-4 block">{project.category}</span>
                        <h3 className="text-2xl md:text-4xl font-black text-white tracking-tighter">{project.title}</h3>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          <div className="flex-[1] flex flex-col gap-6">
            <AnimatePresence mode="wait">
              {paginatedProjects.slice(1, 3).map((project, i) => {
                const projectImages = project.images || (project.image ? [project.image] : []);
                return (
                  <motion.div
                    key={project.title}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: "linear" }}
                    className="relative overflow-hidden group flex-1 w-full min-h-[290px]"
                  >
                    <div className="w-full h-full transition-all duration-1000 ease-in-out scale-100 group-hover:scale-105">
                      <ProjectImageSlideshow images={projectImages} autoPlay={!isHome} />
                    </div>
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex items-center justify-center">
                      <div className="text-center p-4">
                        <span className="text-[8px] font-bold text-white/40 tracking-[0.4em] mb-2 block">{project.category}</span>
                        <h3 className="text-lg md:text-2xl font-black text-white tracking-tighter">{project.title}</h3>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
            
            {/* Placeholder for empty slots to maintain layout consistency */}
            {paginatedProjects.length === 2 && (
              <div className="flex-1 w-full bg-black/[0.02] border border-dashed border-black/5" />
            )}
            {paginatedProjects.length === 1 && (
              <>
                <div className="flex-1 w-full bg-black/[0.02] border border-dashed border-black/5" />
                <div className="flex-1 w-full bg-black/[0.02] border border-dashed border-black/5" />
              </>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
});
