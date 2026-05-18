import { motion, useScroll, useTransform } from "framer-motion";
import { memo, useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Projects } from "../Projects/Projects";
import { Contact } from "../Contact/Contact";
import { useAppContext } from "../../context/AppContext";
import { SmokeBackground } from "../../components/Visuals/SmokeBackground";

const editorialEase = [0.22, 1, 0.36, 1];

// --- UNIVERSAL EDITORIAL GRID COMPONENT (Collapsible Accordion Style) ---
const EditorialSection = ({ 
  label, 
  heading, 
  children, 
  id, 
  className, 
  bg = "bg-transparent",
  isOpen,
  onToggle
}: any) => {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{ duration: 1.2, ease: editorialEase }}
      className={`w-full border-t border-border-primary transition-colors duration-300 hover:bg-black/[0.01] ${bg} ${className}`}
    >
      <div 
        onClick={onToggle}
        className="editorial-grid items-start py-10 cursor-pointer select-none group"
      >
        {/* Left Column: Label */}
        <div className="col-span-12 lg:col-span-3 flex justify-between items-start">
          <span className="editorial-label font-normal">{label}</span>
          {/* Mobile dropdown indicator */}
          <div className="lg:hidden">
            <motion.span 
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.4, ease: editorialEase }}
              className="text-[12px] opacity-60 text-text-primary block"
            >
              ↓
            </motion.span>
          </div>
        </div>

        {/* Middle Column: Heading */}
        <div className="col-span-12 lg:col-span-4 mt-2 lg:mt-0 lg:pr-20">
          <h2 className="text-[15px] md:text-[16px] leading-relaxed font-normal tracking-tight text-text-primary">
            {heading}
          </h2>
        </div>

        {/* Right Column: Children (Collapsible) */}
        <div 
          onClick={(e) => e.stopPropagation()}
          className="col-span-12 lg:col-span-4 mt-6 lg:mt-0 overflow-hidden cursor-default"
        >
          <motion.div
            initial={false}
            animate={{ 
              height: isOpen ? "auto" : 0,
              opacity: isOpen ? 1 : 0
            }}
            transition={{ duration: 0.5, ease: editorialEase }}
            className="w-full origin-top"
          >
            <div className="pt-2 lg:pt-0">
              {children}
            </div>
          </motion.div>
        </div>

        {/* Desktop dropdown indicator */}
        <div className="hidden lg:flex lg:col-span-1 justify-end items-start pt-1">
          <motion.span 
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.4, ease: editorialEase }}
            className="text-[14px] opacity-40 group-hover:opacity-100 text-text-primary transition-opacity duration-300"
          >
            ↓
          </motion.span>
        </div>
      </div>
    </motion.section>
  );
};

export const Home = memo(({ setActiveTab }: { setActiveTab?: (tab: string) => void }) => {
  const { scrollYProgress } = useScroll();
  const heroText = "Making things work, then making them matter.";

  // Accordion State
  const [openSections, setOpenSections] = useState({
    about: false,      // Default closed
    focus: false,
    experience: false
  });

  const toggleSection = (section: 'about' | 'focus' | 'experience') => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Parallax for cinematic imagery
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.05]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);

  // Section observer for Navbar
  useEffect(() => {
    if (!setActiveTab) return;
    const sections = ["home", "about", "focus", "experience", "works", "beyond", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.4) {
            setActiveTab(entry.target.id);
          }
        });
      },
      { threshold: [0.1, 0.4, 0.7], rootMargin: "-10% 0px -10% 0px" }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [setActiveTab]);

  return (
    <div className="w-full relative bg-bg-primary transition-colors duration-500">

      {/* SCROLL PROGRESS INDICATOR */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[1.5px] bg-text-primary z-[1000] origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* SECTION 1: HERO */}
      <section id="home" className="w-full pt-44 pb-0">
        <div className="flex w-full px-6 md:px-10 mb-12 overflow-visible pb-2">
          <div className="col-span-12">
            <h1 className="text-[28px] md:text-[36px] lg:text-[42px] leading-[1.05] font-normal tracking-tight whitespace-normal md:whitespace-nowrap text-text-primary">
              {heroText.split("").map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: 0.05,
                    delay: index * 0.03,
                    ease: "linear"
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </h1>
          </div>
        </div>

        {/* Panoramic Hero Image */}
        <div className="w-full aspect-[1920/720] overflow-hidden relative group">
          <motion.img
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2, ease: editorialEase, delay: 1 }}
            style={{ scale: heroScale, opacity: heroOpacity, willChange: "transform" }}
            src="/Hero/5.png"
            alt="Cinematic Portrait"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* SECTION 2: ABOUT */}
      <EditorialSection 
        label="About" 
        heading="Mokhamad Dwihardik Kusuma Putra / Diko Putra" 
        id="about"
        isOpen={openSections.about}
        onToggle={() => toggleSection("about")}
      >
        <div className="space-y-6">
          <p className="text-editorial-body">
            IT Infrastructure Engineer and Web Developer based in Bandung, Indonesia. My work focuses on building digital products, configuring server environments, and managing enterprise networks. I develop software architectures and IT infrastructures to support operational workflows, data accessibility, and system integrations.
          </p>
        </div>
      </EditorialSection>

      {/* SECTION 3: AREAS OF FOCUS */}
      <EditorialSection 
        label="Focus" 
        heading="My technical scope" 
        id="focus"
        isOpen={openSections.focus}
        onToggle={() => toggleSection("focus")}
      >
        <div className="flex flex-wrap gap-2.5">
          {[
            "Software Development",
            "API Integration",
            "Network Configuration",
            "Network Security (MikroTik)",
            "VLAN & Firewall Management",
            "Server Administration (Linux)",
            "Storage Management (TrueNAS)",
            "Nextcloud Solutions",
            "Interface Design Implementation",
            "Minimalist & Spatial UI",
            "IT Troubleshooting",
            "Hardware Maintenance"
          ].map((pill, i) => (
            <motion.span
              key={pill}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.8, ease: editorialEase }}
              className="pill-blue cursor-default"
            >
              {pill}
            </motion.span>
          ))}
        </div>
      </EditorialSection>

      {/* SECTION 4: EXPERIENCE */}
      <EditorialSection 
        label="Experience" 
        heading="System administration, network engineering, and web development." 
        id="experience"
        isOpen={openSections.experience}
        onToggle={() => toggleSection("experience")}
      >
        <div className="space-y-6">
          <p className="text-editorial-body">
            My experience covers <strong>web application development</strong> and <strong>IT infrastructure management</strong> for business and operational environments. I develop <strong>web-based systems</strong> and <strong>internal business applications</strong> while also handling <strong>Linux administration</strong>, database configuration, and office network infrastructure (<strong>MikroTik</strong>).
          </p>
          <p className="text-editorial-body">
            In addition, I manage <strong>data storage</strong> and <strong>file-sharing systems</strong> (<strong>TrueNAS</strong>, <strong>Nextcloud</strong>), alongside database and network administration. I also develop <strong>custom web platforms</strong> and <strong>web architectures</strong> for small and medium-sized businesses.
          </p>
          <div className="pt-6">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-editorial"
            >
              Explore Full Resume
            </motion.button>
          </div>
        </div>
      </EditorialSection>

      {/* SECTION 5: WORKS */}
      <section id="works" className="w-full border-t border-border-primary">
        <div className="w-full">
          <Projects isHome={true} />
        </div>
      </section>

      {/* SECTION 6: BEYOND THE SCREEN */}
      <section id="beyond" className="w-full py-10">
        <div className="w-full aspect-[1920/720] overflow-hidden relative group bg-[#030c16]">
          {/* Dynamic WebGL Smoke Canvas */}
          <SmokeBackground smokeColor="#00d2ff" />

          {/* Text Overlay */}
          <div className="absolute inset-0 flex flex-col justify-center items-center text-white z-10 bg-black/10 backdrop-blur-[1px]">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 1, ease: editorialEase }}
              className="text-[10px] md:text-[12px] tracking-[0.4em] font-mono text-[#00d2ff] mb-4"
            >
              Beyond
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 1, ease: editorialEase }}
              className="text-[24px] md:text-[36px] lg:text-[42px] font-normal tracking-tight text-center px-6 mb-8 text-white"
            >
              Making beyond the screen.
            </motion.h2>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1, duration: 1 }}
              className="flex gap-8 md:gap-12"
            >
              <Link
                to="/visual-archive"
                className="text-[14px] md:text-[16px] tracking-[0.05em] font-medium border-b border-white/20 pb-1 hover:border-white text-white transition-all duration-300"
              >
                Visual Archive →
              </Link>
              <Link
                to="/exp"
                className="text-[14px] md:text-[16px] tracking-[0.05em] font-medium border-b border-white/20 pb-1 hover:border-white text-white transition-all duration-300"
              >
                Experimental Space →
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 7: CONTACT */}
      <motion.section
        id="contact"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
        transition={{ duration: 1.5, ease: editorialEase }}
        className="w-full py-10"
      >
        <div className="editorial-grid">
          <div className="col-span-12 lg:col-span-3">
            <span className="editorial-label font-normal">Connect</span>
          </div>
          <div className="col-span-12 lg:col-span-4 mt-2 lg:mt-0 lg:pr-20 space-y-6">
            <h2 className="text-[15px] md:text-[16px] leading-relaxed font-normal tracking-tight text-text-primary">
              Let's build something intentional.
            </h2>
            <p className="text-editorial-body text-[14px] leading-relaxed text-text-primary opacity-60">
              I respond to inquiries within 24 hours. For urgent architectural digital projects, please mention the timeline in the brief.
            </p>
          </div>
          <div className="col-span-12 lg:col-span-4 mt-6 lg:mt-0">
            <Contact showNotice={false} />
          </div>
          <div className="hidden lg:block lg:col-span-1"></div>
        </div>
      </motion.section>

    </div>
  );
});