import React, { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';

export default function Chassis3DAnimation({ activeColor = 'var(--jlr-accent)', brandTitle = 'D7x Architecture' }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [mergeRatio, setMergeRatio] = useState(0.5); // 0.0 (Exploded) to 1.0 (Merged)
  const [isRotating, setIsRotating] = useState(true);

  // References to pass values dynamically into the Three.js loop
  const mergeRatioRef = useRef(mergeRatio);
  const isRotatingRef = useRef(isRotating);
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const anglesRef = useRef({ x: -0.2, y: 0.8 }); // initial rotation angles (radians)

  // Sync state with refs for access in animation frame loop
  useEffect(() => {
    mergeRatioRef.current = mergeRatio;
  }, [mergeRatio]);

  useEffect(() => {
    isRotatingRef.current = isRotating;
  }, [isRotating]);

  // Main Three.js Scene Setup and Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Get color hex values from CSS or props
    const getAccentHex = () => {
      if (activeColor.startsWith('var')) {
        // Fallback checks for Range Rover gold and Discovery green
        return activeColor.includes('accent') ? 0xc5a880 : 0x68b284;
      }
      return parseInt(activeColor.replace('#', '0x'));
    };
    const accentHex = getAccentHex();

    // 1. Scene, Camera & WebGL Renderer
    const scene = new THREE.Scene();
    scene.background = null; // transparent to show radial CSS background

    const width = canvas.clientWidth || 650;
    const height = canvas.clientHeight || 365;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    camera.position.set(0, 60, 195);
    camera.lookAt(0, 5, 0);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height, false);

    // 2. Lighting Rig
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.45);
    scene.add(ambientLight);

    // Dynamic direct spotlight for metallic highlights
    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.5);
    dirLight1.position.set(80, 120, 50);
    scene.add(dirLight1);

    // Sub-light matching the active brand color
    const dirLight2 = new THREE.DirectionalLight(accentHex, 0.6);
    dirLight2.position.set(-80, -40, -50);
    scene.add(dirLight2);

    // Neon floor glow light
    const pointLight = new THREE.PointLight(accentHex, 1.8, 120);
    pointLight.position.set(0, -20, 0);
    scene.add(pointLight);

    // 3. Grid Floor Helper
    const gridHelper = new THREE.GridHelper(260, 24, 0x444444, 0x222222);
    gridHelper.position.y = -22;
    scene.add(gridHelper);

    // 4. Materials Setup
    const metalMaterial = new THREE.MeshStandardMaterial({
      color: 0x95a5a6,
      metalness: 0.9,
      roughness: 0.15,
    });

    const engineMaterial = new THREE.MeshStandardMaterial({
      color: 0xd35400, // Copper/bronze V8 block color
      metalness: 0.85,
      roughness: 0.25,
    });

    const seatMaterial = new THREE.MeshStandardMaterial({
      color: 0x5d4037, // Luxury saddle leather tan
      roughness: 0.7,
      metalness: 0.05,
    });

    const tireMaterial = new THREE.MeshStandardMaterial({
      color: 0x1b1c1e,
      roughness: 0.9,
      metalness: 0.1,
    });

    const rimMaterial = new THREE.MeshStandardMaterial({
      color: 0xdfe6e9,
      metalness: 0.95,
      roughness: 0.1,
    });

    const glassMaterial = new THREE.MeshStandardMaterial({
      color: accentHex,
      transparent: true,
      opacity: 0.25,
      roughness: 0.1,
      metalness: 0.25,
    });

    // 5. Build Volumetric Component Mesh Groups
    const assemblyGroup = new THREE.Group();
    scene.add(assemblyGroup);

    // A. CHASSIS GROUP
    const chassisGroup = new THREE.Group();
    assemblyGroup.add(chassisGroup);

    // Chassis Parallel Beams
    const leftBeam = new THREE.Mesh(new THREE.BoxGeometry(4, 3, 140), metalMaterial);
    leftBeam.position.set(-20, 0, 0);
    const rightBeam = new THREE.Mesh(new THREE.BoxGeometry(4, 3, 140), metalMaterial);
    rightBeam.position.set(20, 0, 0);
    chassisGroup.add(leftBeam, rightBeam);

    // Chassis Cross Members
    const crossZ = [-60, -30, 0, 30, 60];
    crossZ.forEach(z => {
      const cross = new THREE.Mesh(new THREE.BoxGeometry(36, 3, 3), metalMaterial);
      cross.position.set(0, 0, z);
      chassisGroup.add(cross);
    });

    // Axles & Driveshaft
    const frontAxle = new THREE.Mesh(new THREE.CylinderGeometry(1.5, 1.5, 42, 8), metalMaterial);
    frontAxle.rotation.z = Math.PI / 2;
    frontAxle.position.set(0, 0, -45);
    const rearAxle = new THREE.Mesh(new THREE.CylinderGeometry(1.5, 1.5, 42, 8), metalMaterial);
    rearAxle.rotation.z = Math.PI / 2;
    rearAxle.position.set(0, 0, 45);

    const diffGeom = new THREE.SphereGeometry(4.5, 12, 12);
    const frontDiff = new THREE.Mesh(diffGeom, metalMaterial);
    frontDiff.position.set(-6, 0, -45);
    const rearDiff = new THREE.Mesh(diffGeom, metalMaterial);
    rearDiff.position.set(0, 0, 45);

    const driveshaft = new THREE.Mesh(new THREE.CylinderGeometry(1, 1, 90, 8), metalMaterial);
    driveshaft.rotation.x = Math.PI / 2;
    driveshaft.position.set(0, 0, 0);

    chassisGroup.add(frontAxle, rearAxle, frontDiff, rearDiff, driveshaft);

    // B. V8 ENGINE GROUP
    const engineGroup = new THREE.Group();
    assemblyGroup.add(engineGroup);

    // Oil pan & bottom block
    const oilPan = new THREE.Mesh(new THREE.BoxGeometry(10, 10, 18), engineMaterial);
    oilPan.position.set(0, 3, -48);
    // V-angles block
    const engineBlockLeft = new THREE.Mesh(new THREE.BoxGeometry(6, 12, 16), metalMaterial);
    engineBlockLeft.rotation.z = Math.PI / 4;
    engineBlockLeft.position.set(-4, 10, -48);
    const engineBlockRight = new THREE.Mesh(new THREE.BoxGeometry(6, 12, 16), metalMaterial);
    engineBlockRight.rotation.z = -Math.PI / 4;
    engineBlockRight.position.set(4, 10, -48);

    engineGroup.add(oilPan, engineBlockLeft, engineBlockRight);

    // C. CABIN SEATS GROUP
    const seatsGroup = new THREE.Group();
    assemblyGroup.add(seatsGroup);

    const createSeat = (xOffset) => {
      const seat = new THREE.Group();
      // Cushion
      const cushion = new THREE.Mesh(new THREE.BoxGeometry(10, 2, 10), seatMaterial);
      cushion.position.set(xOffset, 2, 0);
      // Backrest
      const backrest = new THREE.Mesh(new THREE.BoxGeometry(10, 13, 2), seatMaterial);
      backrest.position.set(xOffset, 9, 4);
      backrest.rotation.x = 0.15; // slight recline
      // Headrest
      const headrest = new THREE.Mesh(new THREE.BoxGeometry(4, 4, 2.5), seatMaterial);
      headrest.position.set(xOffset, 16, 5);

      seat.add(cushion, backrest, headrest);
      return seat;
    };
    const driverSeat = createSeat(-10);
    const passengerSeat = createSeat(10);
    seatsGroup.add(driverSeat, passengerSeat);

    // D. TRANSPARENT BODY SHELL PANEL GROUP
    const bodyGroup = new THREE.Group();
    assemblyGroup.add(bodyGroup);

    // Glass body shell main cabin
    const cabinShell = new THREE.Mesh(new THREE.BoxGeometry(38, 25, 80), glassMaterial);
    cabinShell.position.set(0, 16, 12);
    // Front engine hood shell
    const hoodShell = new THREE.Mesh(new THREE.BoxGeometry(36, 14, 38), glassMaterial);
    hoodShell.position.set(0, 10, -47);
    bodyGroup.add(cabinShell, hoodShell);

    // E. 4 WHEELS (Independently grouped for lateral slider extensions)
    const createWheelMesh = () => {
      const wheel = new THREE.Group();
      // Tire cylinder
      const tire = new THREE.Mesh(new THREE.CylinderGeometry(12, 12, 6, 16), tireMaterial);
      tire.rotation.z = Math.PI / 2;
      // Metal rim center cap
      const rim = new THREE.Mesh(new THREE.CylinderGeometry(7, 7, 6.2, 12), rimMaterial);
      rim.rotation.z = Math.PI / 2;

      wheel.add(tire, rim);
      return wheel;
    };

    const wheelFL = createWheelMesh();
    const wheelFR = createWheelMesh();
    const wheelRL = createWheelMesh();
    const wheelRR = createWheelMesh();

    assemblyGroup.add(wheelFL, wheelFR, wheelRL, wheelRR);

    // 6. Animation and Render Loop
    let animationId;

    const render = () => {
      // Rotation logic
      if (isRotatingRef.current && !isDraggingRef.current) {
        anglesRef.current.y += 0.005;
      }
      assemblyGroup.rotation.x = anglesRef.current.x;
      assemblyGroup.rotation.y = anglesRef.current.y;

      // Dynamic Explode Offset calculations (0 = merged, 1 = exploded)
      const explodeOffset = 1 - mergeRatioRef.current;

      // Axles extend, V8 Engine slides forward, seats slide up, body shell slides up
      wheelFL.position.set(-23 - 35 * explodeOffset, 0, -45);
      wheelFR.position.set(23 + 35 * explodeOffset, 0, -45);
      wheelRL.position.set(-23 - 35 * explodeOffset, 0, 45);
      wheelRR.position.set(23 + 35 * explodeOffset, 0, 45);

      engineGroup.position.set(0, 0, -30 * explodeOffset);
      seatsGroup.position.set(0, -25 * explodeOffset, 0);
      bodyGroup.position.set(0, -40 * explodeOffset, 0);

      // Fade body panels out as they explode
      glassMaterial.opacity = 0.25 - explodeOffset * 0.2;

      renderer.render(scene, camera);
      animationId = requestAnimationFrame(render);
    };

    render();

    // Resize handler
    const handleResize = () => {
      const w = containerRef.current?.clientWidth || 650;
      const h = containerRef.current?.clientHeight || 365;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    };
    window.addEventListener('resize', handleResize);

    // Clean up WebGL memory when unmounting component
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      
      // Traverse and dispose geometries and materials
      scene.traverse(obj => {
        if (obj.isMesh) {
          obj.geometry.dispose();
          if (obj.material.isMaterial) {
            obj.material.dispose();
          } else if (Array.isArray(obj.material)) {
            obj.material.forEach(m => m.dispose());
          }
        }
      });
    };
  }, [activeColor]);

  // Mouse drag handlers to control rotation coordinates
  const handleMouseDown = (e) => {
    isDraggingRef.current = true;
    dragStartRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - dragStartRef.current.x;
    const deltaY = e.clientY - dragStartRef.current.y;

    anglesRef.current.y += deltaX * 0.007;
    anglesRef.current.x += deltaY * 0.007;

    // Prevent vertical camera flipping
    anglesRef.current.x = Math.max(-1.1, Math.min(1.1, anglesRef.current.x));

    dragStartRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  return (
    <div 
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '24px',
        width: '100%',
        maxWidth: '700px',
        margin: '0 auto',
      }}
    >
      {/* 3D Viewport Container */}
      <div 
        ref={containerRef}
        style={{ 
          position: 'relative',
          width: '100%',
          aspectRatio: '16/9',
          borderRadius: '6px',
          overflow: 'hidden',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 30px 60px rgba(0,0,0,0.6)',
          cursor: 'grab',
          background: 'radial-gradient(circle, #10121a 0%, #030406 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <canvas 
          ref={canvasRef}
          style={{ width: '100%', height: '100%', display: 'block' }}
        />
        
        {/* Diagnostic HUD HUD */}
        <div 
          style={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            fontFamily: 'monospace',
            fontSize: '9px',
            color: 'rgba(255,255,255,0.45)',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            pointerEvents: 'none',
          }}
        >
          <div>ENGINE: WebGL 2.0 (Three.js)</div>
          <div>GEOMETRY: Volumetric Solid Mesh</div>
          <div>LIGHTING: Specular Studio Spot</div>
          <div>ASSEMBLY: {(mergeRatio * 100).toFixed(0)}%</div>
          <div style={{ color: mergeRatio === 1 ? activeColor : '#ff9500', fontWeight: 'bold', marginTop: '6px', textTransform: 'uppercase' }}>
            STATUS: {mergeRatio === 1 ? 'SOLID CAR MODEL SECURED' : 'EXPLODED COMPONENT MODULES'}
          </div>
        </div>

        {/* Drag tips overlay */}
        <div 
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            padding: '6px 12px',
            backgroundColor: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(5px)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '4px',
            fontSize: '0.65rem',
            color: 'var(--jlr-white)',
            letterSpacing: '0.1rem',
            textTransform: 'uppercase',
            pointerEvents: 'none',
          }}
        >
          Drag to Rotate 3D Space
        </div>
      </div>

      {/* Assembly Slider Deck */}
      <div 
        style={{
          width: '100%',
          backgroundColor: '#0c0d12',
          padding: '20px 24px',
          borderRadius: '6px',
          border: '1px solid rgba(255,255,255,0.06)',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.05em' }}>
              {brandTitle} Assembly
            </div>
            <div style={{ fontSize: '0.65rem', color: 'var(--jlr-light-grey)' }}>
              Drag to merge V8 engine, monocoque frame, leather seats, alloy wheels, and body panels.
            </div>
          </div>
          <button
            onClick={() => setIsRotating(!isRotating)}
            style={{
              padding: '6px 12px',
              fontSize: '0.65rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              backgroundColor: isRotating ? 'rgba(255,255,255,0.05)' : activeColor,
              color: isRotating ? '#fff' : '#000',
              border: `1px solid ${isRotating ? 'rgba(255,255,255,0.1)' : activeColor}`,
              borderRadius: '3px',
              cursor: 'pointer',
              fontWeight: 600,
              transition: 'all 0.3s',
            }}
          >
            {isRotating ? 'Pause Rotation' : 'Auto Rotate'}
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '4px' }}>
          <span style={{ fontSize: '0.7rem', color: 'var(--jlr-light-grey)', letterSpacing: '0.1em' }}>EXPLODED VIEW</span>
          <input 
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={mergeRatio}
            onChange={(e) => setMergeRatio(parseFloat(e.target.value))}
            style={{
              flex: 1,
              height: '4px',
              backgroundColor: 'rgba(255,255,255,0.1)',
              borderRadius: '2px',
              outline: 'none',
              cursor: 'pointer',
              accentColor: activeColor,
            }}
          />
          <span style={{ fontSize: '0.7rem', color: activeColor, fontWeight: 700, letterSpacing: '0.1em' }}>FULLY MERGED</span>
        </div>
      </div>
    </div>
  );
}
