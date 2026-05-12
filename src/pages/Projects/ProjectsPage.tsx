import { memo } from "react";
import { motion } from "framer-motion";
import { Projects } from "./Projects";

const editorialEase = [0.22, 1, 0.36, 1];

const ProjectsPage = memo(() => {
  return (
    <div className="w-full min-h-screen bg-white selection:bg-black selection:text-white font-helvetica">
      
      {/* Header Section */}
      <section className="w-full pt-24 md:pt-28 pb-10">
        <div className="editorial-grid">
           <div className="col-span-12 text-left">
              <motion.h1 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: editorialEase }}
                className="text-[18px] md:text-[22px] lg:text-[24px] font-normal tracking-tight leading-tight text-text-primary mb-4"
              >
                Project Landmark.
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-[11px] md:text-[12px] leading-relaxed text-text-primary/70 font-normal max-w-2xl"
              >
                An engineering and creative portfolio spanning across enterprise systems, high-fidelity landing pages, and complex digital architectures. Each project is a study in precision, efficiency, and user-centric logic.
              </motion.p>
           </div>
        </div>
      </section>

      {/* Projects List Container */}
      <section className="w-full pb-44">
        <div className="w-full">
          <Projects isHome={false} />
        </div>
      </section>

    </div>
  );
});

export default ProjectsPage;
