import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import { memo } from "react";

export const Home = memo(({ t }: { t: any }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div id="home" className="section-full bg-white relative overflow-hidden">
      


      {/* Full-width Image Block */}
      <div className="flex-1 w-full flex flex-col items-center justify-center relative z-10 swiss-px">
        
        {/* Top Label (Flashlight Reveal Effect) */}
        <div className="w-full flex justify-end mb-3 md:mb-4">
          <div 
            className="relative text-right inline-block group cursor-crosshair"
            onMouseMove={handleMouseMove}
          >
            {/* Blurred Base Layer (Effect Restored) */}
            <span className="block text-[32px] md:text-[40px] text-black tracking-tight leading-none blur-[4px] opacity-40 select-none">
              <span className="font-black">Personally, </span>
              <span className="font-normal">Personal Website</span>
            </span>

            {/* Sharp Cursor Spotlight Layer */}
            <motion.span 
              className="absolute inset-0 block text-[32px] md:text-[40px] text-black tracking-tight leading-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{
                maskImage: useMotionTemplate`radial-gradient(120px circle at ${mouseX}px ${mouseY}px, black 0%, transparent 100%)`,
                WebkitMaskImage: useMotionTemplate`radial-gradient(120px circle at ${mouseX}px ${mouseY}px, black 0%, transparent 100%)`
              }}
            >
              <span className="font-black">Personally, </span>
              <span className="font-normal">Personal Website</span>
            </motion.span>
          </div>
        </div>

        <motion.div 
           initial={{ opacity: 0, scale: 0.95 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
           className="w-full h-[35vh] md:h-[45vh] bg-gray-50 overflow-hidden relative group shadow-2xl shadow-black/5 rounded-sm"
        >
           {/* Interactive Figure Hotspot */}
           <div className="peer absolute top-[50%] left-[28%] -translate-x-1/2 -translate-y-1/2 w-[40%] h-[80%] md:w-[25%] md:h-[90%] rounded-[100%] cursor-help z-20" />
           
           <img 
             src="/wasnevermeant.png" 
             alt="Featured Visual" 
             className="w-full h-full object-cover object-[center_60%] grayscale peer-hover:grayscale-0 transition-all duration-1000"
           />

           {/* Dialog Bubble Tooltip */}
           <div className="absolute top-[35%] lg:top-[30%] left-[32%] lg:left-[32%] opacity-0 peer-hover:opacity-100 transition-opacity duration-500 pointer-events-none flex items-center z-30">
             
             {/* Left-pointing Dialog Arrow */}
             <div className="w-0 h-0 border-y-[8px] border-y-transparent border-r-[10px] border-r-white/95 relative z-10" />
             
             {/* Dialog Card Content */}
             <div className="bg-white/95 backdrop-blur-md px-6 py-4 border border-black/5 whitespace-nowrap text-center -ml-[1px]">
               <p className="text-[12px] md:text-[13px] font-semibold text-black italic leading-relaxed">
                 "Always trying to do better right ?"
               </p>
             </div>
           </div>
        </motion.div>

        {/* Bottom Left Intro Snippet (Mounted flush to the photo) */}
        <div className="w-full flex justify-start mt-3 md:mt-4 mb-8 md:mb-0 overflow-hidden">
          <p className="text-[14px] font-bold leading-relaxed text-black whitespace-nowrap">
            Mokhamad Dwihardik Kusuma Putra, passionate about technology and the internet.
          </p>
        </div>
      </div>
    </div>
  );
});