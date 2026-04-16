import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getProjects } from "../../data";
import type { Translations, Language } from "../../translations";
import { Server, Cpu } from "lucide-react";

interface ProjectsPageProps {
  t: Translations;
  language: string;
}

const StarIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className}>
    <path d="M50 0 L55 45 L100 50 L55 55 L50 100 L45 55 L0 50 L45 45 Z" fill="currentColor" />
  </svg>
);

export const ProjectsPage = ({ t, language }: ProjectsPageProps) => {
  const projects = getProjects(language as Language);
  const [activeExp, setActiveExp] = useState<number | null>(null);

  const experiences = [
    { 
      company: t.pgeCompany, 
      role: t.informationTechnologyEngineer, 
      date: t.jun2025Present,
      desc: [t.expDesc1, t.expDesc2, t.expDesc3, t.expDesc4, t.expDesc5, t.expDesc6]
    },
    { 
      company: t.eluxSpaceCompany, 
      role: t.eluxSpacePosition, 
      date: t.eluxSpaceDate,
      desc: [t.eluxSpaceDesc1, t.eluxSpaceDesc2, t.eluxSpaceDesc3]
    },
  ];

  return (
    <div id="work" className="section-full flex flex-col bg-white">
      <div className="section-container w-full flex-1 flex flex-col lg:grid lg:grid-cols-10 gap-6 lg:gap-16 pt-4 lg:pt-12 overflow-hidden">
        
        {/* Left Side: Experience Chronicle (30%) */}
        <div className="hidden lg:flex lg:col-span-3 flex-col h-full pr-8 border-r border-black/5">
          
          {/* Section Title */}
          <div className="mb-10">
            <h2 className="text-4xl font-black tracking-tighter uppercase leading-none text-black">
              Work <br /> Experience
            </h2>
          </div>

          {/* Experience List */}
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {experiences.map((exp, idx) => (
              <div key={idx} className={`border-b border-black/8 last:border-b-0 transition-all duration-200 ${activeExp === idx ? 'border-l-2 border-l-black pl-3' : 'pl-3'}`}>

                {/* Clickable Header */}
                <div
                  className="flex flex-col gap-1.5 py-6 pr-2 cursor-pointer hover:opacity-70 transition-opacity duration-200"
                  onClick={() => setActiveExp(activeExp === idx ? null : idx)}
                >
                  <span className="text-[9px] font-black uppercase tracking-[0.15em] text-black/35">
                    {exp.date}
                  </span>
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="text-[13px] font-black uppercase tracking-tight text-black leading-tight flex-1">
                      {exp.company}
                    </h3>
                    <span className={`text-[11px] font-black text-black/30 transition-transform duration-300 mt-0.5 flex-shrink-0 ${activeExp === idx ? 'rotate-45' : ''}`}>
                      +
                    </span>
                  </div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-black/40">
                    {exp.role}
                  </p>
                </div>

                {/* Collapsible Job Description */}
                <AnimatePresence>
                  {activeExp === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                      className="overflow-hidden"
                    >
                      <ul className="pb-6 pr-2 space-y-3">
                        {exp.desc.map((item, i) => (
                          <li key={i} className="text-[10px] leading-[1.7] text-black/50 font-medium tracking-tight">
                            — {item}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Digital Archive (70%) */}
        <div className="lg:col-span-7 flex flex-col flex-1 min-h-0">
           <div className="mb-4 lg:mb-8 border-b border-black pb-3 lg:pb-4">
              <h2 className="text-2xl font-black tracking-tighter uppercase leading-none text-black">
                 Project Archive
              </h2>
           </div>

           {/* High-Density Focused Grid */}
           <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar grid grid-cols-2 md:grid-cols-3 gap-2 h-fit">
             {projects.map((project, idx) => (
                <motion.a
                  key={idx}
                  href={project.link}
                  target="_blank"
                  className="aspect-video bg-gray-50 relative group overflow-hidden border border-black/5"
                  whileHover={{ scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                >
                  <img 
                    src={project.image || (project.images && project.images[0])} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                  />
                  {/* Hover Info */}
                  <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-center p-4">
                     <span className="text-[8px] font-bold text-white/40 uppercase mb-1">{project.category}</span>
                     <span className="text-[10px] font-black text-white uppercase tracking-widest">{project.title}</span>
                  </div>
                </motion.a>
             ))}
           </div>
        </div>

      </div>
    </div>
  );
};

const ProjectCard = ({ project, index, images, previewTick }: { project: any, index: number, images: string[], previewTick: number }) => {
   const [isHovered, setIsHovered] = useState(false);
   const currentImgIdx = (previewTick + index) % images.length;
   const activeImgIdx = isHovered ? currentImgIdx : 0;

   return (
      <motion.a
         href={project.link}
         target="_blank"
         rel="noopener noreferrer"
         onMouseEnter={() => setIsHovered(true)}
         onMouseLeave={() => setIsHovered(false)}
         initial={{ opacity: 0, y: 10 }}
         whileInView={{ opacity: 1, y: 0 }}
         viewport={{ once: true }}
         transition={{ delay: index * 0.05 }}
         className="group relative aspect-video bg-[#F9F9F9] border border-black/5 overflow-hidden rounded-sm cursor-pointer block"
      >
         <div className="absolute inset-0">
            <AnimatePresence mode="wait">
               <motion.img 
                  key={activeImgIdx}
                  src={images[activeImgIdx] || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop"} 
                  alt={project.title}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
               />
            </AnimatePresence>
         </div>
         
         <div className="absolute inset-x-0 bottom-0 p-4 z-10 bg-white/90 backdrop-blur-sm border-t border-black/5 transform translate-y-[2px] group-hover:translate-y-0 transition-transform duration-300">
            <div className="flex flex-col">
               <span className="text-[8px] font-bold text-black/40 mb-0.5">{project.category}</span>
               <h3 className="text-[11px] font-bold text-black tracking-tight">{project.title}</h3>
            </div>
         </div>
      </motion.a>
   );
};
