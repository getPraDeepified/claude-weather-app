// WMO Weather interpretation codes
// https://open-meteo.com/en/docs#weathervariables

export const weatherInfo = {
  0:  { label: 'Clear Sky',          icon: '☀️',  theme: 'sunny' },
  1:  { label: 'Mostly Clear',       icon: '🌤️', theme: 'sunny' },
  2:  { label: 'Partly Cloudy',      icon: '⛅',  theme: 'cloudy' },
  3:  { label: 'Overcast',           icon: '☁️',  theme: 'cloudy' },
  45: { label: 'Foggy',              icon: '🌫️', theme: 'fog' },
  48: { label: 'Icy Fog',            icon: '🌫️', theme: 'fog' },
  51: { label: 'Light Drizzle',      icon: '🌦️', theme: 'rainy' },
  53: { label: 'Drizzle',            icon: '🌦️', theme: 'rainy' },
  55: { label: 'Heavy Drizzle',      icon: '🌧️', theme: 'rainy' },
  61: { label: 'Light Rain',         icon: '🌧️', theme: 'rainy' },
  63: { label: 'Rain',               icon: '🌧️', theme: 'rainy' },
  65: { label: 'Heavy Rain',         icon: '🌧️', theme: 'rainy' },
  71: { label: 'Light Snow',         icon: '🌨️', theme: 'snow' },
  73: { label: 'Snow',               icon: '❄️',  theme: 'snow' },
  75: { label: 'Heavy Snow',         icon: '❄️',  theme: 'snow' },
  77: { label: 'Snow Grains',        icon: '🌨️', theme: 'snow' },
  80: { label: 'Light Showers',      icon: '🌦️', theme: 'rainy' },
  81: { label: 'Showers',            icon: '🌧️', theme: 'rainy' },
  82: { label: 'Heavy Showers',      icon: '🌧️', theme: 'rainy' },
  85: { label: 'Snow Showers',       icon: '🌨️', theme: 'snow' },
  86: { label: 'Heavy Snow Showers', icon: '❄️',  theme: 'snow' },
  95: { label: 'Thunderstorm',       icon: '⛈️',  theme: 'storm' },
  96: { label: 'Thunderstorm + Hail',icon: '⛈️',  theme: 'storm' },
  99: { label: 'Severe Thunderstorm',icon: '🌩️', theme: 'storm' },
}

export const themes = {
  sunny: {
    bg: 'from-amber-400 via-orange-400 to-rose-400',
    text: 'text-white',
    subtext: 'text-amber-100',
    dark: false,
  },
  cloudy: {
    bg: 'from-slate-500 via-slate-400 to-blue-400',
    text: 'text-white',
    subtext: 'text-slate-200',
    dark: true,
  },
  rainy: {
    bg: 'from-indigo-800 via-blue-700 to-cyan-600',
    text: 'text-white',
    subtext: 'text-blue-200',
    dark: true,
  },
  snow: {
    bg: 'from-blue-100 via-sky-200 to-indigo-200',
    text: 'text-indigo-900',
    subtext: 'text-indigo-500',
    dark: false,
  },
  storm: {
    bg: 'from-gray-900 via-purple-900 to-indigo-900',
    text: 'text-white',
    subtext: 'text-purple-300',
    dark: true,
  },
  fog: {
    bg: 'from-gray-400 via-slate-300 to-gray-400',
    text: 'text-gray-800',
    subtext: 'text-gray-600',
    dark: false,
  },
  default: {
    bg: 'from-sky-400 via-blue-500 to-indigo-600',
    text: 'text-white',
    subtext: 'text-sky-200',
    dark: true,
  },
}

export function getWeatherInfo(code) {
  return weatherInfo[code] ?? { label: 'Unknown', icon: '🌡️', theme: 'default' }
}

export function getTheme(code) {
  const info = getWeatherInfo(code)
  return themes[info.theme] ?? themes.default
}

export function getDayName(dateStr, index) {
  if (index === 0) return 'Today'
  if (index === 1) return 'Tomorrow'
  return new Date(dateStr).toLocaleDateString('en-US', { weekday: 'short' })
}
