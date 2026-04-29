import { memo, useRef, useEffect } from "react";
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

/**
 * High-End Holographic Spaceship Page (Fixed Path)
 */
export const Human = memo(() => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let renderer: THREE.WebGLRenderer, scene: THREE.Scene, camera: THREE.PerspectiveCamera;
    let spaceship: THREE.Group | null = null;
    let animId: number;
    let controls: OrbitControls;
    let hologramMaterial: THREE.ShaderMaterial;

    const init = () => {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.toneMapping = THREE.ReinhardToneMapping;
      containerRef.current?.appendChild(renderer.domElement);

      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x020205);

      camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.set(30, 20, 40);

      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.3;

      hologramMaterial = new THREE.ShaderMaterial({
        transparent: true,
        side: THREE.DoubleSide,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: {
          uTime: { value: 0 },
          uColor: { value: new THREE.Color(0x00d2ff) },
        },
        vertexShader: `
          varying vec3 vNormal;
          varying vec3 vPosition;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            vPosition = (modelMatrix * vec4(position, 1.0)).xyz;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform float uTime;
          uniform vec3 uColor;
          varying vec3 vNormal;
          varying vec3 vPosition;

          void main() {
            vec3 viewDirection = normalize(cameraPosition - vPosition);
            float fresnel = pow(1.2 - dot(vNormal, viewDirection), 3.0);
            
            float scanline = sin(vPosition.y * 10.0 - uTime * 4.0) * 0.1 + 0.9;
            float grid = sin(vPosition.x * 15.0) * sin(vPosition.z * 15.0);
            grid = step(0.99, grid) * 0.3;
            
            float pulse = sin(uTime * 2.0) * 0.05 + 0.15;
            float alpha = (fresnel * 0.6 + grid + pulse) * scanline;
            float flicker = fract(sin(uTime * 20.0) * 43758.5453) * 0.05 + 0.95;
            
            gl_FragColor = vec4(uColor, alpha * flicker * 0.7);
          }
        `,
      });

      const loader = new GLTFLoader();
      // Using the Vazco spaceship model (more reliable from your history)
      const modelUrl = 'https://raw.githubusercontent.com/vazco/three-spaceship/master/public/assets/spaceship.glb';
      
      loader.load(modelUrl, (gltf) => {
        spaceship = gltf.scene;
        spaceship.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            (child as THREE.Mesh).material = hologramMaterial;
          }
        });
        spaceship.scale.set(0.015, 0.015, 0.015); // Adjust for Vazco model scale
        scene.add(spaceship);

        const loaderUI = document.getElementById('hologram-loader');
        if (loaderUI) loaderUI.style.display = 'none';
      }, undefined, (err) => {
        console.error("404 Replacement Triggered:", err);
        // Emergency Fallback: If spaceship fails, create a procedural high-detail core
        const fallbackGeo = new THREE.IcosahedronGeometry(5, 4);
        const fallback = new THREE.Mesh(fallbackGeo, hologramMaterial);
        scene.add(fallback);
        if (loaderUI) loaderUI.innerText = "LINK ERROR - FALLBACK CORE ACTIVE";
      });

      window.addEventListener('resize', onWindowResize);
    };

    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const time = performance.now() * 0.001;

      if (hologramMaterial) hologramMaterial.uniforms.uTime.value = time;
      if (spaceship) {
        spaceship.position.y = Math.sin(time * 0.5) * 0.5;
      }

      controls.update();
      renderer.render(scene, camera);
    };

    init();
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onWindowResize);
      renderer.dispose();
      if (containerRef.current) containerRef.current.innerHTML = '';
    };
  }, []);

  return (
    <div 
      id="human" 
      className="section-full bg-[#020205] flex flex-col items-center justify-center relative overflow-hidden font-outfit"
      style={{ position: 'relative' }} 
    >
      <div ref={containerRef} className="absolute inset-0 z-0" />
      
      <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-between p-12">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <span className="block text-[10px] font-black tracking-[0.6em] text-cyan-400 uppercase">
              Classified / Aurora Project
            </span>
            <div className="h-[1px] w-24 bg-cyan-400/30" />
          </div>
          <div className="text-right">
            <span className="block text-[8px] text-white/20 uppercase tracking-[0.3em]">Status: Authorized</span>
            <span className="block text-[10px] text-cyan-400 font-mono">ENCRYPTED_SIGNAL_ACTIVE</span>
          </div>
        </div>

        <div className="max-w-2xl">
          <h1 className="text-6xl md:text-8xl font-light text-white tracking-tighter leading-none mb-6">
            Hyperion <span className="font-serif italic text-cyan-400/60 font-normal">Star-Cruiser</span>
          </h1>
          <div className="flex gap-12 opacity-40">
            <div className="space-y-4">
              <p className="text-[9px] text-white tracking-widest uppercase leading-relaxed max-w-xs">
                Next-generation exploratory vessel utilizing multi-layered holographic imaging protocol for systemic structural analysis.
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-end border-t border-white/10 pt-8 mt-auto">
          <span className="text-[8px] text-white/30 uppercase tracking-widest">© 2026 MDW Space Administration</span>
          <div className="flex gap-8">
             <div className="flex flex-col items-end">
                <span className="text-[8px] text-white/20 uppercase tracking-widest">Velocity</span>
                <span className="text-xs text-white font-mono">34.200 KM/H</span>
             </div>
          </div>
        </div>
      </div>

      <div id="hologram-loader" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-cyan-400 text-[10px] tracking-[1em] uppercase animate-pulse">
        Transmitting Data...
      </div>
    </div>
  );
});

Human.displayName = "Human";
