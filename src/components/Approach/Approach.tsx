import { motion } from "framer-motion";

export const Approach = () => {
  const steps = [
    {
      id: "01",
      title: "Discovery & Strategy",
      description: "A deep dive into project objectives, user needs, and market landscape to build a solid strategic foundation."
    },
    {
      id: "02",
      title: "Concept & Design",
      description: "Translating strategy into high-fidelity visuals and interactive prototypes that prioritize human emotion and utility."
    },
    {
      id: "03",
      title: "Execution & Code",
      description: "Building robust, scalable digital products using modern tech stacks with a relentless focus on performance."
    },
    {
      id: "04",
      title: "Testing & Polish",
      description: "Iterative refinement and rigorous optimization to ensure every pixel and line of code meets the highest standards."
    }
  ];

  return (
    <div className="w-full bg-white text-black px-6 md:px-20 lg:px-32 pt-12 md:pt-20 pb-8 md:pb-12 border-b border-black/5 relative">
      <div className="max-w-[1600px] mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-normal tracking-tighter mb-16 md:mb-24"
        >
          Approach.
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16">
          {steps.map((step, index) => (
            <motion.div 
              key={step.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col gap-6 group"
            >
              <div className="flex items-center justify-between border-b border-black pb-4">
                <span className="text-xs font-bold tracking-widest uppercase">{step.id}</span>
                <div className="w-2 h-2 rounded-full bg-black scale-0 group-hover:scale-100 transition-transform duration-500" />
              </div>
              <div className="space-y-4">
                <h3 className="text-xl md:text-2xl font-normal tracking-tight">{step.title}</h3>
                <p className="text-sm md:text-base font-light text-black/70 leading-relaxed text-justify">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
