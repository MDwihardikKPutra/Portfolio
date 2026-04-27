import { memo, useRef, useEffect } from "react";
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';

export const ParticleField = memo(() => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(44, window.innerWidth / window.innerHeight, 0.1, 800);
    camera.position.set(0, 11, 15);  // Closer zoom into the core and arms
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 1);
    containerRef.current.appendChild(renderer.domElement);

    // ── Controls (Zoom Only) ──────────────────────────────────────────────
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableRotate = false; // Keep the angle fixed
    controls.enablePan    = false; // Keep the center fixed
    controls.enableDamping = true;
    controls.minDistance  = 2;     // Allow getting very close to core
    controls.maxDistance  = 100;   // Allow zooming out significantly

    // ── Keyboard Zoom (Smooth Lerped) ───────────────────────────────────
    let targetDist = camera.position.length();
    const onKeyDown = (e: KeyboardEvent) => {
      const zoomFactor = 0.25;
      if (e.key === 'ArrowUp') {
        targetDist = Math.min(targetDist * 1.25, controls.maxDistance);
      } else if (e.key === 'ArrowDown') {
        targetDist = Math.max(targetDist * 0.75, controls.minDistance);
      }
    };
    window.addEventListener('keydown', onKeyDown);

    // Very subtle bloom — just for bar glow, prevent whiteout
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    const bloom = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      0.40,  // Re-ignited for luminous golden core
      0.6,
      0.85   // Lower threshold: dense gold now triggers bloom
    );
    composer.addPass(bloom);

    // Soft glow alpha texture
    const makeTex = () => {
      const c = document.createElement('canvas');
      c.width = c.height = 64;
      const ctx = c.getContext('2d')!;
      const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      g.addColorStop(0,    'rgba(255,255,255,1)');
      g.addColorStop(0.25, 'rgba(255,255,255,0.3)');
      g.addColorStop(0.6,  'rgba(255,255,255,0.03)');
      g.addColorStop(1,    'rgba(255,255,255,0)');
      ctx.fillStyle = g; ctx.fillRect(0, 0, 64, 64);
      return new THREE.CanvasTexture(c);
    };
    const tex = makeTex();

    // ── Box-Muller Gaussian sampler ─────────────────────────────────────
    const randn = () => {
      const u1 = Math.random() + 1e-9, u2 = Math.random();
      return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
    };

    // ── Colours ─────────────────────────────────────────────────────────
    const C_SING  = new THREE.Color('#FFDD66'); // Bright Warm Gold — vibrant, not muddy
    const C_BULGE = new THREE.Color('#FFB300'); // Vibrant Amber
    const C_BAR   = new THREE.Color('#FF8C00'); // Dark Orange bar transition
    const C_INNER = new THREE.Color('#FFFEE0'); // Cream — brief inner arm zone
    const C_GOLD  = new THREE.Color('#FFD700'); // Gold — very short transition
    const C_ARM   = new THREE.Color('#00BFFF'); // Electric blue — dominates 50%+ radius
    const C_OUTER = new THREE.Color('#191970'); // Midnight blue void
    const C_HAZE  = new THREE.Color('#1a4a7a'); // Deep blue inter-arm haze
    const C_H2    = new THREE.Color('#FF3355'); // H II pink-red
    const C_DUST  = new THREE.Color('#0f0603'); // near-black dust lane

    // ── Spiral params ────────────────────────────────────────────────────
    // 2 arms at 180° = avoids concentric-ring artifact at tilted view
    const ARMS  = 2;
    const B     = 0.26;   // spiral openness
    const R0    = 3.0;    // arm starts at bar edge
    const RMAX  = 16.0;

    const armTheta = (r: number, arm: number) =>
      (arm / ARMS) * Math.PI * 2 + Math.log(r / R0) / B;

    // ── Buffers ──────────────────────────────────────────────────────────
    const N     = 280000;
    const pos   = new Float32Array(N * 3);
    const col   = new Float32Array(N * 3);
    const rnd   = new Float32Array(N);
    const stype = new Float32Array(N);
    let idx = 0;

    const put = (x: number, y: number, z: number, c: THREE.Color, t: number, br = 1.0) => {
      if (idx >= N) return;
      const i3 = idx * 3;
      pos[i3]=x; pos[i3+1]=y; pos[i3+2]=z;
      col[i3]=c.r*br; col[i3+1]=c.g*br; col[i3+2]=c.b*br;
      rnd[idx]   = Math.random();
      stype[idx] = t;
      idx++;
    };

    // ── 1. VOLUMETRIC BULGE — 3 tiers, all randomness scaled by radius ───

    // Tier A: Dense Goldenrod Singularity (radius < 0.5, very dim individually)
    for (let i = 0; i < 6000; i++) {
      const r = Math.pow(Math.random(), 0.4) * 0.5; // Smaller radius
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(2 * Math.random() - 1);
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta) * 0.55;
      const z = r * Math.cos(phi);
      const c = C_SING.clone().lerp(C_BULGE, r / 0.5);
      put(x, y, z, c, 3, 0.14); // Brighter per-particle — stacking builds glow
    }

    // Tier B: Gold Inner Bulge (radius 0.5–2.5, spheroidal, compact)
    for (let i = 0; i < 28000; i++) {
      const r     = 0.5 + Math.pow(Math.random(), 0.6) * 2.0; // Was 2.6, now 2.0
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(2 * Math.random() - 1);
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta) * 0.95;
      const z = r * Math.cos(phi);
      const t = (r - 0.5) / 2.0;
      const c = C_BULGE.clone().lerp(C_BAR, t);
      const br = 0.12 + (1 - t) * 0.10; // 0.22 at center, 0.12 at edge
      put(x, y, z, c, 3, br);
    }

    // Tier C: Amber Elongated Bar (compact ellipse)
    for (let i = 0; i < 21000; i++) {
      const a = Math.random() * Math.PI * 2;
      const u = Math.pow(Math.random(), 0.7);
      const rx = u * 4.5 * Math.cos(a); // Shrunk from 5.2
      const rz = u * 1.8 * Math.sin(a); // Shrunk from 1.9
      const d  = Math.sqrt((rx/4.5)**2 + (rz/1.8)**2);
      const jx = randn() * 0.3 * d;
      const jz = randn() * 0.3 * d;
      const c  = C_BAR.clone().lerp(C_INNER, Math.pow(d, 0.5) * 0.7);
      put(rx + jx, randn()*0.45*(1-d*0.5), rz + jz, c, 3, 0.15 + (1-d)*0.10);
    }

    // ── 2. TWO THICK SPIRAL ARMS (Gaussian scatter → cloud not wire) ─────
    for (let i = 0; i < 165000; i++) {
      const arm = i % ARMS;
      const r   = R0 + Math.pow(Math.random(), 0.85) * (RMAX - R0);

      const thetaC  = armTheta(r, arm);
      // More aggressive angular scatter — breaks geometric stiffness
      const sigmaA  = 0.38 + r * 0.028;
      const theta   = thetaC + randn() * sigmaA;

      // Stronger radial scatter for misty nebula look
      const dr     = randn() * (0.8 + r * 0.05);
      const rF     = Math.max(0.5, r + dr);

      const px = Math.cos(theta) * rF;
      const pz = Math.sin(theta) * rF;
      const py = randn() * 1.2 * Math.exp(-r * 0.08); // More volumetric thickness in arms


      // STRICT COLOR ENFORCEMENT: electric blue dominates from 35% radius
      const rRatio = (r - R0) / (RMAX - R0);
      let c: THREE.Color;
      if      (rRatio < 0.08) c = C_INNER.clone().lerp(C_GOLD,  rRatio / 0.08);
      else if (rRatio < 0.15) c = C_GOLD.clone().lerp(C_ARM,    (rRatio-0.08)/0.07);
      else if (rRatio < 0.65) c = C_ARM.clone().lerp(C_ARM,     1.0); // Solid electric blue band
      else                    c = C_ARM.clone().lerp(C_OUTER,   (rRatio-0.65)/0.35);

      // Brightness: brighter on arm centre line, dimmer on scatter wings
      const proxA   = Math.exp(-0.5*(theta-thetaC)**2 / sigmaA**2);
      const br      = 0.22 + proxA * 0.42;
      put(px, py, pz, c, 0, br);
    }

    // ── 3. H II REGIONS — pre-placed CLUSTERS (not uniform ring) ─────────
    const h2Clusters: {r:number, arm:number}[] = [];
    const N_CLUSTER = 13;
    for (let arm = 0; arm < ARMS; arm++) {
      for (let j = 1; j <= N_CLUSTER; j++) {
        h2Clusters.push({ r: R0 + (j / (N_CLUSTER+1)) * (RMAX*0.85 - R0), arm });
      }
    }
    for (const cl of h2Clusters) {
      const tC  = armTheta(cl.r, cl.arm);
      const cx  = Math.cos(tC) * cl.r;
      const cz  = Math.sin(tC) * cl.r;
      const sz  = 0.35 + Math.random() * 0.55;
      const nP  = 180 + Math.random() * 200;
      for (let p = 0; p < nP; p++) {
        const px = cx + randn() * sz;
        const pz = cz + randn() * sz;
        const c  = C_H2.clone().lerp(C_ARM, 0.1 + Math.random() * 0.35);
        put(px, randn()*0.12, pz, c, 1, 0.55 + Math.random()*0.35);
      }
    }

    // ── 4. DIFFUSE INTER-ARM HAZE ─────────────────────────────────────────
    for (let i = 0; i < 42000; i++) {
      const r = -Math.log(1 - Math.random() * 0.99) * 5.5;
      if (r > RMAX) continue;
      const a  = Math.random() * Math.PI * 2;
      const rR = r / RMAX;
      const c  = C_HAZE.clone().lerp(C_OUTER, rR * 1.3);
      put(Math.cos(a)*r, randn()*0.18, Math.sin(a)*r, c, 4, 0.10 + Math.random()*0.08);
    }

    // ── 5. DARK DUST LANES ────────────────────────────────────────────────
    for (let i = 0; i < 9000; i++) {
      const arm = i % ARMS;
      const r   = R0 + Math.random() * (RMAX*0.75 - R0);
      const t   = armTheta(r, arm) + 0.14; // inward edge
      put(Math.cos(t)*r + randn()*0.35, 0, Math.sin(t)*r + randn()*0.35, C_DUST, 2, 1);
    }

    // Fill remaining slots with outer edge dim stars
    while (idx < N) {
      const r = RMAX + Math.random() * 4;
      const a = Math.random() * Math.PI * 2;
      put(Math.cos(a)*r, (Math.random()-0.5)*0.2, Math.sin(a)*r, C_OUTER, 4, 0.04);
    }

    // ── Geometry ──────────────────────────────────────────────────────────
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos,   3));
    geo.setAttribute('color',    new THREE.BufferAttribute(col,   3));
    geo.setAttribute('aRandom',  new THREE.BufferAttribute(rnd,   1));
    geo.setAttribute('aType',    new THREE.BufferAttribute(stype, 1));

    // ── Shader ────────────────────────────────────────────────────────────
    const mat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite:  false,
      blending:    THREE.AdditiveBlending,
      vertexColors: true,
      uniforms: {
        uTime:    { value: 0 },
        uSize:    { value: 0.030 },
        uTexture: { value: tex },
      },
      vertexShader: `
        uniform float uTime;
        uniform float uSize;
        attribute float aRandom;
        attribute float aType;
        varying vec3  vColor;
        varying float vAlpha;
        varying float vType;
        varying float vRadius;
        varying float vDist;

        void main() {
          vColor  = color;
          vType   = aType;
          vec3 p  = position;
          vRadius = length(p.xz);

          // Differential rotation
          float omega = 0.048 / (0.5 + vRadius * 0.065);
          float ang   = uTime * omega;
          float s = sin(ang), c = cos(ang);
          p.xz = mat2(c,-s,s,c) * p.xz;

          float flicker = sin(uTime*1.3 + aRandom*48.0)*0.08 + 0.92;
          vAlpha = 1.0 - smoothstep(14.5, 19.0, vRadius);

          vec4 mv = modelViewMatrix * vec4(p, 1.0);

          // Rare giant stars
          float giant = pow(aRandom, 14.0) * 22.0;
          float sz    = uSize * (0.55 + giant);
          if (aType > 0.5 && aType < 1.5) sz *= 1.7;  // H II
          if (aType > 1.5 && aType < 2.5) sz *= 0.45; // dust
          if (aType > 2.5 && aType < 3.5) sz *= 0.85; // bar

          // CI-16-003: Radius-based size attenuation (exempt bar/bulge type 3)
          float radialAtten = clamp(vRadius / 12.0, 0.18, 1.0);
          if (aType < 2.5 || aType > 3.5) sz *= radialAtten; // arms only, not core

          gl_PointSize = sz * 2800.0 * (1.0 / -mv.z) * flicker;
          vDist        = -mv.z;
          gl_Position  = projectionMatrix * mv;
        }
      `,
      fragmentShader: `
        uniform sampler2D uTexture;
        varying vec3  vColor;
        varying float vAlpha;
        varying float vType;
        varying float vRadius;
        varying float vDist;

        void main() {
          vec4 tex  = texture2D(uTexture, gl_PointCoord);

          // CI-16-002: Steeper core falloff — inner particles very dim individually
          // Heavy additive overlap builds up brightness naturally
          float cf  = clamp(vRadius * 0.42, 0.04, 1.0);

          // CI-16-001: Strict opacity limits per type
          float op;
          if      (vType > 1.5 && vType < 2.5) op = 0.04;   // dust
          else if (vType > 3.5)                 op = 1.0;    // haze
          else if (vType > 0.5 && vType < 1.5) op = 0.60;   // H II
          else if (vType > 2.5 && vType < 3.5) op = 1.0;    // bar
          else                                  op = 0.22;   // normal stars

          // Volumetric fade: particles disappear as they hit the lens
          float nearFade = smoothstep(0.4, 2.2, vDist);

          gl_FragColor = vec4(vColor, tex.a * vAlpha * cf * op * nearFade);
        }
      `,
    });

    const pts = new THREE.Points(geo, mat);
    scene.add(pts);

    let animId: number;
    const tick = () => {
      animId = requestAnimationFrame(tick);
      mat.uniforms.uTime.value = performance.now() * 0.001;

      // Smoothly interpolate zoom distance
      const curDist = camera.position.length();
      const newDist = THREE.MathUtils.lerp(curDist, targetDist, 0.08);
      const dir     = camera.position.clone().normalize();
      camera.position.copy(dir.multiplyScalar(newDist));

      controls.update();
      composer.render();
    };
    tick();

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      composer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('keydown', onKeyDown);
      renderer.dispose(); tex.dispose(); geo.dispose(); mat.dispose();
      if (containerRef.current) containerRef.current.innerHTML = '';
    };
  }, []);

  return <div ref={containerRef} className="w-full h-full" />;
});

ParticleField.displayName = "ParticleField";