import { memo } from "react";
import { motion } from "framer-motion";
import { ConstellationBg } from "../../components/Visuals/ConstellationBg";
import { ParticleField } from "../../components/Visuals/ParticleField";

export const Experimental = memo(() => {

  return (
    <div className="w-full h-full overflow-y-auto snap-y snap-mandatory no-scrollbar bg-black">

      {/* SECTION 1: CONSTELLATION */}
      <section className="relative w-full h-screen snap-start snap-always overflow-hidden">
        <div className="absolute inset-0 pointer-events-auto">
          <ConstellationBg pages={1} showLabels={true} />
        </div>
      </section>

      {/* GALAXY EXPERIENCE WITH SHARED BACKGROUND AND SNAPPING */}
      <div className="relative">
        {/* Continuous Galaxy Background - Centered on Section 2 */}
        <div className="absolute top-0 left-0 w-full h-[200vh] pointer-events-auto">
          <ParticleField />
        </div>

        {/* Part 1: The Text (Snap Point 1) - Reduced height with Scroll Fade */}
        <section className="relative w-full h-[50vh] snap-start flex justify-center items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="text-white text-6xl md:text-[12rem] font-black tracking-tighter leading-none text-center"
          >
            what suposed to be
          </motion.div>
        </section>

        {/* Part 2: The Galaxy Focus (Snap Point 2) */}
        <section className="relative w-full h-screen snap-start">
          {/* Content overlay if needed */}
        </section>
      </div>

    </div>
  );
});
