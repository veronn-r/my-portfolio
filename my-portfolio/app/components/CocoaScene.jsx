'use client';

import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls, PerspectiveCamera, Center, Environment } from '@react-three/drei';
import { Suspense } from 'react';

function Model(props) {
  const { scene } = useGLTF('/work/midnight-cocoa.glb');
  return <primitive object={scene} {...props} />;
}

export default function CocoaScene() {
  return (
    <div className="w-full h-[400px] md:h-[500px] cursor-move relative touch-none">
      
      <Canvas dpr={[1, 2]} gl={{ alpha: true }}>
        <Suspense fallback={null}>
            <PerspectiveCamera makeDefault position={[0, 0, 4]} />

            {/* Environment & Lighting optimized for dark packaging */}
            <Environment preset="city" /> 
            <ambientLight intensity={0.2} />
            <directionalLight 
              position={[5, 10, 5]} 
              intensity={0.8}
              // castShadow removed to prevent any shadow calculations
            />
            
            <Center>
                <Model scale={15} /> 
            </Center>

            {/* <ContactShadows /> block removed here */}

            <OrbitControls 
                enableZoom={false} 
                autoRotate={true}
                autoRotateSpeed={1}
                makeDefault 
            />
        </Suspense>
      </Canvas>
      
      <div className="absolute bottom-4 right-4 text-[10px] uppercase tracking-widest text-stone-300 pointer-events-none select-none">
        Drag to Rotate
      </div>
    </div>
  );
}

useGLTF.preload('/work/midnight-cocoa.glb');