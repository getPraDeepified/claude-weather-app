import { seeded, GPU_STYLE } from '../../utils/math'

export default function SunRays() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Sun orb — crisp warm glow */}
      <div
        className="absolute rounded-full"
        style={{
          ...GPU_STYLE,
          width: 160,
          height: 160,
          top: '6%',
          right: '8%',
          background:
            'radial-gradient(circle, rgba(255,255,220,0.8) 0%, rgba(255,220,100,0.4) 40%, rgba(255,180,60,0.08) 70%, transparent 100%)',
          animation: 'sunPulse 5s ease-in-out infinite',
        }}
      />
      {/* Broad warm halo */}
      <div
        className="absolute rounded-full"
        style={{
          ...GPU_STYLE,
          width: 350,
          height: 350,
          top: '-4%',
          right: '0%',
          background:
            'radial-gradient(circle, rgba(255,230,140,0.15) 0%, rgba(255,200,80,0.04) 50%, transparent 70%)',
          animation: 'sunPulse 7s ease-in-out infinite alternate',
        }}
      />
      {/* Soft light rays */}
      {[0, 60, 120, 180, 240, 300].map((angle, i) => (
        <div
          key={angle}
          className="absolute origin-bottom"
          style={{
            ...GPU_STYLE,
            width: 1.5,
            height: 180,
            top: '8%',
            right: 'calc(8% + 79px)',
            background: 'linear-gradient(to top, rgba(255,255,200,0.2), transparent)',
            transform: `translateZ(0) rotate(${angle}deg)`,
            animation: `rayPulse 4s ${i * 0.4}s ease-in-out infinite alternate`,
          }}
        />
      ))}
      {/* Floating warm particles */}
      {Array.from({ length: 10 }, (_, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            ...GPU_STYLE,
            width: 2 + seeded(i, 3),
            height: 2 + seeded(i, 3),
            left: `${25 + seeded(i, 50)}%`,
            top: `${8 + seeded(i + 5, 35)}%`,
            background: 'rgba(255,255,210,0.35)',
            animation: `float ${5 + seeded(i + 10, 3000) / 1000}s ${seeded(i, 2000) / 1000}s ease-in-out infinite alternate`,
          }}
        />
      ))}
    </div>
  )
}
