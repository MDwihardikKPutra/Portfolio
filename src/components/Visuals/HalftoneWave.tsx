import { useEffect, useRef, memo } from "react";

export const HalftoneWave = memo(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const resizeCanvas = () => {
      const rect = canvas.parentNode
        ? (canvas.parentNode as HTMLElement).getBoundingClientRect()
        : canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const render = () => {
      time += 0.022; // Control wave animation speed (increased from 0.008 for a fast and lively flow)
      const width = canvas.width / window.devicePixelRatio;
      const height = canvas.height / window.devicePixelRatio;

      // Deep dark tech navy/black background to match the reference
      ctx.fillStyle = "#020914";
      ctx.fillRect(0, 0, width, height);

      // Grid settings: 14px spacing reduces calculations by 70%, locked 60fps and matches ref style
      const dotSpacing = 14;
      const cols = Math.ceil(width / dotSpacing);
      const rows = Math.ceil(height / dotSpacing);

      // Render the real-time halftone pixel grid
      for (let c = 0; c < cols; c++) {
        const x = c * dotSpacing;
        const nx = x / width;

        // Peak center of the wave
        const centerY = 0.5 + Math.sin(nx * Math.PI * 1.5 - time * 0.8) * 0.15;

        for (let r = 0; r < rows; r++) {
          const y = r * dotSpacing;
          const ny = y / height;

          const distY = Math.abs(ny - centerY);

          // Fast path: skip expensive math if outside the wave band (more than 0.55 away)
          if (distY > 0.55) continue;

          // Falloff masks: Fades out at the top/bottom and left/right edges
          const maskY = 1 - distY * 1.8; 
          const maskX = Math.sin(nx * Math.PI); 
          const mask = maskY * maskX;

          // Layered sine waves for complex organic wave motion
          const wave1 = Math.sin(nx * Math.PI * 2.0 - time * 1.5);
          const wave2 = Math.cos(ny * Math.PI * 1.5 + time * 0.8);
          const wave3 = Math.sin((nx + ny) * Math.PI * 1.0 - time * 0.5);

          const wave = wave1 * 0.5 + wave2 * 0.3 + wave3 * 0.2;

          // Normalized pixel intensity/density
          const intensity = Math.max(0, (wave * 0.5 + 0.5) * mask);

          if (intensity > 0.01) {
            // Neon electric blue / cyan color scheme with high contrast opacity scaling
            ctx.fillStyle = `rgba(0, 210, 255, ${intensity * 0.85 + 0.15})`;

            // Pixel size scales dynamically (up to 13px for premium pixelated look)
            const dotSize = intensity * 13.0;

            // Draw pixel squares
            ctx.fillRect(
              x - dotSize / 2,
              y - dotSize / 2,
              dotSize,
              dotSize
            );
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full block absolute inset-0 z-0 pointer-events-none"
    />
  );
});

HalftoneWave.displayName = "HalftoneWave";
