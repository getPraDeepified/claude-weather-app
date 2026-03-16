import { useWeather } from './hooks/useWeather'
import { getTheme, getWeatherInfo, themes } from './utils/weatherCodes'
import SearchBar from './components/SearchBar'
import WeatherCard from './components/WeatherCard'
import ForecastRow from './components/ForecastRow'
import WeatherBackground from './components/WeatherBackground'

export default function App() {
  const { suggestions, weather, forecast, city, loading, error, searching, search, selectCity } = useWeather()

  const theme = weather ? getTheme(weather.weather_code) : themes.default
  const weatherTheme = weather ? getWeatherInfo(weather.weather_code).theme : null

  return (
    <div
      className={`min-h-screen w-full bg-gradient-to-br ${theme.bg} transition-all duration-1000 ease-in-out`}
    >
      {/* Animated weather background */}
      <WeatherBackground weatherTheme={weatherTheme} />

      {/* Subtle noise overlay for depth */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03] z-[1]"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")" }}
      />

      <div className="relative z-10 flex flex-col items-center justify-start min-h-screen px-4 py-12 gap-5">
        {/* Header */}
        <div className="text-center mb-2">
          <h2 className={`text-sm font-semibold uppercase tracking-widest opacity-60 ${theme.text}`}>
            Weather
          </h2>
        </div>

        {/* Search */}
        <SearchBar
          onSearch={search}
          suggestions={suggestions}
          onSelect={selectCity}
          searching={searching}
          theme={theme}
        />

        {/* Loading */}
        {loading && (
          <div className={`text-center py-12 ${theme.text}`}>
            <div className="text-4xl animate-bounce mb-3">🌤️</div>
            <p className="text-sm opacity-60 font-medium">Fetching weather…</p>
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div className="glass rounded-2xl px-6 py-4 text-center max-w-sm">
            <p className={`text-sm ${theme.text} opacity-70`}>⚠️ {error}</p>
          </div>
        )}

        {/* Weather */}
        {weather && city && !loading && (
          <>
            <WeatherCard weather={weather} city={city} theme={theme} />
            <ForecastRow forecast={forecast} theme={theme} />
          </>
        )}

        {/* Empty state */}
        {!weather && !loading && !error && (
          <div className={`text-center mt-16 ${theme.text}`}>
            <div className="text-7xl mb-5 opacity-80">🌍</div>
            <p className="text-lg font-light opacity-70">Search for a city to see the weather</p>
          </div>
        )}
      </div>
    </div>
  )
}
