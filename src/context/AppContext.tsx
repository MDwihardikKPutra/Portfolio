import React, { createContext, useContext, ReactNode } from "react";
import { useDarkMode } from "../hooks/useDarkMode";
import { useLanguage } from "../hooks/useLanguage";
import { translations, type Translations } from "../translations";

interface AppContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  language: string;
  toggleLanguage: () => void;
  t: Translations;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const { language, toggleLanguage } = useLanguage();
  const t = translations[language];

  return (
    <AppContext.Provider
      value={{
        isDarkMode,
        toggleDarkMode,
        language,
        toggleLanguage,
        t,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
