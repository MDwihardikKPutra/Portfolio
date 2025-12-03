import { Globe, Sun, Moon } from "lucide-react";

interface ToggleButtonsProps {
  isDarkMode: boolean;
  onDarkModeToggle: () => void;
  language: "en" | "id";
  onLanguageToggle: () => void;
  position?: "absolute" | "relative";
}

export const ToggleButtons = ({
  isDarkMode,
  onDarkModeToggle,
  language,
  onLanguageToggle,
  position = "absolute",
}: ToggleButtonsProps) => {
  let positionClasses = "relative inline-flex gap-4";
  if (position === "absolute") {
    positionClasses = "absolute top-6 right-6 z-10";
  }

  const buttonBaseStyle = isDarkMode
    ? "bg-[#2a2a2a] text-[#f5f5f5] hover:bg-[#3a3a3a] active:bg-[#3a3a3a]"
    : "bg-[#f5f5f5] text-[#1a1a1a] hover:bg-[#e5e5e5] active:bg-[#e5e5e5]";

  return (
    <div className={positionClasses}>
      <button
        onClick={onLanguageToggle}
        className={`p-2.5 sm:p-3 rounded-full transition-all duration-300 hover-scale ${buttonBaseStyle}`}
        aria-label="Toggle language"
      >
        <Globe size={18} className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
      </button>
      <button
        onClick={onDarkModeToggle}
        className={`p-2.5 sm:p-3 rounded-full transition-all duration-300 hover-scale hover:rotate-180 ${buttonBaseStyle}`}
        aria-label="Toggle dark mode"
      >
        {isDarkMode ? (
          <Sun size={18} className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
        ) : (
          <Moon size={18} className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
        )}
      </button>
    </div>
  );
};

