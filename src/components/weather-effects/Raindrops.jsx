import { useMemo } from 'react'
import { seeded, GPU_STYLE } from '../../utils/math'

export default function Raindrops() {
  const drops = useMemo(
    () =>
      Array.from({ length: 40 }, (_, i) => ({
        id: i,
        left: `${seeded(i, 100)}%`,
        delay: `${seeded(i, 3000) / 1000}s`,
        duration: `${0.4 + seeded(i + 50, 400) / 1000}s`,
        opacity: 0.3 + seeded(i + 20, 50) / 100,
        width: i % 5 === 0 ? 2 : 1,
        height: 15 + seeded(i + 30, 20),
      })),
    [],
  )

  return (
    <div className="absolute inset-0 overflow-hidden">
      {drops.map((d) => (
        <div
          key={d.id}
          className="absolute rounded-full bg-blue-200"
          style={{
            ...GPU_STYLE,
            left: d.left,
            top: '-5%',
            width: d.width,
            height: d.height,
            opacity: d.opacity,
            animation: `rainfall ${d.duration} ${d.delay} linear infinite`,
          }}
        />
      ))}
    </div>
  )
}
