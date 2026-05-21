"use client"

import { motion } from "framer-motion"
import { useState } from "react"

function cn(...inputs: (string | undefined | null | boolean)[]) {
  return inputs.filter(Boolean).join(" ");
}

interface PortfolioGalleryProps {
  title?: string;
  archiveButton?: {
    text: string;
    href: string;
  };
  images?: Array<{
    src: string;
    alt: string;
    title?: string;
  }>;
  className?: string;
  maxHeight?: number;
  spacing?: string;
  onImageClick?: (index: number) => void;
  /**
   * Whether to pause marquee animation on hover (mobile only)
   * @default true
   */
  pauseOnHover?: boolean;
}

export function PortfolioGallery({
  title = "Browse my library",
  archiveButton: _archiveButton = {
    text: "View gallery",
    href: "/projects"
  },
  images: customImages,
  className = "",
  maxHeight = 120,
  spacing = "-space-x-72 md:-space-x-80",
  onImageClick,
  pauseOnHover = true
}: PortfolioGalleryProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  
  const defaultImages = [
    {
      src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&q=80",
      alt: "SaaS Dashboard Design",
    },
    {
      src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&q=80",
      alt: "Web Development",
    },
    {
      src: "https://images.unsplash.com/photo-1553028826-f4804a6dba3b?w=800&h=600&fit=crop&q=80",
      alt: "E-Commerce Platform",
    },
    {
      src: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop&q=80",
      alt: "Mobile App Design",
    },
    {
      src: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&h=600&fit=crop&q=80",
      alt: "Brand Identity",
    },
    {
      src: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop&q=80",
      alt: "Marketing Campaign",
    },
    {
      src: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=600&fit=crop&q=80",
      alt: "Product Photography",
    },
    {
      src: "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=800&h=600&fit=crop&q=80",
      alt: "Packaging Design",
    },
    {
      src: "https://images.unsplash.com/photo-1553028826-f4804a6dba3b?w=800&h=600&fit=crop&q=80",
      alt: "Tech Innovation",
    },
    {
      src: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&h=600&fit=crop&q=80",
      alt: "Future Vision",
    },
  ]
  
  const images = customImages || defaultImages

  return (
    <section
      aria-label={title}
      className={`relative pt-16 pb-2 px-0 bg-bg-primary border-b border-border-primary ${className}`}
      id="archives"
    >
      {/* Self-contained marquee style declaration */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        .animate-marquee-scroll {
          animation: marquee-scroll 25s linear infinite;
        }
      `}} />

      <div className="w-full max-w-none bg-bg-primary overflow-hidden relative">
        
        {/* Centered Minimalist Header */}
        <div className="w-full flex flex-col items-center justify-center text-center mb-10 px-4">
          <h2 className="text-[4.75vw] sm:text-[3.75vw] md:text-[2.9vw] lg:text-[2.6vw] xl:text-[2.55vw] font-medium tracking-tighter font-helvetica text-text-primary">
            Explore it
          </h2>
        </div>

        {/* Desktop 3D overlapping layout - hidden on mobile */}
        <div className="hidden md:block relative overflow-hidden h-[420px] -mb-[180px] w-full">
          <div className={`flex ${spacing} pb-8 pt-40 items-end justify-center`}>
            {images.map((image, index) => {
              // Calculate stagger height - peak in middle, descending to edges
              const totalImages = images.length
              const middle = Math.floor(totalImages / 2)
              const distanceFromMiddle = Math.abs(index - middle)
              const staggerOffset = maxHeight - distanceFromMiddle * 18

              const zIndex = totalImages - index

              const isHovered = hoveredIndex === index
              const isOtherHovered = hoveredIndex !== null && hoveredIndex !== index

              // When hovering: hovered card moves to consistent top position, others move to baseline
              const yOffset = isHovered ? -120 : isOtherHovered ? 0 : -staggerOffset

              return (
                <motion.div
                  key={index}
                  className="group/item cursor-pointer flex-shrink-0"
                  style={{
                    zIndex: zIndex,
                  }}
                  initial={{
                    transform: `perspective(5000px) rotateY(-45deg) translateY(200px)`,
                    opacity: 0,
                  }}
                  animate={{
                    transform: `perspective(5000px) rotateY(-45deg) translateY(${yOffset}px)`,
                    opacity: 1,
                  }}
                  transition={{
                    duration: 0.25, // Much faster hover animation
                    delay: index * 0.04, // Faster entrance stagger
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                  onHoverStart={() => setHoveredIndex(index)}
                  onHoverEnd={() => setHoveredIndex(null)}
                  onClick={() => onImageClick?.(index)}
                >
                  <div
                    className="relative w-64 h-36 md:w-80 md:h-[180px] lg:w-96 lg:h-[216px] rounded-lg overflow-hidden transition-transform duration-300 group-hover/item:scale-105"
                    style={{
                      boxShadow: `
                        rgba(0, 0, 0, 0.05) 0.796192px 0px 0.796192px 0px,
                        rgba(0, 0, 0, 0.1) 2.41451px 0px 2.41451px 0px,
                        rgba(0, 0, 0, 0.15) 6.38265px 0px 6.38265px 0px,
                        rgba(0, 0, 0, 0.35) 20px 0px 20px 0px
                      `,
                    }}
                  >
                    <img
                      src={image.src || "/placeholder.svg"}
                      alt={image.alt}
                      className="w-full h-full object-cover object-left-top"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Mobile marquee layout */}
        <div className="block md:hidden relative pb-10 overflow-hidden w-full">
          <div
            className="group flex overflow-hidden p-0 gap-0 flex-row w-full relative"
          >
            <div className={cn(
              "flex shrink-0 justify-around gap-0 animate-marquee-scroll min-w-full",
              pauseOnHover && "group-hover:[animation-play-state:paused]"
            )}>
              {images.map((image, index) => (
                <div
                  key={`track1-${index}`}
                  className="group/item cursor-pointer flex-shrink-0"
                  onClick={() => onImageClick?.(index)}
                >
                  <div
                    className="relative w-64 h-36 rounded-lg overflow-hidden transition-transform duration-300 group-hover/item:scale-105"
                    style={{
                      boxShadow: `
                        rgba(0, 0, 0, 0.05) 0.796192px 0px 0.796192px 0px,
                        rgba(0, 0, 0, 0.1) 2.41451px 0px 2.41451px 0px,
                        rgba(0, 0, 0, 0.15) 6.38265px 0px 6.38265px 0px,
                        rgba(0, 0, 0, 0.35) 20px 0px 20px 0px
                      `,
                    }}
                  >
                    <img
                      src={image.src || "/placeholder.svg"}
                      alt={image.alt}
                      className="w-full h-full object-cover object-left-top"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className={cn(
              "flex shrink-0 justify-around gap-0 animate-marquee-scroll min-w-full",
              pauseOnHover && "group-hover:[animation-play-state:paused]"
            )} aria-hidden="true">
              {images.map((image, index) => (
                <div
                  key={`track2-${index}`}
                  className="group/item cursor-pointer flex-shrink-0"
                  onClick={() => onImageClick?.(index)}
                >
                  <div
                    className="relative w-64 h-36 rounded-lg overflow-hidden transition-transform duration-300 group-hover/item:scale-105"
                    style={{
                      boxShadow: `
                        rgba(0, 0, 0, 0.05) 0.796192px 0px 0.796192px 0px,
                        rgba(0, 0, 0, 0.1) 2.41451px 0px 2.41451px 0px,
                        rgba(0, 0, 0, 0.15) 6.38265px 0px 6.38265px 0px,
                        rgba(0, 0, 0, 0.35) 20px 0px 20px 0px
                      `,
                    }}
                  >
                    <img
                      src={image.src || "/placeholder.svg"}
                      alt={image.alt}
                      className="w-full h-full object-cover object-left-top"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
