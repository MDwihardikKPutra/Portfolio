import { ReactNode } from "react";
import { Navbar } from "../Header/Navbar";
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
  activeTab,
  setActiveTab,
}: MainLayoutProps) => {

  return (
    <div className="h-screen w-full bg-black text-white flex flex-col overflow-hidden">
      
      {/* Navbar - Fixed or Absolutely positioned to not interfere with Snap height */}
      <div className="fixed top-0 left-0 w-full z-[100]">
        <Navbar 
          t={t} 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
        />
      </div>

      {/* Main Content Area - This is where the snap container will be injected via children */}
      <main className="flex-1 w-full h-full relative z-10">
        {children}
      </main>

    </div>
  );
};
