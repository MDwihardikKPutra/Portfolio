import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { PCDLoader } from 'three/examples/jsm/loaders/PCDLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export const PCDVisual = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let camera: THREE.PerspectiveCamera, 
        scene: THREE.Scene, 
        renderer: THREE.WebGLRenderer,
        controls: OrbitControls,
        pointsObj: THREE.Points | null = null,
        targetZ = 1.4,
        currentZ = 4.0; // Start zoomed out

    const init = () => {
      scene = new THREE.Scene();
      
      camera = new THREE.PerspectiveCamera(25, containerRef.current!.clientWidth / containerRef.current!.clientHeight, 0.01, 100);
      camera.position.set(0, 0, currentZ);
      scene.add(camera);

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(containerRef.current!.clientWidth, containerRef.current!.clientHeight);
      containerRef.current?.appendChild(renderer.domElement);

      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.autoRotate = true;
      controls.autoRotateSpeed = 1.0;
      controls.enableZoom = false; // Keep it focused

      const loader = new PCDLoader();
      const modelUrl = 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/models/pcd/binary/Zaghetto.pcd';
      
      loader.load(
        modelUrl,
        (points) => {
          points.geometry.center();
          points.geometry.rotateX(Math.PI);
          points.position.y = 0.05; 
          
          points.material.size = 0.0025;
          points.material.color.set(0x000000);
          pointsObj = points;
          scene.add(points);
        },
        undefined,
        (err) => {
          console.error("PCD Load Error:", err);
          const geo = new THREE.IcosahedronGeometry(0.3, 5);
          const mat = new THREE.PointsMaterial({ size: 0.002, color: 0x000000 });
          pointsObj = new THREE.Points(geo, mat);
          scene.add(pointsObj);
        }
      );

      window.addEventListener('resize', onWindowResize);
    };

    const onWindowResize = () => {
      if (!containerRef.current) return;
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };

    const animate = () => {
      requestAnimationFrame(animate);
      
      // Cinematic Zoom-In Interpolation
      if (currentZ > targetZ + 0.001) {
        currentZ += (targetZ - currentZ) * 0.03; // Smooth lerp
        camera.position.z = currentZ;
      }

      if (pointsObj) {
        // Direct object rotation for "Infinity" feel
        pointsObj.rotation.y += 0.002;
      }
      controls.update();
      renderer.render(scene, camera);
    };

    init();
    animate();

    return () => {
      window.removeEventListener('resize', onWindowResize);
      renderer.dispose();
      if (containerRef.current) containerRef.current.innerHTML = '';
    };
  }, []);

  return <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />;
};
