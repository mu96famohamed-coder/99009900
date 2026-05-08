'use client'

import { useRef, useEffect, useState } from 'react'

const LOGOS = [
  { src: '/assets/logos/dubai_courts.png', alt: 'Dubai Courts - محاكم دبي' },
  { src: '/assets/logos/dld.png',          alt: 'Dubai Land Department - دائرة الأراضي والأملاك' },
  { src: '/assets/logos/rta.png',          alt: 'Roads and Transport Authority RTA' },
  { src: '/assets/logos/mofa.png',         alt: 'UAE Ministry of Foreign Affairs - وزارة الخارجية' },
  { src: '/assets/logos/mohre.png',        alt: 'Ministry of Human Resources and Emiratisation' },
  { src: '/assets/logos/moj.png',          alt: 'UAE Ministry of Justice - وزارة العدل' },
  { src: '/assets/logos/rdc.png',          alt: 'Rental Disputes Center Dubai - مركز فض المنازعات الإيجارية' },
]

const WHITE_LOGOS = LOGOS.map(l => ({
  ...l,
  src: l.src.replace('/assets/logos/', '/assets/logos/white/'),
}))

interface Props {
  /** 'light' = white bg with color logos, 'dark' = transparent bg with white logos */
  variant?: 'light' | 'dark'
  /** Logo height in px */
  logoHeight?: number
  /** Gap between logos in px */
  gap?: number
  /** Animation speed — higher = faster */
  speed?: number
  /** Title text */
  title?: string
  /** Show the title line */
  showTitle?: boolean
}

export default function AcceptedByMarquee({
  variant = 'light',
  logoHeight = 56,
  gap = 14,
  speed = 50,
  title = 'Accepted by All UAE Government Entities',
  showTitle = true,
}: Props) {
  const [isPaused, setIsPaused] = useState(false)
  const [trackWidth, setTrackWidth] = useState(0)
  const trackRef = useRef<HTMLDivElement>(null)

  const logos = variant === 'dark' ? WHITE_LOGOS : LOGOS
  const doubled = [...logos, ...logos]

  const isDark = variant === 'dark'
  const bgColor = isDark ? 'transparent' : '#FFFFFF'
  const fadeColor = isDark ? '#0B1121' : '#FFFFFF'
  const titleColor = isDark ? '#C9A84C' : '#222222'

  useEffect(() => {
    if (trackRef.current) {
      const children = trackRef.current.children
      const half = children.length / 2
      let w = 0
      for (let i = 0; i < half; i++) {
        w += (children[i] as HTMLElement).offsetWidth
      }
      w += half * gap
      setTrackWidth(w)
    }
  }, [gap])

  const duration = trackWidth > 0 ? trackWidth / speed : 20

  return (
    <div style={{ width: '100%', overflow: 'hidden', background: bgColor, padding: showTitle ? '28px 0' : '16px 0', position: 'relative' }}>
      {showTitle && (
        <div style={{ textAlign: 'center', marginBottom: '16px' }}>
          <p style={{
            margin: 0,
            fontSize: '10px',
            fontWeight: 700,
            letterSpacing: '3px',
            textTransform: 'uppercase' as const,
            color: titleColor,
          }}>
            {title}
          </p>
        </div>
      )}

      <div
        style={{ position: 'relative', width: '100%', overflow: 'hidden' }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Fade edges */}
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0, width: '60px', zIndex: 2,
          background: `linear-gradient(to right, ${fadeColor}, transparent)`,
          pointerEvents: 'none' as const,
        }} />
        <div style={{
          position: 'absolute', right: 0, top: 0, bottom: 0, width: '60px', zIndex: 2,
          background: `linear-gradient(to left, ${fadeColor}, transparent)`,
          pointerEvents: 'none' as const,
        }} />

        {/* Scrolling track */}
        <div
          ref={trackRef}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: `${gap}px`,
            width: 'max-content',
            animation: `marqueeScroll ${duration}s linear infinite`,
            animationPlayState: isPaused ? 'paused' : 'running',
          }}
        >
          {doubled.map((logo, i) => (
            <img
              key={`${logo.alt}-${i}`}
              src={logo.src}
              alt={logo.alt}
              title={logo.alt}
              style={{
                height: `${logoHeight}px`,
                minWidth: '120px',
                width: 'auto',
                objectFit: 'contain' as const,
                flexShrink: 0,
                opacity: isDark ? 0.75 : 0.85,
                transition: 'opacity 0.3s',
              }}
              onMouseEnter={(e) => { (e.target as HTMLImageElement).style.opacity = '1' }}
              onMouseLeave={(e) => { (e.target as HTMLImageElement).style.opacity = isDark ? '0.75' : '0.85' }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marqueeScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  )
}
