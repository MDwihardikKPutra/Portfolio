import { Projects as ProjectsComponent } from "../../components/Projects/Projects";
import { getProjects } from "../../data";
import type { Translations } from "../../translations";

interface ProjectsProps {
  t: Translations;
  isDarkMode: boolean;
  language: string;
}

export const Projects = ({ t, isDarkMode, language }: ProjectsProps) => {
  const projects = getProjects(language);
  return (
    <div className={`h-screen h-[100dvh] transition-colors duration-300 overflow-hidden w-full ${
      isDarkMode ? "bg-[#0a0a0a]" : "bg-white"
    }`}>
      <ProjectsComponent t={t} isDarkMode={isDarkMode} projects={projects} />
    </div>
  );
};