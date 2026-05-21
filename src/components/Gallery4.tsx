"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "./ui/carousel";

export interface Gallery4Item {
  id: string;
  title: string;
  description: string;
  href: string;
  image: string;
}

export interface Gallery4Props {
  title?: string;
  description?: string;
  items?: Gallery4Item[];
}

const Gallery4 = ({
  title = "Case Studies",
  description = "Discover how leading companies and developers are leveraging modern web technologies to build exceptional digital experiences.",
  items = [],
}: Gallery4Props) => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!carouselApi) {
      return;
    }
    const updateSelection = () => {
      setCurrentSlide(carouselApi.selectedScrollSnap());
    };
    updateSelection();
    carouselApi.on("select", updateSelection);
    return () => {
      carouselApi.off("select", updateSelection);
    };
  }, [carouselApi]);

  const showHeader = title || description;

  return (
    <section className={`pb-0 md:pb-0 bg-bg-primary text-text-primary w-full border-t border-border-primary ${showHeader ? "pt-10 md:pt-12" : "pt-0"}`}>
      {showHeader && (
        <div className="mb-12 editorial-grid items-start px-4 md:px-8 lg:px-12">
          {/* Column 1: Label */}
          <div className="col-span-12 lg:col-span-3 flex justify-between items-start">
            <span className="editorial-label font-normal text-text-primary/60">{title}</span>
          </div>

          {/* Column 2: Description (Aligned Left) */}
          <div className="col-span-12 lg:col-span-4 mt-2 lg:mt-0 lg:pr-20">
            <h2 className="text-[15px] md:text-[16px] leading-relaxed font-normal tracking-tight text-text-primary text-left">
              {description}
            </h2>
          </div>

          {/* Column 3: Spacer */}
          <div className="hidden lg:block lg:col-span-5" />
        </div>
      )}
      
      <div className="w-full pl-4 md:pl-8 lg:pl-12 overflow-hidden">
        <Carousel
          setApi={setCarouselApi}
          options={{
            align: "start",
            containScroll: "trimSnaps",
          }}
        >
          <CarouselContent className="-ml-4 gap-6">
            {items.map((item) => (
              <CarouselItem
                key={item.id}
                className="pl-4 w-[28%] min-w-[240px] md:min-w-[290px] lg:min-w-[340px] select-none flex-shrink-0"
              >
                <a 
                  href={item.href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="group block rounded-none overflow-hidden cursor-pointer"
                >
                  {/* Perfect Raw Screenshot frame (No shadows, no dark gradient overlays, just a clean fine line) */}
                  <div className="w-full aspect-[16/10] overflow-hidden bg-surface relative border border-border-primary/50">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-[1200ms] ease-[0.16,1,0.3,1] group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                    
                    {/* Tiny slide-in brand indicator bar in top-right corner on hover */}
                    <div className="absolute top-0 right-0 w-8 h-[2px] bg-text-primary origin-right scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                  </div>

                  {/* Elegant, clean editorial text caption underneath the image */}
                  <div className="mt-3.5 flex flex-col items-start text-left">
                    <div className="text-[13px] font-bold text-text-primary flex items-center gap-2">
                      <span className="border-b border-transparent group-hover:border-text-primary transition-colors duration-300">
                        {item.title}
                      </span>
                      <motion.span 
                        className="inline-block text-[13px] font-light text-text-primary/50 group-hover:text-text-primary transition-all duration-300 group-hover:translate-x-1.5"
                        animate={{ x: 0 }}
                        whileHover={{ x: 3 }}
                      >
                        →
                      </motion.span>
                    </div>
                    <div className="mt-1 text-[11.5px] leading-relaxed text-text-primary/75 font-light line-clamp-2 max-w-[90%]">
                      {item.description}
                    </div>
                  </div>
                </a>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      {/* Centered Pagination Indicator Dots below the Carousel */}
      <div className="flex justify-center items-center gap-2 mt-8 pb-10">
        {items.map((_, index) => (
          <button
            key={index}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              currentSlide === index ? "w-6 bg-text-primary" : "w-1.5 bg-border-primary"
            }`}
            onClick={() => carouselApi?.scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export { Gallery4 };
