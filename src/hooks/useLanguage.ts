import { useState, useEffect } from "react";
import type { Language } from "../translations";

export const useLanguage = () => {
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    const saved = localStorage.getItem("language");
    if (saved && (saved === "en" || saved === "id")) {
      setLanguage(saved as Language);
    } else {
      // Ensure default is English if no valid language is saved
      setLanguage("en");
      localStorage.setItem("language", "en");
    }
  }, []);

  const toggleLanguage = () => {
    setLanguage((prev) => {
      const next = prev === "en" ? "id" : "en";
      localStorage.setItem("language", next);
      return next;
    });
  };

  return { language, setLanguage, toggleLanguage };
};

