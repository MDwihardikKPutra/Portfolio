import { motion, AnimatePresence } from "framer-motion";
import { memo, useRef, useEffect, useState } from "react";

interface ConstellationBgProps {
  pages?: number;
  labelContents?: Record<string, string>;
  showLabels?: boolean;
}

const DEFAULT_LABELS: Record<string, string> = {
  "About": "Diko Putra — Infrastructure-minded Web Developer based in Bandung, Indonesia.",
  "Core": "Bridging the gap between software operations and bare-metal server infrastructure.",
  "Galaxy": "Custom internal systems, secure Linux servers, and resilient network architectures.",
  "Works": "Sovereign-grade engineering projects, custom APIs, and high-performance React & Laravel platforms.",
  "Archive": "A 35mm manual lens photography collection capturing street, mechanical, and raw visual aesthetics.",
  "Connect": "Let's build secure networks and responsive web platforms. Get in touch for technical integrations.",
  "宮本 武蔵": "The Way of the Void — Dokkodo (The Path of Aloneness). Focus on mastering the single strike.",
  "Perspective": "Viewing the world as an interconnected web of hardware, code, and visual grain.",
  "Connection": "Technology should bridge hearts, not just data — creating digital empathy through code."
};

export const ConstellationBg = memo(({ 
  pages = 1, 
  labelContents = DEFAULT_LABELS, 
  showLabels = true 
}: ConstellationBgProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState<{ width: number; height: number } | null>(null);
  const [activeTooltip, setActiveTooltip] = useState<{ label: string, content: string, x: number, y: number } | null>(null);

  // Robust container size tracking using ResizeObserver
  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    const observer = new ResizeObserver((entries) => {
      if (!entries || entries.length === 0) return;
      const { width, height } = entries[0].contentRect;
      // Fallback to window size if layout is zero
      setDimensions({
        width: width || window.innerWidth,
        height: height || window.innerHeight
      });
    });

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  // Main canvas rendering effect
  useEffect(() => {
    if (!dimensions || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const { width, height } = dimensions;
    const dpr = window.devicePixelRatio || 1;

    // Crisp high-DPI scaling
    canvas.width = width * dpr;
    canvas.height = height * dpr;

    let animationFrameId: number;
    const isMobile = window.innerWidth < 768;
    const mouse = { x: -1000, y: -1000, radius: isMobile ? 80 : 150 };

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      label: string | null;
      opacity: number;
      isPinned: boolean;

      // Mobile geometric floating coords
      baseX: number | null = null;
      baseY: number | null = null;
      orbitAngle: number = 0;
      orbitSpeed: number = 0;
      orbitRadius: number = 0;

      constructor(label: string | null = null, isPinned = false) {
        this.label = label;
        this.isPinned = isPinned;
        this.size = label ? (isPinned ? 4.5 : 3) : 1.5;
        this.opacity = label ? (isPinned ? 1 : 0.85) : Math.random() * 0.2 + 0.15;

        const speedMult = label ? 0.15 : 0.35;
        this.vx = (Math.random() - 0.5) * speedMult;
        this.vy = (Math.random() - 0.5) * speedMult;

        this.x = Math.random() * width;
        this.y = Math.random() * height;
      }

      draw() {
        if (!ctx) return;

        // Draw particle dot
        if (!this.isPinned) {
          ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fill();
        }

        // Draw label text
        if (this.label && showLabels) {
          const isJapanese = /[^\x00-\x7F]/.test(this.label);
          const fontStack = isJapanese ? '"Noto Sans JP", sans-serif' : '"Plus Jakarta Sans", sans-serif';
          
          const fontSize = this.isPinned 
            ? (isMobile ? "18px" : "24px")
            : (isMobile ? "9px" : "12px");

          ctx.font = `600 ${fontSize} ${fontStack}`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          
          ctx.fillStyle = this.isPinned ? "rgba(255, 255, 255, 0.95)" : "rgba(255, 255, 255, 0.7)";
          
          const offsetY = this.isPinned ? 0 : 14;
          ctx.fillText(this.label, this.x, this.y - offsetY);
        }
      }

      update() {
        if (this.isPinned) return;

        // Mobile orbital floating behavior
        if (this.baseX !== null && this.baseY !== null) {
          this.orbitAngle += this.orbitSpeed;
          this.x = this.baseX + Math.sin(this.orbitAngle) * this.orbitRadius;
          this.y = this.baseY + Math.cos(this.orbitAngle) * this.orbitRadius;
          return;
        }

        // Desktop drift behavior
        this.x += this.vx;
        this.y += this.vy;

        // Repulsion from Center branding node to prevent label overlaps
        const centerX = width / 2;
        const centerY = height / 2;
        const dxCenter = this.x - centerX;
        const dyCenter = this.y - centerY;
        const halfWidth = isMobile ? 65 : 220;
        const halfHeight = isMobile ? 15 : 50;

        if (Math.abs(dxCenter) < halfWidth && Math.abs(dyCenter) < halfHeight) {
          if (Math.abs(dxCenter) / halfWidth > Math.abs(dyCenter) / halfHeight) {
            this.x += dxCenter > 0 ? (halfWidth - Math.abs(dxCenter)) + 5 : -(halfWidth - Math.abs(dxCenter)) - 5;
            this.vx *= -0.5;
          } else {
            this.y += dyCenter > 0 ? (halfHeight - Math.abs(dyCenter)) + 5 : -(halfHeight - Math.abs(dyCenter)) - 5;
            this.vy *= -0.5;
          }
        }

        // Edge bounce
        const boundary = 15;
        if (this.x < boundary || this.x > width - boundary) { this.vx *= -1; }
        if (this.y < boundary || this.y > height - boundary) { this.vy *= -1; }

        // Mouse repulsion (only for background particles without labels, so labeled nodes don't flee the cursor)
        if (!this.label) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < mouse.radius * mouse.radius) {
            const dist = Math.sqrt(distSq);
            const angle = Math.atan2(dy, dx);
            const force = (mouse.radius - dist) / mouse.radius;
            this.x -= Math.cos(angle) * force * 1.5;
            this.y -= Math.sin(angle) * force * 1.5;
          }
        }
      }
    }

    const labelKeys = showLabels ? Object.keys(labelContents) : [];
    const activeLabels = labelKeys;

    const particles: Particle[] = [];

    // Initialize labels
    activeLabels.forEach((label, idx) => {
      const p = new Particle(label);
      if (isMobile) {
        p.orbitRadius = 5 + Math.random() * 4;
        p.orbitSpeed = 0.006 + Math.random() * 0.006;
        p.orbitAngle = Math.random() * Math.PI * 2;
        
        // Symmetrically distribute all labeled nodes in a circular constellation ring around the center "Diko Putra" brand
        const angle = (idx / activeLabels.length) * Math.PI * 2 - Math.PI / 2;
        const radius = Math.min(width * 0.35, height * 0.28);
        p.baseX = width / 2 + Math.cos(angle) * radius;
        p.baseY = height / 2 + Math.sin(angle) * radius;
        
        p.x = p.baseX;
        p.y = p.baseY;
      } else {
        const paddingX = width * 0.1;
        const paddingY = height * 0.2;
        p.x = paddingX + Math.random() * (width - paddingX * 2);
        p.y = paddingY + Math.random() * (height - paddingY * 2);
      }
      particles.push(p);
    });

    // Pinned Center branding
    const centerP = new Particle("Diko Putra", true);
    centerP.x = width / 2;
    centerP.y = height / 2;
    particles.push(centerP);

    // Background extra stars
    const extraCount = (isMobile ? 35 : 150) * pages;
    for (let i = 0; i < extraCount; i++) {
      const p = new Particle();
      particles.push(p);
    }

    const drawLines = () => {
      const labeledParticles = particles.filter(p => !!p.label);

      if (isMobile) {
        const center = labeledParticles.find(p => p.isPinned);
        const outerNodes = labeledParticles.filter(p => !p.isPinned);

        // 1. Draw radial connections from center node to all outer nodes
        outerNodes.forEach(p => {
          if (!center) return;
          const dx = p.x - center.x;
          const dy = p.y - center.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const opacity = Math.max(0.04, 0.24 - (dist / width) * 0.3);

          ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(center.x, center.y);
          ctx.lineTo(p.x, p.y);
          ctx.stroke();
        });

        // 2. Draw circumferential ring connecting adjacent outer nodes
        for (let i = 0; i < outerNodes.length; i++) {
          const p1 = outerNodes[i];
          const p2 = outerNodes[(i + 1) % outerNodes.length];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const opacity = Math.max(0.04, 0.26 - (dist / width) * 0.35);

          ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      } else {
        // Desktop mesh connection
        for (let i = 0; i < labeledParticles.length; i++) {
          for (let j = i + 1; j < labeledParticles.length; j++) {
            const p1 = labeledParticles[i];
            const p2 = labeledParticles[j];
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < width * 0.4) {
              const opacity = Math.max(0.04, 0.3 - (dist / width) * 0.42);
              ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
              ctx.lineWidth = 0.6;
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          }
        }
      }
    };

    let isInView = false;
    let cachedRect = canvas.getBoundingClientRect();
    const updateRect = () => {
      cachedRect = canvas.getBoundingClientRect();
    };

    const animate = () => {
      if (!isInView) return;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.scale(dpr, dpr);

      // Keep pinned center and mobile geometric base coordinates responsive
      const center = particles.find(p => p.isPinned);
      if (center) {
        center.x = width / 2;
        center.y = height / 2;
      }

      if (isMobile) {
        const outerNodes = particles.filter(p => p.label && !p.isPinned);
        outerNodes.forEach((p, idx) => {
          const angle = (idx / outerNodes.length) * Math.PI * 2 - Math.PI / 2;
          const radius = Math.min(width * 0.35, height * 0.28);
          p.baseX = width / 2 + Math.cos(angle) * radius;
          p.baseY = height / 2 + Math.sin(angle) * radius;
        });
      }

      let foundHover = false;

      // Update & Draw particles
      particles.forEach(p => {
        p.update();
        p.draw();

        // Tooltip detection
        if (p.label && !foundHover && showLabels) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 32) {
            setActiveTooltip({
              label: p.label,
              content: labelContents[p.label] || "",
              x: p.x,
              y: p.y
            });
            foundHover = true;
          }
        }
      });

      drawLines();

      if (!foundHover) {
        setActiveTooltip(null);
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const wasInView = isInView;
          isInView = entry.isIntersecting;
          if (isInView && !wasInView) {
            updateRect();
            animate();
          }
        });
      },
      { threshold: 0.05 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX - cachedRect.left;
      mouse.y = e.clientY - cachedRect.top;
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouse.x = e.touches[0].clientX - cachedRect.left;
        mouse.y = e.touches[0].clientY - cachedRect.top;
      }
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleMouseLeave, { passive: true });
    window.addEventListener("scroll", updateRect, { passive: true });
    window.addEventListener("resize", updateRect, { passive: true });

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchStart);
      window.removeEventListener("touchend", handleMouseLeave);
      window.removeEventListener("scroll", updateRect);
      window.removeEventListener("resize", updateRect);
    };
  }, [dimensions, pages, labelContents, showLabels]);

  return (
    <div 
      ref={containerRef}
      className={`absolute inset-0 z-0 w-full h-full ${activeTooltip ? 'pointer-events-auto' : 'pointer-events-none'}`}
    >
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 z-0 pointer-events-auto w-full h-full"
      />

      <AnimatePresence>
        {activeTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ 
              opacity: 1, 
              left: activeTooltip.x, 
              top: activeTooltip.y + 15 
            }}
            exit={{ opacity: 0, y: 15 }}
            transition={{ 
              type: "spring",
              damping: 20,
              stiffness: 200,
              opacity: { duration: 0.2 }
            }}
            className="absolute z-50 pointer-events-none"
            style={{ 
              translateX: '-50%'
            }}
          >
            <p className="text-[8px] font-bold text-white tracking-[0.1em] text-left max-w-[180px] leading-relaxed drop-shadow-[0_2px_10px_rgba(255,255,255,0.3)]">
              {activeTooltip.content}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});
