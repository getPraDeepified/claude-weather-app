import { seeded, GPU_STYLE } from '../../utils/math'
import Raindrops from './Raindrops'

export default function Storm() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <Raindrops />
      {/* Lightning flashes */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          ...GPU_STYLE,
          background: 'rgba(255,255,255,0.06)',
          animation: 'lightning 6s 2s linear infinite',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          ...GPU_STYLE,
          background: 'rgba(160,140,200,0.05)',
          animation: 'lightning 8s 5s linear infinite',
        }}
      />
      {/* Dark cloud shapes */}
      {Array.from({ length: 4 }, (_, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            ...GPU_STYLE,
            top: `${seeded(i, 25)}%`,
            width: 250 + seeded(i + 20, 200),
            height: 60 + seeded(i + 30, 40),
            background:
              'radial-gradient(ellipse, rgba(20,15,30,0.3) 0%, rgba(20,15,30,0.06) 60%, transparent 100%)',
            animation: `cloudDrift ${30 + i * 6}s ${-i * 5}s linear infinite`,
          }}
        />
      ))}
    </div>
  )
}
