import React, { useEffect, useRef, memo } from 'react';
import * as THREE from 'three';

export const ParticleField = memo(({ size = 600 }: { size?: number }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    
    // Scenario Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 1, 10000);
    camera.position.set(0, 150, 600); // Low, deep perspective
    camera.lookAt(0, 0, -500);

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true }); // Faster for high counts
    renderer.setSize(size, size);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Particles Geometry - Higher Density
    const SEPARATION = 8, AMOUNTX = 200, AMOUNTY = 200;
    const numParticles = AMOUNTX * AMOUNTY;
    const positions = new Float32Array(numParticles * 3);
    const scales = new Float32Array(numParticles);

    let i = 0, j = 0;
    for (let ix = 0; ix < AMOUNTX; ix++) {
      for (let iy = 0; iy < AMOUNTY; iy++) {
        // Add random jitter to break the grid
        positions[i] = ix * SEPARATION - ( ( AMOUNTX * SEPARATION ) / 2 ) + (Math.random() - 0.5) * 5; 
        positions[i + 1] = 0; 
        positions[i + 2] = iy * SEPARATION - ( ( AMOUNTY * SEPARATION ) / 2 ) + (Math.random() - 0.5) * 5;
        scales[j] = 1;
        i += 3;
        j++;
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));

    const material = new THREE.ShaderMaterial({
      uniforms: {
        color: { value: new THREE.Color(0xffffff) },
      },
      vertexShader: `
        attribute float scale;
        varying float vAlpha;
        void main() {
          vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
          
          // Size attenuation
          gl_PointSize = scale * ( 800.0 / - mvPosition.z );
          
          // Fade based on distance (Z depth)
          vAlpha = smoothstep(-1500.0, -100.0, mvPosition.z);
          
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 color;
        varying float vAlpha;
        void main() {
          if ( length( gl_PointCoord - vec2( 0.5, 0.5 ) ) > 0.5 ) discard;
          gl_FragColor = vec4( color, vAlpha * 0.8 );
        }
      `,
      transparent: true,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Animation variables
    let count = 0;
    let animationId: number;

    const animate = () => {
      animationId = requestAnimationFrame(animate);

      const positions = particles.geometry.attributes.position.array as Float32Array;
      const scales = particles.geometry.attributes.scale.array as Float32Array;

      let i = 0, j = 0;
      for (let ix = 0; ix < AMOUNTX; ix++) {
        for (let iy = 0; iy < AMOUNTY; iy++) {
          // Complex wavy motion (Multiple octaves for mountain look)
          const h1 = Math.sin((ix + count) * 0.2) * 40;
          const h2 = Math.sin((iy + count) * 0.1) * 60;
          const h3 = Math.cos((ix + iy + count) * 0.05) * 30;
          
          positions[i + 1] = h1 + h2 + h3;
          scales[j] = (Math.sin((ix + count) * 0.3) + 1.5) * 2 + (Math.sin((iy + count) * 0.5) + 1.5) * 2;
          
          i += 3;
          j++;
        }
      }

      particles.geometry.attributes.position.needsUpdate = true;
      particles.geometry.attributes.scale.needsUpdate = true;

      // Subtle camera sway
      camera.position.x += ( 0 - camera.position.x ) * 0.01;
      camera.position.y += ( 150 - camera.position.y ) * 0.01;
      camera.lookAt(0, -100, -500);

      renderer.render(scene, camera);
      count += 0.03; // Real-time slow flow
    };

    animate();

    // Clean up
    return () => {
      cancelAnimationFrame(animationId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, [size]);

  return (
    <div className="relative group overflow-hidden rounded-2xl" style={{ width: size, height: size }}>
      <div ref={containerRef} className="w-full h-full bg-black/40" />
      {/* Decorative Technical Label */}
      <div className="absolute bottom-6 right-6 flex flex-col items-end opacity-40">
        <span className="text-[8px] font-mono text-white tracking-[0.3em] uppercase">
          Flux_Density: 40.0K_PX
        </span>
        <span className="text-[8px] font-mono text-white tracking-[0.3em] uppercase mt-1">
          Render_Engine: WebGL_v2
        </span>
      </div>
    </div>
  );
});
