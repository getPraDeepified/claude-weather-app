import WeatherIcon from './WeatherIcon'
import { getWeatherInfo } from '../utils/weatherCodes'

export default function WeatherCard({ weather, city, theme }) {
  const { label } = getWeatherInfo(weather.weather_code)

  const textClass = theme?.text ?? 'text-white'
  const subClass  = theme?.subtext ?? 'text-white/70'

  return (
    <div className="glass rounded-3xl p-8 w-full max-w-md mx-auto">
      {/* City */}
      <div className="mb-6">
        <h1 className={`text-2xl font-semibold ${textClass}`}>{city.name}</h1>
        <p className={`text-sm mt-0.5 ${subClass}`}>
          {[city.region, city.country].filter(Boolean).join(', ')}
        </p>
      </div>

      {/* Main temp + icon */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className={`text-8xl font-thin leading-none ${textClass}`}>
            {Math.round(weather.temperature_2m)}°
          </p>
          <p className={`text-sm mt-2 font-medium ${subClass}`}>{label}</p>
          <p className={`text-xs mt-1 ${subClass}`}>
            Feels like {Math.round(weather.apparent_temperature)}°
          </p>
        </div>
        <WeatherIcon code={weather.weather_code} size="lg" />
      </div>

      {/* Stats row */}
      <div className={`flex gap-6 pt-5 border-t ${theme?.dark ? 'border-white/15' : 'border-black/10'}`}>
        <Stat icon="💧" label="Humidity" value={`${weather.relative_humidity_2m}%`} sub={subClass} text={textClass} />
        <Stat icon="💨" label="Wind" value={`${Math.round(weather.wind_speed_10m)} km/h`} sub={subClass} text={textClass} />
      </div>
    </div>
  )
}

function Stat({ icon, label, value, sub, text }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xl">{icon}</span>
      <div>
        <p className={`text-xs ${sub}`}>{label}</p>
        <p className={`text-sm font-semibold ${text}`}>{value}</p>
      </div>
    </div>
  )
}
