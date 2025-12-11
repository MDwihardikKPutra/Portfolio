import { useEffect, useState } from "react";

interface CursorProps {
  isDarkMode: boolean;
}

export const Cursor = ({ isDarkMode }: CursorProps) => {
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

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    
    const body = document.body;
    if (body) {
      body.addEventListener("mouseleave", handleMouseLeave, { passive: true });
      body.addEventListener("mouseenter", handleMouseEnter, { passive: true });
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
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
    <div
      className={`fixed pointer-events-none z-[10000] ${
        isHidden ? "opacity-0" : "opacity-100"
      }`}
      style={{
        left: `${cursorPosition.x}px`,
        top: `${cursorPosition.y}px`,
        transform: "translate(-50%, -50%)",
        transition: "opacity 0.2s ease",
      }}
    >
      {/* Simple dot */}
      <div
        className={`rounded-full ${
          isDarkMode ? "bg-[#f5f5f5]" : "bg-[#1a1a1a]"
        }`}
        style={{
          width: "8px",
          height: "8px",
        }}
      />
    </div>
  );
};
