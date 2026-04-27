import { useInView, motion, AnimatePresence } from "framer-motion";
import { memo, useRef, useEffect, useState } from "react";

import { ConstellationBg } from "../../components/Visuals/ConstellationBg";

export const Manifesto = memo(({ t }: { t: any }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div 
      id="manifesto" 
      ref={containerRef}
      className="section-full bg-black flex flex-col items-center justify-center relative overflow-hidden"
    >
      <ConstellationBg pages={1} />
      <div className="relative z-10 w-full h-full flex items-center justify-center pointer-events-none">
      </div>
    </div>
  );
});



