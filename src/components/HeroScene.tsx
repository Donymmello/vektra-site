import { useEffect, useRef } from "react"

// Plain Canvas2D + requestAnimationFrame, no 3D library. The previous version
// used three.js + @react-three/fiber for this, which alone added ~230KB
// (gzipped) to the download, just for a slowly-rotating point field with a
// bit of mouse parallax, well within reach of hand-rolled trig. Same look,
// a fraction of the bytes and, for prefers-reduced-motion visitors, an
// actual idle canvas instead of a WebGL loop quietly still rendering every
// frame behind a frozen rotation.

const NODE_COUNT = 42
const LINK_DISTANCE = 2.1
const CAMERA_Z = 8
const MAX_DPR = 1.75

type Node = { x: number; y: number; z: number; accent: boolean }

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

function generateField(): { nodes: Node[]; links: [number, number][] } {
  const rand = mulberry32(7)
  const nodes: Node[] = []

  for (let i = 0; i < NODE_COUNT; i++) {
    // Loosely shaped like an ascending "V" / vector swoosh rather than a plain sphere.
    const t = i / NODE_COUNT
    const arm = i % 2 === 0 ? -1 : 1
    const spread = 1.4 + rand() * 2.4
    const x = arm * spread * (0.3 + t) + (rand() - 0.5) * 1.2
    const y = -2.2 + t * 4.6 + (rand() - 0.5) * 1.4
    const z = (rand() - 0.5) * 2.6
    nodes.push({ x, y, z, accent: i % 5 === 0 })
  }

  const links: [number, number][] = []
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].x - nodes[j].x
      const dy = nodes[i].y - nodes[j].y
      const dz = nodes[i].z - nodes[j].z
      if (Math.sqrt(dx * dx + dy * dy + dz * dz) < LINK_DISTANCE) links.push([i, j])
    }
  }

  return { nodes, links }
}

/** Rotate a point around the X axis then the Y axis (radians). */
function rotate(x: number, y: number, z: number, rx: number, ry: number) {
  const cosY = Math.cos(ry)
  const sinY = Math.sin(ry)
  const x1 = x * cosY + z * sinY
  const z1 = -x * sinY + z * cosY

  const cosX = Math.cos(rx)
  const sinX = Math.sin(rx)
  const y1 = y * cosX - z1 * sinX
  const z2 = y * sinX + z1 * cosX

  return { x: x1, y: y1, z: z2 }
}

export default function HeroScene({ interactive = true }: { interactive?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return

    const { nodes, links } = generateField()
    let width = 0
    let height = 0
    let rotX = 0.1
    let rotY = 0.5
    let pointerY = 0
    let raf = 0

    function resize() {
      const rect = canvas!.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR)
      width = rect.width
      height = rect.height
      canvas!.width = width * dpr
      canvas!.height = height * dpr
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    function onPointerMove(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect()
      pointerY = (((e.clientY - rect.top) / rect.height) * 2 - 1) * -1
    }

    function draw() {
      ctx!.clearRect(0, 0, width, height)

      const cx = width / 2
      const cy = height / 2
      const scale = Math.min(width, height) * 0.075

      const projected = nodes.map((n) => {
        const r = rotate(n.x, n.y, n.z, rotX, rotY)
        const depth = CAMERA_Z + r.z
        const perspective = CAMERA_Z / depth
        return {
          x: cx + r.x * scale * perspective,
          y: cy - r.y * scale * perspective,
          perspective,
          accent: n.accent,
        }
      })

      ctx!.lineWidth = 1
      ctx!.strokeStyle = "rgba(51, 199, 255, 0.22)"
      ctx!.beginPath()
      for (const [a, b] of links) {
        ctx!.moveTo(projected[a].x, projected[a].y)
        ctx!.lineTo(projected[b].x, projected[b].y)
      }
      ctx!.stroke()

      for (const p of projected) {
        const radius = Math.max((p.accent ? 4.5 : 2.6) * p.perspective, 0.5)
        ctx!.beginPath()
        // Lime is gone from the palette: the field now runs on the single
        // accent, with the highlight nodes picked out in near-white instead.
        ctx!.fillStyle = p.accent ? "#F8FAFC" : "#33C7FF"
        ctx!.arc(p.x, p.y, radius, 0, Math.PI * 2)
        ctx!.fill()
      }
    }

    resize()

    const resizeObserver = new ResizeObserver(() => {
      resize()
      if (!interactive) draw()
    })
    resizeObserver.observe(canvas)

    if (!interactive) {
      // Static field: draw once, no animation loop at all (a real idle
      // canvas for prefers-reduced-motion, not just a frozen rotation).
      draw()
      return () => resizeObserver.disconnect()
    }

    window.addEventListener("pointermove", onPointerMove)

    function frame() {
      rotY += 0.0009
      rotX += (pointerY * 0.25 - rotX) * 0.04
      draw()
      raf = requestAnimationFrame(frame)
    }

    // The hero is one screen of a long page: without this the loop kept
    // running (and every pointermove kept feeding it) for the whole visit,
    // burning CPU and battery on a canvas nobody could see.
    const visibility = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (!raf) raf = requestAnimationFrame(frame)
      } else if (raf) {
        cancelAnimationFrame(raf)
        raf = 0
      }
    })
    visibility.observe(canvas)

    return () => {
      cancelAnimationFrame(raf)
      visibility.disconnect()
      resizeObserver.disconnect()
      window.removeEventListener("pointermove", onPointerMove)
    }
  }, [interactive])

  return <canvas ref={canvasRef} className="h-full w-full" aria-hidden="true" />
}
