export default function LoadingSkeleton({ theme }) {
  const textClass = theme?.text ?? 'text-white'

  return (
    <div className="w-full max-w-md mx-auto space-y-5">
      {/* Weather card skeleton */}
      <div className="glass rounded-3xl p-8">
        <div className="mb-6">
          <div className="h-6 w-32 rounded-lg bg-white/15 animate-pulse" />
          <div className="h-4 w-48 rounded-lg bg-white/10 animate-pulse mt-2" />
        </div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="h-20 w-36 rounded-lg bg-white/15 animate-pulse" />
            <div className="h-4 w-24 rounded-lg bg-white/10 animate-pulse mt-3" />
            <div className="h-3 w-20 rounded-lg bg-white/10 animate-pulse mt-2" />
          </div>
          <div className="h-16 w-16 rounded-full bg-white/10 animate-pulse" />
        </div>
        <div className="flex gap-6 pt-5 border-t border-white/10">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-white/10 animate-pulse" />
            <div>
              <div className="h-3 w-14 rounded bg-white/10 animate-pulse" />
              <div className="h-4 w-10 rounded bg-white/15 animate-pulse mt-1" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-white/10 animate-pulse" />
            <div>
              <div className="h-3 w-14 rounded bg-white/10 animate-pulse" />
              <div className="h-4 w-16 rounded bg-white/15 animate-pulse mt-1" />
            </div>
          </div>
        </div>
      </div>

      {/* Forecast skeleton */}
      <div className="glass rounded-3xl px-6 py-5">
        <div className="h-3 w-28 rounded bg-white/10 animate-pulse mb-4" />
        {Array.from({ length: 5 }, (_, i) => (
          <div
            key={i}
            className={`flex items-center justify-between py-3 ${i < 4 ? 'border-b border-white/10' : ''}`}
          >
            <div className="h-4 w-16 rounded bg-white/10 animate-pulse" />
            <div className="h-6 w-6 rounded-full bg-white/10 animate-pulse" />
            <div className="h-3 w-10 rounded bg-white/10 animate-pulse" />
            <div className="flex gap-2">
              <div className="h-4 w-8 rounded bg-white/15 animate-pulse" />
              <div className="h-4 w-8 rounded bg-white/10 animate-pulse" />
            </div>
          </div>
        ))}
      </div>

      <p className={`text-center text-sm opacity-60 font-medium ${textClass}`}>
        Fetching weather…
      </p>
    </div>
  )
}
