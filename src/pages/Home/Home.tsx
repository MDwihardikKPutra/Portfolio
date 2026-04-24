import { motion, useMotionValue, useMotionTemplate, AnimatePresence } from "framer-motion";
import { memo, useState } from "react";

export const Home = memo(({ t }: { t: any }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [activeJets, setActiveJets] = useState<any[]>([]);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const introMouseX = useMotionValue(0);
  const introMouseY = useMotionValue(0);

  const triggerFly = () => {
    const id = Date.now();
    
    // Define potential maneuvers
    const maneuvers = [
      { start: { x: "-50vw", y: "20vh", rotate: 90 }, end: { x: "150vw", y: "20vh" } }, // Strafe Right
      { start: { x: "150vw", y: "60vh", rotate: 270 }, end: { x: "-50vw", y: "60vh" } }, // Strafe Left
      { start: { x: "20vw", y: "120vh", rotate: 0 }, end: { x: "20vw", y: "-50vh" } }, // Climb Top
      { start: { x: "80vw", y: "-50vh", rotate: 180 }, end: { x: "80vw", y: "120vh" } }, // Dive Bottom
      { start: { x: "-20vw", y: "100vh", rotate: 45 }, end: { x: "120vw", y: "-20vh" } }, // Diagonal Up
      { start: { x: "120vw", y: "100vh", rotate: -45 }, end: { x: "-20vw", y: "-20vh" } }, // Diagonal Up Left
    ];

    const chosen = maneuvers[Math.floor(Math.random() * maneuvers.length)];
    
    setActiveJets(prev => [...prev, { id, ...chosen }]);
    setTimeout(() => {
      setActiveJets(prev => prev.filter(j => j.id !== id));
    }, 7000); 
  };

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  function handleIntroMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    introMouseX.set(clientX - left);
    introMouseY.set(clientY - top);
  }

  return (
    <div id="home" className="section-full bg-white relative overflow-hidden">
      <div className="flex-1 w-full flex flex-col items-center justify-center relative z-10 swiss-px">
        
        {/* Top Label (Flashlight Reveal Effect) */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="w-full flex justify-end mb-3 md:mb-4"
        >
          <div 
            className="relative text-right inline-block group cursor-crosshair"
            onMouseMove={handleMouseMove}
          >
            <span className="block text-[32px] md:text-[40px] text-black tracking-tight leading-tight blur-[4px] opacity-40 select-none">
              <span className="font-black">Personally, </span>
              <span className="font-normal">Personal Website</span>
            </span>

            <motion.span 
              className="absolute inset-0 block text-[32px] md:text-[40px] text-black tracking-tight leading-tight opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{
                maskImage: useMotionTemplate`radial-gradient(120px circle at ${mouseX}px ${mouseY}px, black 0%, transparent 100%)`,
                WebkitMaskImage: useMotionTemplate`radial-gradient(120px circle at ${mouseX}px ${mouseY}px, black 0%, transparent 100%)`
              }}
            >
              <span className="font-black">Personally, </span>
              <span className="font-normal">Personal Website</span>
            </motion.span>
          </div>
        </motion.div>

        {/* REVERTED TO CLEAN ZOOM HERO IMAGE */}
        <motion.div 
           initial={{ opacity: 0, scale: 0.95 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
           className="w-full h-[35vh] md:h-[45vh] bg-gray-50 overflow-hidden relative shadow-2xl shadow-black/5 rounded-sm group"
        >
           {/* Interactive Figure Hotspot - SECRET JET TRIGGER (Optimized for Mobile Touch) */}
           <div 
             onMouseEnter={() => setIsHovered(true)}
             onMouseLeave={() => setIsHovered(false)}
             onClick={triggerFly}
             className="absolute top-[35%] left-[27%] -translate-x-1/2 -translate-y-1/2 w-[30%] h-[30%] md:w-[8%] md:h-[25%] rounded-[100%] cursor-pointer z-50" 
           />
           <img 
             src="/wasnevermeant.png" 
             alt="Featured Visual" 
             className={`w-full h-full object-cover object-[center_60%] transition-all duration-1000 ease-out pointer-events-none ${isHovered ? 'grayscale-0 scale-105' : 'grayscale scale-100'}`}
           />

           {/* Fighter Jet Animations */}
           {/* Fighter Jet Animations (Random Maneuvers) */}
           <AnimatePresence>
             {activeJets.map((jet) => (
                <motion.div
                 key={jet.id}
                 initial={{ ...jet.start, scale: 2, opacity: 1 }}
                 animate={{ 
                   ...jet.end,
                 }}
                 exit={{ opacity: 0 }}
                 transition={{ duration: 4, ease: "linear" }} 
                 className="fixed top-0 left-0 z-[10000] pointer-events-none"
               >
                 <img 
                    src="/pixel-jet-removebg-preview.png" 
                    alt="Jet" 
                    className="w-32 h-32 md:w-44 md:h-44 object-contain pixelated relative z-10" 
                    style={{ imageRendering: "pixelated" }} 
                 />

                 {/* Rapid Fire Bullets */}
                 {[0, 1, 2].map((i) => (
                   <motion.div
                     key={i}
                     className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-6 bg-yellow-400 blur-[1px] z-0"
                     initial={{ y: 0, opacity: 0 }}
                     animate={{ 
                       y: ["0px", "-800px"], 
                       opacity: [0, 1, 0] 
                     }}
                     transition={{ 
                       duration: 0.5, 
                       repeat: Infinity, 
                       delay: i * 0.15,
                       ease: "linear"
                     }}
                   />
                 ))}

                 {/* Kinetic Vapor Trail */}
                 <motion.div 
                   className="absolute top-1/2 right-[80%] w-96 h-[1px] bg-black/5 origin-right blur-[2px]"
                   animate={{ scaleX: [1, 2], opacity: [0.3, 0] }}
                   transition={{ duration: 0.5, repeat: Infinity }}
                 />
               </motion.div>
             ))}
           </AnimatePresence>
           {/* Dialogue Bubble */}
           <div className={`absolute top-[35%] lg:top-[30%] left-[32%] lg:left-[32%] transition-opacity duration-500 pointer-events-none flex items-center z-30 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
              <div className="w-0 h-0 border-y-[8px] border-y-transparent border-r-[10px] border-r-white/95 relative z-10" />
              <div className="bg-white/95 backdrop-blur-md px-6 py-4 border border-black/5 whitespace-nowrap text-center -ml-[1px]">
                <p className="text-[12px] md:text-[13px] font-semibold text-black italic leading-relaxed">
                  "Always trying to do better right ?"
                </p>
              </div>
           </div>
        </motion.div>

        {/* Bottom Left Intro Snippet */}
        <div className="w-full flex justify-start mt-3 md:mt-4 mb-8 md:mb-0 overflow-hidden">
          <motion.div 
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative group cursor-crosshair"
            onMouseMove={handleIntroMouseMove}
          >
            <span className="block text-[14px] font-bold leading-relaxed text-black blur-[1.5px] opacity-50 select-none whitespace-nowrap">
              Mokhamad Dwihardik Kusuma Putra, passionate about technology and the internet.
            </span>

            <motion.span 
              className="absolute inset-0 block text-[14px] font-bold leading-relaxed text-black opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap"
              style={{
                maskImage: useMotionTemplate`radial-gradient(80px circle at ${introMouseX}px ${introMouseY}px, black 0%, transparent 100%)`,
                WebkitMaskImage: useMotionTemplate`radial-gradient(80px circle at ${introMouseX}px ${introMouseY}px, black 0%, transparent 100%)`
              }}
            >
              Mokhamad Dwihardik Kusuma Putra, passionate about technology and the internet.
            </motion.span>
          </motion.div>
        </div>
      </div>
    </div>
  );
});;