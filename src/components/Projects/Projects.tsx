import { ArrowRight } from "lucide-react";
import type { Translations } from "../../translations";
import type { Project } from "../../data";

interface ProjectsProps {
  t: Translations;
  isDarkMode: boolean;
  projects: Project[];
  onProjectClick: (index: number) => void;
}

export const Projects = ({
  t,
  isDarkMode,
  projects,
  onProjectClick,
}: ProjectsProps) => {
  const borderClass = isDarkMode ? "border-[#2a2a2a]" : "border-[#e5e5e5]";
  const categoryColor = isDarkMode ? "text-[#666666]" : "text-[#999999]";
  const descColor = isDarkMode ? "text-[#a0a0a0]" : "text-[#666666]";
  const arrowColor = isDarkMode ? "text-[#666666] group-hover:text-[#f5f5f5]" : "text-[#999999] group-hover:text-[#1a1a1a]";

  return (
    <div
      id="work"
      className={`pb-16 border-b mb-16 transition-colors ${borderClass}`}
    >
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl md:text-3xl font-medium">{t.selectedWork}</h2>
        <span className={`text-xs font-medium tracking-wider uppercase transition-colors ${categoryColor}`}>
          {t.projects}
        </span>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {projects.map((project, idx) => {
          const imageUrl = project.images?.[0] || project.image || "";
          const words = project.title.split(" ");

          return (
            <button
              key={idx}
              onClick={() => onProjectClick(idx)}
              className="group block hover-lift w-full text-left"
            >
              <div className="space-y-4">
                <div className="aspect-[4/3] overflow-hidden rounded-lg bg-[#1a1a1a] dark:bg-[#0a0a0a]">
                  <img
                    src={imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-medium tracking-wider uppercase transition-colors ${categoryColor}`}>
                      {project.category}
                    </span>
                    <ArrowRight
                      size={16}
                      className={`transition-all duration-300 group-hover:translate-x-2 group-hover:scale-110 ${arrowColor}`}
                    />
                  </div>
                  <h3 className="text-lg font-light tracking-[-0.02em]">
                    {words.map((word, i) => {
                      if (i === 0) {
                        return (
                          <span key={i} className="font-medium">
                            {word}
                          </span>
                        );
                      }
                      if (i === words.length - 1) {
                        return (
                          <span key={i}>
                            {" "}
                            <span className="italic">{word}</span>
                          </span>
                        );
                      }
                      return <span key={i}> {word}</span>;
                    })}
                  </h3>
                  <p className={`text-sm leading-relaxed transition-colors ${descColor}`}>
                    {project.description}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

