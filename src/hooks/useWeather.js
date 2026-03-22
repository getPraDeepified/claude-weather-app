import { useState, useCallback, useRef, useEffect } from 'react'
import { searchCities, fetchWeather } from '../utils/api'
import { useLocalStorage } from './useLocalStorage'
import { MAX_RECENT_SEARCHES } from '../constants'

export function useWeather() {
  const [suggestions, setSuggestions] = useState([])
  const [weather, setWeather] = useState(null)
  const [forecast, setForecast] = useState([])
  const [hourly, setHourly] = useState([])
  const [city, setCity] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [searching, setSearching] = useState(false)
  const [lastUpdated, setLastUpdated] = useState(null)
  const [recentSearches, setRecentSearches] = useLocalStorage('recentSearches', [])

  const searchAbortRef = useRef(null)
  const weatherAbortRef = useRef(null)

  useEffect(() => {
    return () => {
      searchAbortRef.current?.abort()
      weatherAbortRef.current?.abort()
    }
  }, [])

  const search = useCallback(async (query) => {
    if (!query) {
      setSuggestions([])
      return
    }
    searchAbortRef.current?.abort()
    searchAbortRef.current = new AbortController()
    setSearching(true)
    try {
      const results = await searchCities(query, searchAbortRef.current.signal)
      setSuggestions(results)
    } catch (err) {
      if (err.name !== 'AbortError') {
        setSuggestions([])
      }
    } finally {
      setSearching(false)
    }
  }, [])

  const loadWeatherData = useCallback(async (lat, lon, signal) => {
    const data = await fetchWeather(lat, lon, signal)
    setWeather(data.current)
    setLastUpdated(new Date())

    const daily = data.daily
    const days = daily.time.map((date, i) => ({
      date,
      code: daily.weather_code[i],
      max: daily.temperature_2m_max[i],
      min: daily.temperature_2m_min[i],
      rain: daily.precipitation_probability_max[i],
    }))
    setForecast(days)

    if (data.hourly) {
      const now = new Date()
      const hours = data.hourly.time
        .map((time, i) => ({
          time,
          temp: data.hourly.temperature_2m[i],
          code: data.hourly.weather_code[i],
          rain: data.hourly.precipitation_probability[i],
        }))
        .filter((h) => new Date(h.time) >= now)
        .slice(0, 24)
      setHourly(hours)
    }
  }, [])

  const selectCity = useCallback(
    async (selected) => {
      setSuggestions([])
      setCity(selected)
      setLoading(true)
      setError(null)

      setRecentSearches((prev) => {
        const filtered = prev.filter((c) => c.id !== selected.id)
        return [selected, ...filtered].slice(0, MAX_RECENT_SEARCHES)
      })

      weatherAbortRef.current?.abort()
      weatherAbortRef.current = new AbortController()
      try {
        await loadWeatherData(selected.lat, selected.lon, weatherAbortRef.current.signal)
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message)
        }
      } finally {
        setLoading(false)
      }
    },
    [loadWeatherData, setRecentSearches],
  )

  const detectLocation = useCallback(async () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.')
      return
    }
    setLoading(true)
    setError(null)
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          timeout: 10000,
          maximumAge: 300000,
        })
      })
      const { latitude, longitude } = position.coords
      setCity({ name: 'Your Location', country: '', region: '', lat: latitude, lon: longitude })
      weatherAbortRef.current?.abort()
      weatherAbortRef.current = new AbortController()
      await loadWeatherData(latitude, longitude, weatherAbortRef.current.signal)
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError(err.code === 1 ? 'Location access denied.' : 'Could not detect your location.')
      }
    } finally {
      setLoading(false)
    }
  }, [loadWeatherData])

  const clearRecent = useCallback(() => {
    setRecentSearches([])
  }, [setRecentSearches])

  return {
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
  }
}
