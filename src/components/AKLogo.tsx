'use client'

export default function AKLogo({ size = 'md', showText = false }: { size?: 'sm' | 'md' | 'lg'; showText?: boolean }) {
  const sizes = {
    sm: { ak: 30, name: 'text-sm', sub: 'text-[9px]' },
    md: { ak: 36, name: 'text-[15px]', sub: 'text-[10px]' },
    lg: { ak: 42, name: 'text-base', sub: 'text-xs' },
  }
  const s = sizes[size]

  return (
    <div className="flex items-center gap-0">
      {/* AK gradient text — A is bright, K is deeper red */}
      <span
        className="font-display font-bold leading-none select-none"
        style={{
          fontSize: s.ak,
          background: 'linear-gradient(to right, #ff9999 0%, #FF6B00 35%, #FF4500 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        AK
      </span>

      {showText && (
        <>
          {/* Vertical divider */}
          <div className="mx-3.5 h-9 w-px bg-white/20" />

          {/* Name + subtitle */}
          <div className="hidden sm:flex flex-col justify-center">
            <span className={`${s.name} font-semibold text-heading leading-tight font-display tracking-wide`}>
              Ahetesham Khan
            </span>
            <span className={`${s.sub} text-body-light leading-tight flex items-center gap-1.5`}>
              AI Engineer &amp; Data Scientist
              <span className="inline-block h-[5px] w-[5px] rounded-full bg-primary shadow-[0_0_6px_rgba(255,69,0,0.6)]" />
            </span>
          </div>
        </>
      )}
    </div>
  )
}
