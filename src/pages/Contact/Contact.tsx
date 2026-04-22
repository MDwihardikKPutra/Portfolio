import { motion } from "framer-motion";
import { Github, Linkedin, FileText } from "lucide-react";
import { contactInfo, socialLinks } from "../../data";
import { homeImages } from "../../utils/preloadImages";
import { memo } from "react";

export const Contact = memo(({ }: { t: any; isDarkMode: boolean }) => {
  return (
    <div id="contact" className="section-full !bg-black flex flex-col justify-center items-center !pt-0">
      
      {/* 
        Micro-Panoramic Contact Container
        Symmetrical scale (0.75) and layout consistency with Projects/Gallery.
      */}
      <div className="w-full h-[70vh] flex flex-col px-4 md:px-8 max-w-[2600px] mx-auto transform scale-[0.75] origin-center transition-transform duration-700">
        
        {/* Absolute Wide Cinematic Strip - Symmetrical 50:50 Layout */}
        <div className="w-full h-auto flex-1 grid grid-cols-1 lg:grid-cols-2 bg-white relative shadow-2xl shadow-black/[0.03] rounded-sm overflow-hidden border border-black/5">
          
          {/* Left Column: All Information (Perfectly Centered Stack) */}
          <div className="h-full py-12 px-8 flex flex-col justify-center items-center text-center gap-14 relative z-10">
            
            {/* Social Icons */}
            <div className="flex flex-col gap-5 items-center">
              <span className="text-[12px] font-bold text-black uppercase tracking-widest">Connect</span>
              <div className="flex items-center gap-8">
                 <a href="https://github.com/ddiko105" target="_blank" title="GitHub" className="hover:opacity-40 transition-all text-black">
                   <Github size={24} strokeWidth={2} />
                 </a>
                 <a href="https://linkedin.com/in/ddiko105" target="_blank" title="LinkedIn" className="hover:opacity-40 transition-all text-black">
                   <Linkedin size={24} strokeWidth={2} />
                 </a>
                 <a href="https://medium.com/@ddiko105" target="_blank" title="Medium" className="hover:opacity-40 transition-all text-black">
                   <FileText size={24} strokeWidth={2} />
                 </a>
              </div>
            </div>

            {/* Primary Contact Details */}
            <div className="flex flex-col gap-10 items-center">
              <div className="flex flex-col gap-2 items-center">
                <span className="text-[12px] font-bold text-black uppercase tracking-widest">General enquiries</span>
                <a href={`mailto:${contactInfo.email}`} className="text-xl md:text-2xl font-black tracking-tighter hover:underline underline-offset-4 transition-all text-black">
                  {contactInfo.email}
                </a>
              </div>

              <div className="flex flex-col gap-2 items-center">
                <span className="text-[12px] font-bold text-black uppercase tracking-widest">Location</span>
                <div className="flex flex-col items-center">
                   <span className="text-xl md:text-2xl font-black tracking-tighter text-black">Bandung, West Java</span>
                   <span className="text-[12px] font-bold mt-1 text-black uppercase tracking-widest">Indonesia — GMT +7</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Featured Image */}
          <div className="h-[300px] lg:h-full relative overflow-hidden">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1.5 }}
              className="w-full h-full bg-gray-100 overflow-hidden"
            >
               <img 
                 src="/wasnevermeant.png" 
                 alt="Personal Visual" 
                 className="w-full h-full object-cover grayscale opacity-100 contrast-125 hover:grayscale-0 hover:scale-105 transition-all duration-1000 origin-center"
               />
            </motion.div>
            
            <div className="absolute bottom-6 right-8 md:bottom-12 md:right-12 pointer-events-none z-10">
               <span className="text-[9px] font-black uppercase tracking-[0.8em] text-white mix-blend-difference drop-shadow-md">End</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
});
