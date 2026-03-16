import { getWeatherInfo } from '../utils/weatherCodes'

export default function WeatherIcon({ code, size = 'md' }) {
  const { icon } = getWeatherInfo(code)
  const sizes = { sm: 'text-2xl', md: 'text-5xl', lg: 'text-8xl' }
  return <span className={sizes[size] ?? sizes.md} role="img">{icon}</span>
}
