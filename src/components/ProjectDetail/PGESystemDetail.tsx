import { ImageGallery } from "./ImageGallery";
import type { Project } from "../../data";
import type { Translations } from "../../translations";
import { PGESystemFlowchart } from "./PGESystemFlowchart";

interface PGESystemDetailProps {
  t: Translations;
  isDarkMode: boolean;
  project: Project;
  currentImageIndex: number;
  onPreviousImage: () => void;
  onNextImage: () => void;
  onGoToImage: (index: number) => void;
}

export const PGESystemDetail = ({
  t,
  isDarkMode,
  project,
  currentImageIndex,
  onPreviousImage,
  onNextImage,
  onGoToImage,
}: PGESystemDetailProps) => {
  return (
    <article className="max-w-4xl mx-auto">
      {/* Background */}
      <section className="mb-10 md:mb-14">
        <h2 className="text-2xl md:text-3xl font-medium mb-3 text-left">
          {t.background}
        </h2>
        <p
          className={`text-base md:text-lg leading-loose text-justify transition-colors ${
            isDarkMode ? "text-[#a0a0a0]" : "text-[#666666]"
          }`}
        >
          {t.pgeBackground}
        </p>
      </section>

      {/* Problems */}
      <section className="mb-10 md:mb-14">
        <h2 className="text-2xl md:text-3xl font-medium mb-3 text-left">
          {t.problems}
        </h2>
        <p
          className={`text-base md:text-lg leading-loose text-justify transition-colors ${
            isDarkMode ? "text-[#a0a0a0]" : "text-[#666666]"
          }`}
        >
          {t.pgeProblems}
        </p>
      </section>

      {/* Solutions */}
      <section className="mb-10 md:mb-14">
        <h2 className="text-2xl md:text-3xl font-medium mb-3 text-right">
          {t.solutions}
        </h2>
        <p
          className={`text-base md:text-lg leading-loose text-justify transition-colors ${
            isDarkMode ? "text-[#a0a0a0]" : "text-[#666666]"
          }`}
        >
          {t.pgeSolutions}
        </p>
      </section>

      {/* Development Process */}
      <section className="mb-10 md:mb-14">
        <h2 className="text-2xl md:text-3xl font-medium mb-3 text-left">
          {t.developmentProcess}
        </h2>
        <p
          className={`text-base md:text-lg leading-loose text-justify transition-colors mb-4 ${
            isDarkMode ? "text-[#a0a0a0]" : "text-[#666666]"
          }`}
        >
          {t.pgeDevelopmentProcess}
        </p>
        <p
          className={`text-base md:text-lg leading-loose text-justify transition-colors mb-4 ${
            isDarkMode ? "text-[#a0a0a0]" : "text-[#666666]"
          }`}
        >
          {t.pgeDevelopmentProcess2}
        </p>
        <p
          className={`text-base md:text-lg leading-loose text-justify transition-colors mb-6 ${
            isDarkMode ? "text-[#a0a0a0]" : "text-[#666666]"
          }`}
        >
          {t.pgeDevelopmentProcess3}
        </p>

        {/* Flowchart Visualization */}
        <PGESystemFlowchart isDarkMode={isDarkMode} />
      </section>

      {/* Final Output */}
      <section className="mb-10 md:mb-14">
        <h2 className="text-2xl md:text-3xl font-medium mb-3 text-left">
          {t.finalOutput}
        </h2>
        <p
          className={`text-base md:text-lg leading-loose text-justify transition-colors mb-6 ${
            isDarkMode ? "text-[#a0a0a0]" : "text-[#666666]"
          }`}
        >
          {t.pgeOutput}
        </p>
        {project.images && project.images.length > 0 && (
          <ImageGallery
            images={project.images}
            currentIndex={currentImageIndex}
            onPrevious={onPreviousImage}
            onNext={onNextImage}
            onGoToImage={onGoToImage}
            title={project.title}
            isDarkMode={isDarkMode}
          />
        )}
      </section>

      {/* Tech Stack */}
      <section className="space-y-6">
        <h2 className="text-3xl md:text-4xl font-medium mb-6 text-right">
          {t.pgeTechStackTitle}
        </h2>
        <div className="space-y-4">
          <p
            className={`text-sm md:text-base leading-relaxed text-justify transition-colors ${
              isDarkMode ? "text-[#a0a0a0]" : "text-[#666666]"
            }`}
          >
            {t.pgeTechStack.backend}
          </p>
          <p
            className={`text-sm md:text-base leading-relaxed text-justify transition-colors ${
              isDarkMode ? "text-[#a0a0a0]" : "text-[#666666]"
            }`}
          >
            {t.pgeTechStack.frontend}
          </p>
          <p
            className={`text-sm md:text-base leading-relaxed text-justify transition-colors ${
              isDarkMode ? "text-[#a0a0a0]" : "text-[#666666]"
            }`}
          >
            {t.pgeTechStack.packages}
          </p>
        </div>
      </section>
    </article>
  );
};
