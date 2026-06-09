import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import type { Group } from 'three'

function FloatingParticles() {
  const groupRef = useRef<Group>(null)

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.05
      groupRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.1) * 0.1
    }
  })

  const particles = Array.from({ length: 40 }, (_, i) => ({
    position: [
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 12,
      (Math.random() - 0.5) * 10 - 5,
    ] as [number, number, number],
    scale: 0.02 + Math.random() * 0.04,
    color: i % 3 === 0 ? '#fbbf24' : i % 3 === 1 ? '#60a5fa' : '#f59e0b',
  }))

  return (
    <group ref={groupRef}>
      {particles.map((p, i) => (
        <mesh key={i} position={p.position} scale={p.scale}>
          <sphereGeometry args={[1, 8, 8]} />
          <meshBasicMaterial color={p.color} transparent opacity={0.6} />
        </mesh>
      ))}
    </group>
  )
}

interface SceneBackgroundProps {
  className?: string
  opacity?: number
}

export default function SceneBackground({ className = '', opacity = 0.4 }: SceneBackgroundProps) {
  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`} style={{ opacity }}>
      <Suspense fallback={null}>
        <Canvas camera={{ position: [0, 0, 8], fov: 60 }} gl={{ alpha: true, antialias: true }}>
          <Stars radius={50} depth={30} count={2000} factor={3} saturation={0.2} fade speed={0.5} />
          <FloatingParticles />
          <ambientLight intensity={0.2} />
        </Canvas>
      </Suspense>
    </div>
  )
}
