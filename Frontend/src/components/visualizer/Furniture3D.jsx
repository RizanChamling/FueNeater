import React, { useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, ContactShadows, Float, PresentationControls } from '@react-three/drei';
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry';

const Tabletop = ({ width, depth, shape, material, edgeProfile, cornerRadius }) => {
  const geometry = useMemo(() => {
    const w = width / 100;
    const d = depth / 100;
    const t = 0.04;
    const r = (cornerRadius / 100) || 0;

    // Clear distinction for each shape
    if (shape === 'round') {
       // A round table uses the width as diameter
       return new THREE.CylinderGeometry(w/2, w/2, t, 64);
    }
    
    if (shape === 'oval') {
       const shape = new THREE.Shape();
       // Use w and d for the ellipse axes
       shape.absellipse(0, 0, w/2, d/2, 0, Math.PI * 2, false, 0);
       return new THREE.ExtrudeGeometry(shape, { depth: t, bevelEnabled: edgeProfile !== 'straight', bevelThickness: 0.01, bevelSize: 0.01, bevelSegments: 3 });
    }

    if (shape === 'diamond') {
       const shape = new THREE.Shape();
       // Rhombus points
       shape.moveTo(0, d/2);
       shape.lineTo(w/2, 0);
       shape.lineTo(0, -d/2);
       shape.lineTo(-w/2, 0);
       shape.closePath();
       return new THREE.ExtrudeGeometry(shape, { depth: t, bevelEnabled: edgeProfile !== 'straight', bevelThickness: 0.01, bevelSize: 0.01, bevelSegments: 3 });
    }

    if (shape === 'square') {
       // Force square proportions if user selected square
       const size = Math.min(w, d);
       return new RoundedBoxGeometry(size, t, size, 5, r || 0.01);
    }
    
    // Default: Rectangular
    return new RoundedBoxGeometry(w, t, d, 10, r || 0.005);
  }, [width, depth, shape, cornerRadius, edgeProfile]);

  return (
    <mesh 
       geometry={geometry} 
       rotation={shape === 'round' ? [0, 0, 0] : (shape === 'oval' || shape === 'diamond' ? [Math.PI/2, 0, 0] : [0, 0, 0])} 
       position={shape === 'round' ? [0, 0, 0] : (shape === 'oval' || shape === 'diamond' ? [0, 0.02, 0] : [0, 0, 0])}
       receiveShadow 
       castShadow
    >
      <meshStandardMaterial 
        color={material.color} 
        roughness={0.4} 
        metalness={0.1}
      />
    </mesh>
  );
};

const Leg = ({ height, position, material, style, frameColor }) => {
  return (
    <mesh position={position} castShadow>
      <boxGeometry args={[0.05, height / 100, 0.05]} />
      <meshStandardMaterial color={material === 'steel' ? frameColor : '#B08D57'} metalness={material === 'steel' ? 0.8 : 0.1} roughness={material === 'steel' ? 0.2 : 0.4} />
    </mesh>
  );
};

const DiningTableModel = ({ config }) => {
  const { dimensions, material, legStyle, legMaterial, frameColor, tableShape } = config;
  const h = dimensions.height / 100;
  const w = dimensions.width / 100;
  const d = dimensions.depth / 100;

  return (
    <group position={[0, h, 0]}>
      <Tabletop {...dimensions} {...config} shape={tableShape} />
      
      {/* Legs */}
      <group position={[0, -h/2, 0]}>
        {legStyle === 'standard' && (
          <>
            <Leg height={dimensions.height} position={[w/2 - 0.1, 0, d/2 - 0.1]} material={legMaterial} frameColor={frameColor} />
            <Leg height={dimensions.height} position={[-w/2 + 0.1, 0, d/2 - 0.1]} material={legMaterial} frameColor={frameColor} />
            <Leg height={dimensions.height} position={[w/2 - 0.1, 0, -d/2 + 0.1]} material={legMaterial} frameColor={frameColor} />
            <Leg height={dimensions.height} position={[-w/2 + 0.1, 0, -d/2 + 0.1]} material={legMaterial} frameColor={frameColor} />
          </>
        )}

        {legStyle === 'u-frame' && (
          <>
            <mesh position={[w/2 - 0.2, 0, 0]}>
              <boxGeometry args={[0.06, h, d - 0.2]} />
              <meshStandardMaterial color={legMaterial === 'steel' ? frameColor : material.color} metalness={legMaterial === 'steel' ? 0.7 : 0} />
            </mesh>
            <mesh position={[-w/2 + 0.2, 0, 0]}>
              <boxGeometry args={[0.06, h, d - 0.2]} />
              <meshStandardMaterial color={legMaterial === 'steel' ? frameColor : material.color} metalness={legMaterial === 'steel' ? 0.7 : 0} />
            </mesh>
          </>
        )}

        {legStyle === 'spider' && (
          <group>
            {[0, Math.PI/2, Math.PI, Math.PI*1.5].map((rot, i) => (
              <mesh key={i} rotation={[0, rot, 0.45]} position={[Math.sin(rot)*0.2, 0, Math.cos(rot)*0.2]}>
                <boxGeometry args={[0.04, h * 1.2, 0.04]} />
                <meshStandardMaterial color={legMaterial === 'steel' ? frameColor : material.color} metalness={legMaterial === 'steel' ? 0.7 : 0} />
              </mesh>
            ))}
          </group>
        )}
      </group>
    </group>
  );
};

const DeskModel = ({ config }) => {
  const { dimensions, material, legStyle, legMaterial, frameColor, layering } = config;
  const h = dimensions.height / 100;
  const w = dimensions.width / 100;
  const d = dimensions.depth / 100;

  return (
    <group position={[0, h, 0]}>
      {/* Tabletop with Grommet */}
      <group>
         <Tabletop {...dimensions} {...config} shape="rectangular" />
         {/* Cable Grommet */}
         <mesh position={[w/2 - 0.15, 0.021, -d/2 + 0.15]}>
            <cylinderGeometry args={[0.03, 0.03, 0.01, 32]} />
            <meshStandardMaterial color="#333" metalness={0.8} />
         </mesh>
      </group>
      
      {/* Modesty Panel (Functional Distinction) */}
      {layering === 'office' && (
         <mesh position={[0, -h/2 + 0.1, -d/2 + 0.1]}>
            <boxGeometry args={[w - 0.2, h - 0.2, 0.02]} />
            <meshStandardMaterial color={material.color} opacity={0.8} transparent />
         </mesh>
      )}

      {/* Desk Legs - Braced for stability */}
      <group position={[0, -h/2, 0]}>
         {legStyle === 'standard' ? (
            <>
               <mesh position={[w/2 - 0.05, 0, 0]}><boxGeometry args={[0.04, h, d - 0.1]} /><meshStandardMaterial color={legMaterial === 'steel' ? frameColor : material.color} /></mesh>
               <mesh position={[-w/2 + 0.05, 0, 0]}><boxGeometry args={[0.04, h, d - 0.1]} /><meshStandardMaterial color={legMaterial === 'steel' ? frameColor : material.color} /></mesh>
            </>
         ) : (
            <DiningTableModel config={config} />
         )}
      </group>
    </group>
  );
};

const BookshelfModel = ({ config }) => {
  const { dimensions, material, rows, cols, drawers, bookshelfStyle } = config;
  const w = dimensions.width / 100;
  const h = dimensions.height / 100;
  const d = dimensions.depth / 100;
  const t = 0.03;

  return (
    <group position={[0, h/2, 0]}>
      <mesh position={[0, 0, -d/2]}><boxGeometry args={[w, h, 0.01]} /><meshStandardMaterial color={material.color} /></mesh>
      <mesh position={[w/2, 0, 0]}><boxGeometry args={[t, h, d]} /><meshStandardMaterial color={material.color} /></mesh>
      <mesh position={[-w/2, 0, 0]}><boxGeometry args={[t, h, d]} /><meshStandardMaterial color={material.color} /></mesh>
      <mesh position={[0, h/2, 0]}><boxGeometry args={[w, t, d]} /><meshStandardMaterial color={material.color} /></mesh>
      <mesh position={[0, -h/2, 0]}><boxGeometry args={[w, t, d]} /><meshStandardMaterial color={material.color} /></mesh>

      {useMemo(() => {
        const elements = [];
        const rCount = rows || 4;
        const cCount = cols || 1;

        for (let i = 1; i < rCount; i++) {
          const y = -h/2 + (h/rCount) * i;
          if (bookshelfStyle === 'classic' || bookshelfStyle === 'asymmetric') {
             elements.push(
               <mesh key={`shelf-${i}`} position={[0, y, 0]}>
                 <boxGeometry args={[w - 0.02, t, d - 0.05]} />
                 <meshStandardMaterial color={material.color} />
               </mesh>
             );
          }
          if (bookshelfStyle === 'offset') {
             const offset = i % 2 === 0 ? w/4 : -w/4;
             elements.push(
               <mesh key={`shelf-L-${i}`} position={[offset, y, 0]}>
                 <boxGeometry args={[w/2 + 0.1, t, d - 0.05]} />
                 <meshStandardMaterial color={material.color} />
               </mesh>
             );
          }
        }
        return elements;
      }, [w, h, d, rows, bookshelfStyle, material])}
    </group>
  );
};

const BedModel = ({ config }) => {
  const { dimensions, material, shapeUp } = config;
  const w = dimensions.width / 100;
  const h = 0.4;
  const d = dimensions.depth / 100;

  return (
    <group position={[0, h/2, 0]}>
      <mesh castShadow><boxGeometry args={[w, 0.3, d]} /><meshStandardMaterial color="#F5F5F5" /></mesh>
      <mesh position={[0, -0.2, 0]}><boxGeometry args={[w + 0.05, 0.15, d + 0.05]} /><meshStandardMaterial color={material.color} /></mesh>
      <group position={[0, 0.4, -d/2]}>
         <mesh castShadow><boxGeometry args={[w + 0.1, shapeUp === 'tall' ? 1.2 : 0.8, 0.1]} /><meshStandardMaterial color={material.color} /></mesh>
         {shapeUp === 'wingback' && (
            <>
               <mesh position={[w/2 + 0.05, 0, 0.1]} rotation={[0, -0.4, 0]}><boxGeometry args={[0.1, 0.8, 0.3]} /><meshStandardMaterial color={material.color} /></mesh>
               <mesh position={[-w/2 - 0.05, 0, 0.1]} rotation={[0, 0.4, 0]}><boxGeometry args={[0.1, 0.8, 0.3]} /><meshStandardMaterial color={material.color} /></mesh>
            </>
         )}
      </group>
    </group>
  );
};

const ChairModel = ({ config }) => {
  const { dimensions, material, legStyle, legMaterial, frameColor } = config;
  const w = dimensions.width / 100;
  const h = dimensions.height / 100;
  const d = dimensions.depth / 100;
  const seatH = 0.45;

  return (
    <group position={[0, 0, 0]}>
      {/* Legs */}
      <group position={[0, seatH / 2, 0]}>
        <Leg height={seatH * 100} position={[w/2 - 0.05, 0, d/2 - 0.05]} material={legMaterial} frameColor={frameColor} />
        <Leg height={seatH * 100} position={[-w/2 + 0.05, 0, d/2 - 0.05]} material={legMaterial} frameColor={frameColor} />
        <Leg height={seatH * 100} position={[w/2 - 0.05, 0, -d/2 + 0.05]} material={legMaterial} frameColor={frameColor} />
        <Leg height={seatH * 100} position={[-w/2 + 0.05, 0, -d/2 + 0.05]} material={legMaterial} frameColor={frameColor} />
      </group>

      {/* Seat */}
      <mesh position={[0, seatH, 0]} castShadow>
        <RoundedBoxGeometry args={[w, 0.04, d]} radius={0.01} smoothness={4} />
        <meshStandardMaterial color={material.color} />
      </mesh>

      {/* Backrest */}
      <group position={[0, seatH + (h - seatH) / 2, -d/2 + 0.02]}>
        <mesh castShadow>
          <RoundedBoxGeometry args={[w, h - seatH, 0.04]} radius={0.01} smoothness={4} />
          <meshStandardMaterial color={material.color} />
        </mesh>
      </group>
    </group>
  );
};

const Furniture3D = ({ type, config }) => {
  return (
    <div className="w-full h-full">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[5, 4, 5]} fov={35} />
        <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 1.8} enableDamping />
        
        <Environment preset="apartment" />
        <ambientLight intensity={0.6} />
        <spotLight position={[5, 8, 5]} angle={0.25} penumbra={1} intensity={1.5} castShadow shadow-mapSize={[1024, 1024]} />

        <PresentationControls global rotation={[0, 0, 0]} polar={[-0.4, 0.4]} azimuth={[-1, 1]}>
          <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.2}>
            <group position={[0, -0.5, 0]}>
              {type === 'table' && <DiningTableModel config={config} />}
              {type === 'desk' && <DeskModel config={config} />} 
              {type === 'bookshelf' && <BookshelfModel config={config} />}
              {type === 'storage' && <BookshelfModel config={config} />}
              {type === 'bed' && <BedModel config={config} />}
              {type === 'chair' && <ChairModel config={config} />}
            </group>
          </Float>
        </PresentationControls>

        <ContactShadows position={[0, -1, 0]} opacity={0.4} scale={15} blur={2} far={4} />
      </Canvas>
    </div>
  );
};

export default Furniture3D;
