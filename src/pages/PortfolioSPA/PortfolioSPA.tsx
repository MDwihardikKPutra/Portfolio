import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Home } from "../Home/Home";
import { ProjectsPage } from "../ProjectsPage/ProjectsPage";
import { ExperiencePage } from "../ExperiencePage/ExperiencePage";
import { Gallery } from "../Gallery/Gallery";
import { Essay } from "../Essay/Essay";
import { Contact } from "../Contact/Contact";

interface PortfolioSPAProps {
    t: any;
    isDarkMode: boolean;
    language: string;
    toggleDarkMode: () => void;
    toggleLanguage: () => void;
    setActiveTab: (tab: string) => void;
}

export const PortfolioSPA = ({
    t,
    isDarkMode,
    language,
    toggleDarkMode,
    toggleLanguage,
    setActiveTab,
}: PortfolioSPAProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const location = useLocation();

    useEffect(() => {
        // Intersection Observer to update the active tab based on scroll position
        const options = {
            root: null, // use viewport, but since we are inside a scrolling container, this might need to be the container itself if using nested scroll.
            // Wait, since MainLayout has the scroll, we can just use rootMargin.
            // Actually, if The <main> tag scrolls, intersection observer with root: null uses the browser viewport, which is fine since the <main> tag is basically the viewport size anyway.
            rootMargin: "-40% 0px -60% 0px", // Trigger when section is in the upper middle of the screen
            threshold: 0,
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveTab(entry.target.id);
                }
            });
        }, options);

        const sections = document.querySelectorAll("section[id]");
        sections.forEach((section) => observer.observe(section));

        return () => {
            sections.forEach((section) => observer.unobserve(section));
        };
    }, [setActiveTab]);

    // Handle direct navigation hash or pathname on initial load
    useEffect(() => {
        const defaultSection = location.pathname.replace("/", "") || "home";
        const element = document.getElementById(defaultSection);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    }, [location.pathname]);

    return (
        <div ref={containerRef} className="flex flex-col w-full">
            <section id="home" className="w-full flex flex-col relative">
                <Home t={t} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} toggleLanguage={toggleLanguage} language={language} />
            </section>

            <section id="experience" className="w-full flex flex-col pt-24 md:pt-32">
                <ExperiencePage t={t} isDarkMode={isDarkMode} language={language} />
            </section>

            <section id="projects" className="w-full flex flex-col pt-24 md:pt-32">
                <ProjectsPage t={t} isDarkMode={isDarkMode} language={language} />
            </section>

            <section id="gallery" className="w-full flex flex-col pt-24 md:pt-32">
                <Gallery t={t} isDarkMode={isDarkMode} />
            </section>

            <section id="essay" className="w-full flex flex-col pt-24 md:pt-32 pb-32">
                <Essay t={t} isDarkMode={isDarkMode} language={language} />
            </section>

            {/* Contact is minimal, usually we just append it to the bottom */}
            <section id="contact" className="w-full flex flex-col pb-32">
                <Contact t={t} isDarkMode={isDarkMode} />
            </section>
        </div>
    );
};
