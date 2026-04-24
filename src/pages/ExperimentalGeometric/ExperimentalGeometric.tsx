import { LiquidDistortion } from "../../components/Visuals/LiquidDistortion";
import { ParticleField } from "../../components/Visuals/ParticleField";
import { useState, useMemo, memo, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export const ExperimentalGeometric = memo(() => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inputName, setInputName] = useState("");
  
  // Create a frequency data based on inputName
  const frequencyData = useMemo(() => {
    const chars = inputName.split("");
    const baseFreq = chars.reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return Array.from({ length: 40 }).map((_, i) => ({
      height: Math.abs(Math.sin((baseFreq + i) * 0.2)) * 60 + 5,
      delay: i * 0.02
    }));
  }, [inputName]);

  const { scrollXProgress } = useScroll({
    container: document.getElementById("main-snap-container") as HTMLElement,
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollXProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const translateX = useTransform(smoothProgress, [0, 1], [0, 150]);

  return (
    <div 
      id="experimental" 
      ref={containerRef}
      className="section-full bg-black relative overflow-hidden flex flex-col items-center justify-center font-outfit"
    >
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
           style={{ 
             backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
             backgroundSize: '40px 40px' 
           }} 
      />

      {/* Experimental Showcase Layout */}
      <div className="relative w-full h-full max-w-[1800px] mx-auto px-10 flex flex-col items-center justify-center gap-10">
        
        <div className="w-full flex items-center justify-between gap-10">
          
          {/* Pillar 1: Liquid Visual */}
          <motion.div 
            style={{ x: translateX }}
            className="hidden md:block flex-1"
          >
            <LiquidDistortion size={400} />
          </motion.div>

          {/* Pillar 2: Title & Narrative */}
          <div className="flex-1 flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="block text-[10px] font-black tracking-[0.5em] uppercase mb-4 text-white/40">
                [ LAB / KINETIC_EXPERIMENTS ]
              </span>
              <h2 className="text-[60px] md:text-[90px] font-black tracking-tighter leading-[0.9] text-white">
                GENETIC<br/>FLOW
              </h2>
            </motion.div>

            {/* Input Section */}
            <div className="flex flex-col items-center mt-12">
              <span className="text-[10px] font-black tracking-[0.4em] uppercase text-white/30 mb-2">
                [ TYPE_IDENTIFIER ]
              </span>
              <input 
                type="text" 
                value={inputName}
                onChange={(e) => setInputName(e.target.value)}
                placeholder="NAME_"
                className="bg-transparent border-b border-white/20 text-white text-[24px] font-black tracking-tighter outline-none focus:border-white transition-colors text-center w-[250px] placeholder:text-white/5 uppercase"
              />
              {/* Frequency Bars */}
              <div className="flex items-end gap-[2px] h-10 mt-6">
                {frequencyData.map((data, i) => (
                  <motion.div 
                    key={i}
                    animate={{ height: data.height }}
                    className="w-[2px] bg-white rounded-t-sm origin-bottom"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Pillar 3: Three.js Particle Wave */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5 }}
            className="flex-1 flex justify-end"
          >
            <ParticleField size={450} />
          </motion.div>

        </div>

      </div>

      {/* Small Detail Markers */}
      <div className="absolute bottom-10 left-10 text-[9px] font-mono text-white/30 tracking-widest uppercase">
        Coord: 34.6937° N, 135.5023° E / OSK
      </div>
    </div>
  );
});
  );
});
