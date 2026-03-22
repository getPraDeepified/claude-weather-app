import WeatherIcon from './WeatherIcon'
import { getDayName } from '../utils/weatherCodes'

function convertTemp(celsius, unit) {
  if (unit === 'fahrenheit') return Math.round((celsius * 9) / 5 + 32)
  return Math.round(celsius)
}

export default function ForecastRow({ forecast, theme, unit = 'celsius' }) {
  if (!forecast || forecast.length === 0) return null

  const textClass = theme?.text ?? 'text-white'
  const subClass = theme?.subtext ?? 'text-white/70'
  const borderClass = theme?.dark ? 'border-white/10' : 'border-black/10'

  const days = forecast.slice(1, 6)

  return (
    <div
      className="glass rounded-3xl px-6 py-5 w-full max-w-md mx-auto mt-5"
      aria-label="5-day weather forecast"
    >
      <p className={`text-xs font-semibold uppercase tracking-widest mb-4 ${subClass}`}>
        5-Day Forecast
      </p>
      <div role="list" className="space-y-3">
        {days.map((day, i) => (
          <div
            key={day.date}
            role="listitem"
            className={`flex items-center justify-between py-2 ${i < days.length - 1 ? `border-b ${borderClass}` : ''}`}
          >
            <p className={`text-sm font-medium w-24 ${textClass}`}>{getDayName(day.date, i + 1)}</p>
            <WeatherIcon code={day.code} size="sm" />
            {day.rain > 0 ? (
              <span className={`text-xs ${subClass} w-10 text-center`}>
                <span aria-hidden="true">💧</span>
                {day.rain}%
              </span>
            ) : (
              <span className="w-10" />
            )}
            <div className={`flex gap-2 text-sm font-medium ${textClass} w-20 justify-end`}>
              <span aria-label={`High ${convertTemp(day.max, unit)} degrees`}>
                {convertTemp(day.max, unit)}°
              </span>
              <span className={subClass} aria-label={`Low ${convertTemp(day.min, unit)} degrees`}>
                {convertTemp(day.min, unit)}°
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
