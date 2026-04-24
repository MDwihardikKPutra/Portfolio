import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { memo, useRef, useState, useEffect } from "react";
import { ParticleField } from "../../components/Visuals/ParticleField";

export const ExperimentalGeometric = memo(() => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerEl, setContainerEl] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const el = document.getElementById("main-snap-container");
    if (el) setContainerEl(el);
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

  const titleY = useTransform(smoothProgress, [0.3, 0.7], [50, -50]);

  return (
    <div 
      id="experimental" 
      ref={containerRef}
      className="section-full bg-black relative overflow-hidden flex flex-col items-center justify-center font-outfit"
    >
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none z-10" 
           style={{ 
             backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
             backgroundSize: '80px 80px' 
           }} 
      />

      {/* The Central Particle Wave - FULL PAGE IMMERSION */}
      <div className="absolute inset-0 z-0">
         <ParticleField />
      </div>

      {/* Narrative Title (Overlay) */}
      <div className="relative z-20 flex flex-col items-center text-center pointer-events-none">
        <motion.div
          style={{ y: titleY }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="block text-[10px] font-black tracking-[0.8em] uppercase mb-6 text-white/40">
            [ EXPERIMENT_04 / KINETIC_WAVE ]
          </span>
          <h2 className="text-[80px] md:text-[160px] font-black tracking-tighter leading-[0.8] text-white">
            GENETIC<br/>FLOW
          </h2>
          <div className="w-20 h-[1px] bg-white/20 mx-auto mt-12" />
        </motion.div>
      </div>

      {/* Technical Metadata Detail */}
      <div className="absolute top-10 right-10 flex flex-col items-end opacity-20 text-[9px] font-mono text-white tracking-widest uppercase z-20">
        <span>Object: Particle_Cloud_v1</span>
        <span>Resolution: Ultra_High_Density</span>
        <span>Environment: Full_Viewport_v2</span>
      </div>

      {/* Small Detail Markers */}
      <div className="absolute bottom-10 left-10 text-[9px] font-mono text-white/30 tracking-widest uppercase z-20">
        Coord: 34.6937° N, 135.5023° E / OSK
      </div>
    </div>
  );
});
