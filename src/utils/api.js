import {
  GEO_BASE,
  WEATHER_BASE,
  MAX_SUGGESTIONS,
  FORECAST_DAYS,
  FETCH_TIMEOUT_MS,
  CACHE_TTL_MS,
} from '../constants'

const cache = new Map()

function getCached(key) {
  const entry = cache.get(key)
  if (!entry) return null
  if (Date.now() - entry.time > CACHE_TTL_MS) {
    cache.delete(key)
    return null
  }
  return entry.data
}

function setCache(key, data) {
  cache.set(key, { data, time: Date.now() })
}

function fetchWithTimeout(url, signal) {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS)

  if (signal) {
    signal.addEventListener('abort', () => controller.abort())
  }

  return fetch(url, { signal: controller.signal }).finally(() => clearTimeout(timeout))
}

export async function searchCities(query, signal) {
  if (!query || query.length < 2) return []

  const cacheKey = `geo:${query.toLowerCase()}`
  const cached = getCached(cacheKey)
  if (cached) return cached

  const url = `${GEO_BASE}/search?name=${encodeURIComponent(query)}&count=${MAX_SUGGESTIONS}&language=en&format=json`
  const res = await fetchWithTimeout(url, signal)
  if (!res.ok) throw new Error('City search failed. Please try again.')
  const data = await res.json()
  const results = (data.results ?? []).map((r) => ({
    id: r.id,
    name: r.name,
    country: r.country,
    countryCode: r.country_code,
    region: r.admin1,
    lat: r.latitude,
    lon: r.longitude,
  }))
  setCache(cacheKey, results)
  return results
}

export async function fetchWeather(lat, lon, signal) {
  const cacheKey = `weather:${lat.toFixed(2)},${lon.toFixed(2)}`
  const cached = getCached(cacheKey)
  if (cached) return cached

  const params = new URLSearchParams({
    latitude: lat,
    longitude: lon,
    current: [
      'temperature_2m',
      'apparent_temperature',
      'relative_humidity_2m',
      'wind_speed_10m',
      'weather_code',
      'surface_pressure',
      'uv_index',
    ].join(','),
    hourly: ['temperature_2m', 'weather_code', 'precipitation_probability'].join(','),
    daily: [
      'weather_code',
      'temperature_2m_max',
      'temperature_2m_min',
      'precipitation_probability_max',
    ].join(','),
    timezone: 'auto',
    forecast_days: FORECAST_DAYS,
  })

  const res = await fetchWithTimeout(`${WEATHER_BASE}/forecast?${params}`, signal)
  if (!res.ok) throw new Error('Weather data unavailable. Please try again.')
  const data = await res.json()
  setCache(cacheKey, data)
  return data
}
