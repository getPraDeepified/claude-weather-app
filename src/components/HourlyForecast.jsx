import WeatherIcon from './WeatherIcon'

function convertTemp(celsius, unit) {
  if (unit === 'fahrenheit') return Math.round((celsius * 9) / 5 + 32)
  return Math.round(celsius)
}

function formatHour(timeStr) {
  const date = new Date(timeStr)
  return date.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true })
}

export default function HourlyForecast({ hourly, theme, unit = 'celsius' }) {
  if (!hourly || hourly.length === 0) return null

  const textClass = theme?.text ?? 'text-white'
  const subClass = theme?.subtext ?? 'text-white/70'

  return (
    <div
      className="glass rounded-3xl px-4 py-5 w-full max-w-md mx-auto mt-5"
      aria-label="Hourly weather forecast"
    >
      <p className={`text-xs font-semibold uppercase tracking-widest mb-4 px-2 ${subClass}`}>
        Next 24 Hours
      </p>
      <div className="flex gap-4 overflow-x-auto pb-2 px-1 scrollbar-thin">
        {hourly.map((h, i) => (
          <div
            key={h.time}
            className="flex flex-col items-center gap-1.5 min-w-[56px] flex-shrink-0"
          >
            <span className={`text-xs font-medium ${i === 0 ? textClass : subClass}`}>
              {i === 0 ? 'Now' : formatHour(h.time)}
            </span>
            <WeatherIcon code={h.code} size="sm" />
            <span className={`text-sm font-semibold ${textClass}`}>
              {convertTemp(h.temp, unit)}°
            </span>
            {h.rain > 0 && (
              <span className={`text-[10px] ${subClass}`}>
                <span aria-hidden="true">💧</span>
                {h.rain}%
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
