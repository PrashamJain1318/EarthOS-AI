import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';

// Component rendering the procedural Earth and AI Particle system inside Canvas
const SceneContent: React.FC<{ mousePos: { x: number; y: number } }> = ({ mousePos }) => {
  const earthRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  // Animate elements and bind mouse coordinates to parallax rotation
  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (earthRef.current) {
      // Base rotation
      earthRef.current.rotation.y = time * 0.08;
      // Parallax offset
      earthRef.current.rotation.x = THREE.MathUtils.lerp(earthRef.current.rotation.x, mousePos.y * 0.4, 0.05);
      earthRef.current.rotation.z = THREE.MathUtils.lerp(earthRef.current.rotation.z, mousePos.x * 0.4, 0.05);
    }

    if (particlesRef.current) {
      // Rotating particles representing flow vectors
      particlesRef.current.rotation.y = -time * 0.05;
      particlesRef.current.rotation.x = time * 0.02;
    }

    if (ringRef.current) {
      // Rotate data stream rings
      ringRef.current.rotation.z = time * 0.15;
    }
  });

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 3, 5]} intensity={1.5} color="#00BCD4" />
      <directionalLight position={[-5, -3, -5]} intensity={0.8} color="#2E7D32" />
      
      {/* Background star field */}
      <Stars radius={100} depth={50} count={2000} factor={4} saturation={0.5} fade speed={1} />

      <group ref={earthRef}>
        {/* Core Sphere - glowing translucent base */}
        <mesh>
          <sphereGeometry args={[2.0, 32, 32]} />
          <meshPhongMaterial
            color="#1b3f27"
            emissive="#0c1f13"
            specular="#00BCD4"
            shininess={30}
            transparent
            opacity={0.85}
          />
        </mesh>

        {/* Outer Grid Wireframe - Technical Resource Matrix look */}
        <mesh>
          <sphereGeometry args={[2.02, 24, 24]} />
          <meshBasicMaterial
            color="#2E7D32"
            wireframe
            transparent
            opacity={0.35}
          />
        </mesh>

        {/* Lat/Long Latitude Rings representing resource distribution path overlays */}
        <mesh ref={ringRef} rotation={[Math.PI / 3, 0, 0]}>
          <ringGeometry args={[2.2, 2.22, 64]} />
          <meshBasicMaterial
            color="#00BCD4"
            side={THREE.DoubleSide}
            transparent
            opacity={0.6}
          />
        </mesh>

        {/* AI Particle System - orbiting resource flow nodes */}
        <points ref={particlesRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[
                new Float32Array(
                  Array.from({ length: 450 }, () => [
                    (Math.random() - 0.5) * 5.5,
                    (Math.random() - 0.5) * 5.5,
                    (Math.random() - 0.5) * 5.5
                  ]).flat()
                ),
                3
              ]}
            />
          </bufferGeometry>
          <pointsMaterial
            color="#00BCD4"
            size={0.06}
            sizeAttenuation
            transparent
            opacity={0.7}
          />
        </points>
      </group>
    </>
  );
};

export const HeroCanvas: React.FC = () => {
  const mousePos = useRef({ x: 0, y: 0 });

  // Handle pointer tracking for parallax controls
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = {
        x: (e.clientX / window.innerWidth) - 0.5,
        y: (e.clientY / window.innerHeight) - 0.5
      };
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 z-0 h-full w-full pointer-events-none md:pointer-events-auto">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 60 }}
        style={{ height: '100%', width: '100%' }}
      >
        <SceneContent mousePos={mousePos.current} />
        <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 1.8} minPolarAngle={Math.PI / 2.2} />
      </Canvas>
    </div>
  );
};
export default HeroCanvas;
