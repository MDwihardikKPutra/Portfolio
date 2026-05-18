import { useEffect } from "react";

export const useDarkMode = () => {
  const isDarkMode = false;
  
  useEffect(() => {
    // Forcefully remove dark class and clear legacy theme state to ensure Light Mode only
    document.documentElement.classList.remove('dark');
    try {
      localStorage.removeItem("darkMode");
    } catch (e) {
      console.warn("Storage access denied", e);
    }
  }, []);

  const toggleDarkMode = () => {
    // No-op since dark mode is disabled
  };

  return { isDarkMode, toggleDarkMode };
};

