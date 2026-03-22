import { useMemo } from 'react'
import { seeded, GPU_STYLE } from '../../utils/math'

export default function Clouds() {
  const clouds = useMemo(
    () =>
      Array.from({ length: 6 }, (_, i) => ({
        id: i,
        top: `${3 + seeded(i, 40)}%`,
        width: 200 + seeded(i + 20, 250),
        height: 50 + seeded(i + 30, 50),
        opacity: 0.08 + seeded(i + 10, 15) / 100,
        duration: `${30 + seeded(i + 5, 40)}s`,
        delay: `${-seeded(i, 25)}s`,
      })),
    [],
  )

  return (
    <div className="absolute inset-0 overflow-hidden">
      {clouds.map((c) => (
        <div
          key={c.id}
          className="absolute rounded-full"
          style={{
            ...GPU_STYLE,
            top: c.top,
            width: c.width,
            height: c.height,
            background:
              'radial-gradient(ellipse, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.08) 50%, transparent 80%)',
            opacity: c.opacity,
            animation: `cloudDrift ${c.duration} ${c.delay} linear infinite`,
          }}
        />
      ))}
    </div>
  )
}
