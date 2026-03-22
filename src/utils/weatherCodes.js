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
  56: { label: 'Freezing Drizzle',   icon: '🌧️', theme: 'snow' },
  57: { label: 'Heavy Freezing Drizzle', icon: '🌧️', theme: 'snow' },
  61: { label: 'Light Rain',         icon: '🌧️', theme: 'rainy' },
  63: { label: 'Rain',               icon: '🌧️', theme: 'rainy' },
  65: { label: 'Heavy Rain',         icon: '🌧️', theme: 'rainy' },
  66: { label: 'Freezing Rain',      icon: '🌧️', theme: 'snow' },
  67: { label: 'Heavy Freezing Rain',icon: '🌧️', theme: 'snow' },
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
    bg: 'ios-sunny',
    text: 'text-white',
    subtext: 'text-white/70',
    dark: true,
  },
  cloudy: {
    bg: 'ios-cloudy',
    text: 'text-white',
    subtext: 'text-white/60',
    dark: true,
  },
  rainy: {
    bg: 'ios-rainy',
    text: 'text-white',
    subtext: 'text-white/60',
    dark: true,
  },
  snow: {
    bg: 'ios-snow',
    text: 'text-white',
    subtext: 'text-white/65',
    dark: true,
  },
  storm: {
    bg: 'ios-storm',
    text: 'text-white',
    subtext: 'text-white/55',
    dark: true,
  },
  fog: {
    bg: 'ios-fog',
    text: 'text-white',
    subtext: 'text-white/60',
    dark: true,
  },
  default: {
    bg: 'ios-default',
    text: 'text-white',
    subtext: 'text-white/65',
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
