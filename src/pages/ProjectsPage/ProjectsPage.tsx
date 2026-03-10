import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { Translations } from "../../translations";
import { getProjects, type Language } from "../../data";

interface ProjectsPageProps {
  t: Translations;
  isDarkMode: boolean;
  language: string;
}

export const ProjectsPage = ({ t, isDarkMode, language }: ProjectsPageProps) => {
  const textColor = isDarkMode ? "text-[#f5f5f5]" : "text-[#111111]";
  const textSecondary = isDarkMode ? "text-[#a3a3a3]" : "text-[#666666]";
  const cardBg = isDarkMode ? "bg-[#111111] hover:bg-[#1a1a1a]" : "bg-gray-50 hover:bg-gray-100";
  const borderColor = isDarkMode ? "border-white/10" : "border-black/5";

  const projects = getProjects(language as Language);
  const corporateProjects = projects.filter((p) => p.type === "project");
  const personalProjects = projects.filter((p) => p.type === "personal");

  const ProjectCard = ({ project, index }: { project: any; index: number }) => {
    const isInternal = project.link.startsWith("/");
    const isAnchor = project.link === "#";

    const content = (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.05 }}
        className={`h-full flex flex-col p-4 border ${borderColor} ${cardBg} transition-colors duration-300 group-hover:border-white/20 card-glow`}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
          e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
        }}
      >
        <div className="flex-1 relative z-10">
          <div className="flex justify-between items-start mb-2">
            <span className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 bg-white/10">
              {project.category}
            </span>
            <span className="text-sm text-white/30 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200">↗</span>
          </div>
          <h3 className="text-sm font-bold tracking-tight mb-1.5">{project.title}</h3>
          <p className={`text-[11px] leading-relaxed ${textSecondary} line-clamp-2`}>
            {project.description}
          </p>
        </div>
      </motion.div>
    );

    const linkClasses = `block group ${isAnchor ? "cursor-default" : ""}`;

    if (isInternal) {
      return <Link to={project.link} className={linkClasses}>{content}</Link>;
    }

    return (
      <a
        href={project.link}
        target={!isAnchor ? "_blank" : "_self"}
        rel={!isAnchor ? "noopener noreferrer" : ""}
        className={linkClasses}
        onClick={(e) => isAnchor && e.preventDefault()}
      >
        {content}
      </a>
    );
  };

  return (
    <div className={`h-full ${textColor} flex flex-col overflow-hidden`}>
      <div className="flex-1 px-6 md:px-10 lg:px-16 py-6 md:py-8 flex flex-col overflow-hidden">

        {/* Compact Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-4 md:mb-5"
        >
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tighter mb-1">{t.projects}</h1>
          <p className={`text-xs ${textSecondary} leading-relaxed`}>
            A selection of corporate systems and personal initiatives.
          </p>
        </motion.div>

        {/* Scrollable content area */}
        <div className="flex-1 overflow-y-auto no-scrollbar min-h-0 space-y-5">

          {/* Corporate Projects */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <h2 className="text-xs font-bold tracking-tight uppercase">{t.sectionTitleProject}</h2>
              <div className="h-px flex-1 bg-white/10" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {corporateProjects.map((project, index) => (
                <ProjectCard key={project.title} project={project} index={index} />
              ))}
            </div>
          </div>

          {/* Personal Projects */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <h2 className="text-xs font-bold tracking-tight uppercase">{t.sectionTitlePersonalProject}</h2>
              <div className="h-px flex-1 bg-white/10" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {personalProjects.map((project, index) => (
                <ProjectCard key={project.title} project={project} index={index} />
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
