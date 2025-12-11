import { useState, useEffect } from "react";
import { useDarkMode } from "./hooks/useDarkMode";
import { useLanguage } from "./hooks/useLanguage";
import { translations } from "./translations";
import { getProjects, getSkills } from "./data";
import { Hero } from "./components/Hero/Hero";
import { About } from "./components/About/About";
import { Experience } from "./components/Experience/Experience";
import { Education } from "./components/Education/Education";
import { Projects } from "./components/Projects/Projects";
import { Skills } from "./components/Skills/Skills";
import { Contact } from "./components/Contact/Contact";
import { Footer } from "./components/Footer/Footer";
import { ToggleButtons } from "./components/Header/ToggleButtons";

function App() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const { language, toggleLanguage } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    setCurrentImageIndex(0);
  }, [selectedProject]);

  const t = translations[language];
  const projects = getProjects(language);
  const skills = getSkills(language);
  const selectedProjectData =
    selectedProject !== null ? projects[selectedProject] : null;

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode ? "bg-[#0a0a0a] text-[#f5f5f5]" : "bg-white text-[#1a1a1a]"
      }`}
    >
      {/* Project Detail Page */}
      {selectedProjectData ? (
        <div className="pt-20 pb-20 px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <div
              className={`rounded-2xl transition-all duration-300 relative ${
                isDarkMode ? "bg-[#1a1a1a]" : "bg-white"
              }`}
            >
              {/* TODO: Import ProjectDetail component here */}
              <p className="p-8">
                Project Detail untuk project {selectedProject} akan diimport dari
                komponen ProjectDetail
              </p>
            </div>
          </div>
        </div>
      ) : (
        /* Main Content Card */
        <div className="pt-20 pb-20 px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <div
              className={`rounded-2xl transition-all duration-300 relative ${
                isDarkMode ? "bg-[#1a1a1a]" : "bg-white"
              }`}
            >
              <ToggleButtons
                isDarkMode={isDarkMode}
                onDarkModeToggle={toggleDarkMode}
                language={language}
                onLanguageToggle={toggleLanguage}
              />
              <div className="p-8 md:p-12 lg:p-16">
                <Hero t={t} isDarkMode={isDarkMode} />
                <About t={t} isDarkMode={isDarkMode} />
                <Experience t={t} isDarkMode={isDarkMode} />
                <Education t={t} isDarkMode={isDarkMode} />
                <Projects
                  t={t}
                  isDarkMode={isDarkMode}
                  projects={projects}
                  onProjectClick={setSelectedProject}
                />
                <Skills t={t} isDarkMode={isDarkMode} skills={skills} />
                <Contact t={t} isDarkMode={isDarkMode} />
                <Footer t={t} isDarkMode={isDarkMode} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;



