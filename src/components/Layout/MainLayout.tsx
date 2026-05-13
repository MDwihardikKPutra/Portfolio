import { ReactNode } from "react";
import { Navbar } from "../Navigation/Navbar";
import { CustomCursor } from "../Shared/CustomCursor";

interface MainLayoutProps {
  children: ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const MainLayout = ({
  children,
  activeTab,
  setActiveTab,
}: MainLayoutProps) => {

  return (
    <div className="w-full min-h-screen relative font-['Plus_Jakarta_Sans']">
      <CustomCursor />
      
      {/* Navigation */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />

      {/* Main Content Area */}
      <main className="w-full">
        {children}
      </main>
    </div>
  );
};
