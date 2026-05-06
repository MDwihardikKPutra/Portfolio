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

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(44, width / height, 0.1, 800);
    // CRITICAL: Start at core with the correct slanted angle
    camera.position.set(0, 1.2, 1.7); 
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      powerPreference: "high-performance",
      alpha: true 
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);

    // ── Controls (Zoom Only) ──────────────────────────────────────────────
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableRotate = false; // Keep the angle fixed
    controls.enablePan    = false; // Keep the center fixed
    controls.enableZoom   = false; // Disable mouse zoom to restore page horizontal scroll
    controls.enableDamping = true;
    controls.minDistance  = 2;     // Allow getting very close to core
    controls.maxDistance  = 100;   // Allow zooming out significantly

    // ── Keyboard Zoom (Smooth Lerped) ───────────────────────────────────
    let targetDist = 15; // The 'normal' zoom out distance
    const onKeyDown = (e: KeyboardEvent) => {
      const zoomFactor = 0.25;
      if (e.key === 'ArrowUp') {
        targetDist = Math.min(targetDist * 1.25, controls.maxDistance);
      } else if (e.key === 'ArrowDown') {
        targetDist = Math.max(targetDist * 0.75, controls.minDistance);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    
    // ── Art Click Logic: Jump to core and zoom out ──────────────────────
    const onZoomTrigger = () => {
      // 1. Instantly jump inside the galaxy core
      const dir = camera.position.clone().normalize();
      camera.position.copy(dir.multiplyScalar(2.1)); 
      // 2. Target distance to zoom out to
      targetDist = 15; 
      // 3. Ensure looking at center
      camera.lookAt(0, 0, 0);
    };
    window.addEventListener('galaxy-zoom-trigger', onZoomTrigger);

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

    // ── Neutral/Electric Cinematic Palette (No Yellow) ───────────────────────
    const C_SING  = new THREE.Color('#FFFFFF'); 
    const C_BULGE = new THREE.Color('#00BFFF'); 
    const C_BAR   = new THREE.Color('#00BFFF'); 
    const C_INNER = new THREE.Color('#FFFFFF'); 
    const C_GOLD  = new THREE.Color('#E6F2FF'); 
    const C_ARM   = new THREE.Color('#00BFFF'); 
    const C_OUTER = new THREE.Color('#1E90FF'); 
    const C_HAZE  = new THREE.Color('#4B0082'); 
    const C_H2    = new THREE.Color('#FF00FF'); 
    const C_DUST  = new THREE.Color('#000000'); 

    const ARMS  = 4;
    const B     = 0.28;
    const R0    = 1.8; // Shrunked to match smaller core
    const RMAX  = 16.0;

    const armTheta = (r: number, arm: number) =>
      (arm / ARMS) * Math.PI * 2 + Math.log(r / R0) / B;

    const N     = 140000; // Optimized for performance (was 280000)
    const pos   = new Float32Array(N * 3);
    const col   = new Float32Array(N * 3);
    const rnd   = new Float32Array(N);
    const stype = new Float32Array(N);
    const armIndices = new Float32Array(N);
    const initialRadii = new Float32Array(N);
    const thetaOffsets = new Float32Array(N);
    const radiusOffsets = new Float32Array(N);
    let idx = 0;

    const put = (x: number, y: number, z: number, c: THREE.Color, t: number, br = 1.0, armIdx = -1, iR = 0, tOff = 0, rOff = 0) => {
      if (idx >= N) return;
      const i3 = idx * 3;
      pos[i3]=x; pos[i3+1]=y; pos[i3+2]=z;
      col[i3]=c.r*br; col[i3+1]=c.g*br; col[i3+2]=c.b*br;
      rnd[idx]   = Math.random();
      stype[idx] = t;
      armIndices[idx] = armIdx;
      initialRadii[idx] = iR;
      thetaOffsets[idx] = tOff;
      radiusOffsets[idx] = rOff;
      idx++;
    };

    // 1. VOID SINGULARITY (Absolute Zero)
    // Core matter purged to achieve the pitch black singularity look.

    // 2. ARMS (BLUE STARS) - ~35k
    for (let i = 0; i < 35000; i++) {
      const arm = i % ARMS;
      const r   = R0 + Math.pow(Math.random(), 0.85) * (RMAX - R0);
      const sigmaA = 0.35 + r * 0.02; 
      const tOff   = randn() * sigmaA;
      const rOff   = randn() * (0.6 + r * 0.04);
      const rRatio = (r - R0) / (RMAX - R0);
      let c: THREE.Color;
      if      (rRatio < 0.2)  c = C_GOLD.clone().lerp(C_ARM, rRatio/0.2);
      else if (rRatio < 0.7)  c = C_ARM.clone().lerp(C_ARM, 1.0);
      else                    c = C_ARM.clone().lerp(C_OUTER, (rRatio-0.7)/0.3);
      put(0, 0, 0, c, 0, 0.35 + Math.random()*0.3, arm, r, tOff, rOff);
    }

    // 3. HII REGIONS (PURPLE/PINK) - ~35k (More Diffuse)
    const h2Clusters: {r:number, arm:number}[] = [];
    for (let arm = 0; arm < ARMS; arm++) {
      for (let j = 1; j <= 12; j++) h2Clusters.push({ r: R0 + (j/13) * (RMAX*0.9 - R0), arm });
    }
    for (const cl of h2Clusters) {
      const nP = Math.floor(35000 / h2Clusters.length); 
      for (let p = 0; p < nP; p++) {
        const c = C_H2.clone().lerp(C_ARM, 0.2 + Math.random()*0.3);
        // Wider spread (0.2 / 0.4) to avoid "sausage" look
        put(0, 0, 0, c, 1, 0.4 + Math.random()*0.3, cl.arm, cl.r, randn()*0.22, randn()*0.35);
      }
    }

    // 4. HAZE (DEEP BLUE/PURPLE) - ~35k
    for (let i = 0; i < 35000; i++) {
      const r = -Math.log(1 - Math.random() * 0.99) * 5.5;
      if (r < RMAX) {
        const a = Math.random() * Math.PI * 2;
        put(Math.cos(a)*r, randn()*0.15, Math.sin(a)*r, C_HAZE.clone().lerp(C_OUTER, r/RMAX*1.1), 4, 0.015 + Math.random()*0.02);
      }
    }

    while (idx < N) {
        const r     = 60 + Math.random() * 400;
        const theta = Math.random() * Math.PI * 2;
        const phi   = Math.acos(2 * Math.random() - 1);
        const px = r * Math.sin(phi) * Math.cos(theta);
        const py = r * Math.sin(phi) * Math.sin(theta);
        const pz = r * Math.cos(phi);
        const br = 0.05 + Math.random() * 0.2; 
        put(px, py, pz, new THREE.Color('#FFFFFF'), 4, br);
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position',       new THREE.BufferAttribute(pos,   3));
    geo.setAttribute('color',          new THREE.BufferAttribute(col,   3));
    geo.setAttribute('aRandom',        new THREE.BufferAttribute(rnd,   1));
    geo.setAttribute('aType',          new THREE.BufferAttribute(stype, 1));
    geo.setAttribute('aArmIndex',      new THREE.BufferAttribute(armIndices, 1));
    geo.setAttribute('aInitialRadius', new THREE.BufferAttribute(initialRadii, 1));
    geo.setAttribute('aThetaOffset',   new THREE.BufferAttribute(thetaOffsets, 1));
    geo.setAttribute('aRadiusOffset',  new THREE.BufferAttribute(radiusOffsets, 1));

    const mat = new THREE.ShaderMaterial({
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, vertexColors: true,
      uniforms: {
        uTime: { value: 0 }, uAngle: { value: 0 }, uFlowOffset: { value: 0 },
        uSize: { value: 0.030 }, uTexture: { value: tex },
        uArms: { value: ARMS }, uB: { value: B }, uR0: { value: R0 }, uRMAX: { value: RMAX },
        uSuckStrength: { value: 0.0 }, 
      },
      vertexShader: `
        uniform float uTime, uAngle, uFlowOffset, uSize, uArms, uB, uR0, uRMAX, uSuckStrength;
        attribute float aRandom, aType, aArmIndex, aInitialRadius, aThetaOffset, aRadiusOffset;
        varying vec3 vColor; varying float vAlpha, vType, vRadius, vDist;

        void main() {
          vColor = color; vType = aType;
          vec3 p = position;

          float isFlow = step(aType, 2.5);
          float isCore = step(2.5, aType) * step(aType, 3.5);
          float isHaze = step(3.5, aType);

          float suck = uSuckStrength;
          float rRange = uRMAX - uR0;
          // Use Accumulated Flow for perfectly smooth expansion
          float rProgress = mod((aInitialRadius - uR0) - uFlowOffset, rRange);
          if (rProgress < 0.0) rProgress += rRange; 
          
          float r = uR0 + rProgress + aRadiusOffset;
          
          // Use ONLY Accumulated Angle for 100% stable rotation
          float theta = (aArmIndex / uArms) * 6.28 + (log(max(0.01, r) / uR0) / uB) + aThetaOffset + uAngle; 
          
          vec3 flowPos = vec3(r * cos(theta), 0.0, r * sin(theta));
          float flowFade = smoothstep(0.0, 0.15, rProgress / rRange) * (1.0 - smoothstep(0.85, 1.0, rProgress / rRange));

          float coreRad = length(p.xz);
          // Pure angle-based rotation
          float coreAng = aRandom * 6.28 + uAngle * 1.2; 
          vec3 corePos = vec3(coreRad * cos(coreAng), p.y, coreRad * sin(coreAng));

          p = mix(p, flowPos, isFlow);
          p = mix(p, corePos, isCore);

          vRadius = length(p.xz);
          float flicker = sin(uTime*1.3 + aRandom*48.0)*0.08 + 0.92;
          
          vAlpha = (1.0 - smoothstep(14.5, 19.0, vRadius)) * mix(1.0, flowFade, isFlow);
          vAlpha *= smoothstep(0.1, 0.45, vRadius); 

          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          float sizeMod = mix(1.0, 1.8, isCore); 
          // Subtle size boost for H2 (Type 1)
          sizeMod = mix(sizeMod, 1.3, step(0.5, vType)*step(vType, 1.5)); 
          sizeMod = mix(sizeMod, 0.4, isCore); // SHARPEN CORE MORE
          gl_PointSize = uSize * (0.55 + pow(aRandom, 14.0)*22.0) * 2800.0 * (1.0 / -mv.z) * flicker * sizeMod;
          
          vDist = -mv.z;
          gl_Position = projectionMatrix * mv;
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
          float cf  = clamp(vRadius * 0.42, 0.04, 1.0);
          cf = mix(cf, 1.0, step(2.5, vType) * step(vType, 3.5));
          
          float op;
          if      (vType > 1.5 && vType < 2.5) op = 0.035; 
          else if (vType > 3.5)                 op = 0.8;  
          else if (vType > 0.5 && vType < 1.5) op = 0.25; 
          else if (vType > 2.5 && vType < 3.5) op = 1.0; 
          else                                  op = 0.35; 
          
          float alpha = tex.a * vAlpha * cf * op;
          // EVEN LARGER AND CLEANER HOLE
          alpha *= smoothstep(0.18, 0.28, vRadius); 

          float nearFade = smoothstep(0.04, 2.2, vDist); 
          gl_FragColor = vec4(vColor, alpha * nearFade);
        }
      `,
    });

    const pts = new THREE.Points(geo, mat);
    scene.add(pts);

    // THE PHYSICAL BLACK HOLE (Solid Void)
    const bhGeo = new THREE.SphereGeometry(0.18, 32, 32);
    const bhMat = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const singularity = new THREE.Mesh(bhGeo, bhMat);
    scene.add(singularity);

    // CLICKABLE TARGET (Transparent)
    const raycaster  = new THREE.Raycaster();
    const mouse      = new THREE.Vector2();
    let isSucking    = false;
    let suckVal      = 0;
    const targetMesh = new THREE.Mesh(new THREE.SphereGeometry(1.2, 16, 16), new THREE.MeshBasicMaterial({ visible: false }));
    scene.add(targetMesh);

    const onBHClick = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      if (raycaster.intersectObject(targetMesh).length > 0) {
        isSucking = !isSucking;
      }
    };
    window.addEventListener('click', onBHClick);

    let animId: number;
    let lastTime = performance.now() * 0.001;
    let isInView = false;
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isInView = entry.isIntersecting;
          if (isInView) tick();
          
          if (entry.intersectionRatio < 0.99) {
            isSucking = false;
          }
        });
      },
      { 
        threshold: [0, 0.2, 0.5, 0.7, 0.9, 0.99, 1.0] 
      }
    );
    if (containerRef.current) intersectionObserver.observe(containerRef.current);

    const tick = () => {
      if (!isInView) return;
      animId = requestAnimationFrame(tick);
      const time = performance.now() * 0.001;
      const dt = time - lastTime;
      lastTime = time;
      
      // Calculate continuous momentum accumulation
      const orbitSpeed = 0.15 + suckVal * 1.35;
      const flowSpeed  = 0.4  + suckVal * 3.5;
      
      mat.uniforms.uAngle.value      += dt * orbitSpeed;
      mat.uniforms.uFlowOffset.value += dt * flowSpeed;

      if (isSucking) {
        suckVal = THREE.MathUtils.lerp(suckVal, 1.0, 0.03); 
        // Pure Top-Down Transition (No Zoom)
        camera.position.x = THREE.MathUtils.lerp(camera.position.x, 0, 0.05);
        camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetDist, 0.05);
        camera.position.z = THREE.MathUtils.lerp(camera.position.z, 0.01, 0.05);
      } else {
        suckVal = THREE.MathUtils.lerp(suckVal, 0.0, 0.03); 
        // Return to Tilted Perspective
        const tx = 0; 
        const ty = targetDist * 0.45;
        const tz = targetDist * 0.9;
        camera.position.x = THREE.MathUtils.lerp(camera.position.x, tx, 0.02);
        camera.position.y = THREE.MathUtils.lerp(camera.position.y, ty, 0.02);
        camera.position.z = THREE.MathUtils.lerp(camera.position.z, tz, 0.02);
      }
      
      mat.uniforms.uSuckStrength.value = suckVal;
      camera.lookAt(0, 0, 0);

      // Additive subtle spin
      pts.rotation.y += 0.0005;
      
      composer.render();
    };
    // tick(); // Handled by observer

    const updateSize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      composer.setSize(width, height);
    };

    updateSize();

    // ... (rest of the setup)

    const onResize = () => {
      updateSize();
    };
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('click', onBHClick);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('galaxy-zoom-trigger', onZoomTrigger);
      intersectionObserver.disconnect();
      renderer.dispose(); tex.dispose(); geo.dispose(); mat.dispose();
      if (containerRef.current) containerRef.current.innerHTML = '';
    };
  }, []);

  return <div ref={containerRef} className="w-full h-full" />;
});

ParticleField.displayName = "ParticleField";