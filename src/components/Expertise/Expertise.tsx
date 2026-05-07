import { useState } from "react";
import { motion } from "framer-motion";

const expertiseData = [
  {
    id: "1",
    title: "Software Engineering",
    description: "We develop and produce robust, scalable software solutions across web and mobile platforms, bringing innovative ideas to life through code.",
    subDescription: "Focusing on performance, maintainability, and clean architecture to ensure long-term success.",
    image: "/Gallery/SmartFinance/1-smartfinance.png",
  },
  {
    id: "2",
    title: "Digital Infrastructure",
    description: "Architecting reliable and secure server environments and network systems. We ensure your applications run smoothly with minimal downtime.",
    subDescription: "Leveraging cloud technologies and automation to build resilient systems that scale with your growth.",
    image: "/Gallery/HRIS/1-hris.png",
  },
  {
    id: "3",
    title: "Data Analytics",
    description: "Transforming raw data into actionable insights. We build systems that help you understand your metrics and make informed decisions.",
    subDescription: "Using advanced visualization and statistical methods to reveal the story hidden within your numbers.",
    image: "/Gallery/Archi-Studio/preview-1.png",
  },
  {
    id: "4",
    title: "UI/UX Design",
    description: "Crafting intuitive and engaging user experiences. We focus on user behavior and modern design principles to build products that people love to use.",
    subDescription: "Human-centered design approach that bridges the gap between complex functionality and seamless interaction.",
    image: "/Gallery/SmartFinance/1-smartfinance.png",
  }
];

export const Expertise = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="w-full bg-white text-black relative">
      
      {/* Top Mask to cover the gap above the first header */}
      <div className="w-full h-20 sticky top-0 bg-white z-30 pointer-events-none" />

      <div className="w-full pb-0">
        {expertiseData.map((item, index) => {
          const isActive = activeIndex === index;
          
          return (
            <div key={item.id} className="contents">
              {/* Anchor for active state trigger */}
              <div 
                className="h-0" 
                style={{ scrollMarginTop: `${80 + index * 85}px` }} 
              />
              
              {/* Sticky Header that stacks vertically (Menumpuk) */}
              <div 
                className={`w-full sticky z-20 bg-white border-t border-black/10 transition-colors duration-500 snap-start snap-always`}
                style={{ top: `${80 + index * 85}px` }}
              >
                <div className="px-6 md:px-20 lg:px-32 py-6 grid grid-cols-1 md:grid-cols-3 items-center h-[85px] gap-8 lg:gap-16">
                  {/* Col 1: Title */}
                  <div className="col-span-1 flex gap-4 items-center">
                    <span className={`text-sm font-normal transition-colors duration-500 ${index > activeIndex ? 'text-black/20' : 'text-black/60'}`}>0{index + 1}</span>
                    <h3 className={`text-3xl md:text-4xl font-normal tracking-tight whitespace-nowrap transition-colors duration-500 ${index > activeIndex ? 'text-black/30' : 'text-black'}`}>
                      {item.title}
                    </h3>
                  </div>

                  {/* Col 2: Empty space */}
                  <div className="hidden md:block col-span-1" />

                  {/* Col 3: Icon */}
                  <div className="col-span-1 flex justify-end items-center">
                    <span className="text-3xl font-light text-black">
                      {isActive ? '—' : '+'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Scrolling Content - High-Precision Trigger */}
              <motion.div
                initial={false}
                onViewportEnter={() => setActiveIndex(index)}
                viewport={{ amount: 0.2, margin: "-20% 0px -20% 0px" }}
                className={`w-full bg-white relative z-10 transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
              >
                <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-16 items-start px-6 md:px-20 lg:px-32 pb-6">
                  
                  {/* Column 1: Image (Under Title) */}
                  <div className="col-span-1 transform translate-x-[10%]">
                    <div className="w-[80%] aspect-[16/9] bg-gray-100 rounded-sm overflow-hidden relative">
                      <div className="absolute top-4 left-4 z-10 flex justify-between w-[calc(100%-2rem)]">
                        <span className="text-xs font-normal bg-white/90 backdrop-blur-md px-2 py-1 rounded text-black">{item.id}</span>
                        <span className="text-xs font-normal bg-white/90 backdrop-blur-md px-2 py-1 rounded text-black/60">Expertise</span>
                      </div>
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
                      />
                    </div>
                  </div>

                  {/* Column 2: Text */}
                  <div className="col-span-1 flex flex-col justify-start md:pl-12 lg:pl-20">
                    <h4 className="text-3xl md:text-4xl font-normal leading-tight mb-8 text-black tracking-tight text-justify">
                      {item.description} 
                    </h4>
                    <a href="#" className="text-black/40 hover:text-black transition-colors font-light inline-flex items-center gap-2 group w-fit text-lg">
                      Explore Capability <span className="transition-transform group-hover:translate-x-2">→</span>
                    </a>
                  </div>

                  {/* Column 3: Additional Text */}
                  <div className="col-span-1 flex flex-col justify-start">
                    <p className="text-lg font-light text-black/60 leading-relaxed italic text-justify">
                      {item.subDescription}
                    </p>
                  </div>

                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
      {/* Buffer space and final snap point for item 4 */}
      <div className="h-[20vh] w-full snap-end pointer-events-none" />
    </div>
  );
};
