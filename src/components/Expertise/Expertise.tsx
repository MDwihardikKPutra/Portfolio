import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const expertiseData = [
  {
    id: "01",
    title: "Software Engineering",
    description: "We develop and produce robust, scalable software solutions across web and mobile platforms, bringing innovative ideas to life through code.",
    image: "/Gallery/SmartFinance/1-smartfinance.png", // Reusing an existing image
  },
  {
    id: "02",
    title: "Digital Infrastructure",
    description: "Architecting reliable and secure server environments and network systems. We ensure your applications run smoothly with minimal downtime.",
    image: "/Gallery/HRIS/1-hris.png", // Reusing an existing image
  },
  {
    id: "03",
    title: "Data Analytics",
    description: "Transforming raw data into actionable insights. We build systems that help you understand your metrics and make informed decisions.",
    image: "/Gallery/Archi-Studio/preview-1.png", // Reusing an existing image
  }
];

export const Expertise = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="w-full h-full bg-white text-black px-4 md:px-20 lg:px-32 py-20 flex flex-col justify-center">
      <div className="w-full flex flex-col md:flex-row gap-12 md:gap-20 h-full max-h-[800px]">
        
        {/* Left Column - Navigation */}
        <div className="w-full md:w-1/3 flex flex-col justify-start">
          {expertiseData.map((item, index) => {
            const isActive = activeIndex === index;
            return (
              <div 
                key={item.id}
                onClick={() => setActiveIndex(index)}
                className="group cursor-pointer py-6 border-b border-black/10 last:border-b-0 flex items-baseline gap-6 md:gap-12 transition-all duration-500"
              >
                <span className={`text-xl md:text-2xl font-light transition-colors duration-500 ${isActive ? 'text-black' : 'text-black/30 group-hover:text-black/50'}`}>
                  {item.id}
                </span>
                <h3 className={`text-3xl md:text-5xl font-black tracking-tighter transition-colors duration-500 ${isActive ? 'text-black' : 'text-black/30 group-hover:text-black/50'}`}>
                  {item.title}
                </h3>
              </div>
            );
          })}
        </div>

        {/* Right Column - Content */}
        <div className="w-full md:w-2/3 h-[50vh] md:h-full relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 flex flex-col"
            >
              <div className="mb-8 md:mb-12 max-w-2xl">
                <p className="text-2xl md:text-4xl font-medium tracking-tight leading-tight text-black/80">
                  {expertiseData[activeIndex].description}
                </p>
                <button className="mt-4 text-black/40 hover:text-black transition-colors font-medium flex items-center gap-2 group">
                  <span className="text-xl">↳</span> 
                  <span className="text-lg underline underline-offset-4 decoration-black/20 group-hover:decoration-black transition-all">Learn More</span>
                </button>
              </div>
              
              <div className="w-full flex-1 relative overflow-hidden rounded-sm bg-gray-100">
                <div className="absolute top-4 left-4 z-10 flex justify-between w-[calc(100%-2rem)]">
                  <span className="text-xs font-bold bg-white/80 backdrop-blur-sm px-2 py-1 rounded text-black">{expertiseData[activeIndex].title}</span>
                  <span className="text-xs font-medium bg-white/80 backdrop-blur-sm px-2 py-1 rounded text-black/60">Expertise, Focus</span>
                </div>
                <img 
                  src={expertiseData[activeIndex].image} 
                  alt={expertiseData[activeIndex].title}
                  className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};
