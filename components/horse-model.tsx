"use client"

import { Suspense, useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Environment, OrbitControls, PerspectiveCamera, useGLTF, Html, Text } from "@react-three/drei"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"

interface HorseModelProps {
  horseName: string
}

function Model() {
  const modelRef = useRef(null)
  const [hovered, setHovered] = useState(false)
  // Using the duck as a placeholder since we don't have a horse model
  const { scene } = useGLTF("/assets/3d/duck.glb")

  useFrame((state) => {
    if (modelRef.current) {
      modelRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.2

      // Add subtle floating animation
      modelRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1
    }
  })

  return (
    <group ref={modelRef} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
      <primitive object={scene} scale={2} position={[0, -1, 0]} />

      {/* Highlight effect when hovered */}
      {hovered && (
        <mesh position={[0, -1, 0]} scale={[2.2, 2.2, 2.2]}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshBasicMaterial color="#0BDA91" transparent opacity={0.1} />
        </mesh>
      )}

      <Html position={[0, 1.5, 0]} center>
        <div className="bg-primary/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-primary/20 text-sm">
          <div className="flex items-center gap-2">
            <span className="font-medium">Height: 16.2 hands</span>
            <span>|</span>
            <span className="font-medium">Weight: 1,200 lbs</span>
          </div>
        </div>
      </Html>

      {/* 3D text for the horse name */}
      <Text position={[0, -2, 0]} fontSize={0.5} color="#0BDA91" anchorX="center" anchorY="middle">
        PREMIUM BLOODLINE
      </Text>
    </group>
  )
}

export function HorseModel({ horseName }: HorseModelProps) {
  return (
    <div className="relative w-full h-full min-h-[300px]">
      <div className="absolute top-4 left-4 z-10">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Badge className="bg-primary hover:bg-primary/90">Interactive 3D Model</Badge>
        </motion.div>
      </div>
      <div className="absolute bottom-4 right-4 z-10 text-xs text-muted-foreground bg-background/50 backdrop-blur-sm px-2 py-1 rounded-full">
        Click and drag to rotate
      </div>
      <Canvas className="bg-gradient-to-b from-background/50 to-primary/5">
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        <Suspense fallback={null}>
          <Model />
          <Environment preset="studio" />
        </Suspense>
        <OrbitControls
          enableZoom={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 2}
          minAzimuthAngle={-Math.PI / 4}
          maxAzimuthAngle={Math.PI / 4}
        />
      </Canvas>
    </div>
  )
}
