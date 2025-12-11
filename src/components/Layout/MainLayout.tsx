import { ReactNode } from "react";
import { NavigationColumn } from "../NavigationColumn/NavigationColumn";
import { Cursor } from "../Cursor/Cursor";
import type { Translations } from "../../translations";

interface MainLayoutProps {
  children: ReactNode;
  t: Translations;
  isDarkMode: boolean;
}

export const MainLayout = ({ children, t, isDarkMode }: MainLayoutProps) => {
  return (
    <div
      className={`h-screen h-[100dvh] transition-colors duration-500 overflow-hidden fixed inset-0 w-full ${
        isDarkMode ? "bg-[#0a0a0a] text-[#f5f5f5]" : "bg-white text-[#1a1a1a]"
      }`}
      style={{ overflowY: 'hidden', overflowX: 'hidden' }}
    >
      {/* Custom Cursor */}
      <Cursor isDarkMode={isDarkMode} />

      {/* Navigation - Fixed Position */}
      <NavigationColumn t={t} isDarkMode={isDarkMode} />

      {/* Page Content */}
      <div className="h-full w-full overflow-hidden">
        {children}
      </div>
    </div>
  );
};
