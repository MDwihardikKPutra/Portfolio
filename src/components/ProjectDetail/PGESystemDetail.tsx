import { ImageGallery } from "./ImageGallery";
import type { Project } from "../../data";
import type { Translations } from "../../translations";

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
  const descColor = isDarkMode ? "text-[#a0a0a0]" : "text-[#666666]";
  const borderColor = isDarkMode ? "border-[#2a2a2a]" : "border-[#e5e5e5]";

  // Shortened text helper
  const getShortText = (text: string, sentences: number = 1) => {
    const parts = text.split(". ");
    if (parts.length > sentences) {
      return parts.slice(0, sentences).join(". ") + ".";
    }
    return text;
  };

  // More aggressive text shortening for compact layout
  const getCompactText = (text: string, maxLength: number = 80) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + "...";
  };

  return (
    <div className="flex flex-col h-full min-h-0 overflow-hidden">
      {/* Top Section: 3x3 Grid (20% height) */}
      <div className="flex-[0.2] min-h-0 overflow-hidden mb-4">
        <div className="grid grid-cols-3 grid-rows-2 gap-3 md:gap-4 h-full">
          {/* Row 1 */}
          <div className="flex flex-col space-y-2">
            <div>
              <h2 className="text-sm font-medium mb-1 text-left">
                {t.background}
              </h2>
              <p className={`text-[10px] leading-tight transition-colors ${descColor}`}>
                {getCompactText(getShortText(t.pgeBackground, 1), 60)}
              </p>
            </div>
            <div>
              <h2 className="text-sm font-medium mb-1 text-left">
                {t.problems}
              </h2>
              <p className={`text-[10px] leading-tight transition-colors ${descColor}`}>
                {getCompactText(getShortText(t.pgeProblems, 1), 60)}
              </p>
            </div>
          </div>

          <div className="flex flex-col space-y-2">
            <div>
              <h2 className="text-sm font-medium mb-1 text-left">
                {t.solutions}
              </h2>
              <p className={`text-[10px] leading-tight transition-colors ${descColor}`}>
                {getCompactText("Nine core modules: Work, Leave, SPD, Purchase & Vendor Payment, Approval Center, Project Management, User & Role Management, Notifications, EAR module.", 60)}
              </p>
            </div>
            <div>
              <h2 className="text-sm font-medium mb-1 text-left">
                {t.developmentProcess}
              </h2>
              <p className={`text-[10px] leading-tight transition-colors ${descColor}`}>
                {getCompactText("Comprehensive planning, requirements gathering, system design documentation with ERD and flowcharts.", 60)}
              </p>
            </div>
          </div>

          <div className="flex flex-col space-y-2">
            <div>
              <h2 className="text-sm font-medium mb-1 text-left">
                {t.finalOutput}
              </h2>
              <p className={`text-[10px] leading-tight transition-colors ${descColor}`}>
                {getCompactText(getShortText(t.pgeOutput, 1), 60)}
              </p>
            </div>
            <div>
              <h2 className="text-sm font-medium mb-1 text-left">
                {t.pgeTechStackTitle}
              </h2>
              <div className="space-y-1">
                <p className={`text-[10px] leading-tight transition-colors ${descColor}`}>
                  {getCompactText(t.pgeTechStack.backend.split(":")[1], 60)}
                </p>
                <p className={`text-[10px] leading-tight transition-colors ${descColor}`}>
                  {getCompactText(t.pgeTechStack.frontend.split(":")[1], 60)}
                </p>
                <p className={`text-[10px] leading-tight transition-colors ${descColor}`}>
                  {getCompactText(t.pgeTechStack.packages.split(":")[1], 60)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Full Width Carousel (80% height) */}
      <div className="flex-[0.8] min-h-0 overflow-hidden">
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
      </div>
    </div>
  );
};

