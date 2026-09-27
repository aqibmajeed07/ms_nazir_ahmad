import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RotateCcw, RotateCw, ZoomIn, Eye, Sparkles, Compass } from 'lucide-react';

export default function InteractiveBuilding3D({ theme = 'dark' }) {
  const containerRef = useRef(null);
  const controlsRef = useRef(null);
  const cameraRef = useRef(null);
  const buildingGroupRef = useRef(null);
  const defaultPosRef = useRef(new THREE.Vector3(11.0, 8.5, 12.0));
  const defaultTargetRef = useRef(new THREE.Vector3(0, 2.2, 0));

  const [webGlSupported, setWebGlSupported] = useState(true);
  const [isInteracting, setIsInteracting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isResetting, setIsResetting] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Responsive camera parameters calculator
  const updateResponsiveCamera = useCallback((width, height, camera, controls, buildingGroup, syncCameraPos = false) => {
    if (!camera || !buildingGroup) return;
    const aspect = width / height;
    const isMobileView = width < 600 || window.innerWidth < 640;
    const isTabletView = (width >= 600 && width < 960) || (window.innerWidth >= 640 && window.innerWidth < 1024);

    setIsMobile(isMobileView);

    if (isMobileView) {
      // Mobile Viewport: Centered, scaled for comfortable margins, slightly elevated target
      camera.fov = 44;
      defaultPosRef.current.set(12.5, 9.8, 13.5);
      defaultTargetRef.current.set(0, 1.85, 0);
      buildingGroup.scale.set(0.82, 0.82, 0.82);
    } else if (isTabletView) {
      // Tablet Viewport
      camera.fov = 40;
      defaultPosRef.current.set(11.8, 9.0, 12.8);
      defaultTargetRef.current.set(0, 2.05, 0);
      buildingGroup.scale.set(0.92, 0.92, 0.92);
    } else {
      // Desktop Viewport
      camera.fov = 38;
      defaultPosRef.current.set(11.0, 8.5, 12.0);
      defaultTargetRef.current.set(0, 2.2, 0);
      buildingGroup.scale.set(1.0, 1.0, 1.0);
    }

    camera.aspect = aspect;
    camera.updateProjectionMatrix();

    if (controls) {
      controls.target.copy(defaultTargetRef.current);
      if (syncCameraPos) {
        camera.position.copy(defaultPosRef.current);
      }
      controls.update();
    }
  }, []);

  // Reset View handler
  const handleResetView = () => {
    if (!cameraRef.current || !controlsRef.current) return;
    setIsResetting(true);

    const camera = cameraRef.current;
    const controls = controlsRef.current;

    camera.position.copy(defaultPosRef.current);
    controls.target.copy(defaultTargetRef.current);
    controls.update();

    setTimeout(() => {
      setIsResetting(false);
    }, 600);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. WebGL Verification
    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      if (!gl) {
        setWebGlSupported(false);
        setLoading(false);
        return;
      }
    } catch (e) {
      setWebGlSupported(false);
      setLoading(false);
      return;
    }

    const width = container.clientWidth || 500;
    const height = container.clientHeight || 420;

    // 2. Scene & Fog Setup
    const scene = new THREE.Scene();
    const isDark = theme === 'dark';
    scene.background = new THREE.Color(isDark ? 0x07131d : 0xf8fafc);
    scene.fog = new THREE.FogExp2(isDark ? 0x07131d : 0xf8fafc, 0.032);

    // 3. Camera Setup
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    cameraRef.current = camera;

    // 4. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height, false);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = isDark ? 1.15 : 1.05;

    container.appendChild(renderer.domElement);

    // 5. OrbitControls Configuration (Pan disabled to keep building locked in center)
    const controls = new OrbitControls(camera, renderer.domElement);
    controlsRef.current = controls;
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enablePan = false; // Strictly prevent accidental displacement
    controls.maxPolarAngle = Math.PI / 2 - 0.05; // Never go under ground level
    controls.minDistance = 6.0;
    controls.maxDistance = 24.0;

    // 6. Lighting System
    const ambientLight = new THREE.AmbientLight(
      isDark ? 0x334155 : 0xffffff,
      isDark ? 1.0 : 0.85
    );
    scene.add(ambientLight);

    const mainSun = new THREE.DirectionalLight(
      isDark ? 0xc59b27 : 0xfff7ed,
      isDark ? 1.8 : 1.85
    );
    mainSun.position.set(14, 20, 12);
    mainSun.castShadow = true;
    mainSun.shadow.mapSize.width = 1024;
    mainSun.shadow.mapSize.height = 1024;
    mainSun.shadow.camera.near = 0.5;
    mainSun.shadow.camera.far = 45;
    mainSun.shadow.camera.left = -11;
    mainSun.shadow.camera.right = 11;
    mainSun.shadow.camera.top = 11;
    mainSun.shadow.camera.bottom = -11;
    mainSun.shadow.bias = -0.0005;
    scene.add(mainSun);

    // Fill Light
    const fillLight = new THREE.DirectionalLight(isDark ? 0x38bdf8 : 0xdbeafe, isDark ? 0.65 : 0.7);
    fillLight.position.set(-12, 10, -10);
    scene.add(fillLight);

    // Interior Warm Glow Illumination
    const interiorLight1 = new THREE.PointLight(0xffb703, isDark ? 2.6 : 1.2, 12);
    interiorLight1.position.set(0, 1.8, 0);
    scene.add(interiorLight1);

    const interiorLight2 = new THREE.PointLight(0xffb703, isDark ? 2.2 : 1.0, 12);
    interiorLight2.position.set(0, 3.8, 0);
    scene.add(interiorLight2);

    // 7. Architectural Materials
    const concreteMaterial = new THREE.MeshStandardMaterial({
      color: isDark ? 0x1e293b : 0xe2e8f0,
      roughness: 0.72,
      metalness: 0.1
    });

    const foundationMaterial = new THREE.MeshStandardMaterial({
      color: isDark ? 0x0f172a : 0xcbd5e1,
      roughness: 0.85,
      metalness: 0.05
    });

    const darkFacadeMaterial = new THREE.MeshStandardMaterial({
      color: isDark ? 0x0b131e : 0x334155,
      roughness: 0.38,
      metalness: 0.35
    });

    const goldAccentMaterial = new THREE.MeshStandardMaterial({
      color: 0xc59b27,
      roughness: 0.35,
      metalness: 0.65
    });

    const windowGlassMaterial = new THREE.MeshPhysicalMaterial({
      color: isDark ? 0xffb703 : 0x0284c7,
      emissive: isDark ? 0xf59e0b : 0x000000,
      emissiveIntensity: isDark ? 0.5 : 0.0,
      roughness: 0.08,
      metalness: 0.15,
      transmission: 0.65,
      transparent: true,
      opacity: isDark ? 0.88 : 0.65
    });

    const groundMaterial = new THREE.MeshStandardMaterial({
      color: isDark ? 0x0b141e : 0xf1f5f9,
      roughness: 0.95
    });

    const buildingGroup = new THREE.Group();
    buildingGroupRef.current = buildingGroup;

    // 8. Geometry: Foundation Plinth & Site
    const groundGeo = new THREE.CylinderGeometry(7.0, 7.0, 0.28, 36);
    const groundMesh = new THREE.Mesh(groundGeo, groundMaterial);
    groundMesh.position.y = -0.14;
    groundMesh.receiveShadow = true;
    buildingGroup.add(groundMesh);

    // Architectural Ground Grid Ring
    const ringGeo = new THREE.RingGeometry(7.05, 7.15, 36);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xc59b27, side: THREE.DoubleSide });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = -Math.PI / 2;
    ringMesh.position.y = 0.01;
    buildingGroup.add(ringMesh);

    // Concrete Plinth (Base Slab)
    const plinthGeo = new THREE.BoxGeometry(6.0, 0.38, 5.0);
    const plinthMesh = new THREE.Mesh(plinthGeo, foundationMaterial);
    plinthMesh.position.set(0, 0.19, 0);
    plinthMesh.receiveShadow = true;
    plinthMesh.castShadow = true;
    buildingGroup.add(plinthMesh);

    // Ground Floor Body
    const gfGeo = new THREE.BoxGeometry(5.0, 1.8, 4.0);
    const gfMesh = new THREE.Mesh(gfGeo, concreteMaterial);
    gfMesh.position.set(-0.2, 1.28, 0);
    gfMesh.castShadow = true;
    gfMesh.receiveShadow = true;
    buildingGroup.add(gfMesh);

    // Entrance Curtain Glass
    const gfGlassGeo = new THREE.BoxGeometry(3.4, 1.4, 0.14);
    const gfGlassMesh = new THREE.Mesh(gfGlassGeo, windowGlassMaterial);
    gfGlassMesh.position.set(0.4, 1.25, 2.02);
    buildingGroup.add(gfGlassMesh);

    // Entrance Canopy & Steel Columns
    const canopyGeo = new THREE.BoxGeometry(3.5, 0.12, 1.1);
    const canopyMesh = new THREE.Mesh(canopyGeo, goldAccentMaterial);
    canopyMesh.position.set(0.4, 2.05, 2.45);
    canopyMesh.castShadow = true;
    buildingGroup.add(canopyMesh);

    const postGeo = new THREE.CylinderGeometry(0.045, 0.045, 1.75, 12);
    const postLeft = new THREE.Mesh(postGeo, darkFacadeMaterial);
    postLeft.position.set(-1.15, 1.08, 2.85);
    postLeft.castShadow = true;
    buildingGroup.add(postLeft);

    const postRight = postLeft.clone();
    postRight.position.x = 1.95;
    buildingGroup.add(postRight);

    // Second Floor Cantilever Volume
    const sfGeo = new THREE.BoxGeometry(5.4, 1.8, 4.2);
    const sfMesh = new THREE.Mesh(sfGeo, darkFacadeMaterial);
    sfMesh.position.set(0.25, 3.08, -0.1);
    sfMesh.castShadow = true;
    sfMesh.receiveShadow = true;
    buildingGroup.add(sfMesh);

    // Second Floor Ribbon Windows
    const sfFrontWindowGeo = new THREE.BoxGeometry(4.0, 0.9, 0.12);
    const sfFrontWindowMesh = new THREE.Mesh(sfFrontWindowGeo, windowGlassMaterial);
    sfFrontWindowMesh.position.set(0.35, 3.18, 2.02);
    buildingGroup.add(sfFrontWindowMesh);

    const sfSideWindowGeo = new THREE.BoxGeometry(0.12, 0.9, 2.8);
    const sfSideWindowMesh = new THREE.Mesh(sfSideWindowGeo, windowGlassMaterial);
    sfSideWindowMesh.position.set(2.97, 3.18, -0.1);
    buildingGroup.add(sfSideWindowMesh);

    // Terraced Balcony with Safety Railing
    const balconySlabGeo = new THREE.BoxGeometry(2.2, 0.14, 1.4);
    const balconySlab = new THREE.Mesh(balconySlabGeo, foundationMaterial);
    balconySlab.position.set(-1.85, 2.18, 1.2);
    balconySlab.castShadow = true;
    buildingGroup.add(balconySlab);

    const railingGeo = new THREE.BoxGeometry(2.15, 0.65, 0.05);
    const railingMesh = new THREE.Mesh(railingGeo, windowGlassMaterial);
    railingMesh.position.set(-1.85, 2.58, 1.88);
    buildingGroup.add(railingMesh);

    // Rooftop Core
    const roofCoreGeo = new THREE.BoxGeometry(2.2, 1.35, 2.0);
    const roofCoreMesh = new THREE.Mesh(roofCoreGeo, concreteMaterial);
    roofCoreMesh.position.set(-0.6, 4.65, -0.6);
    roofCoreMesh.castShadow = true;
    roofCoreMesh.receiveShadow = true;
    buildingGroup.add(roofCoreMesh);

    // Rooftop Pergola Canopy
    const pergolaRoofGeo = new THREE.BoxGeometry(3.3, 0.08, 2.5);
    const pergolaRoof = new THREE.Mesh(pergolaRoofGeo, goldAccentMaterial);
    pergolaRoof.position.set(1.3, 4.95, 0.35);
    pergolaRoof.castShadow = true;
    buildingGroup.add(pergolaRoof);

    // Pergola Columns
    for (let x = 0; x <= 2.5; x += 2.5) {
      for (let z = -0.85; z <= 0.85; z += 1.7) {
        const pSupport = new THREE.Mesh(postGeo, darkFacadeMaterial);
        pSupport.scale.set(1, 0.52, 1);
        pSupport.position.set(x + 0.05, 4.45, z + 0.35);
        buildingGroup.add(pSupport);
      }
    }

    // Site Landscaping Planter
    const planterGeo = new THREE.BoxGeometry(1.4, 0.36, 0.7);
    const planterMesh = new THREE.Mesh(planterGeo, foundationMaterial);
    planterMesh.position.set(-2.0, 0.18, 1.9);
    planterMesh.castShadow = true;
    buildingGroup.add(planterMesh);

    // Surveyor Tripod Reference Indicator
    const tripodGeo = new THREE.ConeGeometry(0.15, 0.62, 4);
    const tripodMesh = new THREE.Mesh(tripodGeo, goldAccentMaterial);
    tripodMesh.position.set(2.6, 0.5, 1.8);
    tripodMesh.castShadow = true;
    buildingGroup.add(tripodMesh);

    scene.add(buildingGroup);

    // Initial Camera Configuration
    updateResponsiveCamera(width, height, camera, controls, buildingGroup, true);
    setLoading(false);

    // 9. Animation Loop with IntersectionObserver
    let animationFrameId;
    let autoRotate = true;
    let isVisibleOnScreen = true;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (isVisibleOnScreen) {
        if (autoRotate && !isInteracting) {
          buildingGroup.rotation.y += 0.003;
        }

        controls.update();
        renderer.render(scene, camera);
      }
    };

    animate();

    // 10. IntersectionObserver
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleOnScreen = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    intersectionObserver.observe(container);

    // 11. ResizeObserver for Guaranteed Accurate Responsive Layout
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const newW = entry.contentRect.width;
        const newH = entry.contentRect.height;
        if (newW > 0 && newH > 0) {
          updateResponsiveCamera(newW, newH, camera, controls, buildingGroup, false);
          renderer.setSize(newW, newH, false);
        }
      }
    });
    resizeObserver.observe(container);

    // 12. Pointer Event Handlers
    const handleStart = () => setIsInteracting(true);
    const handleEnd = () => setIsInteracting(false);

    const domElem = renderer.domElement;
    domElem.addEventListener('pointerdown', handleStart);
    domElem.addEventListener('pointerup', handleEnd);

    // 13. Cleanup
    return () => {
      intersectionObserver.disconnect();
      resizeObserver.disconnect();
      domElem.removeEventListener('pointerdown', handleStart);
      domElem.removeEventListener('pointerup', handleEnd);
      cancelAnimationFrame(animationFrameId);

      controls.dispose();
      renderer.dispose();
      if (domElem.parentElement === container) {
        container.removeChild(domElem);
      }

      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else {
            obj.material.dispose();
          }
        }
      });
    };
  }, [theme, updateResponsiveCamera]);

  return (
    <div className="building-3d-wrapper" aria-label="Interactive 3D Architectural Model">
      {!webGlSupported ? (
        <div className="building-3d-fallback">
          <img
            src="/images/cad_engineering_blueprint.jpg"
            alt="2D & 3D Engineering Drafting Representation"
            className="fallback-image"
          />
          <div className="fallback-badge">
            <Eye size={16} /> Architectural Drafting Perspective
          </div>
        </div>
      ) : (
        <div className="canvas-container" ref={containerRef}>
          {loading && (
            <div className="canvas-loader">
              <Sparkles size={24} className="loader-icon" />
              <span>Rendering 3D Structure...</span>
            </div>
          )}

          {/* Top Left: Interactive 3D Label & Status */}
          <div className="model-header-tag" aria-hidden="true">
            <span className="scale-dot" />
            <span className="tag-label tag-label-desktop">Interactive 3D Structure</span>
            <span className="tag-label tag-label-mobile">3D Structure</span>
          </div>

          {/* Top Right: Reset View Control */}
          <button
            type="button"
            className={`btn-reset-view ${isResetting ? 'is-active' : ''}`}
            onClick={handleResetView}
            aria-label="Reset 3D camera to default viewpoint"
            title="Reset to default camera viewpoint"
          >
            <RotateCcw size={13} className={`reset-icon ${isResetting ? 'spin-once' : ''}`} />
            <span>Reset View</span>
          </button>

          {/* Bottom Left: Touch & Mouse Instructions */}
          <div className="canvas-hints" aria-hidden="true">
            {isMobile ? (
              <span className="hint-pill">
                <RotateCw size={13} /> Drag to explore
              </span>
            ) : (
              <>
                <span className="hint-pill">
                  <RotateCw size={13} /> Drag to rotate
                </span>
                <span className="hint-pill">
                  <ZoomIn size={13} /> Scroll to zoom
                </span>
              </>
            )}
          </div>

          {/* Bottom Right: Architectural Specification Tag */}
          <div className="spec-corner-pill" aria-hidden="true">
            <Compass size={13} /> Procedural CAD Model
          </div>
        </div>
      )}

      <style>{`
        .building-3d-wrapper {
          position: relative;
          width: 100%;
          height: 440px;
          border-radius: var(--radius-md);
          overflow: hidden;
          background-color: var(--surface);
          border: 1px solid var(--border);
          box-shadow: var(--shadow-md);
        }

        @media (max-width: 960px) {
          .building-3d-wrapper {
            height: 400px;
          }
        }

        @media (max-width: 640px) {
          .building-3d-wrapper {
            height: 380px;
          }
        }

        .canvas-container {
          width: 100%;
          height: 100%;
          position: relative;
          cursor: grab;
          touch-action: none;
        }

        .canvas-container canvas {
          display: block;
          width: 100% !important;
          height: 100% !important;
        }

        .canvas-container:active {
          cursor: grabbing;
        }

        .canvas-loader {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          color: var(--text-muted);
          font-size: 0.9rem;
          font-weight: 600;
          background-color: var(--surface);
          z-index: 5;
        }

        .loader-icon {
          color: var(--accent);
          animation: spin 2s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* Top Left Header Tag */
        .model-header-tag {
          position: absolute;
          top: 14px;
          left: 14px;
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-size: 0.74rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #E2B842;
          background-color: rgba(7, 19, 29, 0.88);
          padding: 6px 12px;
          border-radius: var(--radius-sm);
          border: 1px solid rgba(197, 155, 39, 0.45);
          backdrop-filter: blur(8px);
          z-index: 15;
          pointer-events: none;
        }

        .tag-label-mobile {
          display: none;
        }

        @media (max-width: 480px) {
          .tag-label-desktop {
            display: none;
          }
          .tag-label-mobile {
            display: inline;
          }
          .model-header-tag {
            padding: 5px 9px;
            font-size: 0.7rem;
            left: 10px;
            top: 10px;
          }
          .btn-reset-view {
            padding: 5px 9px !important;
            font-size: 0.72rem !important;
            right: 10px !important;
            top: 10px !important;
          }
        }

        .scale-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background-color: #22c55e;
          box-shadow: 0 0 8px #22c55e;
        }

        /* Top Right Reset View Button */
        .btn-reset-view {
          position: absolute;
          top: 14px;
          right: 14px;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.75rem;
          font-weight: 600;
          color: #FFFFFF;
          background-color: rgba(7, 19, 29, 0.88);
          padding: 7px 12px;
          border-radius: var(--radius-sm);
          border: 1px solid rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(8px);
          z-index: 20;
          cursor: pointer;
          transition: all var(--transition-fast);
          touch-action: manipulation;
        }

        .btn-reset-view:hover {
          background-color: rgba(197, 155, 39, 0.25);
          border-color: rgba(197, 155, 39, 0.7);
          color: #E2B842;
          transform: translateY(-1px);
        }

        .btn-reset-view:active {
          transform: translateY(1px);
        }

        .spin-once {
          animation: spin 0.6s ease-in-out;
        }

        /* Bottom Left Instructions Overlay */
        .canvas-hints {
          position: absolute;
          bottom: 14px;
          left: 14px;
          display: flex;
          gap: 8px;
          z-index: 15;
          pointer-events: none;
        }

        .hint-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 5px 11px;
          border-radius: var(--radius-sm);
          font-size: 0.74rem;
          font-weight: 600;
          background-color: rgba(7, 19, 29, 0.85);
          backdrop-filter: blur(8px);
          color: #FFFFFF;
          border: 1px solid rgba(255, 255, 255, 0.16);
        }

        /* Bottom Right Spec Pill */
        .spec-corner-pill {
          position: absolute;
          bottom: 14px;
          right: 14px;
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 5px 11px;
          border-radius: var(--radius-sm);
          font-size: 0.72rem;
          font-weight: 600;
          background-color: rgba(7, 19, 29, 0.85);
          backdrop-filter: blur(8px);
          color: #C59B27;
          border: 1px solid rgba(197, 155, 39, 0.3);
          pointer-events: none;
          z-index: 15;
        }

        @media (max-width: 480px) {
          .spec-corner-pill {
            display: none;
          }
        }

        /* Fallback Container */
        .building-3d-fallback {
          width: 100%;
          height: 100%;
          position: relative;
        }

        .fallback-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .fallback-badge {
          position: absolute;
          bottom: 14px;
          left: 14px;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          border-radius: var(--radius-sm);
          background-color: rgba(7, 19, 29, 0.85);
          color: #FFFFFF;
          font-size: 0.8rem;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}
