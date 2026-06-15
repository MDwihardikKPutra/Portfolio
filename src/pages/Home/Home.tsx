import { motion, useScroll, useTransform } from "framer-motion";
import { memo, useRef, useEffect, useState } from "react";
import { Contact } from "../../components/Contact/Contact";
import { useAppContext } from "../../context/AppContext";
import { GooeyText } from "../../components/Visuals/GooeyText";
import { NebulaFooterBackground } from "../../components/Visuals/GLSLHills";
import { EngineeringLog } from "../../components/Visuals/EngineeringLog";
import { getProjects } from "../../data";
import { PortfolioGallery } from "../../components/Visuals/PortfolioGallery";
import { ConstellationBg } from "../../components/Visuals/ConstellationBg";
import { SystemStatus } from "../../components/Visuals/SystemStatus";
import { ExpandOnHover } from "../../components/Visuals/ExpandOnHover";
import CommunityConnect from "../../components/Visuals/CommunityConnect";


const editorialEase = [0.22, 1, 0.36, 1] as const;

// --- PREMIUM MAGNETIC CURSOR ATTRACTION COMPONENT ---
export function Magnetic({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    // 35% magnetic pull strength
    setPosition({ x: middleX * 0.35, y: middleY * 0.35 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className="w-fit h-fit"
    >
      {children}
    </motion.div>
  );
}

// --- STAGGERED SPRING ANIMATION VARIANTS FOR GRID OBJECTS ---
const staggerParentVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
    }
  }
};

const staggerChildVariants = {
  hidden: { opacity: 0, y: 15, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 220, damping: 18 }
  }
};

export const Home = memo(({ setActiveTab }: { setActiveTab?: (tab: string) => void }) => {
  const { scrollYProgress } = useScroll();
  const { language } = useAppContext();
  const heroText = "Making things work, then making them matter.";

  // Fetch and format real portfolio projects dynamically in active language
  const rawProjects = getProjects(language as any);
  const galleryItems = rawProjects.map(proj => ({
    id: proj.title.toLowerCase().replace(/\s+/g, "-"),
    title: proj.title,
    description: proj.description,
    href: proj.link,
    image: proj.image || (proj.images && proj.images[0]) || "/placeholder-image.png"
  }));

  // Accordion State
  const [openSections, setOpenSections] = useState({
    profile: false      // Default closed
  });

  const toggleSection = (section: 'profile') => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Parallax for cinematic imagery - Dynamic 25% Widescreen Zoom
  const heroScale = useTransform(scrollYProgress, [0, 0.25], [1, 1.25]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);

  // Section observer for Navbar
  useEffect(() => {
    if (!setActiveTab) return;
    const sections = ["home", "profile", "contact"];
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
        <div className="flex w-full px-4 md:px-8 lg:px-12 mb-12 overflow-visible pb-2">
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

        {/* Panoramic Hero Image - Majestic Shutter Opening Reveal */}
        <div className="w-full aspect-[1920/720] overflow-hidden relative group">
          <motion.img
            initial={{ clipPath: "inset(45% 0% 45% 0%)", opacity: 0, scale: 1.05 }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1, scale: 1 }}
            transition={{ duration: 1.8, ease: editorialEase, delay: 0.6 }}
            style={{ scale: heroScale, opacity: heroOpacity, willChange: "transform" }}
            src="/Hero/5.png"
            alt="Cinematic Portrait"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* SECTION 2: PROFILE (COMBINED ABOUT, SCOPE & EXPERIENCE WITH ORIGINAL 3-COLUMN LAYOUT) */}
      <motion.section
        id="profile"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
        transition={{ duration: 1.2, ease: editorialEase }}
        className="w-full border-t border-border-primary transition-colors duration-300 hover:bg-black/[0.005]"
      >
        {/* Accordion Header Row (Full 12-Column Grid) */}
        <motion.div 
          onClick={() => toggleSection("profile")}
          whileHover="hover"
          whileTap={{ scale: 0.995 }}
          transition={{ duration: 0.3, ease: editorialEase }}
          className="editorial-grid items-center py-10 cursor-pointer select-none group origin-center"
        >
          {/* Column 1: Label */}
          <div className="col-span-12 lg:col-span-3 flex justify-between items-center">
            <motion.span 
              variants={{
                hover: { scale: 1.03 }
              }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="editorial-label font-normal origin-left inline-block"
            >
              {language === 'id' ? "Profil" : "Profile"}
            </motion.span>
          </div>

          {/* Column 2: Full Name Heading */}
          <div className="col-span-12 lg:col-span-4 mt-2 lg:mt-0 lg:pr-20">
            <motion.h2 
              variants={{
                hover: { scale: 1.02 }
              }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="text-[15px] md:text-[16px] leading-relaxed font-normal tracking-tight text-text-primary group-hover:text-text-primary/70 transition-colors duration-300 origin-left inline-block"
            >
              Mokhamad Dwihardik Kusuma Putra / Diko Putra
            </motion.h2>
          </div>

          {/* Column 3: Metadata Text & Rotate Arrow Icon */}
          <div className="col-span-12 lg:col-span-5 flex justify-between items-center mt-4 lg:mt-0">
            <motion.span 
              variants={{
                hover: { scale: 1.02 }
              }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="text-[15px] md:text-[16px] leading-relaxed font-normal tracking-tight text-text-primary/40 group-hover:text-text-primary/70 transition-colors duration-300 origin-right inline-block"
            >
              Infrastructure & Web Development
            </motion.span>
            <motion.div 
              animate={{ rotate: openSections.profile ? 180 : 0 }}
              transition={{ duration: 0.4, ease: editorialEase }}
              className="w-8 h-8 rounded-full bg-neutral-900 flex items-center justify-center text-white shadow-sm group-hover:bg-neutral-800 transition-colors duration-300"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="w-3.5 h-3.5 text-white"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </motion.div>
          </div>
        </motion.div>

        {/* Collapsible Area */}
        <div className="overflow-hidden">
          <motion.div
            initial={false}
            animate={{ 
              height: openSections.profile ? "auto" : 0,
              opacity: openSections.profile ? 1 : 0
            }}
            transition={{ duration: 0.6, ease: editorialEase }}
            className="w-full origin-top"
          >
            <div className="pb-10 space-y-12">
              
              {/* SUB-SECTION 1: ABOUT (3-Column Layout) */}
              <div className="editorial-grid pt-10 border-t border-border-primary/30 items-start">
                <div className="col-span-12 lg:col-span-3">
                  <motion.span 
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                    className="editorial-label font-normal origin-left inline-block"
                  >
                    {language === 'id' ? "Tentang" : "About"}
                  </motion.span>
                </div>
                <div className="col-span-12 lg:col-span-4 mt-2 lg:mt-0 lg:pr-20">
                  <motion.h3 
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.2 }}
                    className="text-[15px] md:text-[16px] leading-relaxed font-normal text-text-primary origin-left inline-block"
                  >
                    {language === 'id' ? "Menjembatani sistem & perangkat lunak." : "Bridging software & system operations."}
                  </motion.h3>
                </div>
                <div className="col-span-12 lg:col-span-5 mt-4 lg:mt-0">
                  <motion.p 
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                    className="text-editorial-body text-text-primary font-light origin-left block"
                  >
                    {language === 'id' 
                      ? "Web developer spesialis infrastruktur yang menjembatani aplikasi web dan sistem bare-metal. Saya merekayasa perangkat lunak internal kustom, konfigurasi server Linux tangguh, dan merancang jaringan perusahaan yang aman — membangun produk digital untuk hardware tempat mereka berjalan."
                      : "An infrastructure-oriented web developer bridging web applications and bare-metal systems. I build custom internal software, configure resilient Linux servers, and deploy secure enterprise networks — creating digital products designed for the hardware they run on."
                    }
                  </motion.p>
                </div>
              </div>

              {/* SUB-SECTION 2: SCOPE (3-Column Layout) */}
              <div className="editorial-grid pt-10 border-t border-border-primary/30 items-start">
                <div className="col-span-12 lg:col-span-3">
                  <motion.span 
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                    className="editorial-label font-normal origin-left inline-block"
                  >
                    {language === 'id' ? "Cakupan" : "Scope"}
                  </motion.span>
                </div>
                <div className="col-span-12 lg:col-span-4 mt-2 lg:mt-0 lg:pr-20">
                  <motion.h3 
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.2 }}
                    className="text-[15px] md:text-[16px] leading-relaxed font-normal text-text-primary origin-left inline-block"
                  >
                    {language === 'id' ? "Kategori keahlian terfokus." : "Focused technical disciplines."}
                  </motion.h3>
                </div>
                <div className="col-span-12 lg:col-span-5 mt-4 lg:mt-0 space-y-6">
                  {/* Category 1: Infrastructure */}
                  <div className="space-y-2.5">
                    <motion.span 
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                      className="text-[11px] md:text-[12px] font-normal text-text-primary/40 block origin-left w-fit"
                    >
                      Infrastructure
                    </motion.span>
                    <motion.div 
                      variants={staggerParentVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      className="flex flex-wrap gap-2"
                    >
                      {[
                        "Linux Server Administration",
                        "MikroTik Networking",
                        "VLAN & Firewall Management",
                        "Self-Hosted Storage (TrueNAS)"
                      ].map((pill) => (
                        <motion.span
                          key={pill}
                          variants={staggerChildVariants}
                          whileHover={{ scale: 1.08, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          transition={{ type: "spring", stiffness: 300, damping: 15 }}
                          className="pill-blue cursor-default text-xs"
                        >
                          {pill}
                        </motion.span>
                      ))}
                    </motion.div>
                  </div>

                  {/* Category 2: Development */}
                  <div className="space-y-2.5">
                    <motion.span 
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                      className="text-[11px] md:text-[12px] font-normal text-text-primary/40 block origin-left w-fit"
                    >
                      Development
                    </motion.span>
                    <motion.div 
                      variants={staggerParentVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      className="flex flex-wrap gap-2"
                    >
                      {[
                        "TypeScript & React",
                        "Laravel & PHP",
                        "Next.js & Node.js",
                        "PostgreSQL & MySQL",
                        "Custom Web Platforms",
                        "API Systems & Integrations",
                        "Interface Implementation",
                        "Spatial & Minimalist UI"
                      ].map((pill) => (
                        <motion.span
                          key={pill}
                          variants={staggerChildVariants}
                          whileHover={{ scale: 1.08, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          transition={{ type: "spring", stiffness: 300, damping: 15 }}
                          className="pill-blue cursor-default text-xs"
                        >
                          {pill}
                        </motion.span>
                      ))}
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* SUB-SECTION 3: EXPERIENCE (3-Column Layout) */}
              <div className="editorial-grid pt-10 border-t border-border-primary/30 items-start">
                <div className="col-span-12 lg:col-span-3">
                  <motion.span 
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                    className="editorial-label font-normal origin-left inline-block"
                  >
                    {language === 'id' ? "Pengalaman" : "Experience"}
                  </motion.span>
                </div>
                <div className="col-span-12 lg:col-span-4 mt-2 lg:mt-0 lg:pr-20">
                  <motion.h3 
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.2 }}
                    className="text-[15px] md:text-[16px] leading-relaxed font-normal text-text-primary origin-left inline-block"
                  >
                    {language === 'id' ? "Rekayasa sistem perusahaan." : "Enterprise systems and operations."}
                  </motion.h3>
                </div>
                <div className="col-span-12 lg:col-span-5 mt-4 lg:mt-0 space-y-6">
                  <motion.p 
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                    className="text-editorial-body text-text-primary origin-left block"
                  >
                    {language === 'id'
                      ? "Latar belakang profesional saya berfokus pada pengembangan aplikasi web dan operasional sistem secara langsung. Saya mengonfigurasi instansi server Linux tangguh, mengoptimalkan database relasional, dan mengelola infrastruktur jaringan perusahaan berbasis MikroTik."
                      : "My professional background focuses on web application development and hands-on system operations. I configure resilient Linux server instances, optimize relational databases, and manage corporate network infrastructures powered by MikroTik."
                    }
                  </motion.p>
                  <motion.p 
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                    className="text-editorial-body text-text-primary origin-left block"
                  >
                    {language === 'id'
                      ? "Selain itu, saya merekayasa lingkungan penyimpanan self-hosted (TrueNAS, Nextcloud) and merancang solusi web kustom untuk mengoptimalkan alur kerja operasional internal bisnis kecil dan menengah."
                      : "Additionally, I engineer self-hosted storage environments (TrueNAS, Nextcloud) and deploy custom web solutions designed to optimize internal operational workflows for small and medium-sized businesses."
                    }
                  </motion.p>
                  <div className="pt-4">
                    <Magnetic>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="pill-blue block w-fit"
                      >
                        {language === 'id' ? "Jelajahi Resume Lengkap" : "Explore Full Resume"}
                      </motion.button>
                    </Magnetic>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* SECTION 5.5: GOOEY TEXT TRANSITION SPACE (Sleek Dark Theme Background) */}
      <div className="py-6 md:py-8 px-4 md:px-8 lg:px-12 w-full bg-bg-primary flex items-center justify-start overflow-hidden border-t border-border-primary">
        <GooeyText 
          texts={[
            "Making things work,",
            "then making them matter."
          ]}
          morphTime={1.5}
          cooldownTime={0.8}
          textClassName="text-[9.5vw] sm:text-[7.5vw] md:text-[5.8vw] lg:text-[5.2vw] xl:text-[5.1vw] whitespace-nowrap font-medium tracking-tighter font-helvetica text-text-primary"
        />
      </div>

      {/* SECTION 5.4: SYSTEM STATUS & TECH EXPLORER */}
      <motion.div
        initial={{ opacity: 0.25, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-18% 0px -18% 0px" }}
        transition={{ duration: 1.0, ease: editorialEase }}
        style={{ willChange: "transform, opacity" }}
      >
        <SystemStatus />
      </motion.div>

      {/* SECTION 5.8: EDITORIAL PARALLAX VISUAL ACCORDION STRIP */}
      <motion.div
        initial={{ opacity: 0.25, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-18% 0px -18% 0px" }}
        transition={{ duration: 1.0, ease: editorialEase }}
        style={{ willChange: "transform, opacity" }}
      >
        <ExpandOnHover />
      </motion.div>

      {/* SECTION 5.6: CONSTELLATION SECTION (Interactive Network Visualizer) */}
      <motion.section
        id="constellation"
        initial={{ opacity: 0.25, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-18% 0px -18% 0px" }}
        transition={{ duration: 1.0, ease: editorialEase }}
        style={{ willChange: "transform, opacity" }}
        className="w-full relative h-[500px] md:h-[650px] overflow-hidden bg-black border-t border-b border-neutral-800 flex flex-col justify-start pt-12"
      >
        {/* Floating Centered 120% Blurred Background Header */}
        <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 z-10 w-full flex flex-col items-center justify-center text-center px-4 pointer-events-none">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 0.5, scale: 1 }}
            viewport={{ once: false, margin: "-10% 0px -10% 0px" }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-[11vw] sm:text-[14vw] md:text-[11.6vw] lg:text-[10.4vw] xl:text-[10.2vw] font-medium tracking-tighter font-helvetica text-text-primary whitespace-nowrap blur-[5px] md:blur-[12px]"
          >
            {language === 'id' ? "Konstelasi" : "Constellation"}
          </motion.h2>
        </div>

        {/* Interactive Constellation Canvas */}
        <ConstellationBg showLabels={true} pages={1} />
      </motion.section>

      {/* SECTION 5.5: ENGINEERING LOG (Articles & Technical Writings) */}
      <motion.div
        initial={{ opacity: 0.25, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-18% 0px -18% 0px" }}
        transition={{ duration: 1.0, ease: editorialEase }}
        style={{ willChange: "transform, opacity" }}
      >
        <EngineeringLog />
      </motion.div>

      {/* SECTION 5: GALLERY / CASE STUDIES (3D Overlapping Card Marquee for Selected Works) - Placed right above footer */}
      <motion.div
        initial={{ opacity: 0.25, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-18% 0px -18% 0px" }}
        transition={{ duration: 1.0, ease: editorialEase }}
        style={{ willChange: "transform, opacity" }}
      >
        <PortfolioGallery
          title={language === 'id' ? "Karya Terpilih" : "Selected Works"}
          archiveButton={{
            text: language === 'id' ? "Lihat Semua Proyek" : "View All Projects",
            href: "/projects"
          }}
          images={(() => {
            const base = galleryItems.map(item => ({
              src: item.image,
              alt: item.title,
              title: item.title
            }));
            if (base.length === 0) return [];
            return [
              base[base.length - 2] || base[0],
              base[base.length - 1] || base[0],
              ...base,
              base[0],
              base[1] || base[0]
            ];
          })()}
        />
      </motion.div>

      {/* SECTION 5.8: COMMUNITY CONNECT (Interactive stats & profiles) */}
      <motion.div
        initial={{ opacity: 0.25, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-18% 0px -18% 0px" }}
        transition={{ duration: 1.0, ease: editorialEase }}
        style={{ willChange: "transform, opacity" }}
      >
        <CommunityConnect />
      </motion.div>

      {/* SECTION 6: CONNECT WITH WEBGL BACKGROUND */}
      <motion.section
        id="contact"
        initial={{ opacity: 0.25, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-18% 0px -18% 0px" }}
        transition={{ duration: 1.5, ease: editorialEase }}
        style={{ willChange: "transform, opacity" }}
        className="w-full relative py-20 md:py-28 overflow-hidden bg-[#030c16]"
      >
        {/* Dynamic WebGL Nebula Canvas */}
        <NebulaFooterBackground />

        {/* Content Wrapper */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 relative z-10">
          <Contact />
        </div>
      </motion.section>

    </div>
  );
});