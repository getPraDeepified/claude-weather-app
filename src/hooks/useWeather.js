import { useState, useCallback } from 'react'
import { searchCities, fetchWeather } from '../utils/api'

export function useWeather() {
  const [suggestions, setSuggestions] = useState([])
  const [weather, setWeather]         = useState(null)
  const [forecast, setForecast]       = useState([])
  const [city, setCity]               = useState(null)
  const [loading, setLoading]         = useState(false)
  const [error, setError]             = useState(null)
  const [searching, setSearching]     = useState(false)

  const search = useCallback(async (query) => {
    if (!query) { setSuggestions([]); return }
    setSearching(true)
    try {
      const results = await searchCities(query)
      setSuggestions(results)
    } catch {
      setSuggestions([])
    } finally {
      setSearching(false)
    }
  }, [])

  const selectCity = useCallback(async (selected) => {
    setSuggestions([])
    setCity(selected)
    setLoading(true)
    setError(null)
    try {
      const data = await fetchWeather(selected.lat, selected.lon)
      setWeather(data.current)
      // Build forecast array (skip today = index 0, take next 5)
      const daily = data.daily
      const days = daily.time.map((date, i) => ({
        date,
        code: daily.weather_code[i],
        max: daily.temperature_2m_max[i],
        min: daily.temperature_2m_min[i],
        rain: daily.precipitation_probability_max[i],
      }))
      setForecast(days)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  return { suggestions, weather, forecast, city, loading, error, searching, search, selectCity }
}
