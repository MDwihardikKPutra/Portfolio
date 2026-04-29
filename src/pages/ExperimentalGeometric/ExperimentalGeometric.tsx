import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { memo, useRef, useState, useEffect } from "react";
import { ConstellationBg } from "../../components/Visuals/ConstellationBg";
import { ParticleField } from "../../components/Visuals/ParticleField";
import { GalacticMetadata } from "../../components/Visuals/GalacticMetadata";

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

  return (
    <div 
      id="experimental" 
      ref={containerRef}
      className="section-full bg-black flex flex-col items-center justify-center relative overflow-hidden font-outfit"
    >
      {/* Background: Constellation — same as Manifesto */}
      <ConstellationBg pages={1} />

      {/* Background Layer 2: Milky Way (ParticleField) */}
      <div className="absolute inset-0 z-0">
        <ParticleField />
      </div>

    </div>
  );
});
