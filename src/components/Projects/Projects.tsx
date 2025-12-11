import { motion } from "framer-motion";
import type { Translations } from "../../translations";
import type { Project } from "../../data";

interface ProjectsProps {
  t: Translations;
  isDarkMode: boolean;
  projects: Project[];
}

export const Projects = ({ t, isDarkMode, projects }: ProjectsProps) => {
  const textColor = isDarkMode ? "text-[#f5f5f5]" : "text-[#1a1a1a]";
  const categoryColor = isDarkMode ? "text-[#666666]" : "text-[#999999]";
  const descColor = isDarkMode ? "text-[#a0a0a0]" : "text-[#666666]";

  return (
    <div className={`w-full h-full ${textColor}`}>
      <div className="h-full flex flex-col px-8 lg:px-12 pt-8 pb-20 md:pb-24 overflow-y-auto">
        <div className="max-w-[1600px] w-full mx-auto h-full flex flex-col">
          
          {/* Title */}
          <div className="mb-12">
            <h2 className="text-[clamp(2rem,6vw,4rem)] font-medium">
              {t.selectedWork}
            </h2>
          </div>

          {/* Projects List */}
          <div className="space-y-16 flex-1">
            {projects.map((project, idx) => {
              const imageUrl = project.images?.[0] || project.image || "";
              const words = project.title.split(" ");

              return (
                <motion.div
                  key={idx}
                  className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-start"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  {/* Column 1 - Category */}
                  <div className="md:col-span-4">
                    <span className={`text-[clamp(0.625rem,1.2vw,0.75rem)] font-medium tracking-wider uppercase ${categoryColor}`}>
                      {project.category}
                    </span>
                  </div>

                  {/* Column 2 - Title & Description */}
                  <div className="md:col-span-6 flex flex-col space-y-3">
                    <h3 className="text-[clamp(1.125rem,2.5vw,1.5rem)] font-medium">
                      {words.map((word, i) => {
                        if (i === 0) {
                          return <span key={i} className="font-medium">{word} </span>;
                        }
                        if (i === words.length - 1) {
                          return <span key={i} className="italic">{word}</span>;
                        }
                        return <span key={i}>{word} </span>;
                      })}
                    </h3>
                    <p className={`text-[clamp(0.875rem,1.8vw,1rem)] leading-relaxed ${descColor}`}>
                      {project.description}
                    </p>
                  </div>

                  {/* Column 3 - Image */}
                  <div className="md:col-span-2">
                    <div className="aspect-[4/3] w-full overflow-hidden rounded-lg">
                      <img
                        src={imageUrl}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};