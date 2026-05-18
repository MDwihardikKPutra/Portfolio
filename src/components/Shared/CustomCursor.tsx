import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Define 6 trailing springs for the gooey effect
  const s1x = useSpring(mouseX, { damping: 20, stiffness: 300 });
  const s1y = useSpring(mouseY, { damping: 20, stiffness: 300 });
  
  const s2x = useSpring(mouseX, { damping: 25, stiffness: 250 });
  const s2y = useSpring(mouseY, { damping: 25, stiffness: 250 });
  
  const s3x = useSpring(mouseX, { damping: 30, stiffness: 200 });
  const s3y = useSpring(mouseY, { damping: 30, stiffness: 200 });
  
  const s4x = useSpring(mouseX, { damping: 35, stiffness: 150 });
  const s4y = useSpring(mouseY, { damping: 35, stiffness: 150 });
  
  const s5x = useSpring(mouseX, { damping: 40, stiffness: 100 });
  const s5y = useSpring(mouseY, { damping: 40, stiffness: 100 });

  const trails = [
    { x: s1x, y: s1y, size: 24 },
    { x: s2x, y: s2y, size: 20 },
    { x: s3x, y: s3y, size: 16 },
    { x: s4x, y: s4y, size: 12 },
    { x: s5x, y: s5y, size: 8 },
  ];

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') ||
        target.classList.contains('cursor-pointer');
      
      setIsHovering(!!isInteractive);
    };

    const handleMouseOut = () => {
      setIsHovering(false);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  if (typeof window === 'undefined') return null;

  return (
    <>
      {/* SVG Filter for Gooey Effect */}
      <svg className="hidden">
        <defs>
          <filter id="gooey">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feColorMatrix 
              in="blur" 
              mode="matrix" 
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" 
              result="goo" 
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      <div 
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-[9999] hidden md:block"
        style={{ filter: "url(#gooey)" }}
      >
        {trails.map((trail, i) => (
          <motion.div
            key={i}
            className="absolute top-0 left-0 rounded-full bg-text-primary mix-blend-difference"
            style={{
              x: trail.x,
              y: trail.y,
              translateX: "-50%",
              translateY: "-50%",
              opacity: isVisible ? 1 : 0,
              width: isHovering ? trail.size * 1.5 : trail.size,
              height: isHovering ? trail.size * 1.5 : trail.size,
            }}
          />
        ))}
      </div>
    </>
  );
};
