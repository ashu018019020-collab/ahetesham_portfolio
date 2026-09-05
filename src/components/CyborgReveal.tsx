'use client'

import { useRef, useState, useCallback, useEffect } from 'react';

export default function CyborgReveal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [cardWidth, setCardWidth] = useState(900);

  const handleMove = useCallback((ex: number, ey: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const xPct = ((ex - rect.left) / rect.width) * 100;
    const yPct = ((ey - rect.top) / rect.height) * 100;
    setMousePos({ x: xPct, y: yPct });
    // 3D tilt: max ±8deg
    const tiltX = ((yPct - 50) / 50) * -8;
    const tiltY = ((xPct - 50) / 50) * 8;
    setTilt({ x: tiltX, y: tiltY });
    setCardWidth(rect.width);
  }, []);

  const handleLeave = useCallback(() => {
    setIsHovering(false);
    setTilt({ x: 0, y: 0 });
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      setCardWidth(containerRef.current.getBoundingClientRect().width);
    }
  }, []);

  const maskRadius = Math.min(450, cardWidth * 0.55);
  const glowSize = Math.min(500, cardWidth * 0.55);

  return (
    <div
      ref={containerRef}
      onMouseMove={(e) => handleMove(e.clientX, e.clientY)}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={handleLeave}
      onTouchStart={(e) => {
        const t = e.touches[0];
        handleMove(t.clientX, t.clientY);
        setIsHovering(true);
      }}
      onTouchMove={(e) => {
        const t = e.touches[0];
        handleMove(t.clientX, t.clientY);
      }}
      onTouchEnd={handleLeave}
      className="relative w-full max-w-5xl md:max-w-6xl aspect-[4/3] sm:aspect-[16/9] md:aspect-[2/1] overflow-hidden rounded-2xl border border-[#FF4500]/20 cursor-crosshair group touch-manipulation glow-animate"
      style={{
        perspective: '1000px',
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${isHovering ? 1.02 : 1})`,
        transition: isHovering ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',          boxShadow: isHovering
          ? '0 0 50px rgba(255,69,0,0.15), 0 0 100px rgba(255,140,0,0.08), 0 20px 60px rgba(0,0,0,0.4)'
          : '0 0 40px rgba(255,69,0,0.06), 0 0 80px rgba(255,140,0,0.03)',
      }}
    >
      {/* Background - Real body (revealed on hover) */}
      <img
        src="/portfolio/real-body.jpg"
        alt="Ahetesham Khan - Natural"
        className="absolute inset-0 w-full h-full object-cover object-center z-10"
        draggable={false}
      />

      {/* Foreground - Cyborg (default, masked on hover) */}
      <img
        src="/portfolio/cyborg.jpg"
        alt="Ahetesham Khan - Cybernetic"
        className="absolute inset-0 w-full h-full object-cover object-center z-20 pointer-events-none"
        draggable={false}
        style={{
          WebkitMaskImage: isHovering
            ? "radial-gradient(circle " + maskRadius + "px at " + mousePos.x + "% " + mousePos.y + "%, transparent 0%, transparent 45%, black 100%)"
            : "none",
          maskImage: isHovering
            ? "radial-gradient(circle " + maskRadius + "px at " + mousePos.x + "% " + mousePos.y + "%, transparent 0%, transparent 45%, black 100%)"
            : "none",
          transition: isHovering ? "none" : "opacity 0.6s ease",
        }}
      />

      {/* Glow ring at cursor */}
      <div
        className="absolute z-30 pointer-events-none rounded-full"
        style={{
          left: mousePos.x + "%",
          top: mousePos.y + "%",
          width: glowSize,
          height: glowSize,
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(circle, rgba(255,69,0,0.15) 0%, rgba(255,85,0,0.08) 30%, transparent 70%)",
          opacity: isHovering ? 1 : 0,
          transition: "opacity 0.4s ease",
        }}
      />

      {/* Floating particles inside card */}
      <div className="absolute inset-0 z-45 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: (10 + i * 12) + "%",
              bottom: "-5%",
              animationDuration: (4 + Math.random() * 6) + "s",
              animationDelay: (i * 0.8) + "s",
              opacity: 0.4,
              width: (1 + Math.random() * 2) + "px",
              height: (1 + Math.random() * 2) + "px",
            }}
          />
        ))}
      </div>

      {/* HUD scan line */}
      <div className="absolute inset-0 z-40 pointer-events-none overflow-hidden">
        <div
          className="absolute w-full h-[200%] opacity-10 group-hover:opacity-25 transition-opacity"
          style={{
            background: "linear-gradient(to bottom, transparent 0%, rgba(255,69,0,0.2) 50%, transparent 100%)",
            animation: "cyborgScan 3s linear infinite",
          }}
        />
      </div>

      {/* Corner accents - top left */}
      <div className="absolute top-3 left-3 z-40 pointer-events-none">
        <div className="w-6 h-6 border-t-2 border-l-2 border-[#FF4500]/40 rounded-tl-sm group-hover:border-[#008080]/60 transition-colors duration-700" />
      </div>
      {/* Corner accents - top right */}
      <div className="absolute top-3 right-3 z-40 pointer-events-none">
        <div className="w-6 h-6 border-t-2 border-r-2 border-[#FF4500]/40 rounded-tr-sm group-hover:border-[#008080]/60 transition-colors duration-700" />
      </div>
      {/* Corner accents - bottom left */}
      <div className="absolute bottom-3 left-3 z-40 pointer-events-none">
        <div className="w-6 h-6 border-b-2 border-l-2 border-[#FF4500]/40 rounded-bl-sm group-hover:border-[#008080]/60 transition-colors duration-700" />
      </div>
      {/* Corner accents - bottom right */}
      <div className="absolute bottom-3 right-3 z-40 pointer-events-none">
        <div className="w-6 h-6 border-b-2 border-r-2 border-[#FF4500]/40 rounded-br-sm group-hover:border-[#008080]/60 transition-colors duration-700" />
      </div>

      {/* Top-left HUD */}
      <div className="absolute top-5 left-5 sm:top-7 sm:left-7 z-40 pointer-events-none flex flex-col gap-1.5 text-[10px] sm:text-[11px] font-mono text-[#FF8C00]/70 group-hover:text-[#008080]/80 transition-colors duration-700">
        <span className="tracking-widest">SUBJECT_ID: AK-2025</span>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#FF8C00]/60 group-hover:bg-[#008080] transition-colors animate-pulse" />
          <span className="opacity-70 tracking-wider">STATUS: {isHovering ? "NEURAL LINK ACTIVE" : "ASSIMILATED"}</span>
        </div>
      </div>

      {/* Bottom-right HUD */}
      <div className="absolute bottom-5 right-5 sm:bottom-7 sm:right-7 z-40 pointer-events-none text-right flex flex-col gap-1.5 text-[10px] sm:text-[11px] font-mono text-[#FF8C00]/70">
        <span className="animate-pulse tracking-widest">HOVER TO REVEAL</span>
        <div className="flex justify-end gap-1 mt-1">
          <div className="w-10 h-[2px] bg-[#FF8C00]/50 group-hover:bg-[#008080]/70 transition-colors duration-500" />
          <div className="w-6 h-[2px] bg-[#FF8C00]/50 group-hover:bg-[#008080]/70 transition-colors duration-500 delay-100" />
          <div className="w-3 h-[2px] bg-[#FF8C00]/50 group-hover:bg-[#008080]/70 transition-colors duration-500 delay-200" />
        </div>
      </div>

      {/* Vignette overlay */}
      <div className="absolute inset-0 z-30 pointer-events-none" style={{
        background: "radial-gradient(ellipse at center, transparent 30%, rgba(26,7,6,0.6) 100%)",
      }} />

      {/* Edge glow on hover */}
      <div
        className="absolute inset-0 z-35 pointer-events-none rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          boxShadow: "inset 0 0 30px rgba(255,69,0,0.08), inset 0 0 60px rgba(0,128,128,0.03)",
        }}
      />
    </div>
  );
}
