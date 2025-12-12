import { ReactNode } from "react";
import { NavigationColumn } from "../NavigationColumn/NavigationColumn";
import { Cursor } from "../Cursor/Cursor";
import { ToggleButtons } from "../Header/ToggleButtons";
import type { Translations } from "../../translations";

interface MainLayoutProps {
  children: ReactNode;
  t: Translations;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  toggleLanguage: () => void;
  language: string;
}

export const MainLayout = ({
  children,
  t,
  isDarkMode,
  toggleDarkMode,
  toggleLanguage,
  language,
}: MainLayoutProps) => {
  return (
    <div
      className={`h-screen h-[100dvh] transition-colors duration-300 overflow-hidden fixed inset-0 w-full ${
        isDarkMode ? "bg-[#0a0a0a] text-[#f5f5f5]" : "bg-white text-[#1a1a1a]"
      }`}
      style={{ overflowY: "hidden", overflowX: "hidden" }}
    >
      {/* Custom Cursor */}
      <Cursor isDarkMode={isDarkMode} />

      {/* Toggle Buttons - Fixed Position */}
      <ToggleButtons
        t={t}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        toggleLanguage={toggleLanguage}
        language={language}
      />

      {/* Navigation - Fixed Position */}
      <NavigationColumn t={t} isDarkMode={isDarkMode} />

      {/* Page Content */}
      <div className="h-full w-full overflow-hidden">{children}</div>
    </div>
  );
};
