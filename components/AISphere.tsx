'use client'

import { useEffect, useRef } from 'react'

export default function AISphere({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let t = 0
    const W = 800, H = 800
    canvas.width = W * 2
    canvas.height = H * 2
    ctx.scale(2, 2)

    const cx = W / 2, cy = H / 2
    const R = W * 0.3

    // Mesh: thin lines, subtle
    const LAT = 12, LON = 18

    // Bright dots — only at SOME intersections (sparse)
    const brightDots: { lat: number; lon: number }[] = []
    for (let lat = 1; lat < LAT; lat += 2) {
      for (let lon = 0; lon < LON; lon += 3) {
        brightDots.push({
          lat: (lat / LAT) * Math.PI,
          lon: (lon / LON) * Math.PI * 2,
        })
      }
    }

    // Orbit rings — clean, thin
    const rings = [
      { tx: 0.3, ty: 0, rm: 1.2, sp: 0.003, a: 0.35 },
      { tx: -0.5, ty: 0.2, rm: 1.12, sp: -0.0025, a: 0.28 },
      { tx: 0.1, ty: 0.6, rm: 1.3, sp: 0.004, a: 0.25 },
      { tx: 0.7, ty: -0.1, rm: 1.38, sp: -0.0018, a: 0.18 },
    ]

    // Data labels
    const labels = [
      { text: 'Automation', a: 0.3, d: 1.55, sp: 0.0015 },
      { text: 'Architecture', a: 1.8, d: 1.5, sp: -0.001 },
      { text: 'Neural Net', a: 3.4, d: 1.48, sp: 0.0007 },
      { text: 'Deep Learning', a: 5.0, d: 1.58, sp: -0.0016 },
    ]

    // Project ring
    const projRing = (rr: number, tiltX: number, tiltY: number) => {
      const pts: [number, number][] = []
      for (let i = 0; i <= 100; i++) {
        const a = (i / 100) * Math.PI * 2
        let rx = rr * Math.cos(a), ry = 0, rz = rr * Math.sin(a)
        let c = Math.cos(tiltX), s = Math.sin(tiltX)
        let y2 = ry * c - rz * s, z2 = ry * s + rz * c
        ry = y2; rz = z2
        c = Math.cos(tiltY); s = Math.sin(tiltY)
        let x2 = rx * c + rz * s, z3 = -rx * s + rz * c
        rx = x2; rz = z3
        const sc = 600 / (600 + rz)
        pts.push([cx + rx * sc, cy + ry * sc])
      }
      return pts
    }

    // Project mesh point
    const projPt = (lat: number, lon: number, rr: number, rY: number, rX: number) => {
      let x = rr * Math.sin(lat) * Math.cos(lon + rY)
      let y = rr * Math.sin(lat) * Math.sin(lon + rY)
      let z = rr * Math.cos(lat)
      const c = Math.cos(rX), s = Math.sin(rX)
      const y2 = y * c - z * s, z2 = y * s + z * c
      y = y2; z = z2
      const sc = 600 / (600 + z)
      return { x: cx + x * sc, y: cy + y * sc, z, vis: z > -rr * 0.05 }
    }

    const draw = () => {
      t += 0.016
      ctx.clearRect(0, 0, W, H)

      const rotY = t * 0.18
      const rotX = Math.sin(t * 0.05) * 0.08

      // ═══ Subtle background glow ═══
      const bg = ctx.createRadialGradient(cx, cy, R * 0.3, cx, cy, R * 3)
      bg.addColorStop(0, 'rgba(30, 90, 240, 0.12)')
      bg.addColorStop(0.3, 'rgba(25, 80, 220, 0.05)')
      bg.addColorStop(0.6, 'rgba(20, 70, 200, 0.015)')
      bg.addColorStop(1, 'transparent')
      ctx.fillStyle = bg
      ctx.fillRect(0, 0, W, H)

      // ═══ Base platform — clean, elegant ═══
      const baseY = cy + R * 1.08

      // Platform glow (soft)
      const pGlow = ctx.createRadialGradient(cx, baseY, 0, cx, baseY, R * 1.8)
      pGlow.addColorStop(0, 'rgba(40, 120, 255, 0.18)')
      pGlow.addColorStop(0.3, 'rgba(30, 100, 255, 0.08)')
      pGlow.addColorStop(0.6, 'rgba(20, 80, 220, 0.02)')
      pGlow.addColorStop(1, 'transparent')
      ctx.fillStyle = pGlow
      ctx.fillRect(0, baseY - R * 1.8, W, R * 4)

      // Platform rings — only 2 clean ones
      for (let i = 0; i < 2; i++) {
        const rr = R * (0.8 + i * 0.45)
        ctx.beginPath()
        ctx.ellipse(cx, baseY, rr, rr * 0.08, 0, 0, Math.PI * 2)
        const pa = (0.3 - i * 0.08) + Math.sin(t * 1.2 + i) * 0.04
        ctx.strokeStyle = `rgba(70, 150, 255, ${pa})`
        ctx.lineWidth = 1.2
        ctx.stroke()
      }

      // Platform fill (subtle)
      ctx.beginPath()
      ctx.ellipse(cx, baseY, R * 1.2, R * 0.09, 0, 0, Math.PI * 2)
      const pf = ctx.createRadialGradient(cx, baseY, 0, cx, baseY, R * 1.2)
      pf.addColorStop(0, 'rgba(50, 130, 255, 0.1)')
      pf.addColorStop(0.5, 'rgba(40, 110, 255, 0.03)')
      pf.addColorStop(1, 'transparent')
      ctx.fillStyle = pf
      ctx.fill()

      // Rising light columns — thin, subtle
      for (let i = 0; i < 3; i++) {
        const lx = cx + (i - 1) * R * 0.35
        const lh = R * (0.7 + Math.sin(t * 0.6 + i * 1.5) * 0.2)
        const la = 0.025 + Math.sin(t * 0.8 + i) * 0.01
        const grad = ctx.createLinearGradient(lx, baseY, lx, baseY - lh)
        grad.addColorStop(0, `rgba(70, 150, 255, ${la})`)
        grad.addColorStop(1, 'transparent')
        ctx.fillStyle = grad
        ctx.fillRect(lx - 1, baseY - lh, 2, lh)
      }

      // ═══ WIREFRAME — THIN, SUBTLE ═══
      // Latitude lines
      for (let lat = 1; lat < LAT; lat++) {
        const latA = (lat / LAT) * Math.PI
        ctx.beginPath()
        let has = false
        for (let lon = 0; lon <= 80; lon++) {
          const lonA = (lon / 80) * Math.PI * 2
          const p = projPt(latA, lonA, R, rotY, rotX)
          if (p.vis) {
            if (!has) { ctx.moveTo(p.x, p.y); has = true }
            else ctx.lineTo(p.x, p.y)
          }
        }
        if (has) {
          ctx.strokeStyle = 'rgba(60, 140, 255, 0.12)' // VERY subtle
          ctx.lineWidth = 0.5
          ctx.stroke()
        }
      }

      // Longitude lines
      for (let lon = 0; lon < LON; lon++) {
        const lonA = (lon / LON) * Math.PI * 2
        ctx.beginPath()
        let has = false
        for (let lat = 0; lat <= 50; lat++) {
          const latA = (lat / 50) * Math.PI
          const p = projPt(latA, lonA, R, rotY, rotX)
          if (p.vis) {
            if (!has) { ctx.moveTo(p.x, p.y); has = true }
            else ctx.lineTo(p.x, p.y)
          }
        }
        if (has) {
          ctx.strokeStyle = 'rgba(60, 140, 255, 0.12)'
          ctx.lineWidth = 0.5
          ctx.stroke()
        }
      }

      // ═══ Bright dots at sparse intersections ═══
      for (const dot of brightDots) {
        const p = projPt(dot.lat, dot.lon, R, rotY, rotX)
        if (!p.vis) continue
        const depth = (p.z + R) / (2 * R)
        const a = depth * 0.85
        const sz = 1.2 + depth * 0.8

        // Subtle glow
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, sz * 5)
        g.addColorStop(0, `rgba(80, 160, 255, ${a * 0.15})`)
        g.addColorStop(1, 'transparent')
        ctx.fillStyle = g
        ctx.fillRect(p.x - sz * 5, p.y - sz * 5, sz * 10, sz * 10)

        // Core dot
        ctx.beginPath()
        ctx.arc(p.x, p.y, sz, 0, Math.PI * 2)
        ctx.fillStyle = depth > 0.6
          ? `rgba(200, 235, 255, ${a})`
          : depth > 0.3
            ? `rgba(130, 200, 255, ${a * 0.8})`
            : `rgba(70, 140, 250, ${a * 0.6})`
        ctx.fill()
      }

      // ═══ Center glow (soft) ═══
      const cg = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 0.55)
      cg.addColorStop(0, 'rgba(70, 150, 255, 0.1)')
      cg.addColorStop(0.5, 'rgba(50, 130, 255, 0.03)')
      cg.addColorStop(1, 'transparent')
      ctx.fillStyle = cg
      ctx.fillRect(cx - R, cy - R, R * 2, R * 2)

      // ═══ "AI" text — clean, elegant ═══
      const pulse = 0.9 + Math.sin(t * 1.2) * 0.1
      ctx.save()
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.font = `bold ${R * 0.5}px "Space Grotesk", system-ui, sans-serif`

      // Soft glow
      ctx.shadowColor = 'rgba(70, 150, 255, 0.8)'
      ctx.shadowBlur = 40
      ctx.fillStyle = `rgba(160, 215, 255, ${pulse * 0.4})`
      ctx.fillText('AI', cx, cy)

      // Mid
      ctx.shadowBlur = 20
      ctx.fillStyle = `rgba(210, 235, 255, ${pulse * 0.6})`
      ctx.fillText('AI', cx, cy)

      // Sharp
      ctx.shadowBlur = 0
      const tg = ctx.createLinearGradient(cx - 30, cy - 22, cx + 30, cy + 22)
      tg.addColorStop(0, `rgba(190, 225, 255, ${pulse})`)
      tg.addColorStop(0.3, `rgba(255, 255, 255, ${pulse})`)
      tg.addColorStop(0.7, `rgba(230, 245, 255, ${pulse})`)
      tg.addColorStop(1, `rgba(180, 220, 255, ${pulse})`)
      ctx.fillStyle = tg
      ctx.fillText('AI', cx, cy)
      ctx.restore()

      // ═══ Orbit rings — thin, clean ═══
      for (const ring of rings) {
        const pts = projRing(R * ring.rm, ring.tx + t * ring.sp * 10, ring.ty)
        ctx.beginPath()
        pts.forEach((p, i) => i === 0 ? ctx.moveTo(p[0], p[1]) : ctx.lineTo(p[0], p[1]))
        ctx.closePath()
        const ra = ring.a + Math.sin(t * 1.5) * 0.03
        ctx.strokeStyle = `rgba(70, 155, 255, ${ra})`
        ctx.lineWidth = 1
        ctx.stroke()
        // Soft glow
        ctx.strokeStyle = `rgba(60, 140, 255, ${ra * 0.15})`
        ctx.lineWidth = 4
        ctx.stroke()
      }

      // ═══ Data labels — clean pills ═══
      for (const lb of labels) {
        lb.a += lb.sp
        const lx = cx + Math.cos(lb.a) * R * lb.d
        const ly = cy + Math.sin(lb.a) * R * lb.d * 0.35
        const fade = 0.55 + Math.sin(t * 0.6 + lb.a) * 0.12
        ctx.save()
        ctx.font = '10px "Space Grotesk", system-ui, sans-serif'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        const tw = ctx.measureText(lb.text).width + 14
        ctx.fillStyle = `rgba(15, 30, 65, ${fade * 0.7})`
        ctx.beginPath()
        ctx.roundRect(lx - tw / 2, ly - 8, tw, 16, 4)
        ctx.fill()
        ctx.strokeStyle = `rgba(70, 140, 255, ${fade * 0.3})`
        ctx.lineWidth = 0.5
        ctx.stroke()
        ctx.fillStyle = `rgba(130, 200, 255, ${fade + 0.1})`
        ctx.fillText(lb.text, lx, ly)
        // Connecting line
        const fX = cx + Math.cos(lb.a) * R * 1.05
        const fY = cy + Math.sin(lb.a) * R * 1.05 * 0.35
        ctx.beginPath()
        ctx.moveTo(fX, fY)
        ctx.lineTo(lx - (lx > cx ? tw / 2 : -tw / 2) * 0.7, ly)
        ctx.strokeStyle = `rgba(70, 140, 255, ${fade * 0.12})`
        ctx.lineWidth = 0.4
        ctx.setLineDash([2, 4])
        ctx.stroke()
        ctx.setLineDash([])
        ctx.restore()
      }

      animId = requestAnimationFrame(draw)
    }

    draw()
    return () => cancelAnimationFrame(animId)
  }, [])

  return (
    <div className={`relative ${className}`}>
      <canvas
        ref={canvasRef}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  )
}
