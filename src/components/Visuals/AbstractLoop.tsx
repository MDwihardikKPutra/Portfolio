import { useEffect, useRef } from "react";

export const AbstractLoop = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth * window.devicePixelRatio;
        canvas.height = parent.clientHeight * window.devicePixelRatio;
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      }
    };

    window.addEventListener("resize", resize);
    resize();

    const draw = () => {
      time += 0.005;
      const { clientWidth: width, clientHeight: height } = canvas.parentElement || { clientWidth: 500, clientHeight: 500 };
      
      ctx.clearRect(0, 0, width, height);

      ctx.strokeStyle = "rgba(0, 0, 0, 0.08)"; // Subtle black lines
      ctx.lineWidth = 1;

      // Draw flowing ribbons
      for (let i = 0; i < 15; i++) {
        ctx.beginPath();
        
        for (let x = 0; x <= width; x += 10) {
          const y = height * 0.5 + 
                    Math.sin(x * 0.005 + time + i * 0.2) * 40 +
                    Math.cos(x * 0.01 - time * 0.5 + i * 0.5) * 20;
          
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // Add dark particles
      ctx.fillStyle = "rgba(0, 0, 0, 0.2)"; 
      for (let j = 0; j < 6; j++) {
         const px = (Math.sin(time * 0.2 + j) * 0.5 + 0.5) * width;
         const py = (Math.cos(time * 0.3 + j * 0.5) * 0.5 + 0.5) * height;
         ctx.fillRect(px, py, 1.5, 8);
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="w-full h-full opacity-60"
      style={{ mixBlendingMode: 'screen' }}
    />
  );
};
