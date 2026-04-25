import React, { useEffect, useRef, memo, useState } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';

export const ParticleField = memo(() => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    let renderer: THREE.WebGLRenderer | null = null;
    let composer: EffectComposer | null = null;
    let animationId: number;

    try {
      const scene = new THREE.Scene();
      
      const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 10000);
      camera.position.set(0, 800, 2000); 
      camera.lookAt(0, 0, 0);

      renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: "high-performance" });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.toneMapping = THREE.ReinhardToneMapping;
      renderer.toneMappingExposure = 1.3;
      container.appendChild(renderer.domElement);

      composer = new EffectComposer(renderer);
      composer.addPass(new RenderPass(scene, camera));

      const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 2.0, 0.5, 0.85);
      composer.addPass(bloomPass);

      const filmPass = new ShaderPass({
        uniforms: { tDiffuse: { value: null }, time: { value: 0 }, amount: { value: 0.003 } },
        vertexShader: `varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
        fragmentShader: `
          uniform sampler2D tDiffuse; uniform float time; uniform float amount; varying vec2 vUv;
          float random(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
          void main() {
            vec2 uv = vUv;
            vec4 color = texture2D(tDiffuse, uv);
            float r = texture2D(tDiffuse, uv + vec2(amount, 0.0)).r;
            float b = texture2D(tDiffuse, uv - vec2(amount, 0.0)).b;
            float n = random(uv + time) * 0.08;
            gl_FragColor = vec4(r, color.g, b, color.a) + vec4(n, n, n, 0.0);
          }
        `
      });
      composer.addPass(filmPass);

      // --- MILKY WAY GEOMETRY ---
      const count = 300000; // 300K particles for the galaxy
      const positions = new Float32Array(count * 3);
      const randoms = new Float32Array(count * 3);
      const colors = new Float32Array(count * 3);

      const colorInside = new THREE.Color(0xffffff); // Core
      const colorOutside = new THREE.Color(0x3366ff); // Spiral arms

      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        
        // Spiral Math
        const radius = Math.random() * 1200;
        const spinAngle = radius * 0.003;
        const branchAngle = (i % 3) * ((Math.PI * 2) / 3); // 3 arms

        const randomX = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * (radius * 0.2);
        const randomY = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * (radius * 0.1);
        const randomZ = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * (radius * 0.2);

        positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
        positions[i3 + 1] = randomY; 
        positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

        randoms[i3] = Math.random();
        randoms[i3 + 1] = Math.random();
        randoms[i3 + 2] = Math.random();

        // Milky Way Color Mix
        const mixedColor = colorInside.clone();
        mixedColor.lerp(colorOutside, radius / 1200);
        
        colors[i3] = mixedColor.r;
        colors[i3 + 1] = mixedColor.g;
        colors[i3 + 2] = mixedColor.b;
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      geometry.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 3));

      const shaderMaterial = new THREE.ShaderMaterial({
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexColors: true,
        uniforms: {
          uTime: { value: 0 },
          uSize: { value: 30 * renderer.getPixelRatio() }
        },
        vertexShader: `
          uniform float uTime;
          uniform float uSize;
          attribute vec3 aRandom;
          varying vec3 vColor;
          void main() {
            vec4 modelPosition = modelMatrix * vec4(position, 1.0);
            
            // Subtle rotation / drift in shader
            float angle = atan(modelPosition.x, modelPosition.z);
            float distanceToCenter = length(modelPosition.xz);
            float angleOffset = (1.0 / distanceToCenter) * uTime * 0.2;
            angle += angleOffset;
            modelPosition.x = cos(angle) * distanceToCenter;
            modelPosition.z = sin(angle) * distanceToCenter;

            // Subtle "breathing" height
            modelPosition.y += sin(uTime * 0.5 + modelPosition.x * 0.01) * 20.0;

            vec4 viewPosition = viewMatrix * modelPosition;
            vec4 projectedPosition = projectionMatrix * viewPosition;
            gl_Position = projectedPosition;

            gl_PointSize = uSize * (1.0 / -viewPosition.z);
            vColor = color;
          }
        `,
        fragmentShader: `
          varying vec3 vColor;
          void main() {
            float strength = distance(gl_PointCoord, vec2(0.5));
            strength = 1.0 - strength;
            strength = pow(strength, 10.0);
            vec3 color = mix(vec3(0.0), vColor, strength);
            gl_FragColor = vec4(color, 1.0);
          }
        `
      });

      const points = new THREE.Points(geometry, shaderMaterial);
      scene.add(points);

      let t = 0;
      const animate = () => {
        animationId = requestAnimationFrame(animate);
        t += 0.015;
        shaderMaterial.uniforms.uTime.value = t;
        filmPass.uniforms.time.value = t;
        
        // Cinematic camera drift
        camera.position.x = Math.sin(t * 0.1) * 200;
        camera.position.z = 2000 + Math.cos(t * 0.1) * 100;
        camera.lookAt(0, 0, 0);

        composer!.render();
      };

      animate();

      const handleResize = () => {
        if (!renderer || !composer) return;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        composer.setSize(window.innerWidth, window.innerHeight);
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        cancelAnimationFrame(animationId);
        if (renderer) {
          if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
          renderer.dispose();
          renderer.forceContextLoss();
        }
        geometry.dispose();
        shaderMaterial.dispose();
        if (composer) {
          composer.renderTarget1.dispose();
          composer.renderTarget2.dispose();
        }
      };
    } catch (err) {
      console.error(err);
      setError("Galaxy Engine Initial Error");
    }
  }, []);

  if (error) return <div className="absolute inset-0 flex items-center justify-center bg-black text-white font-mono text-xs">GALAXY SYSTEM REBOOT REQUIRED</div>;

  return <div ref={containerRef} className="relative w-full h-full pointer-events-none" />;
});
