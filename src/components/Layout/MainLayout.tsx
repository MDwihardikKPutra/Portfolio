import { ReactNode } from "react";
import { NavigationColumn } from "../NavigationColumn/NavigationColumn";
import { ToggleButtons } from "../Header/ToggleButtons";
import type { Translations } from "../../translations";

interface MainLayoutProps {
  children: ReactNode;
  t: Translations;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  toggleLanguage: () => void;
  language: string;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const MainLayout = ({
  children,
  t,
  isDarkMode,
  toggleDarkMode,
  toggleLanguage,
  language,
  activeTab,
  setActiveTab,
}: MainLayoutProps) => {
  const isHome = activeTab === "home";

  return (
    <div
      className={`h-[100dvh] w-full flex items-center justify-center p-0 md:p-6 lg:p-10 overflow-hidden transition-colors duration-300 bg-white text-[#f5f5f5] grain-overlay`}
    >
      <div
        className="relative w-full max-w-[1600px] h-full overflow-hidden transition-colors duration-300 grid grid-cols-1 md:grid-cols-[1fr_auto] bg-[#0a0a0a] shadow-xl border border-white/[0.06]"
      >
        {/* Main Content Area */}
        <main className="relative flex-1 h-full overflow-hidden flex flex-col no-scrollbar pb-16 md:pb-0">

          {/* Home background image — always rendered but visibility toggled */}
          <div className={`absolute inset-0 z-0 h-full w-full pointer-events-none select-none transition-opacity duration-500 ${isHome ? "opacity-100" : "opacity-0"}`}>
            <img
              src="/home.jpeg"
              alt="Background"
              className="absolute inset-0 w-full h-full object-cover object-[center_top] -scale-x-100"
            />
            <div className="absolute inset-0 bg-black/80" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>

          {/* Toggle buttons */}
          <div className="relative z-50">
            <ToggleButtons
              t={t}
              isDarkMode={isDarkMode}
              toggleDarkMode={toggleDarkMode}
              toggleLanguage={toggleLanguage}
              language={language}
            />
          </div>

          {/* Page content */}
          <div className="flex-1 w-full flex flex-col relative z-10 min-h-0">
            {children}
          </div>
        </main>

        {/* Sidebar Nav Column */}
        <NavigationColumn
          t={t}
          isDarkMode={isDarkMode}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>
    </div>
  );
};
