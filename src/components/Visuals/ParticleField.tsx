import React, { useEffect, useRef, memo } from 'react';
import * as THREE from 'three';

export const ParticleField = memo(() => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    
    // Scenario Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.set(0, 250, 1000); 
    camera.lookAt(0, -100, -500);

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Particles Geometry - Massive density (62.5K particles)
    const SEPARATION = 15, AMOUNTX = 250, AMOUNTY = 250;
    const numParticles = AMOUNTX * AMOUNTY;
    const positions = new Float32Array(numParticles * 3);
    const scales = new Float32Array(numParticles);

    let i = 0, j = 0;
    for (let ix = 0; ix < AMOUNTX; ix++) {
      for (let iy = 0; iy < AMOUNTY; iy++) {
        positions[i] = ix * SEPARATION - ( ( AMOUNTX * SEPARATION ) / 2 ) + (Math.random() - 0.5) * 8; 
        positions[i + 1] = 0; 
        positions[i + 2] = iy * SEPARATION - ( ( AMOUNTY * SEPARATION ) / 2 ) + (Math.random() - 0.5) * 8;
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
          // Smaller points (Dots)
          gl_PointSize = scale * ( 200.0 / - mvPosition.z );
          vAlpha = smoothstep(-3000.0, -200.0, mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 color;
        varying float vAlpha;
        void main() {
          if ( length( gl_PointCoord - vec2( 0.5, 0.5 ) ) > 0.5 ) discard;
          gl_FragColor = vec4( color, vAlpha * 0.5 );
        }
      `,
      transparent: true,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    let count = 0;
    let animationId: number;

    const animate = () => {
      animationId = requestAnimationFrame(animate);

      const positions = particles.geometry.attributes.position.array as Float32Array;
      const scales = particles.geometry.attributes.scale.array as Float32Array;

      let i = 0, j = 0;
      for (let ix = 0; ix < AMOUNTX; ix++) {
        for (let iy = 0; iy < AMOUNTY; iy++) {
          const h1 = Math.sin((ix + count) * 0.1) * 80;
          const h2 = Math.sin((iy + count) * 0.08) * 100;
          const h3 = Math.cos((ix + iy + count) * 0.04) * 50;
          
          positions[i + 1] = h1 + h2 + h3;
          scales[j] = (Math.sin((ix + count) * 0.2) + 2.5) * 2 + (Math.sin((iy + count) * 0.4) + 2.5) * 2;
          
          i += 3;
          j++;
        }
      }

      particles.geometry.attributes.position.needsUpdate = true;
      particles.geometry.attributes.scale.needsUpdate = true;

      renderer.render(scene, camera);
      count += 0.02;
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full pointer-events-none" />
  );
});
