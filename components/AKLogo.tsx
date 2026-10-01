'use client'

/**
 * Site logo — the neon "AK" emblem.
 * Used in the header (Nav) and the footer, so both brand marks stay in sync.
 * The PNG already carries an alpha channel, so it drops straight onto the dark UI.
 */
export default function AKLogo({ size = 'md', showText = false }: { size?: 'sm' | 'md' | 'lg'; showText?: boolean }) {
  const sizes = {
    sm: { mark: 36, divider: 26, name: 'text-sm', sub: 'text-[9px]' },
    md: { mark: 46, divider: 32, name: 'text-[16px]', sub: 'text-[10px]' },
    lg: { mark: 56, divider: 38, name: 'text-[17px]', sub: 'text-[11px]' },
  }
  const s = sizes[size]

  return (
    <div className="flex items-center gap-0">
      {/* Neon AK emblem */}
      <span
        className="relative inline-flex shrink-0 items-center justify-center"
        style={{ width: s.mark, height: s.mark }}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-[8%] rounded-full bg-[#FF6B00]/25 blur-md"
        />
        <img
          src="/logos/ak-emblem.png"
          alt=""
          aria-hidden="true"
          width={s.mark}
          height={s.mark}
          draggable={false}
          className="relative h-full w-full select-none object-contain drop-shadow-[0_0_10px_rgba(255,107,0,0.45)]"
        />
      </span>

      {showText && (
        <>
          {/* Vertical divider — ember → cyan, matching the wordmark palette */}
          <div
            className="mx-3.5 hidden w-px sm:block lg:hidden xl:block"
            style={{
              height: s.divider,
              background:
                'linear-gradient(180deg, transparent, rgba(255,107,0,0.6), rgba(232,121,249,0.45), rgba(34,211,238,0.35), transparent)',
            }}
          />

          {/* Name (flowing neon gradient + travelling sheen) + animated role.
              Hidden in the 1024–1279 band: the full nav row + Download CV need
              that room, and the emblem alone still reads as the brand. */}
          <div className="hidden flex-col justify-center gap-0.5 sm:flex lg:hidden xl:flex">
            <span
              data-text="Ahetesham Khan"
              className={`brand-name ${s.name} whitespace-nowrap font-display font-semibold leading-tight tracking-wide`}
            >
              Ahetesham Khan
            </span>
            <span className={`${s.sub} flex items-center gap-1.5 whitespace-nowrap leading-tight`}>
              <span className="brand-role-a">AI Engineer</span>
              <span className="brand-sep" aria-hidden>
                ·
              </span>
              <span className="brand-role-b">Data Scientist</span>
              <span className="brand-dots" aria-hidden>
                <i />
                <i />
                <i />
              </span>
            </span>
          </div>
        </>
      )}
    </div>
  )
}
