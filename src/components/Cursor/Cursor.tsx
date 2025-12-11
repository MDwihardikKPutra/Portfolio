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

  const [cursorPosition, setCursorPosition] = useState({ x: -100, y: -100 });

  useEffect(() => {
    // Check if device supports touch
    const checkTouchDevice = () => {
      return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    };
    
    setIsTouchDevice(checkTouchDevice());
  }, []);

  useEffect(() => {
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
    const checkInteractive = (target: HTMLElement): boolean => {
      const tagName = target.tagName.toLowerCase();
      const isLink = tagName === "a" || target.closest("a") !== null;
      const isButton = tagName === "button" || target.closest("button") !== null;
      const isInput = ["input", "textarea", "select"].includes(tagName);
      const hasOnClick = target.onclick !== null || target.getAttribute("onclick") !== null;
      const computedStyle = window.getComputedStyle(target);
      const isPointer = computedStyle.cursor === "pointer" || computedStyle.cursor === "grab";
      const hasHoverEffect = target.classList.contains("hover:") || 
                            target.closest("[class*='hover:']") !== null ||
                            target.closest("motion.") !== null;

      return isLink || isButton || isInput || hasOnClick || isPointer || hasHoverEffect;
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

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    document.body.addEventListener("mouseleave", handleMouseLeave);
    document.body.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      document.body.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, []);

  // Don't render cursor on touch devices
  if (isTouchDevice) {
    return null;
  }

  return (
    <>
      <div
        className={`fixed top-0 left-0 pointer-events-none z-[9999] ${
          isHidden ? "opacity-0" : "opacity-100"
        }`}
        style={{
          left: cursorPosition.x,
          top: cursorPosition.y,
          transform: "translate(-50%, -50%)",
          transition: "opacity 0.2s ease",
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
        className={`fixed top-0 left-0 pointer-events-none z-[9999] ${
          isHidden ? "opacity-0" : "opacity-100"
        }`}
        style={{
          left: cursorPosition.x,
          top: cursorPosition.y,
          transform: "translate(-50%, -50%)",
          transition: "opacity 0.2s ease",
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

