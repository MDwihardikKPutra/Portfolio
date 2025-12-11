import { ArrowLeft } from "lucide-react";
import { ToggleButtons } from "../Header/ToggleButtons";
import type { Project } from "../../data";
import type { Translations } from "../../translations";

interface ProjectDetailHeaderProps {
  project: Project;
  t: Translations;
  isDarkMode: boolean;
  language: "en" | "id";
  onBack: () => void;
  onDarkModeToggle: () => void;
  onLanguageToggle: () => void;
}

export const ProjectDetailHeader = ({
  project,
  t,
  isDarkMode,
  language,
  onBack,
  onDarkModeToggle,
  onLanguageToggle,
}: ProjectDetailHeaderProps) => {
  return (
    <>
      <ToggleButtons
        isDarkMode={isDarkMode}
        onDarkModeToggle={onDarkModeToggle}
        language={language}
        onLanguageToggle={onLanguageToggle}
        position="absolute"
      />
      <div className="p-8 md:p-12 lg:p-16">
        <button
          onClick={onBack}
          className={`inline-flex items-center gap-2 mb-8 text-sm font-medium transition-all duration-300 hover-underline hover:gap-3 ${
            isDarkMode
              ? "text-[#a0a0a0] hover:text-[#f5f5f5]"
              : "text-[#666666] hover:text-[#1a1a1a]"
          }`}
        >
          <ArrowLeft
            size={16}
            className="transition-transform duration-300 group-hover:-translate-x-1"
          />
          {t.backToProjects}
        </button>
        <div className="space-y-12">
          <div>
            <span
              className={`text-xs font-medium tracking-wider uppercase transition-colors ${
                isDarkMode ? "text-[#666666]" : "text-[#999999]"
              }`}
            >
              {project.category}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light leading-[1.1] tracking-[-0.03em] mt-4 mb-6">
              {project.title.split(" ").map((word, i, arr) => {
                if (i === 0) {
                  return (
                    <span key={i} className="font-medium">
                      {word}
                    </span>
                  );
                } else if (i === arr.length - 1) {
                  return (
                    <span key={i}>
                      {" "}
                      <span className="italic">{word}</span>
                    </span>
                  );
                }
                return <span key={i}> {word}</span>;
              })}
            </h1>
            <p
              className={`text-lg leading-relaxed transition-colors ${
                isDarkMode ? "text-[#a0a0a0]" : "text-[#666666]"
              }`}
            >
              {project.description}
            </p>
          </div>
          {project.tags && project.tags.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {project.tags.map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    isDarkMode
                      ? "bg-[#2a2a2a] text-[#f5f5f5]"
                      : "bg-[#f5f5f5] text-[#1a1a1a]"
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};



