import { motion } from "framer-motion";
import type { Translations } from "../../translations";
import { Coffee, ShieldCheck, Zap, Globe } from "lucide-react";

interface HomeProps {
  t: Translations;
  isDarkMode: boolean;
}

const StarIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className}>
    <path d="M50 0 L55 45 L100 50 L55 55 L50 100 L45 55 L0 50 L45 45 Z" fill="currentColor" />
  </svg>
);

export const Home = ({ t }: { t: any }) => {
  return (
    <div id="home" className="section-full flex flex-col justify-center">
      <div className="section-container w-full">
        
        {/* Huge Editorial Title */}
        <motion.div 
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
           className="mb-4 md:mb-8"
        >
           <h1 className="flex flex-col font-black uppercase leading-[0.8] tracking-tighter">
              <span className="text-[8.6vw] md:text-[6.6vw] whitespace-nowrap">Personal Portfolio</span>
              <span className="text-[8.3vw] md:text-[6.4vw] whitespace-nowrap">M DWIHARDIK K PUTRA</span>
           </h1>
        </motion.div>

        {/* Horizontal Hero Block */}
        <div className="w-full h-[20vh] md:h-[30vh] overflow-hidden mb-4 md:mb-8 bg-gray-100 border border-black/5">
           <motion.img 
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.5 }}
              src="/wasnevermeant.png" 
              alt="M. Dwihardik"
              className="w-full h-full object-cover"
           />
        </div>

        {/* Brief Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
           <div className="lg:col-span-4">
           </div>
           <div className="lg:col-span-8">
              <motion.div
                 initial={{ opacity: 0, x: 20 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 transition={{ duration: 1 }}
              >
                 <p className="text-lg md:text-xl font-bold leading-tight tracking-tight">
                    Informatics Engineering graduate specializing in robust infrastructure and 
                    high-end digital solutions. Merging technical depth with minimal engineering.
                 </p>
              </motion.div>
           </div>
        </div>

      </div>
    </div>
  );
};