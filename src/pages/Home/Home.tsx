import { motion, useScroll, useTransform } from "framer-motion";
import { memo, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Projects } from "../Projects/Projects";
import { Contact } from "../Contact/Contact";
import { useAppContext } from "../../context/AppContext";

const editorialEase = [0.22, 1, 0.36, 1];

// --- UNIVERSAL EDITORIAL GRID COMPONENT (Revision 8.0: Optimized On-View Scroll) ---
const EditorialSection = ({ label, heading, children, id, className, bg = "bg-transparent" }: any) => {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{ duration: 1.2, ease: editorialEase }}
      className={`w-full py-10 border-t border-border-primary ${bg} ${className}`}
    >
      <div className="editorial-grid">
        <div className="col-span-12 lg:col-span-3">
          <span className="editorial-label font-normal">{label}</span>
        </div>
        <div className="col-span-12 lg:col-span-4 mt-2 lg:mt-0 lg:pr-20">
          <h2 className="text-[15px] md:text-[16px] leading-relaxed font-normal tracking-tight text-text-primary">
            {heading}
          </h2>
        </div>
        <div className="col-span-12 lg:col-span-4 mt-6 lg:mt-0">
          {children}
        </div>
        <div className="hidden lg:block lg:col-span-1"></div>
      </div>
    </motion.section>
  );
};

export const Home = memo(({ setActiveTab }: { setActiveTab?: (tab: string) => void }) => {
  const { scrollYProgress } = useScroll();
  const heroText = "Making things work, then making them matter.";

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
    <div className="w-full relative bg-white">

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
            style={{ scale: heroScale, opacity: heroOpacity }}
            src="/Hero/5.png"
            alt="Cinematic Portrait"
            className="w-full h-full object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-110"
          />
        </div>
      </section>

      {/* SECTION 2: ABOUT */}
      <EditorialSection label="About" heading="Mokhamad Dwihardik Kusuma Putra / Diko Putra" id="about">
        <div className="space-y-6">
          <p className="text-editorial-body">
            IT Infrastructure Engineer and Web Developer based in Bandung, Indonesia. My work focuses on building digital products, configuring server environments, and managing enterprise networks. I develop software architectures and IT infrastructures to support operational workflows, data accessibility, and system integrations.
          </p>
        </div>
      </EditorialSection>

      {/* SECTION 3: AREAS OF FOCUS */}
      <EditorialSection label="Focus" heading="My technical scope centers on" id="focus">
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
      <EditorialSection label="Experience" heading="Across brands, platforms, and teams." id="experience">
        <div className="space-y-6">
          <p className="text-editorial-body">
            Across infrastructure, web platforms, and digital agency projects. My experience includes developing internal business applications, such as HRIS and project monitoring dashboards, as well as establishing centralized data storage and network infrastructure for corporate environments. Alongside corporate IT roles, I co-manage ScaleUp.Go, a digital agency providing web development and digital transformation services for SMEs.
          </p>
          <p className="text-editorial-body">
            A central part of my work involves configuring centralized servers, implementing network rules, and developing web-based platforms to facilitate team collaboration, data management, and daily business operations.
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
      <section id="works" className="w-full py-10 border-t border-border-primary">
        <div className="w-full">
          <Projects isHome={true} />
        </div>
      </section>

      {/* SECTION 6: BEYOND THE SCREEN */}
      <section id="beyond" className="w-full py-10">
        <div className="w-full aspect-[1920/720] overflow-hidden relative group">
          <motion.img
            initial={{ opacity: 0, scale: 1.1 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2, ease: editorialEase }}
            src="/beyond.jpg"
            alt="Beyond the Screen"
            className="w-full h-full object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-105"
          />

          {/* Text Overlay */}
          <div className="absolute inset-0 flex flex-col justify-center items-center text-black z-10">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 1, ease: editorialEase }}
              className="text-[10px] md:text-[12px] tracking-[0.4em] font-light mb-4"
            >
              Beyond
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 1, ease: editorialEase }}
              className="text-[24px] md:text-[36px] lg:text-[42px] font-normal tracking-tight text-center px-6 mb-8"
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
                className="text-[14px] md:text-[16px] tracking-[0.05em] font-medium border-b border-black/20 pb-1 hover:border-black transition-all duration-300"
              >
                Visual Archive →
              </Link>
              <Link
                to="/exp"
                className="text-[14px] md:text-[16px] tracking-[0.05em] font-medium border-b border-black/20 pb-1 hover:border-black transition-all duration-300"
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