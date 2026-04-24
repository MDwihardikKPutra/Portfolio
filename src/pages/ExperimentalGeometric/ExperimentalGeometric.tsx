import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { memo, useRef, useState, useMemo, useEffect } from "react";
import { LiquidDistortion } from "../../components/Visuals/LiquidDistortion";
import { ParticleField } from "../../components/Visuals/ParticleField";

export const ExperimentalGeometric = memo(() => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerEl, setContainerEl] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const el = document.getElementById("main-snap-container");
    if (el) setContainerEl(el);
  }, []);
  
  // Auto-animating frequency data (dna-like sequence)
  const frequencyData = useMemo(() => {
    return Array.from({ length: 60 }).map((_, i) => ({
      height: 15 + Math.random() * 45,
      delay: i * 0.01
    }));
  }, []);

  const { scrollXProgress } = useScroll({
    container: containerEl ? { current: containerEl } : undefined,
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
            <LiquidDistortion size={450} />
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
              <h2 className="text-[60px] md:text-[100px] font-black tracking-tighter leading-[0.8] text-white">
                GENETIC<br/>FLOW
              </h2>
            </motion.div>

            {/* Frequency Bars (Now Autonomous) */}
            <div className="flex items-end gap-[2px] h-16 mt-16">
              {frequencyData.map((data, i) => (
                <motion.div 
                  key={i}
                  animate={{ 
                    height: [data.height, data.height * 1.8, data.height * 0.4, data.height] 
                  }}
                  transition={{ 
                    duration: 1.5 + Math.random() * 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: data.delay 
                  }}
                  className="w-[2px] bg-white rounded-t-sm origin-bottom"
                />
              ))}
            </div>
            <span className="text-[10px] font-black tracking-[0.4em] uppercase text-white/20 mt-4">
              [ SYSTEM_ACTIVE: MONITORING_DATA ]
            </span>
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
