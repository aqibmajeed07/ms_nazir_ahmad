import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function Hero3DCanvas() {
  const containerRef = useRef(null);
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check WebGL
    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      if (!gl) {
        setSupported(false);
        return;
      }
    } catch (e) {
      setSupported(false);
      return;
    }

    const width = container.clientWidth || 380;
    const height = container.clientHeight || 380;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(6, 5, 8);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    container.appendChild(renderer.domElement);

    // Ambient & Directional Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xc59b27, 2.5);
    keyLight.position.set(8, 12, 6);
    scene.add(keyLight);

    const cyanLight = new THREE.DirectionalLight(0x38bdf8, 1.8);
    cyanLight.position.set(-6, -4, -4);
    scene.add(cyanLight);

    // Materials
    const beamMaterial = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.8,
      roughness: 0.25
    });

    const goldJointMaterial = new THREE.MeshStandardMaterial({
      color: 0xc59b27,
      metalness: 0.9,
      roughness: 0.2,
      emissive: 0x92400e,
      emissiveIntensity: 0.3
    });

    const slabMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x0284c7,
      transparent: true,
      opacity: 0.35,
      roughness: 0.1,
      metalness: 0.1,
      transmission: 0.7
    });

    const wireframeLineMaterial = new THREE.LineBasicMaterial({
      color: 0xc59b27,
      transparent: true,
      opacity: 0.4
    });

    const structureGroup = new THREE.Group();

    // 1. Grid of Vertical Structural Columns
    const colGeo = new THREE.CylinderGeometry(0.08, 0.08, 3.6, 12);
    const positions = [
      [-1.5, -1.5], [0, -1.5], [1.5, -1.5],
      [-1.5, 0],    [0, 0],    [1.5, 0],
      [-1.5, 1.5],  [0, 1.5],  [1.5, 1.5]
    ];

    positions.forEach(([x, z]) => {
      const col = new THREE.Mesh(colGeo, beamMaterial);
      col.position.set(x, 1.8, z);
      structureGroup.add(col);

      // Gold connection nodes at floor levels
      [0, 1.8, 3.6].forEach((y) => {
        const joint = new THREE.Mesh(new THREE.SphereGeometry(0.14, 16, 16), goldJointMaterial);
        joint.position.set(x, y, z);
        structureGroup.add(joint);
      });
    });

    // 2. Horizontal Beams (Floor 1 & Floor 2)
    const hBeamXGeo = new THREE.BoxGeometry(3.1, 0.1, 0.1);
    const hBeamZGeo = new THREE.BoxGeometry(0.1, 0.1, 3.1);

    [1.8, 3.6].forEach((y) => {
      [-1.5, 0, 1.5].forEach((z) => {
        const beamX = new THREE.Mesh(hBeamXGeo, beamMaterial);
        beamX.position.set(0, y, z);
        structureGroup.add(beamX);
      });

      [-1.5, 0, 1.5].forEach((x) => {
        const beamZ = new THREE.Mesh(hBeamZGeo, beamMaterial);
        beamZ.position.set(x, y, 0);
        structureGroup.add(beamZ);
      });

      // Translucent Structural Slabs
      const slab = new THREE.Mesh(new THREE.BoxGeometry(3.0, 0.04, 3.0), slabMaterial);
      slab.position.set(0, y + 0.06, 0);
      structureGroup.add(slab);
    });

    // 3. Ground Base Elevation Grid
    const baseGrid = new THREE.GridHelper(5, 10, 0xc59b27, 0x334155);
    baseGrid.position.y = 0;
    structureGroup.add(baseGrid);

    // 4. Subtle Outer Wireframe Bounding Box
    const boxGeo = new THREE.BoxGeometry(3.4, 3.8, 3.4);
    const wireframe = new THREE.LineSegments(new THREE.EdgesGeometry(boxGeo), wireframeLineMaterial);
    wireframe.position.y = 1.8;
    structureGroup.add(wireframe);

    scene.add(structureGroup);
    camera.lookAt(0, 1.8, 0);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation Loop
    let animId;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      // Smooth damping rotation
      targetX = mouseX * 0.4;
      targetY = mouseY * 0.3;

      structureGroup.rotation.y += 0.006;
      structureGroup.rotation.x += (targetY - structureGroup.rotation.x) * 0.05;
      structureGroup.rotation.z += (targetX - structureGroup.rotation.z) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
      renderer.dispose();
      if (renderer.domElement.parentElement === container) {
        container.removeChild(renderer.domElement);
      }
      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
          else obj.material.dispose();
        }
      });
    };
  }, []);

  if (!supported) return null;

  return (
    <div className="hero-3d-wrapper">
      <div className="hero-3d-canvas-wrap" ref={containerRef} />
      <div className="hero-3d-badge">
        <span className="hero-3d-dot" />
        <span>Structural Framework 3D</span>
      </div>

      <style>{`
        .hero-3d-wrapper {
          position: relative;
          width: 100%;
          max-width: 440px;
          height: 380px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .hero-3d-canvas-wrap {
          width: 100%;
          height: 100%;
          cursor: grab;
          filter: drop-shadow(0 12px 28px rgba(0, 0, 0, 0.45));
        }

        .hero-3d-badge {
          position: absolute;
          bottom: 10px;
          right: 14px;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--accent);
          background-color: rgba(15, 37, 55, 0.85);
          backdrop-filter: blur(6px);
          border: 1px solid rgba(197, 155, 39, 0.35);
          padding: 4px 10px;
          border-radius: var(--radius-sm);
          pointer-events: none;
        }

        .hero-3d-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: var(--accent);
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.3); }
        }

        @media (max-width: 900px) {
          .hero-3d-wrapper {
            max-width: 340px;
            height: 300px;
            margin: 1.5rem auto 0 auto;
          }
        }
      `}</style>
    </div>
  );
}
