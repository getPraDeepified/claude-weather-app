import { useMemo } from 'react'

// Generate deterministic random-ish values from index
function seeded(i, max) {
  return ((i * 7919 + 104729) % max)
}

function Raindrops() {
  const drops = useMemo(() =>
    Array.from({ length: 80 }, (_, i) => ({
      id: i,
      left: `${seeded(i, 100)}%`,
      delay: `${(seeded(i, 3000)) / 1000}s`,
      duration: `${0.4 + (seeded(i + 50, 400)) / 1000}s`,
      opacity: 0.3 + (seeded(i + 20, 50)) / 100,
      width: i % 5 === 0 ? 2 : 1,
      height: 15 + seeded(i + 30, 20),
    })), [])

  return (
    <div className="absolute inset-0 overflow-hidden">
      {drops.map(d => (
        <div
          key={d.id}
          className="absolute rounded-full bg-blue-200"
          style={{
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

function Snowflakes() {
  const flakes = useMemo(() =>
    Array.from({ length: 60 }, (_, i) => ({
      id: i,
      left: `${seeded(i, 100)}%`,
      delay: `${(seeded(i + 10, 5000)) / 1000}s`,
      duration: `${3 + seeded(i + 70, 4000) / 1000}s`,
      size: 3 + seeded(i + 20, 8),
      opacity: 0.4 + (seeded(i + 40, 50)) / 100,
      drift: seeded(i + 60, 60) - 30,
    })), [])

  return (
    <div className="absolute inset-0 overflow-hidden">
      {flakes.map(f => (
        <div
          key={f.id}
          className="absolute rounded-full bg-white"
          style={{
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

function SunRays() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Sun orb */}
      <div
        className="absolute rounded-full"
        style={{
          width: 180,
          height: 180,
          top: '8%',
          right: '10%',
          background: 'radial-gradient(circle, rgba(255,255,200,0.9) 0%, rgba(255,200,50,0.6) 40%, rgba(255,150,0,0.1) 70%, transparent 100%)',
          animation: 'sunPulse 4s ease-in-out infinite',
          filter: 'blur(2px)',
        }}
      />
      {/* Glow halo */}
      <div
        className="absolute rounded-full"
        style={{
          width: 320,
          height: 320,
          top: '-2%',
          right: '2%',
          background: 'radial-gradient(circle, rgba(255,220,100,0.25) 0%, rgba(255,180,50,0.08) 50%, transparent 70%)',
          animation: 'sunPulse 6s ease-in-out infinite alternate',
        }}
      />
      {/* Light rays */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
        <div
          key={angle}
          className="absolute origin-bottom"
          style={{
            width: 2,
            height: 200,
            top: '10%',
            right: 'calc(10% + 89px)',
            background: 'linear-gradient(to top, rgba(255,255,200,0.3), transparent)',
            transform: `rotate(${angle}deg)`,
            animation: `rayPulse 3s ${i * 0.3}s ease-in-out infinite alternate`,
          }}
        />
      ))}
      {/* Floating warm particles */}
      {Array.from({ length: 15 }, (_, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: 3 + seeded(i, 4),
            height: 3 + seeded(i, 4),
            left: `${20 + seeded(i, 60)}%`,
            top: `${10 + seeded(i + 5, 40)}%`,
            background: 'rgba(255,255,200,0.5)',
            filter: 'blur(1px)',
            animation: `float ${4 + seeded(i + 10, 3000) / 1000}s ${seeded(i, 2000) / 1000}s ease-in-out infinite alternate`,
          }}
        />
      ))}
    </div>
  )
}

function Clouds() {
  const clouds = useMemo(() =>
    Array.from({ length: 8 }, (_, i) => ({
      id: i,
      top: `${5 + seeded(i, 50)}%`,
      width: 120 + seeded(i + 20, 180),
      height: 40 + seeded(i + 30, 40),
      opacity: 0.15 + (seeded(i + 10, 25)) / 100,
      duration: `${20 + seeded(i + 5, 30)}s`,
      delay: `${-seeded(i, 20)}s`,
    })), [])

  return (
    <div className="absolute inset-0 overflow-hidden">
      {clouds.map(c => (
        <div
          key={c.id}
          className="absolute rounded-full"
          style={{
            top: c.top,
            width: c.width,
            height: c.height,
            background: 'radial-gradient(ellipse, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.15) 60%, transparent 100%)',
            opacity: c.opacity,
            filter: `blur(${6 + c.id * 2}px)`,
            animation: `cloudDrift ${c.duration} ${c.delay} linear infinite`,
          }}
        />
      ))}
    </div>
  )
}

function Storm() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <Raindrops />
      {/* Lightning flashes */}
      <div
        className="absolute inset-0 bg-white pointer-events-none"
        style={{ animation: 'lightning 6s 2s linear infinite' }}
      />
      <div
        className="absolute inset-0 bg-purple-200 pointer-events-none"
        style={{ animation: 'lightning 8s 5s linear infinite' }}
      />
      {/* Dark clouds */}
      {Array.from({ length: 5 }, (_, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            top: `${seeded(i, 30)}%`,
            width: 200 + seeded(i + 20, 200),
            height: 60 + seeded(i + 30, 40),
            background: 'radial-gradient(ellipse, rgba(30,20,50,0.5) 0%, rgba(30,20,50,0.1) 60%, transparent 100%)',
            filter: `blur(${10 + i * 3}px)`,
            animation: `cloudDrift ${25 + i * 5}s ${-i * 5}s linear infinite`,
          }}
        />
      ))}
    </div>
  )
}

function Fog() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {Array.from({ length: 6 }, (_, i) => (
        <div
          key={i}
          className="absolute w-full"
          style={{
            top: `${10 + i * 15}%`,
            height: 80 + seeded(i, 60),
            background: `linear-gradient(90deg, transparent, rgba(200,200,210,${0.15 + i * 0.03}), rgba(180,180,195,${0.2 + i * 0.02}), rgba(200,200,210,${0.15 + i * 0.03}), transparent)`,
            filter: `blur(${20 + i * 5}px)`,
            animation: `fogDrift ${15 + i * 4}s ${-i * 3}s ease-in-out infinite alternate`,
          }}
        />
      ))}
    </div>
  )
}

const themeEffects = {
  sunny: SunRays,
  cloudy: Clouds,
  rainy: Raindrops,
  snow: Snowflakes,
  storm: Storm,
  fog: Fog,
}

export default function WeatherBackground({ weatherTheme }) {
  const Effect = themeEffects[weatherTheme] ?? null

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {Effect && <Effect />}
    </div>
  )
}
