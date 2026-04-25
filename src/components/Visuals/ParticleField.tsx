import React, { useEffect, useRef, memo, useState } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';

// --- SYSTEM STABILITY CONFIG ---
const GALAXY_CONFIG = {
  PARTICLE_COUNT: 150000, // Balanced for cinematic vs stability
  CORE_COLOR: 0xffffff,
  ARM_COLOR: 0x3366ff,
  ROTATE_SPEED: 0.15,
  BLOOM_STRENGTH: 1.8,
};

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
      // 1. Scene Setup
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 5000);
      camera.position.set(0, 700, 1800);
      camera.lookAt(0, 0, 0);

      // 2. Renderer with High Stability
      renderer = new THREE.WebGLRenderer({ 
        antialias: false, 
        alpha: true, 
        powerPreference: "high-performance",
        canvas: document.createElement('canvas') // Internal creation
      });

      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.25));
      renderer.toneMapping = THREE.ReinhardToneMapping;
      renderer.toneMappingExposure = 1.3;
      container.appendChild(renderer.domElement);

      // 3. Post-Processing Pipeline
      composer = new EffectComposer(renderer);
      const renderPass = new RenderPass(scene, camera);
      composer.addPass(renderPass);

      const bloomPass = new UnrealBloomPass(
        new THREE.Vector2(window.innerWidth, window.innerHeight),
        GALAXY_CONFIG.BLOOM_STRENGTH, 0.45, 0.8
      );
      composer.addPass(bloomPass);

      const filmPass = new ShaderPass({
        uniforms: { tDiffuse: { value: null }, time: { value: 0 }, amount: { value: 0.0025 } },
        vertexShader: `varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
        fragmentShader: `
          uniform sampler2D tDiffuse; uniform float time; uniform float amount; varying vec2 vUv;
          float random(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
          void main() {
            vec2 uv = vUv;
            vec4 color = texture2D(tDiffuse, uv);
            float r = texture2D(tDiffuse, uv + vec2(amount, 0.0)).r;
            float b = texture2D(tDiffuse, uv - vec2(amount, 0.0)).b;
            float n = random(uv + time) * 0.07;
            gl_FragColor = vec4(r, color.g, b, color.a) + vec4(n, n, n, 0.0);
          }
        `
      });
      composer.addPass(filmPass);

      // 4. Galaxy Geometry Construction
      const count = GALAXY_CONFIG.PARTICLE_COUNT;
      const positions = new Float32Array(count * 3);
      const colors = new Float32Array(count * 3);
      const randoms = new Float32Array(count * 3);

      const cCenter = new THREE.Color(GALAXY_CONFIG.CORE_COLOR);
      const cOuter = new THREE.Color(GALAXY_CONFIG.ARM_COLOR);

      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        const radius = Math.random() * 1100;
        const spinAngle = radius * 0.0025;
        const branchAngle = (i % 3) * ((Math.PI * 2) / 3);

        const rX = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * (radius * 0.2);
        const rY = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * (radius * 0.1);
        const rZ = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * (radius * 0.2);

        positions[i3] = Math.cos(branchAngle + spinAngle) * radius + rX;
        positions[i3 + 1] = rY;
        positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + rZ;

        randoms[i3] = Math.random();
        randoms[i3 + 1] = Math.random();
        randoms[i3 + 2] = Math.random();

        const mixedColor = cCenter.clone().lerp(cOuter, Math.pow(radius / 1100, 1.5));
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
        uniforms: { uTime: { value: 0 }, uSize: { value: 32 * renderer.getPixelRatio() } },
        vertexShader: `
          uniform float uTime; uniform float uSize; attribute vec3 aRandom; varying vec3 vColor;
          void main() {
            vec4 mPos = modelMatrix * vec4(position, 1.0);
            float angle = atan(mPos.x, mPos.z) + (1.0 / length(mPos.xz)) * uTime * ${GALAXY_CONFIG.ROTATE_SPEED};
            float dist = length(mPos.xz);
            mPos.x = cos(angle) * dist;
            mPos.z = sin(angle) * dist;
            mPos.y += sin(uTime * 0.3 + mPos.x * 0.01) * 15.0;
            vec4 vPos = viewMatrix * mPos;
            gl_Position = projectionMatrix * vPos;
            gl_PointSize = uSize * (1.0 / -vPos.z);
            vColor = color;
          }
        `,
        fragmentShader: `
          varying vec3 vColor;
          void main() {
            float s = 1.0 - distance(gl_PointCoord, vec2(0.5));
            s = pow(s, 8.0);
            gl_FragColor = vec4(vColor * s, 1.0);
          }
        `
      });

      const galaxy = new THREE.Points(geometry, shaderMaterial);
      scene.add(galaxy);

      // 5. Render Loop
      let t = 0;
      const animate = () => {
        animationId = requestAnimationFrame(animate);
        t += 0.012;
        shaderMaterial.uniforms.uTime.value = t;
        filmPass.uniforms.time.value = t;
        camera.position.x = Math.sin(t * 0.08) * 150;
        camera.position.z = 1800 + Math.cos(t * 0.08) * 100;
        camera.lookAt(0, 0, 0);
        composer!.render();
      };

      animate();

      // 6. Responsive
      const onResize = () => {
        if (!renderer || !composer) return;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        composer.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener('resize', onResize);

      // 7. Ultimate Cleanup
      return () => {
        window.removeEventListener('resize', onResize);
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
          bloomPass.dispose();
          filmPass.dispose();
          renderPass.dispose();
        }
      };
    } catch (err) {
      console.error("Galaxy Engine Reboot Required", err);
      setError("Engine Stability Issue Detected");
    }
  }, []);

  if (error) return (
    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-90 z-50">
      <div className="text-center font-mono p-8 border border-white/10 rounded-lg">
        <p className="text-white/40 text-[10px] mb-2 uppercase tracking-widest">System Warning</p>
        <p className="text-white text-xs mb-6">GRAPHICAL ENGINE REQUIRES REBOOT</p>
        <button onClick={() => window.location.reload()} className="px-6 py-2 border border-white hover:bg-white hover:text-black transition-all text-[10px] uppercase tracking-tighter">Initialize Restart Sequence</button>
      </div>
    </div>
  );

  return <div ref={containerRef} className="relative w-full h-full overflow-hidden pointer-events-none" />;
});
