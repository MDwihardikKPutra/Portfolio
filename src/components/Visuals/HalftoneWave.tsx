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

      // Grid settings: 8px spacing gives an extremely sharp, high-definition retro pixel look
      const dotSpacing = 8;
      const cols = Math.ceil(width / dotSpacing);
      const rows = Math.ceil(height / dotSpacing);

      // Render the real-time halftone pixel grid
      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          const x = c * dotSpacing;
          const y = r * dotSpacing;

          const nx = x / width;
          const ny = y / height;

          // Layered sine waves for complex organic wave motion
          const wave1 = Math.sin(nx * Math.PI * 2.0 - time * 1.5);
          const wave2 = Math.cos(ny * Math.PI * 1.5 + time * 0.8);
          const wave3 = Math.sin((nx + ny) * Math.PI * 1.0 - time * 0.5);

          // Combined wave calculation
          const wave = wave1 * 0.5 + wave2 * 0.3 + wave3 * 0.2;

          // Crest formation in the vertical middle, flowing horizontally
          const centerY = 0.5 + Math.sin(nx * Math.PI * 1.5 - time * 0.8) * 0.15;
          const distY = Math.abs(ny - centerY);

          // Falloff masks: Fades out at the top/bottom and left/right edges (wider for clarity)
          const maskY = Math.max(0, 1 - distY * 1.8); 
          const maskX = Math.sin(nx * Math.PI); // Elegant horizontal fadeout
          const mask = maskY * maskX;

          // Normalized pixel intensity/density
          const intensity = Math.max(0, (wave * 0.5 + 0.5) * mask);

          if (intensity > 0.01) {
            // Neon electric blue / cyan color scheme with high contrast opacity scaling
            ctx.fillStyle = `rgba(0, 210, 255, ${intensity * 0.85 + 0.15})`;

            // Pixel size scales dynamically with intensity (up to 8.5px for absolute clarity)
            const dotSize = intensity * 8.5;

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
