import { useMemo, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"

const NODE_COUNT = 42
const LINK_DISTANCE = 2.1

/** Deterministic pseudo-random generator so the field looks the same every load. */
function mulberry32(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function generateField() {
  const rand = mulberry32(7)
  const nodes: THREE.Vector3[] = []

  for (let i = 0; i < NODE_COUNT; i++) {
    // Loosely shaped like an ascending "V" / vector swoosh rather than a plain sphere.
    const t = i / NODE_COUNT
    const arm = i % 2 === 0 ? -1 : 1
    const spread = 1.4 + rand() * 2.4
    const x = arm * spread * (0.3 + t) + (rand() - 0.5) * 1.2
    const y = -2.2 + t * 4.6 + (rand() - 0.5) * 1.4
    const z = (rand() - 0.5) * 2.6
    nodes.push(new THREE.Vector3(x, y, z))
  }

  const linkPositions: number[] = []
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      if (nodes[i].distanceTo(nodes[j]) < LINK_DISTANCE) {
        linkPositions.push(nodes[i].x, nodes[i].y, nodes[i].z, nodes[j].x, nodes[j].y, nodes[j].z)
      }
    }
  }

  return { nodes, linkPositions: new Float32Array(linkPositions) }
}

function NetworkField({ interactive }: { interactive: boolean }) {
  const group = useRef<THREE.Group>(null)
  const { nodes, linkPositions } = useMemo(generateField, [])

  useFrame((state, delta) => {
    if (!group.current) return
    if (!interactive) return

    group.current.rotation.y += delta * 0.09
    const targetX = state.pointer.y * 0.25
    const targetZ = -state.pointer.x * 0.2
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, targetX, 0.04)
    group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, targetZ, 0.04)
  })

  return (
    <group ref={group} rotation={[0.1, 0.5, 0]}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linkPositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#33C7FF" transparent opacity={0.35} />
      </lineSegments>

      {nodes.map((position, i) => (
        <mesh key={i} position={position}>
          <sphereGeometry args={[i % 5 === 0 ? 0.09 : 0.05, 12, 12]} />
          <meshBasicMaterial color={i % 5 === 0 ? "#CBFF4D" : "#33C7FF"} />
        </mesh>
      ))}
    </group>
  )
}

export default function HeroScene({ interactive = true }: { interactive?: boolean }) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 8], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
    >
      <NetworkField interactive={interactive} />
    </Canvas>
  )
}
