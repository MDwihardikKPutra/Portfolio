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
// ProjectDetail akan diimport dari file asli dengan konten lengkap
// Untuk sementara, kita akan menggunakan konten dari file asli

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

  // Untuk ProjectDetail, kita akan membuat komponen terpisah yang memuat konten dari file asli
  // File ProjectDetail akan dibuat terpisah dengan semua flowchart lengkap

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode ? "bg-[#0a0a0a] text-[#f5f5f5]" : "bg-white text-[#1a1a1a]"
      }`}
    >
      {/* Project Detail Page - akan menggunakan komponen ProjectDetail terpisah */}
      {selectedProjectData ? (
        <div className="pt-20 pb-20 px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <div
              className={`rounded-2xl transition-all duration-300 relative ${
                isDarkMode ? "bg-[#1a1a1a]" : "bg-white"
              }`}
            >
              {/* Note: ProjectDetail component dengan konten lengkap akan dibuat terpisah */}
              {/* Untuk saat ini, konten ProjectDetail tetap ada di file asli */}
              <div className="p-8">
                <p className="text-center mb-4">
                  Project Detail untuk project "{selectedProjectData.title}" akan
                  menggunakan komponen terpisah dengan konten lengkap dari file asli.
                </p>
                <button
                  onClick={() => setSelectedProject(null)}
                  className={`text-sm underline transition-colors ${
                    isDarkMode
                      ? "text-[#a0a0a0] hover:text-[#f5f5f5]"
                      : "text-[#666666] hover:text-[#1a1a1a]"
                  }`}
                >
                  ← Kembali ke halaman utama
                </button>
              </div>
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
              <div className="absolute top-6 right-6 z-10">
                <ToggleButtons
                  isDarkMode={isDarkMode}
                  onDarkModeToggle={toggleDarkMode}
                  language={language}
                  onLanguageToggle={toggleLanguage}
                  position="absolute"
                />
              </div>
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

