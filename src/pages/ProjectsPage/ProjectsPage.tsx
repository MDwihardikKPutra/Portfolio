import { Link } from "react-router-dom";
import type { Translations } from "../../translations";
import { getProjects, type Language } from "../../data";

interface ProjectsPageProps {
  t: Translations;
  isDarkMode: boolean;
  language: string;
}

export const ProjectsPage = ({ t, isDarkMode, language }: ProjectsPageProps) => {
  const bgColor = isDarkMode ? "bg-[#0a0a0a]" : "bg-white";
  const textColor = isDarkMode ? "text-white" : "text-black";
  const dateColor = isDarkMode ? "text-[#999999]" : "text-[#666666]";
  const descColor = isDarkMode ? "text-[#cccccc]" : "text-[#333333]";

  const projects = getProjects(language as Language);

  return (
    <div className={`h-screen h-[100dvh] ${bgColor} ${textColor} overflow-hidden w-full`}>
      <div className="h-full w-full px-4 sm:px-6 md:px-8 lg:px-12 pt-12 sm:pt-16 pb-20 md:pb-24 overflow-y-auto">
        <div className="max-w-[1200px] mx-auto">
          <div>
            <div className="mb-12">
              <h2 className="text-sm sm:text-base font-light mb-6 opacity-60">
                {t.sectionTitleProject}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-12">
                {projects.filter(p => p.type === "project").map((project) => {
                  const isInternal = project.link.startsWith("/");
                  const isAnchor = project.link === "#";

                  const content = (
                    <>
                      <h3 className="text-sm font-bold mb-1.5">
                        {project.title}
                      </h3>
                      <div className={`text-[10px] sm:text-xs mb-1.5 ${dateColor}`}>
                        {project.category}
                      </div>
                      <p className={`text-[10px] sm:text-xs leading-relaxed ${descColor} text-justify`}>
                        {project.description}
                      </p>
                    </>
                  );

                  if (isInternal) {
                    return (
                      <Link
                        key={project.title}
                        to={project.link}
                        className="block group hover:opacity-60 transition-opacity duration-300"
                      >
                        {content}
                      </Link>
                    );
                  }

                  return (
                    <a
                      key={project.title}
                      href={project.link}
                      target={!isAnchor ? "_blank" : "_self"}
                      rel={!isAnchor ? "noopener noreferrer" : ""}
                      className={`block group ${isAnchor ? "cursor-default" : ""} hover:opacity-60 transition-opacity duration-300`}
                      onClick={(e) => isAnchor && e.preventDefault()}
                    >
                      {content}
                    </a>
                  );
                })}
              </div>
            </div>

            <div className="mb-12">
              <h2 className="text-sm sm:text-base font-light mb-6 opacity-60">
                {t.sectionTitlePersonalProject}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-12">
                {projects.filter(p => p.type === "personal").map((project) => {
                  const isInternal = project.link.startsWith("/");
                  const isAnchor = project.link === "#";

                  const content = (
                    <>
                      <h3 className="text-sm font-bold mb-1.5">
                        {project.title}
                      </h3>
                      <div className={`text-[10px] sm:text-xs mb-1.5 ${dateColor}`}>
                        {project.category}
                      </div>
                      <p className={`text-[10px] sm:text-xs leading-relaxed ${descColor} text-justify`}>
                        {project.description}
                      </p>
                    </>
                  );

                  if (isInternal) {
                    return (
                      <Link
                        key={project.title}
                        to={project.link}
                        className="block group hover:opacity-60 transition-opacity duration-300"
                      >
                        {content}
                      </Link>
                    );
                  }

                  return (
                    <a
                      key={project.title}
                      href={project.link}
                      target={!isAnchor ? "_blank" : "_self"}
                      rel={!isAnchor ? "noopener noreferrer" : ""}
                      className={`block group ${isAnchor ? "cursor-default" : ""} hover:opacity-60 transition-opacity duration-300`}
                      onClick={(e) => isAnchor && e.preventDefault()}
                    >
                      {content}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
