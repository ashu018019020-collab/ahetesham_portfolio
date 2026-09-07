'use client'

import { useEffect, useState, useMemo } from 'react'

interface Node {
  x: number
  y: number
  r: number
  delay: number
}

interface Edge {
  x1: number
  y1: number
  x2: number
  y2: number
  length: number
  delay: number
}

function seededRandom(seed: number) {
  let s = seed
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}

export default function NeuralGraph({
  className = '',
  count = 18,
  seed = 42,
}: {
  className?: string
  count?: number
  seed?: number
}) {
  const [mounted, setMounted] = useState(false)
  const [prefersReduced, setPrefersReduced] = useState(false)

  useEffect(() => {
    setPrefersReduced(
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    )
    setMounted(true)
  }, [])

  const { nodes, edges } = useMemo(() => {
    const rand = seededRandom(seed)
    const w = 800
    const h = 400
    const generatedNodes: Node[] = Array.from({ length: count }, () => ({
      x: rand() * w,
      y: rand() * h,
      r: 2 + rand() * 3,
      delay: rand() * 1.5,
    }))

    const generatedEdges: Edge[] = []
    for (let i = 0; i < generatedNodes.length; i++) {
      for (let j = i + 1; j < generatedNodes.length; j++) {
        const dx = generatedNodes[i].x - generatedNodes[j].x
        const dy = generatedNodes[i].y - generatedNodes[j].y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 180 && rand() > 0.3) {
          generatedEdges.push({
            x1: generatedNodes[i].x,
            y1: generatedNodes[i].y,
            x2: generatedNodes[j].x,
            y2: generatedNodes[j].y,
            length: dist,
            delay: Math.min(generatedNodes[i].delay, generatedNodes[j].delay),
          })
        }
      }
    }

    return { nodes: generatedNodes, edges: generatedEdges }
  }, [count, seed])

  if (!mounted) return null

  return (
    <svg
      viewBox="0 0 800 400"
      className={`pointer-events-none ${className}`}
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="graphGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF4500" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.2" />
        </linearGradient>
      </defs>

      {edges.map((e, i) => (
        <line
          key={`e-${i}`}
          x1={e.x1}
          y1={e.y1}
          x2={e.x2}
          y2={e.y2}
          stroke="url(#graphGrad)"
          strokeWidth="1"
          className="neural-edge"
          style={{
            ['--edge-length' as string]: e.length,
            animationDelay: prefersReduced ? '0s' : `${e.delay}s`,
            animationDuration: prefersReduced ? '0s' : '2s',
          } as React.CSSProperties}
        />
      ))}

      {nodes.map((n, i) => (
        <circle
          key={`n-${i}`}
          cx={n.x}
          cy={n.y}
          r={n.r}
          fill={i % 3 === 0 ? '#FF4500' : i % 3 === 1 ? '#FF8C00' : '#FF6B00'}
          className="neural-node"
          style={{
            animationDelay: prefersReduced ? '0s' : `${n.delay + 0.5}s`,
            animationDuration: prefersReduced ? '0s' : '0.4s',
          }}
        />
      ))}
    </svg>
  )
}
