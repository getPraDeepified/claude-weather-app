import WeatherIcon from './WeatherIcon'
import { getWeatherInfo } from '../utils/weatherCodes'

function convertTemp(celsius, unit) {
  if (unit === 'fahrenheit') return Math.round(celsius * 9 / 5 + 32)
  return Math.round(celsius)
}

function uvLabel(index) {
  if (index <= 2) return 'Low'
  if (index <= 5) return 'Moderate'
  if (index <= 7) return 'High'
  if (index <= 10) return 'Very High'
  return 'Extreme'
}

function timeAgo(date) {
  if (!date) return null
  const mins = Math.round((Date.now() - date.getTime()) / 60000)
  if (mins < 1) return 'Just now'
  if (mins === 1) return '1 min ago'
  return `${mins} min ago`
}

export default function WeatherCard({ weather, city, theme, unit = 'celsius', lastUpdated }) {
  const { label } = getWeatherInfo(weather.weather_code)
  const unitLabel = unit === 'fahrenheit' ? 'F' : 'C'

  const textClass = theme?.text ?? 'text-white'
  const subClass = theme?.subtext ?? 'text-white/70'

  return (
    <div className="glass rounded-3xl p-8 w-full max-w-md mx-auto">
      {/* City */}
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h2 className={`text-2xl font-semibold ${textClass}`}>{city.name}</h2>
          <p className={`text-sm mt-0.5 ${subClass}`}>
            {[city.region, city.country].filter(Boolean).join(', ')}
          </p>
        </div>
        {lastUpdated && (
          <span className={`text-xs ${subClass} mt-1`}>{timeAgo(lastUpdated)}</span>
        )}
      </div>

      {/* Main temp + icon */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className={`text-8xl font-thin leading-none ${textClass}`}>
            {convertTemp(weather.temperature_2m, unit)}°
          </p>
          <p className={`text-sm mt-2 font-medium ${subClass}`}>{label}</p>
          <p className={`text-xs mt-1 ${subClass}`}>
            Feels like {convertTemp(weather.apparent_temperature, unit)}°{unitLabel}
          </p>
        </div>
        <WeatherIcon code={weather.weather_code} size="lg" />
      </div>

      {/* Stats grid */}
      <div
        className={`grid grid-cols-2 gap-4 pt-5 border-t ${theme?.dark ? 'border-white/15' : 'border-black/10'}`}
        aria-label="Weather details"
      >
        <Stat
          icon="💧"
          label="Humidity"
          value={`${weather.relative_humidity_2m}%`}
          sub={subClass}
          text={textClass}
        />
        <Stat
          icon="💨"
          label="Wind"
          value={`${Math.round(weather.wind_speed_10m)} km/h`}
          sub={subClass}
          text={textClass}
        />
        {weather.surface_pressure != null && (
          <Stat
            icon="🌡️"
            label="Pressure"
            value={`${Math.round(weather.surface_pressure)} hPa`}
            sub={subClass}
            text={textClass}
          />
        )}
        {weather.uv_index != null && (
          <Stat
            icon="☀️"
            label="UV Index"
            value={`${weather.uv_index} · ${uvLabel(weather.uv_index)}`}
            sub={subClass}
            text={textClass}
          />
        )}
      </div>
    </div>
  )
}

function Stat({ icon, label, value, sub, text }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xl" aria-hidden="true">
        {icon}
      </span>
      <div>
        <p className={`text-xs ${sub}`}>{label}</p>
        <p className={`text-sm font-semibold ${text}`}>{value}</p>
      </div>
    </div>
  )
}
