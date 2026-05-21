import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";


const articles = [
  {
    id: 1,
    date: "12 Oct, 2025",
    title: {
      en: "Optimizing MikroTik BGP for Enterprise Scale",
      id: "Optimasi BGP MikroTik untuk Skala Enterprise"
    },
    readTime: {
      en: "8 min read",
      id: "8 mnt baca"
    },
    link: "#"
  },
  {
    id: 2,
    date: "28 Aug, 2025",
    title: {
      en: "Deploying Zero-Trust Architecture on TrueNAS",
      id: "Implementasi Arsitektur Zero-Trust di TrueNAS"
    },
    readTime: {
      en: "12 min read",
      id: "12 mnt baca"
    },
    link: "#"
  },
  {
    id: 3,
    date: "04 Jun, 2025",
    title: {
      en: "IoT Key Management Hub with Google Workspace Integration",
      id: "Pusat Manajemen Kunci IoT dengan Integrasi Google Workspace"
    },
    readTime: {
      en: "8 min read",
      id: "8 mnt baca"
    },
    link: "/journal/iot-key-management"
  }
];

export const EngineeringLog = () => {
  const { language } = useAppContext();

  return (
    <section className="w-full bg-bg-primary pt-16 pb-12 md:pb-16 border-t border-border-primary">
      {/* Container - Aligned with max-w-6xl mx-auto grid */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 lg:px-16">
        
        {/* Centered Minimalist Header */}
        <div className="w-full flex flex-col items-center justify-center text-center mb-10 md:mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as any }}
            className="text-[4.75vw] sm:text-[3.75vw] md:text-[2.9vw] lg:text-[2.6vw] xl:text-[2.55vw] font-medium tracking-tighter font-helvetica text-text-primary"
          >
            Log
          </motion.h2>
        </div>
 
        {/* List - Compressed */}
        <div className="w-full flex flex-col">
          <div className="w-full border-t border-border-primary">
            {articles.map((article, i) => {
              const isInternal = article.link.startsWith("/");
              const commonProps = {
                initial: { opacity: 0, y: 15 },
                whileInView: { opacity: 1, y: 0 },
                viewport: { once: true, margin: "-10% 0px -10% 0px" },
                transition: { duration: 0.6, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] as any },
                className: "group flex flex-col sm:flex-row items-start sm:items-center justify-between py-5 md:py-6 border-b border-border-primary hover:bg-surface/50 transition-colors duration-300 cursor-pointer"
              };

              const innerContent = (
                <>
                  {/* Date & Index */}
                  <div className="w-full sm:w-1/4 flex items-center text-[12px] md:text-[13px] font-mono text-text-primary/45 mb-2 sm:mb-0">
                    <span className="w-10 opacity-50">{String(i + 1).padStart(2, '0')}</span>
                    <span>{article.date}</span>
                  </div>
                  
                  {/* Title */}
                  <div className="w-full sm:w-2/4 pr-4">
                    <h3 className="text-base md:text-lg lg:text-xl font-normal tracking-tight text-text-primary group-hover:translate-x-2 transition-transform duration-300 ease-[0.22,1,0.36,1]">
                      {language === 'id' ? article.title.id : article.title.en}
                    </h3>
                  </div>

                  {/* Read time & Arrow */}
                  <div className="w-full sm:w-1/4 flex justify-between sm:justify-end items-center mt-3 sm:mt-0">
                    <span className="text-[12px] md:text-[13px] text-text-primary/45 sm:mr-6 opacity-0 sm:opacity-100 transition-opacity">
                      {language === 'id' ? article.readTime.id : article.readTime.en}
                    </span>
                    <div className="w-8 h-8 rounded-full border border-border-primary flex items-center justify-center group-hover:bg-text-primary group-hover:text-bg-primary group-hover:border-text-primary transition-all duration-300 overflow-hidden relative">
                      <span className="absolute text-[12px] transform group-hover:translate-x-[150%] group-hover:-translate-y-[150%] transition-transform duration-300 ease-[0.22,1,0.36,1]">↗</span>
                      <span className="absolute text-[12px] transform -translate-x-[150%] translate-y-[150%] group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-300 ease-[0.22,1,0.36,1] delay-75">↗</span>
                      {/* Default state arrow */}
                      <span className="absolute text-[12px] transform group-hover:opacity-0 transition-opacity duration-200">↗</span>
                    </div>
                  </div>
                </>
              );

              return isInternal ? (
                <Link key={article.id} to={article.link} className="no-underline block w-full">
                  <motion.div key={article.id} {...commonProps}>
                    {innerContent}
                  </motion.div>
                </Link>
              ) : (
                <motion.a key={article.id} href={article.link} {...commonProps}>
                  {innerContent}
                </motion.a>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
