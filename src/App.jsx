import { useWeather } from './hooks/useWeather'
import { useLocalStorage } from './hooks/useLocalStorage'
import { getTheme, getWeatherInfo, themes } from './utils/weatherCodes'
import SearchBar from './components/SearchBar'
import WeatherCard from './components/WeatherCard'
import ForecastRow from './components/ForecastRow'
import HourlyForecast from './components/HourlyForecast'
import WeatherBackground from './components/WeatherBackground'
import LoadingSkeleton from './components/LoadingSkeleton'

export default function App() {
  const {
    suggestions,
    weather,
    forecast,
    hourly,
    city,
    loading,
    error,
    searching,
    lastUpdated,
    recentSearches,
    search,
    selectCity,
    detectLocation,
    clearRecent,
  } = useWeather()

  const [unit, setUnit] = useLocalStorage('tempUnit', 'celsius')

  const theme = weather ? getTheme(weather.weather_code) : themes.default
  const weatherTheme = weather ? getWeatherInfo(weather.weather_code).theme : null

  function toggleUnit() {
    setUnit((prev) => (prev === 'celsius' ? 'fahrenheit' : 'celsius'))
  }

  return (
    <div
      className={`min-h-screen w-full ${theme.bg} transition-all duration-1000 ease-in-out`}
    >
      <WeatherBackground weatherTheme={weatherTheme} />

      <main className="relative z-10 flex flex-col items-center justify-start min-h-screen px-4 py-12 gap-5">
        <header className="text-center mb-2 flex items-center gap-3">
          <h1
            className={`text-sm font-semibold uppercase tracking-widest opacity-60 ${theme.text}`}
          >
            Weather
          </h1>
          <button
            onClick={toggleUnit}
            className={`text-xs font-semibold px-2.5 py-1 rounded-lg transition-colors ${
              theme.dark
                ? 'bg-white/15 hover:bg-white/25 text-white'
                : 'bg-black/10 hover:bg-black/20 text-gray-800'
            }`}
            aria-label={`Switch to ${unit === 'celsius' ? 'Fahrenheit' : 'Celsius'}`}
          >
            °{unit === 'celsius' ? 'C' : 'F'}
          </button>
        </header>

        <SearchBar
          onSearch={search}
          suggestions={suggestions}
          onSelect={selectCity}
          searching={searching}
          theme={theme}
          recentSearches={recentSearches}
          onClearRecent={clearRecent}
        />

        {loading && <LoadingSkeleton theme={theme} />}

        <div aria-live="assertive" aria-atomic="true">
          {error && !loading && (
            <div className="glass rounded-2xl px-6 py-4 text-center max-w-sm">
              <p className={`text-sm ${theme.text} opacity-70`}>
                <span aria-hidden="true">⚠️ </span>
                {error}
              </p>
            </div>
          )}
        </div>

        <div aria-live="polite" aria-atomic="true">
          {weather && city && !loading && (
            <>
              <WeatherCard
                weather={weather}
                city={city}
                theme={theme}
                unit={unit}
                lastUpdated={lastUpdated}
              />
              <HourlyForecast hourly={hourly} theme={theme} unit={unit} />
              <ForecastRow forecast={forecast} theme={theme} unit={unit} />
            </>
          )}
        </div>

        {!weather && !loading && !error && (
          <div className={`text-center mt-16 ${theme.text}`}>
            <div className="text-7xl mb-5 opacity-80" aria-hidden="true">
              🌍
            </div>
            <p className="text-lg font-light opacity-70 mb-6">
              Search for a city to see the weather
            </p>
            <button
              onClick={detectLocation}
              className={`text-sm font-medium px-5 py-2.5 rounded-xl transition-colors ${
                theme.dark
                  ? 'bg-white/15 hover:bg-white/25 text-white'
                  : 'bg-black/10 hover:bg-black/20 text-gray-800'
              }`}
              aria-label="Use my current location"
            >
              <span aria-hidden="true">📍 </span>
              Use my location
            </button>
          </div>
        )}
      </main>
    </div>
  )
}
