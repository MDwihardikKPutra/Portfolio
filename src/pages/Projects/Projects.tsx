import { motion } from "framer-motion";
import { projects } from "../../data";

const editorialEase = [0.22, 1, 0.36, 1];

export const Projects = ({ isHome = false }: { isHome?: boolean }) => {
  const displayProjects = isHome 
    ? projects.filter(p => ["Archi Studio", "Smart Finance Tracker", "Oceanus Energy"].includes(p.title)) 
    : projects;

  return (
    <div className="w-full flex flex-col gap-8 md:gap-12">
      {displayProjects.map((project, index) => (
        <motion.div 
          key={project.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
          transition={{ duration: 1.2, ease: editorialEase, delay: index * 0.1 }}
          className="editorial-grid items-start group"
        >
          {/* Column 1: Category Label (3-span) */}
          <div className="col-span-12 lg:col-span-3">
             <span className="editorial-label font-normal" style={{ color: project.accent || 'inherit' }}>
                {project.category}
             </span>
          </div>

          {/* Column 2: Project Title & Tags (4-span) */}
          <div className="col-span-12 lg:col-span-4 lg:pr-20">
            <div className="flex flex-col space-y-1 mb-6">
              <span className="text-[11px] font-normal text-text-primary">{project.year}</span>
              <h3 className="text-[18px] md:text-[20px] font-normal tracking-tight text-text-primary">
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

            <p className="text-editorial-body text-[15px] leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Column 3: Project Preview Image (4-span) */}
          <div className="col-span-12 lg:col-span-4 mt-6 lg:mt-0">
             <a 
               href={project.link} 
               target="_blank" 
               rel="noopener noreferrer"
               className="w-full relative aspect-[16/10] overflow-hidden cursor-pointer block hover:opacity-90 transition-opacity"
             >
               <img 
                 src={project.image || (project.images && project.images[0])} 
                 alt={project.title} 
                 className="w-full h-full object-cover" 
               />
             </a>
          </div>

          {/* Column 4: Right Spacer (1-span) */}
          <div className="hidden lg:block lg:col-span-1"></div>
        </motion.div>
      ))}
    </div>
  );
};
