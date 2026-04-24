import React, { useEffect, useRef, memo } from 'react';
import * as THREE from 'three';

export const ParticleField = memo(({ size = 600 }: { size?: number }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    
    // Scenario Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.z = 400;
    camera.position.y = 150;
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(size, size);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Particles Geometry
    const SEPARATION = 10, AMOUNTX = 100, AMOUNTY = 100;
    const numParticles = AMOUNTX * AMOUNTY;
    const positions = new Float32Array(numParticles * 3);
    const scales = new Float32Array(numParticles);

    let i = 0, j = 0;
    for (let ix = 0; ix < AMOUNTX; ix++) {
      for (let iy = 0; iy < AMOUNTY; iy++) {
        positions[i] = ix * SEPARATION - ( ( AMOUNTX * SEPARATION ) / 2 ); // x
        positions[i + 1] = 0; // y
        positions[i + 2] = iy * SEPARATION - ( ( AMOUNTY * SEPARATION ) / 2 ); // z
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
        void main() {
          vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
          gl_PointSize = scale * ( 300.0 / - mvPosition.z );
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 color;
        void main() {
          if ( length( gl_PointCoord - vec2( 0.5, 0.5 ) ) > 0.475 ) discard;
          gl_FragColor = vec4( color, 1.0 );
        }
      `,
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
          positions[i + 1] = (Math.sin((ix + count) * 0.3) * 50) + (Math.sin((iy + count) * 0.5) * 50);
          scales[j] = (Math.sin((ix + count) * 0.3) + 1) * 8 + (Math.sin((iy + count) * 0.5) + 1) * 8;
          i += 3;
          j++;
        }
      }

      particles.geometry.attributes.position.needsUpdate = true;
      particles.geometry.attributes.scale.needsUpdate = true;

      renderer.render(scene, camera);
      count += 0.1;
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
    <div className="relative group cursor-crosshair" style={{ width: size, height: size }}>
      <div ref={containerRef} className="w-full h-full" />
      {/* Decorative Technical Label */}
      <div className="absolute bottom-0 right-0 p-4 border-r border-b border-white/10">
        <span className="text-[10px] font-mono text-white/20 tracking-tighter uppercase whitespace-nowrap">
          SYSTEM_PARTICLE_V1: FLOW_O1
        </span>
      </div>
    </div>
  );
});
