import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface CursorProps {
  isDarkMode: boolean;
}

export const Cursor = ({ isDarkMode }: CursorProps) => {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Check if device supports touch
    const checkTouchDevice = () => {
      return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    };
    
    setIsTouchDevice(checkTouchDevice());
    setIsMounted(true);
    
    // Initialize cursor position to center of screen
    if (typeof window !== 'undefined') {
      setCursorPosition({ 
        x: window.innerWidth / 2, 
        y: window.innerHeight / 2 
      });
    }
  }, []);

  useEffect(() => {
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
      setIsHidden(false);
    };

    const handleMouseLeave = () => {
      setIsHidden(true);
    };

    const handleMouseEnter = () => {
      setIsHidden(false);
    };

    const handleMouseDown = () => {
      setIsClicking(true);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    // Check for interactive elements
    const checkInteractive = (target: HTMLElement | null): boolean => {
      if (!target) return false;
      
      const tagName = target.tagName.toLowerCase();
      const isLink = tagName === "a" || target.closest("a") !== null;
      const isButton = tagName === "button" || target.closest("button") !== null;
      const isInput = ["input", "textarea", "select"].includes(tagName);
      
      try {
        const computedStyle = window.getComputedStyle(target);
        const isPointer = computedStyle.cursor === "pointer" || computedStyle.cursor === "grab";
        return isLink || isButton || isInput || isPointer;
      } catch (e) {
        return isLink || isButton || isInput;
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target) {
        setIsHovering(checkInteractive(target));
      }
    };

    const handleMouseOut = () => {
      setIsHovering(false);
    };

    // Use window instead of document for better compatibility
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    window.addEventListener("mouseout", handleMouseOut, { passive: true });
    window.addEventListener("mousedown", handleMouseDown, { passive: true });
    window.addEventListener("mouseup", handleMouseUp, { passive: true });
    
    const body = document.body;
    if (body) {
      body.addEventListener("mouseleave", handleMouseLeave, { passive: true });
      body.addEventListener("mouseenter", handleMouseEnter, { passive: true });
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      if (body) {
        body.removeEventListener("mouseleave", handleMouseLeave);
        body.removeEventListener("mouseenter", handleMouseEnter);
      }
    };
  }, [isTouchDevice]);

  // Don't render cursor on touch devices or before mount
  if (isTouchDevice || !isMounted) {
    return null;
  }

  return (
    <>
      <div
        className={`fixed pointer-events-none z-[10000] ${
          isHidden ? "opacity-0" : "opacity-100"
        }`}
        style={{
          left: `${cursorPosition.x}px`,
          top: `${cursorPosition.y}px`,
          transform: "translate(-50%, -50%)",
          transition: "opacity 0.2s ease",
          willChange: "transform",
        }}
      >
        {/* Outer ring */}
        <motion.div
          className={`rounded-full border ${
            isDarkMode
              ? "border-[#f5f5f5] bg-[#f5f5f5]/10"
              : "border-[#1a1a1a] bg-[#1a1a1a]/10"
          }`}
          animate={{
            width: isClicking ? 16 : isHovering ? 40 : 20,
            height: isClicking ? 16 : isHovering ? 40 : 20,
            scale: isClicking ? 0.8 : 1,
          }}
          transition={{
            duration: 0.2,
            ease: "easeOut",
          }}
        />
      </div>

      {/* Inner dot */}
      <div
        className={`fixed pointer-events-none z-[10000] ${
          isHidden ? "opacity-0" : "opacity-100"
        }`}
        style={{
          left: `${cursorPosition.x}px`,
          top: `${cursorPosition.y}px`,
          transform: "translate(-50%, -50%)",
          transition: "opacity 0.2s ease",
          willChange: "transform",
        }}
      >
        <motion.div
          className={`rounded-full ${
            isDarkMode ? "bg-[#f5f5f5]" : "bg-[#1a1a1a]"
          }`}
          style={{
            width: "4px",
            height: "4px",
          }}
          animate={{
            scale: isClicking ? 0.5 : 1,
          }}
          transition={{
            duration: 0.2,
            ease: "easeOut",
          }}
        />
      </div>
    </>
  );
};

