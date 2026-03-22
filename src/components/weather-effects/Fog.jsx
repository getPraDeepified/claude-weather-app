import { seeded, GPU_STYLE } from '../../utils/math'

export default function Fog() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {Array.from({ length: 5 }, (_, i) => (
        <div
          key={i}
          className="absolute w-full"
          style={{
            ...GPU_STYLE,
            top: `${15 + i * 16}%`,
            height: 60 + seeded(i, 40),
            background: `linear-gradient(90deg, transparent 5%, rgba(255,255,255,${0.06 + i * 0.02}) 30%, rgba(255,255,255,${0.08 + i * 0.02}) 50%, rgba(255,255,255,${0.06 + i * 0.02}) 70%, transparent 95%)`,
            animation: `fogDrift ${18 + i * 5}s ${-i * 3}s ease-in-out infinite alternate`,
          }}
        />
      ))}
    </div>
  )
}
