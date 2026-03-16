import { useState, useEffect, useRef } from 'react'

export default function SearchBar({ onSearch, suggestions, onSelect, searching, theme }) {
  const [query, setQuery] = useState('')
  const debounceRef = useRef(null)
  const wrapperRef = useRef(null)

  useEffect(() => {
    clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => onSearch(query), 300)
    return () => clearTimeout(debounceRef.current)
  }, [query, onSearch])

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClick(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        onSearch('')
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [onSearch])

  function handleSelect(city) {
    setQuery(`${city.name}, ${city.countryCode}`)
    onSelect(city)
  }

  const inputClass = theme?.dark
    ? 'bg-white/10 text-white placeholder-white/50 border-white/20 focus:border-white/50'
    : 'bg-black/10 text-gray-900 placeholder-gray-500 border-black/20 focus:border-black/40'

  return (
    <div ref={wrapperRef} className="relative w-full max-w-md mx-auto">
      <div className="relative flex items-center">
        <span className="absolute left-4 text-lg opacity-60">🔍</span>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search city…"
          className={`w-full pl-11 pr-4 py-3 rounded-2xl border text-sm font-medium outline-none transition-all duration-200 ${inputClass}`}
          style={{ backdropFilter: 'blur(10px)' }}
        />
        {searching && (
          <span className="absolute right-4 text-xs opacity-50 animate-pulse">…</span>
        )}
      </div>

      {suggestions.length > 0 && (
        <ul className="absolute top-full mt-2 w-full rounded-2xl overflow-hidden shadow-2xl z-50"
            style={{ background: 'rgba(15,15,25,0.85)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.1)' }}>
          {suggestions.map((city) => (
            <li
              key={city.id}
              onClick={() => handleSelect(city)}
              className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-white/10 transition-colors duration-150"
            >
              <span className="text-base">📍</span>
              <div>
                <p className="text-white text-sm font-medium">{city.name}</p>
                <p className="text-white/50 text-xs">{[city.region, city.country].filter(Boolean).join(', ')}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
