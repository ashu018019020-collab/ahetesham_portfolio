'use client'

import { useEffect, useRef } from 'react'

export default function FloatingElements() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const scrollRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let time = 0
    let hidden = document.hidden

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const onScroll = () => {
      scrollRef.current = window.scrollY
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    const onVisibility = () => {
      hidden = document.hidden
      if (hidden) cancelAnimationFrame(animId)
      else draw()
    }
    document.addEventListener('visibilitychange', onVisibility)

    // Single particle layer: floating dots + a few rising fire/teal embers.
    const count = Math.max(
      16,
      Math.min(38, Math.floor(window.innerWidth / 26))
    )
    const particles = Array.from({ length: count }, () => {
      const depth = Math.random()
      const isEmber = Math.random() < 0.35 // rises like a fire ember
      return {
        x: Math.random() * canvas.width,
        // Embers start lower so they visibly rise; dots spread everywhere
        y: isEmber
          ? canvas.height * (0.4 + Math.random() * 0.6)
          : Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.1,
        vy: isEmber ? -(Math.random() * 0.22 + 0.06) : (Math.random() - 0.5) * 0.09,
        r: depth > 0.7 ? Math.random() * 1.8 + 0.7 : Math.random() * 1.1 + 0.3,
        a:
          depth > 0.7
            ? Math.random() * 0.22 + 0.08
            : Math.random() * 0.13 + 0.03,
        teal: isEmber && Math.random() < 0.35,
        phase: Math.random() * Math.PI * 2,
        depth,
        isEmber,
      }
    })

    // Connection lines between nearby particles
    const connectDist = 120

    // Soft fire glow spots (large overdraw, so kept few and faint)
    const glows = [
      { x: 0.18, y: 0.3, r: 200, color: [255, 69, 0], a: 0.02 },
      { x: 0.7, y: 0.55, r: 180, color: [255, 107, 0], a: 0.016 },
    ]

    const draw = () => {
      time += 0.016
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const scroll = scrollRef.current

      // Soft gradient glows with slow scroll parallax
      for (const g of glows) {
        const gx =
          g.x * canvas.width + Math.sin(time * 0.3 + g.x * 10) * 18 + scroll * g.a * 6
        const gy =
          g.y * canvas.height + Math.cos(time * 0.25 + g.y * 10) * 12 - scroll * g.a * 8

        const grad = ctx.createRadialGradient(gx, gy, 0, gx, gy, g.r)
        grad.addColorStop(0, `rgba(${g.color[0]}, ${g.color[1]}, ${g.color[2]}, ${g.a})`)
        grad.addColorStop(1, 'transparent')
        ctx.fillStyle = grad
        ctx.fillRect(gx - g.r, gy - g.r, g.r * 2, g.r * 2)
      }

      // Connection lines (cheap: no glow, plain strokes, early bail)
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          if (Math.abs(dx) > connectDist || Math.abs(dy) > connectDist) continue
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < connectDist) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(255, 100, 0, ${0.03 * (1 - dist / connectDist)})`
            ctx.lineWidth = 0.4
            ctx.stroke()
          }
        }
      }

      // Update and draw particles with gentle depth parallax
      for (const p of particles) {
        const parallax = 0.015 + p.depth * 0.04
        p.x += p.vx
        p.y += p.vy

        // Embers wrap to the bottom so they keep rising; dots wrap all sides
        if (p.isEmber && p.y < -20) {
          p.y = canvas.height + 20
          p.x = Math.random() * canvas.width
        } else if (!p.isEmber) {
          if (p.x < -10) p.x = canvas.width + 10
          if (p.x > canvas.width + 10) p.x = -10
          if (p.y < -10) p.y = canvas.height + 10
          if (p.y > canvas.height + 10) p.y = -10
        }

        const drawY = ((p.y + scroll * parallax) % (canvas.height + 20)) - 10
        const pulse = p.a + Math.sin(time * 1.5 + p.phase) * 0.025

        // Soft halo only for the more visible particles (halves draw calls)
        if (p.depth > 0.6) {
          ctx.beginPath()
          ctx.arc(p.x, drawY, p.r * 2.5, 0, Math.PI * 2)
          ctx.fillStyle = p.teal
            ? `rgba(0, 190, 190, ${pulse * 0.1})`
            : `rgba(255, 100, 0, ${pulse * 0.12})`
          ctx.fill()
        }

        // Core
        ctx.beginPath()
        ctx.arc(p.x, drawY, p.r, 0, Math.PI * 2)
        ctx.fillStyle = p.teal
          ? `rgba(0, 205, 205, ${pulse})`
          : p.depth > 0.7
            ? `rgba(255, 120, 20, ${pulse})`
            : `rgba(255, 160, 40, ${pulse})`
        ctx.fill()
      }

      if (!hidden) animId = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    />
  )
}
