import { lazy, Suspense, useState, useEffect } from 'react'

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handler = (e) => setReduced(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])
  return reduced
}

const effects = {
  sunny: lazy(() => import('./weather-effects/SunRays')),
  cloudy: lazy(() => import('./weather-effects/Clouds')),
  rainy: lazy(() => import('./weather-effects/Raindrops')),
  snow: lazy(() => import('./weather-effects/Snowflakes')),
  storm: lazy(() => import('./weather-effects/Storm')),
  fog: lazy(() => import('./weather-effects/Fog')),
}

export default function WeatherBackground({ weatherTheme }) {
  const prefersReducedMotion = usePrefersReducedMotion()

  if (prefersReducedMotion) return null

  const Effect = effects[weatherTheme] ?? null

  return (
    <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
      <Suspense fallback={null}>{Effect && <Effect />}</Suspense>
    </div>
  )
}
