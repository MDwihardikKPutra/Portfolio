import { motion, useScroll, useTransform } from "framer-motion";
import { memo, useRef, useEffect } from "react";
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
  const heroText = "Built with clarity, intent, and user experience that truly land.";
  
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
      <EditorialSection label="About" heading="Mokhamad Dwihardik" id="about">
        <div className="space-y-6">
          <p className="text-editorial-body">
            IT Engineer and Design Systems Architect based in Jakarta, Indonesia. With a focus on <span className="font-bold">digital products, design systems, and visual concepts</span>, bringing structure, usability, and collaboration to create work that is clear, scalable, and thoughtfully made.
          </p>
          <p className="text-editorial-body">
            I am currently working with outstanding teams to develop enterprise-scale software architectures that bridge the gap between technical complexity and human experience.
          </p>
        </div>
      </EditorialSection>

      {/* SECTION 3: AREAS OF FOCUS */}
      <EditorialSection label="Focus" heading="My work centers on" id="focus">
        <div className="flex flex-wrap gap-2.5">
           {["Software architecture & infrastructure", "Digital products & interface design", "Design systems & governance", "Technical leadership & mentoring", "Bridging design & technology", "SystemOps & cloud engineering"].map((pill, i) => (
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
            Over the years, I have contributed to websites, apps, campaigns, platforms, and design systems for brands ranging from architecture studios to large-scale energy companies. My work spans both <span className="font-bold">brand-led experiences and enterprise-scale environments</span>, always guided by clarity, craft, and usability.
          </p>
          <p className="text-editorial-body">
            A central part of my work is building systems that help design and technology work more closely together. This includes foundations, components, documentation, governance, and the workflows that enable teams to create with greater consistency and less friction.
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
      <EditorialSection label="Beyond" heading="Making beyond the screen." id="beyond">
        <div className="space-y-6">
           <p className="text-editorial-body">
             Outside digital work, I explore ideas through woodworking, visual experiments, and independent maker projects. 
           </p>
           <p className="text-editorial-body">
             This hands-on practice keeps my work connected to materials, craft, and the physical act of making. It provides a tactile balance to the ephemeral nature of code.
           </p>
           <div className="flex flex-col gap-3 pt-2">
              {["Woodworking Archive →", "Experimental Music →"].map((link) => (
                <motion.a 
                  key={link}
                  href="#" 
                  whileHover={{ x: 5 }}
                  className="text-[12px] font-normal border-b border-text-primary pb-1 w-fit transition-colors hover:text-accent hover:border-accent"
                >
                  {link}
                </motion.a>
              ))}
           </div>
        </div>
      </EditorialSection>

      {/* SECTION 7: CONTACT */}
      <motion.section 
        id="contact" 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
        transition={{ duration: 1.5, ease: editorialEase }}
        className="w-full py-10 border-t border-border-primary"
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