import { useState, useEffect, memo } from 'react';

export const GalacticMetadata = memo(() => {
  const [logs, setLogs] = useState<string[]>([]);
  const [fps, setFps] = useState(60);

  useEffect(() => {
    let lastTime = performance.now();
    let frames = 0;
    let frameTimeout: number;

    const calculateFps = () => {
      const now = performance.now();
      frames++;
      if (now >= lastTime + 1000) {
        setFps(Math.round((frames * 1000) / (now - lastTime)));
        frames = 0;
        lastTime = now;
      }
      frameTimeout = requestAnimationFrame(calculateFps);
    };
    calculateFps();

    return () => cancelAnimationFrame(frameTimeout);
  }, []);

  useEffect(() => {
    const codeSnippets = [
      "const bloom = new UnrealBloomPass(res, 0.40, 0.6, 0.85);",
      "gl_FragColor = vec4(vColor, tex.a * vAlpha * cf * op);",
      "p.xz = mat2(c,-s,s,c) * p.xz; // Differential rotation",
      "const sigmaA = 0.38 + r * 0.028; // Angular scatter",
      "renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));",
      "const dist = hitPoint.length(); // Raycast detection",
      "camera.position.set(0, 16, 22);",
      "additiveBlending: THREE.AdditiveBlending",
      "new Float32Array(N * 3); // Position buffer",
      "Math.pow(Math.random(), 0.85) * (RMAX - R0);"
    ];

    let timeout: NodeJS.Timeout;
    
    const addLog = () => {
      setLogs(prev => {
        // Build real-time data string
        const infoType = Math.random();
        let nextLog = "";

        if (infoType < 0.3) {
          nextLog = `RAW_CODE :: ${codeSnippets[Math.floor(Math.random() * codeSnippets.length)]}`;
        } else if (infoType < 0.5) {
          nextLog = `GPU_INF :: ${window.innerWidth}x${window.innerHeight} @ ${fps}FPS`;
        } else if (infoType < 0.7) {
          nextLog = `MEM_USE :: ${((window.performance as any)?.memory?.usedJSHeapSize / 1048576 || 42.42).toFixed(2)}MB / 2048MB`;
        } else if (infoType < 0.9) {
          nextLog = `PTR_LOC :: X:${(Math.random()*100).toFixed(2)} Y:${(Math.random()*100).toFixed(2)} Z:0.00`;
        } else {
          nextLog = `SYS_EVT :: SYNC_STATE_${Math.floor(Math.random()*9999)}_OK`;
        }

        const newLogs = [...prev, nextLog];
        return newLogs.length > 20 ? newLogs.slice(1) : newLogs;
      });
      
      timeout = setTimeout(addLog, 800 + Math.random() * 1200);
    };

    addLog();
    return () => clearTimeout(timeout);
  }, [fps]);

  return (
    <div className="flex flex-col gap-0.5 items-end select-none w-full">
      {logs.map((log, i) => (
        <div 
          key={i} 
          className="font-mono text-[9px] tracking-tighter animate-fade-in-right whitespace-nowrap"
          style={{ 
            color: log.startsWith('RAW_CODE') ? '#FFD700' : '#00BFFF',
            textShadow: `0 0 8px ${log.startsWith('RAW_CODE') ? 'rgba(255,215,0,0.3)' : 'rgba(0,191,255,0.3)'}`,
            opacity: 0.8
          }}
        >
          <span className="opacity-40 mr-2">{new Date().toISOString().split('T')[1].split('Z')[0]}</span>
          {log}
        </div>
      ))}
      <style>{`
        @keyframes fadeInRight {
          from { opacity: 0; transform: translateX(15px); }
          to { opacity: 0.8; transform: translateX(0); }
        }
        .animate-fade-in-right {
          animation: fadeInRight 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
});

GalacticMetadata.displayName = "GalacticMetadata";
