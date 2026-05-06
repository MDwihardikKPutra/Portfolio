import { motion, useScroll, useTransform } from "framer-motion";
import { memo, useRef, useEffect, useState } from "react";
import { Projects } from "../Projects/Projects";
import { Gallery } from "../Gallery/Gallery";
import { Contact } from "../Contact/Contact";
import { PCDVisual } from "../../components/Visuals/PCDVisual";

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

  const heroScroll = useScroll({
    container: containerRef,
    target: heroRef,
    offset: ["start start", "end end"]
  });

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
      className="h-screen w-full relative overflow-y-auto snap-y snap-mandatory no-scrollbar bg-white"
    >
      {/* SECTION 1: HERO (Sticky Still Experience) */}
      <div id="home" ref={heroRef} className="relative h-[200vh]">
        {/* Sticky Container - This stays "still" in the viewport */}
        <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col md:flex-row items-center px-6 md:px-20 lg:px-32">
          
          {/* Visual Container (Top on Mobile, Right on Desktop) */}
          <div className="relative w-full h-[40%] md:h-full md:w-1/2 flex items-center justify-center md:justify-end order-1 md:order-2">
            <div className="w-full max-w-[300px] md:max-w-none md:w-full aspect-square relative will-change-transform" style={{ transform: `scale(${scale})` }}>
              <PCDVisual />
            </div>
          </div>

          {/* Text Container (Bottom on Mobile, Left on Desktop) */}
          <div className="relative w-full h-[60%] md:h-full md:w-[60%] flex flex-col justify-center text-center md:text-left order-2 md:order-1" style={{ transform: `scale(${scale})` }}>
            {/* Box 1: The Titles (Fixed Position) */}
            <div className="relative h-[80px] md:h-[120px] grid grid-cols-1 grid-rows-1 items-center md:items-end mb-4 md:mb-8">
              {/* Step 1 Title */}
              <motion.div 
                style={{ 
                  opacity: useTransform(heroScroll.scrollYProgress, [0, 0.4], [1, 0]),
                  y: useTransform(heroScroll.scrollYProgress, [0, 0.4], [0, -20]),
                  filter: useTransform(heroScroll.scrollYProgress, [0, 0.4], ["blur(0px)", "blur(20px)"]),
                  pointerEvents: useTransform(heroScroll.scrollYProgress, [0, 0.4], ["auto", "none"])
                }}
                className="col-start-1 row-start-1"
              >
                <h1 className="text-5xl md:text-[4.5rem] font-black tracking-tighter text-black leading-[1.1] md:leading-none">
                  Personally, Personal.
                </h1>
              </motion.div>

              {/* Step 2 Title */}
              <motion.div 
                style={{ 
                  opacity: useTransform(heroScroll.scrollYProgress, [0.5, 0.9], [0, 1]),
                  y: useTransform(heroScroll.scrollYProgress, [0.5, 0.9], [20, 0]),
                  filter: useTransform(heroScroll.scrollYProgress, [0.5, 0.9], ["blur(20px)", "blur(0px)"]),
                  pointerEvents: useTransform(heroScroll.scrollYProgress, [0.5, 0.9], ["none", "auto"])
                }}
                className="col-start-1 row-start-1"
              >
                <h2 className="text-5xl md:text-[4.5rem] font-black tracking-tighter text-black leading-[1.1] md:leading-none">
                  Diko Putra.
                </h2>
              </motion.div>
            </div>

            {/* Box 2: The Descriptions (Fixed Position) */}
            <div className="relative h-fit md:h-[100px] grid grid-cols-1 grid-rows-1 items-start px-4 md:px-0">
              {/* Step 1 Desc */}
              <motion.div 
                style={{ 
                  opacity: useTransform(heroScroll.scrollYProgress, [0, 0.4], [1, 0]),
                  y: useTransform(heroScroll.scrollYProgress, [0, 0.4], [0, -10]),
                  filter: useTransform(heroScroll.scrollYProgress, [0, 0.4], ["blur(0px)", "blur(10px)"]),
                }}
                className="col-start-1 row-start-1"
              >
                <p className="text-sm md:text-xl font-light text-black/60 leading-relaxed max-w-[700px]">
                  An exploration of digital humanity. I craft interfaces where logic meets emotion, building products that feel as good as they function.
                </p>
              </motion.div>

              {/* Step 2 Desc */}
              <motion.div 
                style={{ 
                  opacity: useTransform(heroScroll.scrollYProgress, [0.5, 0.9], [0, 1]),
                  y: useTransform(heroScroll.scrollYProgress, [0.5, 0.9], [10, 0]),
                  filter: useTransform(heroScroll.scrollYProgress, [0.5, 0.9], ["blur(10px)", "blur(0px)"]),
                }}
                className="col-start-1 row-start-1"
              >
                <p className="text-sm md:text-xl font-light text-black/60 leading-relaxed max-w-[700px]">
                  Digital Craftsman / Designer / Engineer based in Jakarta. Focused on building high-end digital experiences.
                </p>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Snap Points - These define the scroll positions but are invisible */}
        <div className="absolute top-0 h-screen w-full snap-start pointer-events-none" />
        <div className="absolute top-[100vh] h-screen w-full snap-start pointer-events-none" />
      </div>

      {/* SECTION 2: PROFILE */}
      <LazySection id="manifesto" className="w-full min-h-screen snap-start scroll-mt-[10vh] bg-black text-white flex flex-col justify-start pt-[12vh] md:pt-[20vh] px-4 md:px-20 lg:px-32 pb-20 md:pb-32">
        <div style={{ transform: isMobile ? 'none' : `scale(${scale})` }} className="w-full md:max-w-[1600px] mx-auto will-change-transform">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-[5rem] font-black tracking-tighter leading-none text-white mb-10 md:mb-12"
          >
            Profile.
          </motion.h2>

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
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/40">Identity</p>
                <p className="text-sm font-bold text-white leading-snug">Mokahamad Dwihardik<br />Kusuma Putra</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/40">Background</p>
                <p className="text-sm font-medium text-white/90">Informatics Engineering<br />Polinema</p>
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
              <p className="text-base md:text-lg font-light text-white leading-relaxed text-justify">
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
              <p className="text-base md:text-lg font-light text-white leading-relaxed italic text-justify">
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
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/40">Role</p>
                <p className="text-sm font-bold text-white">Digital Craftsman</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/40">Location</p>
                <p className="text-sm font-medium text-white/90">Jakarta, ID</p>
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
      </LazySection>

      {/* SECTION 3: WORKS */}
      <LazySection id="projects" className="w-full min-h-screen snap-start scroll-mt-[10vh] bg-white flex flex-col items-center justify-start py-20 md:py-32">
        <div className="scale-container w-full flex flex-col justify-center px-4 md:px-20 lg:px-32 will-change-transform" style={{ transform: isMobile ? 'none' : `scale(${scale})` }}>
          <div className="w-full pb-8 md:pb-12">
            <h2 className="text-4xl md:text-[48px] font-black tracking-tighter text-black">Projects.</h2>
          </div>
          <div className="w-full">
            <Projects t={t} language="en" isHome={true} />
          </div>
        </div>
      </LazySection>

      {/* SECTION 4: GALLERY */}
      <LazySection id="gallery" className="w-full min-h-screen snap-start scroll-mt-[10vh] bg-white flex flex-col items-center justify-start py-20 md:py-32 border-t border-black/5">
        <div className="scale-container w-full flex flex-col justify-center will-change-transform" style={{ transform: isMobile ? 'none' : `scale(${scale})` }}>
          <div className="w-full">
            <Gallery t={t} isDarkMode={false} isHome={true} />
          </div>
        </div>
      </LazySection>

      {/* SECTION 5: CONTACT */}
      <LazySection id="contact" className="w-full min-h-screen snap-start scroll-mt-[10vh] bg-black text-white flex items-center justify-center py-20 md:py-32">
        <div className="scale-container w-full flex items-center justify-center will-change-transform" style={{ transform: isMobile ? 'none' : `scale(${scale})` }}>
          <Contact t={t} isDarkMode={true} />
        </div>
      </LazySection>
    </div>
  );
});