import { useInView, motion, AnimatePresence } from "framer-motion";
import { memo, useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface ConstellationBgProps {
  pages?: number;
  labelContents?: Record<string, string>;
  showLabels?: boolean;
}

const DEFAULT_LABELS: Record<string, string> = {
  "About": "Navigation Start",
  "Core": "The Manifesto",
  "Galaxy": "Digital Installation",
  "Works": "Engineering Projects",
  "Archive": "Photography Archive",
  "Connect": "Let's Bridge Hearts",
  "宮本 武蔵": "The Way of the Void",
  "Perspective": "35mm Minimalist Lens",
  "Connection": "Technology should bridge hearts, not just data"
};

export const ConstellationBg = memo(({ 
  pages = 1, 
  labelContents = DEFAULT_LABELS, 
  showLabels = true 
}: ConstellationBgProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef);
  const navigate = useNavigate();
  
  const [activeTooltip, setActiveTooltip] = useState<{ label: string, content: string, x: number, y: number } | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    
    const labelKeys = showLabels ? Object.keys(labelContents) : [];
    const mouse = { x: -1000, y: -1000, radius: 150 };

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      isPinned: boolean;

      constructor(label: string | null = null, isPinned = false) {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        const speedMult = label ? 0.15 : 0.4;
        this.vx = (Math.random() - 0.5) * speedMult;
        this.vy = (Math.random() - 0.5) * speedMult;
        this.size = label ? 3 : 1.5;
        this.label = label;
        this.opacity = label ? 0.9 : Math.random() * 0.2 + 0.1;
        this.isPinned = isPinned;
      }

      draw() {
        if (!ctx) return;
        
        // Skip drawing the dot for pinned particles (branding)
        if (!this.isPinned) {
          ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fill();
        }

        if (this.label && showLabels) {
          const isJapanese = /[^\x00-\x7F]/.test(this.label);
          const fontStack = isJapanese ? '"Noto Sans JP", sans-serif' : '"Plus Jakarta Sans", sans-serif';
          
          // Adaptive font size (Optimized for Mobile)
          const isMobile = window.innerWidth < 768;
          const fontSize = this.isPinned 
            ? (isMobile ? "18px" : "24px")
            : (isMobile ? "9px" : "12px");
            
          ctx.font = `600 ${fontSize} ${fontStack}`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          
          // No offset for pinned (branding) to keep it perfectly centered on the lines
          const offsetY = this.isPinned ? 0 : 15;
          ctx.fillText(this.label, this.x, this.y - offsetY);
        }
      }

      update(paddingX: number, paddingY: number, safeWidth: number, safeHeight: number) {
        if (this.isPinned) return;

        // --- ULTRA-SLOW PERPETUAL DRIFT ---
        if (this.label) {
          // Labeled icons: Eternal micro-drift
          this.vx += (Math.random() - 0.5) * 0.005;
          this.vy += (Math.random() - 0.5) * 0.005;
          this.vx *= 0.999;
          this.vy *= 0.999;
        } else {
          // Background stars: Very subtle movement
          this.vx += (Math.random() - 0.5) * 0.012;
          this.vy += (Math.random() - 0.5) * 0.012;
          this.vx *= 0.99;
          this.vy *= 0.99;
        }

        this.x += this.vx;
        this.y += this.vy;

        const textPadding = 60;
        if (this.label) {
          if (this.x < paddingX + textPadding) { this.vx *= -1; }
          if (this.x > paddingX + safeWidth - textPadding) { this.vx *= -1; }
          if (this.y < paddingY + 20) { this.vy *= -1; }
          if (this.y > paddingY + safeHeight - 20) { this.vy *= -1; }
        } else {
          if (this.x < 10) { this.vx *= -1; }
          if (this.x > canvas.width - 10) { this.vx *= -1; }
          if (this.y < 10) { this.vy *= -1; }
          if (this.y > canvas.height - 10) { this.vy *= -1; }
        }

        let mdx = mouse.x - this.x;
        let mdy = mouse.y - this.y;
        let distance = Math.sqrt(mdx * mdx + mdy * mdy);
        if (distance < mouse.radius && !this.label) {
            const mAngle = Math.atan2(mdy, mdx);
            const force = (mouse.radius - distance) / mouse.radius;
            this.x -= Math.cos(mAngle) * force * 1.8;
            this.y -= Math.sin(mAngle) * force * 1.8;
        }
      }
    }

    const init = () => {
      canvas.width = window.innerWidth * pages;
      canvas.height = window.innerHeight;
      particles = [];
      const paddingX = window.innerWidth * 0.1;
      const paddingY = window.innerHeight * 0.2;
      const safeWidth = canvas.width - paddingX * 2;
      const safeHeight = canvas.height - paddingY * 2;
      
      labelKeys.forEach(label => {
        const p = new Particle(label);
        p.x = paddingX + Math.random() * safeWidth;
        p.y = paddingY + Math.random() * safeHeight;
        particles.push(p);
      });

      // Special Pinned Center Title
      const centerP = new Particle("Dyko Putra", true);
      centerP.x = canvas.width / 2;
      centerP.y = canvas.height / 2;
      centerP.size = 4;
      centerP.opacity = 1;
      particles.push(centerP);

      const extraCount = (window.innerWidth < 768 ? 150 : 400) * pages;
      for (let i = 0; i < extraCount; i++) {
        const p = new Particle();
        p.vx = (Math.random() - 0.5) * 0.6;
        p.vy = (Math.random() - 0.5) * 0.6;
        p.x = Math.random() * canvas.width;
        p.y = Math.random() * canvas.height;
        particles.push(p);
      }
    };

    const drawLines = () => {
      const labeledParticles = particles.filter(p => !!p.label);

      for (let i = 0; i < labeledParticles.length; i++) {
        for (let j = i + 1; j < labeledParticles.length; j++) {
            const p1 = labeledParticles[i];
            const p2 = labeledParticles[j];
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const distSq = dx * dx + dy * dy;
            const dist = Math.sqrt(distSq);
            
            const opacity = Math.max(0.05, 0.3 - (dist / canvas.width) * 0.4);
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
        }
      }
    };

    const animate = () => {
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      const paddingX = window.innerWidth * 0.1;
      const paddingY = window.innerHeight * 0.2;
      const safeWidth = canvas.width - paddingX * 2;
      const safeHeight = canvas.height - paddingY * 2;

      let foundHover = false;
      const labeledParticles = particles.filter(p => !!p.label);
      const pinnedParticle = particles.find(p => p.isPinned);

      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        // 1. Repulsion from Pinned Center (Wide Rectangular Force Field)
        if (pinnedParticle && p1 !== pinnedParticle) {
          const dx = p1.x - pinnedParticle.x;
          const dy = p1.y - pinnedParticle.y;
          
          // Define a wide box protection zone for the long text (Responsive)
          const isMobile = window.innerWidth < 768;
          const halfWidth = isMobile ? 120 : 220; 
          const halfHeight = isMobile ? 35 : 50; 
          
          const absDx = Math.abs(dx);
          const absDy = Math.abs(dy);
          
          if (absDx < halfWidth && absDy < halfHeight) {
            // Push out based on the closest edge
            if (absDx / halfWidth > absDy / halfHeight) {
                p1.x += dx > 0 ? (halfWidth - absDx) + 5 : -(halfWidth - absDx) - 5;
                p1.vx *= -0.5; // Bounce effect
            } else {
                p1.y += dy > 0 ? (halfHeight - absDy) + 5 : -(halfHeight - absDy) - 5;
                p1.vy *= -0.5;
            }
          }
        }

        // 2. Repulsion between labeled particles
        if (p1.label) {
          for (let j = 0; j < labeledParticles.length; j++) {
            const p2 = labeledParticles[j];
            if (p1 === p2) continue;
            
            const dx = p2.x - p1.x;
            const dy = p2.y - p1.y;
            const distSq = dx * dx + dy * dy;
            const minDist = 80;
            if (distSq < minDist * minDist) {
                const dist = Math.sqrt(distSq);
                const angle = Math.atan2(dy, dx);
                const force = (minDist - dist) / minDist;
                const pushX = Math.cos(angle) * force * 0.5;
                const pushY = Math.sin(angle) * force * 0.5;
                
                // Only move if NOT pinned
                if (!p1.isPinned) {
                  p1.x -= pushX;
                  p1.y -= pushY;
                }
                if (!p2.isPinned) {
                  p2.x += pushX;
                  p2.y += pushY;
                }
            }
          }
        }

        p1.update(paddingX, paddingY, safeWidth, safeHeight);
        p1.draw();

        if (p1.label && !foundHover && showLabels) {
            const dx = mouse.x - p1.x;
            const dy = mouse.y - p1.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 30) {
                setActiveTooltip({
                    label: p1.label!,
                    content: labelContents[p1.label!] || "",
                    x: p1.x,
                    y: p1.y
                });
                foundHover = true;
            }
        }
      }

      drawLines();
      
      if (!foundHover) setActiveTooltip(null);
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleClick = (e: MouseEvent) => {
      if (!showLabels) return;
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      particles.filter(p => !!p.label).forEach(p => {
        const dx = clickX - p.x;
        const dy = clickY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 30) {
          const routeMap: Record<string, string> = {
            "About": "/about",
            "Core": "/manifesto",
            "Galaxy": "/galaxy",
            "Works": "/projects",
            "Archive": "/gallery",
            "Connect": "/contact"
          };

          const targetRoute = routeMap[p.label!];
          if (targetRoute) {
            navigate(targetRoute);
          }
        }
      });
    };

    init();
    animate();
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);
    window.addEventListener("resize", init);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
      window.removeEventListener("resize", init);
    };
  }, [pages, labelContents, showLabels]);


  return (
    <div 
      ref={containerRef}
      className={`absolute inset-0 z-0 w-full h-full ${activeTooltip ? 'cursor-pointer pointer-events-auto' : 'pointer-events-none'}`}
    >
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 z-0 pointer-events-auto"
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
