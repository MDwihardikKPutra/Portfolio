import { motion } from "framer-motion";
import { useAppContext } from "../../context/AppContext";

export const SystemStatus = () => {
  const { language } = useAppContext();

  const works = {
    archi: {
      title: "Archi Studio",
      desc: language === "id" 
        ? "Arsd — Desain editorial dan arsip portfolio studio arsitektur" 
        : "Arsd — Editorial design for high-end architectural practice portfolios",
      image: "/Gallery/Archi-Studio/preview-1.png",
      link: "https://landing-page-archi-studio.vercel.app/"
    },
    finance: {
      title: "Smart Finance",
      desc: language === "id"
        ? "Sftr — Analisis transaksi dan pelacak keuangan berdaya AI"
        : "Sftr — AI-powered personal financial transaction analytics engine",
      image: "/Gallery/SmartFinance/1-smartfinance.png",
      link: "https://smart-finance-tracker-smoky.vercel.app/"
    },
    oceanus: {
      title: "Oceanus Energy",
      desc: language === "id"
        ? "Ocen — Logistik energi maritim dan direktori operasional"
        : "Ocen — Sovereign maritime infrastructure & oil delivery portals",
      image: "/Gallery/Oceanus.png",
      link: "https://oceanusenergy.vercel.app/"
    }
  };

  return (
    <section className="w-full bg-bg-primary text-text-primary py-0 px-0 select-none relative overflow-hidden">
      <div className="w-full max-w-none">
 
        {/* Bento Grid Layout (Seamless full-bleed mosaic panel with zero gaps) */}
        <div className="parent grid grid-cols-1 md:grid-cols-3 gap-0 w-full auto-rows-auto">
          
          {/* div3: Large premier card (Spans 2 cols, 2 rows on desktop) */}
          <motion.a 
            href={works.archi.link}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="div3 col-span-1 md:col-span-2 md:row-span-2 bg-[#0c0c0c] hover:bg-[#111111] transition-colors duration-500 flex flex-col justify-between overflow-hidden relative group p-5 h-[300px] md:h-[464px]"
          >
            <div className="absolute inset-0 z-0">
              <img 
                src={works.archi.image} 
                alt={works.archi.title} 
                className="w-full h-full object-cover transition-transform duration-[1200ms] ease-[0.16,1,0.3,1] group-hover:scale-[1.02] opacity-60 group-hover:opacity-85"
                loading="lazy"
              />
            </div>
            <div className="relative z-10 w-full flex justify-between items-start">
              <span className="text-[9px] font-mono tracking-widest text-text-primary/50 uppercase">SELECTED PROJECT</span>
              <span className="text-sm text-text-primary group-hover:translate-x-1 transition-transform duration-300">↗</span>
            </div>
            <div className="relative z-10 pt-10">
              <h4 className="text-xl md:text-2xl font-normal tracking-tight font-helvetica mb-1.5">{works.archi.title}</h4>
              <p className="text-[11px] md:text-[12px] opacity-70 max-w-xl font-light">{works.archi.desc}</p>
            </div>
          </motion.a>
 
          {/* div5: Square card (Spans 1 col, 1 row on desktop) */}
          <motion.a 
            href={works.finance.link}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="div5 col-span-1 bg-[#0c0c0c] hover:bg-[#111111] transition-colors duration-500 flex flex-col justify-between overflow-hidden relative group p-5 h-[200px] md:h-[232px]"
          >
            <div className="absolute inset-0 z-0">
              <img 
                src={works.finance.image} 
                alt={works.finance.title} 
                className="w-full h-full object-cover transition-transform duration-[1200ms] ease-[0.16,1,0.3,1] group-hover:scale-[1.02] opacity-60 group-hover:opacity-85"
                loading="lazy"
              />
            </div>
            <div className="relative z-10 w-full flex justify-between items-start">
              <span className="text-[9px] font-mono tracking-widest text-text-primary/50 uppercase">SELECTED PROJECT</span>
              <span className="text-sm text-text-primary group-hover:translate-x-1 transition-transform duration-300">↗</span>
            </div>
            <div className="relative z-10">
              <h4 className="text-lg md:text-xl font-normal tracking-tight font-helvetica mb-0.5">{works.finance.title}</h4>
              <p className="text-[11px] opacity-70 font-light line-clamp-2 leading-relaxed">{works.finance.desc}</p>
            </div>
          </motion.a>
 
          {/* div6: Square card (Spans 1 col, 1 row on desktop) */}
          <motion.a 
            href={works.oceanus.link}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="div6 col-span-1 bg-[#0c0c0c] hover:bg-[#111111] transition-colors duration-500 flex flex-col justify-between overflow-hidden relative group p-5 h-[200px] md:h-[232px]"
          >
            <div className="absolute inset-0 z-0">
              <img 
                src={works.oceanus.image} 
                alt={works.oceanus.title} 
                className="w-full h-full object-cover transition-transform duration-[1200ms] ease-[0.16,1,0.3,1] group-hover:scale-[1.02] opacity-60 group-hover:opacity-85"
                loading="lazy"
              />
            </div>
            <div className="relative z-10 w-full flex justify-between items-start">
              <span className="text-[9px] font-mono tracking-widest text-text-primary/50 uppercase">SELECTED PROJECT</span>
              <span className="text-sm text-text-primary group-hover:translate-x-1 transition-transform duration-300">↗</span>
            </div>
            <div className="relative z-10">
              <h4 className="text-lg md:text-xl font-normal tracking-tight font-helvetica mb-0.5">{works.oceanus.title}</h4>
              <p className="text-[11px] opacity-70 font-light line-clamp-2 leading-relaxed">{works.oceanus.desc}</p>
            </div>
          </motion.a>
 
        </div>
 
      </div>
    </section>
  );
};
