import { Experience as ExperienceComponent } from "../../components/Experience/Experience";
import type { Translations } from "../../translations";

interface ExperienceProps {
  t: Translations;
  isDarkMode: boolean;
}

export const Experience = ({ t, isDarkMode }: ExperienceProps) => {
  return (
    <div className={`h-screen h-[100dvh] transition-colors duration-300 overflow-hidden w-full ${
      isDarkMode ? "bg-[#0a0a0a]" : "bg-white"
    }`}>
      <ExperienceComponent t={t} isDarkMode={isDarkMode} />
    </div>
  );
};