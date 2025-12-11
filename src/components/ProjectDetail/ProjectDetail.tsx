import { ArrowLeft } from "lucide-react";
import { ToggleButtons } from "../Header/ToggleButtons";
import type { Project } from "../../data";
import type { Translations } from "../../translations";
import { PGESystemDetail } from "./PGESystemDetail";

interface ProjectDetailProps {
  project: Project;
  projectIndex: number;
  t: Translations;
  isDarkMode: boolean;
  language: "en" | "id";
  currentImageIndex: number;
  onBack: () => void;
  onDarkModeToggle: () => void;
  onLanguageToggle: () => void;
  onPreviousImage: () => void;
  onNextImage: () => void;
  onGoToImage: (index: number) => void;
}

export const ProjectDetail = ({
  project,
  projectIndex,
  t,
  isDarkMode,
  language,
  currentImageIndex,
  onBack,
  onDarkModeToggle,
  onLanguageToggle,
  onPreviousImage,
  onNextImage,
  onGoToImage,
}: ProjectDetailProps) => {
  const textColor = isDarkMode ? "text-[#f5f5f5]" : "text-[#1a1a1a]";
  const accentColor = isDarkMode ? "text-[#666666]" : "text-[#999999]";
  const descColor = isDarkMode ? "text-[#a0a0a0]" : "text-[#666666]";
  const borderColor = isDarkMode ? "border-[#2a2a2a]" : "border-[#e5e5e5]";

  return (
    <div className={`relative w-full h-full flex flex-col min-h-0 ${textColor}`}>
      {/* Header with Back Button and Toggle */}
      <div className="flex items-start justify-between mb-6 flex-shrink-0">
        <button
          onClick={onBack}
          className={`inline-flex items-center gap-2 text-sm font-medium transition-all duration-300 hover:gap-3 ${descColor} hover:${textColor.replace("text-", "")}`}
        >
          <ArrowLeft
            size={16}
            className="transition-transform duration-300 group-hover:-translate-x-1"
          />
          {t.backToProjects}
        </button>
        <div className="z-10">
          <ToggleButtons
            isDarkMode={isDarkMode}
            onDarkModeToggle={onDarkModeToggle}
            language={language}
            onLanguageToggle={onLanguageToggle}
            position="absolute"
          />
        </div>
      </div>

      {/* Main Content - 3 Column Layout */}
      <div className="flex-1 min-h-0 overflow-hidden">
        {projectIndex === 1 ? (
          <PGESystemDetail
            t={t}
            isDarkMode={isDarkMode}
            project={project}
            currentImageIndex={currentImageIndex}
            onPreviousImage={onPreviousImage}
            onNextImage={onNextImage}
            onGoToImage={onGoToImage}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 lg:gap-8 h-full items-stretch">
            {/* Column 1 - Category & Tags */}
            <div className="md:col-span-4 flex flex-col h-full justify-start px-2 md:px-3">
              <div className="flex flex-col space-y-4">
                <span className={`text-xs font-medium tracking-wider uppercase transition-colors ${accentColor}`}>
                  {project.category}
                </span>
                {project.tags && project.tags.length > 0 && (
                  <div className="flex flex-col gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
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

            {/* Column 2 - Title & Description */}
            <div className="md:col-span-6 flex flex-col items-start justify-between h-full px-2 md:px-3">
              <div className="flex flex-col space-y-3 w-full">
                <h1 className="text-xl md:text-2xl lg:text-3xl font-light leading-[1.1] tracking-[-0.02em]">
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
                <p className={`text-xs md:text-sm leading-relaxed transition-colors ${descColor}`}>
                  {project.description}
                </p>
              </div>
            </div>

            {/* Column 3 - Image */}
            <div className="md:col-span-2 flex flex-col h-full justify-start px-2 md:px-3">
              {project.images && project.images.length > 0 && (
                <div className="w-full aspect-[4/3] overflow-hidden bg-[#1a1a1a] dark:bg-[#0a0a0a]">
                  <img
                    src={project.images[0] || project.image || ""}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

