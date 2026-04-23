import { useInView, motion, AnimatePresence } from "framer-motion";
import { memo, useRef, useEffect, useState } from "react";

export const Manifesto = memo(({ t }: { t: any }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef);
  
  // React state only for the HTML Tooltip
  const [activeTooltip, setActiveTooltip] = useState<{ label: string, content: string, x: number, y: number } | null>(null);

  const labelContents: Record<string, string> = {
    "About": "Born Kediri, 2 May 2001",
    "Lab": "Interactive UI/UX Experiments",
    "Contact": "dwihardikk@gmail.com",
    "Interactive Art": "Blending logic and aesthetics",
    "Archive": "00_Index: Digital Repository",
    "Client Works": "Commercial collaborations",
    "Vision": "Mind the gap between pixels & reality",
    "Pixels": "High density digital grain",
    "Logic": "Structural integrity by Laravel/React",
    "Photography": "Capturing moments in light",
    "Minimalism": "Less but better",
    "Code": "Crafting logic with purpose",
    "Motion": "Bringing pixels to life",
    "Collaboration": "Building together effectively",
    "Technology": "Tool for the human spirit",
    "Engineering": "Building robust systems",
    "Art": "Design as a language",
    "生き甲斐": "Ikigai: A reason for being",
    "宮本 武蔵": "Miyamoto Musashi: The Way of the Sword"
  };

  useEffect(() => {
    if (!canvasRef.current || !isInView) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    
    const labelKeys = Object.keys(labelContents);
    const mouse = { x: -1000, y: -1000, radius: 150 };

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      label: string | null;
      opacity: number;

      constructor(label: string | null = null) {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        const speedMult = label ? 0.15 : 0.4;
        this.vx = (Math.random() - 0.5) * speedMult;
        this.vy = (Math.random() - 0.5) * speedMult;
        this.size = label ? 3 : 1.5;
        this.label = label;
        this.opacity = label ? 0.9 : Math.random() * 0.2 + 0.1;
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();

        if (this.label) {
          const isJapanese = /[^\x00-\x7F]/.test(this.label);
          const fontStack = isJapanese ? '"Noto Sans JP", sans-serif' : '"Plus Jakarta Sans", sans-serif';
          ctx.font = `600 ${window.innerWidth < 768 ? "10px" : "12px"} ${fontStack}`;
          ctx.textAlign = "center";
          ctx.fillText(this.label, this.x, this.y - 15);
        }
      }

      update(paddingX: number, paddingY: number, safeWidth: number, safeHeight: number) {
        this.x += this.vx;
        this.y += this.vy;

        const textPadding = 60;
        if (this.label) {
          if (this.x < paddingX + textPadding) { this.x = paddingX + textPadding; this.vx *= -1; }
          if (this.x > paddingX + safeWidth - textPadding) { this.x = paddingX + safeWidth - textPadding; this.vx *= -1; }
          if (this.y < paddingY + 20) { this.y = paddingY + 20; this.vy *= -1; }
          if (this.y > paddingY + safeHeight - 20) { this.y = paddingY + safeHeight - 20; this.vy *= -1; }
        } else {
          if (this.x < 10) { this.x = 10; this.vx *= -1; }
          if (this.x > canvas.width - 10) { this.x = canvas.width - 10; this.vx *= -1; }
          if (this.y < 10) { this.y = 10; this.vy *= -1; }
          if (this.y > canvas.height - 10) { this.y = canvas.height - 10; this.vy *= -1; }
        }

        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < mouse.radius && !this.label) {
            const angle = Math.atan2(dy, dx);
            const force = (mouse.radius - distance) / mouse.radius;
            this.x -= Math.cos(angle) * force * 1.8;
            this.y -= Math.sin(angle) * force * 1.8;
        }
      }
    }

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = [];
      const paddingX = canvas.width * 0.2;
      const paddingY = canvas.height * 0.2;
      const safeWidth = canvas.width - paddingX * 2;
      const safeHeight = canvas.height - paddingY * 2;
      
      labelKeys.forEach(label => {
        const p = new Particle(label);
        p.x = paddingX + Math.random() * safeWidth;
        p.y = paddingY + Math.random() * safeHeight;
        particles.push(p);
      });

      const extraCount = window.innerWidth < 768 ? 150 : 400;
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
      const labeledParticles = particles.filter(p => p.label);
      for (let i = 0; i < labeledParticles.length; i++) {
        for (let j = i + 1; j < labeledParticles.length; j++) {
            const p1 = labeledParticles[i];
            const p2 = labeledParticles[j];
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            const opacity = Math.max(0.08, 0.25 - (distance / canvas.width) * 0.15);
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
        }
      }

      const maxDistance = 150; 
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          if (p1.label && p2.label) continue;
          
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < maxDistance) {
            const opacity = (1 - distance / maxDistance) * 0.15;
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
            ctx.lineWidth = 0.4;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      const paddingX = canvas.width * 0.2;
      const paddingY = canvas.height * 0.2;
      const safeWidth = canvas.width - paddingX * 2;
      const safeHeight = canvas.height - paddingY * 2;

      drawLines();
      
      let foundHover = false;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[j].x - particles[i].x;
            const dy = particles[j].y - particles[i].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const minDistance = particles[i].label ? 80 : 30;
            if (distance < minDistance) {
                const angle = Math.atan2(dy, dx);
                const force = (minDistance - distance) / minDistance;
                const pushX = Math.cos(angle) * force * 0.5;
                const pushY = Math.sin(angle) * force * 0.5;
                particles[i].x -= pushX;
                particles[i].y -= pushY;
                particles[j].x += pushX;
                particles[j].y += pushY;
            }
        }
        particles[i].update(paddingX, paddingY, safeWidth, safeHeight);
        particles[i].draw();

        if (particles[i].label && !foundHover) {
            const dx = mouse.x - particles[i].x;
            const dy = mouse.y - particles[i].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 30) {
                setActiveTooltip({
                    label: particles[i].label!,
                    content: labelContents[particles[i].label!] || "",
                    x: particles[i].x,
                    y: particles[i].y
                });
                foundHover = true;
            }
        }
      }
      if (!foundHover) setActiveTooltip(null);
      
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    init();
    animate();
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", init);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", init);
    };
  }, [isInView]);

  return (
    <div 
      id="manifesto" 
      ref={containerRef}
      className="section-full bg-black flex flex-col items-center justify-center relative overflow-hidden"
    >
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 z-0 pointer-events-none"
      />

      <AnimatePresence>
        {activeTooltip && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className="absolute z-50 pointer-events-none"
            style={{ 
              left: activeTooltip.x, 
              top: activeTooltip.y + 25,
              transform: 'translateX(-50%)' 
            }}
          >
            <div className="bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-sm shadow-xl">
              <p className="text-[10px] md:text-[11px] font-bold text-white tracking-widest whitespace-nowrap">
                {activeTooltip.content}
              </p>
            </div>
            <div className="w-0 h-0 border-x-4 border-x-transparent border-b-4 border-b-white/10 mx-auto -mt-[1px]" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});
