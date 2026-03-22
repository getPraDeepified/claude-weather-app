import { useMemo } from 'react'
import { seeded, GPU_STYLE } from '../../utils/math'

export default function Snowflakes() {
  const flakes = useMemo(
    () =>
      Array.from({ length: 30 }, (_, i) => ({
        id: i,
        left: `${seeded(i, 100)}%`,
        delay: `${seeded(i + 10, 5000) / 1000}s`,
        duration: `${3 + seeded(i + 70, 4000) / 1000}s`,
        size: 3 + seeded(i + 20, 8),
        opacity: 0.4 + seeded(i + 40, 50) / 100,
        drift: seeded(i + 60, 60) - 30,
      })),
    [],
  )

  return (
    <div className="absolute inset-0 overflow-hidden">
      {flakes.map((f) => (
        <div
          key={f.id}
          className="absolute rounded-full bg-white"
          style={{
            ...GPU_STYLE,
            left: f.left,
            top: '-3%',
            width: f.size,
            height: f.size,
            opacity: f.opacity,
            filter: 'blur(0.5px)',
            animation: `snowfall ${f.duration} ${f.delay} linear infinite`,
            '--drift': `${f.drift}px`,
          }}
        />
      ))}
    </div>
  )
}
