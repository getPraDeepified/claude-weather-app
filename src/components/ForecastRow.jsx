import WeatherIcon from './WeatherIcon'
import { getDayName } from '../utils/weatherCodes'

export default function ForecastRow({ forecast, theme }) {
  if (!forecast || forecast.length === 0) return null

  const textClass = theme?.text ?? 'text-white'
  const subClass  = theme?.subtext ?? 'text-white/70'
  const borderClass = theme?.dark ? 'border-white/10' : 'border-black/10'

  // Skip index 0 (today is shown in WeatherCard), take 5
  const days = forecast.slice(1, 6)

  return (
    <div className="glass rounded-3xl px-6 py-5 w-full max-w-md mx-auto">
      <p className={`text-xs font-semibold uppercase tracking-widest mb-4 ${subClass}`}>5-Day Forecast</p>
      <div className="space-y-3">
        {days.map((day, i) => (
          <div key={day.date} className={`flex items-center justify-between py-2 ${i < days.length - 1 ? `border-b ${borderClass}` : ''}`}>
            <p className={`text-sm font-medium w-24 ${textClass}`}>{getDayName(day.date, i + 1)}</p>
            <WeatherIcon code={day.code} size="sm" />
            {day.rain > 0 && (
              <span className={`text-xs ${subClass} w-10 text-center`}>💧{day.rain}%</span>
            )}
            {day.rain === 0 && <span className="w-10" />}
            <div className={`flex gap-2 text-sm font-medium ${textClass} w-20 justify-end`}>
              <span>{Math.round(day.max)}°</span>
              <span className={`${subClass}`}>{Math.round(day.min)}°</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
