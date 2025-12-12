import { useState, useEffect } from "react";

export const useDarkMode = () => {
  // Initialize with localStorage, default to light mode
  const getInitialMode = (): boolean => {
    if (typeof window === 'undefined') return false;
    
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode !== null) {
      return savedMode === "true";
    }
    
    // Default to light mode
    return false;
  };

  const [isDarkMode, setIsDarkMode] = useState(getInitialMode);

  useEffect(() => {
    // Apply dark mode class to document for better compatibility
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const newMode = !prev;
      localStorage.setItem("darkMode", newMode.toString());
      return newMode;
    });
  };

  return { isDarkMode, setIsDarkMode, toggleDarkMode };
};

