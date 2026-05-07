import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { memo, useRef, useEffect, useState } from "react";
import { Projects } from "../Projects/Projects";
import { Gallery } from "../Gallery/Gallery";
import { Contact } from "../Contact/Contact";

// Optimized Typewriter Animation
const TypewriterText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const characters = text.split("");
  
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: delay * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      },
    },
    hidden: {
      opacity: 0,
    },
  };

  return (
    <motion.div
      style={{ display: "flex", flexWrap: "wrap" }}
      variants={container}
      initial="hidden"
      animate="visible"
      className="mb-2"
    >
      {characters.map((char, index) => (
        <motion.span
          variants={child}
          key={index}
          style={{ display: "inline-block", minWidth: char === " " ? "0.3em" : "auto" }}
        >
          {char}
        </motion.span>
      ))}
    </motion.div>
  );
};

// Optimized Section Wrapper for "On View" rendering
const LazySection = ({ id, className, children, threshold = 0.1 }: { id: string; className: string; children: React.ReactNode; threshold?: number }) => {
  const ref = useRef<HTMLElement>(null);
  const [hasBeenViewed, setHasBeenViewed] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setHasBeenViewed(true);
        observer.disconnect();
      }
    }, { threshold });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <section id={id} ref={ref} className={className}>
      {hasBeenViewed ? children : <div className="w-full h-full bg-white/5 animate-pulse" />}
    </section>
  );
};

export const Home = memo(({ t, setActiveTab }: { t: any; setActiveTab?: (tab: string) => void }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const { scrollYProgress } = useScroll({ container: containerRef });
  
  // Reveal profile only after 3% scroll
  const profileOpacity = useTransform(scrollYProgress, [0, 0.03, 0.08], [0, 0, 1]);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle scaling to fit 1080px design height
  useEffect(() => {
    const handleResize = () => {
      const vh = window.innerHeight;
      const vw = window.innerWidth;
      const targetH = 1080;
      // Disable auto-scaling on mobile to avoid "tiny" elements
      if (vw < 768) {
        setScale(1);
      } else {
        const s = Math.min(1, vh / targetH);
        setScale(s);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Update active tab on scroll
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && setActiveTab) {
          setActiveTab(entry.target.id);
        }
      });
    }, { threshold: 0.2 });

    const sections = containerRef.current?.querySelectorAll('section, [id="home"]');
    sections?.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, [setActiveTab]);



  return (
    <div 
      ref={containerRef} 
      className="h-screen w-full relative overflow-y-auto no-scrollbar bg-white snap-y snap-mandatory"
    >
      {/* SECTION 1: HERO (Interract-Inspired Editorial) */}
      <div id="home" ref={heroRef} className="relative min-h-screen bg-white overflow-hidden flex flex-col items-center justify-center px-6 md:px-20 lg:px-24 snap-start snap-always">
        <div className="w-full max-w-[1600px] flex flex-col md:flex-row items-center justify-between gap-12 z-10">
          <div className="max-w-[1200px] flex flex-col justify-center">
            <h1 className="text-3xl md:text-[3.5vw] font-normal tracking-tight text-black leading-[1.05] cursor-default">
              <TypewriterText text="Personally, Personal." delay={0.5} />
              <TypewriterText text="Evolving the landscape of" delay={1.5} />
              <TypewriterText text="how digital meets humanity." delay={2.5} />
            </h1>
          </div>

          <motion.div 
            initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0% 0 0)" }}
            transition={{ duration: 1.5, delay: 3.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex-shrink-0 w-[30%] min-h-full overflow-hidden"
          >
            <img 
              src="/Hero/5.png"
              alt="Editorial Feature" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
            />
          </motion.div>
        </div>


      </div>

      {/* SECTION 2: PROFILE */}
      <LazySection id="manifesto" className="w-full min-h-screen bg-white text-black flex flex-col items-center justify-start overflow-hidden snap-start snap-always">        
        <motion.div 
          style={{ opacity: profileOpacity }}
          className="w-full max-w-[1600px] px-6 md:px-20 lg:px-24 pt-32 pb-20"
        >
          <div style={{ transform: isMobile ? 'none' : `scale(${scale})`, transformOrigin: 'top center' }} className="w-full md:max-w-[1600px] mx-auto will-change-transform">
          <div className="overflow-hidden py-2 mb-10 md:mb-12">
            <motion.h2 
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-2xl md:text-[2.5vw] lg:text-[3vw] font-normal tracking-tighter leading-[1.1] text-black"
            >
              Profile.
            </motion.h2>
          </div>

          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.1 }}
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.2
                }
              }
            }}
            className="flex flex-col md:flex-row justify-between items-start gap-10 md:gap-20"
          >
            {/* Column 1: Details */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, x: -30 },
                show: { opacity: 1, x: 0, transition: { duration: 0.8 } }
              }}
              className="flex flex-col space-y-6 md:space-y-8 min-w-full md:min-w-[180px]"
            >
              <div className="space-y-1">
                <p className="text-[10px] uppercase tracking-[0.2em] text-black">Identity</p>
                <p className="text-sm font-normal text-black leading-snug">Mokahamad Dwihardik<br />Kusuma Putra/Diko Putra</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] uppercase tracking-[0.2em] text-black">Background</p>
                <p className="text-sm font-normal text-black">Informatics Engineering<br />Polinema</p>
              </div>
            </motion.div>

            {/* Column 2: Bio Main */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, x: -30 },
                show: { opacity: 1, x: 0, transition: { duration: 0.8 } }
              }}
              className="w-full md:flex-1 md:max-w-[320px] space-y-6"
            >
              <p className="text-base md:text-lg font-light text-black leading-relaxed text-justify">
                A multidisciplinary creator dedicated to pushing the boundaries of digital humanity through design and engineering.
              </p>
            </motion.div>

            {/* Column 3: Bio Sub */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, x: -30 },
                show: { opacity: 1, x: 0, transition: { duration: 0.8 } }
              }}
              className="w-full md:flex-1 md:max-w-[320px] space-y-6"
            >
              <p className="text-base md:text-lg font-light text-black leading-relaxed text-justify">
                Bridging the gap between complex logic and raw human emotion, one pixel at a time.
              </p>
            </motion.div>

            {/* Column 4: Essentials */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, x: -30 },
                show: { opacity: 1, x: 0, transition: { duration: 0.8 } }
              }}
              className="flex flex-col space-y-6 md:space-y-8 min-w-full md:min-w-[150px] text-left md:text-right"
            >
              <div className="space-y-1">
                <p className="text-[10px] uppercase tracking-[0.2em] text-black">Role</p>
                <p className="text-sm font-normal text-black">Digital Craftsman</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] uppercase tracking-[0.2em] text-black">Location</p>
                <p className="text-sm font-normal text-black">Jakarta, ID</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Landscape Visual Container */}
          <motion.div 
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: false, amount: 0.2 }}
            className="mt-12 md:mt-20 w-full aspect-[16/10] md:aspect-[21/7] overflow-hidden rounded-sm border border-white/10"
          >
            <img 
              src="/wasnevermeant.png" 
              alt="Profile Visual"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
        </motion.div>
      </LazySection>





      {/* SECTION 3: WORKS */}
      <LazySection id="projects" className="w-full min-h-screen bg-white flex flex-col items-center justify-start snap-start snap-always">
        <div className="w-full max-w-[1600px] px-6 md:px-20 lg:px-24 pt-32 pb-20">
          <div className="scale-container w-full flex flex-col will-change-transform" style={{ transform: isMobile ? 'none' : `scale(${scale})`, transformOrigin: 'top center' }}>
            <div className="w-full mb-12 overflow-hidden py-2">
              <motion.h2 
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="text-2xl md:text-[2.5vw] lg:text-[3vw] font-normal tracking-tighter text-black leading-[1.1]"
              >
                Projects.
              </motion.h2>
            </div>
            <div className="w-full">
              <Projects t={t} language="en" isHome={true} />
            </div>
          </div>
        </div>
      </LazySection>

      {/* SECTION 4: GALLERY */}
      <LazySection id="gallery" className="w-full min-h-screen bg-white flex flex-col items-center justify-start border-t border-black/5 snap-start snap-always">
        <div className="w-full max-w-[1600px] px-6 md:px-20 lg:px-24 pt-32 pb-20">
          <div className="scale-container w-full flex flex-col will-change-transform" style={{ transform: isMobile ? 'none' : `scale(${scale})`, transformOrigin: 'top center' }}>
            <div className="w-full mb-12 overflow-hidden py-2">
              <motion.h2 
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="text-2xl md:text-[2.5vw] lg:text-[3vw] font-normal tracking-tighter text-black leading-[1.1]"
              >
                Visual Archive.
              </motion.h2>
            </div>
            <div className="w-full">
              <Gallery t={t} isDarkMode={false} isHome={true} />
            </div>
          </div>
        </div>
      </LazySection>

      {/* SECTION 5: CONTACT */}
      <LazySection id="contact" className="w-full min-h-screen bg-black text-white flex flex-col items-center justify-start snap-start snap-always">
        <div className="w-full max-w-[1600px] px-6 md:px-20 lg:px-24 pt-32 pb-20">
          <div className="scale-container w-full flex items-center justify-center will-change-transform" style={{ transform: isMobile ? 'none' : `scale(${scale})`, transformOrigin: 'top center' }}>
            <Contact t={t} isDarkMode={true} />
          </div>
        </div>
      </LazySection>
    </div>
  );
});