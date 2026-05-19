import { useEffect } from "react";

export const useDarkMode = () => {
  const isDarkMode = true;
  
  useEffect(() => {
    // Forcefully add dark class to document element
    document.documentElement.classList.add('dark');
    try {
      localStorage.setItem("darkMode", "true");
    } catch (e) {
      console.warn("Storage access denied", e);
    }
  }, []);

  const toggleDarkMode = () => {
    // No-op since dark mode is strictly enabled
  };

  return { isDarkMode, toggleDarkMode };
};


